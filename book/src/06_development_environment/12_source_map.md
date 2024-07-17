# Source Map

Source map is a file to be used for tracking location from SystemVerilog to Veryl.
By this file, a file path, line and column of SystemVerilog can be translated into the position in Veryl.

By default, Veryl generates source map at the same directory as generated SystemVerilog with `.sv.map` extension.
Source map generation can be configured through [`sourcemap_target` field](./01_project_configuration/01_build.md#sourcemap-target) in `Veryl.toml`.

The format of source map follows [Source Map Revision 3](https://sourcemaps.info/spec.html).
The convention of linking generated code to source map is almost the same as JavaScript, but relative path is used only:

```systemverilog
//# sourceMappingURL=<relative path>
```

So, if there is the above comment at the end of a SystemVerilog file, it shows source map can be used.

## sourcemap-resolver

`sourcemap-resolver` which is shipped together Veryl compiler can be used to annotate arbitrary text file like below:

```
ERROR: [VRFC 10-4982] syntax error near 'endmodule' [/path/test.sv:23]
                                                     ^-- /path/test.veryl:18:18
```

The first line is the original text, and the second line is added by `sourcemap-resolver`.
The usage examples are below:

```
$ sourcemap-resolver test.log      # annotate the existing log
$ [command] | sourcemap-resolver   # on-the-fly annotation by pipe
```

