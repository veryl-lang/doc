# Format

`[format]` section specifies the configuration for formatter like below:

```toml
[format]
indent_width = 4
```

## Available configurations

| Configuration  | Value                              | Default | Description                                       |
|----------------|------------------------------------|---------|---------------------------------------------------|
| indent_width   | integer                            | 4       | indent width by space                             |
| max_width      | integer                            | 120     | preferred maximum line width before line breaking |
| vertical_align | boolean                            | true    | enable vertial align                              |
| newline_style  | `auto` / `native` / `unix` / `windows` | `auto`  | line ending style                                 |

The formatter tries to keep each line within `max_width` columns by inserting line
breaks at acceptable positions. Lines that cannot be broken (for example, very long
identifiers or comments) may still exceed this width.

`newline_style` controls the line ending used by the formatter, the build emitter and the
migrator output. The available values are:

* `auto` — detect from the input file. If no newline exists, the platform native style is used.
* `native` — use the platform native style (`\r\n` on Windows, `\n` elsewhere).
* `unix` — always use `\n`.
* `windows` — always use `\r\n`.
