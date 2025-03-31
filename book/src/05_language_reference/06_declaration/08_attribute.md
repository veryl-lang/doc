# Attribute

Attribute can annotate some declarations like variable declaration.

## `sv` Attribute

`sv` attribute represents SystemVerilog attribute.
It will be transpiled to SystemVerilog attribute `(*  *)`.

```veryl,playground
module ModuleA {
    #[sv("ram_style=\"block\"")]
    let _a: logic<10> = 1;
    #[sv("mark_debug=\"true\"")]
    let _b: logic<10> = 1;
}
```

## `allow` Attribute

`allow` attribute is used to disable specified lint check.

```veryl,playground
module ModuleA {
    #[allow(unused_variable)]
    let a: logic<10> = 1;
}
```

Available lint names are below:

* `unused_variable`
* `missing_reset_statement`
* `missing_port`

## `ifdef`/`ifndef` Attribute

`ifdef` and `ifndef` attribute is used to control whether the annotated code block is enabled by defined value.
If `DEFINE_A` is defined, the code block with `#[ifdef(DEFINE_A)]` is enabled, and the code block with `#[ifndef(DEFINE_A)]` is disabled.

```veryl,playground
module ModuleA {
    #[ifdef(DEFINE_A)]
    {
        let _a: logic<10> = 1;
    }

    #[ifndef(DEFINE_A)]
    {
        let _b: logic<10> = 1;
    }
}
```

## `align` Attribute

`align` attribute is used to control vertical alignment by formatter.
If `number` is specified as an argument of `align` attribute, all numbers are aligned.
`identifier` can be used too.

```veryl,playground
module ModuleA {
    let a  : logic<32> = 1;
    let aa : logic<32> = 1;
    let aaa: logic<32> = 1;

    let _b: logic = {
        a[0] repeat 1, a[0] repeat 1,
        aa[1] repeat 8, aa[1] repeat 8,
        aaa[2] repeat 16, aaa[2] repeat 16,
    };

    #[align(number, identifier)]
    let _c : logic = {
        a  [0 ] repeat 1 , a  [0 ] repeat 1 ,
        aa [1 ] repeat 8 , aa [1 ] repeat 8 ,
        aaa[2 ] repeat 16, aaa[2 ] repeat 16,
    };
}
```

## `fmt` Attribute

`fmt` attribute is used to control formatiing way.
The following arguments are supported:

* `compact`: compact formatting without newlines

```veryl,playground
module ModuleA {
    #[fmt(compact)]
    {
        inst u1: $sv::Module #( A: 1, B: 2 ) ( x: 1, y: _ );
        inst u2: $sv::Module #( A: 1, B: 2 ) ( x: 1, y: _ );
        inst u3: $sv::Module #( A: 1, B: 2 ) ( x: 1, y: _ );
        inst u4: $sv::Module #( A: 1, B: 2 ) ( x: 1, y: _ );
    }
}
```
