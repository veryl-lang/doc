# Using a Component

In addition to the built-in `$tb` components, verification components written in Rust can be used in native tests.
A component is a Rust type that acts as a bus functional model (BFM), a protocol checker or a golden model, run by Veryl's built-in simulator.

A component behaves like an `always_ff` process: it updates on clock edges, inputs observe pre-edge values, and outputs commit together with flip-flops.
Components can also expose zero-time methods callable from `initial` blocks, such as loading a memory image or checking a value.

You can use a component from a dependency in a testbench without writing any Rust yourself; this page covers that.
To write your own component and register it, see [Writing a Component](./02_writing_a_component.md).

## Installing Rust

Components run as compiled Rust code, so installing a [Rust toolchain](https://www.rust-lang.org/tools/install) is recommended.
With one installed, components are built from source and run as native code — noticeably faster for heavier models.

Without it, you can still use components that a dependency ships as a prebuilt wasm binary — typically the simpler checkers and models.
`veryl test` uses the prebuilt automatically when cargo is not available.

## Adding a component

When a package declares verification components, they become available under `$comp::<dependency name>::<component name>` just by adding it as a dependency:

```toml
[dependencies]
axi_vip = {github = "example/axi_vip", version = "1.0.0"}
```

```veryl
#[test(test_axi)]
module test_axi {
    inst clk: $tb::clock_gen;
    inst bus: AxiIf;

    inst bfm: $comp::axi_vip::axi_master (
        clk            ,
        bus: bus.master,
    );

    // ...
}
```

## Instantiating in a test

Components can only be instantiated inside `#[test]` modules.

### Clocked components

A clocked component is instantiated with `inst`, taking parameters with `#()` (not generic arguments) and port connections like a module:

```veryl
#[test(test_req_ack)]
module test_req_ack {
    inst clk: $tb::clock_gen;
    inst rst: $tb::reset_gen ( clk );

    var req: logic;
    var ack: logic;

    inst dut: Peripheral ( clk, rst, req, ack );

    inst chk: $comp::my_checker #( LIMIT: 8 ) ( clk, req, ack );

    initial {
        rst.assert();
        req = 1;
        clk.next(16);
        $finish();
    }
}
```

Port connections can also reference DUT-internal signals hierarchically (e.g. `val: dut.u_sub.internal_reg`), so internal signals do not have to be routed to the top level for observation.
A modport of an interface instance can be connected to a component's interface port as well (`bus: bus.master`).
Every port the component declares must be connected; a missing connection is reported at analysis time.

### Method-only components

A method-only component has no ports and is declared with `var`:

```veryl
#[test(test_golden)]
module test_golden {
    var g: $comp::golden   ;
    var x: logic        <8>;

    initial {
        g.set(42);
        x = g.get();
        g.check(x);
        $finish();
    }
}
```

The `var` form takes parameters as generic arguments, positionally in the order the component declares them.
Any constant expression is accepted:

```veryl
#[test(test_wide)]
module test_wide {
    const W: u32 = 96;

    var w: $comp::wide_model::<W>    ;
    var x: logic                 <96>;

    initial {
        w.put(96'h55);
        x = w.get();
        $finish();
    }
}
```

### Method calls

Methods can be called in statement position and inside expressions:

```veryl
#[test(test_method_call)]
module test_method_call {
    var g: $comp::golden   ;
    var x: logic        <8>;

    initial {
        g.set(42); // statement position
        x = g.get();
        $assert(g.get() + 1 == 43, "expression"); // expression position
        $finish();
    }
}
```

An expression-position call runs just before its enclosing statement, as its own zero-time step.
Method arguments are positional; named arguments are not supported.

Methods are not limited to the `var` form: an `inst` component takes zero-time calls too (e.g. `iss.load("test.elf");`).

## Random seed

A component that uses randomization derives it from a deterministic per-instance seed, so a run can be reproduced from its base seed.
By default `veryl test` draws a fresh random base seed each run and prints it (`Test seed: ...`); to reproduce a run, pass that value with `--seed`, or pin it with the `seed` field in the `[test]` section.

```toml
[test]
seed = 42
```
