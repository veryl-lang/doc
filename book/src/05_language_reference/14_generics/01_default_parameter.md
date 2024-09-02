# Default Parameter

Generic parameter can take a default value through `=` after the generic parameter.
If the parameter specifications at call site is omitted, the default value is used.

```veryl,playground
module ModuleA {
    function FuncA::<T: const = 10> (
        a: input logic<T>,
    ) -> logic<T> {
        return a + 1;
    }

    let _a: logic<10> = FuncA::<>(1);
    let _b: logic<20> = FuncA::<20>(1);
}
```

Default parameters should be placed at the last of generic parameter list.
If not, it causes ambiguous which parameters are omitted.

```veryl,playground
module ModuleA {
    function FuncA::<T: const, U: const = 1> (
        a: input logic<T>,
    ) -> logic<T> {
        return a + U;
    }

    // Error
    //function FuncA::<T = 1, U> (
    //    a: input logic<T>,
    //) -> logic<T> {
    //    return a + U;
    //}

    let _a: logic<10> = FuncA::<10>(1);
    let _b: logic<20> = FuncA::<20, 2>(1);
}
```
