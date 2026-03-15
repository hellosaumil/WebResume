### [JobPostHighlightsExtension — Chrome Extension for Job-Resume Matching](https://github.com/hellosaumil/JobPostHighlightsExtension)

##### Chrome MV3, 2-Stage Pipeline, Hybrid Refinement, Prompt API, Summarizer API, Gemini Nano, Gemini Cloud, Ollama

- Developed `Chrome MV3` extension with `2-stage LLM pipeline` (extract → score) + `hybrid refinement` pass to detect and fill missing fields.
- Engineered `multi-provider AI` architecture supporting `Gemini Cloud`, `Ollama`, and `on-device Gemini Nano` via Chrome's `Prompt API`.
- Optimized inference latency with `pre-warmed model sessions` at startup; subsequent evaluations use `clone()` for `sub-second` response times.
- Designed dual-mode UI (`sidepanel` + `pop-out window`) with dark/light themes and `Cmd+J`/`Ctrl+J` shortcut via `Chrome Commands API`.

---

### [Satellite Terrain Classification — Distributed ML on AWS EMR](https://github.com/hellosaumil/deepsat-aws-emr-pyspark)

##### Distributed ML, Image Classification, PCA, Random Forests, PySpark, AWS EMR, S3

- Deployed distributed `PySpark ML` pipeline on `AWS EMR` to classify `405K satellite images` across `6 terrain categories`; achieved `92% accuracy`.
- Reduced training time by `~85%` via `PCA dimensionality reduction` while preserving classification performance on high-dimensional image features.
- Architected scalable `S3` + `Spark ML` pipelines processing `5.6 GB` at `<$0.20/run` on `m5.xlarge` clusters for cost-efficient batch inference.
- Structured `dual-mode framework` enabling seamless `local-to-cloud transition`; same codebase runs on local Spark for dev and EMR for production.
