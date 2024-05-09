# Clock / Reset

`clock` is a special types to represent clock wiring. 
There are 3 variants to specify clock polarity.

* `clock`: clock type of which polarity is specified by the build option
* `clock_posedge`: clock type of which polarity is positive
* `clock_negedge`: clock type of which polarity is negative

`reset` is a special types to represent reset wiring. 
There are 5 variants to specify reset polarity and synchronicity.

* `reset`: reset type of which polarity and synchronicity are specified by the build option
* `reset_async_high`: async/high active reset type
* `reset_async_low`: async/low active reset type
* `reset_sync_high`: sync/active high reset type
* `reset_sync_low`: sync/active low reset type

If there is no special requirement, `clock` and `reset` are recommended for code reusability.

```veryl,playground
module ModuleA (
    i_clk    : input clock           ,
    i_clk_p  : input clock_posedge   ,
    i_clk_n  : input clock_negedge   ,
    i_rst    : input reset           ,
    i_rst_a  : input reset_async_high,
    i_rst_a_n: input reset_async_low ,
    i_rst_s  : input reset_sync_high ,
    i_rst_s_n: input reset_sync_low  ,
) {
    var a: logic;
    var b: logic;
    var c: logic;

    always_ff (i_clk, i_rst) {
        if_reset {
            a = 0;
        } else {
            a = 1;
        }
    }

    always_ff (i_clk_p, i_rst_a) {
        if_reset {
            b = 0;
        } else {
            b = 1;
        }
    }

    always_ff (i_clk_n, i_rst_s_n) {
        if_reset {
            c = 0;
        } else {
            c = 1;
        }
    }
}
```
