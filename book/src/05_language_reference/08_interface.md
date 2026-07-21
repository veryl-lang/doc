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

## Mixin

An interface can incorporate the members of other interfaces by using the `mixin` declaration.
All members (variables, functions, and modports) of the mixed-in interface are expanded into the interface as if they were declared directly in it.
This is useful to share common definitions among multiple interfaces.

For example, a bus protocol is often composed of independent channels such as a command channel and a response channel.
By defining each channel as a separate interface and mixing them in, the channels can be reused across multiple bus interfaces.
A generic interface can be mixed in by giving its generic arguments in the `mixin` declaration.

```veryl,playground
// Command channel: a master issues read/write commands to a slave
interface Command::<ADDR_WIDTH: u32, DATA_WIDTH: u32> {
    var cmd_ready: logic            ;
    var cmd_valid: logic            ;
    var cmd_write: logic            ;
    var cmd_addr : logic<ADDR_WIDTH>;
    var cmd_data : logic<DATA_WIDTH>;

    modport mp_cmd {
        cmd_ready: input ,
        cmd_valid: output,
        cmd_write: output,
        cmd_addr : output,
        cmd_data : output,
    }
}

// Response channel: a slave returns read data to a master
interface Response::<DATA_WIDTH: u32> {
    var rsp_ready: logic            ;
    var rsp_valid: logic            ;
    var rsp_data : logic<DATA_WIDTH>;

    modport mp_rsp {
        rsp_ready: output,
        rsp_valid: input ,
        rsp_data : input ,
    }
}

// A memory bus composed from the command and response channels
interface MemoryBus::<ADDR_WIDTH: u32, DATA_WIDTH: u32> {
    mixin Command::<ADDR_WIDTH, DATA_WIDTH>;
    mixin Response::<DATA_WIDTH>;

    modport master {
        ..same(mp_cmd, mp_rsp)
    }

    modport slave {
        ..converse(mp_cmd, mp_rsp)
    }
}

alias interface MemoryBus32 = MemoryBus::<32, 32>;
```

The following restrictions are applied to the mixed-in interface:

* The mixed-in target must be an interface. A module or a prototype can't be mixed in.
* An interface can't mix in itself.
* An interface that has overridable parameters (`param`/`const`) can't be mixed in. (A generic interface can be mixed in by giving its generic arguments as shown above.)
* An interface that itself has `mixin` declarations can't be mixed in. (`mixin` can't be nested.)
* Member names must be unique across the interface and all mixed-in interfaces. A name collision is an error.

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
