# Simulator

Test by RTL simulator is executed through `veryl test`.
Supported simulators are below:

* [Verilator](https://www.veripool.org/verilator/)
* [Synopsys VCS](https://www.synopsys.com/verification/simulation/vcs.html)
* [AMD Vivado Simulator](https://www.xilinx.com/products/design-tools/vivado/verification.html)

Verilator is the default simulator.
If no simulator is specified through `Veryl.toml` and commandline option, it will be used.

The available configurations are below.
These can be specified in `[test]` section of `Veryl.toml`.

```toml
[test]
simulator = "vcs"
```

## The `[test]` section

This section contains configurations of test.

| Configuration | Value                | Description       |
|---------------|----------------------|-------------------|
| simulator     | simulator name[^sim] | default simulator |

[^sim]: The available values are 

* `"verilator"`
* `"vcs"`
* `"vivado"`

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

## The `[test.vivado]` section

This section contains configurations of test by Vivado.

| Configuration  | Value    | Description                             |
|----------------|----------|-----------------------------------------|
| compile_args   | [string] | additional arguments to `xvlog` command |
| elaborate_args | [string] | additional arguments to `xelab` command |
| simulate_args  | [string] | additional arguments to `xsim` command  |
