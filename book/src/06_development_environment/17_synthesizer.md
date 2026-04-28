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
  area:        1234.56 um²  (comb 1100.00, seq 134.56)
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

## Options

| Option | Description |
|---|---|
| `--top <name>` | Top module name. Overrides `synth.top` in `Veryl.toml`. |
| `--timing-paths <n>` | Number of worst-delay endpoints to report when dumping timing. Overrides `synth.timing_paths`. |
| `--dump-ir` | Dump the gate-level IR (netlist of gates and flip-flops). |
| `--dump-area` | Dump the per-cell-kind area breakdown. |
| `--dump-timing` | Dump the critical path trace. |
| `--dump-power` | Dump the power estimate (leakage + dynamic breakdown). |

If no `--dump-*` flag is given, all three of area / timing / power are dumped.
