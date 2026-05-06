---
title: "Solaris — Multiplayer Video World Model in Minecraft"
description: "First multiplayer video world model generating consistent first-person observations for two players simultaneously, trained on 12.6M frames of coordinated Minecraft gameplay. Published on arXiv, NYU."
date: "2026-02"
tags: ["JAX", "Diffusion Transformer", "Multiplayer", "Minecraft", "Computer Vision", "World Models"]
featured: true
category: "research"
paperUrl: "https://arxiv.org/abs/2602.22208"
liveUrl: "https://solaris-wm.github.io/"
metric: "12.6M"
metricLabel: "Multiplayer Frames"
media:
  - type: 'image'
    src: 'https://solaris-wm.github.io/static/img/solaris-system-outer.png'
    alt: 'SolarisEngine Overview'
    caption: 'SolarisEngine Framework Architecture'
  - type: 'image'
    src: 'https://solaris-wm.github.io/static/img/dataset-plots.png'
    alt: 'Dataset statistics across 12.6M frames'
    caption: 'Breakdown of dataset by episode task categories, types, and lengths'
  - type: 'image'
    src: 'https://solaris-wm.github.io/static/img/arch.png'
    alt: 'Solaris Model Architecture Diagram'
    caption: 'DiT block modified for multiplayer visual interleaving'
  - type: 'image'
    src: 'https://solaris-wm.github.io/static/img/memory_plot.png'
    alt: 'Peak HBM memory usage comparison'
    caption: 'Peak HBM memory for Naive Self Forcing vs Checkpointed variant'
---

## Overview

Solaris is the **first multiplayer video world model**, generating consistent first-person observations for two players simultaneously in Minecraft. We trained it on **12.6M frames** of coordinated gameplay collected through SolarisEngine, a scalable data collection framework we built from scratch. I authored the episode creation logic and action-based gameplay routines — carefully curated to cover the full distribution of multiplayer interactions the model needed to learn, from cooperative building to adversarial combat, movement, and mining. The system uses a staged training pipeline combining bidirectional, causal, and Self Forcing objectives, and outperforms existing baselines across all evaluation categories. Everything is open-sourced: engine, models, datasets, and evaluation benchmarks.

## Key Contributions

- **SolarisEngine**: A scalable multiplayer data collection system built on Mineflayer with Docker-based parallel orchestration, producing **9,240 episodes** and **12.64M action-annotated frames** at 20 FPS — establishing the world's first open-source multiplayer world-model dataset. I designed and implemented the episode creation logic — highly curated gameplay routines purpose-built to satisfy each training requirement of the model, covering cooperative building, adversarial PvP/PvE combat, coordinated movement, and mining with varied terrain, weather, and time-of-day conditions to maximize visual diversity. Authored 30 episode types with deterministic YAML specs and automated QC (visibility %, distance, FPS) achieving a **92% QC pass rate**.
- **Multiplayer Architecture**: Modified Diffusion Transformer blocks with interleaved multiplayer self-attention, per-player 3D rotary position embeddings, and zero-init learned player ID gating. Built on MatrixGame 2.0. **Reduced cross-view mismatch by 22%** over all baselines.
- **Checkpointed Self Forcing**: A memory-efficient Self Forcing variant that decouples autoregressive rollout from backpropagation via cached frame recomputation, cutting training memory from O(Lt·Ls) to O(Lt) and enabling long-horizon video generation at scale. I contributed to the training pipeline supporting this stage by curating targeted evaluation episodes used to diagnose and eliminate visual artifacts during Self Forcing training, helping dial in stable long-horizon generation.
- **Solaris Eval**: A multiplayer evaluation framework testing 5 capabilities — movement, grounding, memory, building, and consistency — using VLM-as-judge scoring across 7 held-out ground-truth episodes, **achieving ≥92% ground-truth accuracy**. Proposes new metrics beyond PSNR/LPIPS/FID: temporal-LPIPS, Identity Consistency, Cross-View Consistency, Semantic Causality, and Reappearance Latency.

## Architecture

The system uses a Diffusion Transformer (DiT) with flow matching, initialized from MatrixGame 2.0 and extended for multiplayer:

1. **Interleaved multiplayer self-attention** with tokens from all players concatenated in shared attention blocks
2. **3D rotary position embeddings** applied independently per player
3. **Learned player ID embeddings** for distinguishing between agents
4. **Staged training**: single-player pretraining, then multiplayer fine-tuning with Diffusion Forcing, then Self Forcing for long-horizon stability

## Tech Stack

- **Model**: Diffusion Transformer (DiT) with flow matching, built on MatrixGame 2.0
- **Framework**: JAX
- **Data Engine**: SolarisEngine — Mineflayer + Minecraft Java client, Docker Compose orchestration
- **Training**: Google TPU (TRC program), Checkpointed Self Forcing, gradient checkpointing
- **Evaluation**: VLM-based scoring + FID metrics across 5 multiplayer capability benchmarks
