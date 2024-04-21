# Import / Export

`import` declaration imports symbols from other packages.
It can be placed at the top level or as a module/interface/package item.
Wildcard pattern like `package::*` can be used as an argument of `import` declaration.

```veryl,playground
// file scope import
import $sv::SvPackage::*;

module ModuleA {
    import PackageA::*;
    import PackageA::paramA;
}

package PackageA {
    local paramA: u32 = 1;
}
```

`export` declaration exports symbols from the package to other.
`export *` represents to export all symbols.

```veryl,playground
package PackageA {
    local paramA: u32 = 1;
}

package PackageB {
    import PackageA::*;
    export paramA;
}

package PackageC {
    import PackageA::*;
    export *;
}
```
