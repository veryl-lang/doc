# Integrated Test

Integrated test can be marked by `#[test(test_name)]` attribute.
The marked block will be identified as test, and executed through `veryl test` command.

There are three ways to describe integrated test:

* Native test
* SystemVerilog test
* [cocotb](https://www.cocotb.org) test

Native test uses Veryl's built-in simulator, while SystemVerilog test and cocotb test use an external RTL simulator.
About external RTL simulators used by `veryl test`, see [Simulator](../06_development_environment/07_simulator.md).
For all test types, if `--wave` option is specified, waveforms are generated.

Tests can be skipped by adding `#[ignore]` attribute.
Ignored tests are not executed by default, but can be run with `--ignored` option.
`--include-ignored` option runs both normal and ignored tests.

```veryl,playground
#[test(test_ignored)]
#[ignore]
module test_ignored {
    inst clk: $tb::clock_gen;
    inst rst: $tb::reset_gen (
        clk  ,
    );

    initial {
        rst.assert();
        $finish   ();
    }
}
```

## Native test

Native test allows writing testbenches directly in Veryl without embedding SystemVerilog or using external frameworks.
A module with `#[test(test_name)]` attribute (without `embed` declaration) is treated as a native test.

The following testbench components are available:

* `$tb::clock_gen` — clock signal generator (with optional `#(period: N)` parameter)
* `$tb::reset_gen` — reset signal generator (with optional `#(cycles: N)` parameter)

And the following system functions can be used in `initial` blocks:

* `$assert(condition)` or `$assert(condition, message)` — check assertions during simulation
* `$finish()` — terminate simulation

### Basic example

```veryl,playground
module Counter (
    clk: input  clock    ,
    rst: input  reset    ,
    cnt: output logic<32>,
) {
    always_ff {
        if_reset {
            cnt = 0;
        } else {
            cnt += 1;
        }
    }
}

#[test(test_counter)]
module test_counter {
    inst clk: $tb::clock_gen;
    inst rst: $tb::reset_gen (
        clk  ,
    );

    var cnt: logic<32>;

    inst dut: Counter (
        clk: clk,
        rst: rst,
        cnt: cnt,
    );

    initial {
        rst.assert();
        clk.next  (10);
        $assert   (cnt == 32'd10);
        $finish   ();
    }
}
```

### Testbench methods

`clock_gen` provides the `next` method to advance clock cycles:

* `clk.next()` — advance clock by 1 cycle
* `clk.next(N)` — advance clock by `N` cycles

`reset_gen` provides the `assert` method to assert reset:

* `rst.assert()` — assert reset synchronized to clock
* `rst.assert(duration)` — assert reset for specified duration

The reset duration can also be configured at instantiation:

```veryl,playground
#[test(test_reset_cycles_param)]
module test_reset_cycles_param {
    inst clk: $tb::clock_gen;
    inst rst: $tb::reset_gen #(
        cycles: 5,
    ) (
        clk  ,
    );

    // ...

    initial {
        rst.assert();
        // ...
    }
}
```

### Function calls in testbench

Testbench methods like `clk.next` can be called from user-defined functions:

```veryl,playground
#[test(test_function_call)]
module test_function_call {
    inst clk: $tb::clock_gen;
    inst rst: $tb::reset_gen (
        clk  ,
    );

    var cnt: logic<32>;

    // inst dut: Counter (clk, rst, cnt);

    function step_n (
        n: input logic<32>,
    ) {
        clk.next(n);
    }

    initial {
        rst.assert();
        step_n    (5);
        step_n    (5);
        $assert   (cnt == 32'd10);
        $finish   ();
    }
}
```

## SystemVerilog test

SystemVerilog test can be described with `inline` specifier.
The top level module of the block must have the same name as the test name.

The messages through `$info`, `$warning`, `$error` and `$fatal` system function are handled by Veryl compiler, and shown as exectution log.
The calls of `$error` and `$fatal` are treated as test failure.

The following example, a SystemVerilog source code embedded by `embed` declaration are marked as test.

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

## cocotb test

cocotb test can be described with `cocotb` specifier.
The target module name for test should be specified by the second argument of `#[test]` attribute.

```veryl,playground
#[test(test1, ModuleA)]
embed (cocotb) py{{{
    # cocotb code
}}}
```
