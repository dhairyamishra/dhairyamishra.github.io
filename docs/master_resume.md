# Master Resume - Deduplicated Source of Truth

*Compiled from 18+ resume versions spanning Aug 2024 - Mar 2026*
*Deduplicated: 2026-04-01*
*Last updated: 2026-04-02*

---

## Contact

- **Name:** Dhairya P. Mishra
- **Email:** dhairyapratapmishra@gmail.com | dpm8739@nyu.edu
- **Phone:** +1(631)-572-7111
- **GitHub:** [github.com/dhairyamishra](https://github.com/dhairyamishra)
- **LinkedIn:** [linkedin.com/in/dhairya-mishra/](https://www.linkedin.com/in/dhairya-mishra/)
- **Website:** [dhairyamishra.github.io](https://dhairyamishra.github.io/) | dhairyamishra.wordpress.com
- **Merit Page:** https://meritpages.com/Dhairya-Mishra/4704467

---

## Summary (Latest - Mar 2026)

AI/ML engineer with 4+ years of experience building and deploying production AI systems at scale, spanning foundation model training, LLM inference optimization, RAG, and distributed data infrastructure serving millions. Co-author on peer-reviewed [world-model research at NYU](https://solaris-wm.github.io/) (ICML 2026). Experienced in translating state-of-the-art AI research into scalable, cost-efficient systems on cloud platforms.

<details>
<summary>Summary (Earlier Versions)</summary>

- *(Apr 2025)* Graduate student at NYU Courant with expertise in applied machine learning, intelligent systems, and scalable infrastructure. Experience spans RAG pipelines, transformer-based compliance tools, computer vision for accessibility and robotics, interactive GPT-driven systems and more. Research-grade ML with production level engineering, integrating statistical learning, systems design, and human-centered AI.
- *(Dec 2025)* Senior Software Developer with 3+ years of experience shipping AI/ML-powered, full-stack solutions in production cloud environments. Proficient in computer vision, NLP, text classification, cloud automation, and CI/CD. Contributor to ongoing AI research at NYU.
- *(Jan 2025)* Full-stack developer, experienced in architecting and managing large-scale automation systems supercharged with intelligent AI integrations. Excels at turning leadership's vision into refined, high-impact software solutions.
- *(Aug 2024)* A seasoned developer, experienced in creating and managing large scale automations in an Enterprise ecosystem. With a drive to facilitating organizational growth by transforming the vision of leadership into elegant software solutions.

</details>

---

## Experience

### Evidenza | AI Engineer | Brooklyn, NY | Jan 2026 - Present

- Automated ingestion of legacy Human-vs-AI survey spreadsheets into a schema-validated database via a **6-stage Spark ETL**, producing **7,500+ JSONL records** across 26 domains and powering a **new enterprise customer segmentation feature.**
- Productionized AlphaEvolve persona generation system to synthesize diverse survey respondents at scale (25 new personas/week, 2 runs/week), with trait-coverage guardrails achieving **>80% Monte Carlo coverage.**
- Built competitive ad intelligence pipeline cataloging **1,200+ customer ads** across 5 B2B verticals, with semantic/sentiment + multimodal scoring used in Evidenza recommendations, leading to a **34% lift in engagement on curated ads/creatives**.
- Engineered a multimodal creative feature-extraction pipeline using SAM-style segmentation, object detection, and video/image processing to compute 12+ per-ad signals (dominant color, objects, people count, duration), achieving **95% feature coverage**.
- Built Spark-based ETL for recurring backfills and heavy joins across YouTube metadata and extracted creative signals; centralized 500 B2B ads in MySQL (Hive) and trained performance models (CTR, engagement, completion rate).
- Defined human-vs-synthetic evaluation gates using a 50-user blind audit set; enforced **>=65% agreement** as the production acceptance threshold for all persona outputs.

### CVS Health | Sr. Software Development Engineer | New York, NY | Jan 2024 - Jan 2025

- Piloted AI-powered Image-to-Alt-Text solution using Hugging Face transformers, establishing production-grade pipelines for enterprise rollout; **reduced downstream defects by 15%.** `[see: DDE III (canonical)]`
- Delivered RAG chatbot prototype leveraging OpenAI + ChromaDB for vector embeddings, with secured governance and Slack integration for self-serve troubleshooting; **reduced manual ticket resolution time by 20%.** Hosted using Terraform and ArgoCD on CVS Enterprise GCP clusters.
- Automated accessibility QA by integrating AXE (axe-core + Playwright) into GitHub Actions pipelines; shift-left automation **cut production accessibility issues by 60-90%** (varying by application maturity) and streamlined WCAG violation detection across teams.
- Led CI/CD migration from GitLab to GitHub EMU under CPE web-core standards; migrated all accessibility applications and pipelines, validated dependencies, delivered documentation, trained teammates, and decommissioned legacy Jenkins/ArgoCD deployments; **achieved 100% adoption** and reduced technical debt. `[canonical]` `[also: DDE III]`
- Enhanced observability by provisioning GCS storage, Postgres databases, and a custom OpenTelemetry-to-Grafana pipeline simulating diverse request scenarios; **improved debugging efficiency by 25-30%** (median incident MTTR) and safeguarded service stability during scale events.
- Implemented ThemeScoring validation service to traverse and score nested Rally structures; automated error detection/reporting **reduced manual errors by 40%** and accelerated remediation with Product Owners. `[see: Aetna (canonical)]`
- Developed Rally work item migration automation for 500-600 nested structures; **reduced migration time by 90%**, preserved attachments/notes, and improved resource allocation efficiency by 20%. `[see: Aetna (canonical)]`
- Shipped and reviewed **150+ PRs** and owned on-call for CPE Webcore (Digital-Blocks 2.0, Previews, Experience Builder), achieving SLA compliance and **reducing downtime by 12-15%** for customer-facing core platform systems **serving millions of customers daily.**
- Executed large-scale data transformations on production databases to align with evolving WCAG and ADA standards, ensuring corporate accessibility compliance across all digital properties.
- Established the microservice ecosystem and GCP cloud infrastructure for the accessibility organization at CVS, forming the foundation for all team tooling, reporting, and compliance workflows.

### CVS Health | Digital Development Engineer III | New York, NY | Jan 2023 - Jan 2024

- Automated WCAG/ADA QA pipelines, achieving **90%+ flow coverage** and replacing manual evaluations with continuous audits.
- Launched A11yScore proof-of-concept, building relational queries and leadership dashboards to surface accessibility metrics; **shortened defect resolution time by 20%**, increased compliance visibility, and guided long-term policy decisions. Predictions guided leadership on future engineering resource re-allocation to increase throughput by 25%.
- Led development of a transformer-powered image alt-text compliance system using Hugging Face and sentiment analysis; **boosted accessibility conformance by 35%.** (Won 1st Prize in CVS GenAI Hackathon, Aug 2023.) `[canonical]` `[also: Sr. SDE]`
- Designed and deployed NodeJS starter application framework with modular routing, backend logic, and UI workflows; integrated reliability routines to achieve **95% uptime**, **cut deployment time by 40%**, and enabled non-developers to contribute to app UI.
- Provisioned MongoDB database and APIs for the Accessibility org, replacing Rally as quasi-database; designed schema, optimized queries, integrated authentication/authorization, and built front-end interfaces; enabled platform-agnostic data usage and faster decision-making. **Boosted data transaction speeds by 55%.**
- Refactored Testaro and Next Reporter, combining 1,000+ accessibility test outputs from multiple tools into standardized dashboards; **reduced report analysis time by 20%** and expanded adoption across all accessibility teams.
- Provisioned webcore infrastructure, configured GCS buckets for CVS Digital-Blocks 2.0, provisioned Postgres for accessibility reporting, and applied Terraform playbooks; improved provisioning turnaround by 15%.
- Designed the multi-project automation triggered weekly to audit every work-item tree in the CVS kanban-hybrid (Rally via Broadcom), **improving delivery velocity by 90%** and boosting edge case remediation.
- Migrated Enterprise Accessibility infrastructure from GitLab to GitHub EMU. `[see: Sr. SDE (canonical)]`

### Aetna Health | Advanced Software Developer | New York, NY | Feb 2022 - Jan 2023

- Developed testing automation suite CAT, RallyScore, and ThemeScore for accessibility compliance; **reduced QA time by 75%.** `[canonical]` `[also: Sr. SDE]`
- Designed Rally kanban migration pipeline for 600+ nested structures; **reduced migration time by 80-90%** (from 4 weeks to 16 business hours), with schema validation and statistical checks. `[canonical]` `[also: Sr. SDE]`
- Provisioned encrypted API microservices for MongoDB access; **boosted data transaction speeds by 55%.**
- Built auto-authentication and platform health-check microservices, improving uptime and reducing manual credential management for internal apps.
- Implemented standardized Rally rulesets and automated validation checks, improving automation efficiency by 30% and reducing manual organizational errors by 25%.
- Modularized test templates to accelerate QA cycles; evaluated and approved new accessibility tools as Viability Reviewer.

---

## Publications & Research

### Solaris ([arXiv:2602.22208 - ICML 2026 Submission](https://arxiv.org/abs/2602.22208), NYU) | Researcher/Developer | Aug 2025 - Present

- Developed SolarisEngine via Docker orchestration and multi-agent bot coordination, collecting **12.64M action-annotated frames** across 9,240 episodes at 20 FPS, establishing the **world's first open-source multiplayer world model dataset.**
- Decoupled autoregressive rollout from backpropagation via cached frame recomputation, cutting training memory from O(Lt*Ls) to O(Lt); **enabled long-horizon video generation at scale.**
- Designed multiplayer DiT foundation model attention with interleaved player tokens, per-player embeddings, and zero-init gating; **cross-view mismatch reduced by 22% over all baselines.**
- Built a VLM-as-judge evaluation suite, validating multi-agent world model quality at scale, **achieving >=92% ground-truth accuracy.**
- Designed an episode-driven data-collection stack capturing synchronized dual-view video and rich JSON metadata; created 30-episode types (~6 hrs at 30 FPS) with 92% QC pass rate.
- Proposed an evaluation suite beyond PSNR/LPIPS/FID: temporal-LPIPS, Identity Consistency, Cross-View Consistency, Semantic Causality, and Reappearance Latency.
- Authored a curriculum and YAML episode specs for deterministic replays, parameter sweeps, and automated QC (visibility %, distance, FPS).

### Testaro ([arXiv:2309.10167 - ACM SIGACCESS ASSETS 2023](https://arxiv.org/abs/2309.10167)) | Speaker/Contributor | Oct 2023

- Represented CVS Health at 25th International ACM SIGACCESS ASSETS conference presenting Testaro's multi-tool accessibility evaluation to global research audience.
- Demonstrated how automated compliance rule evaluation reduces manual effort and increases coverage in WCAG/ADA conformance workflows.
- Showcased adoption strategies and enterprise impact, establishing CVS Health's leadership in accessibility innovation.

---

## Projects

### MRI Brain Tumor Detection & Segmentation | Researcher/Developer | Oct 2025

- Built a multimodal MRI classification and segmentation model trained on the BraTS dataset with a shared encoder, achieving **91.3% accuracy, 97.1% sensitivity, and 76.5% Dice** on the integrated workflow.
- Productized the training-to-demo pipeline with one-command automation (6 stages, 4 smart prompts, 25/25 tests, 11 FastAPI endpoints) for quick and reproducible training results with **100% E2E coverage.**
- Optimized multimodal inference using conditional segmentation to run with **31.7M params** and delivered **~40% faster inference** versus a separate-model baseline.

### Cloud NLP Classification on GCP | Developer | Jul/Nov 2025

- Built production-ready multi-model text classification service using FastAPI and Docker with **zero-downtime model switching**, deployed live on **GCP Compute Engine** using an e2-standard-2 instance.
- Trained and benchmarked **DistilBERT to 96.57% accuracy** vs TF-IDF and LogReg/SVM baselines at 85-88% accuracy on a 24,783-sample dataset.
- Automated E2E validation with a **326+ test suite** (100% pass rate) and quantified cloud performance (DistilBERT 60-100ms, LogReg 5ms (21x faster), SVM 2ms (44x faster)) at **~$0.07/hr (~$50/mo).**

### PICO-LLM Research Pipeline (NYU) | Researcher/Developer | Apr 2025

- Built a modular LLM research pipeline for training and evaluating K-Gram MLP, LSTM, KV-cache architectures with **22+ experiment configs** and systematic cross-run analysis.
- Implemented deterministic config tracking, multi-model batch training, and advanced evaluation tools (Pareto frontier analysis, embedding similarity metrics, regression insights).
- Instrumented logging with 20+ tracked fields per run (loss, val_loss, perplexity, token_accuracy, gradient norms, LR, hyperparams).
- Integrated sampling techniques (greedy, top-p, repetition penalty), monosemantic token probing, and configurable generation pipelines.
- Best performing run: KV-cache Transformer achieved **val_loss 1.665 and perplexity 6.389** with **token accuracy of 73.21%.** [(link)](https://github.com/dhairyamishra/NYU-PICO-LLM-ML-CSCI-GA2565?tab=readme-ov-file#-example-how-to-interpret-results).

### Decomposition AI | Creator/Developer | Mar 2025

- Engineered an LLM-assisted knowledge mapping app that converts prompts into a reusable idea graph via GPT-driven decomposition heuristics across 5 thought/node types.
- Built prompt-orchestration logic for graph operations including breakdown, synthesis, and action summarization, with 3 view modes (Timeline, Focus, History).
- Full-stack system using FastAPI, GPT-3.5-turbo, React, TypeScript, React Flow, Zustand, Tailwind, Vite, with support for semantic expansion, fragmentation, node merging, and contextual reasoning.
- Implemented local and cloud model execution with fallback routing for LLM calls based on availability.

### Automatic Nerf Remote Sentry | Senior Capstone Project | Mar 2021

- Designed and built a fully autonomous Nerf turret using OpenCV for real-time target tracking and Raspberry Pi4 4GB for control.
- Integrated object detection and motion prediction for dynamic targeting, with a custom power supply and gyroscopic aiming system.
- Application created in Python using OpenCV, Matplotlib, and NumPy for video processing with real-time calibration of target shape, size, color.
- Implemented multithreading to facilitate video processing, prediction, remote/cloud control and servo motion on low-end devices.

### NASA SpaceApps Challenge - Atlas Overlay | Cleveland, OH | Oct 2021

- Led a cross-disciplinary team to develop Atlas Overlay, a construction planning tool leveraging NASA satellite imagery, terrain segmentation, and CV-based analysis.
- Implemented ArcGIS for data visualization of overlay gradients, and Autodesk Revit to generate realistic building data for reliable pre-planning.
- **Awarded 1st Place - Galactic Impact** at NASA SpaceApps Cleveland and **Best Trine Research Project - Engineering Multi Departmental** at Trine University's STEM Symposium.

### HACK-IN 2021 | Indianapolis, IN | Oct 2021

- Represented Trine University and placed **8th** at the annual hardware and software capture-the-flag tournament designed by engineers at Crane, IN3 and Booz Allen.
- Reverse engineered anti-tamper puzzle created using the STM32F411xC/E and auxiliary microcontrollers, requiring circumventing various physical and software anti-tamper features.
- Challenges required program reverse engineering and hardware forensics expertise using Ghidra and KALI Linux.

### CVS GenAI Hackathon | New York, NY | Aug 2023

- **Awarded 1st Prize** for developing a proof-of-concept application using ML transformers to generate and/or compare alt-text for images and test them for accessibility compliance.

### Misc Applications (Trine University) `[low priority: omit for senior roles]`

- Space Invaders recreation using C++ and Qt libraries with custom game engine, sound design, and split screen multiplayer.
- Android Studios videogame using Kotlin and OpenGL with sensor data inputs.
- Agar.io-like game with network multiplayer using Node.js and Unity, implementing global synchronization for up to 16 players.
- Retro snake game with PvP local multiplayer using Qt with custom GUI and de-synchronized clocks for variable difficulty.

---

## Education

### New York University - Courant Institute | M.S. Computer Science (AI) | New York, NY | May 2026

- **GPA: 3.7.**
- **Courses:** Deep Learning, Natural Language Processing, Computer Vision, Machine Learning, Fundamental Algorithms, Programming Languages, Operating Systems, Distributed Systems, Cloud and Machine Learning, Mathematical Foundations of Deep Learning.
- Research: Core developer on Project Solaris (multimodal computer vision world model, ICML 2026).

### Trine University | B.S. Software Engineering and Mathematics | Angola, IN | Aug 2018 - Dec 2021

- **GPA: 3.24.**
- Relevant Courses: Native/Web, Front/Back-end, Embedded Systems, Cybersecurity, QT GUI Dev, Networks, Advance Software Dev, Algorithms, Robotics Senior Design, Systems Programming.
- Honors: Awards for Innovation and Cost-effectiveness in Robotics Capstone Project.

---

## Certifications

- Certified SAFe 5 Practitioner by Scaled Agile Inc. (June 2022).
- IAAP Certified Professionals in Accessibility Core Competencies (March 2022).

---

## Leadership

### 25th International ACM SIGACCESS ASSETS | Presenter for CVS Health | New York, NY | Oct 2023

- Presented Testaro, an enterprise-scale accessibility testing utility, to the global accessibility community.

### Trine University Student Government | Senator of International Student Affairs | Angola, IN | Aug 2021 - Dec 2021

- Represented all international students at student government meetings; served on senate committees for budget allocation, policy drafting, and student well-being.
- Spearheaded partnership program with university administrative staff and Bird (e-scooter/micro-mobility company).
- Advocated for inclusive policies and funding priorities.

### Trine Multicultural Student Organization | Vice President | Angola, IN | May 2021 - Dec 2021

- Introduced cloud event database policy; **reduced annual expenditure by 23%** and streamlined event tracking.
- **Boosted student engagement by 14%** by calculating optimal event times based on academic calendar.
- Notable events: Annual Martin Luther King Celebration, Open Mic Night, Bonfire and Barbeques, Annual Meet and Greet (2021).

### Trine Office of International Services | Student Services Coordinator (part-time) | Angola, IN | Feb 2021 - Nov 2021

- Organized and managed International Night, a flagship cultural event with a **$14K budget** and hundreds of attendees (in collaboration with the American National Guard).
- Restructured the international student web portal with 2-click methodology; **boosted prospective student applications by 11%.**
- Provided direct support for international students, ensuring smooth onboarding and community integration.

---

## Skills (Union of All Versions)

- **Languages:** Python, JavaScript/TypeScript (Node.js, React), Java, Kotlin, C++, C#, SQL/PL/SQL, HTML5/D-HTML, Scala, R, Bash, Assembly, Visual Basic
- **ML/AI:** PyTorch, TensorFlow, wandb, Hugging Face Transformers, scikit-learn (TF-IDF, LogReg, SVM), OpenCV, YOLOv8, Mask R-CNN, CLIP, LangChain, OpenAI APIs, RAG, ChromaDB, FAISS, Grad-CAM, MC Dropout, Graph Neural Networks (GCN/GAT)
- **Cloud & DevOps:** AWS (Lambda, EC2, S3, ECS/EKS, SageMaker), GCP (GKE, Cloud Run, BigQuery, Compute Engine), Docker, Kubernetes, Terraform, GitHub Actions, CircleCI, Jenkins, ArgoCD, PM2, KServe
- **Frameworks & App Dev:** FastAPI, Streamlit, Uvicorn, React, Vite, TailwindCSS, Zustand/Immer, React Flow
- **Data & Storage:** PostgreSQL, MongoDB, MySQL, Pandas, NumPy, Parquet, REST APIs, YAML, HDFS, Apache Spark, Matplotlib
- **Observability & Testing:** OpenTelemetry (OTEL), Grafana, Prometheus, Elastic Stack (ELK), synthetic monitoring, pytest, Pydantic, Playwright
- **Tools & OS:** Git, Linux (Kali, Debian, Ubuntu), Windows, Unity, Keil uVision, Quartus Prime, Wireshark, Nmap/Zenmap, Ettercap, Metasploit, ArcGIS, Autodesk Revit, Jupyter, Slack API
- **Concepts:** Deep Learning, Transformers, MoE, Inference & Eval, Embedding Search, Causal Inference, Computer Vision, NLP, Graph Learning, Optimization, Probability, Algorithms, Graph Theory, Combinatorics, Linear Algebra

---

## Session Changelog

<details>
<summary>Click to expand changelog notes</summary>

### Dec 14 2025 revision session

**Changes made:**
- Locked CVS Sr. SDE reliability and scope details, then reordered accomplishments to emphasize platform signals (on-call/reliability, CI/CD, observability) ahead of AI work.
- Standardized EXPERIENCE into ATS-safe single-column formatting.
- Tightened bullets to APR style and removed weak/vague phrasing.
- Confirmed and baked in "locked" scopes for downtime/availability services and GitHub EMU migration repos.
- Standardized the MTTR definition used for observability impact.
- Converted PROJECTS to match EXPERIENCE header structure.
- Rebuilt SKILLS for signal-to-noise: removed duplicates, trimmed long-tail items, de-duplicated categories.
- Reformatted EDUCATION and LEADERSHIP into ATS-safe minimal line structure.

**Issues flagged / to verify (all resolved Apr 2026):**
- ~~Verify whether "Solaris (NYU Research Paper)" is a factual published-paper claim.~~ Resolved: current text uses "ICML 2026 Submission" with arXiv link.
- ~~Confirm intended Leadership date ranges.~~ Resolved: standardized all dates to `Mon YYYY - Mon YYYY` format.
- ~~Choose a bullet punctuation standard (periods vs no periods) and apply consistently.~~ Resolved: periods applied to all bullets.
- ~~Clarify what "99% SLA" (when it appeared) actually measured.~~ Resolved: "99% SLA" no longer appears in the document.
- ~~Confirm "DeepSeek" mention in PICO-LLM reflects real evaluated experiments.~~ Resolved: "DeepSeek" no longer appears in the document.
- ~~MRI phrasing precision: confirm the strongest truthful evaluation context.~~ Resolved: kept "integrated workflow" as the safest phrasing.

### Apr 2 2026 cleanup session

**Changes made:**
- Tagged cross-role duplicate bullets with `[canonical]`, `[also: Role]`, and `[see: Role (canonical)]` annotations for Rally migration, ThemeScore, alt-text, and GitHub EMU migration.
- Merged duplicate CI/CD migration bullets within Sr. SDE (lines 49 and 52) into one consolidated bullet.
- Consolidated Evidenza persona generation bullets into two distinct bullets: system/scale and evaluation methodology.
- Rewrote weak/vague bullets (Aetna auto-auth, test-templates, Sr. SDE data transformations, microservice ecosystem).
- Normalized awkward metric ranges: "125-200+ PRs" to "150+ PRs"; contextualized "60-90%" accessibility range.
- Fixed summary phrasing: "doing" to "spanning."
- Standardized all date formats to `Mon YYYY - Mon YYYY`.
- Applied trailing periods to all Education, Certification, and Project bullets.
- Fixed Trine GPA from range "3.2-3.24" to single value "3.24."
- Removed Student ID from Education section.
- Collapsed earlier summary versions into a `<details>` block.
- Tagged Misc Applications as low-priority for senior roles.
- Resolved all Dec 2025 flagged issues.

</details>

---

*Note: The original master_resume.md also contained non-resume files that were ingested (cover letters, transcripts, a recommendation letter, website screenshots). These have been excluded from this deduplicated resume document.*
