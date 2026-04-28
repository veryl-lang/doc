# Semantic Error

This appendix lists the diagnostics produced by the Veryl semantic analyzer.
The diagnostics are split into hard errors that prevent compilation and
warnings that allow compilation to continue.

## Errors

### ambiguous_elsif

This error is reported when an `elsif` or `else` attribute cannot be unambiguously
associated with a preceding `if` attribute.
Restructure the surrounding code so that the relationship is clear.

### anonymous_identifier_usage

This error is reported when an anonymous identifier (`_`) is used in a position that
requires a named identifier.

### call_non_function

This error is reported when a non-function symbol is called as if it were a function.
Remove the call, or replace the symbol with an actual function.

### cyclic_type_dependency

This error is reported when two or more type definitions reference each other in a
cycle. Break the cycle by removing or restructuring one of the references.

### duplicated_identifier

This error is reported when the same identifier is declared more than once in the same
scope. Rename one of the declarations.

### exceed_limit

This error is reported when an internal limit such as instance depth, total instance
count, or elaboration evaluation size is exceeded. Raise the corresponding limit in the
`[build]` section of `Veryl.toml`, or simplify the design.

### fixed_type_with_signed_modifier

This error is reported when the `signed` modifier is applied to a fixed-width type
(e.g. `u32`). Remove the `signed` modifier.

### generic_inference_failed

This error is reported when the actual generic arguments of a function call are omitted
but the compiler cannot infer them from the call arguments.
Provide explicit generic arguments through `::<>`, or pass an argument whose width can be
determined from a variable declaration.

### include_failure

This error is reported when a file referenced by an `include` declaration cannot be read.
Check the path and file permissions.

### incompat_proto

This error is reported when a module / interface / package marked `for {proto}` does
not satisfy the prototype's contract. Adjust the implementation so that it matches the
prototype.

### infinite_recursion

This error is reported when a module instantiates itself, directly or transitively,
with no condition that stops the recursion.
Add a terminating condition (for example via a generic parameter and `if` generation),
or restructure the design so the module does not refer back to itself.

### invalid_assignment

This error is reported when an unassignable symbol kind (constants, parameters, generic
parameters, etc.) is the target of an assignment. Remove the assignment.

### invalid_cast

This error is reported when the source and target types of a type cast are not
compatible. Choose a compatible target type.

### invalid_clock

This error is reported when a signal that is neither typed as `clock` nor a single-bit
signal is connected as a clock. Use a `clock`-typed signal.

### invalid_clock_domain

This error is reported when a clock domain annotation is attached to a module instance,
where it is not allowed. Remove the annotation.

### invalid_connect_operand

This error is reported when an operand of the `<>` connect operator is not a valid
interface operand.

### invalid_direction

This error is reported when a port direction (`input`, `output`, `inout`, etc.) is used
in a context where the direction is not allowed.
Remove the direction modifier.

### invalid_embed

This error is reported when an `embed` declaration uses a way / language combination
that is not allowed at the current position.

### invalid_embed_identifier

This error is reported when an embed identifier reference appears in an embed block
other than `(way: inline / lang: sv)`.

### invalid_enum_variant

This error is reported when an enum variant's value does not match the encoding declared
for the enum (e.g. one-hot, gray).

### invalid_factor

This error is reported when a non-value symbol (e.g. a module name) is used as a factor
in an expression.

### invalid_import

This error is reported when the referenced item cannot be imported (e.g. it is private
or not a valid import target).

### invalid_lsb

This error is reported when the `lsb` keyword appears in a context where the corresponding
bit width cannot be determined.
Replace `lsb` with a concrete index.

### invalid_modifier

This error is reported when a type modifier is used in a context that does not allow it.
Remove the modifier.

### invalid_modport_item

This error is reported when a modport item refers to an identifier that is not of the
expected kind.

### invalid_msb

This error is reported when the `msb` keyword appears in a context where the corresponding
bit width cannot be determined.
Replace `msb` with a concrete index.

### invalid_number_character

This error is reported when a numeric literal contains a character that is not valid for
its base, such as a hexadecimal digit in a binary literal.

### invalid_operand

This error is reported when an operand kind incompatible with the operator is used.

### invalid_port_default_value

This error is reported when a port default value is invalid for the port's type or
direction.

### invalid_reset

