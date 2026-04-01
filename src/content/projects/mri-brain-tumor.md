---
title: "MRI Brain Tumor Detection & Segmentation"
description: "Multimodal MRI classification and segmentation model trained on BraTS dataset with shared encoder, achieving 91.3% accuracy and 97.1% sensitivity."
date: "2025-10"
tags: ["PyTorch", "Computer Vision", "Medical Imaging", "FastAPI", "BraTS"]
featured: true
category: "ml-ai"
github: "https://github.com/dhairyamishra"
metric: "91.3%"
metricLabel: "Accuracy"
thumbnail: "/images/projects/mri-brain-tumor/thumbnail.svg"
media:
  - type: "diagram"
    src: "/images/projects/mri-brain-tumor/architecture.svg"
    alt: "Shared encoder architecture diagram"
    caption: "Shared encoder architecture — single backbone for classification and segmentation"
  - type: "image"
    src: "/images/projects/mri-brain-tumor/results.svg"
    alt: "Model performance metrics chart"
    caption: "Performance benchmarks across classification, sensitivity, dice score, and inference speed"
  - type: "mermaid"
    code: "flowchart LR\n  A[MRI Input] --> B[Preprocessing]\n  B --> C[Shared Encoder]\n  C --> D{Tumor?}\n  D -->|Yes| E[Segmentation Head]\n  D -->|No| F[No Tumor]\n  E --> G[Pixel Mask]\n  C --> H[Classification Head]\n  H --> D"
    caption: "Inference pipeline — conditional segmentation activated only when tumor is detected"
---

## Overview

Built a production-ready multimodal MRI classification and segmentation pipeline trained on the **BraTS dataset**. The model uses a shared encoder architecture for both tumor classification and pixel-level segmentation, achieving strong performance across both tasks simultaneously.

## Results

| Metric | Score |
|--------|-------|
| Classification Accuracy | **91.3%** |
| Sensitivity | **97.1%** |
| Dice Score (Segmentation) | **76.5%** |
| Model Parameters | **31.7M** |
| Inference Speedup | **~40% faster** vs separate models |

## Key Features

- **Shared Encoder Architecture**: Single backbone for both classification and segmentation reduces parameter count and inference time
- **Conditional Segmentation**: Segmentation head activates only when tumor is detected, optimizing inference
- **One-Command Pipeline**: Productized training-to-demo pipeline with automation across 6 stages, 4 smart prompts, and 25/25 passing tests
- **API Endpoints**: 11 FastAPI endpoints for model inference, health checks, and data management

## Tech Stack

- **ML**: PyTorch, torchvision, BraTS dataset
- **API**: FastAPI, Uvicorn, Pydantic
- **Testing**: pytest with 25/25 test coverage
- **Optimization**: Conditional inference, shared encoder, mixed precision
