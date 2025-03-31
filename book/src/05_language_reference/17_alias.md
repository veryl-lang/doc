# Alias

Module, interface and package with generic arguments becomes too long sometimes.
`alias` can name a short name for such items. 

```veryl,playground
package PkgA::<X: const, Y: const, Z: const> {}

alias package PkgA123 = PkgA::<1, 2, 3>;
```
