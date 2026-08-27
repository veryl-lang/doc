# Attribute

Attribute can annotate some declarations like variable declaration.

## `sv` Attribute

`sv` attribute represents SystemVerilog attribute.
It will be transpiled to SystemVerilog attribute `(*  *)`.

```veryl,playground
module ModuleA {
    #[sv("ram_style=\"block\"")]
    let _a: logic<10> = 1;
    #[sv("mark_debug=\"true\"")]
    let _b: logic<10> = 1;
}
```

## `allow` Attribute

`allow` attribute is used to disable specified lint check.

```veryl,playground
module ModuleA {
    #[allow(unused_variable)]
    let a: logic<10> = 1;
}
```

Available lint names are below:

* `unused_variable`
* `unassign_variable`
* `missing_reset_statement`
* `missing_port`
* `initial_assign`
* `multiple_assign`

### Non-portable constructs

`initial_assign` and `multiple_assign` are different from the other lint names:
they opt in to a construct which is not portable, that is, whether it works
depends on the target device and the toolchain.
They are written on the declaration of the variable they concern.

`initial_assign` allows assignment to the variable in an `initial` block.
This relies on the target device initializing the variable at configuration
time, which ASIC synthesizers ignore.
Assignment through an output argument of a function call, such as `$readmemh`
and `$readmemb`, requires the attribute as well.
A variable declared inside the `initial` block is a procedural local rather
than state of the design, so it needs no attribute.

```veryl,playground
module ModuleA (
    i_clk: input clock,
) {
    #[allow(initial_assign)]
    var count: logic<16>;

    #[allow(initial_assign)]
    var rom: logic<32> [1024];

    initial {
        count = '0;
        $readmemh("rom.hex", rom);
    }

    always_ff {
        count = count + 1;
    }

    #[allow(unused_variable)]
    let _a: logic<32> = rom[0];
}
```

An `initial` block is not a driving process, so a variable with
`initial_assign` can be driven by a process too, as `count` is above.
`multiple_assign` is not required for it.

`multiple_assign` allows the variable to be assigned from more than one
process, which true dual port SRAM inference on FPGA requires.

```veryl,playground
module ModuleB (
    i_clk0 : input  'a clock    ,
    i_clk1 : input  'b clock    ,
    i_en0  : input  'a logic    ,
    i_en1  : input  'b logic    ,
    i_addr0: input  'a logic<5> ,
    i_addr1: input  'b logic<5> ,
    i_data0: input  'a logic<32>,
    i_data1: input  'b logic<32>,
    o_data : output 'a logic<32>,
) {
    #[allow(multiple_assign)]
    var ram: 'a logic<32> [32];

    always_ff (i_clk0) {
        if i_en0 {
            ram[i_addr0] = i_data0;
        }
    }

    unsafe (cdc) {
        always_ff (i_clk1) {
            if i_en1 {
                ram[i_addr1] = i_data1;
            }
        }
    }

    assign o_data = ram[i_addr0];
}
```

SystemVerilog forbids a variable written by an `always_ff` from being written
by any other process. So an `always_ff` which writes a variable with either
attribute is emitted as a plain `always`.
`always_comb` has the same restriction and is not lowered, so driving one
variable from several `always_comb`/`assign` declarations is accepted by Veryl
but still rejected by SystemVerilog tools.

To keep these constructs out of a project whose target does not support them,
whether they are accepted from dependencies is decided by the consumer through
[`[lint.portability]`](../../06_development_environment/01_project_configuration/03_lint.md).
In your own code the attribute is always honored.

## `ifdef`/`ifndef`/`elsif`/`else` Attribute

`ifdef` and `ifndef` attributes are used to control whether the annotated code block is enabled by defined value.
In addition, the code block with `elsif` or `else` attributes is optional and a code block with `ifdef` or `ifndef` attributes can be followed with that code block.

The following example shows a usage of these attributes and which code blocks will be enabled according to defined values.

