# Variable

Variable declaration is started by `var` keyword.
After `var`, variable name, `:`, and the type of the variable are followed.

If there are unused variables, warning will be occured.
Variable name starting with `_` means unused variable, and suppresses the warning.

If you want to bind a value to a name at the declaration, `let` can be used instead of `var`.

```veryl,playground
module ModuleA {
    var _a: logic        ;
    var _b: logic<10>    ;
    var _c: logic<10, 10>;
    var _d: u32          ;
    let _e: logic         = 1;

    assign _a = 1;
    assign _b = 1;
    assign _c = 1;
    assign _d = 1;
}
```
