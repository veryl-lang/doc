# Project Property

A project property is a compile time constant which is given through `Veryl.toml` instead of source code.
It is useful to configure a project from the outside of the source code.
For example, a library can be built with a different data width for each project which depends on it.

## Definition

Project properties are defined in the `[properties]` section of `Veryl.toml`.
The value of a property is an integer or a boolean.

```toml
[project]
name    = "veryl_sample"
version = "0.1.0"

[properties]
DATA_WIDTH   = 32
ENABLE_DEBUG = false
```

See [Project Configuration](../06_development_environment/01_project_configuration.md#the-properties-section) for detailed information.

## Reference

Defined properties can be referenced through the `$prop` namespace.
An integer property has `i64` type, and a boolean property has `bbool` type.

```veryl
package sample_pkg {
    const DATA_WIDTH  : i64   = $prop::DATA_WIDTH;
    const ENABLE_DEBUG: bbool = $prop::ENABLE_DEBUG;
}
```

`$prop` always refers to the properties of the project which the source code belongs to.
So the properties of a dependency can't be referenced from the project which depends on it.

A project property is a compile time constant, so it can be used wherever a constant expression can be used.
The value is resolved at compile time, and the resolved value appears in the generated code.

```veryl
module ModuleA {
    var a: logic<$prop::DATA_WIDTH>;

    if $prop::ENABLE_DEBUG :g_debug {
        // debug logic
    }
}
```

## Configuration by the depending project

The value of a project property can be overridden through the `properties` field of the `[dependencies]` section by the project which depends on it.

```toml
[dependencies]
veryl_sample = {github = "veryl-lang/veryl_sample", version = "0.1.0", properties = {DATA_WIDTH = 8}}
```

In the above example, `$prop::DATA_WIDTH` in `veryl_sample` becomes `8`.
The properties which are not specified here keep the default values defined in `Veryl.toml` of the dependency, so `$prop::ENABLE_DEBUG` keeps `false`.

See [Dependencies](../06_development_environment/02_dependencies.md#project-property-override) for detailed information.
