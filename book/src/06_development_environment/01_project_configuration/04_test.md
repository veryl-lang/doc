# Test

`[test]` section specifies the configuration for integrated unit test like below:

```toml
[test]
simulator = "vcs"
```

## Available configurations

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
