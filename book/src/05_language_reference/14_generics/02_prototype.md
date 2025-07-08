# Prototype

Prototype is a special generic bound. It represents prototype which can be passed to the generic parameter.
Currently module prototype, interface prototype and package prototype are supported.

## Module Prototype

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

## Interface Protype

In the following exmaple, `ProtoA` is a interface prototype which has constant `A`, `raedy`/`valid`/`data` variables, function `ack` and mopdort `master`.
`BUS_IF` is restricted by `ProtoA` is guaranteed to have the above members, so they can be referred.

```veryl,playground
proto interface ProtoA {
    const WIDTH: u32;

    var ready: logic       ;
    var valid: logic       ;
    var data : logic<WIDTH>;

    function ack() -> logic ;

    modport master {
        ready: input ,
        valid: output,
        data : output,
        ack  : import,
    }
}

interface InterfaceA::<W: u32> for ProtoA {
    const WIDTH: u32 = W;

    var ready: logic       ;
    var valid: logic       ;
    var data : logic<WIDTH>;

    function ack () -> logic {
        return ready && valid;
    }

    modport master {
        ready: input ,
        valid: output,
        data : output,
        ack  : import,
    }
}

module ModuleA::<BUS_IF: ProtoA> (
    bus_if: modport BUS_IF::master,
) {
    connect bus_if <> 0;
}

module ModuleB {
    inst bus_if: InterfaceA::<8>;

    inst u: ModuleA::<InterfaceA::<8>> (
        bus_if: bus_if,
    );
}
```

## Package Prototype

In the following example, `ProtoA` is a package prototype which has type `data_a` and `data_b`.
`PKG` restricted by `ProtoA` is guaranteed to have `data_a` and `data_b`, so they can be refered.

```veryl,playground
proto package ProtoA {
    type data_a;
    type data_b;
}

package PackageA::<A: u32, B: u32> for ProtoA {
    type data_a = logic<A>;
    type data_b = logic<B>;
}

module ModuleA::<PKG: ProtoA> {
    let _a: PKG::data_a = 0;
}
```

## Prototype Items

Following protoype items can be declaraed within module, interface and package protoype declarations.

The following table shows which prototypes can have which prototype items.

| Prototype | Parameter | Port | Const | Variable | Typedef | Struct/Enum/Union | Function | Alias | Modport |
|:----------|:----------|:-----|:------|:---------|:--------|:------------------|:---------|:------|:--------|
| Module    | v         | v    |       |          |         |                   |          |       |         |
| Interface | v         |      | v     | v        | v       |                   | v        |       | v       |
| Package   |           |      | v     |          | v       | v                 | v        | v     |         |

### Parameter

Parameter prototype specifies identifier name, data type and default value of a parameter.

```veryl
proto module ModuleA #(
    param A: u32 = 0,
    param B: u32 = 1,
);
```

### Port

Port prototype specifies identifier name, direction and data type of a port.

```veryl
proto module ModuleA (
    i_d: input  logic,
    o_d: output logic,
);
```

### Const

Const prototype specify identifier name and data type of a constant. It can be used as a placeholder of a generic parameter.

```veryl
proto package ProtoPkg {
    const WIDTH: u32;
}
package PkgA::<W: u32> for ProtoPkg {
    const WIDTH: u32 = W;
}
```

### Variable

Variable prototype specifies identifier name and data type of a variable. It can be used for both of `var` and `let` declarations.

```veryl
proto interface ProtoA {
    var a: logic;
    var b: logic;
}
interface InterfaceA for ProtoA {
    var a: logic;
    let b: lgoic = 0;
}
```

### Typedef

Typedef prototype specifies identifier name of a type alias. It can be used as a placeholder for a generic parameter.

```veryl
proto package ProtoPkg {
    type data_t;
}
package PkgA::<W: u32> for ProtoPkg {
    type data_t = logic<W>;
}
```

Furthermore, a typedef prototype can specify its actual type on its RHS.
This allows a type symbol defined in a different package to be imported into the proto package and referenced from other components through it.

```veryl,playground
package FooPkg {
    struct Foo {
        foo: logic,
    }
}
proto package BarProtoPkg {
    type Foo = FooPkg::Foo;
}
package BarPkg for BarProtoPkg {
    type Foo = FooPkg::Foo;
}
module ModuleA::<PKG: BarProtoPkg> {
    var _foo    : PKG::Foo;
    assign _foo.foo = 0;
}
module ModuleB {
    inst u: ModuleA::<BarPkg>;
}
```

### Struct/Enum/Union

Struct, Enum and Union prototypes specify identifier name of a struct/enum/union and identifier name and data type of each members.

```veryl
proto package ProtoPkg {
    struct Foo {
        a: logic,
        b: logic,
    }

    enum Bar {
        C,
        D,
    }

    union Baz {
        e: logic,
        f: logic,
    }
}
```

### Function

Function prototype specifies identifier name and return data type of a function, and direction and data type of each arguments.

```veryl
proto package ProtoPkg {
    function foo (a: input logic, b: input logic) -> logic;
}
```

### Alias Module/Interface/Package

Module alias prototype, interface alias prototype and package alias protoype specify identifier name and prototype of a module/interface/pacakge alias. Type of an actual alias is restricted by the given prototype.

```veryl
proto module ProtoRamWrapper;

proto package ProtoPkg {
    alias module ram: ProtoRamWrapper;
}

package Pkg::<RAM: ProtoRamWrapper> for ProtoPkg {
    alias module ram = RAM;
}

module RamWrapper for ProtoRamWrapper {}

module top {
  inst u_ram: Pkg::<RamWrapper>::ram;
}
```

### Modport

Modport prototype specifis identifier name of a modport, and identifier name and direction of each membres.

```veryl
proto interface ProtoA {
    var a: logic;
    var b: logic;

    modport mp {
        a: input ,
        b: output,
    }
}
```
