# Simulator

Test by RTL simulator is executed through `veryl test`.
Supported simulators are below:

* [Verilator](https://www.veripool.org/verilator/)
* [Synopsys VCS](https://www.synopsys.com/verification/simulation/vcs.html)
* [AMD Vivado Simulator](https://www.xilinx.com/products/design-tools/vivado/verification.html)

Verilator is the default simulator.
If no simulator is specified through `Veryl.toml` and command-line option, it will be used.

The available configurations are [here](./01_project_configuration/04_test.md).

## cocotb

`cocotb` tests require `python3` environment in which `cocotb` is installed.
The supported version of `cocotb` is 1.9.x and 2.0.x.

For example, it can be installed by the following command.

```console
$ pip3 install cocotb==2.0.0
```

As simulator backend, Verilator is only supported.
