# Multi-Clock Domains

Each clock domain is triggered independently by its associated clock event.

## Independent Domain Evaluation

When a clock edge occurs, only the `always_ff` blocks sensitive to that clock are evaluated.
The FF commit applies only to the variables written by those blocks.

## Simultaneous Clock Edges

When two clocks have simultaneous edges, each domain is evaluated and committed sequentially.
The two-buffer model ensures each domain sees a consistent snapshot of its own variables, so single-domain behavior is deterministic regardless of processing order.

## Cross-Domain Signals

Cross-domain signal access requires `unsafe (cdc)` (see [Clock Domain Annotation](../15_clock_domain_annotation.md)).

With simultaneous edges, the evaluation order between domains sharing `unsafe (cdc)` signals is not guaranteed.
Designers must use proper synchronization (e.g., two-flop synchronizers, handshake protocols).

```veryl,playground
module ModuleA (
    i_clk_a: input  'a clock   ,
    i_rst_a: input  'a reset   ,
    i_clk_b: input  'b clock   ,
    i_dat_a: input  'a logic<8>,
    o_dat_b: output 'b logic<8>,
) {
    var data_a: 'a logic<8>;

    always_ff (i_clk_a, i_rst_a) {
        if_reset {
            data_a = 0;
        } else {
            data_a = i_dat_a;
        }
    }

    // Cross-domain access requires unsafe (cdc)
    unsafe (cdc) {
        assign o_dat_b = data_a;
    }
}
```
