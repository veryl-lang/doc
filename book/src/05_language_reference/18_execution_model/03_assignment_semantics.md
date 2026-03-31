# Assignment Semantics

Veryl uses a single `=` operator for all assignments.
The semantics — blocking or non-blocking — are automatically determined by context, enforcing SystemVerilog best practices.

## Blocking Assignment

In `always_comb` and `assign`, `=` performs a **blocking assignment** — the value is immediately visible to subsequent reads.

```veryl,playground
module ModuleA {
    let a: logic<8> = 1;
    var b: logic<8>;
    var c: logic<8>;

    always_comb {
        b = a + 1; // b is immediately updated to 2
        c = b + 1; // c reads the new value of b (2), so c = 3
    }
}
```

## Non-Blocking Assignment

In `always_ff`, `=` for module-level variables performs a **non-blocking assignment** — the value does not take effect until the FF commit.

```veryl,playground
module ModuleA (
    i_clk: input clock,
) {
    var a: logic<8>;
    var b: logic<8>;

    always_ff {
        // a.next = 1 (current a is unchanged during this phase)
        a = 1;
        // reads a.current (not a.next), so b.next = a.current + 1
        b = a + 1;
    }
}
```

## Local Bindings in `always_ff`

A `let` inside `always_ff` uses **blocking** semantics and is never mapped to a flip-flop.

```veryl,playground
module ModuleA (
    i_clk: input clock,
) {
    var a     : logic<8>;
    var result: logic<8>;

    always_ff {
        // blocking: doubled is immediately available
        let doubled: logic<8> = a * 2;
        // non-blocking: result.next = doubled + 1
        result = doubled + 1;
    }
}
```

## Mapping to SystemVerilog

| Veryl context | Veryl syntax | SystemVerilog equivalent |
|---|---|---|
| `always_comb` | `x = expr;` | `x = expr;` (blocking) |
| `assign` | `assign x = expr;` | `assign x = expr;` (continuous) |
| `always_ff`, module-level var | `x = expr;` | `x <= expr;` (non-blocking) |
| `always_ff`, local `let` | `let x: T = expr;` | `x = expr;` (blocking) |
| `always_ff`, compound | `x += expr;` | `x <= x + expr;` (non-blocking) |
