# Concatenation

`{}` represents bit concatenation.
In `{}`, `repeat` keyword can be used to repeat specified operand.

```veryl,playground
module ModuleA {
    let a : logic<10> = 1;
    let b : logic<10> = 1;
    let _c: logic     = {a[9:0], b[4:3]};
    let _d: logic     = {a[9:0] repeat 10, b repeat 4};
}
```
