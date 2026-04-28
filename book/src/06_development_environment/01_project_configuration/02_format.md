# Format

`[format]` section specifies the configuration for formatter like below:

```toml
[format]
indent_width = 4
```

## Available configurations

| Configuration  | Value                              | Default | Description           |
|----------------|------------------------------------|---------|-----------------------|
| indent_width   | integer                            | 4       | indent width by space |
| vertical_align | boolean                            | true    | enable vertial align  |
| newline_style  | `auto` / `native` / `unix` / `windows` | `auto`  | line ending style     |

`newline_style` controls the line ending used by the formatter, the build emitter and the
migrator output. The available values are:

* `auto` — detect from the input file. If no newline exists, the platform native style is used.
* `native` — use the platform native style (`\r\n` on Windows, `\n` elsewhere).
* `unix` — always use `\n`.
* `windows` — always use `\r\n`.
