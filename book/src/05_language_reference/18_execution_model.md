# Execution Model

Veryl's execution model is based on the scheduling semantics of SystemVerilog (IEEE 1800).
Through language-level constraints, Veryl enforces best practices that guarantee deterministic simulation, without requiring designers to understand the complex scheduling regions defined in the standard.

Veryl's built-in simulator conforms to this model.
The transpiled SystemVerilog output also preserves these semantics, so any IEEE 1800 compliant simulator will produce equivalent results.
