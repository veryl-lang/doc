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
