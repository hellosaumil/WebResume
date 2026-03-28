## Senior Software Engineer, Graphics Software Infrastructure

### [Qualcomm](https://www.qualcomm.com/snapdragon/overview) — San Diego, CA

#### 2021 - Present

- `Architected and own` an in-house pre-silicon `GPU validation` `end-to-end automation framework` dispatching `500K+ jobs/week` on `LSF` on-prem, catching driver regressions on flagship `Snapdragon Adreno GPUs`.
- Parallelized `Docker`/`Singularity` containerized workloads, cutting nightly driver validation cycles from `240 days to 1 day` to support higher throughput.
- Delivered a `FastAPI` + `RedisJSON`/`RediSearch` backend with `TTL`-based expiry, providing `sub-second` access to live test metrics with `2M+ rows/month`.
- Designed `web dashboards`, on-demand `Excel` reports, and automated regression `email alerts` to `meet each stakeholder group's reporting needs`.
- Eliminated reporting bottlenecks via async `RabbitMQ` routing to `Postgres` and `Artifactory`, enabling independent scaling of each layer.
- Standardized `Pydantic` canonical schemas across `10+` Khronos test suites; adopted by the benchmarking team, `saving months of engineering effort`.
- Introduced `MCP servers` wrapping live `API` backends, making `LLM-queryable operational infra`; drove org-wide adoption of `agentic coding` (`Cline`).

---

## Data Science Developer, Applied ML

### [KORE Wireless](https://www.korewireless.com/) — Blue Ash, OH

#### 2020 - 2021

- `Engineered anomaly detection APIs` (`Auto-Thresholds`, `Auto-Device Grouping`) and `ETL pipelines` processing live `IoT` telemetry from `NetFlow`/`Radius` sources to power the `SecurityPro` network diagnostic product.
- `Owned the full ML lifecycle (0-to-1)` from prototyping through deployment; built `PowerBI` dashboards with `3D clustering` visualizations; presented weekly to `C-suite` (`CTO` & `SVPs`), translating ML outcomes into business decisions.

---

## Assistant Researcher, Deep Learning

### [Marine Bio-acoustics Research Collaborative (MBARC)](https://acoustics.ucsd.edu), [SDSU](https://roch.sdsu.edu/index.php/research-overview) — San Diego, CA

#### 2019 - 2020

### Master's Thesis: `[Learning to Detect Odontocete Whistles from Generative Synthetic Samples](https://csu-sdsu.primo.exlibrisgroup.com/permalink/01CALS_SDL/10r4g1c/cdi_proquest_journals_2493456813)`, Advisor: Dr. Marie Roch

- Designed a novel hybrid architecture addressing data scarcity in marine bio-acoustics; `10x synthetic data augmentation` via `WGAN`+`CycleGAN` enabling model convergence on just `6.25%` of annotated data. Achieved `80.5% F1`, `96.6% Precision`, outperforming baselines by `8%`.
- Proposed `transfer learning` pipeline to scale `PAM (Passive Acoustic Monitoring)` across endangered whale species for `marine mammal conservation`; presented model performance and conservation impact to `ONR (Office of Naval Research)` federal research sponsors.
