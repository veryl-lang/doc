# Unsafe CDC

Veryl compiler detects clock domain crossing as error.
So explicit `unsafe (cdc)` block is required for clock domain crossing.
In the block, clock domain crossing error is suppressed, so designer should check whether it is safe carefully.

```veryl,playground
module ModuleA (
    i_clk_a: input  'a clock,
    i_dat_a: input  'a logic,
    i_clk_b: input  'b clock,
    o_dat_b: output 'b logic,
) {
    // Error "Clock domain crossing is detected"
    //assign o_dat_b = i_dat_a;

    unsafe (cdc) {
        assign o_dat_b = i_dat_a;
    }
}
```

Typically, synchronizer cells are inserted to the boundaries between clock domains.
`unsafe (cdc)` block is required for this usage too.

```veryl,playground
module ModuleA (
    i_clk_a: input  'a clock,
    i_dat_a: input  'a logic,
    i_clk_b: input  'b clock,
    o_dat_b: output 'b logic,
) {
    unsafe (cdc) {
        inst u_sync: $sv::SynchronizerCell (
            i_clk: i_clk_b,
            i_dat: i_dat_a,
            o_dat: o_dat_b,
        );
    }
}
```
