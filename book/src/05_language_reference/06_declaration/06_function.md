# Function

Function can be declared by `function` keyword.
Arguments are placed in `()` and return type is placed after `->`.

If function doesn't have a return value, `->` can be omitted.

```veryl,playground
module ModuleA {
    let a: logic<10> = 1;
    var b: logic<10>;

    function FunctionA (
        a: input logic<10>,
    ) -> logic<10> {
        return a + 1;
    }

    function FunctionB (
        a: input logic<10>,
    ) {}

    assign b = FunctionA(a);

    initial {
        FunctionB(a);
    }
}
```

Interface modports can be used as type of arguments.
The given interface modports will be expanded into each Verilog ports when emitting SystemVerilog RTL.

```veryl,playground
interface InterfaceA::<W: u32> {
    var ready: logic   ;
    var valid: logic   ;
    var data : logic<W>;

    modport master {
        ready: input ,
        valid: output,
        data : output,
    }

    modport slave {
        ..converse(master)
    }
}

module ModuleA {
    inst a_if: InterfaceA::<8>;
    inst b_if: InterfaceA::<8>;

    function FunctionA (
        a_if: modport InterfaceA::<8>::slave ,
        b_if: modport InterfaceA::<8>::master,
    ) {
        a_if <> b_if;
    }

    always_comb {
        FunctionA(a_if, b_if);
    }
}
```
