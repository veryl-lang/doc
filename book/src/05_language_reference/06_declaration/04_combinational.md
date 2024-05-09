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
