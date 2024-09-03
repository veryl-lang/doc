# Interface

```veryl,playground,editable
// interface definition
interface InterfaceA #(
    param ParamA: u32 = 1,
    param ParamB: u32 = 1,
) {
    const ParamC: u32 = 1;

    var a: logic<ParamA>;
    var b: logic<ParamA>;
    var c: logic<ParamA>;

    // modport definition
    modport master {
        a: input ,
        b: input ,
        c: output,
    }

    modport slave {
        a: input ,
        b: input ,
        c: output,
    }
}

module ModuleA (
    i_clk: input clock,
    i_rst: input reset,
    // port declaration by modport
    intf_a_mst: modport InterfaceA::master,
    intf_a_slv: modport InterfaceA::slave ,
) {
    // interface instantiation
    inst u_intf_a: InterfaceA [10];
}
```
