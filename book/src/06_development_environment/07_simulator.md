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

## JSON report

`veryl test --format json` writes a machine-readable report of the test results to stdout instead of the human-readable summary.
It is useful to consume the results from CI or other tools.

```console
$ veryl test --format json
```

```text
{
  "format_version": 1,
  "backend": "cc",
  "passed": 1,
  "failed": 1,
  "ignored": 1,
  "tests": [
    { "name": "test_a", "status": "pass", "runtime_s": 0.000405, "sim_s": 0.0000147 },
    { "name": "test_b", "status": "fail", "message": "assertion failed", "runtime_s": 0.000559, "sim_s": 0.0000206 }
  ]
}
```

The `status` field of each test is `pass` or `fail`, and a failed test has a `message` field.
If a test wrote something to the standard output, it is stored in an `output` field.
Ignored tests are counted by `ignored`, but they are not listed in `tests`.

The schema version of the report can be specified by `--format-version`, which is valid only with `--format json`.
Currently only `1` is supported.

## cocotb

`cocotb` tests require `python3` environment in which `cocotb` is installed.
The supported version of `cocotb` is 1.9.x and 2.0.x.

For example, it can be installed by the following command.

```console
$ pip3 install cocotb==2.0.0
```

As simulator backend, Verilator is only supported.
