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
