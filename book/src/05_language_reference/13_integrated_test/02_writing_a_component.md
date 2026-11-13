# Writing a Component

When no existing component fits, you can write your own in Rust.
A component is built by cargo and driven by Veryl's built-in simulator; for how to use one in a testbench, see [Using a Component](./01_using_a_component.md).

## Creating a component

`veryl new --component <path>` scaffolds a component, adapting to where you run it.

Inside an existing Veryl project it drops a cargo package at `<path>` and registers it in the project's `Veryl.toml`, so `$comp::<name>` resolves right away:

```
$ veryl new --component my_checker
[INFO ]      Created "my_checker" component
[INFO ]   Registered $comp::my_checker in Veryl.toml
```

Run on its own it scaffolds a self-contained project — at once a cargo package and a Veryl project — ready to `veryl test` and to publish as a dependency:

```
$ veryl new --component my_checker
[INFO ]      Created "my_checker" component project
[INFO ]   Run `veryl test` in my_checker to try it
```

```text
my_checker/
├── Veryl.toml            # registers the crate as a component
├── component/            # the cargo package (crate-type = ["cdylib"])
│   ├── Cargo.toml
│   └── src/lib.rs
└── examples/
    └── my_checker.veryl  # a usage example, run by `veryl test`
```

## Defining the component

The package is a cargo crate depending on the `veryl-component` crate, defined by three macros: `#[derive(Component)]` on a struct declares the interface, `#[component_impl]` on an inherent `impl` block declares the behavior, and `veryl_component_export!` exports it under its component name.

```rust,noplayground
use veryl_component::*;

/// Checks that `ack` follows `req` within `LIMIT` cycles.
#[derive(Component)]
pub struct ReqAckChecker {
    /// Sampling clock.
    clk: ClockPort,
    req: InputPort,
    ack: InputPort,
    /// Cycle budget between request and acknowledge.
    #[param(name = "LIMIT")]
    limit: u64,
    waiting: u64,
}

#[component_impl]
impl ReqAckChecker {
    fn on_clock(&mut self, ctx: &mut SimCtx) -> Result<()> {
        if ctx.read(self.ack).as_bool() {
            self.waiting = 0;
        } else if ctx.read(self.req).as_bool() {
            self.waiting += 1;
            if self.waiting > self.limit {
                ctx.fail(format!("no ack within {} cycles", self.limit));
            }
        }
        Ok(())
    }
}

veryl_component_export!("my_checker" => ReqAckChecker);
```

`#[derive(Component)]` classifies the struct fields:

