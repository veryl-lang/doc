# Determinism

Veryl guarantees deterministic simulation: given the same source code and the same stimulus sequence, any compliant simulator will produce identical signal values at every simulation step.

## How Veryl Achieves Determinism

Veryl's language constraints eliminate common sources of non-determinism in SystemVerilog:

1. **No blocking/non-blocking confusion** — A single `=` operator automatically infers the correct semantics, making it impossible to use the wrong assignment type.
2. **Read/write isolation for FF variables** — All `always_ff` blocks read from the same snapshot and write to independent "next" slots, so evaluation order never affects the result.
3. **Deterministic combinational evaluation** — Blocks propagate until stable, and combinational loops are detected at compile time.
4. **Explicit clock domain crossing** — Cross-domain access without `unsafe (cdc)` is a compile-time error, preventing accidental races.

## Scope of the Guarantee

The guarantee applies to **observable signal values at simulation step boundaries** (after each FF commit). Internal evaluation order within a phase is implementation-defined but does not affect observable results.

## Relation to SystemVerilog

The transpiled SystemVerilog output follows well-established deterministic patterns:

- `always_ff` with `<=` (non-blocking) for sequential logic
- `always_comb` with `=` (blocking) for combinational logic
- No mixed blocking/non-blocking assignments to the same variable
