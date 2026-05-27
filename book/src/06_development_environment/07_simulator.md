# Simulator

Test is executed through `veryl test`.

For [native test](../05_language_reference/13_integrated_test.md#native-test), Veryl's built-in simulator is used.
No external simulator installation is required.

The native simulator selects its code-generation backend through `veryl test --backend`:

| Backend     | Description                                                                                                |
|-------------|------------------------------------------------------------------------------------------------------------|
| `cc`        | Default. Emits C, compiles with an external C compiler (`gcc` or `clang` with `-O3`), then loads the result. |
| `cranelift` | In-process Cranelift JIT.                                                                                  |
| `interpret` | Walks the IR each cycle without code generation.                                                           |

The `cc` backend requires `cc` (typically `gcc` or `clang`) to be available on `PATH`.
If `cc` is missing, or a particular construct is not yet covered by the `cc` emitter, the simulator transparently falls back to Cranelift for that part.
Use `veryl test --backend-validate` to dual-run the `cc` backend against Cranelift and abort on any divergence.

For SystemVerilog test and cocotb test, an external RTL simulator is required.
Supported simulators are below:

* [Verilator](https://www.veripool.org/verilator/)
* [Synopsys VCS](https://www.synopsys.com/verification/simulation/vcs.html)
* [Altair DSim](https://altair.com/dsim)
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
