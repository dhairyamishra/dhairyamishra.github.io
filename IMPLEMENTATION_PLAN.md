# Portfolio Website Implementation Plan
## Full-Stack Web + API + Streamlit ML Demos on GCP

**Last Updated:** December 20, 2025  
**Target Platform:** Google Cloud Platform (Cloud Run + HTTPS Load Balancer)  
**Architecture:** Microservices in Monorepo

---

## Executive Summary

### Project Goals
- **Fast, professional portfolio website** showcasing projects, experience, and skills
- **Interactive ML demos** using Streamlit for hands-on demonstrations
- **Production-grade API** for contact forms with spam prevention
- **Clean CI/CD pipeline** from GitHub to Google Cloud Platform
- **Single domain** with path-based routing (no CORS issues)

### Key Design Decisions
✅ **Microservices architecture** within a single monorepo  
✅ **Path-based routing** on one domain:
   - `/` → Web frontend (React)
   - `/api/*` → Backend API (Fastify)
   - `/demos/*` → ML demos (Streamlit)  
✅ **CORS-free by design** - frontend uses relative paths  
✅ **Cloud Run + HTTPS Load Balancer** for serverless, scalable deployment  
✅ **PM2 for local development** - one command to run all services  
✅ **Docker for production parity** - containers match production environment

---

## Architecture Overview

### System Architecture
```
User Browser
     ↓
HTTPS Load Balancer (yourdomain.com)
     ↓
     ├─→ / (root)          → Cloud Run: portfolio-web (React + Nginx)
     ├─→ /api/*            → Cloud Run: portfolio-api (Fastify)
     └─→ /demos/*          → Cloud Run: portfolio-demos (Streamlit)
```

### Service Responsibilities

**A) Web Service (Frontend)**
- Technology: Vite + React + TypeScript
- Pages: Home, About, Experience, Projects, Contact
- Calls `/api/contact` using relative paths (no CORS)

**B) API Service (Backend)**
- Technology: Node.js + Fastify + TypeScript
- Endpoints: `/api/health`, `/api/contact`
- Features: Rate limiting, spam prevention, email delivery

**C) Demos Service (ML Demos)**
- Technology: Python + Streamlit
- Multiple interactive ML demos with educational content

---

## Monorepo Structure

```
portfolio/
├── apps/
│   ├── web/                      # Frontend (Vite + React + TS)
│   │   ├── src/
│   │   ├── public/
│   │   ├── Dockerfile
│   │   ├── nginx.conf
│   │   └── package.json
│   ├── api/                      # Backend (Fastify + TS)
│   │   ├── src/
│   │   ├── Dockerfile
│   │   └── package.json
│   └── demos/                    # ML Demos (Streamlit)
│       ├── app.py
│       ├── demos/
│       ├── Dockerfile
│       └── requirements.txt
├── .github/workflows/
│   └── deploy-cloudrun.yml       # CI/CD pipeline
├── docker-compose.yml            # Local integration testing
├── ecosystem.config.cjs          # PM2 configuration
├── README.md
└── IMPLEMENTATION_PLAN.md        # This file
```

---

## Implementation Phases

See detailed breakdown in sections below.

---

## Complete Task Checklist

### Phase 1: Local Development Environment
- [ ] Create monorepo directory structure
- [ ] Initialize Git repository and `.gitignore`
- [ ] Initialize web app (Vite + React + TypeScript)
- [ ] Initialize API app (Node + Fastify + TypeScript)
- [ ] Initialize demos app (Python + Streamlit)
- [ ] Create `ecosystem.config.cjs` for PM2
- [ ] Test all services run locally via PM2

### Phase 2: Web Frontend
- [ ] Set up design system (Tailwind CSS)
- [ ] Implement Home, About, Experience, Projects, Contact pages
- [ ] Add SEO (meta tags, sitemap, robots.txt)
- [ ] Optimize images and performance (Lighthouse > 90)
- [ ] Integrate contact form with API

### Phase 3: Backend API
- [ ] Implement `/api/health` and `/api/contact` endpoints
- [ ] Add rate limiting (5 requests per 15 min)
- [ ] Implement honeypot spam prevention
- [ ] Integrate SendGrid/Mailgun for email
- [ ] Add input validation and logging

### Phase 4: Streamlit ML Demos
- [ ] Create main app with sidebar navigation
- [ ] Implement 2-3 interactive demos
- [ ] Add educational content (How It Works, Limitations)
- [ ] Optimize startup time (< 10 seconds)
- [ ] Ensure listens on `0.0.0.0:$PORT`

