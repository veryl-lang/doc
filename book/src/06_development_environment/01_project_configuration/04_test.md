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
