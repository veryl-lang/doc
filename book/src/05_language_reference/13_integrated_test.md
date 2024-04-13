# Integrated Test

Integrated test can be marked by `#[test(test_name)]` attribute.
The marked block will be identified as test, and executed through `veryl test` command.
The top level module of the block must have the same name as the test name.

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

About RTL simulator used by `veryl test`, see [Simulator](../06_development_environment/07_simulator.md).
