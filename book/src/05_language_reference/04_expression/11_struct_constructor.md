# Struct Constructor

To initialize struct, Struct constructor can be used instead of assigning each members.
This is especially useful to initialize `const` because it can't be assigned by each members.

`..default` specifier can speficy the default value for unspecified members in the struct.

```veryl,playground
module ModuleA {
    struct Param {
        a: bit<10>,
        b: bit<10>,
    }

    const p: Param = Param'{
        a: 10,
        b: 10,
    };

    const q: Param = Param'{
        a: 1,
        ..default(0) // means `b: 0`
    };
}
```
