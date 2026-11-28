### [Deep Speech Recognition: Phonemes and Digits](https://drive.google.com/drive/folders/1C59f-HTYvSWZ5iUEIMvxXTJogwpAaULU?usp=sharing)
#### May 2019

- Built an end-to-end `RNN` pipeline in `TensorFlow`/`Keras` on `[TIMIT](https://catalog.ldc.upenn.edu/LDC93S1)` and `[TIDIGITS](https://catalog.ldc.upenn.edu/LDC93S10)` spectrograms, with a custom padded batch generator and `Masking`.
- Scaled training on `AWS EC2` from `2.75 hrs` to `~45s` per epoch; grid search tuned a `2-layer LSTM` to `~64% accuracy` under `Stratified K-Fold`.

---

### [Agricultural Terrains Image Classification on Satellite Imagery](https://github.com/hellosaumil/deepsat-aws-emr-pyspark)
#### May 2019

- Deployed a distributed `PySpark` `Random Forest` pipeline on `AWS EMR` and `S3`, classifying `405K` `[DeepSat](https://www.kaggle.com/crawford/deepsat-sat6)` images into `6 terrains` at `92% accuracy`.
- Cut training time `~85%` via `PCA` at `<$0.20/run` on `m5.xlarge` clusters; one codebase runs local or cloud, scoring `81K` samples in `<5 min`.

---

### [GPU-Accelerated Face Recognition & Tracking on Real-Time HD Video](https://drive.google.com/open?id=0B9gQb-9dKj0ubWVWWjFLQWJqRnM)
#### May 2017

- Engineered real-time HD face recognition with incremental `IPCA+LDA` and `frame-skipping`, reaching `94.67% accuracy` on open-sourced `SEAS-FR-DB`.
- Accelerated training by `24%` on `NVIDIA GPGPUs` via `PyCUDA`, with `34.3% power savings` over `CPU-only` runs on a low-end `GeForce 525M`.