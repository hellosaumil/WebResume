### [JobPostHighlightsExtension — Chrome Extension for Job-Resume Matching](https://github.com/hellosaumil/JobPostHighlightsExtension)
##### *Chrome MV3, 2-Stage Pipeline, Hybrid Refinement, Prompt API, Summarizer API, On-device Gemini Nano, Gemini Cloud, Ollama*

- Built `Chrome MV3` extension with `2-stage LLM pipeline` (extract → score) + `hybrid refinement` pass to detect and fill missing fields.
- Engineered `multi-provider AI` architecture supporting `Gemini Cloud`, `Ollama` (local), and `on-device Gemini Nano` with `BYOK` key management.
- Implemented `pre-warmed model sessions` at startup; subsequent evaluations use `clone()` for sub-second inference on Chrome's Prompt API.
- Designed premium UI with `glassmorphism`, dark/light themes, `sidepanel` + `pop-out window` modes, and `Cmd+J`/`Ctrl+J` keyboard shortcut.

---

### [Satellite Terrain Classification — Distributed ML on AWS EMR](https://github.com/hellosaumil/deepsat-aws-emr-pyspark)

##### *Distributed ML, Image Classification, PCA, Random Forests, PySpark, AWS EMR, S3*

- Deployed distributed `PySpark ML` pipeline on `AWS EMR` to classify `405K satellite images` across `6 terrain categories`; achieved `92% accuracy`.
- Applied `PCA dimensionality reduction` to cut training time by `~85%` while preserving classification performance on high-dimensional image features.
- Architected scalable `S3` + `Spark ML` pipelines processing `5.6 GB` at `<$0.20/run` on `m5.xlarge` clusters for cost-efficient batch inference.
- Built `dual-mode framework` enabling seamless `local-to-cloud transition`; same codebase runs on local Spark for dev and EMR for production scale.
