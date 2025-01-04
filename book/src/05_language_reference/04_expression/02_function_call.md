# Function Call

Function can be call by `function_name(argument)`.
System function of SystemVerilog like `$clog2` can be used too.

```veryl,playground
package PackageA {
    function FunctionA (
        a: input logic,
        b: input logic,
    ) {}
}

module ModuleA {
    let _a: logic = PackageA::FunctionA(1, 1);
    let _b: logic = $clog2(1);
}
```
