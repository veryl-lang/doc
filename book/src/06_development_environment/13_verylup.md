# verylup

[verylup](https://github.com/veryl-lang/verylup) is the official toolchain installer of Veryl.
It eases to update and switch toolchains.

## Update toolchain

The following command updates Veryl toolchain and verylup to the latest version.

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

## Toolchain override for directories

If you want to use a specific version of Veryl for specific directories, `verylup override` can be used.

```
verylup override set 0.12.0
```

`verylup override` can be executed in arbitrary directories in a Veryl project.
After this command, the default toolchain becomes `0.12.0` in the project.

## Offline installation {#offline-installation}

If you want to verylup on an environment without internet access, offline installation can be used.
The procedure of offline installation is below:

* Download the latest toolchain package from [Veryl release page](https://github.com/veryl-lang/veryl/releases).
* Execute `veryl setup` with `--pkg` specification like the following command.

```
verylup setup --offline --pkg veryl-x86_64-linux.zip
```

If you want to update/install toolchain, `--pkg` specification is required as the same as setup.

```
verylup update --pkg veryl-x86_64-linux.zip
verylup install 0.12.0 --pkg veryl-x86_64-linux.zip
```

## Nightly channel

To use the latest features easily, nightly channel is available.
Nightly channel is built daily from the master branch.

```
verylup install nightly
```

By default, nightly channel is not enabled after installation.
So the following ways can be used to enable it.

```
// Use +nightly
veryl +nightly build

// Set default to nightly
verylup default nightly

// Override by nightly for a specific project
verylup override set nightly
```

## For Veryl Developer

For Veryl developer, a special toolchain target `local` is prepared.
If `verylup install local` is executed in your local Veryl repository, the built toolchain is installed as `local` toolchain.
`local` becomes the default toolchain if it exists.

```
// Build and install the toolchain from local Veryl repository
verylup install local

// Use the built toolchain
veryl build

// Use the latest toolchain
veryl +latest build
```
