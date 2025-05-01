# Features

In this chapter, we introduce the features of Veryl along with clear examples.

* [Real-time diagnostics](02_features.md#real-time-diagnostics)
* [Auto formatting](02_features.md#auto-formatting)
* [Integrated test](02_features.md#integrated-test)
* [Dependency management](02_features.md#dependency-management)
* [Generics](02_features.md#generics)
* [Clock Domain Annotation](02_features.md#clock-domain-annotation)
* [Trailing comma](02_features.md#trailing-comma)
* [Abstraction of clock and reset](02_features.md#abstraction-of-clock-and-reset)
* [Documentation comment](02_features.md#documentation-comment)
* [Compound assignment operator in `always_ff`](02_features.md#compound-assignment-operator-in-always_ff)
* [Individual namespace of enum variant](02_features.md#individual-namespace-of-enum-variant)
* [`repeat` of concatenation](02_features.md#repeat-of-concatenation)
* [`if` / `case` expression](02_features.md#if--case-expression)
* [Range-based `for` / `inside` / `outside`](02_features.md#range-based-for--inside--outside)
* [`msb` notation](02_features.md#msb-notation)
* [`let` statement](02_features.md#let-statement)
* [Named block](02_features.md#named-block)
* [Visibility control](02_features.md#visibility-control)

## Real-time diagnostics {#real-time-diagnostics}

Issues such as undefined, unused, or unassigned variables are notified in real-time while editing in the editor.
In the following example, adding the `_` prefix to variables flagged as unused explicitly indicates their unused status, suppressing warnings.

<video src="./img/diagnostics.mp4" autoplay loop muted>
</video>

## Auto formatting {#auto-formatting}

In addition to the automatic formatting feature integrated with the editor,
formatting through the command line and formatting checks in CI are also possible.

<video src="./img/format.mp4" autoplay loop muted>
</video>

## Integrated test {#integrated-test}

Test code written by SystemVerilog or [cocotb](https://www.cocotb.org) can be embeded in Veryl code,
it can be executed through `veryl test` command.

```veryl
#[test(test1)]
embed (inline) sv{{{
    module test1;
        initial begin
            assert (0) else $error("error");
        end
    endmodule
}}}
```

## Dependency management {#dependency-management}

Veryl includes a built-in dependency management feature,
allowing for easy incorporation of libraries by simply adding the repository path and version of the library on project settings like below.

```toml
[dependencies]
veryl_sample = {git = "https://github.com/veryl-lang/veryl_sample", version = "0.1.0"}
```

## Generics {#generics}

Code generation through generics achieves more reusable code than traditional parameter override.
Parameters in function like the following example, but also module names of instantiation, type names of struct definition, and so on can be parameterized.

<table>
<tr>
<th>SystemVerilog</th>
<th>Veryl</th>
</tr>
<tr>
<td>

```verilog
function automatic logic [20-1:0] FuncA_20 (
    input logic [20-1:0] a
);
    return a + 1;
endfunction

function automatic logic [10-1:0] FuncA_10 (
    input logic [10-1:0] a
);
    return a + 1;
endfunction

logic [10-1:0] a;
logic [20-1:0] b;
always_comb begin
    a = FuncA_10(1);
    b = FuncA_20(1);
end
```

</td>
<td>

```veryl
# module ModuleA {
function FuncA::<T: u32> (
    a: input logic<T>,
) -> logic<T> {
    return a + 1;
}

var a: logic<10>;
var b: logic<10>;
always_comb {
    a = FuncA::<10>(1);
    b = FuncA::<20>(1);
}
# }
```

</td>
</tr>
</table>

## Clock Domain Annotation {#clock-domain-annotation}

If there are some clocks in a module, explicit clock domain annotation and `unsafe (cdc)` block at the clock domain boundaries are required.
By the annotation, Veryl compiler detects unexpected clock domain crossing as error, and explicit `unsafe (cdc)` block eases to review clock domain crossing.

<table>
<tr>
<th>SystemVerilog</th>
<th>Veryl</th>
</tr>
<tr>
<td>

```verilog
module ModuleA (
    input  i_clk_a,
    input  i_dat_a,
    output o_dat_a,
    input  i_clk_b,
    input  i_dat_b,
    output o_dat_b
);
    // Carefully!!!
    // From i_clk_a to i_clk_b
    assign o_dat_b = i_dat_a;
endmodule
```

</td>
<td>

```veryl
module ModuleA (
    i_clk_a: input  'a clock,
    i_dat_a: input  'a logic,
    i_dat_a: output 'a logic,
    i_clk_b: input  'b clock,
    i_dat_b: input  'b logic,
    i_dat_b: output 'b logic,
) {
    unsafe (cdc) {
        assign o_dat_b = i_dat_a;
    }
}
```

</td>
</tr>
</table>

## Trailing comma {#trailing-comma}

Trailing comma is a syntax where a comma is placed after the last element in a list.
It facilitates the addition and removal of elements and reduces unnecessary differences in version control systems.

<table>
<tr>
<th>SystemVerilog</th>
<th>Veryl</th>
</tr>
<tr>
<td>

```verilog
module ModuleA (
    input  a,
    input  b,
    output o
);
endmodule
```

</td>
<td>

```veryl
module ModuleA (
    a: input  logic,
    b: input  logic,
    o: output logic,
) {
}
```

</td>
</tr>
</table>

## Abstraction of clock and reset {#abstraction-of-clock-and-reset}

There is no need to specify the polarity and synchronicity of the clock and reset in the syntax;
these can be specified during build-time configuration.
This allows generating code for both ASICs with negative asynchronous reset
and FPGAs with positive synchronous reset from the same Veryl code.

Additionally, explicit `clock` and `reset` type enables to check whether clock and reset are correctly connected to registers.
If there is a single clock and reset in the module, the connection can be omitted.

<table>
<tr>
<th>SystemVerilog</th>
<th>Veryl</th>
</tr>
<tr>
<td>

```verilog
module ModuleA (
    input logic i_clk,
    input logic i_rst_n
);

always_ff @ (posedge i_clk or negedge i_rst_n) begin
    if (!i_rst_n) begin
    end else begin
    end
end

endmodule
```

</td>
<td>

```veryl
module ModuleA (
    i_clk: input clock,
    i_rst: input reset,
){
    always_ff {
        if_reset {
        } else {
        }
    }
}
```

</td>
</tr>
</table>

## Documentation comment {#documentation-comment}

Writing module descriptions as documentation comments allows for automatic documentation generation.
You can use not only plain text but also the following formats:

* [Markdown](https://www.markdownguide.org)
* Waveform using [WaveDrom](https://wavedrom.com)
* Diagram using [Mermaid](https://mermaid.js.org)

<table>
<tr>
<th>SystemVerilog</th>
<th>Veryl</th>
</tr>
<tr>
<td>

```verilog
// Comment
module ModuleA;
endmodule
```

</td>
<td>

```veryl
/// Documentation comment written by Markdown
///
/// * list
/// * list
///
/// ```wavedrom
/// { signal: [{ name: "Alfa", wave: "01.zx=ud.23.456789" }] }
/// ```
module ModuleA {
}
```

</td>
</tr>
</table>

## Compound assignment operator in `always_ff` {#compound-assignment-operator-in-always_ff}

There is no dedicated non-blocking assignment operator;
within `always_ff`, non-blocking assignments are inferred, while within `always_comb`, blocking assignments are inferred.
Therefore, various compound assignment operators can be used within `always_ff` just like within `always_comb`.

<table>
<tr>
<th>SystemVerilog</th>
<th>Veryl</th>
</tr>
<tr>
<td>

```verilog
always_ff @ (posedge i_clk) begin
    if (a) begin
        x <= x + 1;
    end
end
```

</td>
<td>

```veryl
# module ModuleA {
always_ff {
    if a {
        x += 1;
    }
}
# }
```

</td>
</tr>
</table>

## Individual namespace of enum variant {#individual-namespace-of-enum-variant}

Variants of an enum are defined within separate namespaces for each enum,
thus preventing unintended name collisions.

<table>
<tr>
<th>SystemVerilog</th>
<th>Veryl</th>
</tr>
<tr>
<td>

```verilog
typedef enum logic[1:0] {
    MemberA,
    MemberB
} EnumA;

EnumA a;
assign a = MemberA;
```

</td>
<td>

```veryl
# module ModuleA {
enum EnumA: logic<2> {
    MemberA,
    MemberB
}

var a: EnumA;
assign a = EnumA::MemberA;
# }
```

</td>
</tr>
</table>

## `repeat` of concatenation {#repeat-of-concatenation}

By adopting the explicit `repeat` syntax as a repetition description in bit concatenation,
readability improves over complex combinations of `{}`.

<table>
<tr>
<th>SystemVerilog</th>
<th>Veryl</th>
</tr>
<tr>
<td>

```verilog
logic [31:0] a;
assign a = {{2{X[9:0]}}, {12{Y}}};
```

</td>
<td>

```veryl
# module ModuleA {
var a: logic<32>;
assign a = {X[9:0] repeat 2, Y repeat 12};
# }
```

</td>
</tr>
</table>

## `if` / `case` expression {#if--case-expression}

By adopting `if` and `case` expressions instead of the ternary operator,
readability improves, especially when comparing a large number of items.

<table>
<tr>
<th>SystemVerilog</th>
<th>Veryl</th>
</tr>
<tr>
<td>

```verilog
logic a;
assign a = X == 0 ? Y0 :
           X == 1 ? Y1 :
           X == 2 ? Y2 :
                    Y3;
```

</td>
<td>

```veryl
# module ModuleA {
var a: logic;
assign a = case X {
    0      : Y0,
    1      : Y1,
    2      : Y2,
    default: Y3,
};
# }
```

</td>
</tr>
</table>

## Range-based `for` / `inside` / `outside` {#range-based-for--inside--outside}

With notation representing closed intervals `..=` and half-open intervals `..`,
it is possible to uniformly describe ranges using `for`, `inside`, and `outside` (which denotes the inverse of `inside`).

<table>
<tr>
<th>SystemVerilog</th>
<th>Veryl</th>
</tr>
<tr>
<td>

```verilog
for (int i = 0; i < 10; i++) begin
    a[i] =   X[i] inside {[1:10]};
    b[i] = !(X[i] inside {[1:10]});
end
```

</td>
<td>

```veryl
# module ModuleA {
# always_comb {
for i: u32 in 0..10 {
    a[i] = inside  X[i] {1..=10};
    b[i] = outside X[i] {1..=10};
}
# }
# }
```

</td>
</tr>
</table>

## `msb` notation {#msb-notation}

The `msb` notation, indicating the most significant bit, eliminates the need to calculate the most significant bit from parameters, making intentions clearer.

<table>
<tr>
<th>SystemVerilog</th>
<th>Veryl</th>
</tr>
<tr>
<td>

```verilog
logic a;
logic [WIDTH-1:0] X;
assign a = X[WIDTH-1];
```

</td>
<td>

```veryl
# module ModuleA {
var a: logic;
var X: logic<WIDTH>;
assign a = X[msb];
# }
```

</td>
</tr>
</table>

## `let` statement {#let-statement}

There is a dedicated `let` statement available for binding values simultaneously with variable declaration,
which can be used in various contexts that were not supported in SystemVerilog.

<table>
<tr>
<th>SystemVerilog</th>
<th>Veryl</th>
</tr>
<tr>
<td>

```verilog
logic tmp;
always_ff @ (posedge i_clk) begin
    tmp = b + 1;
    x <= tmp;
end
```

</td>
<td>

```veryl
# module ModuleA {
always_ff {
    let tmp: logic = b + 1;
    x = tmp;
}
# }
```

</td>
</tr>
</table>

## Named block {#named-block}

You can define named blocks to limit the scope of variables.

<table>
<tr>
<th>SystemVerilog</th>
<th>Veryl</th>
</tr>
<tr>
<td>

```verilog
if (1) begin: BlockA
end
```

</td>
<td>

```veryl
# module ModuleA {
:BlockA {
}
# }
```

</td>
</tr>
</table>

## Visibility control {#visibility-control}

Modules without the `pub` keyword cannot be referenced from outside the project
and are not included in automatic documentation generation.
This allows distinguishing between what should be exposed externally from the project and internal implementations.

<table>
<tr>
<th>SystemVerilog</th>
<th>Veryl</th>
</tr>
<tr>
<td>

```verilog
module ModuleA;
endmodule

module ModuleB;
endmodule
```

</td>
<td>

```veryl
pub module ModuleA {
}

module ModuleB {
}
```

</td>
</tr>
</table>
