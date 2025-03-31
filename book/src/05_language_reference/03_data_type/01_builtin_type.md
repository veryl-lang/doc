# Builtin Type

## 4-state data type which has variable width

`logic` is 4-state (`0`, `1`, `x`, `z`) data type.
The variable width can be specified by `<>` after `logic`.
Multi-dimentional can be specified by `<X, Y, Z,,,>`.

```veryl,playground
module ModuleA {
    let _a: logic         = 1;
    let _b: logic<10>     = 1;
    let _c: logic<10, 10> = 1;
}
```

## 2-state data type which has variable width

`bit` is 2-state (`0`, `1`) data type.
The variable width can be specified by `<>` after `bit`.
Multi-dimentional can be specified by `<X, Y, Z,,,>`.

```veryl,playground
module ModuleA {
    let _a: bit         = 1;
    let _b: bit<10>     = 1;
    let _c: bit<10, 10> = 1;
}
```

## Type modifier

The following type modifiers can be added to `logic` and `bit` type.

* `signed`: the MSB is treated as sign-bit
* `tri`: tri-state type

```veryl,playground
module ModuleA {
    let _a: signed logic<10> = 1;
    let _b: tri logic   <10> = 1;
    let _c: signed bit  <10> = 1;
    let _d: tri bit     <10> = 1;
}
```

## Integer type

There are some integer types:

* `u32`: 32bit unsigned integer
* `u64`: 64bit unsigned integer
* `i32`: 32bit signed integer
* `i64`: 64bit signed integer

```veryl,playground
module ModuleA {
    let _a: u32 = 1;
    let _b: u64 = 1;
    let _c: i32 = 1;
    let _d: i64 = 1;
}
```

## Floating point type

There are some floating point types:

* `f32`: 32bit floating point
* `f64`: 64bit floating point

Both of them are represented as described by IEEE Std 754.

```veryl,playground
module ModuleA {
    let _a: f32 = 1.0;
    let _b: f64 = 1.0;
}
```

## String type

`string` is string type.

```veryl,playground
module ModuleA {
    let _a: string = "";
}
```

## Type type

`type` is a type which represents type kind.
Variable of `type` can be defined as `param` or `const` only.

```veryl,playground
module ModuleA {
    const a: type = logic;
    const b: type = logic<10>;
    const c: type = u32;
}
```

## Boolean type

`bool` is a type alias of `logic<1>` to express boolean.
`true` and `false` literal which express `1'b1` and `1'b0` can be used.

```veryl,playground
module ModuleA {
    const a: bool = true;
    const b: bool = false;
}
```
