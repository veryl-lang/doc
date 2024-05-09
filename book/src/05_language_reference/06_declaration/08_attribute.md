# Attribute

Attribute can annotate some declarations like variable declaration.

## SV Attribute

SV attribute represents SystemVerilog attribute.
It will be transpiled to SystemVerilog attribute `(*  *)`.

```veryl,playground
module ModuleA {
    #[sv("ram_style=\"block\"")]
    let _a: logic<10> = 1;
    #[sv("mark_debug=\"true\"")]
    let _b: logic<10> = 1;
}
```
