# Type Cast

`as` is type casting operator.
Bit width speficied by based or baseless number or type name of user defined type can be used as the operand.

```veryl,playground
module ModuleA {
    var a: EnumA   ;
    var b: logic<2>;
    let x: logic    = 0;

    enum EnumA: logic {
        A,
        B,
    }

    assign a = x as EnumA;
    assign b = x as 2;
}
```

A constant expression enclosed in `()` can also be used as the bit width.
It is emitted as a SystemVerilog size cast like `(W + 1)'(i_x)`.
Without `()`, `i_x as W + 1` is interpreted as `(i_x as W) + 1` because the width operand of `as` is a single term.

```veryl,playground
module ModuleB #(
    param W: u32 = 8,
) (
    i_x: input  logic<W>    ,
    o_a: output logic<W + 1>,
    o_b: output logic<W * 2>,
) {
    assign o_a = i_x as (W + 1);
    assign o_b = (i_x - 1) as (W * 2);
}
```
