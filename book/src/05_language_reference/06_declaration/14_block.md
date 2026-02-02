# Block

In `always_comb` and `always_ff`, `block` keyword can be used for grouping some statements.

```veryl,playground
module ModuleA {
    var a: logic<10>;
    var b: logic<10>;

    always_comb {
        block {
            a = 1;
            b = 2;
        }
    }
}
```

`block` declaration can be used to assign an attribute to some statements.

```veryl,playground
module ModuleA {
    var a: logic<10>;
    var b: logic<10>;

    always_comb {
        #[ifdef(A)]
        block {
            a = 1;
            b = 2;
        }
        #[else]
        block {
            a = 3;
            b = 4;
        }
    }
}
```

