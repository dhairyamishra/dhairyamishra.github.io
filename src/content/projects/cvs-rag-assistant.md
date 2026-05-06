---
title: "RAG Support Assistant"
description: "Internal RAG-powered support assistant with Slack integration, OpenAI, and ChromaDB. Hosted on CVS Enterprise GCP via Terraform + ArgoCD; reduced manual ticket resolution time by 20%."
date: "2024-03"
tags: ["RAG", "OpenAI", "ChromaDB", "Slack", "Terraform", "ArgoCD", "GCP", "LLM", "Python"]
featured: false
category: "ml-ai"
metric: "20%"
metricLabel: "Faster Resolution"
---

## Overview

Built an internal Retrieval-Augmented Generation (RAG) support assistant at CVS Health that integrates with Slack to provide self-serve troubleshooting for engineering teams. The system uses OpenAI for generation and ChromaDB for vector storage, with secured governance, and is hosted on CVS Enterprise GCP clusters via Terraform and ArgoCD.

## Key Features

- **Slack Integration**: Native Slack bot for seamless team interaction
- **RAG Architecture**: ChromaDB vector store for document retrieval, OpenAI for answer generation
- **Self-Serve Troubleshooting**: Teams can resolve common issues without filing tickets
- **Context-Aware Responses**: Retrieves relevant documentation and past solutions
- **Secured Governance**: Enterprise auth, request audit logs, and content guardrails

## Impact

- **20% reduction** in manual ticket resolution time
- Accelerated onboarding for new team members
- Reduced load on platform support teams
- Improved knowledge discoverability across the engineering organization

## Tech Stack

- **AI/ML**: OpenAI API, ChromaDB (vector database), RAG pipeline
- **Integration**: Slack Bot API
- **Backend**: Python, FastAPI
- **Infrastructure**: GCP (CVS Enterprise clusters), Terraform, ArgoCD
- **Data**: Internal documentation corpus, runbook collection
