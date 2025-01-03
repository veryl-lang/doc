# Module

Module is one of top level components in source code.
Module has overridable parameters, connection ports, and internal logic.

Overridable parameters can be declared in `#()`.
Each parameter declaration is started by `param` keyword.
After the keyword, an identifier, `:`, the type of the parameter, and a default value are placed.

Connection ports can be declared in `()`.
Each port declaration is constructed by an identifier, `:`, port direction, and the type of the port.
The available port directions are:

* `input`: input port
* `output`: output port
* `inout`: bi-directional port
* `modport`: modport of interface
* `interface`: generic interface

```veryl,playground
module ModuleA #(
    param ParamA: u32 = 0,
    param ParamB: u32 = 0,
) (
    a: input  logic,
    b: input  logic,
    c: input  logic,
    x: output logic,
) {
    always_comb {
        if c {
            x = a;
        } else {
            x = b;
        }
    }
}
```

## Default value of port

Ports of module can have default value. Ports which have default value can be omitted at the instantiation, and the default values are assigned to the omitted ports.
As default value, the following values are allowed:

* Input port: literal, and `const` in package
* Output port: `_` (anonymous identifier)

```veryl,playground
module ModuleA (
    a: input  logic    ,
    b: input  logic = 1,
    x: output logic    ,
    y: output logic = _,
) {
    assign x = a;
    assign y = b;
}

module ModubeB {
    inst instA: ModuleA (
        a: 1,
        // b is omitted
        x: _,
        // y is omitted
    );
}
```


## Generic interface

Generic interface is a special port direction.
If `interface` is specified as the port direction, the port can be connected to arbitrary interface.
Modport can be added to the `interface` like `interface::ModPort` too.
Then the port can be connected to only the interface which has `ModPort`.

```veryl,playground
module ModuleA (
    bus_if  : interface,
    slave_if: interface::slave,
) {}
```
