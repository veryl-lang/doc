# Generate

Declaration can be generated by `for` and `if`.
Label which is shown by `:` is required to idenfity the generated declarations.

```veryl,playground
module ModuleA {
    var a: logic<10>;

    for i in 0..10 :label {
        if i >: 5 :label {
            assign a[i] = i + 2;
        } else { // label of else clause can be omit
            assign a[i] = i + 2;
        }
    }
}
```

For generate `for` declaration, you can iterate declarations in descending order by putting `rev` keyword aftet `in` keyword.

```veryl,playground
module ModuleA (
    i_a: input  logic,
    o_a: output logic,
    i_b: input  logic,
    o_b: output logic,
) {
    var a: logic<4>;
    var b: logic<4>;

    always_comb {
        a[lsb] = i_a;
        o_a    = a[msb];
    }

    for i in 0..4 :g_a {
        assign a[i + 1] = a[i];
    }

    always_comb {
        b[msb] = i_b;
        o_b    = b[lsb];
    }

    for i in rev 0..4 :g_b {
        assign b[i - 1] = b[i];
    }
}
```