This error is reported when a signal that is neither typed as `reset` nor a single-bit
signal is connected as a reset. Use a `reset`-typed signal.

### invalid_statement

This error is reported when a statement appears in a context where it is not allowed
(for example, a `return` outside a function).
Remove or relocate the statement.

### invalid_tb_usage

This error is reported when a `$tb::*` testbench component is used outside a `#[test]`
module. Move the usage inside a test module.

### invalid_test

This error is reported when a `#[test]` declaration is malformed.

### invalid_type_declaration

This error is reported when `struct`, `enum` or `union` data types are defined within
interface declarations.

### invalid_wavedrom

This error is reported when a WaveDrom block in a documentation comment is invalid.

### invisible_identifier

This error is reported when an identifier is referenced from a position where it is not
in scope (e.g. across visibility boundaries).

### last_item_with_define

This error is reported when an `ifdef` / `ifndef` / `elsif` / `else` attribute is
attached to the last item in a comma-separated list, which makes the boundary ambiguous.

### member_access_on_array

This error is reported when a member is accessed on an array directly.
Index the array first.

### mismatch_attribute_args

This error is reported when an attribute is supplied with arguments that do not match
the expected form. Adjust the arguments to the attribute's expected signature.

### mismatch_clock_domain

This error is reported when a signal is used across clock domain boundaries without an
explicit `unsafe (cdc)` block.

### mismatch_function_arity

This error is reported when the number of arguments at a function call site does not
match the function's declaration.

### mismatch_generics_arity

This error is reported when the number of generic arguments at a call site does not
match the declaration.

### mismatch_type

This error is reported when a value is used in a position that requires a different
type. Examples include incompatible assignments and function arguments whose type does
not match the parameter.

### missing_clock_domain

This error is reported when a module has multiple clocks but lacks clock domain
annotations on its ports. Add the annotations.

### missing_clock_signal

This error is reported when an `always_ff` block is used without a clock signal in the
enclosing module. Add a `clock` port.

### missing_default_argument

This error is reported when a generic parameter following a parameter with a default
itself lacks a default. Default parameters must be at the end of the list.

### missing_if_reset

This error is reported when an `always_ff` block has a reset signal but no `if_reset`
statement.
Add an `if_reset` block to describe the reset behavior.

### missing_reset_signal

This error is reported when an `always_ff` block uses `if_reset` but no reset signal is
available in the enclosing module.
Add a `reset` port or connect a reset signal.

### missing_tb_port

This error is reported when a `$tb::*` testbench component is instantiated without
connecting one of its required ports (e.g. the `clk` port of `$tb::reset_gen`).
Add the required port connection at instantiation.

### missing_tri

This error is reported when an `inout` port is declared without the `tri` type modifier.
Add the `tri` modifier.

### mixed_function_argument

This error is reported when both positional arguments and named arguments are used in
the same function call. Use one style consistently.

### multiple_assignment

This error is reported when a single signal is assigned from more than one procedural
block or `assign` statement. Drive each signal from a single source.

### multiple_default

This error is reported when a default clock or reset is specified more than once in the
same module.

### non_positive_value

This error is reported when a non-positive value is assigned to a positive type
(`p8` / `p16` / `p32` / `p64`). Use a value greater than zero.

### private_member

This error is reported when a member declared as private is accessed from outside its
declaring scope.

### private_namespace

This error is reported when a namespace declared as private is referenced from outside
its declaring scope.

### referring_before_definition

This error is reported when an identifier is used before its declaration in a context
that requires forward declaration. Move the definition before the reference.

### reserved_identifier

This error is reported when an identifier with the reserved `__` prefix is used. Choose
a different name.

### sv_keyword_usage

This error is reported when a SystemVerilog keyword is used as a Veryl identifier.
Rename so it does not conflict in the generated SystemVerilog.

### sv_with_implicit_reset

This error is reported when a `reset`-typed port with implicit synchronicity and
polarity is connected to a SystemVerilog module port. Use an explicit type such as
`reset_async_low` or `reset_sync_high`.

### too_large_enum_variant

This error is reported when the explicit value of an enum variant cannot be represented
within the enum's bit width.
Reduce the value or widen the enum.

### too_large_number

This error is reported when a numeric literal exceeds the maximum value representable in
its specified bit width.
Increase the bit width or reduce the value.

