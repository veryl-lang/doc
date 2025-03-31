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

## Named Argument

If a function has many arguments, function call with named arguments is useful.
Named arguments can't be used with positional arguments at the same time.

```veryl,playground
module ModuleA {
    function FunctionA (
        a: input logic,
        b: input logic,
        c: input logic,
        d: input logic,
    ) {}

    let _a: logic = FunctionA(
        a: 1,
        b: 1,
        c: 1,
        d: 1,
    );

    // Mixing positional and named arguments is Error
    //let _a: logic = FunctionA(
    //    1,
    //    2,
    //    a: 1,
    //    b: 1,
    //);
}
```
