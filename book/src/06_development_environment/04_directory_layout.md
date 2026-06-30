# Directory Layout

Veryl supports arbitrary directory layout.
This is because the optimal directory layout for an independent project and an integrated project within other projects is different.

In this section, we suggest some directory layout patterns.

## Single source directory

This pattern contains all sources in `src` directory.
In `src`, you can configure arbitrary sub directories.

```
$ tree
.
|-- src
|   |-- module_a.veryl
|   `-- module_b
|       |-- module_b.veryl
|       `-- module_c.veryl
`-- Veryl.toml

2 directories, 4 files
```

Veryl gathers all `*.veryl` files and generates codes at the same directory as the source by default.
You can show the behavior explicitly by the following configuration.

```toml
[build]
target = "source"
```

After `veryl build`, the directory structure will become below:

```
$ tree
.
|-- dependencies
|-- prj.f
|-- src
|   |-- module_a.sv
|   |-- module_a.veryl
|   `-- module_b
|       |-- module_b.sv
|       |-- module_b.veryl
|       |-- module_c.sv
|       `-- module_c.veryl
`-- Veryl.toml

3 directories, 8 files
```

## Single source and target directory

If you want to place the generated codes into a directory, you can use `target` configure in `[build]` section of `Veryl.toml`.

```toml
[build]
target = {type = "directory", path = "target"}
```

The directory layout of this configure will become below:

```
$ tree
.
|-- dependencies
|-- prj.f
|-- src
|   |-- module_a.veryl
|   `-- module_b
|       |-- module_b.veryl
|       `-- module_c.veryl
|-- target
|   |-- module_a.sv
|   |-- module_b.sv
|   `-- module_c.sv
`-- Veryl.toml

4 directories, 8 files
```

## Multi source directory

If you want to add a veryl project to the existing SystemVerilog project, you can choose the following structure.

```
$ tree
.
|-- dependencies
|-- module_a
|   |-- module_a.sv
|   `-- module_a.veryl
|-- module_b
|   |-- module_b.sv
|   |-- module_b.veryl
|   |-- module_c.sv
|   `-- module_c.veryl
|-- prj.f
|-- sv_module_x
|   `-- sv_module_x.sv
|-- sv_module_y
|   `-- sv_module_y.sv
`-- Veryl.toml

5 directories, 10 files
```

The generated `prj.f` lists all generated files. So you can use it along with the existing SystemVerilog filelists.

## Redirecting output with `--out-dir`

By default, `veryl build` writes all generated outputs (SystemVerilog files, source maps, the filelist, and `dependencies`) under the project path.
The `--out-dir` option redirects these outputs to another directory while sources keep resolving against the project path.
This is useful when integrating with external build systems (e.g. `xmake`, `build.rs`) that expect the generated files to be placed outside the source tree.

```
$ veryl build --out-dir /path/to/output
```

A relative path is resolved against the current working directory.

```
$ veryl build --out-dir output
```

The directory structure under the output directory mirrors the normal layout.
For example, with `target = {type = "directory", path = "target"}`, the output directory will become below:

```
$ tree /path/to/output
/path/to/output
|-- dependencies
|-- prj.f
`-- target
    |-- module_a.sv
    |-- module_b.sv
    `-- module_c.sv

2 directories, 5 files
```

The generated filelist references the redirected destinations, so it can be used directly by downstream tools.
Without `--out-dir`, the build behavior is unchanged.

## About `.gitignore`

Veryl provides the following `.gitignore` as the default value.
`.build` is used to record build information by Veryl compiler.

```
.build/
```

Other patterns can be added by each projects.
The candidates of `.gitignore` is below:

* `dependencies/`
* `target/`
* `*.sv`
* `*.f`
