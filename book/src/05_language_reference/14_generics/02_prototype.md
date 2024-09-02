# Prototype

Prototype is a special generic bound. It represents prototype which can be passed to the generic parameter.
Currently module prototype is supported only.

In the following example, `ProtoA` is a module prototype which has parameter `A` and port `i_dat` and `o_dat`.
By binding like `T: ProtoA`, it is represented that the generic parameter `T` should have the parameters and ports.

To use prototype, `for` implementation is required. `ModuleC` and `ModuleD` have `for ProroA` specifier which means the module satisfies the condision of `ProroA`.
So the modules can be used as the generic parameter `T` of `ModuleB`.

```veryl,playground
module ModuleA {
    inst u0: ModuleB::<ModuleC>;
    inst u1: ModuleB::<ModuleD>;
}

proto module ProtoA #(
    param A: u32 = 1,
) (
    i_dat: input  logic,
    o_dat: output logic,
);

module ModuleB::<T: ProtoA> {
    inst u: T (
        i_dat: 0,
        o_dat: _,
    );
}

module ModuleC for ProtoA #(
    param A: u32 = 1,
) (
    i_dat: input  logic,
    o_dat: output logic,
) {
    assign o_dat = i_dat;
}

module ModuleD for ProtoA #(
    param A: u32 = 1,
) (
    i_dat: input  logic,
    o_dat: output logic,
) {
    assign o_dat = ~i_dat;
}
```
