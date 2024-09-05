# Installation

Veryl can be intalled through the official toolchain installer `verylup`.

## Requirement

Veryl uses `git` command internally. Please confirm `git` can be launched.

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

[Visual Studio Code](https://azure.microsoft.com/ja-jp/products/visual-studio-code) and [Vim](https://github.com/vim/vim) / [Neovim](https://neovim.io) are supported officially.

### Visual Studio Code

For Visual Studio Code, Veryl extension is provided.
The extension provides file type detection, syntex highlight and language server integration.
You can install it by searching "Veryl" in extension panel or the following URL.

[Veryl extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=dalance.vscode-veryl)

### Vim / Neovim

For Vim / Neovim, Veryl plugin is provided.
The plugin provides file type detection, syntex highlight.
There are some instructions for plugin installation and language server integration in the following URL.

[Vim / Neovim plugin](https://github.com/veryl-lang/veryl.vim)

### Other Editors

Veryl provides language server. So other editors supporting language server (ex. Emacs) can use it.
