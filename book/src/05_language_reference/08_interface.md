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
* `..same(modport_name, ...)`: the same members as specified modports (including imported functions)
* `..converse(modport_name, ...)`: the same members as specified modports, but all direction is converse (imported functions are kept as-is)

Specifing default members can be used with normal explicit members.

```veryl,playground
interface InterfaceA {
    var a: logic;
    var b: logic;
    var c: logic;

    modport mp_a {
        a: output,
    }

    modport mp_b {
        b: input,
        c: input,
    }

    modport master {
        ..same(mp_a, mp_b)
    }

    modport slave {
        ..converse(mp_a, mp_b)
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

## Interface inheritance

An interface can inherit the members (variables, functions, and modports) of one or more parent interfaces with the `inherit` keyword.
The parents' members are expanded into the child interface, so they can be used as if they were declared in the child directly.

```veryl,playground
interface InterfaceA {
    var a: logic;

    modport mp_a {
        a: input,
    }
}

interface InterfaceB {
    var b: logic;

    modport mp_b {
        b: input,
    }
}

// InterfaceC inherits the members and modports of InterfaceA and InterfaceB.
interface InterfaceC inherit InterfaceA, InterfaceB {
    var c: logic;

    modport mp {
        c: input,
        ..same(mp_a, mp_b)
    }
}
```

Generic arguments can be passed to a parent interface:

```veryl,playground
interface InterfaceA::<W: u32> {
    var a: logic<W>;

    modport mp_a {
        a: input,
    }
}

interface InterfaceB::<W: u32> inherit InterfaceA::<W> {
    var b: logic<W>;

    modport mp_b {
        b: input,
        ..same(mp_a)
    }
}
```

A parent interface must satisfy all of the following conditions:

* It must be an interface, not a `proto` interface.
* It must not have parameters (generic parameters are allowed).
* It must not inherit from other interfaces (nested inheritance is not supported yet).
* Its member names must not conflict with the child's members or with the other parents' members.

## Connect interface instances/modport ports

An interface instance and a modport port can be connected with a module port of which type is compatible with it or is the `generic` interface with the same manner of SystemVerilog.

```veryl,playground
interface InterfaceA {
    var a: logic;

    modport mp {
        a: output,
    }
}
module ModuleA (
    foo_if: modport InterfaceA::mp,
    bar_if: modport InterfaceA::mp,
) {
    always_comb {
        foo_if.a = '0;
        bar_if.a = '0;
    }
}
module ModuleB (
    foo_if: modport InterfaceA::mp,
) {
    inst bar_if: InterfaceA;
    inst u: ModuleA (
        foo_if: foo_if,
        bar_if: bar_if,
    );
}
```
