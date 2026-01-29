# User Defined Type

## Struct

`struct` is composite data type.
It can contain some fields, and these fields can be access through `.` operator.

```veryl,playground
module ModuleA {
    struct StructA {
        member_a: logic    ,
        member_b: logic<10>,
        member_c: u32      ,
    }

    var a: StructA;

    assign a.member_a = 0;
    assign a.member_b = 1;
    assign a.member_c = 2;
}
```

<div class="warning">
You can define `struct` data types within module and package declarations but not interface declaration.
</div>

## Enum

`enum` is enumerable type.
It has some named variant, and the value of `enum` can be set to the one of them.
The variant name can be specified by `[enum name]::[variant name]`.
Each variant has the corresponding integral value.
The value can be specified by `=`.
Otherwise, it is assigned automatically.

```veryl,playground
module A {
    enum EnumA: logic<2> {
        member_a,
        member_b,
        member_c = 3,
    }

    var a: EnumA;

    assign a = EnumA::member_a;
}
```

If the type of `enum` is omitted, it will be infered from the variants automatically and `logic` is used as its base type.
`#[enum_base_type(TYPE)]` attribute can be used to specify the base type if you want.

```veryl,playground
module A {
    enum EnumA {
        member_a,
        member_b,
        member_c = 3,
    }

    #[enum_base_type(bit)]
    enum EnumB {
        member_d = 1,
        member_e = 3,
    }
}
```

<div class="warning">
You can define `enum` data types within module and package declarations but not interface declarations.
</div>

### Enum Encoding

By default, the value of each variant is assigned sequentially if it is omitted.
If you want to specify value encoding, `#[enum_encoding]` attribute can be used.
The available encodings are here:

* `sequential`
* `onehot`
* `gray`

```veryl,playground
module A {
    #[enum_encoding(sequential)]
    enum EnumA {
        member_a,
    }

    #[enum_encoding(onehot)]
    enum EnumB {
        member_a,
    }

    #[enum_encoding(gray)]
    enum EnumC {
        member_a,
    }
}
```

## Union

A Veryl `union` is a packed, untagged sum type and is transpiled to SystemVerilog's `packed union`.
Each  union variant should have the same packed width as each other union variant.

```veryl,playground
module A {
    union UnionA {
        variant_a: logic<8>      ,
        variant_b: logic<2, 4>   ,
        variant_c: logic<4, 2>   ,
        variant_d: logic<2, 2, 2>,
    }
    var a          : UnionA;
    assign a.variant_a = 8'haa;
}
```

<div class="warning">
You can define `union` data types within module and package declarations but not interface declarations.
</div>

## Typedef

The `type` keyword can be used to define a type alias to scalar or array types.

```veryl,playground
module A {
    type word_t    = logic <16>     ;
    type regfile_t = word_t     [16];
    type octbyte   = bit   <8>  [8] ;
}
```
