# Interface

Interface is one of top level components in source code.
Interface has overridable parameters, and interface definitions.

Overridable parameters are the same as them of module.

In interface definitions, `modport` can be declared. 
`modport` can be used as bundled port connection at the port declaration of module.

```veryl,playground
interface InterfaceA #(
    param ParamA: u32 = 0,
    param ParamB: u32 = 0,
) {
    var a: logic;
    var b: logic;

    modport master {
        a: output,
        b: input ,
    }

    modport slave {
        b: input ,
        a: output,
    }
}
```

## Default members of modport

Instead of specifing all members of modport, default members can be specified like below:

* `..input`: all variables in the interface as `input`
* `..output`: all variables in the interface as `output`
* `..same(modport_name)`: the same variables as `modport_name`
* `..converse(modport_name)`: the same variables as `modport_name`, but all direction is converse

Specifing default members can be used with normal explicit members.

```veryl,playground
interface InterfaceA {
    var a: logic;
    var b: logic;
    var c: logic;

    modport master {
        a: output,
        b: input ,
        c: input ,
    }

    modport slave {
        ..converse(master)
    }

    modport monitor {
        ..input
    }

    modport driver {
        b: input,
        ..output
    }
}
```
