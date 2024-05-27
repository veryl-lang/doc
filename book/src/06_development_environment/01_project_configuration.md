# Project Configuration

* [`[project]`](01_project_configuration.md#the-project-section) --- Defines a project.
  * [`name`](01_project_configuration.md#the-name-field) --- The name of the project.
  * [`version`](01_project_configuration.md#the-version-field) --- The version of the project.
  * [`authors`](01_project_configuration.md#the-authors-field) --- The authors of the project.
  * [`description`](01_project_configuration.md#the-description-field) --- A description of the project.
  * [`license`](01_project_configuration.md#the-license-field) --- The project license.
  * [`repository`](01_project_configuration.md#the-repository-field) --- URL of the project source repository.
* [`[build]`](01_project_configuration.md#the-build-section) --- Build settings.
* [`[format]`](01_project_configuration.md#the-format-section) --- Format settings.
* [`[lint]`](01_project_configuration.md#the-lint-section) --- Lint settings.
* [`[test]`](01_project_configuration.md#the-test-section) --- Test settings.
* [`[publish]`](01_project_configuration.md#the-publish-section) --- Publish settings.
* [`[dependencies]`](01_project_configuration.md#the-dependencies-section) --- Library dependencies.

## The `[project]` section {#the-project-section}

The first section of `Veryl.toml` is `[project]`.
The mandatory fields are `name` and `version`.

### The `name` field {#the-name-field}

The project name is used as prefix in the generated codes.
So the name must start with alphabet or `_`, and use only alphanumeric charaters or `_`.

### The `version` field {#the-version-field}

The project version should follow [Semantic Versioning](https://semver.org/).
The version is constructed by the following three numbers.

* Major -- increment at incompatible changes
* Minor -- increment at adding features with backward compatibility
* Patch -- increment at bug fixes with backward compatibility

```toml
[project]
version = "0.1.0"
```

### The `authors` field {#the-authors-field}

The optional `authors` field lists in an array the people or organizations that are considered the "authors" of the project.
The format of each string in the list is free. Name only, e-mail address only, and name with e-mail address included within angled brackets are commonly used.

```toml
[project]
authors = ["Fnu Lnu", "anonymous@example.com", "Fnu Lnu <anonymous@example.com>"]
```

### The `description` field {#the-description-field}

The `description` is a short blurb about the project. This should be plane text (not Markdown).

### The `license` field {#the-license-field}

The `license` field contains the name of license that the project is released under.
The string should be follow [SPDX 2.3 license expression](https://spdx.github.io/spdx-spec/v2.3/SPDX-license-expressions).

```toml
[project]
license = "MIT OR Apache-2.0"
```

### The `repository` field {#the-repository-field}

The `repository` field should be a URL to the source repository for the project.

```toml
[project]
repository = "https://github.com/veryl-lang/veryl"
```

## The `[build]` section {#the-build-section}

The `[build]` section contains the configurations of code generation.
Available configurations is [here](./01_project_configuration/01_build.md).

## The `[format]` section {#the-format-section}

The `[format]` section contains the configurations of code formatter.
Available configurations is [here](./01_project_configuration/02_format.md).

## The `[lint]` section {#the-lint-section}

The `[lint]` section contains the configurations of linter.
Available configurations is [here](./01_project_configuration/03_lint.md).

## The `[test]` section {#the-test-section}

The `[test]` section contains the configurations of test by RTL simulator.
Available configurations is [here](./01_project_configuration/04_test.md).

## The `[publish]` section {#the-publish-section}

The `[publish]` section contains the configurations of publishing.
Available configurations is [here](./01_project_configuration/05_publish.md).

## The `[dependencies]` section {#the-dependencies-section}

The `[dependencies]` section contains library dependencies.
Available configurations is [here](./02_dependencies.md).
