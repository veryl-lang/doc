# Instantiation

`inst` keyword represents instantiation of modula and interface.
The name of instance is placed after `inst` keyword,
and the type of instance is placed after `:`.
Parameter override is `#()`, and port connection is `()`.

```veryl,playground
module ModuleA #(
    param paramA: u32 = 1,
) {
    let a: logic<10> = 1;
    let b: logic<10> = 1;

    inst instB: ModuleB #(
        paramA    , // Parameter assignment by name
        paramB: 10,
    ) (
        a    , // Port connection by name
        bb: b,
    );
}

module ModuleB #(
    param paramA: u32 = 1,
    param paramB: u32 = 1,
) (
    a : input logic<10>,
    bb: input logic<10>,
) {}
```

`bind` declarations are also supported and will be translated into SystemVerilog's bind declarations.
Unlike SystemVerilog, a module or an interface can be specified as a target scope, but not a specific instance.

```veryl,playground
interface InterfaceA {
    var a: logic;
    modport mp {
        a: input,
    }
}

module ModuleA (
    i_clk: input clock,
    i_rst: input reset,
) {
    inst a_if: InterfaceA;
}

module ModuleB (
    i_clk: input   clock         ,
    i_rst: input   reset         ,
    a_if : modport InterfaceA::mp,
) {}

module ModuleC {
    bind ModuleA <- u0: ModuleB (
        i_clk  ,
        i_rst  ,
        a_if   ,
    );
}

bind ModuleA <- u1: ModuleB (
    i_clk: i_clk,
    i_rst: i_rst,
    a_if : a_if ,
);
```
