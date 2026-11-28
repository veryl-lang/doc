# SystemVerilog Interoperation

If you want to access to items of SystemVerilog, `$sv` namespace can be used.
For example, "ModuleA" in SystemVerilog source code can be accessed by `$sv::ModuleA`.
Veryl don't check the existence of the items.

Veryl compiler emits the path name as is excluding `$sv::`.
Therefore, symbols in other HDLs like Verilog/VHDL can be refered through `$sv::` too.
It depeneds on implementation (e.g. simulator, synthesizer) whether each symbols can be resolved.

```veryl,playground
module ModuleA {
    let _a: logic = $sv::PackageA::ParamA;

    inst b: $sv::ModuleB;
    inst c: $sv::InterfaceC;
}
```

To access some identifiers which are used as Veryl's keywords, raw identifier can be used.


```veryl,playground
module ModuleA (
    i_clk: input clock,
) {
    inst a: $sv::ModuleA (
        // clock: i_clk
        // ^ this is syntax error because `clock` is a keyword
        // Instead of it, `r#clock` can be used
        r#clock: i_clk,
    );
}
```

## Macro Reference

Macros defined by `` `define `` in SystemVerilog can be referred through `$define` namespace.
A reference under `$define` is emitted as a macro reference with a backquote prefix.
For example, `$define::WIDTH` is emitted as `` `WIDTH ``.
As with `$sv`, the rest of the path is emitted with `::` separators, so a macro expanding to a package name can be used to refer its members.
Veryl doesn't check the existence and the value of the macros.

```veryl,playground
module ModuleA (
    i_a: input logic<$define::WIDTH>,
) {
    const A: u32           = $define::A;
    const B: u32           = $define::PKG::B;
    var   c: $define::TYPE;
    assign c = A + B;
}
```

## Built-in System Functions

Veryl recognizes IEEE 1800 SystemVerilog system tasks and functions directly as built-in identifiers without requiring `$sv::` prefixing. These are validated and type-checked natively by the analyzer:

* **Bitwise & Query**: `$countones(expr)`, `$countbits(expr, ...)`, `$onehot(expr)`, `$onehot0(expr)`, `$isunknown(expr)`, `$bits(type)`, `$size(array)`.
* **Math Functions**: `$clog2(expr)`, `$ln(expr)`, `$log10(expr)`, `$exp(expr)`, `$sqrt(expr)`, `$pow(x, y)`, `$floor(expr)`, `$ceil(expr)`, `$sin(expr)`, `$cos(expr)`, `$tan(expr)`, `$hypot(x, y)`.
* **Sampled & Temporal Functions**: `$sampled(expr)`, `$rose(expr)`, `$fell(expr)`, `$stable(expr)`, `$past(expr)`, `$rose_gclk(expr)`, `$fell_gclk(expr)`.
* **Assertions & Control**: `$assert(cond, ...)`, `$assert_continue(cond, ...)`, `$asserton`, `$assertoff`, `$assertkill`.
* **Simulation & Diagnostics**: `$display(...)`, `$write(...)`, `$monitor(...)`, `$finish`, `$stop`, `$time`, `$realtime`.
* **Memory & File I/O**: `$readmemh(path, mem)`, `$readmemb(path, mem)`, `$fopen(...)`, `$fclose(...)`, `$fread(...)`, `$fdisplay(...)`.

```veryl,playground
module ModuleA (
    i_data: input  logic<8>,
    o_pop : output u32     ,
    o_hot : output logic   ,
) {
    assign o_pop = $countones(i_data);
    assign o_hot = $onehot(i_data);
}
```

