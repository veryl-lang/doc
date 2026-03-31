# Variable Classification

Variables are classified by their assignment context, which determines storage and assignment semantics.

## FF Variables (Registers)

A module-level `var` assigned inside `always_ff` becomes a **flip-flop (FF) variable**.
FF variables use a two-buffer model: a **current** value and a **next** value.
The next value becomes current only after the FF commit phase (see [Simulation Cycle](./02_simulation_cycle.md)).

## Combinational Variables

A module-level `var` assigned inside `always_comb` or via `assign` becomes a **combinational variable**.
Writes take effect immediately and are visible to subsequent reads in evaluation order.

A module-level `let` is a shorthand for `var` + `assign`, so it also produces a combinational variable.

## Constants

A `const` declaration defines an immutable **compile-time constant** that does not participate in the simulation cycle.

## Local Bindings

A `let` inside an `always_ff` or `always_comb` block creates a **local binding**.
Local bindings always use blocking semantics, even inside `always_ff`, and are never mapped to flip-flops.

```veryl,playground
module ModuleA (
    i_clk: input clock,
    i_rst: input reset,
) {
    var a: logic<8>;
    var b: logic<8>;

    // combinational (shorthand for var + assign)
    let c: logic<8> = a + 1;

    // compile-time constant
    const INIT: logic<8> = 0;

    always_ff {
        if_reset {
            // FF variable (non-blocking)
            a = 0;
        } else {
            // local binding (blocking, not a FF)
            let temp: logic<8> = b + 1;
            // FF variable (non-blocking)
            a = temp;
        }
    }

    always_comb {
        // combinational variable (blocking)
        b = c + 1;
    }
}
```
