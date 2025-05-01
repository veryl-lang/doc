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

In addition, functions specified with `import` keyword can be used via the modport.

```veryl,playground
interface InterfaceA {
    var a: logic;
    var b: logic;

    function a_and_b -> logic<2> {
        return {a, b};
    }

    modport mp {
        a      : input ,
        b      : input ,
        a_and_b: import,
    }
}
module ModuleA (
    ab_if: modport InterfaceA::mp,
) {
    let _ab: logic<2> = ab_if.a_and_b();
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
