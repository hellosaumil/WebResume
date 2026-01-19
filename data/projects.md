### [PocketOrreryXR — Solar System on Android XR](https://github.com/hellosaumil/PocketOrreryXR)

##### *Mixed Reality, Virtual Reality, 3D, glTF, Hand Gestures; Kotlin, Android XR, Android Studio; Google Antigravity, LLMs*

- Designed an `immersive 3D` app for the solar system on `Android XR` using `Jetpack Compose` and `SceneCore` spatial APIs.
- Implemented `spatial gestures` with pinch-to-select or by dragging to move the solar system in `3D` space.
- Developed `planetary mechanics` with `axial` rotation and `orbit` simulation in `Kotlin` via `iterative AI prompting`.
- Integrated the latest `androidx.xr alpha SDK` for `Full Space mode` to enable seamless transitions between `VR/AR` environments.
- `Vibecoded 100%` of the app from scratch using `Google Antigravity`, `Gemini 3 Pro`, and `Claude Sonnet 4.5` LLMs.

---
### [Phoneme Recognition and Digit Identification — Deep Speech Recognition](https://drive.google.com/drive/folders/1C59f-HTYvSWZ5iUEIMvxXTJogwpAaULU?usp=sharing)
##### *Deep Learning, Speech Processing, Computer Vision, LSTM, RNNs, Spectrograms; Python, TensorFlow, Keras, AWS EC2*
- Developed an `end-to-end RNN pipeline` for phoneme recognition on `[TIMIT](https://catalog.ldc.upenn.edu/LDC93S1)` and `[TIDIGITS](https://catalog.ldc.upenn.edu/LDC93S10)` using `TensorFlow` and `Keras`.
- Scaled training on `AWS EC2 (t2.xlarge)`, reducing epoch time from `2.75hrs` to `~45s` (`99% speedup`) over local execution.
- Architected a custom `PaddedBatchGenerator` with `Masking layers` to handle variable-length audio without data loss.
- Conducted a `grid-search` over layer widths, dropout, and L2 rates; optimized to a `2-layer LSTM` with `~64% accuracy`.
- Validated performance using `Stratified K-Fold Cross-Validation` to ensure generalization on unseen test data.

---
### [GPU-Accelerated Face Recognition & Tracking on Real-Time HD Video](https://drive.google.com/open?id=0B9gQb-9dKj0ubWVWWjFLQWJqRnM)
##### *Machine Learning, Incremental Learning, IPCA, LDA, K-Means Clustering, Haar Features; Python, OpenCV, PyCUDA*
- Engineered `real-time HD` face recognition using incremental `IPCA+LDA` for `continuous updates` to classifier knowledge.
- Boosted to `94.67% accuracy` by implementing `novel frame-skipping` to allocate resources for incremental learning.
- Accelerated training pipeline `speed by 24%` on `NVIDIA GPGPUs` using `PyCUDA/Sci-kit CUDA` optimizations.
- Achieved `34.3% power savings` on low-end `NVIDIA GeForce 525M GPUs` compared to `CPU-only` execution.
- `Open-sourced` the `SEAS-FR-DB` benchmark dataset `(1080p, 30fps)`; `[Published](https://ieeexplore.ieee.org/document/8369529/)` research findings at an `IEEE` conference.

---
### [Agricultural Terrains Image Classification on Satellite Imagery](https://github.com/hellosaumil/deepsat-aws-emr-pyspark)
##### *Big Data, ML Pipeline, Image Classification, Satellite Images, PCA, Random Forests; Python, PySpark, AWS EMR, S3*
- Deployed a `distributed ML pipeline` on `AWS EMR (Elastic MapReduce)` using `PySpark` to classify `405k images` from the `[DeepSat Kaggle](https://www.kaggle.com/crawford/deepsat-sat6)` dataset.
- Optimized training time by `~85%`, achieving `92%` accuracy using `PCA` for dimensionality reduction across `6` terrain categories.
- Architected scalable `AWS S3` & `Spark ML pipelines` to process `5.6 GB`, cutting training costs to `<$0.20/run` on `m5.xlarge clusters`.
- Built a `dual-mode framework` for seamless `local-to-cloud` transition, running inference on `81k samples` in `<5 minutes`.

---
### [ToDo iOS App - SwiftUI](https://github.com/hellosaumil/ToDo-SwiftUI#)
##### *Mobile App Dev, MVVM, User Interface (UI/UX); iOS, Swift, SwiftUI, Xcode, WidgetKit, AppGroups*
- Designed a `playful minimal iOS app` for `visual progress tracking` using fun shapes, colors, animations, and `user interactions`.
- Secured sensitive tasks with `FaceID Biometric Authentication`, adding `Favorites` and `Search` functionality for easy discovery.
- Orchestrated real-time `state sync` between the main app and Home screen `Widgets` using `App Groups`.
- Migrated legacy `iOS 14` (`SwiftUI 2`) written in 2020 to `iOS 26` (`SwiftUI 5`) using `Google Antigravity` and `Claude Opus 4.5` in 2026.

---
### [QpiC: Querying Platform with VM Integration on Cloud](https://drive.google.com/drive/folders/0B9gQb-9dKj0uUF9iVEM4UXBRaEk?usp=sharing)
##### *Cloud Computing, Microservices, VM, Multi-tenancy; Python, Heroku, OWL, Sparql, WebPy, Flask, Xen Server*
- Developed a `WebPy` SaaS platform for `SPARQL` queries on `OWL/RDF` ontologies via `RDFLib`.
- Optimized response times by implementing `LRU caching` with `pickle serialization` to eliminate redundant parsing.
- Engineered `multi-tenant` isolation with auto-provisioning and strict `filesystem-based` access controls.
- Automated `VM load forecasting` using `Linear Regression` to drive resource balancing via `Xen-API`.
