## Senior Software Engineer, Graphics Software Infrastructure
### [Qualcomm](https://www.qualcomm.com/snapdragon/overview) - San Diego, CA · (prev: Boulder, CO; Toronto, ON)
#### 2021 - Present

##### Distributed Pre-Silicon GPU Driver Validation Platform

- `Designed and led` end-to-end `pre-silicon` GPU validation platform from concept to production, catching regressions and protecting pass rates on proprietary GPU driver code across `5 generations` up to `Snapdragon 8 Elite Extreme` (mobile) and `X Elite Extreme` (PC) series chipsets.
- Scaled validation to `600K+ containers/week` on Windows/Linux across an on-prem `HPC` farm through a fault-tolerant runner harness, covering `Vulkan`/`OpenCL`/`OpenGLES` - `CTS`, `VKPerf`, `GFXReconstruct`, and device-capture replay with `billions of tests` in sandboxed, reproducible runtimes.
- Parallelized `1100+ days` of serial `CPU-based Adreno emulation` into a `24-hour` nightly cycle (`1100x`) with `Docker`/`Singularity` on `IBM Spectrum LSF`.
- Built `FastAPI observability backend API` on `RedisJSON`/`RediSearch`, serving live job health and test metrics at `sub-second` latency over `5M+` records.
- Architected async `RabbitMQ` pipelines into `Postgres` and a `DuckDB` data lake, offloading raw driver logs to `Artifactory` to keep databases lean.
- Standardized `Pydantic` result schemas across `10+` Khronos suites that the `on-device benchmark` team adopted directly and extended for KPIs.

##### Automated Regression Triage System

- `Engineered` a cron-scheduled `CI/CD` pipeline that diffs non-passing rows across consecutive nightly logs, builds `Gerrit` commit DAGs, and dispatches multi-stage `Jenkins` bisection workflows, eliminating operational toil from nightly builds with overlapping test failures.
- Implemented stateful `multi-bisection engine` on a crash-recoverable `JSONL` state loop inspired by [`Karpathy's autoresearch`](https://github.com/karpathy/autoresearch), sharing midpoint builds across failing tests and partitioning commit ranges, isolating C culprits in `O(C log N)` runs instead of `O(K log N)`, cutting compute by `80%`.
- `Left-shifted` driver validation by compressing the failure-to-fix loop, from detection and `root-cause commit` identification to author notification, enabling `rapid fix iteration` and a sustained `99%` pass rate `week over week`.

##### Agentic Developer Infrastructure

- `Shipped` `MCP` server with `OAuth2` over live infra APIs plus a `LangGraph`/`ChromaDB` RAG over internal docs, making operational data LLM-queryable.
- Drove org-wide adoption of agentic coding with `Cline`, `Codex CLI`, delivering talks on MCP-based developer workflows and writing custom Skills.

---

## Data Science Developer, Applied ML

### [KORE Wireless](https://www.korewireless.com/) - Blue Ash, OH

#### 2020 - 2021

- `Engineered anomaly detection APIs` (`Auto-Thresholds`, `Auto-Device Grouping`) and `ETL pipelines` processing live `IoT` telemetry from `NetFlow`/`Radius` sources to power the `SecurityPro` network diagnostic product.
- `Owned the full ML lifecycle (0-to-1)` from prototyping through deployment; built `PowerBI` dashboards with `3D clustering` visualizations; presented weekly to `C-suite` (`CTO` & `SVPs`), translating ML outcomes into business decisions.

---

## Assistant Researcher, Deep Learning

### [Marine Bio-acoustics Research Collaborative (MBARC)](https://acoustics.ucsd.edu), [SDSU](https://roch.sdsu.edu/index.php/research-overview) - San Diego, CA

#### 2019 - 2020

### Master's Thesis: `[Learning to Detect Odontocete Whistles from Generative Synthetic Samples](https://csu-sdsu.primo.exlibrisgroup.com/permalink/01CALS_SDL/10r4g1c/cdi_proquest_journals_2493456813)`, Advisor: Dr. Marie Roch

- Designed a novel hybrid architecture addressing data scarcity in marine bio-acoustics; `10x synthetic data augmentation` via `WGAN`+`CycleGAN` enabling model convergence on just `6.25%` of annotated data. Achieved `80.5% F1`, `96.6% Precision`, outperforming baselines by `8%`.
- Proposed `transfer learning` pipeline to scale `PAM (Passive Acoustic Monitoring)` across endangered whale species for `marine mammal conservation`; presented model performance and conservation impact to `ONR (Office of Naval Research)` federal research sponsors.
