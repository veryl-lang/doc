# Alias

Module, interface and package with generic arguments becomes too long sometimes.
`alias` can name a short name for such items. 

```veryl,playground
package PkgA::<X: u32, Y: u32, Z: u32> {}

alias package PkgA123 = PkgA::<1, 2, 3>;
```
