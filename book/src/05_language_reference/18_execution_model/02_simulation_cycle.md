# Simulation Cycle

A simulation step consists of three phases executed in strict order, corresponding to a simplified view of the SystemVerilog scheduling regions.

## The Three Phases

```text
    ┌──────────────────────────┐
    │  Phase 1: Combinational  │  always_comb / assign blocks
    │  Settlement              │  re-triggered on input changes
    │  (SV Active region)      │  until all signals stabilize
    └────────────┬─────────────┘
                 │
    ┌────────────▼─────────────┐
    │  Phase 2: Event          │  always_ff blocks executed
    │  Evaluation              │  Reads: current FF values
    │  (SV Active + NBA)       │  Writes: scheduled as NBA
    └────────────┬─────────────┘
                 │
    ┌────────────▼─────────────┐
    │  Phase 3: FF Commit      │  All NBA writes take effect
    │  (SV NBA Update)         │  Re-triggers Phase 1
    └──────────────────────────┘
```

### Phase 1: Combinational Settlement

All combinational logic (`always_comb` and `assign`) is evaluated.
Blocks are re-triggered when their inputs change, and this propagation continues until all signals stabilize.

### Phase 2: Event Evaluation

All `always_ff` blocks sensitive to the triggered event (e.g., a clock edge) are executed.

- **Reads** from FF variables see the **current** (pre-commit) values.
- **Writes** to FF variables use non-blocking semantics and do **not** take effect immediately.

### Phase 3: FF Commit (NBA Update)

All non-blocking assignments from Phase 2 take effect atomically.
After the commit, combinational logic is re-evaluated with the updated values (returning to Phase 1).

## Correspondence to SystemVerilog Scheduling Regions

Veryl's language constraints ensure that only two of SystemVerilog's scheduling regions are relevant:

| SV Region | Veryl Phase | What happens |
|---|---|---|
| Active | Combinational Settlement | `always_comb` evaluation and propagation |
| Active | Event Evaluation (reads) | `always_ff` reads current values |
| NBA Update | Event Evaluation (writes) + FF Commit | `always_ff` writes take effect |

The other regions (Inactive, Observed, Reactive) are not needed because Veryl prohibits the patterns that require them (`#0` delays, program blocks, mixed assignment types).
