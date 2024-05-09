# Array Literal

`'{}` represents array literal.
In the literal, expression, `repeat` keyword and `default` keyword can be placed.

```veryl,playground
module ModuleA {
    let _a: logic [3] = '{1, 2, 3};
    let _b: logic [3] = '{1 repeat 3}; // '{1, 1, 1}
    let _c: logic [3] = '{default: 3}; // '{3, 3, 3}
}
```
