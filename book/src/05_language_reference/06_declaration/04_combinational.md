# Combinational

If a variable is assigned in `always_comb` declaration, it means combinational circuit.

```veryl,playground
module ModuleA {
    let a: logic<10> = 1;
    var b: logic<10>;

    always_comb {
        b = a + 1;
    }
}
```

Concatenation can be used as the left hand side in `always_comb` declaration.

```veryl,playground
module ModuleA {
    var a: logic<10>;
    var b: logic<10>;

    always_comb {
        {a, b} = 1;
    }
}
```
