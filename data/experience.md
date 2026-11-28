## Senior Software Engineer, Graphics Software Infrastructure

### [Qualcomm](https://www.qualcomm.com/snapdragon/overview) - San Diego, CA

#### 2024 - Present

##### Large-Scale Validation Platform and Agentic Tooling

- `Primary architect` of pre-silicon validation platform behind `5 generations` of `Snapdragon 8 Elite Extreme` (mobile) and `X Elite Extreme` (PC) chips.
- Scaled validation to `300K+ containers/week` on Windows/Linux across an on-prem `HPC` farm through a `fault-tolerant runner harness`, covering `Vulkan`/`OpenCL`/`OpenGLES` - CTS, VKPerf, GFXReconstruct, and Device-capture Replays with 1B+ tests in sandboxed, reproducible runtimes.
- Standardized `Pydantic` result schemas across `10+` Khronos suites that the `on-device benchmark` team adopted directly and extended for KPIs.
- Shipped an `MCP server` with `OAuth2` for in-editor regression triage, then led org-wide talks onboarding teams to `Claude Code`, `Codex`, and `AI Skills`.

##### Automated Regression Triage System

- Engineered a fully automated cron `Jenkins CI/CD` dispatcher that diffs nightly regressions and bisects them to culprit `Gerrit` commits.
- Implemented `multi-bisection engine` on Karpathy's [`autoresearch`](https://github.com/karpathy/autoresearch)-style `JSONL` loop, isolating C culprits in `O(C log N)` runs, cutting compute by `80%`.
- `Left-shifted` driver validation, shrinking `root-cause` triage from `3 days` to under `12 hours` and sustaining a `99%` pass rate week over week.

---

## Software Engineer, Graphics Software Infrastructure

### [Qualcomm](https://www.qualcomm.com/snapdragon/overview) - San Diego, CA · (prev: Boulder, CO; Toronto, ON)

#### 2021 - 2024

##### Distributed Pre-Silicon GPU Driver Validation Platform

- `Designed and built` end-to-end `pre-silicon` GPU validation platform from concept to production, catching regressions in proprietary driver code.
- Automated `Jenkins` deploys on upstream driver changes, pinning each build to its SDK and suite versions for repeatable runs.
- Parallelized `1100+ days` of serial `CPU-based Adreno emulation` into a `24-hour` nightly cycle (`1100x`) with `Docker`/`Singularity` on `IBM Spectrum LSF`.
- Built `FastAPI` observability backend on `RedisJSON`/`RediSearch`, powering custom `web dashboards` with `sub-second` live queries over `2M+` records.
- Architected async `RabbitMQ` pipelines into `Postgres` and a `DuckDB` data lake, offloading raw driver logs to `Artifactory` to keep databases lean.

---

## Data Science Developer, Applied ML

### [KORE Wireless](https://www.korewireless.com/) - Blue Ash, OH

#### 2020 - 2021

- Built `anomaly detection APIs` from scratch (Auto-Thresholds, Auto-Device Grouping) for `SecurityPro` on `ETL pipelines` of live `IoT telemetry`.
- `Owned the full ML lifecycle` for both services from concept through production deployment, after converting from a winter internship.
- Visualized ML outcomes in `PowerBI` dashboards with `3D clustering`, presenting weekly to the `C-suite` (`CTO` and `SVPs`) to guide decisions.

---

## Assistant Researcher, Deep Learning

### [Marine Bio-acoustics Research Collaborative (MBARC)](https://acoustics.ucsd.edu), [SDSU](https://roch.sdsu.edu/index.php/research-overview) - San Diego, CA

#### 2019 - 2020

### Master's Thesis: `[Learning to Detect Odontocete Whistles from Generative Synthetic Samples](https://csu-sdsu.primo.exlibrisgroup.com/permalink/01CALS_SDL/10r4g1c/cdi_proquest_journals_2493456813)`, Advisor: Dr. Marie Roch

- Devised a novel hybrid architecture addressing data scarcity in marine bio-acoustics; `10x synthetic data augmentation` via `WGAN`+`CycleGAN` enabling model convergence on just `6.25%` of annotated data. Achieved `80.5% F1`, `96.6% Precision`, outperforming baselines by `8%`.
- Proposed `transfer learning` pipeline to scale `PAM (Passive Acoustic Monitoring)` across endangered whale species for `marine mammal conservation`; presented model performance and conservation impact to `ONR (Office of Naval Research)` federal research sponsors.
