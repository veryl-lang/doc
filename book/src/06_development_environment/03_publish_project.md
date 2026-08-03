# Publish Project

To publish your project, `veryl publish` can be used.
Publishing means to associate a version with a git revision.

```
$ veryl publish
[INFO ]   Publishing release (0.2.1 @ 297bc6b24c5ceca9e648c3ea5e01011c67d7efe7)
[INFO ]      Writing metadata ([path to project]/Veryl.pub)
```

`veryl publish` generates `Veryl.pub` which contains published version information like below.

```toml
[[releases]]
version = "0.2.1"
revision = "297bc6b24c5ceca9e648c3ea5e01011c67d7efe7"
```

After generating `Veryl.pub`, publishing sequence is completed by git add, commit and push.
The git branch to be committed must be the default branch because Veryl search `Veryl.pub` in the default branch.

```
$ git add Veryl.pub
$ git commit -m "Publish"
$ git push
```

If you enable automatic commit by `publish_commit` in `[publish]` section of `Veryl.toml`, git add and commit will be executed after publish.

```
$ veryl publish
[INFO ]   Publishing release (0.2.1 @ 297bc6b24c5ceca9e648c3ea5e01011c67d7efe7)
[INFO ]      Writing metadata ([path to project]/Veryl.pub)
[INFO ]   Committing metadata ([path to project]/Veryl.pub)
```

### Version Bump

You can bump version with publish at the same time by `--bump` option.
As the same as publish, `bump_commit` in `[publish]` section of `Veryl.toml` can specify automatic commit after bump version.

```
$ veryl publish --bump patch
[INFO ]      Bumping version (0.2.1 -> 0.2.2)
[INFO ]     Updating version field ([path to project]/Veryl.toml)
[INFO ]   Committing metadata ([path to project]/Veryl.toml)
[INFO ]   Publishing release (0.2.2 @ 159dee3b3f93d3a999d8bac4c6d26d51476b178a)
[INFO ]      Writing metadata ([path to project]/Veryl.pub)
[INFO ]   Committing metadata ([path to project]/Veryl.pub)
```

### Registering to the registry

[The Veryl registry](https://registry.veryl-lang.org) lists published projects.
A project can be registered by `veryl register`.

```
$ veryl register
```

The registry identifies a project by its repository, so the [`repository`](./01_project_configuration.md#the-repository-field) field of the `[project]` section is required.
The declared `repository` is used instead of the git `origin` remote, because `origin` varies with the checkout.

`veryl register` asks for confirmation before registering.
The `--yes` option skips the confirmation, and it is required when the command is not executed interactively.

`veryl publish` can register the project too.
The behavior is specified by `register` in `[publish]` section of `Veryl.toml`:

* `true` --- register automatically after publish
* `false` --- never register
* unset --- ask once interactively

Registration doesn't push the commit.
A published version becomes visible after its revision is pushed and the registry crawls the repository.

If a [category](./01_project_configuration.md#the-categories-field) which the registry doesn't recognize is specified, it is reported as a warning.

The registry to be used can be changed by the `VERYL_REGISTRY_URL` environment variable.

### Configuration

The available configurations are [here](./01_project_configuration/05_publish.md).
