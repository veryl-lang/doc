# Compatibility

Some tools supporting SystemVerilog don't support some features.
Code generation can be customized by configuration of `Veryl.toml` to support these tools.

## Vivado

### String parameter

Vivado don't support `parameter` which is typed as `string`.

```verilog
parameter string a = "A";
```

So you can use `implicit_parameter_types` like below:

```toml
[build]
implicit_parameter_types = ["string"]
```

By the configuration, the generated code becomes like below:

```verilog
parameter a = "A";
```

## Quartus

### `inside` operator

Quartus don't support `inside` operator.
So you can use `expand_inside_operation` like below:

```toml
[build]
expand_inside_operation = true
```

By the configuration, operations using `inside` operator will be expanded to logic using `==?` operator.
