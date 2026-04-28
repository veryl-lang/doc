# Translator

`veryl translate` converts SystemVerilog source files into Veryl source.
It is intended as a best-effort migration aid for existing SystemVerilog code bases;
the result is not guaranteed to be a drop-in replacement and may need manual review.

```console
$ veryl translate foo.sv
```

Each input `.sv` file produces a `.veryl` file with the same basename next to it.
After translation, the output is run through the Veryl formatter so the result follows
the standard formatting style.

## Options

| Option | Description |
|---|---|
| `--stdout` | Write the result to stdout instead of writing files. Useful for piping or redirecting to a non-default path. |
| `--strict` | Exit with a non-zero status if any unsupported constructs are encountered. |
| `--no-format` | Skip the Veryl formatter pass and emit the raw translator output. |

## Unsupported constructs

Some SystemVerilog constructs cannot be expressed in Veryl, or are not yet supported by the
translator. When such a construct is encountered, a warning is emitted with the construct
kind and source line, and the construct is left as a comment or placeholder in the output.
A summary line reports the total number of unsupported constructs per file.

In `--strict` mode, any unsupported construct causes `veryl translate` to exit with a
non-zero status.
