# Named Block

Label can be added to `{}` block.
The named block has an individual namespace.

```veryl,playground
module ModuleA {
    :labelA {
        let _a: logic<10> = 1;
    }

    :labelB {
        let _a: logic<10> = 1;
    }
}
```
