# Foreign Language Integration

## `embed` declaration

`embed` declaration can embed the code of foreign languages.
The first argument of `embed` declaration shows the way of embedding.
The following ways are supported:

* `inline`: expand the code as is

The code block are started by `lang{{{` and ended by `}}}`.
The following `lang` specifiers are supported:

* `sv`: SystemVerilog

```veryl,playground
embed (inline) sv{{{
    module ModuleSv;
    endmodule
}}}
```

## `include` declaration

`include` declaration can include a file of foreign languages.
The first argument is the same as `embed` declaration, and the second is a relative file path from the source code.

```veryl
include(inline, "module.sv");
```
