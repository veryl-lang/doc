# Msb / Lsb

`msb` and `lsb` can be used in bit selection by `[]`.
`msb` means most significant bit of the operand.
`lsb` means least significant bit of the operand, it is the same as 0.

```veryl,playground
module ModuleA {
    let a : logic<10> = 1;
    let _b: logic<10> = a[msb - 3:lsb];
    let _c: logic<10> = a[msb - 1:lsb + 1];
}
```
