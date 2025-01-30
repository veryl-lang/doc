# Case / Switch

Another conditional expression is `case`.
`case` containts some arms like `value: expression`.
If the expression after `case` keyword matches the left value of an arm,
the right expression of the arm will be returned.
As the value, range like `..=` can be used too.
In addition, x/z values in the value act as `wildcards`. A wildcard bit matches any value (0/1/x/z) in the corresponding bit of the expression.
`default` is a special arm which will be returned when all other arms are failed.
`default` is mandatory because if expression always have to be evaluated to value.

```veryl,playground
module ModuleA {
    let a: logic<10> = 1;
    var b: logic<10>;

    assign b = case a {
        0               : 1,
        1               : 2,
        3..=5           : 4,
        10'b00_0000_011x: 5, // matches 6 or 7
        default         : 6,
    };
}
```

`switch` is another form of `case`.
`switch` containts some arms like `expression: expression`, and if the left expression is evaluated to 1, the right expression of the arm will be returned.

```veryl,playground
module ModuleA {
    let a: logic<10> = 1;
    var b: logic<10>;

    assign b = switch {
        a == 0 : 1,
        a == 1 : 2,
        a == 2 : 4,
        default: 5,
    };
}
```
