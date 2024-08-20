# Integrated Test

Integrated test can be marked by `#[test(test_name)]` attribute.
The marked block will be identified as test, and executed through `veryl test` command.

There are two way to describe integrated test:

* SystemVerilog test
* [Cocotb](https://www.cocotb.org) test

About RTL simulator used by `veryl test`, see [Simulator](../06_development_environment/07_simulator.md).
If `--wave` option is specified, waveforms are generated.

## SystemVerilog test

SystemVerilog test can be described with `inline` specifier.
The top level module of the block must have the same name as the test name.

The messages through `$info`, `$warning`, `$error` and `$fatal` system function are handled by Veryl compiler, and shown as exectution log.
The calls of `$error` and `$fatal` are treated as test failure.

The following example, a SystemVerilog source code embeded by `embed` declaration are marked as test.

```veryl,playground
#[test(test1)]
embed (inline) sv{{{
    module test1;
        initial begin
            assert (0) else $error("error");
        end
    endmodule
}}}
```

## Cocotb test

Cocotb test can be described with `cocotb` specifier.
The target module name for test should be specified by the second argument of `#[test]` attribute.

```veryl,playground
#[test(test1, ModuleA)]
embed (cocotb) py{{{
    # cocotb code
}}}
```
