# Case / Switch

`case` and `switch` can be used as statement.
The meaning of them are the same as [Case / Switch expression](../04_expression/05_case_switch.md) except that the right-hand of arm is statement.

```veryl,playground
module ModuleA {
    let a: logic<10> = 1;
    var b: logic<10>;
    var c: logic<10>;

    always_comb {
        case a {
            0: b = 1;
            1: b = 2;
            2: {
                   b = 3;
                   b = 3;
                   b = 3;
               }
            default: b = 4;
        }
    }

    always_comb {
        switch {
            a == 0: c = 1;
            a == 1: c = 2;
            a == 2: {
                        c = 3;
                        c = 3;
                        c = 3;
                    }
            default: c = 4;
        }
    }
}
```
