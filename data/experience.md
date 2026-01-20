## Senior Graphics Software Engineer
### [Qualcomm](https://www.qualcomm.com/snapdragon) — San Diego, CA
#### 2021 - Present
##### *Infrastructure, Automation, Sandbox, Orchestration, Distributed Systems, Reporting; Python, Shell, FastAPI, Redis, RabbitMQ, Artifactory, LSF, MCP*
- Spearheaded an `end-to-end automation framework` from dispatching to `isolated` job execution on `on-prem LSF clusters` for `pre-silicon GPU` testing.
- Facilitated `100k+ weekly tests` to validate `flagship [Snapdragon GPUs](https://www.qualcomm.com/snapdragon)` across critical test suites: `CTS` (`Vulkan`, `OpenCL`), `GFXR`, `DCAP`, `VKPerf` drivers.
- Designed custom `Docker/Singularity` images to `sandbox` and manage host setups with test dependencies and drivers, guaranteeing `reproducibility`.
- Devised an `asynchronous` reporting pipeline using `RabbitMQ` to route results to `Artifactory` storage, decoupling execution from logging services.
- Developed `high-performance` back-end using `FastAPI` to monitor live job status, providing real-time feedback on `1M+ weekly rows` from `Redis Cache`.
- Implemented a `regression tracking` system using `Django` and `PostgreSQL` to update `time-series` data, enabling early detection of performance hits.
- Architected core `Pydantic` schemas and helper classes to standardize data flow, minimizing integration errors and technical debt.
- Designed `interactive web dashboards` empowering stakeholders with immediate insights into `up-to-date` driver health and `regressions`.
- Presented an org-wide talk on the use of `Model Context Protocol (MCPs)` and `Coding Agents/Cline` to improve developer productivity.
- Experimented with `Multi-agent Supervisors` using `LangGraph` and `FastMCP` for Q&As about docs/wikis using `RAG` pipelines built with `ChromaDB`.
- Worked at `3 different locations` — `Boulder` (CO), `Toronto` (Canada), and `San Diego` (CA). `Promoted` from Engineer in `2024`.

---
## Data Science Developer
### [KORE Wireless](https://www.korewireless.com/) — Blue Ash, OH
#### 2020 - 2021
##### *R&D, Applied ML, Predictive Analytics, Clustering, Anomaly Detection, Web-Services; SQL, Python, Scikit-Learn, FastAPI, PowerBI, Jupyter Notebooks*
- Engineered `APIs` from scratch for `Auto-Thresholds (Burst Detection)` and `Auto-Device Grouping` services to automate `Anomaly Detection`.
- Developed `ETL pipelines` to process and clean `live usage data` from `NetFlow` and `Radius` sources for downstream ML models.
- Created `3D Clustering data visualizations` to guide the engineering team's `UI/UX` design strategy to improve `[SecurityPro](https://www.korewireless.com/news/koreone-security-connectivity-analytics-platform-enable-innovative-i/)` network diagnostic product.
- Managed the full `ML lifecycle` from conceptualization to deployment `(0-to-1)`; `Presented weekly` progress reports to `C-suite leadership (CTO & SVPs)`.
- Transitioned to a full-time role in `Jan 2021` following the successful completion of a winter internship in `Winter 2020`.

---
## Associate Researcher
### [Marine Bio-acoustics Research Collaborative (<u>MBARC</u>)](https://acoustics.ucsd.edu) — San Diego, CA
### [Marine Acoustics Research (<u>MAR</u>) Lab, SDSU](https://roch.sdsu.edu/index.php/research-overview) & [Scripps Institution of Oceanography (<u>SIO</u>), UCSD](https://www.cetus.ucsd.edu)
#### 2019 - 2020
### Master's Thesis: `[Learning to Detect Odontocete Whistles from Generative Synthetic Samples](https://csu-sdsu.primo.exlibrisgroup.com/permalink/01CALS_SDL/r45sar/alma991023922865902917)`, Advisor: [Dr. Marie Roch](https://roch.sdsu.edu)
##### *Deep Learning, Bio-Acoustics, CycleGAN, WGAN, CNN, U-Net, ResNets, PatchGAN; Python, PyTorch, CUDA, MATLAB*
- Designed `[DeepWhistleGAN](https://drive.google.com/file/d/1vp1WcMvt0eAPQbaeXxriQ5qnka3edRHn/view?usp=sharing)`, a novel `unsupervised learning` architecture to synthesize `dolphin whistles` and `oceanic noise` spectrogram patches.
- Solved `data scarcity` by generating `1000% synthetic samples`, enabling `WGAN`+`CycleGAN` models to train effectively on just `6.25% of annotated data`.
- Achieved `80.5% F1 Score` with the optimal augmented model, outperforming synthesis baselines (`EdgeGT`, `EdgeCanny`) by `~8%` in noisy environments.
- Attained `96.6% Precision` & `69.0% Recall`, drastically reducing `false positives` in `PAM` systems compared to SOTA `graph-search` algorithms (`Silbido`).
- Proposed a scalable `transfer learning pipeline` to adapt `odontocete` detection for `mysticetes (baleen whales)` to aid `marine mammal conservation`.

---
## Research Engineering Intern
### HireValley Inc — Ahmedabad, India
#### 2016 - 2017
##### *Recommendation System, System Architecture, NLP, Microservices, Ontology, Machine Learning; Python, Flask, SPARQL, RDFLib, NLTK*

- Architected a cloud-based `microservice` platform for an `Automated HCM System` to enable scalable talent acquisition on `AWS`.
- Designed a `web interface` in `Flask` and implemented `NLP pipelines` using `NLTK` to extract features from `unstructured` resume data.
- Developed a `Knowledge Inference` module using `SPARQL`, `RDFLib` to query `semantic relationships` leveraging an `Ontology` designed in `Protégé`.
- Engineered a `recommendation engine` utilizing `K-Nearest Neighbors (KNN)` and `Jaccard Similarity` to match candidates to job profiles.
- `[Published](https://ieeexplore.ieee.org/document/8369531/)` the system architecture and algorithms in a research paper at the `IEEE SysCon 2018 Conference`.
