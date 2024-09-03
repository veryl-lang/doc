# Package

```veryl,playground,editable
// package definition
package PackageA {
    const ParamA: u32 = 1;
    const ParamB: u32 = 1;

    function FuncA (
        a: input logic<ParamA>,
    ) -> logic<ParamA> {
        return a + 1;
    }
}

module ModuleA {
    let a : logic<10> = PackageA::ParamA;
    let _b: logic<10> = PackageA::FuncA(a);
}
```
