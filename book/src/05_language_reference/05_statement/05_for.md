# For

`for` statement represent repetition.
Loop variable is placed before `in` keyword,
and [range](../04_expression/07_range.md) is placed after it.

`break` can be used to break the loop.

```veryl,playground
module ModuleA {
    var a: logic<10>;

    always_comb {
        for i: u32 in 0..10 {
            a += i;

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
        for i: i32 in rev 0..10 {
            a += i;

            if i == 5 {
                break;
            }
        }
    }
}
```
