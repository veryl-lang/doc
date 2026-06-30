# Synthesizer

`veryl synth` performs lightweight logic synthesis on the project and reports
approximate area, timing and power. It is intended as a quick feedback tool
during design exploration, not a replacement for a production synthesis flow.
The design is mapped to a representative subset of cells in the selected
library, but place-and-route, load capacitance, drive strength and Vth selection
are not considered.

```console
$ veryl synth
```

The top module is selected as follows, in order of priority:

1. CLI `--top <name>` if supplied
2. `synth.top` in `Veryl.toml` if set
3. The first user module discovered in the project

The available configurations such as the cell library, clock frequency and
toggle activity are described in [`[synth]`](./01_project_configuration/06_synth.md).

## Output

By default, `veryl synth` prints a one-line summary plus area / timing / power
detail blocks:

```text
synth: TopModule — 123 gates, 17 FFs
library: sky130_fd_sc_hd ...

summary:
  area:        1234.56 um²  (comb 1000.00, seq 134.56, mem 100.00)
  timing:        2.345 ns      8 levels  in_dat → out_dat
  power:        0.1234 mW   (leak 0.0123 mW, dyn 0.1111 mW)
                            @ f_clk = 100 MHz, activity = 0.10

area:
  ...
timing:
  ...
power:
  ...
```

## RAM inference

A large array is mapped to an SRAM macro instead of `depth × width` flip-flops
plus an address decode/mux tree. A bit-array macro is far denser and faster, so
modelling it directly keeps the area, timing and power estimates realistic for
memory-heavy designs such as caches and register files.

An array is inferred as a RAM block when all of the following hold:

* it has at least 1024 stored bits and a depth of 2 or more;
* it is written **without a reset**, through whole-word dynamic-address writes
  (`mem[addr] = data`), with at most 8 distinct write sites;
* it is read through whole-word dynamic addresses (`mem[addr]`), with at most 16
  distinct read addresses.

An array written under `if_reset` stays as flip-flops, because real SRAM has no
reset — so an array intended to become SRAM is written reset-less in the RTL.
Partial or sub-word writes also keep the array as flip-flops.

The inferred memory area is reported as the `mem` term of the area summary, and
`--dump-area` lists each block grouped by shape (depth × width) and port count:

```text
ram: 2 blocks
    1024×32   1R1W  ×1       32768 bits       189.40 um²
     512×64   2R1W  ×1       32768 bits       189.40 um²
```

## Options

| Option | Description |
|---|---|
| `--top <name>` | Top module name. Overrides `synth.top` in `Veryl.toml`. |
| `--timing-paths <n>` | Number of worst-delay endpoints to report when dumping timing. Overrides `synth.timing_paths`. |
| `--dump-ir` | Dump the gate-level IR (netlist of gates and flip-flops). |
| `--dump-area` | Dump the per-cell-kind area breakdown, including inferred RAM blocks. |
| `--dump-timing` | Dump the critical path trace. |
| `--dump-power` | Dump the power estimate (leakage + dynamic breakdown). |

If no `--dump-*` flag is given, all three of area / timing / power are dumped.
