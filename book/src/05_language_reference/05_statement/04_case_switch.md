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

## Wildcard & Range Matching (`case inside`)

Just like `case` expressions, `case` statements support wildcard bit-pattern matching with `x` (and `z`) as well as range matching with `..=`.
When wildcard bit literals or ranges are present in any case arm, the Veryl compiler automatically transpiles the statement into SystemVerilog's IEEE 1800 `case (...) inside` statement.

```veryl,playground
module ModuleA {
    let a: logic<8> = 8'h00;
    var b: logic<8>;

    always_comb {
        case a {
            8'b0000_00xx   : b = 8'd1; // Matches 8'b0000_0000 through 8'b0000_0011
            8'b0001_xxxx   : b = 8'd2; // Matches any 8'b0001_????
            8'd100..=8'd200: b = 8'd3; // Matches range [100:200]
            default        : b = 8'd0;
        }
    }
}
```

## Concatenation in left-hand side

If you want to use bit concatenation in left-hand of case/switch, 
surrounding `{}` is necessary, even if the statement is single.

```veryl,playground
module ModuleA {
    let a: logic<10> = 1;
    var b: logic<10>;
    var c: logic<10>;

    always_comb {
        case a {
            // This is not allowed
            //0: {b, c} = 1;
            //default: {b, c} = 2;
            0: {
                {b, c} = 1;
            }
            default: {
                {b, c} = 2;
            }
        }
    }
}
```
