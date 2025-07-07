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

    let d  : logic<WIDTH> = i_d; // valid reference
    assign o_d = d;
}
```
