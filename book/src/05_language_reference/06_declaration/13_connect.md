# Connect

To assign from a interface to another interface, `connect` decleration can be used instead of each member assignment.
`connect` decleration connects all members of the interface automatically.

The direction of assignment is determined by modport, so `output` member is assigned to `input` member.
If an argument of `connect` is an interface instance, additional modport specification is necessary because it can't be determined direction.

The connection operator `<>` can be used in `always_comb` too.

```veryl,playground
interface InterfaceA {
    var cmd  : logic;
    var ready: logic;

    modport master {
        cmd  : output,
        ready: input ,
    }

    modport slave {
        ..converse(master)
    }
}

module ModuleA (
    mst_if0: modport InterfaceA::master,
    slv_if0: modport InterfaceA::slave ,
    mst_if1: modport InterfaceA::master,
    slv_if1: modport InterfaceA::slave ,
) {
    inst bus_if0: InterfaceA;
    inst bus_if1: InterfaceA;

    connect mst_if0 <> bus_if0.slave;
    connect slv_if0 <> bus_if0.master;

    always_comb {
        mst_if1 <> bus_if1.slave;
    }
    always_comb {
        slv_if1 <> bus_if1.master;
    }
}
```
