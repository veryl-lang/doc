# Foreign Language Integration

`embed` declaration can embed the code of foreign languages.
The first argument of `embed` declaration shows the way of embedding.
The following ways are supported:

* `"inline"`: expand the code as is

The code block are started by `lang{{{` and ended by `}}}`.
The following `lang` specifiers are supported:

* `sv`: SystemVerilog

```veryl,playground
embed ("inline") sv{{{
    module ModuleSv;
    endmodule
}}}
```
