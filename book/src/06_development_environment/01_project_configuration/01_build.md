# Build

`[build]` section specifies the configuration for code generation.

## The `clock_type` field

The `clock_type` field specifies which clock edge is used to drive flip-flop.
The available types are below:

* `posedge` -- positive edge
* `negedge` -- negetive edge

## The `reset_type` field

The `reset_type` field specifies reset polarity and synchronisity.
The available types are below:

* `async_low` -- asynchronous and active low
* `async_high` -- asynchronous and active high
* `sync_low` -- synchronous and active low
* `sync_high` -- synchronous and active high

## The `filelist_type` field

The `filelist_type` field specifies filelist format.
The available types are below:

* `absolute` -- plane text filelist including absolute file paths
* `relative` -- plane text filelist including relative file paths
* `flgen` -- [flgen](https://github.com/pezy-computing/flgen) filelist

## The `target` field

The `target` field specifies where the generated codes will be placed at.
The available types are below:

* `source` -- as the same directory as the source code
* `directory` -- specified directory
* `bundle` -- specified file

If you want to use `directory` or `bundle`, you should specify the target path by `path` key.

```toml
[build]
target = {type = "directory", path = "[dst dir]"}
```

## The `implicit_parameter_types` field

The `implicit_parameter_types` field lists the types which will be elided in `parameter` declaration of the generated codes.
This is because some EDA tools don't support `parameter` declaration with specific types (ex.`string`).
If you want to elide `string`, you can specify like below:

```toml
[build]
implicit_parameter_types = ["string"]
```

## The `omit_project_prefix` field

If `omit_project_prefix` is set to `true`, the project prefix of module/interface/package name will be omitted.
This is `false` by default.

```toml
[build]
omit_project_prefix = true
```

## The `strip_comments` field

If `strip_comments` is set to `true`, all comments will be stripped.
This is `false` by default.

```toml
[build]
strip_comments = true
```

## The `*_prefix` and `*_suffix` field

`*_prefix` and `*_suffix` represent additional prefix and suffix for the generated code.
The available configurations are below:

* `clock_posedge_prefix`: Prefix for `clock` type at `clock_type = posedge`
* `clock_posedge_suffix`: Suffix for `clock` type at `clock_type = posedge`
* `clock_negedge_prefix`: Prefix for `clock` type at `clock_type = negedge`
* `clock_negedge_suffix`: Suffix for `clock` type at `clock_type = negedge`
* `reset_high_prefix`: Prefix for `reset` type at `reset_type = *_high`
* `reset_high_suffix`: Suffix for `reset` type at `reset_type = *_high`
* `reset_low_prefix`: Prefix for `reset` type at `reset_type = *_low`
* `reset_low_suffix`: Suffix for `reset` type at `reset_type = *_low`

## The `sourcemap_target` field {#sourcemap-target}

The `sourcemap_target` field specifies where the generated source maps will be placed at.
The available types are below:

* `target` -- as the same directory as the target code
* `directory` -- specified directory
* `none` -- no source map

If you want to use `directory`, you should specify the target path by `path` key.

```toml
[build]
sourcemap_target = {type = "directory", path = "[dst dir]"}
```

## The `expand_inside_operation` field

If `expand_inside_operation` is set to `true`, operations using `inside` operator will be expended to logic using `==?` operator.
This is because some EDA tools don't support `inside` operator.
This is `false` by default.

```toml
[build]
expand_inside_operation = true
```

## The `hashed_mangled_name` field

If `hashed_mangled_name` is set true, part showing the given generic arguments within the output component name is hashed.
This is `false` by default.

```toml
[build]
hashed_mangled_name = true
```

Example:

* Un-shortened name: `prj___PkgA__0__1__2__3`
* Hashed name: `prj___PkgA__3894375d1deadabb`

## The `flatten_array_interface` field

If `flatten_array_interface` is set true, multi-demensional array instance/modport is flattened into a single demensional array.
Some EDA tools do not support multi-demensional array instance/modport and this field is for such EDA tools.
This is `false` by default.

```toml
[build]
flatten_array_interface = true
```

Example:

Veryl code

```veryl
module ModuleA (
    a_if: modport InterfaceA::mp [2, 3],
) {
    for i in 0..2 :g {
        for j in 0..3 :g {
            assign a_if[i][j].a = 0;
        }
    }
}
```

Generated SystemVerilog code with `flatten_array_interface` = true

```verilog
module veryl_testcase_ModuleA (
    veryl_testcase_InterfaceA.mp a_if [0:(2)*(3)-1]
);
    for (genvar i = 0; i < 2; i++) begin :g
        for (genvar j = 0; j < 3; j++) begin :g
            always_comb a_if[(i)*(3)+(j)].a = 0;
        end
    end
endmodule
```

## The `exclude_std` field

If `exclude_std` is set to `true`, standard library will not be included.

```toml
[build]
exclude_std = true
```

## The `emit_cond_type` field

If `emit_cond_type` is set to `true`, condition type like `unique`, `unique0` and `priority` is emitted.

```toml
[build]
emit_cond_type = true
```

## The `instance_depth_limit` field

`instance_depth_limit` is the maximum depth of instance hierarchy. The default value is 128.

```toml
[build]
instance_depth_limit = 256
```

## The `instance_total_limit` field

`instance_total_limit` is the maximum sub-instances in a module. The default value is 1048576.

```toml
[build]
instance_total_limit = 256
```
