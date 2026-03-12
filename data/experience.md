## Senior Software Engineer, Graphics Software Infrastructure
### [Qualcomm](https://www.qualcomm.com/snapdragon/overview) — San Diego, CA
#### 2021 - Present

- `Architected and own Aether E2E`: an in-house `end-to-end automation platform` purpose-built to orchestrate pipelines dispatching `200K+ jobs/week` as containerized (`Docker`/`Singularity`) workloads across an `on-prem LSF server-farm`, with real-time result reporting for `Vulkan`/`OpenCL`/`OpenGL` graphics driver validation across upcoming flagship `Snapdragon Adreno GPUs`.
- `Established AeResult`, a `Pydantic`-based canonical result schema unifying data contracts across the platform; extensible enough that the on-device `benchmarking team adopted it wholesale` for KPI workloads without modifications, `saving months of parallel engineering effort`.
- `Engineered FastAPI backend` + `RedisJSON`/`RediSearch` for `sub-second` access to live job statuses, test results, and aggregated metrics; sustains `over 2M rolling rows/month` with TTL-based expiry, deliberately trading history depth for query performance at scale.
- `Decoupled` execution from reporting via `RabbitMQ` async routing to `Artifactory` and `Postgres` for regression tracking, enabling `independent scaling of each layer`; built interactive web dashboards and automated regression alerts for stakeholder decision-making.
- `Introduced MCP servers` wrapping live API backends, making operational infra `LLM`-queryable via natural language without direct API knowledge; drove org-wide adoption of `MCP` and agentic coding (`Cline`) across engineering teams.

---

## Data Science Developer, Applied ML
### [KORE Wireless](https://www.korewireless.com/) — Blue Ash, OH
#### 2020 - 2021

- `Engineered anomaly detection APIs` (`Auto-Thresholds`, `Auto-Device Grouping`) and `ETL pipelines` processing live `IoT` telemetry from `NetFlow`/`Radius` sources to power the `SecurityPro` network diagnostic product.
- `Owned the full ML lifecycle (0-to-1)` from prototyping through deployment; built `PowerBI` dashboards with `3D clustering` visualizations; presented weekly to `C-suite` (`CTO` & `SVPs`), translating ML outcomes into business decisions.

---

## Associate Researcher, Deep Learning
### [Marine Bio-acoustics Research Collaborative (MBARCO)](https://acoustics.ucsd.edu), [SDSU](https://roch.sdsu.edu/index.php/research-overview) — San Diego, CA
#### 2019 - 2020
### Master's Thesis: `[Learning to Detect Odontocete Whistles from Generative Synthetic Samples](https://csu-sdsu.primo.exlibrisgroup.com/permalink/01CALS_SDL/10r4g1c/cdi_proquest_journals_2493456813)`, Advisor: Dr. Marie Roch

- Designed `DeepWhistleGAN`, a novel hybrid architecture addressing data scarcity in marine bio-acoustics; `10x synthetic data augmentation` via `WGAN`+`CycleGAN` enabling model convergence on just `6.25%` of annotated data. Achieved `80.5% F1`, `96.6% Precision`, outperforming baselines by `8%`.
- Proposed `transfer learning` pipeline to scale `PAM (Passive Acoustic Monitoring)` across endangered whale species for `marine mammal conservation`.
