# Synth

`[synth]` section specifies the configuration for the `veryl synth` command,
which performs lightweight logic synthesis to estimate area, timing and power.

```toml
[synth]
top          = "TopModule"
library      = "sky130"
clock_freq   = 100.0
activity     = 0.1
timing_paths = 1
```

## Available configurations

| Configuration  | Value                                       | Default | Description                                                       |
|----------------|---------------------------------------------|---------|-------------------------------------------------------------------|
| top            | string                                      | (auto)  | Default top module name. CLI `--top` overrides when supplied. If omitted, the first user module is used. |
| library        | `sky130` / `asap7` / `gf180mcu` / `ihp-sg13g2` | `sky130` | Built-in cell library / PDK to use.                                |
| clock_freq     | float                                       | 100.0   | Clock frequency assumed for the dynamic-power estimate (MHz).      |
| activity       | float (0.0–1.0)                             | 0.1     | Per-cycle toggle rate assumed for combinational nets.              |
| timing_paths   | integer                                     | 1       | Number of worst-delay endpoints to report in the timing dump.      |

## RAM inference

`veryl synth` infers a RAM macro for a large array written through a single
dynamic address and read through dynamic addresses, instead of expanding it into
`depth × width` flip-flops plus address decode/mux trees. The following
thresholds control when this happens. An array that fails inference (for
example, one with a reset — real SRAM has no reset) stays as flip-flops; if it is
also larger than `ram_max_ff_bits`, synthesis reports an error rather than
exhausting memory.

| Configuration        | Value   | Default | Description                                                                     |
|----------------------|---------|---------|---------------------------------------------------------------------------------|
| ram_min_bits         | integer | 1024    | Smallest array, in stored bits, worth inferring as a RAM instead of flip-flops. |
| ram_max_read_ports   | integer | 16      | Largest number of distinct read addresses a RAM-inferred array may have.        |
| ram_max_write_ports  | integer | 8       | Largest number of distinct write sites a RAM-inferred array may have.           |
| ram_max_ff_bits      | integer | 65536   | Largest array, in stored bits, that a dynamically-indexed array which failed inference may expand into flip-flops. A larger array is rejected instead of exhausting memory. |

## Built-in libraries

The `library` field selects the built-in cell library used for area, timing and
power estimation. All values are extracted or derived from public Liberty
characterization data, calibrated for self-consistent "relative cost" rather
than signoff-grade accuracy. Drive strength 1 cells are used throughout.

| `library`    | Process                               | Cell library / corner                  | Vdd   | Source (license)                                                      |
|--------------|---------------------------------------|----------------------------------------|-------|-----------------------------------------------------------------------|
| `sky130`     | SkyWater 130nm planar CMOS            | `sky130_fd_sc_hd` / `tt_025C_1v80`     | 1.8 V | [skywater-pdk](https://github.com/google/skywater-pdk) (Apache 2.0)   |
| `asap7`      | ASU 7nm predictive FinFET             | `asap7sc7p5t` RVT / `tt_0p7V`          | 0.7 V | [asap7](https://github.com/The-OpenROAD-Project/asap7) (BSD 3-Clause) |
| `gf180mcu`   | GlobalFoundries 180nm MCU planar CMOS | `gf180mcu_fd_sc_mcu7t5v0` / `tt_025C_1v80` | 1.8 V | [gf180mcu-pdk](https://github.com/google/gf180mcu-pdk) (Apache 2.0)   |
| `ihp-sg13g2` | IHP 130nm SiGe BiCMOS                 | `sg13g2_stdcell` / `typ_1p20V_25C`     | 1.2 V | [IHP-Open-PDK](https://github.com/IHP-GmbH/IHP-Open-PDK) (Apache 2.0) |

No Liberty source, schematic or layout from these PDKs is redistributed by Veryl;
only a small number of cell-level area / delay / leakage / energy figures are used as
reference data.
