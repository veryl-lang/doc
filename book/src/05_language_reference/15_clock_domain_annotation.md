# Clock Domain Annotation

If there are some clocks in a module, explicit clock domain annotation like `` `a `` is required.
The annotation shows which clock domain each signals belong.

```veryl,playground
module ModuleA (
    // belong clock domain `a
    i_clk_a: input  `a clock,
    i_dat_a: input  `a logic,
    o_dat_a: output `a logic,

    // belong clock domain `b
    i_clk_b: input  `b clock,
    i_dat_b: input  `b logic,
    o_dat_b: output `b logic,
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

`` `_ `` is a special clock domain which means implicit clock domain.
This can be used to specify that some clocks belong the same implicit clock domain.

```veryl,playground
module ModuleA (
    // all signals belong implicit clock domain
    i_clk   : input  `_ clock,
    i_clk_x2: input  `_ clock,
    i_dat   : input     logic,
    o_dat   : output    logic,
) {
    assign o_dat = i_dat;
}
```

Interface instances can have clock domain annotation.

```veryl,playground
module ModuleA {
    inst intf: `a InterfaceA;
}

interface InterfaceA {}
```
