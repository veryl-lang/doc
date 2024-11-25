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

## `cond_type` attribute

To specify `unique`, `unique0` and `priority` in SystemVerilog, `cond_type` attribute can be used.
The attribute can be annotated to `case` or `if` statement.

* `unique`: There are no overlapping items. Error if no item matches.
* `unique0`: There are no overlapping items. No error if no item matches.
* `priority`: The first match is used only. Error if no item matches.

```veryl,playground
module ModuleA {
    let a: logic<10> = 1;
    var b: logic<10>;

    always_comb {
        #[cond_type(unique)]
        case a {
            0: b = 1;
            1: b = 2;
        }
    }
}
```

These attributes enable more aggressive optimization in synthesis,
but if the expected condition is not complied, the result of synthesis will be broken.
So these attributes are ignored by default, and if there is the following configuration, Veryl compiler emits them.

```toml
[build]
emit_cond_type = true
```
