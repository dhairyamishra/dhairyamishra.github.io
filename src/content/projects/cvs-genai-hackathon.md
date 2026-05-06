---
title: "CVS GenAI Hackathon — Alt-Text Compliance"
description: "Awarded 1st Prize at the CVS GenAI Hackathon (Aug 2023) for a proof-of-concept ML transformer application that generates and compares image alt-text and tests it for accessibility compliance. Productionized into the CVS image-to-alt-text CI pipeline."
date: "2023-08"
tags: ["Hugging Face", "Transformers", "Hackathon", "Accessibility", "Computer Vision"]
featured: false
category: "ml-ai"
metric: "1st Prize"
metricLabel: "Aug 2023"
---

## Overview

Won 1st Prize at the CVS GenAI Hackathon (New York, NY — August 2023) for a proof-of-concept application using ML transformers to generate and compare alt-text for images and test them for WCAG/ADA accessibility compliance. The PoC paired Hugging Face vision-language captioning with sentiment analysis to flag both coverage gaps and tone issues.

## Outcome

- **1st Prize, CVS GenAI Hackathon (Aug 2023)**
- Validated the technical approach for transformer-driven accessibility validation at enterprise scale
- Productionized into the [Image-to-Alt-Text CI Automation](/projects/cvs-ai-ci) pipeline at CVS Health, where it was rolled out across the accessibility org and reduced downstream defects by 15%

## Tech Stack

- **AI/ML**: Hugging Face Transformers, vision-language models, sentiment analysis
- **Backend**: Python
- **Validation**: WCAG/ADA compliance rules
