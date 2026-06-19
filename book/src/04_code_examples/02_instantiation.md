# Instantiation

```veryl,playground,editable
module ModuleA #(
    param ParamA: u32 = 10,
) (
    i_clk : input  clock        ,
    i_rst : input  reset        ,
    i_data: input  logic<ParamA>,
    o_data: output logic<ParamA>,
) {
    var r_data1: logic<ParamA>;
    var r_data2: logic<ParamA>;

    assign r_data1 = i_data + 1;
    assign o_data  = r_data2 + 2;

    // instance declaration
    //   `inst` keyword starts instance declaration
    //   port connnection can be specified by `()`
    //   each port connection is `[port_name]:[variable]`
    //   `[port_name]` means `[port_name]:[port_name]`
    inst u_module_b: ModuleB (
        i_clk          ,
        i_data: r_data1,
        o_data: r_data2,
    );

    // instance declaration with parameter override
    //   notation of parameter connection is the same as port
    inst u_module_c: ModuleC #( ParamA, ParamB: 10 );
}

module ModuleB #(
    param ParamA: u32 = 10,
) (
    i_clk : input  clock        ,
    i_data: input  logic<ParamA>,
    o_data: output logic<ParamA>,
) {
    assign o_data = 1;
}

module ModuleC #(
    param ParamA: u32 = 10,
    param ParamB: u32 = 10,
) () {}
```
