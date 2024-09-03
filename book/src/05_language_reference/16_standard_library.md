# Standard Library

Veryl provides some useful and general modules as standard library.
Standard library is under `$std` namespace, and it can be used without adding dependency.

<div class="warning">

The public API of standard library may be changed until Veryl 1.0 release.

</div>

```veryl
module ModuleA {
    // $std::fifo is FIFO module in standard library
    inst u: $std::fifo (
        i_clk        : _,
        i_rst        : _,
        i_clear      : _,
        o_empty      : _,
        o_almost_full: _,
        o_full       : _,
        o_word_count : _,
        i_push       : _,
        i_data       : _,
        i_pop        : _,
        o_data       : _,
    );
}
```

The full list and document of standard library is [https://std.veryl-lang.org](https://std.veryl-lang.org).

