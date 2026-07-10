# Test

`[test]` section specifies the configuration for integrated unit test like below:

```toml
[test]
simulator = "vcs"
```

## Available configurations

## The `[test]` section

### The `simulator` field

The `simulator` field specifies default simulator.
The available types are below:

* `"verilator"`
* `"vcs"`
* `"dsim"`
* `"vivado"`

### The `include_files` field

The `include_files` field specifies extra files used for simulation.

```toml
[test]
include_files = ["test/mem.hex"]
```

### The `waveform_target` field

The `waveform_target` field specifies where the generated waveforms will be placed at.
The available types are below:

* `target` -- as the same directory as the target code
* `directory` -- specified directory

If you want to use `directory`, you should specify the target path by `path` key.

```toml
[test]
waveform_target = {type = "directory", path = "[dst dir]"}
```

### The `waveform_format` field

The `waveform_format` field specifies in which format the waveform will be dumped.
The available formats are:

* `vcd` -- The default value and most readable format across all vendors. But also not very feature rich
* `fst` -- This format has some more features, e.g. printing enum values instead of integers. `gtkwave` and `surfer` can read this format.

### The `defines` field

The `defines` field specifies a list of names that are treated as defined while running `veryl test`.
These names are visible to the [`#[ifdef]`/`#[ifndef]`](../../05_language_reference/06_declaration/08_attribute.md) attribute, so they can be used to enable test-only code paths.
For SystemVerilog and cocotb tests, the same names are also passed to the external simulator as `+define+NAME` (or `-d NAME` for Vivado).

```toml
[test]
defines = ["DEBUG", "ENABLE_ASSERTIONS"]
```

Additional names can be appended from the command line via `veryl test --define NAME` (or `-D NAME`).
CLI defines are merged with this field.

### The `seed` field

The `seed` field sets the base seed for randomized verification-component tests.
When unset, each `veryl test` run draws a fresh random seed and prints it; set it (or pass `--seed`) to reproduce a specific run.

### The `four_state` field

The `four_state` field runs native verification-component tests in four-state (X/Z) mode.
It defaults to `false` and can also be enabled with the `--4state` command-line option.

### The `component_backend` field

The `component_backend` field pins how verification components are executed:

* `"native"` -- built from source with cargo
* `"wasm"` -- a committed prebuilt binary

When unset, `veryl test` builds from source if cargo is available and falls back to a committed prebuilt wasm otherwise.

## The `[test.verilator]` section

This section contains configurations of test by Verilator.

| Configuration | Value    | Description                                 |
|---------------|----------|---------------------------------------------|
| compile_args  | [string] | additional arguments to `verilator` command |
| simulate_args | [string] | additional arguments to simulation binary   |

## The `[test.vcs]` section

This section contains configurations of test by VCS.

| Configuration | Value    | Description                               |
|---------------|----------|-------------------------------------------|
| compile_args  | [string] | additional arguments to `vcs` command     |
| simulate_args | [string] | additional arguments to simulation binary |

## The `[test.dsim]` section

This section contains configurations of test by DSim.

| Configuration | Value    | Description                                            |
|---------------|----------|--------------------------------------------------------|
| compile_args  | [string] | additional arguments to `dsim` command for compilation |
| simulate_args | [string] | additional arguments to `dsim` command for simulation  |

## The `[test.vivado]` section

This section contains configurations of test by Vivado.

| Configuration  | Value    | Description                             |
|----------------|----------|-----------------------------------------|
| compile_args   | [string] | additional arguments to `xvlog` command |
| elaborate_args | [string] | additional arguments to `xelab` command |
| simulate_args  | [string] | additional arguments to `xsim` command  |