* Fields typed `InputPort` / `OutputPort` become data ports. Their width is taken from the connected signal — a component that constrains its widths checks them itself in `on_build` from `port.width()`. The port name defaults to the field name; `#[port(name = "...")]` overrides it.
* Fields typed `ClockPort` / `ResetPort` become clock and reset ports (always 1 bit). They must be connected with a `clock`/`reset` typed expression, and only they fire the `on_clock`/`on_reset` hooks — besides clocks and resets passed to a method as [references](#reference-arguments), which fire them too.
* Fields with `#[param]` become elaboration-time parameters. Supported types are integers, `bool`, `String` and `Value`; an `Option` of those marks the parameter as omittable. `#[param(name = "LIMIT")]` overrides the Veryl-side name.
* All other fields are plain state, initialized with `Default`.

Every declared port must be connected at the instantiation site; a missing connection is an analysis-time error.

A component with a `ClockPort` field is a `clocked` component, instantiated with `inst`; `method_only` components are declared with `var`. The optional `#[component(kind = ...)]` attribute states the shape explicitly and must agree with the fields: a clock/reset port on a `method_only` component is a compile error. A `clocked` component may instead take all its clocks through a method's `ClockPort` argument, so it then declares `kind = clocked` without a `ClockPort` field; with neither a `ClockPort` field nor such a method, it is a compile error.
Doc comments on the struct, ports, parameters and methods surface in `veryl doc` and in editor hovers.

`#[component_impl]` turns the reserved function names `on_build`, `on_init`, `on_reset`, `on_clock` and `on_finish` into simulation hooks, and every other function into a testbench method.

`veryl_component_export!` exports the type under its component name.
It generates the library's ABI entry points, so it is invoked exactly once per crate — not once per struct.
A library exporting several types lists them all in that single invocation:

```rust,noplayground
veryl_component_export!(
    "rv_iss"  => RvIss,
    "monitor" => Monitor,
);
```

## Interface ports

To connect a whole modport of an interface, declare its ports once in a struct deriving `VerylInterface`, and embed it in the component as an `#[interface]` field:

```rust,noplayground
#[derive(VerylInterface)]
#[interface(path = "$std::axi4_if", modport = "monitor")]
pub struct AxiMonitorPorts {
    awvalid: InputPort, // binds to member `awvalid`
    awready: InputPort,
    // ... the remaining modport members ...
}

#[derive(Component)]
#[component(kind = clocked)]
pub struct AxiChecker {
    clk: ClockPort,
    rst: ResetPort,
    #[interface]
    axi: AxiMonitorPorts, // interface port `axi`: connect as `axi: bus.monitor`
}
```

The struct names the interface (`path`) and one of its modports (`modport`); each field binds to the interface member of the same name, read hierarchically in the component (`self.axi.awvalid`). A member whose name is a Rust keyword is written as a raw identifier (`r#in: InputPort`).

Each `#[interface]` field is one interface port of the component, named after the field — the name a testbench connects (`axi: bus.monitor`). A component may declare several — a bridge with an upstream `slave` and a downstream `master`, or a dual-bus monitor embedding the same struct twice (`axi0`, `axi1`) — and they coexist with clock, reset and ordinary ports.

Every member the struct declares must exist in the connected interface — a missing member is an analysis-time error — while declaring only the members the component observes is fine.

## Naming

Several names appear around a component, but only one is part of the contract:

| Name | Written in | Must match |
|------|------------|------------|
| `$comp::foo` | Veryl source | the export name `veryl_component_export!("foo" => ...)`; a dependency's component is `$comp::vip::foo`, prefixed by the `[dependencies]` name `vip` |
| Rust type name (`ReqAckChecker`) | Rust source | nothing — only the export string is part of the contract |
| cargo crate name | the component's `Cargo.toml` | nothing — the artifact is located through `path =` |

## The `[[components]]` entry

`veryl new --component` has already added the `[[components]]` entry that makes every name the library exports available as `$comp::<name>`; you edit `Veryl.toml` by hand only to register a package created some other way, or to point at a committed prebuilt binary:

```toml
[[components]]
path = "my_checker"
# wasm = "prebuilt/my_checker.wasm"  # optional committed prebuilt binary
```

* `path` — path to the component's cargo package, relative to the directory containing `Veryl.toml`
* `wasm` — optional committed prebuilt wasm binary, generated by `veryl publish`

Testbenches that exercise the package's own components are best placed in the
[`examples` directory](../../06_development_environment/04_directory_layout.md#the-examples-directory):
they run with the package's own `veryl test` but are never analyzed by consumers.
Test modules kept in regular sources are also skipped when the package is consumed as a dependency.

## Hooks

All hooks are optional and take `&mut self, ctx: &mut SimCtx` (or `&mut BuildCtx` for `on_build`):

* `on_build` — called once per instance after ports and parameters are resolved
* `on_init` — called once at time 0 before `initial` blocks run; output writes become initial values
* `on_reset` — called on the events of a connected `ResetPort`, or of a reset passed by [reference](#reference-arguments): each clock edge while `rst.assert()` holds it (in place of `on_clock`), and the assertion of a reset the design produces
* `on_clock` — called on each edge of a connected `ClockPort`, or of a clock passed by [reference](#reference-arguments)
* `on_finish` — called when the test ends (normally or via `finish`/`fail`)

`SimCtx` provides the host services available inside hooks and methods:

* `ctx.read(port)` / `ctx.write(port, value)` — read the pre-edge value of an input, write an output (committed with FFs)
* `ctx.fail(msg)` / `ctx.finish()` — mark the test as failed / request normal termination at the end of the current cycle
* `ctx.log(msg)` — write a message to the test output
* `ctx.cycle()` / `ctx.time()` / `ctx.clock()` — cycle count, simulation time and the fired clock port
* `ctx.fired(port)` — whether the given `ClockPort` fired the current hook, for components connected to several clocks
* `ctx.open(path)` / `ctx.create(path)` / `ctx.append(path)` — file I/O; the returned handle implements `std::io::Read`/`Write`/`Seek`, so `BufReader`, `writeln!` and friends work on it
* `ctx.trace(var, value)` — update a waveform trace variable
* `ctx.is_4state()` — whether the simulation tracks four-state (X/Z) values

By default a simulation is two-state; `veryl test --4state` (or `[test].four_state = true`) makes it four-state.
Under a four-state run a port value carries an X/Z mask, inspected with `value.has_x()`, `value.has_z()` and `value.unknown_at(bit)`, and an output write drives the mask too.
Gate X/Z checks on `ctx.is_4state()` — a two-state run has none to observe.
Method arguments and return values are always two-state.

`BuildCtx` (available in `on_build`) additionally provides `ctx.param(name)`, `ctx.input(name)`, `ctx.output(name)`, `ctx.clock(name)`, `ctx.reset(name)`, `ctx.seed()` and `ctx.trace_var(name, width)`, which registers a component-internal signal for waveform dumping.

`ctx.seed()` returns a deterministic per-instance seed computed from the base test seed and the instance path; a component that randomizes should derive all of its randomness from it, so that pinning the base seed reproduces the run.
The base seed is random per run by default (printed by `veryl test`, reproducible with `--seed`); pin it with the `seed` field in the `[test]` section.

The `ctx` file I/O is the portable path: components using `std::fs` directly work only as native libraries, not as prebuilt wasm binaries.

## Testbench methods

Any non-hook function in the `#[component_impl]` block becomes a zero-time method callable from the testbench.
Methods take `&mut self, ctx: &mut SimCtx` followed by their arguments, and return `Result<T>`:

```rust,noplayground
#[derive(Component)]
#[component(kind = method_only)]
pub struct Golden {
    stored: u64,
}

#[component_impl]
impl Golden {
    fn set(&mut self, _ctx: &mut SimCtx, value: u64) -> Result<()> {
        self.stored = value;
        Ok(())
    }

    fn get(&mut self, _ctx: &mut SimCtx) -> Result<u64> {
        Ok(self.stored)
    }

    fn check(&mut self, ctx: &mut SimCtx, value: u64) -> Result<()> {
        if value != self.stored {
            ctx.fail(format!("expected {}, got {value}", self.stored));
        }
        Ok(())
    }
}
```

Supported argument types are `&str`, `String`, integers, `bool`, `Value`, and the [reference](#reference-arguments) types `ClockPort`, `ResetPort`, `InputPort`, `OutputPort` and `ModportRef`; supported return types are `()`, integers, `bool` and `Value`.

A `Value` **argument** carries whatever width the call-site expression has, so it needs no declaration. A `Value` **return** value must declare its width with `#[ret_width(...)]` (integer return types imply their own width); the width expression may be an integer, a parameter name, an interface constant qualified by an interface port (`axi.DATA_WIDTH_BYTES`), or arithmetic over them:

```rust,noplayground
#[derive(Component)]
#[component(kind = method_only)]
pub struct WideModel {
    #[param(name = "WIDTH")]
    width: u64,
    stored: Option<Value>,
}

#[component_impl]
impl WideModel {
    fn put(&mut self, _ctx: &mut SimCtx, v: &Value) -> Result<()> {
        self.stored = Some(v.clone());
        Ok(())
    }

    #[ret_width(WIDTH)]
    fn get(&mut self, _ctx: &mut SimCtx) -> Result<Value> {
        Ok(self.stored.clone().unwrap())
    }
}
```

A component [bound to an interface](#interface-ports) can follow the connected bus width instead of taking a redundant parameter — `<port>.<NAME>` refers to a constant visible in the interface the port is connected to (a constant declared in the interface body, or a member of its generic package argument):

```rust,noplayground
#[ret_width(axi.DATA_WIDTH_BYTES * 8)]
fn pop_read(&mut self, _ctx: &mut SimCtx) -> Result<Value> {
    /* ... */
}
```

The width resolves per instance, so the same component returns 32 bits on a 32-bit bus and 128 bits on a 128-bit one.

A `Value` is created by `Value::from_u64(v, width)` or `Value::from_bits(...)`, and read by the following methods:

* `width()` — the bit width
* `as_u64()` / `as_i64()` — the value as a 64-bit integer; an error if the value is wider than 64 bits
* `as_slice()` — all bits as 64-bit words, least significant word first; use it to read a value wider than 64 bits
* `mask_xz()` — the X/Z mask in the same word layout as `as_slice()`; `has_x()`, `has_z()` and `has_unknown()` test it

## Reference arguments

A method can take a reference to a clock, a reset, a signal or a modport instead of a value, so that the testbench decides which signals the component works on — like a virtual interface handed to a UVM agent.
The component keeps the reference and reads and writes through it in later hooks, exactly as through a connected port: reads see the pre-edge value, and writes commit together with flip-flops.

```rust,noplayground
#[derive(Component)]
#[component(kind = clocked)]
pub struct Responder {
    clk: ClockPort,
    bus: Option<ModportRef>,
    count: Option<OutputPort>,
    requests: u64,
}

#[component_impl]
impl Responder {
    /// Answers requests on the given modport.
    fn attach(&mut self, _ctx: &mut SimCtx, bus: ModportRef) -> Result<()> {
        self.bus = Some(bus);
        Ok(())
    }

    /// Counts the requests in the given variable.
    fn count_into(&mut self, _ctx: &mut SimCtx, count: OutputPort) -> Result<()> {
        self.count = Some(count);
        Ok(())
    }

    fn on_clock(&mut self, ctx: &mut SimCtx) -> Result<()> {
        if let Some(bus) = &self.bus {
            let req = ctx.read_u64(bus.input("req")?);
            ctx.write_u64(bus.output("ack")?, req);
            self.requests += req;
        }
        if let Some(count) = self.count {
            ctx.write_u64(count, self.requests);
        }
        Ok(())
    }
}
```

```veryl
#[test(test_responder)]
module test_responder {
    inst clk: $tb::clock_gen;
    inst bus: ReqAckIf;
    var  cnt: logic<8>;

    inst dut: Requester ( clk, bus: bus.requester );
    inst rsp: $comp::responder ( clk );

    initial {
        rsp.attach(bus.responder);
        rsp.count_into(cnt);
        clk.next(16);
        $finish();
    }
}
```

The argument type selects what may be passed:

| Argument type | Passed from the testbench | The component |
|---|---|---|
| `ClockPort` | a clock of the test module (`clk`; `clock_posedge` and `clock_negedge` too) | runs `on_clock` on its active edges |
| `ResetPort` | a reset of the test module (`rst`) | runs `on_reset` on its events |
| `InputPort` | a variable (`x`, `dut.u_sub.x`) | reads it |
| `OutputPort` | a variable of the test module (`y`) | drives it |
| `ModportRef` | a modport of an interface instance in the test module (`bus.responder`), of any interface | reads its `input` members and drives its `output` members |

A reference names its variables directly: an expression or a select (`x + 1`, `x[0]`) is an analysis-time error, and so is a `ClockPort`, a `ResetPort` or an `OutputPort` reference into a child instance.

The reference is bound when the method is called, so a testbench may choose at run time which references to pass.
As with port connections, a variable may be read through any number of references, which share one port, but driven through one only: passing an `OutputPort` reference, or a modport with an `output` member, fails the test when its variable is already driven — by the design, by another component, or by the same component.

A clock passed by reference fires `on_clock` from the call on, like a connected clock port; `ctx.fired(port)` tells which clock fired the hook.
A reset passed by reference fires `on_reset` likewise, like a connected reset port.
A reset the design produces fires `on_reset` only when some `always_ff` of the design resets on it.
A component that takes all its clocks this way has no clock port, declares `kind = clocked`, and is instantiated without a clock connection:

```rust,noplayground
#[derive(Component)]
#[component(kind = clocked)]
pub struct EdgeCounter {
    watched: Vec<(ClockPort, OutputPort, u64)>,
}

#[component_impl]
impl EdgeCounter {
    /// Counts the edges of `clk` in `count`.
    fn watch(&mut self, _ctx: &mut SimCtx, clk: ClockPort, count: OutputPort) -> Result<()> {
        self.watched.push((clk, count, 0));
        Ok(())
    }

    fn on_clock(&mut self, ctx: &mut SimCtx) -> Result<()> {
        for (clk, count, n) in &mut self.watched {
            if ctx.fired(*clk) {
                *n += 1;
                ctx.write_u64(*count, *n);
            }
        }
        Ok(())
    }
}
```

```veryl
module ClockDivider (
    i_clk: input  '_ clock,
    i_rst: input  '_ reset,
    o_clk: output '_ clock,
) {
    var toggle: logic;
    always_ff (i_clk, i_rst) {
        if_reset {
            toggle = 0;
        } else {
            toggle = ~toggle;
        }
    }
    assign o_clk = i_clk & toggle;
}

#[test(test_edge_counter)]
module test_edge_counter {
    inst clk    : $tb::clock_gen;
    inst rst    : $tb::reset_gen (clk);
    var  div_clk: clock        ;
    inst div    : ClockDivider (
        i_clk: clk    ,
        i_rst: rst    ,
        o_clk: div_clk,
    );
    var fast: logic<8>;
    var slow: logic<8>;

    inst cnt: $comp::edge_counter;

    initial {
        rst.assert();
        cnt.watch(clk, fast);
        cnt.watch(div_clk, slow);
        clk.next(8);
        $assert(fast == 8, "every edge of clk");
        $assert(slow == 4, "every edge of the divided clock");
        $finish();
    }
}
```

A `ModportRef` gives `interface()`, `modport()`, `path()` and its `members()`; `input(name)` and `output(name)` return the member port of that name, checking that the modport gives it that direction.
A port bound for a reference also describes its variable: `dims()` returns the packed dimensions, outermost first (`[4, 8]` for `logic<4, 8>`), `unpacked_dims()` the unpacked ones (always empty for now), and `path()` the hierarchical path.

Elements of a packed array are read and written by index with `ctx.read_elem(port, &[...])` / `ctx.write_elem(port, &[...], value)`, and a bit range with `ctx.read_bits(port, &[], lsb, width)` / `ctx.write_bits(port, &[], lsb, width, value)`.
Indices go outermost first and may stop short of the last dimension; elements are placed as in SystemVerilog, so `[2]` of `logic<4, 8>` is bits `[23:16]`.
A partial write keeps the bits written elsewhere in the same hook.

## Unit testing with MockSim

The `veryl_component::testing` module provides `MockSim`, an in-process stand-in for the simulator host.
It drives a component through the same `SimCtx`/`BuildCtx` API, so components can be unit-tested with plain `cargo test` without the Veryl simulator:

```rust,noplayground
#[cfg(test)]
mod tests {
    use super::*;
    use veryl_component::testing::MockSim;

    #[test]
    fn fails_without_ack() {
        let mut sim = MockSim::new()
            .param("LIMIT", 2u64)
            .input("clk", 1)
            .input("req", 1)
            .input("ack", 1);
        let mut c = sim.build::<ReqAckChecker>().unwrap();
        sim.set("req", 1u64);
        for _ in 0..3 {
            sim.clock(&mut c).unwrap();
        }
        assert!(sim.failed());
    }
}
```

`MockSim` declares parameters and ports with the builder methods, constructs the component with `build`, drives inputs with `set` and hooks with `clock`/`reset`/`init`/`finish`, calls methods with `call`, and exposes the results through `get`, `failed`, `failures`, `logs` and `finish_requested`.
For a [reference argument](#reference-arguments), `clock_ref`, `reset_ref`, `signal_ref` and `modport_ref` bind the ports and return the argument to pass to `call`; the bound ports are then driven and observed with `set` and `get` like any other, a bound clock is fired with `set_fired_clock` and `clock`, and a bound reset with `reset`.

## Committing the interface manifest

Type-checking a testbench needs a component's *interface* — its ports, parameters and methods — not its behavior.
`veryl publish` records that interface in a `veryl.manifest.json` file next to the component's `Cargo.toml`, and regenerates it when the component sources change; commit it alongside the sources.

Committing the manifest lets a consumer analyze `$comp::<name>` usages without building the component — in particular without a Rust toolchain, where a native component offers no other interface source (a prebuilt wasm binary embeds the same interface).

## Publishing a prebuilt wasm

By default, consumers build the component from source with cargo.
Committing a prebuilt wasm binary lets consumers without a Rust toolchain use it; declaring `wasm =` on the `[[components]]` entry opts the package into this distribution:

```toml
[[components]]
path = "my_checker"
wasm = "prebuilt/my_checker.wasm"
```

`veryl publish` builds the component for the `wasm32-unknown-unknown` target and writes the binary to the declared path.
Building the prebuilt wasm requires that target to be installed; add it with `rustup target add wasm32-unknown-unknown`.
When a prebuilt no longer matches its sources, `veryl publish` regenerates it, and `veryl test` reports a warning.

## Backend selection

Which form is used at test time is selected as follows:

* When cargo is available, the component is built from source.
* Otherwise the committed prebuilt wasm is used, if declared.

The `component_backend` field in the `[test]` section pins the selection:

```toml
[test]
component_backend = "wasm"  # or "native"
```

Pinning `wasm` is how a publisher verifies the prebuilt binary its consumers will run — the default never chooses it while cargo is available — and how an untrusted component is kept in the sandbox. Pinning `native` fails instead of silently falling back to wasm when cargo is missing.

### Native and wasm compared

The API and simulation semantics are identical on both backends; they differ in what the component can do and how it runs:

| | Built from source (native) | Prebuilt wasm |
|---|---|---|
| Consumer needs | a Rust toolchain | nothing — the committed binary |
| Available APIs | any Rust crate (networking, native libraries, GUI, …) | compute plus the host services only |
| Isolation | unsandboxed | sandboxed: 256 MiB memory cap, file access gated by `requires(file)`, runaway hooks trapped |
| Speed | native code | slower for compute-heavy models such as a full ISS |

Host capabilities are declared in the `#[component]` attribute: `requires(file)` allows host-mediated file I/O, and `requires(native)` marks a component as native-only.
Anything beyond compute and the host services — direct `std::fs`, networking, native libraries, or a GUI — makes a component native-only, and it cannot ship as wasm.

## Limitations

* Method arguments and return values are two-state: X/Z is dropped (port values carry X/Z under a four-state run).
* Method return values are limited to 512 bits by the ABI.
* Instance arrays and unpacked-array connections to component ports are not supported.
* Reference arguments cannot name unpacked arrays, pass a clock or a reset inside a child instance, drive a variable inside a child instance, or name a modport of an interface instance inside a child instance.
