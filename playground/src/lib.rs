use miette::{
    Diagnostic, GraphicalReportHandler, GraphicalTheme, Report, Severity, ThemeCharacters,
    ThemeStyles,
};
use semver::Version;
use std::collections::HashMap;
use std::path::PathBuf;
use std::sync::{Arc, Mutex};
use veryl_analyzer::ir as air;
use veryl_analyzer::{Analyzer, Context, ir::Ir, namespace_table, symbol_table};
use veryl_emitter::Emitter;
use veryl_formatter::Formatter;
use veryl_metadata::{
    Build, BuildInfo, Doc, Format, Lint, Lockfile, Metadata, Project, Pubfile, Publish, Test,
};
use veryl_parser::{Parser, resource_table};
use veryl_simulator::ir::{self as sim_ir, Event};
use veryl_simulator::output_buffer;
use veryl_simulator::testbench::{self, TestResult};
use veryl_simulator::wave_dumper::{SharedVec, WaveDumper};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    pub fn alert(s: &str);
}

#[wasm_bindgen]
pub struct Result {
    err: bool,
    content: String,
    diagnostics: String,
}

#[wasm_bindgen]
impl Result {
    #[wasm_bindgen]
    pub fn err(&self) -> bool {
        self.err
    }

    #[wasm_bindgen]
    pub fn content(&self) -> String {
        self.content.clone()
    }

    #[wasm_bindgen]
    pub fn diagnostics(&self) -> String {
        self.diagnostics.clone()
    }
}

fn render_err(err: Report) -> String {
    let mut out = String::new();
    GraphicalReportHandler::new_themed(GraphicalTheme {
        characters: ThemeCharacters::emoji(),
        styles: ThemeStyles::none(),
    })
    .with_width(80)
    .render_report(&mut out, err.as_ref())
    .unwrap();
    out
}

fn extract_diagnostic_single(err: &(impl Diagnostic + std::fmt::Display)) -> String {
    extract_diagnostics(std::slice::from_ref(err))
}

fn extract_diagnostics(errors: &[impl Diagnostic + std::fmt::Display]) -> String {
    let mut diags = Vec::new();
    for err in errors {
        let severity = match err.severity() {
            Some(Severity::Warning) => "warning",
            Some(Severity::Advice) => "info",
            _ => "error",
        };
        let message = err.to_string();
        if let Some(labels) = err.labels() {
            for label in labels {
                diags.push(format!(
                    r#"{{"from":{},"to":{},"severity":"{}","message":"{}"}}"#,
                    label.offset(),
                    label.offset() + label.len(),
                    severity,
                    message.replace('\\', "\\\\").replace('"', "\\\""),
                ));
            }
        }
    }
    format!("[{}]", diags.join(","))
}

fn metadata() -> Metadata {
    Metadata {
        project: Project {
            name: "project".into(),
            version: Some(Version::parse("0.0.0").unwrap()),
            authors: vec![],
            description: None,
            license: None,
            repository: None,
        },
        build: Build::default(),
        format: Format::default(),
        lint: Lint::default(),
        publish: Publish::default(),
        doc: Doc::default(),
        test: Test::default(),
        dependencies: HashMap::new(),
        metadata_path: "".into(),
        pubfile_path: "".into(),
        pubfile: Pubfile::default(),
        lockfile_path: "".into(),
        lockfile: Lockfile::default(),
        build_info: BuildInfo::default(),
    }
}

#[wasm_bindgen]
pub fn set_hook() {
    console_error_panic_hook::set_once();
}

