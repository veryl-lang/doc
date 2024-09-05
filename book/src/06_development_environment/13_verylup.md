# verylup

[verylup](https://github.com/veryl-lang/verylup) is the official toolchain installer of Veryl.
It eases to update and switch toolchains.

## Update toolchain

The following command updates Veryl toolchain to the latest version.

```
verylup update
```

## Install a specific toolchain

If you want to use a specific version of Veryl, `verylup install` can be used.

```
verylup install 0.12.0
```

After installing it, `+` version specifier can be used in `veryl` command like below:

```
veryl +0.12.0 build
```

## For Veryl Developer

For Veryl developer, a special toolchain target `local` is prepared.
If `veryup install local` is executed in your local Veryl repository, the built toolchain is installed as `local` toolchain.
`local` becomes the default toolchain if it exists.

```
// Build and install the toolchain from local Veryl repository
verylup install local

// Use the built toolchain
veryl build

// Use the latest toolchain
veryl +latest build
```
