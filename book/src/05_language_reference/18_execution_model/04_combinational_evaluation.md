# Combinational Evaluation

Combinational logic (`always_comb` and `assign`) follows SystemVerilog semantics: each block is implicitly sensitive to its inputs and re-evaluated whenever they change.

When a block updates a signal, dependent blocks are automatically re-triggered until all signals stabilize.

```veryl,playground
module ModuleA {
    var a: logic<8>;
    var b: logic<8>;
    var c: logic<8>;

    assign a = 1;

    always_comb {
        b = a + 1; // re-evaluated when a changes
    }

    always_comb {
        c = b + 1; // re-evaluated when b changes
    }
}
```

In this example, the values are always `a = 1`, `b = 2`, `c = 3`, regardless of initial evaluation order.

## Combinational Loops

A combinational loop — where a variable depends on itself without an intervening register — is detected at compile time and reported as an error.

```text
// ERROR: combinational loop
var x: logic<8>;
always_comb {
    x = x + 1; // x depends on itself
}
```

## Implementation Note

Veryl's built-in simulator uses topological sorting to optimize evaluation order; the observable results are equivalent to the event-driven model described above.
