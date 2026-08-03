# External Subcommand

External subcommands allow the `veryl` command to be extended by tools which are
distributed separately from Veryl.
If the given subcommand is not a built-in one, `veryl` searches `PATH` for an executable
named `veryl-<subcommand>`, and executes it.
As a result, such a tool can be used as if it was a built-in subcommand.

```console
$ veryl import foo.sv
```

The command above executes `veryl-import foo.sv` if `veryl-import` is found on `PATH`.
All arguments following the subcommand name are forwarded as-is, and the exit status of
the external command becomes the exit status of `veryl`.

If a matching executable is not found, an error is reported.

## Listing commands

`veryl --help` shows built-in subcommands only.
To show all available commands including external subcommands found on `PATH`,
`veryl --list` can be used.

```console
$ veryl --list
Available Commands:
  build        Build the target codes corresponding to the current project
  check        Analyze the current project
  ...
  import       Import SystemVerilog files as a Veryl dependency
  ...
```

## Subcommand description

By default, an external subcommand is listed with a fallback description like
`External Veryl subcommand from PATH (veryl-import)`.
If the executable supports the `--info` option, its output is used as the description
instead.
`veryl-<subcommand> --info` is expected to print a one-line description to stdout, and
all of the following conditions must be satisfied:

* The exit status is `0`
* The output is a single line without control characters
* The length of the line is 160 characters or less
* The command finishes within 500ms

If any of them is not satisfied, the fallback description is used.

## Reserved names

`ls` is not dispatched as an external subcommand because `veryl-ls` is
[the official language server binary](./08_language_server.md).
A subcommand name containing a path separator is rejected too.
