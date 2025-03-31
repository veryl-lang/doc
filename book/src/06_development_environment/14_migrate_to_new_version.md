# Migrate to New Version

Sometimes, new version of Veryl introduces some breaking changes.
`veryl migrate` migrates the existing project to new version automatically.
By `--check` option, you can check how changes will be applied before the actual migration.

```console
$ veryl migrate --check
$ veryl migrate
```

`veryl migrate` migrates only single major (or minor until 1.0) version.
Therefore, multi version migration can be done like below:

```console
$ veryl +0.15.0 migrate  # from v0.14.0 to v0.15.0
$ veryl +0.16.0 migrate  # from v0.15.0 to v0.16.0
```
