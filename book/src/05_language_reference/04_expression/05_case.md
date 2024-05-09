# Case

Another conditional expression is `case`.
`case` containts some arms like `expression: expression`.
If the expression after `case` keyword matches the left expression of an arm,
the right expression of the arm will be returned.
`default` is a special arm which will be returned when all other arms are failed.
`default` is mandatory because if expression always have to be evaluated to value.

```veryl,playground
module ModuleA {
    let a: logic<10> = 1;
    var b: logic<10>;
    let c: logic<10> = 1;

    assign b = case a {
        0      : 1,
        1      : 2,
        c - 1  : 4,
        default: 5,
    };
}
```