#[wasm_bindgen]
pub fn build(source: &str) -> Result {
    let metadata = metadata();
    match Parser::parse(source, &"") {
        Ok(parser) => {
            if let Some(path) = resource_table::get_path_id(PathBuf::from("")) {
                symbol_table::drop(path);
                namespace_table::drop(path);
            }

            let analyzer = Analyzer::new(&metadata);
            let mut context = Context::default();
            let mut errors = Vec::new();
            errors.append(&mut analyzer.analyze_pass1("project", &parser.veryl));
            errors.append(&mut Analyzer::analyze_post_pass1());
            errors.append(&mut analyzer.analyze_pass2(
                "project",
                &parser.veryl,
                &mut context,
                None,
            ));
            errors.append(&mut Analyzer::analyze_post_pass2());

            let err = !errors.is_empty();
            let diagnostics = extract_diagnostics(&errors);

            let content = if err {
                let mut text = String::new();
                for e in errors {
                    text.push_str(&render_err(e.into()));
                }
                text
            } else {
                let mut emitter = Emitter::new(
                    &metadata,
                    &PathBuf::from("input.veryl"),
                    &PathBuf::from("input.sv"),
                    &PathBuf::from("input.sv.map"),
                );
                emitter.emit("project", &parser.veryl, source);
                emitter.as_str().to_owned()
            };

            Result {
                err,
                content,
                diagnostics,
            }
        }
        Err(e) => {
            let diagnostics = extract_diagnostic_single(&e);
            Result {
                err: true,
                content: render_err(e.into()),
                diagnostics,
            }
        }
    }
}

#[wasm_bindgen]
pub fn dump_ir(source: &str) -> Result {
    let metadata = metadata();
    match Parser::parse(source, &"") {
        Ok(parser) => {
            if let Some(path) = resource_table::get_path_id(PathBuf::from("")) {
                symbol_table::drop(path);
                namespace_table::drop(path);
            }

            let analyzer = Analyzer::new(&metadata);
            let mut context = Context::default();
            let mut ir = Ir::default();
            let mut errors = Vec::new();
            errors.append(&mut analyzer.analyze_pass1("project", &parser.veryl));
            errors.append(&mut Analyzer::analyze_post_pass1());
            errors.append(&mut analyzer.analyze_pass2(
                "project",
                &parser.veryl,
                &mut context,
                Some(&mut ir),
            ));
            errors.append(&mut Analyzer::analyze_post_pass2());

            let err = !errors.is_empty();
            let diagnostics = extract_diagnostics(&errors);
            let content = if err {
                let mut text = String::new();
                for e in errors {
                    text.push_str(&render_err(e.into()));
                }
                text
            } else {
                ir.to_string()
            };

            Result {
                err,
                content,
                diagnostics,
            }
        }
        Err(e) => {
            let diagnostics = extract_diagnostic_single(&e);
            Result {
                err: true,
                content: render_err(e.into()),
                diagnostics,
            }
        }
    }
}

#[wasm_bindgen]
pub struct SimResult {
    err: bool,
    console: String,
    vcd: String,
    top_module: String,
    diagnostics: String,
}

#[wasm_bindgen]
impl SimResult {
    #[wasm_bindgen]
    pub fn err(&self) -> bool {
        self.err
    }

    #[wasm_bindgen]
    pub fn console(&self) -> String {
        self.console.clone()
    }

    #[wasm_bindgen]
    pub fn vcd(&self) -> String {
        self.vcd.clone()
    }

    #[wasm_bindgen]
    pub fn top_module(&self) -> String {
        self.top_module.clone()
    }

    #[wasm_bindgen]
    pub fn diagnostics(&self) -> String {
        self.diagnostics.clone()
    }
}

