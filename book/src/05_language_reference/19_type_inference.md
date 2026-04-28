# Type Inference

Type annotations and generic arguments can be omitted in some contexts when they can
be derived from the surrounding code. This chapter summarizes the supported patterns.

Port declarations of modules / interfaces / functions and function return types still
require explicit types so that interfaces remain readable even if the type could be
inferred.

## Variable Type Inference

The type annotation of [`var`](06_declaration/01_variable.md) and
[`let`](05_statement/07_let.md) declarations, and of [`const`](06_declaration/02_parameter.md)
declarations, can be omitted when the type can be inferred.

For `var` declarations without a type, the type is inferred from the first subsequent
assignment through `assign`, `always_comb` or `always_ff`.
For `let` and `const` declarations, the type is inferred from the right hand side
expression.

```veryl,playground
module ModuleA {
    let _a: logic<8> = 0;

    // Inferred from the type of `_a`.
    let _b = _a;

    // Inferred from the sized literal.
    let _c = 8'd255;

    // Inferred from the first assignment.
    var _d;
    assign _d = _a;

    // Inferred from the first assignment in always_comb.
    var _e;
    always_comb {
        _e = _a;
    }

    // `const` also supports inference.
    const _F = 16'd100;
}
```

The following expressions can be the source of type inference:

* Variable references
* Sized number literals (e.g. `8'd10`)
* Parenthesized expressions (recurses into the inner expression)
* Function calls (inferred from the return type)

The following expressions are not supported because their types depend on the
bit-width evaluation rules of SystemVerilog and may surprise users:

* Unsized number literals (e.g. `10`, `'0`)
* Operator expressions (e.g. `_a + 1`)
* Concatenation (e.g. `{_a, _a}`)
* `if` / `case` expressions

If multiple assignments to the same `var` disagree on the inferred type, it is reported as
[type_inference_conflict](../07_appendix/02_semantic_error.md#type_inference_conflict).
For unsupported expressions,
[type_inference_not_supported](../07_appendix/02_semantic_error.md#type_inference_not_supported)
is reported. In both cases, an explicit type annotation resolves the error.

## Generic Argument Inference

For generic functions, the actual generic arguments after `::<>` can be omitted when they
can be inferred from the function arguments.
The inference uses the declared type of each call argument to solve the generic parameters.

```veryl,playground
module ModuleA {
    function FuncId::<T: u32> (
        x: input logic<T>,
    ) -> logic<T> {
        return x;
    }

    function FuncWide::<T: u32> (
        x: input logic<T>,
    ) -> logic<T + 1> {
        return {1'b0, x};
    }

    let _a: logic<8>  = 0;
    let _b: logic<16> = 0;

    // T is inferred to be 8 / 16 from the argument's declared width.
    let _r1: logic<8>  = FuncId(_a);
    let _r2: logic<16> = FuncId(_b);

    // `T + 1` pattern: argument width 8 resolves T = 8.
    let _rw: logic<9> = FuncWide(_a);
}
```

Inference fails when the argument's width cannot be determined from a variable declaration
(for example a sized literal is passed). In that case, explicit generic arguments are required.
See [generic_inference_failed](../07_appendix/02_semantic_error.md#generic_inference_failed) for details.
