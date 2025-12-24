# Portfolio Website Implementation Plan
## Astro + FastAPI + Streamlit on GCP (Compute Engine VM)

**Last Updated:** December 21, 2025  
**Version:** 2.0 (Python-First Architecture)  
**Target Platform:** Google Cloud Platform  
**Primary Deploy:** Compute Engine VM + Docker Compose + Nginx (host reverse proxy)  
**Repo Style:** Monorepo (multi-service, production-ready)

---

## 📋 Table of Contents

1. [Executive Summary](#executive-summary)
2. [Architecture Overview](#architecture-overview)
3. [Key Design Decisions](#key-design-decisions)
4. [Service Responsibilities](#service-responsibilities)
5. [Monorepo Structure](#monorepo-structure)
6. [Implementation Phases](#implementation-phases)
7. [Development Environments](#development-environments)
8. [Dockerization Strategy](#dockerization-strategy)
9. [GCP VM + Persistent Disk Setup](#gcp-vm--persistent-disk-setup)
10. [CI/CD Pipeline](#cicd-pipeline)
11. [Security & Hardening](#security--hardening)
12. [Adding New Projects](#adding-new-projects)
13. [Cost Estimate](#cost-estimate)
14. [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Start: Stage-by-Stage Guides

For detailed step-by-step instructions, follow these stage guides:

- **[Stage 1: Foundation & Architecture](STAGE_1_FOUNDATION.md)** - Phases 0-1: Repository setup and planning
- **[Stage 2: Core Services Development](STAGE_2_CORE_SERVICES.md)** - Phases 2-4: Build Astro, FastAPI, and Streamlit
- **[Stage 3: Containerization & Local Testing](STAGE_3_CONTAINERIZATION.md)** - Phase 5: Docker setup and testing
- **[Stage 4: GCP Deployment & CI/CD](STAGE_4_GCP_DEPLOYMENT.md)** - Phases 6-8: Cloud deployment and automation
- **[Stage 5: Production Hardening & Expansion](STAGE_5_PRODUCTION.md)** - Phases 9-11: Security, monitoring, and growth

---

## Executive Summary

### What You're Building

A single-domain portfolio platform that serves:
- **Fast static portfolio website** (AstroWind template - Astro + Tailwind, customized as portfolio)
- **Production API** for contact + anti-spam + email delivery (FastAPI)
- **Interactive ML demos** (Streamlit) under `/demos`
- **Optional project mini-apps** under `/projects/*` (add later)

### Why This Architecture

- **Single domain + path routing** → no CORS pain, clean UX, better SEO
- **VM + Docker Compose** → full control, easy to host many future project containers
- **Astro static-first** → portfolio loads instantly and ranks well (Lighthouse 100)
- **FastAPI + Streamlit** → Python-first backend + demos, consistent tooling
- **Persistent disk** → separate storage for ML models, datasets, AI outputs

### Project Goals

- ✅ **Fast, professional portfolio site** (projects, experience, resume, contact)
- ✅ **Interactive ML demos** using **Streamlit** (hands-on + educational)
- ✅ **Production-grade API** for contact + anti-spam + email delivery
- ✅ **One-command local dev** (PM2) and **production-parity** local testing (Docker Compose)
- ✅ **CI/CD**: push to `main` → builds images → deploys to GCP VM
- ✅ **Single domain + path routing** to avoid CORS complexity
- ✅ **Full VM control** for future flexibility and customization

---

## Architecture Overview

### High-Level Routing (Single Domain, Path-Based)

```
User Browser
     ↓
HTTPS (yourdomain.com) → Compute Engine VM
     ↓
Nginx (reverse proxy on VM)
     ↓
     ├─→ /                        → web container (nginx serves Astro static, port 8080)
     ├─→ /api/*                   → api container (FastAPI/uvicorn, port 8000)
     ├─→ /demos/*                 → demos container (Streamlit, port 7860)
     ├─→ /projects/chatbot/*      → project container (port 8001)
     ├─→ /projects/cv-app/*       → project container (port 8002)
     └─→ /projects/[name]/*       → project container (port 800X)
```

**All services run on a single VM using Docker Compose, with Nginx as the reverse proxy.**

### Port Plan (Internal Only; Not Publicly Exposed)

| Service | Dev Port | Prod Port | Path | Tech | Exposed Via |
|---------|----------|-----------|------|------|-------------|
| Web | 4321 | 8080 | `/` | Astro + nginx | Host Nginx 443 |
| API | 8000 | 8000 | `/api/*` | FastAPI | Host Nginx 443 |
| Demos | 7860 | 7860 | `/demos/*` | Streamlit | Host Nginx 443 |
| Projects | 8001+ | 8001+ | `/projects/*` | Various | Host Nginx 443 |

**Security best practice:** In production, bind containers to `127.0.0.1` only so only host Nginx is reachable.

### Portfolio as a Platform

- Homepage serves as resume/overview with project gallery
- Each project runs in its own isolated container
- Users navigate from homepage → individual project demos
- Single domain for SEO, easier SSL, cleaner UX

---

## Key Design Decisions

This section is the "why" behind the architecture, so future changes stay consistent.

### 1) Why Microservices?

**Decision:** Split into multiple services: Homepage, API, ML Demos, and individual Project containers.

**Why:**
- **Separation of concerns**: homepage is resume/overview, API is backend logic, demos showcase ML, projects are full-featured apps
- **Independent scaling**: projects may need more resources; homepage stays lightweight
- **Portfolio as a platform**: each project runs in isolation, can use different tech stacks
- **Deployment safety**: updating one project doesn't affect homepage or other projects
- **Professional showcase**: demonstrates microservices architecture and DevOps skills

**Alternative considered:** single combined server  
**Tradeoff:** simpler ops, but tightly coupled deployments and can't showcase individual projects as production apps.

---

### 2) Why Monorepo?

**Decision:** Keep all services in one repository.

**Why:**
- One place to manage versions, issues, docs, and CI/CD
- Easier to share conventions (lint rules, naming, scripts)
- Easier to coordinate changes like "web UI expects `/api/contact`"

**Tradeoff:** repo is bigger, but still manageable with `apps/*` boundaries.

---

### 3) Why Astro for the Web?

**Decision:** Use Astro + TS (with React islands) for frontend.

**Why:**
- **Zero JS by default** → Lighthouse 100 scores, perfect SEO
- **Static HTML** → Instant page loads, ideal for portfolios
- **React islands** → Interactive components only where needed (contact form, filters)
- **Content-first** → Built for portfolios, blogs, marketing sites
- **Fast builds** → Much faster than SPAs for static content
- **TypeScript support** → Full type safety

**Template choice:** Use **AstroWind** as the base UI scaffold to accelerate layout/sections/responsiveness.

**Rendering mode:** Keep **static output** (no SSR) so it deploys as files served by nginx.

**Customization rule:** Treat AstroWind as a theme: remove blog/pages you don't need; keep only portfolio pages + components.

**Production note:** Astro builds to static output and is served by nginx in a container (not Astro dev server).

**Alternative considered:** Vite + React, Next.js  
**Why not:** SPAs ship unnecessary JS; Astro gives better performance and SEO out of the box.

---

### 4) Why FastAPI for the API?

**Decision:** Use FastAPI (Python) for the backend.

**Why:**
- **Python-first stack** → consistent with Streamlit and ML demos
- **Excellent validation** (Pydantic) → type-safe request/response
- **Clean routing** → easy to add endpoints
- **Easy email integrations** → SendGrid/Mailgun Python SDKs
- **Fast** → async support, comparable to Node.js frameworks
- **ML ecosystem** → seamless integration with Python ML libraries
- **Auto-generated API docs** → Swagger/ReDoc built-in
- **Modern Python** → type hints, async/await, dependency injection

**Alternative considered:** Fastify (Node.js)  
**Why not:** Keeping the entire backend in Python simplifies the stack and leverages Python's ML ecosystem.

---

### 5) Why Streamlit for Demos?

**Decision:** Use **Streamlit** for interactive demos.

**Why:**
- **More flexible UI** for "mini apps" and dashboards (filters, charts, layout control)
- Perfect for "demo + explanation + limitations + metrics explorer" style pages
- Streamlit feels like a small product, which complements the portfolio
- Easy to iterate quickly

**Important routing note:** Running under `/demos` requires Streamlit `baseUrlPath="demos"`.

**Tradeoff:** slightly more boilerplate than Gradio for pure model I/O demos.

---

### 6) Why Single Domain + Path Routing?

**Decision:** Route `/`, `/api/*`, `/demos/*`, `/projects/*` under the same domain.

**Why:**
- **CORS-free by design**: frontend calls API with relative paths (`/api/contact`)
- Cleaner UX (one domain feels "professional")
- Centralizes TLS/HTTPS configuration
- Better SEO (single domain authority)

**Alternative considered:** subdomains (`api.yourdomain.com`, `demos.yourdomain.com`)  
**Why not:** path routing is nicer for UX; subdomains can be used later if needed.

---

### 7) Why Compute Engine VM?

**Decision:** Use a single Compute Engine VM with Docker Compose + Nginx.

**Why:**
- **Full control**: SSH access, custom configurations, easier debugging
- **Future flexibility**: Can install any tools, databases, or services needed
- **Predictable cost**: Fixed monthly cost (~$25-30), no surprises
- **Always-on**: No cold starts, instant response times
- **Simpler mental model**: One machine, one nginx, one docker-compose
- **Better for learning**: Hands-on experience with server management
- **Easiest path to host many project containers** under `/projects/*`

**Tradeoff:** More operational overhead (OS updates, security patches, monitoring) compared to serverless.

---

### 8) Why Separate Persistent Disk?

**Decision:** Use a separate Persistent Disk mounted to the VM for large data files.

**Why:**
- **Separation of concerns**: Code (boot disk) vs data (persistent disk)
- **Easy backup**: Snapshot the data disk independently
- **Scalability**: Can resize data disk without touching the OS
- **Performance**: Can choose SSD vs Standard based on workload
- **Cost optimization**: Use cheaper Standard disk for large datasets
- **Data persistence**: If VM is recreated, data disk can be reattached

**What goes on the data disk:**
- Model checkpoints (`.pth`, `.h5`, `.pkl`, `.onnx`)
- Training datasets (images, text, CSV files)
- AI-generated responses and outputs
- User uploads (if applicable)
- Database files (if you add PostgreSQL/MongoDB later)

**What stays on boot disk:**
- OS and system files
- Application code (git repo)
- Docker images
- Nginx configs

---

### 9) Why Docker for Production Parity?

**Decision:** Every service ships as a container.

**Why:**
- VM runs containers; Docker ensures **local == prod** runtime
- Prevents "works on my machine" drift (Node/Python versions, deps)
- Enables reproducible CI/CD builds

---

### 10) Why PM2 Locally?

**Decision:** Use **PM2 for fast local dev**, and docker-compose for integration parity.

**Why PM2:**
- One command to run all services with live logs
- Great when iterating rapidly across web/api/demos without rebuilds
- Hot reload works natively

**Why docker-compose too:**
- Ensures the container runtime behaves like production
- Catches port/binding/env issues before you deploy

---

## Service Responsibilities

### A) Web (Astro + React Islands)

**Tech:** Astro + TypeScript (with React islands)

**Responsibilities:**
- Pages: Home, About, Experience, Projects, Contact
- Content collections or JSON for projects
- React islands only when needed:
  - `ContactForm.tsx` as `client:load`
  - Optional filter/search as `client:visible`
- SEO optimization (built-in)
- Zero JS by default for maximum performance

**Ports:**
- **Development:** `4321` (Astro dev server)
- **Production:** `8080` (nginx serves static build)

**Nginx proxies:** `/` → `http://127.0.0.1:8080`

---

### B) API (FastAPI)

**Tech:** Python + FastAPI + Pydantic

**Responsibilities:**
- `GET /api/health` → `{status: "ok"}`
- `POST /api/contact` → validates payload + anti-spam + sends email
- Optional: analytics, project metadata API

**IMPORTANT - Path Prefixing:**
- Nginx: `location /api/` → `proxy_pass http://127.0.0.1:8000/api/;`
- FastAPI routes MUST include `/api` prefix: `@app.get("/api/health")`
- This prevents `/api/api/health` duplication
- Alternative: Use FastAPI `APIRouter` with `prefix="/api"` and define routes without prefix

**Contact anti-spam (do this early):**
- Honeypot field (cheap + effective)
- Rate limit by IP (basic)
- Optional later: CAPTCHA if spam appears

**Email delivery options:**
- **Simplest:** SendGrid/Mailgun API (via Python SDK)
- **Alternate:** SMTP (less ideal in production)

**Port:** `8000` (both local and production)

**Nginx proxies:** `/api/*` → `http://127.0.0.1:8000/api/`

**Secrets handling on VM:**
- Store in a protected file on VM: `/etc/portfolio/.env` (chmod 600)
- Docker Compose reads it via `env_file`

---

### C) Demos (Streamlit)

**Tech:** Python + Streamlit

**Responsibilities:**
- Interactive ML demos (2–3 initially)
- Educational content: "How it works", "Limitations"
- Showcases ML/AI capabilities

**Must-have config for /demos:**

Create `apps/demos/.streamlit/config.toml`:

```toml
[server]
baseUrlPath = "demos"
enableCORS = false
enableXsrfProtection = true
headless = true
```

**UX structure (recommended):**
- Sidebar navigation: "Overview", "Demo 1", "Demo 2", "How it works", "Limitations"
- Keep models small / cached for performance
- Load artifacts from `/mnt/data/models` (mounted read-only)

**Port:** `7860` (both local and production)

**Nginx proxies:** `/demos/*` → `http://127.0.0.1:7860/`

---

### D) Project Containers (Individual Projects)

**Tech:** Various (React, Next.js, Flask, FastAPI, etc.)

**Responsibilities:**
- Full-featured project demos
- Each project is a complete, production-ready application
- Isolated from other projects (own container, own port)

**Ports:** `8001`, `8002`, `8003`, etc. (one per project)

**Nginx proxies:** `/projects/[name]/*` → `http://127.0.0.1:800X`

**Example Projects:**
- `/projects/chatbot` → AI chatbot with RAG (Python + React)
- `/projects/cv-app` → Computer vision analyzer (Streamlit)
- `/projects/game` → Real-time multiplayer game (Node.js + WebSocket)

---

## Monorepo Structure

```
portfolio/
├── apps/
│   ├── web/                      # AstroWind-based Astro site (static build served by nginx)
│   │   ├── src/
│   │   │   ├── pages/
│   │   │   │   ├── index.astro   # Home (hero, skills, featured projects)
│   │   │   │   ├── projects/
│   │   │   │   │   └── index.astro  # Projects gallery
│   │   │   │   ├── about.astro   # Bio, experience
│   │   │   │   └── contact.astro # Contact page
│   │   │   ├── components/
│   │   │   │   ├── ProjectCard.astro  # Static project cards
│   │   │   │   ├── ContactForm.tsx    # React island (client:load)
│   │   │   │   └── ProjectFilter.tsx  # React island (client:visible)
│   │   │   ├── layouts/
│   │   │   │   └── Layout.astro  # Base layout
│   │   │   └── content/
│   │   │       └── projects/     # Content collections
│   │   ├── public/
│   │   ├── Dockerfile            # Multi-stage: build + nginx serve
│   │   ├── Dockerfile.dev        # Dev: Astro dev server
│   │   └── package.json
│   │
│   ├── api/                      # FastAPI (Python)
│   │   ├── app/
│   │   │   ├── main.py           # FastAPI app
│   │   │   ├── routes/
│   │   │   │   ├── health.py
│   │   │   │   └── contact.py
│   │   │   └── models/
│   │   ├── Dockerfile
│   │   └── requirements.txt
│   │
│   ├── demos/                    # Streamlit (Python)
│   │   ├── app.py
│   │   ├── demos/
│   │   │   ├── demo1.py
│   │   │   └── demo2.py
│   │   ├── .streamlit/
│   │   │   └── config.toml       # baseUrlPath="demos"
│   │   ├── Dockerfile
│   │   └── requirements.txt
│   │
│   └── projects/                 # Individual project containers
│       ├── _template/            # Project template
│       ├── chatbot/              # Project 1: AI Chatbot
│       ├── cv-analyzer/          # Project 2: CV Application
│       └── realtime-game/        # Project 3: WebSocket Game
│
├── infra/
│   └── nginx/
│       └── portfolio.conf        # Host nginx site config
│
├── scripts/                      # Python-only automation scripts
│   ├── setup_local.py
│   ├── sync_secrets.py           # optional
│   └── deploy_smoke_test.py      # optional
│
├── data/                         # Data directory (gitignored, mounted from persistent disk)
│   ├── models/                   # Model checkpoints
│   ├── datasets/                 # Training/inference datasets
│   ├── outputs/                  # AI-generated responses
│   └── uploads/                  # User uploads
│
├── .github/workflows/
│   └── deploy.yml                # CI/CD pipeline
│
├── docker-compose.yml            # Local development (hot reload)
├── docker-compose.dev.yml        # Alternative dev compose
├── docker-compose.prod.yml       # Production (pull images, localhost binds, volumes)
├── ecosystem.config.cjs          # PM2 configuration
├── .env.example
├── .gitignore
├── README.md
├── PORTS.md                      # Port allocation tracking
├── CONTRIBUTING.md               # Scripting standards
└── IMPLEMENTATION_PLAN.md        # This file
```

**Note:** The `data/` directory is **gitignored** and mounted from a persistent disk on the VM.

---

## Implementation Phases

> **📖 Detailed Instructions:** Each phase has detailed step-by-step instructions in the stage-specific guides linked above. This section provides a high-level overview.

### Phase 0: Finalize MVP Scope (1 hour)

> **📖 See:** [Stage 1: Foundation & Architecture](STAGE_1_FOUNDATION.md#phase-0-finalize-mvp-scope-1-hour)

- [ ] Confirm initial pages: Home / About / Experience / Projects / Contact
- [ ] Confirm 2–3 Streamlit demos to start
- [ ] Decide if `/projects/*` is MVP or later (recommended later)

---

### Phase 1: Repo Scaffold + Standards

> **📖 See:** [Stage 1: Foundation & Architecture](STAGE_1_FOUNDATION.md#phase-1-repo-scaffold--standards)

- [ ] Create monorepo folder structure
- [ ] Initialize Git repository and `.gitignore`
- [ ] Add `.env.example`
- [ ] Add Python-only scripts policy in README
- [ ] Add basic lint/format configs (Python + JS)
- [ ] Create `PORTS.md` for port allocation tracking
- [ ] Test environment setup

**Deliverable:** Working local development environment structure

---

### Phase 2: Build the Astro Web (MVP)

> **📖 See:** [Stage 2: Core Services Development](STAGE_2_CORE_SERVICES.md#phase-2-build-the-astro-web-mvp)

- [ ] Initialize web from AstroWind template in `apps/web`
- [ ] Confirm static build output (no SSR)
- [ ] Customize AstroWind sections → Home / About / Experience / Projects / Contact
- [ ] Remove unused features (blog, extra integrations, pages)
- [ ] Implement layouts + core pages:
  - [ ] `src/pages/index.astro` - Home (hero, skills, featured projects)
  - [ ] `src/pages/projects/index.astro` - Projects gallery
  - [ ] `src/pages/about.astro` - About (bio, experience)
  - [ ] `src/pages/contact.astro` - Contact page
- [ ] Create Astro components:
  - [ ] `ProjectCard.astro` - Static project cards
  - [ ] `ContactForm.tsx` - React island (client:load)
  - [ ] `ProjectFilter.tsx` - React island (client:visible)
- [ ] Add projects content (content collections or JSON)
- [ ] Wire contact form to `fetch("/api/contact")`
- [ ] SEO basics: titles, meta, OG tags, sitemap, robots.txt
- [ ] Optimize performance (Lighthouse 100 target) - Zero JS by default
- [ ] Set up content collections for projects
- [ ] Create Dockerfile (multi-stage: build + nginx serve)

**Deliverable:** Functional homepage with project gallery

---

### Phase 3: Build FastAPI API (MVP)

> **📖 See:** [Stage 2: Core Services Development](STAGE_2_CORE_SERVICES.md#phase-3-build-fastapi-api-mvp)

- [ ] Scaffold FastAPI in `apps/api`
- [ ] Add `GET /api/health`
- [ ] Add `POST /api/contact` with Pydantic validation
- [ ] Add honeypot + rate limiting
- [ ] Add email integration (SendGrid/Mailgun)
- [ ] Add structured logging (no PII)
- [ ] Create Dockerfile (Python + uvicorn)

**Deliverable:** Working API with contact endpoint

---

### Phase 4: Build Streamlit Demos (MVP)

> **📖 See:** [Stage 2: Core Services Development](STAGE_2_CORE_SERVICES.md#phase-4-build-streamlit-demos-mvp)

- [ ] Scaffold `apps/demos`
- [ ] Add `.streamlit/config.toml` with `baseUrlPath="demos"`
- [ ] Implement 2–3 demos
- [ ] Add "How it works / limitations" sections
- [ ] Load models from mounted `/app/models` (from `/mnt/data/models` in prod)
- [ ] Optimize startup time
- [ ] Create Dockerfile (Python + Streamlit)

**Deliverable:** Interactive ML demos

---

### Phase 5: Containerize Services

> **📖 See:** [Stage 3: Containerization & Local Testing](STAGE_3_CONTAINERIZATION.md#phase-5-containerize-services)

- [ ] Web: multi-stage build + nginx serve static
- [ ] API: uvicorn container
- [ ] Demos: streamlit container
- [ ] Create `docker-compose.yml` for local integration
- [ ] Create `docker-compose.dev.yml` (hot reload)
- [ ] Create `docker-compose.prod.yml` (localhost-only binds + volumes)
- [ ] Verify locally:
  - [ ] `docker compose -f docker-compose.prod.yml up -d` works
  - [ ] `curl http://localhost:8000/api/health` works
  - [ ] `/demos` loads without broken assets
- [ ] Test all services run locally via PM2

**Deliverable:** Containerized services with production parity

---

### Phase 6: Provision GCP VM + Disk

> **📖 See:** [Stage 4: GCP Deployment & CI/CD](STAGE_4_GCP_DEPLOYMENT.md#phase-6-provision-gcp-vm--persistent-disk)

- [ ] Create GCP project and enable Compute Engine API
- [ ] Create VM instance (e2-medium, Ubuntu 22.04 LTS, 20GB boot disk)
- [ ] Create Persistent Disk for data (100GB+ Standard or SSD)
- [ ] Attach persistent disk to VM
- [ ] Format and mount persistent disk to `/mnt/data`
- [ ] Set up automatic mount on reboot (fstab)
- [ ] Reserve static external IP address
- [ ] Configure firewall rules (allow HTTP 80, HTTPS 443, SSH 22)
- [ ] Set up SSH key authentication
- [ ] Install Docker and Docker Compose on VM
- [ ] Clone repository to VM (or just keep compose + configs if using image-only deploys)
- [ ] Create symlink: `ln -s /mnt/data ~/portfolio/data`
- [ ] Create `/etc/portfolio/.env` (chmod 600)

**Deliverable:** GCP VM with persistent disk ready for deployment

---

### Phase 7: Configure Host Nginx + TLS

> **📖 See:** [Stage 4: GCP Deployment & CI/CD](STAGE_4_GCP_DEPLOYMENT.md#phase-7-configure-host-nginx--tls)

- [ ] Install nginx
- [ ] Install certbot + get cert for domain
- [ ] Add nginx site config for `/`, `/api`, `/demos`, optional `/projects`
- [ ] Test:
  - [ ] HTTP → HTTPS redirect
  - [ ] `/api/health` returns 200
  - [ ] `/demos` works (no broken JS/CSS)
- [ ] Set up automatic certificate renewal

**Deliverable:** HTTPS-enabled reverse proxy

---

### Phase 8: CI/CD with GitHub Actions

> **📖 See:** [Stage 4: GCP Deployment & CI/CD](STAGE_4_GCP_DEPLOYMENT.md#phase-8-cicd-with-github-actions)

- [ ] Set up GCP Artifact Registry
- [ ] Create GitHub Actions workflow:
  - [ ] Build/push images to Artifact Registry
  - [ ] SSH to VM: `docker compose pull && docker compose up -d`
  - [ ] Run smoke tests after deploy
- [ ] Add deploy protections:
  - [ ] Only on main
  - [ ] Manual approval optional
- [ ] Add health checks after deployment
- [ ] Test automated deployment

**Deliverable:** Automated CI/CD pipeline

---

### Phase 9: Production Hardening + Monitoring

> **📖 See:** [Stage 5: Production Hardening & Expansion](STAGE_5_PRODUCTION.md#phase-9-production-hardening--monitoring)

- [ ] UFW rules + fail2ban
- [ ] unattended upgrades
- [ ] Disk usage monitoring + snapshot strategy
- [ ] Uptime checks (home, `/api/health`, `/demos`)
- [ ] Budget alerts in GCP
- [ ] Configure log rotation
- [ ] Set up monitoring (uptime checks, disk space alerts)
- [ ] Create backup strategy (docker volumes, configs)
- [ ] Document rollback procedure

**Deliverable:** Production-hardened deployment

---

### Phase 10: Add /projects/* (Optional Expansion)

> **📖 See:** [Stage 5: Production Hardening & Expansion](STAGE_5_PRODUCTION.md#phase-10-add-projects-optional-expansion)

- [ ] Add first project container under `apps/projects/<name>`
- [ ] Assign internal port + nginx route block
- [ ] Add homepage project card linking to `/projects/<name>/`
- [ ] Test project routing via Nginx

**Deliverable:** First project container deployed

---

### Phase 11: Launch

> **📖 See:** [Stage 5: Production Hardening & Expansion](STAGE_5_PRODUCTION.md#phase-11-launch)

- [ ] Write documentation
- [ ] Perform security and performance audits
- [ ] Test entire user flow
- [ ] Launch! 🚀

---

## Development Environments

### Environment 1: PM2 (Fast Development)

**Use for:** Daily development, quick iterations

**Setup:**
```bash
# Install PM2 globally
npm install -g pm2

# Start all services
pm2 start ecosystem.config.cjs

# View logs
pm2 logs

# Restart specific service
pm2 restart web

# Stop all
pm2 stop all
```

**PM2 Configuration (`ecosystem.config.cjs`):**

```javascript
module.exports = {
  apps: [
    {
      name: "web",
      cwd: "./apps/web",
      script: "npm",
      args: "run dev -- --host 0.0.0.0",  // Astro uses port 4321 by default
      env: {
        NODE_ENV: "development"
      },
      watch: false,
      autorestart: true
    },
    {
      name: "api",
      cwd: "./apps/api",
      script: "python",
      args: "-m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000",
      env: {
        ENVIRONMENT: "development"
      },
      watch: false,
      autorestart: true
    },
    {
      name: "demos",
      cwd: "./apps/demos",
      script: "python",
      args: "-m streamlit run app.py --server.address 0.0.0.0 --server.port 7860 --server.baseUrlPath demos",
      env: {
        PORT: "7860"
      },
      watch: false,
      autorestart: true
    }
    // Add project containers as you build them
  ]
};
```

**Access:**
- Homepage: http://localhost:4321 (Astro dev server)
- API: http://localhost:8000/api/health (FastAPI)
- Demos: http://localhost:7860/demos/ (Streamlit with baseUrlPath)

**Pros:**
- ✅ Fast startup
- ✅ Hot reload (Astro HMR) works natively
- ✅ Easy debugging
- ✅ No container overhead

**Cons:**
- ❌ Not production-parity
- ❌ Dependency conflicts possible

---

### Environment 2: Docker Dev Compose (Hot Reload)

**Use for:** Container testing with hot reload

**Setup:**
```bash
# Create local data directories
mkdir -p data/{models,datasets,outputs,uploads}

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your local values

# Build and start all services
docker compose -f docker-compose.dev.yml up --build

# Or run in background
docker compose -f docker-compose.dev.yml up -d --build

# View logs
docker compose -f docker-compose.dev.yml logs -f

# Stop all services
docker compose -f docker-compose.dev.yml down
```

**docker-compose.dev.yml:**

```yaml
version: '3.8'

services:
  web:
    build:
      context: ./apps/web
      dockerfile: Dockerfile.dev
    ports:
      - "4321:4321"  # Astro dev server
    volumes:
      - ./apps/web:/app  # Mount entire app
      - /app/node_modules  # Isolate node_modules
    environment:
      - NODE_ENV=development

  api:
    build: ./apps/api
    ports:
      - "8000:8000"  # FastAPI
    volumes:
      - ./apps/api:/app  # Hot reload
    command: uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
    environment:
      - ENVIRONMENT=development
    env_file:
      - .env.local

  demos:
    build: ./apps/demos
    ports:
      - "7860:7860"
    volumes:
      - ./apps/demos:/app  # Hot reload
      - ./data/models:/app/models:ro
      - ./data/datasets:/app/datasets:ro
      - ./data/outputs:/app/outputs:rw
```

**Access:** Same as PM2 (localhost:4321, etc.)

**Pros:**
- ✅ Production parity
- ✅ Tests Docker builds
- ✅ Catches port/volume issues
- ✅ Tests multi-container networking
- ✅ Hot reload via volumes

**Cons:**
- ❌ Slower startup than PM2
- ❌ Requires Docker installed

---

### Environment 3: GCP Production (VM + Docker Compose)

**Use for:** Production deployment

**Setup on VM:**
```bash
# SSH into VM
ssh user@YOUR_VM_IP

# Clone repository (or pull latest)
cd ~
git clone https://github.com/yourusername/portfolio.git
cd portfolio

# Pull latest images from registry
docker compose -f docker-compose.prod.yml pull

# Start services
docker compose -f docker-compose.prod.yml up -d

# View logs
docker compose -f docker-compose.prod.yml logs -f

# Restart specific service
docker compose -f docker-compose.prod.yml restart api
```

**docker-compose.prod.yml:**

```yaml
version: '3.8'

services:
  web:
    image: REGION-docker.pkg.dev/PROJECT/portfolio/web:${GIT_SHA:-latest}
    ports:
      - "127.0.0.1:8080:8080"  # Astro static served by nginx
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:8080"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

  api:
    image: REGION-docker.pkg.dev/PROJECT/portfolio/api:${GIT_SHA:-latest}
    ports:
      - "127.0.0.1:8000:8000"  # FastAPI
    environment:
      - ENVIRONMENT=production
    env_file:
      - /etc/portfolio/.env  # Production secrets
    volumes:
      - /mnt/data/uploads:/app/uploads  # Persistent disk
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

  demos:
    image: REGION-docker.pkg.dev/PROJECT/portfolio/demos:${GIT_SHA:-latest}
    ports:
      - "127.0.0.1:7860:7860"  # Streamlit
    volumes:
      - /mnt/data/models:/app/models:ro
      - /mnt/data/datasets:/app/datasets:ro
      - /mnt/data/outputs:/app/outputs:rw
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:7860/_stcore/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

**Access:** https://yourdomain.com (via Nginx reverse proxy)

**Pros:**
- ✅ Production environment
- ✅ Persistent storage
- ✅ Automatic restarts
- ✅ Log rotation
- ✅ Localhost-only binds (security)

---

### Workflow Comparison

| Task | PM2 (Local) | Docker Dev | Docker Prod (GCP) |
|------|-------------|------------|-------------------|
| **Initial setup** | Fast | Medium | Slow |
| **Hot reload** | Native | Via volumes | N/A |
| **Production parity** | ❌ | ✅ | ✅ |
| **Debugging** | Easy | Medium | Hard |
| **Port conflicts** | Possible | Isolated | Isolated |
| **Data persistence** | Local files | Local files | Persistent disk |
| **When to use** | Daily dev | Pre-deploy test | Production |

---

### Recommended Development Workflow

```
1. Local Development (PM2)
   ├─ Write code
   ├─ Test features
   └─ Debug issues
        ↓
2. Local Docker Testing
   ├─ Build containers
   ├─ Test multi-service
   └─ Verify volumes
        ↓
3. Commit & Push
   ├─ git add .
   ├─ git commit
   └─ git push origin main
        ↓
4. CI/CD (GitHub Actions)
   ├─ Build images
   ├─ Push to Artifact Registry
   ├─ SSH to VM
   ├─ docker compose pull
   └─ docker compose up -d
        ↓
5. Verify Production
   ├─ Smoke tests
   ├─ Monitor logs
   └─ Check uptime
```

---

## Dockerization Strategy

### 1) Web Dockerfile (Astro → Static → Nginx)

**Goal:** Build once, serve static reliably.

**Note:** AstroWind is still Astro: Dockerfile remains build → copy dist → nginx serve (no SSR server).

```dockerfile
# apps/web/Dockerfile

# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Container nginx config (listen on 8080)
# IMPORTANT: Static site behavior
# - Use =404 for true static sites (each page is a separate .html file)
# - Use /index.html if you want SPA-style client-side routing (all routes → index.html)
# For Astro static builds, =404 is recommended unless using client-side routing
RUN echo 'server { listen 8080; root /usr/share/nginx/html; index index.html; location / { try_files $uri $uri/ =404; } }' > /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
```

**Internal port:** 8080

---

### 2) API Dockerfile (FastAPI)

```dockerfile
# apps/api/Dockerfile

FROM python:3.11-slim
WORKDIR /app

# Install curl for healthchecks
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000

# Enable proxy headers for correct client IP behind Nginx
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--proxy-headers", "--forwarded-allow-ips", "127.0.0.1"]
```

---

### 3) Demos Dockerfile (Streamlit)

```dockerfile
# apps/demos/Dockerfile

FROM python:3.11-slim
WORKDIR /app

# Install curl for healthchecks
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 7860

# CRITICAL: Set baseUrlPath for /demos subpath routing
CMD ["streamlit", "run", "app.py", "--server.address", "0.0.0.0", "--server.port", "7860", "--server.baseUrlPath", "demos"]
```

---

## GCP VM + Persistent Disk Setup

### VM Recommended Baseline

- **OS:** Ubuntu 22.04 LTS
- **Machine type:** e2-medium (2 vCPU, 4GB) minimum
- **Boot disk:** 20GB
- **Reserve a static external IP**
- **Firewall:** Allow inbound: 80, 443, 22 (or restrict 22 by IP)

### Create VM and Persistent Disk

```bash
# Set variables
export PROJECT_ID="your-portfolio-project"
export ZONE="us-central1-a"
export VM_NAME="portfolio-vm"
export DISK_NAME="portfolio-data-disk"
export DISK_SIZE="100GB"  # Adjust based on your needs

# Create VM
gcloud compute instances create $VM_NAME \
  --project=$PROJECT_ID \
  --zone=$ZONE \
  --machine-type=e2-medium \
  --image-family=ubuntu-2204-lts \
  --image-project=ubuntu-os-cloud \
  --boot-disk-size=20GB

# Reserve static IP
gcloud compute addresses create portfolio-ip \
  --project=$PROJECT_ID \
  --region=us-central1

# Get the reserved IP address
export STATIC_IP=$(gcloud compute addresses describe portfolio-ip \
  --project=$PROJECT_ID \
  --region=us-central1 \
  --format="get(address)")

# Assign static IP to VM
gcloud compute instances delete-access-config $VM_NAME \
  --project=$PROJECT_ID \
  --zone=$ZONE \
  --access-config-name="external-nat"

gcloud compute instances add-access-config $VM_NAME \
  --project=$PROJECT_ID \
  --zone=$ZONE \
  --access-config-name="external-nat" \
  --address=$STATIC_IP

# Create persistent disk (Standard for cost, or SSD for performance)
gcloud compute disks create $DISK_NAME \
  --project=$PROJECT_ID \
  --zone=$ZONE \
  --size=$DISK_SIZE \
  --type=pd-standard  # or pd-ssd for better performance

# Attach disk to VM
gcloud compute instances attach-disk $VM_NAME \
  --project=$PROJECT_ID \
  --zone=$ZONE \
  --disk=$DISK_NAME

# Configure firewall
gcloud compute firewall-rules create allow-http-https \
  --project=$PROJECT_ID \
  --allow=tcp:80,tcp:443 \
  --source-ranges=0.0.0.0/0

# SSH access options (choose one):
# Option 1: Restrict to your current IP (WARNING: you'll be locked out if IP changes)
export MY_IP=$(curl -s ifconfig.me)
gcloud compute firewall-rules create allow-ssh-my-ip \
  --project=$PROJECT_ID \
  --allow=tcp:22 \
  --source-ranges=$MY_IP/32

# Option 2 (RECOMMENDED): Use Identity-Aware Proxy (IAP) for SSH
# No firewall rule needed - SSH via: gcloud compute ssh VM_NAME --tunnel-through-iap
gcloud compute firewall-rules create allow-ssh-iap \
  --project=$PROJECT_ID \
  --allow=tcp:22 \
  --source-ranges=35.235.240.0/20  # IAP IP range

# Option 3: Allow from specific network (e.g., office/VPN)
# gcloud compute firewall-rules create allow-ssh-office \
#   --project=$PROJECT_ID \
#   --allow=tcp:22 \
#   --source-ranges=YOUR_OFFICE_IP/32
```

### Format and Mount Persistent Disk (on VM)

```bash
# SSH into VM
gcloud compute ssh $VM_NAME --zone=$ZONE

# Find the disk device name (use stable path)
ls -l /dev/disk/by-id/google-*
# Look for the persistent disk (e.g., google-portfolio-data-disk)

# Set the disk device path (use stable by-id path)
export DISK_DEVICE=$(ls /dev/disk/by-id/google-${DISK_NAME} 2>/dev/null || echo "/dev/sdb")

# Format the disk (ONLY DO THIS ONCE - will erase data!)
sudo mkfs.ext4 -m 0 -E lazy_itable_init=0,lazy_journal_init=0,discard $DISK_DEVICE

# Create mount point
sudo mkdir -p /mnt/data

# Mount the disk
sudo mount -o discard,defaults $DISK_DEVICE /mnt/data

# Set permissions (allow your user to write)
sudo chmod a+w /mnt/data
sudo chown $USER:$USER /mnt/data

# Verify mount
df -h /mnt/data
```

### Configure Automatic Mount on Reboot

```bash
# Get the disk UUID (use stable device path)
sudo blkid $DISK_DEVICE
# Copy the UUID value

# Edit fstab
sudo nano /etc/fstab

# Add this line (replace UUID with your actual UUID):
UUID=YOUR-UUID-HERE /mnt/data ext4 discard,defaults,nofail 0 2

# Test the fstab entry
sudo umount /mnt/data
sudo mount -a
df -h /mnt/data  # Should show the disk mounted
```

### Create Data Directory Structure

```bash
# Create directory structure on persistent disk
cd /mnt/data
mkdir -p models datasets outputs uploads

# Create subdirectories for organization
mkdir -p models/{nlp,cv,audio}
mkdir -p datasets/{images,text,audio}
mkdir -p outputs/{generated_text,generated_images}
mkdir -p uploads/user_files

# Create symlink from project directory
cd ~/portfolio
ln -s /mnt/data data

# Verify
ls -la data/  # Should show the symlinked directories
```

### Install Docker and Docker Compose

```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify installation
docker --version
docker compose version
```

---

## Host Nginx Configuration (VM)

**infra/nginx/portfolio.conf:**

```nginx
# HTTP to HTTPS redirect
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

# HTTPS server
server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL certificates (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Trailing slash redirects (prevents falling through to web container)
    location = /api { return 301 /api/; }
    location = /demos { return 301 /demos/; }
    location = /projects { return 301 /projects/; }

    # API (FastAPI) - must come before / to avoid conflicts
    location /api/ {
        proxy_pass http://127.0.0.1:8000/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # ML Demos (Streamlit with WebSocket support)
    # CRITICAL: No trailing slash on proxy_pass to preserve /demos prefix
    location /demos/ {
        proxy_pass http://127.0.0.1:7860;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Prefix /demos;
    }

    # Individual Project Containers (add as needed)
    # location /projects/chatbot/ {
    #     proxy_pass http://127.0.0.1:8001/;
    #     proxy_http_version 1.1;
    #     proxy_set_header Upgrade $http_upgrade;
    #     proxy_set_header Connection 'upgrade';
    #     proxy_set_header Host $host;
    #     proxy_cache_bypass $http_upgrade;
    #     proxy_set_header X-Real-IP $remote_addr;
    #     proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    #     proxy_set_header X-Forwarded-Proto $scheme;
    # }

    # Web - Astro static served by nginx container (must be last to catch all other routes)
    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

**Note:** More specific location blocks (`/api/`, `/demos/`, `/projects/`) must come **before** the catch-all `/` location.

### SSL Certificate Setup (Let's Encrypt)

```bash
# Install Certbot
sudo apt update
sudo apt install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Test automatic renewal
sudo certbot renew --dry-run

# Certbot will automatically set up a cron job for renewal
```

---

## CI/CD Pipeline

### Why Build in GitHub, Pull on VM

**Don't build on the VM:**
- Slower, inconsistent, and harder to debug
- Ties deployments to VM state
- Requires build dependencies on production server

**Recommended Pipeline:**

**On push to main, GitHub Actions:**
1. Builds 3 images (web/api/demos)
2. Pushes to GCP Artifact Registry
3. SSH to VM and runs:
   ```bash
   docker compose -f docker-compose.prod.yml pull
   docker compose -f docker-compose.prod.yml up -d
   ```
4. Smoke tests (`/`, `/api/health`, `/demos/`)

### VM Access to Artifact Registry

Attach a VM service account with read access to Artifact Registry, so pulls work without manual logins.

### GitHub Actions Workflow Example

**IMPORTANT:** Tag images with git SHA for deterministic deployments and easy rollbacks.

```yaml
# .github/workflows/deploy.yml
name: Deploy to GCP VM

on:
  push:
    branches: [main]

env:
  GCP_REGION: us-central1
  REGISTRY: us-central1-docker.pkg.dev
  PROJECT_ID: ${{ secrets.GCP_PROJECT_ID }}
  REPO_NAME: portfolio

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Set image tag (git SHA)
        id: vars
        run: echo "IMAGE_TAG=$(git rev-parse --short HEAD)" >> $GITHUB_OUTPUT
      
      - name: Set up Cloud SDK
        uses: google-github-actions/setup-gcloud@v1
        with:
          service_account_key: ${{ secrets.GCP_SA_KEY }}
          project_id: ${{ secrets.GCP_PROJECT_ID }}
      
      - name: Configure Docker for Artifact Registry
        run: gcloud auth configure-docker ${{ secrets.GCP_REGION }}-docker.pkg.dev
      
      - name: Build and push images
        env:
          IMAGE_TAG: ${{ steps.vars.outputs.IMAGE_TAG }}
        run: |
          # Build and tag with git SHA + latest
          # Web
          docker build -t ${{ env.REGISTRY }}/${{ env.PROJECT_ID }}/${{ env.REPO_NAME }}/web:$IMAGE_TAG ./apps/web
          docker tag ${{ env.REGISTRY }}/${{ env.PROJECT_ID }}/${{ env.REPO_NAME }}/web:$IMAGE_TAG \
                     ${{ env.REGISTRY }}/${{ env.PROJECT_ID }}/${{ env.REPO_NAME }}/web:latest
          docker push ${{ env.REGISTRY }}/${{ env.PROJECT_ID }}/${{ env.REPO_NAME }}/web:$IMAGE_TAG
          docker push ${{ env.REGISTRY }}/${{ env.PROJECT_ID }}/${{ env.REPO_NAME }}/web:latest
          
          # API
          docker build -t ${{ env.REGISTRY }}/${{ env.PROJECT_ID }}/${{ env.REPO_NAME }}/api:$IMAGE_TAG ./apps/api
          docker tag ${{ env.REGISTRY }}/${{ env.PROJECT_ID }}/${{ env.REPO_NAME }}/api:$IMAGE_TAG \
                     ${{ env.REGISTRY }}/${{ env.PROJECT_ID }}/${{ env.REPO_NAME }}/api:latest
          docker push ${{ env.REGISTRY }}/${{ env.PROJECT_ID }}/${{ env.REPO_NAME }}/api:$IMAGE_TAG
          docker push ${{ env.REGISTRY }}/${{ env.PROJECT_ID }}/${{ env.REPO_NAME }}/api:latest
          
          # Demos
          docker build -t ${{ env.REGISTRY }}/${{ env.PROJECT_ID }}/${{ env.REPO_NAME }}/demos:$IMAGE_TAG ./apps/demos
          docker tag ${{ env.REGISTRY }}/${{ env.PROJECT_ID }}/${{ env.REPO_NAME }}/demos:$IMAGE_TAG \
                     ${{ env.REGISTRY }}/${{ env.PROJECT_ID }}/${{ env.REPO_NAME }}/demos:latest
          docker push ${{ env.REGISTRY }}/${{ env.PROJECT_ID }}/${{ env.REPO_NAME }}/demos:$IMAGE_TAG
          docker push ${{ env.REGISTRY }}/${{ env.PROJECT_ID }}/${{ env.REPO_NAME }}/demos:latest
      
      - name: Deploy to VM
        uses: appleboy/ssh-action@master
        env:
          IMAGE_TAG: ${{ steps.vars.outputs.IMAGE_TAG }}
        with:
          host: ${{ secrets.VM_IP }}
          username: ${{ secrets.VM_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          envs: IMAGE_TAG
          script: |
            cd ~/portfolio
            # Set GIT_SHA environment variable for docker-compose
            export GIT_SHA=$IMAGE_TAG
            docker compose -f docker-compose.prod.yml pull
            docker compose -f docker-compose.prod.yml up -d
      
      - name: Smoke tests
        run: |
          sleep 30
          curl -f https://yourdomain.com || exit 1
          curl -f https://yourdomain.com/api/health || exit 1
          curl -f https://yourdomain.com/demos/ || exit 1
```

---

## Security & Hardening

### Minimum Must-Do

- ✅ **UFW:** allow 80/443, restrict 22
- ✅ **Fail2ban** for SSH
- ✅ **unattended-upgrades**
- ✅ **Docker not exposed** on public interface
- ✅ **Bind app ports to 127.0.0.1 only**
- ✅ **Don't log contact message bodies / PII**
- ✅ **Add basic security headers in Nginx**
- ✅ **HTTPS enforced** (HTTP → HTTPS redirect)
- ✅ **Secrets in `/etc/portfolio/.env`** (chmod 600, not in code)
- ✅ **Input validation** on all endpoints
- ✅ **Rate limiting** prevents abuse
- ✅ **Honeypot** spam prevention

### UFW Firewall Setup

```bash
# Enable UFW
sudo ufw enable

# Allow SSH (be careful!)
sudo ufw allow 22/tcp

# Allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Deny all other incoming
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Check status
sudo ufw status verbose
```

### Fail2ban Setup

```bash
# Install fail2ban
sudo apt install fail2ban

# Create local config
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local

# Edit config
sudo nano /etc/fail2ban/jail.local
# Set: bantime = 1h, maxretry = 3

# Restart fail2ban
sudo systemctl restart fail2ban

# Check status
sudo fail2ban-client status sshd
```

### Unattended Upgrades

```bash
# Install unattended-upgrades
sudo apt install unattended-upgrades

# Enable automatic updates
sudo dpkg-reconfigure -plow unattended-upgrades

# Verify configuration
cat /etc/apt/apt.conf.d/50unattended-upgrades
```

### Optional Upgrades

- Cloud Monitoring agent
- Log rotation for docker logs
- Regular persistent disk snapshots
- Budget alerts in GCP
- Uptime checks for web and API

---

## Adding New Projects

### Step-by-Step Guide

**1. Create Project Directory**
```bash
cd apps/projects
mkdir my-new-project
cd my-new-project
```

**2. Build Your Project**
- Develop your project (any tech stack)
- Ensure it can run in a container
- Make sure it listens on a configurable port

**3. Create Dockerfile**
```dockerfile
# apps/projects/my-new-project/Dockerfile
FROM node:20-alpine  # or python:3.11-slim, etc.
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8004
CMD ["npm", "start"]
```

**4. Add to docker-compose.prod.yml**
```yaml
  project-my-new-project:
    image: REGION-docker.pkg.dev/PROJECT/portfolio/my-new-project:latest
    ports:
      - "127.0.0.1:8004:8004"  # Next available port
    volumes:
      - /mnt/data/models/my-project:/app/models:ro  # If needed
    restart: unless-stopped
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

**5. Add Nginx Location Block**
```nginx
# Add to /etc/nginx/sites-available/portfolio
location /projects/my-new-project/ {
    proxy_pass http://127.0.0.1:8004/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

**6. Add Project Card to Homepage**

**Note:** Projects list lives in AstroWind's content/data approach (keep your content collections or migrate to AstroWind's preferred structure), but links should still point to `/projects/<name>/`.

```typescript
// apps/web/src/content/projects/my-new-project.md
---
title: "My Awesome Project"
description: "A full-stack application that does amazing things"
tags: ["React", "Node.js", "PostgreSQL"]
thumbnail: "/images/my-project-thumb.png"
demoUrl: "/projects/my-new-project"
githubUrl: "https://github.com/yourusername/my-new-project"
featured: true
---

Project details here...
```

**7. Update PORTS.md**
```markdown
| my-new-project | 8004 | `/projects/my-new-project/*` | Planned | 2025-12-21 |
```

**8. Deploy**
```bash
# Build and push image (in CI/CD)
docker build -t REGION-docker.pkg.dev/PROJECT/portfolio/my-new-project:latest ./apps/projects/my-new-project
docker push REGION-docker.pkg.dev/PROJECT/portfolio/my-new-project:latest

# SSH into VM
ssh user@YOUR_VM_IP

# Pull and start
cd ~/portfolio
docker compose -f docker-compose.prod.yml pull project-my-new-project
docker compose -f docker-compose.prod.yml up -d project-my-new-project

# Reload Nginx
sudo nginx -t
sudo systemctl reload nginx
```

**9. Test**
```bash
# Visit your new project
https://yourdomain.com/projects/my-new-project
```

---

## Cost Estimate

### Monthly Costs

| Component | Monthly Cost | Notes |
|-----------|--------------|-------|
| **Compute Engine VM (e2-medium)** | ~$25-30 | 2 vCPUs, 4 GB RAM, 20GB boot disk |
| **Persistent Disk (100GB Standard)** | ~$4 | pd-standard for datasets |
| **Persistent Disk (200GB Standard)** | ~$8 | If you need more space |
| **Static External IP** | ~$3 | Reserved IP address |
| **Egress (data transfer)** | ~$1-5 | Low traffic estimate |
| **Snapshots (backups)** | ~$2.60 | 100GB snapshot (optional) |
| **Total Baseline** | **~$32-40/month** | With 100GB data disk |
| **Total with More Data** | **~$48-58/month** | With 500GB data disk |

### VM Sizing Recommendations

- **e2-micro** (free tier eligible): 0.25-2 vCPUs, 1 GB RAM - **too small** for 3 services
- **e2-small**: 0.5-2 vCPUs, 2 GB RAM - might work but tight
- **e2-medium** (recommended): 2 vCPUs, 4 GB RAM - comfortable for all 3 services
- **e2-standard-2**: 2 vCPUs, 8 GB RAM - if you need more memory for ML models

### Disk Type Selection

- **pd-standard**: $0.04/GB/month - Use for datasets, outputs (most data)
- **pd-balanced**: $0.10/GB/month - Good middle ground
- **pd-ssd**: $0.17/GB/month - Use only for frequently accessed models

### Cost Optimization Tips

- Start with 100GB Standard disk (~$4/month)
- Resize as needed (can increase anytime)
- Use snapshots sparingly (only for important backups)
- Delete old snapshots to save costs
- Monitor disk usage regularly

---

## Troubleshooting

### PM2 Can't Find Python/Streamlit

```bash
# Solution: Use full path to Python
which python  # Copy this path
# Update ecosystem.config.cjs with full path
```

### Port Already in Use

```bash
# Find process using port
# Windows:
netstat -ano | findstr :4321
taskkill /PID <PID> /F

# Linux/Mac:
lsof -i :4321
kill -9 <PID>
```

### Docker Build Fails

```bash
# Clear Docker cache
docker system prune -a
docker compose build --no-cache
```

### Volume Permissions (Linux)

```bash
# Fix permissions for data directory
sudo chown -R $USER:$USER data/
chmod -R 755 data/
```

### Hot Reload Not Working in Docker

```bash
# Ensure volumes are mounted correctly in docker-compose.yml
# Check that source code is mounted:
volumes:
  - ./apps/web:/app  # Mount entire app
  - /app/node_modules  # Isolate node_modules
```

### Nginx Configuration Test

```bash
# Test nginx configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx

# View nginx error logs
sudo tail -f /var/log/nginx/error.log
```

### Docker Logs

```bash
# View logs for specific service
docker compose -f docker-compose.prod.yml logs -f web

# View all logs
docker compose -f docker-compose.prod.yml logs -f

# View last 100 lines
docker compose -f docker-compose.prod.yml logs --tail=100
```

---

## Rollback Strategy

### Best Practice: Version Your Images with Git SHA

**CRITICAL:** Always deploy using git SHA tags, not `:latest`. This enables instant, deterministic rollbacks.

**Why git SHA tags:**
- ✅ Deterministic deployments (know exactly what's running)
- ✅ Easy rollbacks (just change the SHA)
- ✅ Audit trail (git SHA maps to exact code state)
- ✅ No "latest" confusion (latest can change unexpectedly)

```bash
# Tag stable releases before deploying (optional, for milestones)
git tag -a v1.0.0 -m "Production release 1.0.0"
git push origin v1.0.0
```

### Rollback Steps (VM)

**Method 1: Rollback to Previous Git SHA (Recommended)**

```bash
# SSH into VM
ssh user@YOUR_VM_IP

# Navigate to project directory
cd ~/portfolio

# Find the previous working git SHA
# Option A: Check GitHub Actions history for last successful deploy
# Option B: Check git log
git log --oneline -n 10

# Set the previous git SHA
export GIT_SHA=abc1234  # Replace with actual previous SHA

# Pull images with that SHA tag
docker compose -f docker-compose.prod.yml pull

# Restart with the previous SHA
docker compose -f docker-compose.prod.yml up -d

# View logs to verify
docker compose -f docker-compose.prod.yml logs -f
```

**Method 2: Rollback Using Git Tag (For Milestone Releases)**

```bash
# SSH into VM
ssh user@YOUR_VM_IP
cd ~/portfolio

# List available tags
git tag -l

# Find the git SHA for a specific tag
export GIT_SHA=$(git rev-parse --short v1.2.3)

# Pull and restart with that SHA
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d
```

**Verify Rollback:**

```bash
# Check running containers
docker ps

# Check image tags
docker images | grep portfolio

# Test endpoints
curl -f https://yourdomain.com/api/health
curl -f https://yourdomain.com
```

---

## Scripting Standards

**IMPORTANT: All automation scripts MUST be written in Python**

### Why Python Only?

✅ **Cross-Platform**: Works on Windows, Linux, and macOS  
✅ **No Permission Issues**: No execution policy or chmod needed  
✅ **Project Dependency**: Python already required for demos  
✅ **Better Error Handling**: Proper exception handling  
✅ **More Maintainable**: Easier to read, debug, and extend

### Prohibited Script Types

❌ **Shell Scripts (`.sh`)**: Not compatible with Windows  
❌ **PowerShell (`.ps1`)**: Not compatible with Linux/macOS  
❌ **Batch Files (`.bat`)**: Limited functionality, Windows-only

### Current Scripts

All scripts in `scripts/` directory:
- ✅ `setup_local.py` - Cross-platform environment setup
- ✅ (Future scripts will also be Python)

### Adding New Scripts

When creating new automation scripts:

1. **Use Python**: Create `.py` files in `scripts/` directory
2. **Add Shebang**: Start with `#!/usr/bin/env python3`
3. **Cross-Platform**: Use `pathlib.Path` instead of string paths
4. **Error Handling**: Use try/except blocks
5. **User Feedback**: Use colored output for clarity
6. **Documentation**: Add docstrings and comments

**Example Template:**
```python
#!/usr/bin/env python3
"""
Script Description
"""
import sys
from pathlib import Path

def main():
    """Main function"""
    try:
        # Your code here
        pass
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
```

---

## Next Steps

1. ✅ **Review this plan** and confirm alignment with your goals
2. ⏳ **Run setup script**: `python scripts/setup_local.py`
3. ⏳ **Start with Phase 1**: Initialize monorepo structure
4. ⏳ **Iterate quickly**: Build → Test → Deploy
5. ⏳ **Ask questions**: Clarify any unclear sections

Ready to start implementation? Let's build this! 🚀

---

## Appendix: What Changed in V2

### Major Changes from V1

1. **API is now FastAPI (Python) everywhere** (was Fastify/Node.js)
2. **Astro runs as static build served by nginx** (not dev server in prod)
3. **Streamlit supports /demos via `baseUrlPath="demos"`**
4. **"Production parity" is clarified:** dev compose ≠ prod compose
5. **Prod binds are localhost-only;** only host Nginx is public
6. **CI/CD builds images in GitHub** and VM pulls them (more reliable)
7. **Folder renamed:** `apps/homepage` → `apps/web`

### Why Python-First Backend

- **Consistency:** Entire backend (API + demos) in Python
- **ML ecosystem:** Leverage Python's ML/data science libraries
- **Type safety:** Pydantic for request/response validation
- **Performance:** FastAPI is async and comparable to Node.js
- **Simplicity:** One language for backend reduces context switching
- **Auto-generated docs:** Swagger/ReDoc built-in

---

**End of Implementation Plan** 🎯
