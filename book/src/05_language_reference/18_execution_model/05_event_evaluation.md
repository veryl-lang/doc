# Event Evaluation

When a clock edge or reset event occurs, all `always_ff` blocks sensitive to that event are executed.

1. All reads from FF variables see the **current** (pre-commit) values.
2. All writes to FF variables are **non-blocking** and do not take effect until the FF commit phase.

Because all blocks read from the same snapshot and write to independent "next" slots, the execution order does not affect the result.

```veryl,playground
module ModuleA (
    i_clk: input clock,
) {
    var a: logic<8>;
    var b: logic<8>;

    // These two blocks produce the same result regardless of evaluation order:

    always_ff {
        a = b; // a.next = b.current
    }

    always_ff {
        b = a; // b.next = a.current
    }

    // After commit: a and b have swapped their values.
}
```

## Source Order

`always_ff` blocks for the same event are evaluated in source order.

## Initial and Final Blocks

`initial` blocks are evaluated once at simulation start, `final` blocks once at simulation end.
These blocks are not synthesizable and are used for testbench and debugging purposes.
