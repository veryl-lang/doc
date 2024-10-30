# Bit Select

`[]` is bit select operator.
If an expression is specified to `[]`, single bit is selected.
Bit range selection can be specified by `[expression:expression]`.

```veryl,playground
module ModuleA {
    let a: logic<10> = 1;
    var b: logic<10>;
    var c: logic<10>;

    assign b = a[3];
    assign c = a[4:0];
}
```

## Select by position and width

`+:` and `-:` notation can select by start position and width.
`[A+:B]` means `[(A+B-1):A]`, and `[A-:B]` means `[A:(A-B+1)]`.

```veryl,playground
module ModuleA {
    let a: logic<10> = 1;
    var b: logic<10>;
    var c: logic<10>;

    assign b = a[3+:1];
    assign c = a[4-:2];
}
```

## Select by index with step

`step` notation can select by index with step.
`[A step B]` means "select index `A` in step `B`", so it equals `[(B*A)+:B]`.

```veryl,playground
module ModuleA {
    let a: logic<10> = 1;
    var b: logic<10>;

    assign b = a[2 step 3];
}
```
