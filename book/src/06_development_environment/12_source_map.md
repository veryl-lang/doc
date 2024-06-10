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