### too_much_enum_variant

This error is reported when the number of variants in an enum exceeds what its bit width
can encode.
Widen the enum, or reduce the number of variants.

### type_inference_conflict

This error is reported when multiple assignments to an untyped `var` infer different types.
All assignments to an untyped variable must agree on the same type, or the variable must
be declared with an explicit type.

### type_inference_not_supported

This error is reported when the right hand side expression of an untyped `let` or `const`
declaration is not supported for type inference. Operator expressions, unsized literals,
concatenation and `if`/`case` expressions are not inferable.
Add an explicit type annotation to resolve this error.

### unassignable_output

This error is reported when a read-only or otherwise unassignable expression is
connected to an output port.

### undefined_identifier

This error is reported when an identifier is referenced before it has been declared.
Declare the identifier, or correct the spelling.

### unevaluatable_value

This error is reported when a value that cannot be resolved at elaboration time is used
where a constant is required (e.g. an array size).

### unexpandable_modport

This error is reported when a modport reference cannot be expanded into individual
ports.

### unknown_attribute

This error is reported when an attribute name is not recognized by the compiler.
Remove the attribute or correct the name.

### unknown_embed_lang

This error is reported when an `embed` declaration uses an unsupported language
identifier.

### unknown_embed_way

This error is reported when an `embed` declaration uses an unsupported way identifier.

### unknown_include_way

This error is reported when an `include` declaration uses an unsupported way identifier.

### unknown_member

This error is reported when a member is accessed on a struct, union or interface that
does not declare that member. Correct the member name.

### unknown_msb

This error is reported when the compiler cannot resolve the bit width referenced by `msb`.
Specify a concrete index instead.

### unknown_param

This error is reported when an instantiation overrides a parameter that the module does
not declare. Remove the override or correct the parameter name.

### unknown_port

This error is reported when a module is instantiated with a port name that the module
does not declare.
Remove the connection, or correct the port name.

### unknown_tb_port

This error is reported when a `$tb::*` testbench component is instantiated with a
port name that does not exist on that component.
Remove the unknown connection or correct the port name.

### unknown_unsafe

This error is reported when an `unsafe(...)` block uses an identifier that is not a
valid unsafe category.

### unresolvable_generic_expression

This error is reported when an expression in a generic parameter cannot be resolved
from the position of the generic's definition.

### wrong_seperator

This error is reported when an incorrect separator (`::` vs `.`) is used between
identifiers. Replace it with the correct separator.

## Warnings

### invalid_identifier

This warning is reported when an identifier violates the configured naming rule
(see [Lint](../06_development_environment/01_project_configuration/03_lint.md)).
Rename the identifier so that it follows the rule.

### invalid_logical_operand

This warning is reported when a multi-bit value is used as the operand of a logical
operator. Reduce the operand to a single bit (for example with `==`).

### invalid_select

This warning is reported when a bit / range select is invalid (e.g. out of bounds).

### mismatch_assignment

This warning is reported when the source and destination types of an assignment do not
match.

### mismatch_function_arg

This warning is reported when an argument's type does not match the function's parameter
type.

### missing_port

This warning is reported when a module is instantiated without connecting one of its
declared ports. Add the missing port connection.

### missing_reset_statement

This warning is reported when a register declared in an `always_ff` block with `if_reset`
has no assignment in the `if_reset` branch. Add an assignment for the register so it has
a defined reset value.

### mixed_struct_union_member

This warning is reported when a struct or union mixes 2-state and 4-state members.
Unify the members to a single state.

### unassign_variable

This warning is reported when a declared variable is never assigned a value.

### uncovered_branch

This warning is reported when a signal is conditionally assigned in some branches but
not all, which infers a latch.
Add a default assignment, or cover all branches.

### unenclosed_inner_if_expression

This warning is reported when a nested `if` expression is not enclosed in parentheses.
Add parentheses to make precedence explicit.

### unsigned_arith_shift

This warning is reported when an arithmetic shift is applied to an unsigned operand.
The result is identical to a logical shift; use a logical shift to clarify intent.

### unused_return

This warning is reported when a function call's return value is discarded.
Assign the result to a variable, or use a function whose return value is intentionally
ignored.

### unused_variable

This warning is reported when a declared variable is never read.
Add the `_` prefix to its name to mark it as intentionally unused, or remove the declaration.