#[wasm_bindgen]
pub fn simulate(source: &str) -> SimResult {
    let metadata = metadata();
    match Parser::parse(source, &"") {
        Ok(parser) => {
            if let Some(path) = resource_table::get_path_id(PathBuf::from("")) {
                symbol_table::drop(path);
                namespace_table::drop(path);
            }

            let analyzer = Analyzer::new(&metadata);
            let mut context = Context::default();
            let mut ir = Ir::default();
            let mut errors = Vec::new();
            errors.append(&mut analyzer.analyze_pass1("project", &parser.veryl));
            errors.append(&mut Analyzer::analyze_post_pass1());
            errors.append(&mut analyzer.analyze_pass2(
                "project",
                &parser.veryl,
                &mut context,
                Some(&mut ir),
            ));
            errors.append(&mut Analyzer::analyze_post_pass2());

            if !errors.is_empty() {
                let diagnostics = extract_diagnostics(&errors);
                let mut text = String::new();
                for e in errors {
                    text.push_str(&render_err(e.into()));
                }
                return SimResult {
                    err: true,
                    console: text,
                    vcd: String::new(),
                    top_module: String::new(),
                    diagnostics,
                };
            }

            let config = veryl_simulator::Config::default();
            let mut test_module_name = None;
            let mut test_ir = None;

            for component in &ir.components {
                if let air::Component::Module(m) = component {
                    if let Ok(sim) = sim_ir::build_ir(&ir, m.name, &config) {
                        if sim.event_statements.contains_key(&Event::Initial) {
                            let module_name = m.name.to_string();
                            test_module_name = Some(module_name);
                            test_ir = Some(sim);
                            break;
                        }
                    }
                }
            }

            let (module_name, sim) = match (test_module_name, test_ir) {
                (Some(name), Some(ir)) => (name, ir),
                _ => {
                    return SimResult {
                        err: true,
                        console: "No testbench module found. Add a module with an `initial` block."
                            .to_string(),
                        vcd: String::new(),
                        top_module: String::new(),
                        diagnostics: "[]".to_string(),
                    };
                }
            };

            let vcd_buffer = Arc::new(Mutex::new(Vec::new()));
            let shared_vec = SharedVec(vcd_buffer.clone());
            let dumper = WaveDumper::new_vcd(Box::new(shared_vec));

            output_buffer::enable();

            let top_module = module_name.clone();
            match testbench::run_native_testbench(sim, Some(dumper), module_name) {
                Ok(result) => {
                    let console_output = output_buffer::take();
                    let vcd_data = vcd_buffer.lock().unwrap();
                    let vcd_str = String::from_utf8_lossy(&vcd_data).to_string();

                    match result {
                        TestResult::Pass => SimResult {
                            err: false,
                            console: console_output,
                            vcd: vcd_str,
                            top_module,
                            diagnostics: "[]".to_string(),
                        },
                        TestResult::Fail(msg) => SimResult {
                            err: true,
                            console: if console_output.is_empty() {
                                msg
                            } else {
                                format!("{console_output}\n{msg}")
                            },
                            vcd: vcd_str,
                            top_module,
                            diagnostics: "[]".to_string(),
                        },
                    }
                }
                Err(e) => {
                    let console_output = output_buffer::take();
                    SimResult {
                        err: true,
                        console: if console_output.is_empty() {
                            format!("{e}")
                        } else {
                            format!("{console_output}\n{e}")
                        },
                        vcd: String::new(),
                        top_module,
                        diagnostics: "[]".to_string(),
                    }
                }
            }
        }
        Err(e) => {
            let diagnostics = extract_diagnostic_single(&e);
            SimResult {
                err: true,
                console: render_err(e.into()),
                vcd: String::new(),
                top_module: String::new(),
                diagnostics,
            }
        }
    }
}

