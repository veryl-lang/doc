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
