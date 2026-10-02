# For

`for` statement represent repetition.
Loop variable is placed before `in` keyword,
and [range](../04_expression/07_range.md) is placed after it.

`break` can be used to break the loop.

```veryl,playground
module ModuleA {
    var a: logic<10>;

    always_comb {
        for i in 0..10 {
            a = i;

            if i == 5 {
                break;
            }
        }
    }
}
```

You can iterate the loop in descending order by putting `rev` keyword after `in` keyword.

```veryl,playground
module ModuleA {
    var a: logic<10>;

    always_comb {
        for i in rev 0..10 {
            a = i;

            if i == 5 {
                break;
            }
        }
    }
}
```

The loop variable advances by 1 on each iteration.
You can change this by putting `step` keyword, an assignment operator, and an expression after the range.
The loop variable is updated with the operator on each iteration, so `step += 2` counts by 2 and `step *= 2` doubles it.

```veryl,playground
module ModuleA {
    var a: logic<10>;
    var b: logic<10>;

    always_comb {
        for i in 0..10 step += 2 {
            a = i;
        }

        for i in 1..10 step *= 2 {
            b = i;
        }
    }
}
```

`step` can also be used with `rev`, but only with `+=`.
In this case the loop variable goes down by the given amount.

```veryl,playground
module ModuleA {
    var a: logic<10>;

    always_comb {
        for i in rev 0..10 step += 3 {
            a = i;
        }
    }
}
```

A step which can never reach the end of the range is an error, such as `step += 0`, `step -= 1` in a forward loop, or `step *= 2` together with `rev`.
