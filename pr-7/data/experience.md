## Senior Software Engineer, Graphics Software Infrastructure
### [Qualcomm](https://www.qualcomm.com/snapdragon/overview) — San Diego, CA
#### 2021 - Present
##### *Boulder · Toronto · San Diego - Promoted 2024*

- `Architected and own Aether E2E`: an in-house `end-to-end automation platform` purpose-built to orchestrate pipelines dispatching `200K+ jobs/week` as containerized (`Docker`/`Singularity`) workloads across an `on-prem LSF server-farm`, with real-time result reporting for `Vulkan`/`OpenCL`/`OpenGL` graphics driver validation across all upcoming premium-tier flagship `[Snapdragon Adreno GPUs](https://www.qualcomm.com/processors/adreno)`.

- `Engineered FastAPI backend` + `RedisJSON`/`RediSearch` for `sub-second` live access to job statuses, test results, and aggregated result metrics; sustains `~2M rolling rows/month` with custom expiry model, deliberately trading history depth for query performance at scale.

- `Decoupled` test execution from reporting by routing results via messaging queues with `RabbitMQ` + `Postgres` database for tracking regressions and sending test logs to `Artifactory` for persistent storage as they finish, enabling `independent scaling of each layer`.

- `Designed delightful user experiences` through interactive `Web dashboards`, `Excel spreadsheets` to show up-to-date result trends, jobs health and test regressions, enabling stakeholders for quick decision making.

- `Established AeResult`, a `Pydantic`-based canonical result schema unifying data contracts across Aether's pipeline, extensible enough that the on-device `benchmarking team adopted it wholesale` for KPI workloads without platform modifications, `saving months of parallel engineering effort`.

- `Introduced MCP servers` wrapping live `API` backends, making operational infra `LLM`-queryable via natural language without direct API knowledge; presented org-wide to drive `MCP` and agentic coding (`Cline`) adoption across engineering teams.

---

## Data Science Developer, Applied ML
### [KORE Wireless](https://www.korewireless.com/) — Blue Ash, OH
#### 2020 - 2021
##### *R&D, Applied ML, Predictive Analytics, Clustering, Anomaly Detection; PySpark, Scikit-Learn, FastAPI, PowerBI, Jupyter Notebooks*

- `Engineered anomaly detection APIs` (`Auto-Thresholds`, `Auto-Device Grouping`) and `ETL pipelines` processing live `IoT` telemetry from `NetFlow`/`Radius` sources to power the `[SecurityPro](https://www.korewireless.com/news/koreone-security-connectivity-analytics-platform-enable-innovative-i/)` network diagnostic product.

- `Owned the full ML lifecycle (0-to-1)` from rapid prototyping through deployment; built `PowerBI` dashboards with `3D clustering` visualizations to communicate model outputs; presented weekly progress directly to `C-suite` (`CTO` & `SVPs`), translating ML outcomes into business decisions.

- Converted to full-time following successful delivery of core anomaly detection features in Winter `2020`.

---

## Associate Researcher, Deep Learning
### [Marine Bio-acoustics Research Collaborative (<u>MBARCO</u>)](https://acoustics.ucsd.edu) — San Diego, CA
### [Marine Acoustics Research (<u>MAR</u>) Lab, SDSU](https://roch.sdsu.edu/index.php/research-overview) & [Scripps Institution of Oceanography (<u>SIO</u>), UCSD](https://www.cetus.ucsd.edu)
#### 2019 - 2020
### Master's Thesis: `[Learning to Detect Odontocete Whistles from Generative Synthetic Samples](https://csu-sdsu.primo.exlibrisgroup.com/permalink/01CALS_SDL/10r4g1c/cdi_proquest_journals_2493456813)`, Advisor: [Dr. Marie Roch](https://roch.sdsu.edu)
##### *Unsupervised Learning, Bio-Acoustics, Computer Vision, Speech Processing, CycleGAN, WGAN, CNN, ResNet, UNet; Python, PyTorch, CUDA*

- Designed **[DeepWhistleGAN](https://drive.google.com/file/d/1vp1WcMvt0eAPQbaeXxriQ5qnka3edRHn/view?usp=sharing)**, a novel hybrid architecture addressing data scarcity in marine bio-acoustics; with `10x synthetic data augmentation` via `WGAN`+`CycleGAN` enabling model convergence on just `6.25% of annotated data`. Achieved `80.5% F1`, `96.6% Precision`, outperforming baselines by `8%`.

- `Proposed transfer learning` pipeline to scale `PAM (Passive Acoustic Monitoring)` across endangered whale species for `marine mammal conservation`.

- Presented research findings to `ONR (Office of Naval Research)` federal research sponsors on model performance and conservation impact.

---

## Research Intern, Recommendation Systems
### HireValley Inc — Ahmedabad, India
#### 2016 - 2017
##### *Recommendation System, NLP, Microservices, Ontology; Python, Flask, SPARQL, RDFLib*

- `Co-developed a job-candidate recommendation engine` on a cloud-based `AWS EC2` `microservice` platform; built `NLP` feature extraction pipelines from resume and job descriptions to build a skill-based ontology using `SPARQL`/`RDFLib` for knowledge inference. `[Published](https://ieeexplore.ieee.org/document/8369531/)` at `IEEE SysCon 2018`.