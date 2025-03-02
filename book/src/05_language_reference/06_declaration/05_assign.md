# Assign

`assign` declaration can assign expression to variable.

```veryl,playground
module ModuleA {
    var a: logic<10>;

    assign a = 1;
}
```

Concatenation can be used as the left hand side of `assign` declaration.

```veryl,playground
module ModuleA {
    var a: logic<10>;
    var b: logic<10>;

    assign {a, b} = 1;
}
```
