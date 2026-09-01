# Import

`import` declaration imports symbols from other packages.
It can be placed at the top level or as a module/interface/package item.
Wildcard pattern like `package::*` can be used as an argument of `import` declaration.

```veryl,playground
// file scope import
import $sv::SvPackage::*;

package PackageA {
    const paramA: u32 = 1;
}

module ModuleA {
    import PackageA::*;
    import PackageA::paramA;
}
```

Multiple symbols can be imported from a single package at once by listing them
in braces like `package::{a, b}`.

```veryl,playground
package PackageA {
    const paramA: u32 = 1;
    const paramB: u32 = 2;
}

module ModuleA {
    import PackageA::{paramA, paramB};
}
```

Symbols imported via an import declaration can be referenced anywhere within the namespace where the import declaration is placed.

```veryl,playground
package PackageA {
    const WIDTH: u32 = 8;
}

module ModuleA (
    i_d: input  logic<WIDTH>, // valid reference
    o_d: output logic<WIDTH>, // valid reference
) {
    import PackageA::WIDTH;

    let d: logic<WIDTH> = i_d; // valid reference
    assign o_d = d;
}
```

Enum members can also be imported, individually, as a brace list, or via wildcard.
This works for enums defined inside a package as well as enums declared locally inside a module or interface.

```veryl,playground
package PackageB {
    enum Color: logic<3> {
        Red,
        Green,
        Blue,
        White,
        Black,
    }
}

module ModuleB {
    // import a single enum member
    import PackageB::Color::Red;
    // import multiple enum members
    import PackageB::Color::{Green, Blue};
    // import all remaining members of the enum
    import PackageB::Color::*;

    var c: PackageB::Color;
    // members can be referenced without qualification
    assign c = Green;
}
```

## Component namespace import

A component itself, which is a package, module or interface, can be imported under its own name.
The imported name can be used as a qualifier at the use site, so a component of a dependency can be referenced without repeating the project name.

```veryl
import veryl_sample::sample_pkg;
import veryl_sample::sample_if;
import veryl_sample::sample_module;

module ModuleC {
    const A: u32 = sample_pkg::PARAM_A;

    inst u_if: sample_if;
    inst u: sample_module (
        o_a: u_if.a,
    );

    let _a: logic = u_if.a;
}
```

A generic component is imported as its definition, and the generic arguments are given at the use site.

```veryl
import veryl_sample::generic_pkg;

module ModuleD {
    const B: u32 = generic_pkg::<32>::PARAM_B;
}
```

A `proto package` can be imported in the same way, and the imported name can be used as a generic bound.
The other prototypes like `proto module` and `proto interface` can't be imported.

```veryl
import veryl_sample::sample_proto_pkg;

module ModuleE::<PKG: sample_proto_pkg> {
    let _a: logic<PKG::WIDTH> = 0;
}
```

A function declared at the project scope, which means outside any module, interface and package, can be imported through the project name too.

```veryl
import veryl_sample::sample_func;

module ModuleF {
    let _a: logic<8> = sample_func::<8>(8'd1);
}
```

> Note: The result of play button in the above codes is not exact because it doesn't use dependency resolution.
