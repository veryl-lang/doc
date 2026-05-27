# Installation

Veryl can be intalled through the official toolchain installer `verylup`.
We recommend to use `verylup` because it provides some usefule features like toolchain update.

> Note: If you want install on an enviromnent without internet access, you can use [offline installation](../06_development_environment/13_verylup.md#offline-installation).

## Requirement

### git

Veryl uses a built-in [`gitoxide`](https://github.com/GitoxideLabs/gitoxide) backend by default for fetching git-based dependencies, so an external `git` command is not required.
If `gitoxide` fails (for example, when an authentication method it does not support is required), Veryl automatically falls back to the system `git` command, so installing `git` is recommended.
See [Git backend](../06_development_environment/02_dependencies.md#git-backend) for details on selecting the backend.

### cc

The default native-simulator backend used by `veryl test` (`--backend=cc`) emits C and compiles it with the `cc` command on `PATH`.
If `cc` is not available, the simulator transparently falls back to the Cranelift JIT, so installing `cc` is recommended for best performance but not required.
See [Simulator](../06_development_environment/07_simulator.md) for details on selecting the backend.

## Install verylup

### Download binary

Download from [release page](https://github.com/veryl-lang/verylup/releases/latest), and extract to the directory in `PATH`.

### Cargo

You can install with [cargo](https://crates.io/crates/verylup).

```
cargo install verylup
```

## Setup verylup

After installing verylup, the following command is required once at first.
It downloads the latest toolchain and creates `veryl` and `veryl-ls` command at the same location as verylup.

```
verylup setup
```

Now `veryl` command can be used!

## Editor integration

[Visual Studio Code](https://azure.microsoft.com/ja-jp/products/visual-studio-code), [Vim](https://github.com/vim/vim) / [Neovim](https://neovim.io), and [Zed](https://zed.dev) are supported officially.

### Visual Studio Code

For Visual Studio Code, Veryl extension is provided.
The extension provides file type detection, syntex highlight and language server integration.
You can install it by searching "Veryl" in extension panel or the following URL.

[Veryl extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=veryl-lang.veryl-vscode)

### Vim / Neovim

For Vim / Neovim, Veryl plugin is provided.
The plugin provides file type detection, syntex highlight.
There are some instructions for plugin installation and language server integration in the following URL.

[Vim / Neovim plugin](https://github.com/veryl-lang/veryl.vim)

### Zed

For [Zed](https://zed.dev/), Veryl extension is provided.
The extension provides file type detection, syntex highlight and language server integration.
You can install it by searching "Veryl" in extension panel or the following URL.

[Veryl extension for Zed](https://zed.dev/extensions/veryl)

### Other Editors

Veryl provides language server. So other editors supporting language server (ex. Emacs) can use it.

## Shell Completion

Shell completion script for `veryl` and `verylup` is provided through `verylup completion`.
For example, the following command generates completion script for zsh.

```
verylup completion zsh veryl   > _veryl
verylup completion zsh verylup > _verylup
```

Supported shells are below:

* Bash
* Elvish
* Fish
* PowerShell
* Zsh

Please refer the documentation of each shell for usage of generated scripts.