* For the sequence of `ifdef`/`elsif`/`else` attributes
    * If `DEFINE_A` is defined, the code block with `#[ifdef(DEFINE_A)]` (code block a) is enbaled, and code blocks with `#[ifndef(DEFINE_B)]` and `#[else]` (code block b/c) are disabled.
    * If `DEFINE_A` is not defined and `DEFINE_B` is defiend, the code block with `#[elsif(DEFINE_B)]` (code block b) is enabled, and code blocks with `#[ifdef(DEFINE_A)]` and `#[else]` (code block a/c) are disabled.
    * If `DEFINE_A` and `DEFINE_B` are not defined the code block with `#[else]` is enabled, and code blocks with `#[ifdef(DEFINE_A)]` and `#[elsif(DEFINE_B)]` (code block a/b) are disabled.
* For the sequence of `ifndef`/`else` attributes
    * If `DEFINE_D` is not defined, the code block with `#[ifndef(DEFINE_D)]` (code block d) is enabled, and the code block with `#[else]` (code block e) is disabled.
    * If `DEFINE_D` is defined, the code block with `#[else]` (code block e) is enabled, and the code block with `#[ifndef(DEFINE_D)]` (code block d) is disabled.

```veryl,playground
module ModuleA {
    #[ifdef(DEFINE_A)]
    {
        // code block a
        let _a: logic<10> = 1;
    }
    #[elsif(DEFINE_B)]
    {
        // code block b
        let _a: logic<10> = 2;
    }
    #[else]
    {
        // code block c
        let _a: logic<10> = 3;
    }

    #[ifndef(DEFINE_D)]
    {
        // code block d
        let _b: logic<10> = 4;
    }
    #[else]
    {
        // code block e
        let _b: logic<10> = 5;
    }
}
```

To avoid complex adjustment around trailing comma in generated code, the last item with `ifdef` in comma-separated list is forbidden.

## `expand` Attribute

If `expand` attribute is set, structured ports such as `modport` are expanded into each Verilog ports.
Synthesis tools may require that ports of the top module includes no such ports. This attribute is helpful for such case.
The following argument is supported.

* `modport`: Expand ports of which direction is `modport`

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
        ready: output,
        valid: input ,
        data : input ,
    }
}

#[expand(modport)]
module ModuleA (
    slave_if : modport InterfaceA::<8>::slave  [4],
    master_if: modport InterfaceA::<8>::master [4],
) {
    for i in 0..4 :g {
        connect slave_if[i] <> master_if[i];
    }
}

module ModuleB {
    inst a_if: InterfaceA::<8> [4];
    inst b_if: InterfaceA::<8> [4];

    inst u: ModuleA (
        slave_if : a_if,
        master_if: b_if,
    );
}
```

## `align` Attribute

`align` attribute is used to control vertical alignment by formatter.
If `number` is specified as an argument of `align` attribute, all numbers are aligned.
`identifier` can be used too.

```veryl,playground
module ModuleA {
    let a  : logic<32> = 1;
    let aa : logic<32> = 1;
    let aaa: logic<32> = 1;

    let _b: logic = {
        a[0] repeat 1, a[0] repeat 1, aa[1] repeat 8, aa[1] repeat 8, aaa[2] repeat 16, aaa[2] repeat 16, a[0] repeat 1,
        aa[1] repeat 8, aaa[2] repeat 16, a[0] repeat 1,
    };

    #[align(number, identifier)]
    let _c : logic = {
        a  [0 ] repeat 1 , a  [0 ] repeat 1 , aa [1 ] repeat 8 , aa [1 ] repeat 8 , aaa[2 ] repeat 16,
        aaa[2 ] repeat 16, a  [0 ] repeat 1 , aa [1 ] repeat 8 , aaa[2 ] repeat 16, a  [0 ] repeat 1 ,
    };
}
```

## `fmt` Attribute

`fmt` attribute is used to control formatiing way.
The following arguments are supported:

* `compact`: compact formatting without newlines

```veryl,playground
module ModuleA {
    #[fmt(compact)]
    {
        inst u1: $sv::Module #( A: 1, B: 2 ) ( x: 1, y: _ );
        inst u2: $sv::Module #( A: 1, B: 2 ) ( x: 1, y: _ );
        inst u3: $sv::Module #( A: 1, B: 2 ) ( x: 1, y: _ );
        inst u4: $sv::Module #( A: 1, B: 2 ) ( x: 1, y: _ );
    }
}
```

* `skip`: `veryl fmt` does not format modules, interfaces and packages on which `fmt` attribute with `skip` argument is specified.
