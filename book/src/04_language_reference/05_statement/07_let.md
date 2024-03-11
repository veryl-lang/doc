# Let

`let` statement represents a name bound to a value.
It can be used in `always_ff`, `always_comb` and function declaration.

`let` statement can be placed anywhere in block.

```veryl,playground
module ModuleA (
    i_clk: input  logic,
) {
    var a: logic;
    var b: logic;
    var c: logic;

    always_ff (i_clk) {
        let x: logic = 1;
        a = x + 1;
    }

    always_comb {
        let y: logic = 1;
        b = y + 1;

        let z: logic = 1;
        c = z + 1;
    }
}
```
