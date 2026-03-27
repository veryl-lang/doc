# Clock Domain Annotation

If there are some clocks in a module, explicit clock domain annotation like `'a` is required.
The annotation shows which clock domain each signals belong.

```veryl,playground
module ModuleA (
    // belong clock domain 'a
    i_clk_a: input  'a clock,
    i_dat_a: input  'a logic,
    o_dat_a: output 'a logic,

    // belong clock domain 'b
    i_clk_b: input  'b clock,
    i_dat_b: input  'b logic,
    o_dat_b: output 'b logic,
) {
    // assignment in the same clock domain is safe
    assign o_dat_a = i_dat_a;
    assign o_dat_b = i_dat_b;
}
```

If there is single clock only in a module, the annotation can be omitted.

```veryl,playground
module ModuleA (
    i_clk: input  clock,
    i_dat: input  logic,
    o_dat: output logic,
) {
    assign o_dat = i_dat;
}
```

`'_` is a special clock domain which means implicit clock domain.
This can be used to specify that some clocks belong the same implicit clock domain.

```veryl,playground
module ModuleA (
    // all signals belong implicit clock domain
    i_clk   : input  '_ clock,
    i_clk_x2: input  '_ clock,
    i_dat   : input     logic,
    o_dat   : output    logic,
) {
    assign o_dat = i_dat;
}
```

Interface instances can have clock domain annotation.

```veryl,playground
module ModuleA {
    inst intf: 'a InterfaceA;
}

interface InterfaceA {}
```

## Clock domain inference

Variables declared without clock domain annotation can have their domain inferred automatically.
The domain is inferred from the right-hand side of `assign` statements or the clock of `always_ff` blocks.

Note that clock domain annotation on port declarations cannot be omitted even if inference is possible,
because port declarations are public interfaces and should be explicit.

```veryl,playground
module ModuleA (
    i_clk_a: input  'a clock,
    i_rst_a: input  'a reset,
    i_dat_a: input  'a logic,
    o_dat_a: output 'a logic,
    i_clk_b: input  'b clock,
    i_rst_b: input  'b reset,
    i_dat_b: input  'b logic,
    o_dat_b: output 'b logic,
) {
    // inferred as 'a from assign RHS
    var x: logic;

    assign x       = i_dat_a;
    assign o_dat_a = x;

    // inferred as 'b from always_ff clock
    var y: logic;
    always_ff (i_clk_b, i_rst_b) {
        if_reset {
            y = 0;
        } else {
            y = i_dat_b;
        }
    }
    assign o_dat_b = y;
}
```