### Phase 5: Containerization
- [ ] Create Dockerfiles for web, API, demos
- [ ] Create `docker-compose.yml`
- [ ] Test `docker-compose up --build`

### Phase 6: GCP Foundation
- [ ] Create GCP project and enable APIs
- [ ] Create Artifact Registry repository
- [ ] Set up Secret Manager
- [ ] Configure Workload Identity Federation for GitHub

### Phase 7: Cloud Run Deployment
- [ ] Build and push container images
- [ ] Deploy all three services to Cloud Run
- [ ] Test each Cloud Run URL

### Phase 8: HTTPS Load Balancer
- [ ] Create serverless NEGs and backend services
- [ ] Create URL map with path routing
- [ ] Reserve static IP and create SSL certificate
- [ ] Create HTTPS proxy and forwarding rules
- [ ] Update DNS and verify routing

### Phase 9: CI/CD
- [ ] Create GitHub Actions workflow
- [ ] Configure change detection
- [ ] Add smoke tests
- [ ] Test deployment pipeline

### Phase 10: Production Hardening
- [ ] Set up uptime checks and alerts
- [ ] Configure budget alerts
- [ ] Add security headers
- [ ] Document rollback procedure
- [ ] Optimize Cloud Run settings

### Phase 11: Launch
- [ ] Write documentation
- [ ] Perform security and performance audits
- [ ] Test entire user flow
- [ ] Launch! 🚀

---

## Key Technical Details

### PM2 Configuration (`ecosystem.config.cjs`)
```javascript
module.exports = {
  apps: [
    {
      name: "portfolio-web",
      cwd: "./apps/web",
      script: "npm",
      args: "run dev -- --host 0.0.0.0 --port 5173"
    },
    {
      name: "portfolio-api",
      cwd: "./apps/api",
      script: "npm",
      args: "run dev",
      env: { PORT: "8080" }
    },
    {
      name: "portfolio-demos",
      cwd: "./apps/demos",
      script: "streamlit",
      args: "run app.py --server.address 0.0.0.0 --server.port 7860"
    }
  ]
};
```

### Docker Commands
```bash
# Build and push images
docker build -t ${REPO}/portfolio-web:latest ./apps/web
docker push ${REPO}/portfolio-web:latest

# Local integration testing
docker-compose up --build
```

### Cloud Run Deployment
```bash
# Deploy service
gcloud run deploy portfolio-web \
  --image=${REPO}/portfolio-web:latest \
  --region=$REGION \
  --allow-unauthenticated \
  --memory=512Mi \
  --max-instances=10
```

### Load Balancer Path Routing
```bash
# Create URL map with path rules
gcloud compute url-maps create portfolio-url-map \
  --default-service=portfolio-web-backend

gcloud compute url-maps add-path-matcher portfolio-url-map \
  --path-matcher-name=main-matcher \
  --default-service=portfolio-web-backend \
  --path-rules="/api/*=portfolio-api-backend,/demos/*=portfolio-demos-backend"
```

---

## Cost Estimate

### Cloud Run Deployment (Recommended)
- Cloud Run (3 services): $0-5/month (scales to zero)
- HTTPS Load Balancer: $18-25/month (fixed cost)
- Artifact Registry: $0-2/month
- Secret Manager: $0-1/month
- **Total: ~$20-35/month** (low traffic)

### VM Deployment (Alternative)
- Compute Engine (e2-medium): $25-30/month
- Static IP: $3/month
- **Total: ~$28-33/month** (predictable)

---

## Security Checklist

- [ ] HTTPS enforced (HTTP → HTTPS redirect)
- [ ] Security headers (CSP, X-Frame-Options, etc.)
- [ ] Secrets in Secret Manager (not in code)
- [ ] Input validation on all endpoints
- [ ] Rate limiting prevents abuse
- [ ] No PII in logs
- [ ] Honeypot spam prevention

---

## Monitoring & Alerts

- [ ] Uptime checks for web and API
- [ ] Alert policies for errors and downtime
- [ ] Budget alerts (50%, 90%, 100%)
- [ ] Cloud Monitoring dashboard

---

## Rollback Procedure

```bash
# List revisions
gcloud run revisions list --service=portfolio-web --region=$REGION

# Rollback to previous revision
gcloud run services update-traffic portfolio-web \
  --to-revisions=portfolio-web-00004-xyz=100 \
  --region=$REGION
```

---

## Next Steps

1. **Review this plan** and confirm alignment with your goals
2. **Start with Phase 1**: Set up local development environment
3. **Iterate quickly**: Build → Test → Deploy
4. **Ask questions**: Clarify any unclear sections

Ready to start implementation? Let's build this! 🚀
