# Visibility

By default, all top level items of a project (module, interface and package) are private.
The "private" means they are not visible from other project.

`pub` keyword can be used to specify an item as public to other project.
`veryl doc` will generate [documents](../06_development_environment/10_documentation.md) of public items only.

```veryl,playground
pub module ModuleA {}

pub interface InterfaceA {}

pub package PackageA {}
```
