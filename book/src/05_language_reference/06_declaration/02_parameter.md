# Parameter

Parameter can be declarated as the same as variable.
`param` keyword can be used at module header, it can be overridden at instantiation.
`local` keyword can be used in module, it can't be overridden.

```veryl,playground
module ModuleA #(
    param ParamA: u32 = 1,
) {
    local ParamB: u32 = 1;
}
```
