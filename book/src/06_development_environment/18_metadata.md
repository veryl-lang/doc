# Metadata

`veryl metadata` prints the resolved metadata of the current project, including
its dependency graph. It lets external tools reuse Veryl's dependency resolution
result and dependency cache instead of reimplementing them.

```console
$ veryl metadata
```

## Options

| Option | Description |
|---|---|
| `--format <format>` | Output format: `pretty` (default, human-readable) or `json`. |
| `--format-version <n>` | JSON output schema version. Only valid with `--format json`. |

## Output format versions

`--format-version` selects the schema of the JSON output:

* `1` (or unversioned) — the internal `Metadata` representation. This shape is not stable and may change between Veryl releases.
* `2` — a stable, versioned schema intended for external tools.

Use version 2 for any tool that consumes the output programmatically.

```console
$ veryl metadata --format json --format-version 2
```

The version 2 output has the following shape:

```text
{
  "format_version": 2,
  "root": {
    "name": "my_project",
    "version": "0.1.0",
    "local_path": "/abs/path/to/my_project",
    "metadata": {}
  },
  "dependencies": [
    {
      "id": "dep:foo",
      "name": "foo",
      "project": "foo",
      "source": {
        "kind": "repository",
        "url": "https://github.com/example/foo",
        "project": "foo",
        "version": "1.2.0",
        "revision": "0123456789abcdef",
        "path": "."
      },
      "local_path": "/abs/path/to/dependency/cache/foo",
      "metadata": {},
      "dependencies": ["dep:bar"]
    }
  ]
}
```

* `root` describes the current project, and `dependencies` lists every resolved dependency in the graph.
* `local_path` is the on-disk location (the project directory, or the dependency cache directory), so a tool can read the actual source files.
* `source` identifies where a dependency came from. Its `kind` is either `path` (with a `path`) or `repository` (with `url`, `project`, `version`, `revision` and `path`).
* The `dependencies` field of each entry lists the `id`s of that dependency's own dependencies, so the whole graph can be reconstructed.

## The `[metadata]` table

`Veryl.toml` may contain a `[metadata]` table for arbitrary external-tool data.
Veryl does not interpret its contents; it only preserves them and re-exposes them in the `metadata` field of the `veryl metadata` output, both for the root project and for dependencies.

```toml
[metadata.external_tool]
files = ["src/**/*.v"]
attrs = { role = "core" }
```

This is the designated place for external integration data.
Unknown keys at the top level of `Veryl.toml` are rejected, so tool-specific data must live under `[metadata]`.
