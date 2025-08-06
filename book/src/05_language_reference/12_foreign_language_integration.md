# Foreign Language Integration

## `embed` declaration

`embed` declaration can embed the code of foreign languages.
The first argument of `embed` declaration shows the way of embedding.
The following ways are supported:

* `inline`: expand the code as is
* `cocotb`: treated as cocotb based test

The code block are started by `lang{{{` and ended by `}}}`.
The following `lang` specifiers are supported:

* `sv`: SystemVerilog
* `py`: Python

```veryl,playground
embed (inline) sv{{{
    module ModuleSv;
    endmodule
}}}
```

`embed` declaration with `inline` way and `sv` lang can also be put within the body of module declaration, interface declaration and package declaration.
This usage is for integration with SystemVerilog testbench.

```veryl,playground
#[allow(unused_variable)]
interface bus_monitor_if {
    var clk    : clock   ;
    var ready  : logic   ;
    var valid  : logic   ;
    var payload: logic<8>;

    embed (inline) sv{{{
        clocking monitor_cb @(posedge clk);
            input ready;
            input valid;
            input payload;
        endclocking
    }}}

}
```

Scoped identifiers wrapped with `\{`( and `\}` in embed code blocks are resolved, and the results are placed there.

```veryl,playground
module Module47A {}

module Module47B::<V: u32> {}

module Module47C {
    inst u_a: Module47A;

    embed (inline) sv{{{
        bind u_a \{ Module47B::<32> } u_b32 ();
        bind u_a \{ Module47B::<64> } u_b64 ();
    }}}

}
```

## `include` declaration

`include` declaration can include a file of foreign languages.
The first argument is the same as `embed` declaration, and the second is a relative file path from the source code.

```veryl
include(inline, "module.sv");
```