#[wasm_bindgen]
pub fn format(source: &str) -> Result {
    let metadata = metadata();
    match Parser::parse(source, &"") {
        Ok(parser) => {
            let mut formatter = Formatter::new(&metadata);
            formatter.format(&parser.veryl, source);
            Result {
                err: false,
                content: formatter.as_str().to_owned(),
                diagnostics: "[]".to_string(),
            }
        }
        Err(e) => {
            let diagnostics = extract_diagnostic_single(&e);
            Result {
                err: true,
                content: render_err(e.into()),
                diagnostics,
            }
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::path::PathBuf;
    use wasm_bindgen_test::*;

    fn get_default_code() -> String {
        let path = std::env::var("CARGO_MANIFEST_DIR").unwrap();
        let mut path = PathBuf::from(path);
        path.push("html");
        path.push("index.html");
        let text = std::fs::read_to_string(path).unwrap();
        let mut code = false;
        let mut code_text = String::new();
        for line in text.lines() {
            if line.contains("</textarea") {
                code = false;
            }
            if code {
                code_text.push_str(&format!("{line}\n"));
            }
            if line.contains("<textarea") {
                code = true;
            }
        }
        code_text
    }

    const SRC: &str = "// module definition
module ModuleA #(
    param ParamA: u32 = 10,
    const ParamB: u32 = 10, // trailing comma is allowed
) (
    i_clk : input  clock            ,
    i_rst : input  reset            ,
    i_sel : input  logic            ,
    i_data: input  logic<ParamA> [2], // `[]` means unpacked array
    o_data: output logic<ParamA>    , // `<>` means packed array
) {
    // const parameter declaration
    //   `param` is not allowed in module
    const ParamC: u32 = 10;

    // variable declaration
    var r_data0: logic<ParamA>;
    var r_data1: logic<ParamA>;

    // value binding
    let _w_data2: logic<ParamA> = i_data[0];

    // always_ff statement with reset
    //   `always_ff` can take a mandatory clock and a optional reset
    //   `if_reset` means `if (i_rst)`. This conceals reset polarity
    //   `()` of `if` is not required
    //   `=` in `always_ff` is non-blocking assignment
    always_ff (i_clk, i_rst) {
        if_reset {
            r_data0 = 0;
        } else if i_sel {
            r_data0 = i_data[0];
        } else {
            r_data0 = i_data[1];
        }
    }

    // always_ff statement without reset
    always_ff (i_clk) {
        r_data1 = r_data0;
    }

    assign o_data = r_data1;
}
";

    #[test]
    fn build_default_code() {
        let text = get_default_code();
        let ret = build(&text);

        assert_eq!(ret.err, false);
        assert_ne!(ret.content, "");
    }

    #[test]
    fn format_default_code() {
        let text = get_default_code();
        let ret = format(&text);

        assert_eq!(ret.err, false);
        assert_eq!(ret.content, text);
    }

    #[test]
    fn dump_ir_default_code() {
        let text = get_default_code();
        let ret = dump_ir(&text);

        assert_eq!(ret.err, false);
        assert_ne!(ret.content, "");
    }

    #[wasm_bindgen_test]
    fn dump_ir_on_wasm() {
        let ret = dump_ir(&SRC);

        assert_eq!(ret.err, false);
        assert_ne!(ret.content, "");
    }

    #[wasm_bindgen_test]
    fn build_on_wasm() {
        let ret = build(&SRC);

        assert_eq!(ret.err, false);
        assert_ne!(ret.content, "");
    }

    #[wasm_bindgen_test]
    fn format_on_wasm() {
        let ret = format(&SRC);

        assert_eq!(ret.err, false);
        assert_eq!(ret.content, SRC);
    }

    const SIM_SRC: &str = "module Counter (
    clk: input  clock    ,
    rst: input  reset    ,
    cnt: output logic<8>,
) {
    always_ff {
        if_reset {
            cnt = 0;
        } else {
            cnt += 1;
        }
    }
}

#[test(test_counter)]
module test_counter {
    inst clk: $tb::clock_gen;
    inst rst: $tb::reset_gen;

    var cnt: logic<8>;

    inst dut: Counter (
        clk: clk,
        rst: rst,
        cnt: cnt,
    );

    initial {
        rst.assert(clk);
        clk.next  (10);
        $assert   (cnt == 8'd10);
        $finish   ();
    }
}
";

    #[test]
    fn simulate_counter() {
        let ret = simulate(&SIM_SRC);

        assert_eq!(ret.err, false);
        assert_ne!(ret.vcd, "");
    }

    #[wasm_bindgen_test]
    fn simulate_on_wasm() {
        let ret = simulate(&SIM_SRC);

        assert_eq!(ret.err, false);
        assert_ne!(ret.vcd, "");
    }
}
