# Stage 3: Containerization & Local Testing
## Phase 5: Docker Setup and Production Parity

**Duration:** 3-5 days  
**Prerequisites:** Stage 2 completed (all services working locally)  
**Deliverables:** Dockerized services with production parity testing

---

## Overview

This stage transforms your locally-running services into containerized applications. You'll create Dockerfiles for each service, set up Docker Compose for local testing, and establish PM2 for rapid development iteration.

**Key Goals:**
- Ensure "works on my machine" becomes "works everywhere"
- Test multi-service networking and communication
- Catch port/volume/environment issues before production
- Set up both fast development (PM2) and production parity (Docker) workflows

---

## Phase 5: Containerize Services

### Objectives
- Create production-ready Dockerfiles for all services
- Set up Docker Compose for local integration testing
- Configure PM2 for fast local development
- Verify all services work together in containers

---

## Task 5.1: Create Web Dockerfile (Astro → Static → Nginx)

### Production Dockerfile

Create `apps/web/Dockerfile`:

```dockerfile
# apps/web/Dockerfile
# Multi-stage build: Build Astro → Serve with nginx

# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (Astro needs devDependencies to build)
RUN npm ci

# Copy source code
COPY . .

# Build static site
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine

# Copy built static files
COPY --from=builder /app/dist /usr/share/nginx/html

# Create nginx config for static site
# IMPORTANT: Use =404 for true static sites (each page is a separate .html file)
# Use /index.html if you want SPA-style client-side routing
RUN echo 'server { \
    listen 8080; \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    location / { \
        try_files $uri $uri/ $uri.html =404; \
    } \
    \
    # Security headers \
    add_header X-Frame-Options "SAMEORIGIN" always; \
    add_header X-Content-Type-Options "nosniff" always; \
    add_header X-XSS-Protection "1; mode=block" always; \
    \
    # Cache static assets \
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ { \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
```

### Development Dockerfile

Create `apps/web/Dockerfile.dev`:

```dockerfile
# apps/web/Dockerfile.dev
# Development: Astro dev server with hot reload

FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev)
RUN npm install

# Copy source code
COPY . .

EXPOSE 4321

# Run dev server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
```

---

## Task 5.2: Create API Dockerfile (FastAPI)

Create `apps/api/Dockerfile`:

```dockerfile
# apps/api/Dockerfile
# FastAPI with uvicorn

FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl && \
    rm -rf /var/lib/apt/lists/*

# Copy requirements
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:8000/api/health || exit 1

# Run with uvicorn
# Enable proxy headers for correct client IP behind Nginx
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--proxy-headers", "--forwarded-allow-ips", "127.0.0.1"]
```

---

## Task 5.3: Create Demos Dockerfile (Streamlit)

Create `apps/demos/Dockerfile`:

```dockerfile
# apps/demos/Dockerfile
# Streamlit ML demos

FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl && \
    rm -rf /var/lib/apt/lists/*

# Copy requirements
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

EXPOSE 7860

# Health check (Streamlit health endpoint)
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:7860/_stcore/health || exit 1

# Run Streamlit with baseUrlPath for /demos routing
CMD ["streamlit", "run", "app.py", \
     "--server.address", "0.0.0.0", \
     "--server.port", "7860", \
     "--server.baseUrlPath", "demos", \
     "--server.headless", "true"]
```

---

## Task 5.4: Create Docker Compose for Development

Create `docker-compose.dev.yml`:

```yaml
version: '3.8'

services:
  web:
    build:
      context: ./apps/web
      dockerfile: Dockerfile.dev
    ports:
      - "4321:4321"
    volumes:
      - ./apps/web:/app
      - /app/node_modules  # Isolate node_modules
    environment:
      - NODE_ENV=development
    networks:
      - portfolio-network

  api:
    build:
      context: ./apps/api
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    volumes:
      - ./apps/api:/app
    command: uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
    environment:
      - ENVIRONMENT=development
    env_file:
      - .env.local
    networks:
      - portfolio-network

  demos:
    build:
      context: ./apps/demos
      dockerfile: Dockerfile
    ports:
      - "7860:7860"
    volumes:
      - ./apps/demos:/app
      - ./data/models:/app/models:ro
      - ./data/datasets:/app/datasets:ro
      - ./data/outputs:/app/outputs:rw
    environment:
      - STREAMLIT_SERVER_PORT=7860
    networks:
      - portfolio-network

networks:
  portfolio-network:
    driver: bridge
```

---

## Task 5.5: Create Docker Compose for Production

Create `docker-compose.prod.yml`:

```yaml
version: '3.8'

services:
  web:
    image: ${REGISTRY:-us-central1-docker.pkg.dev}/${PROJECT_ID:-your-project}/portfolio/web:${GIT_SHA:-latest}
    container_name: portfolio-web
    ports:
      - "127.0.0.1:8080:8080"  # Localhost-only binding
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
    networks:
      - portfolio-network

  api:
    image: ${REGISTRY:-us-central1-docker.pkg.dev}/${PROJECT_ID:-your-project}/portfolio/api:${GIT_SHA:-latest}
    container_name: portfolio-api
    ports:
      - "127.0.0.1:8000:8000"  # Localhost-only binding
    environment:
      - ENVIRONMENT=production
    env_file:
      - /etc/portfolio/.env  # Production secrets (VM only)
    volumes:
      - /mnt/data/uploads:/app/uploads  # Persistent disk (VM only)
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
    networks:
      - portfolio-network

  demos:
    image: ${REGISTRY:-us-central1-docker.pkg.dev}/${PROJECT_ID:-your-project}/portfolio/demos:${GIT_SHA:-latest}
    container_name: portfolio-demos
    ports:
      - "127.0.0.1:7860:7860"  # Localhost-only binding
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
    networks:
      - portfolio-network

networks:
  portfolio-network:
    driver: bridge
```

---

## Task 5.6: Create PM2 Configuration

Create `ecosystem.config.cjs`:

```javascript
module.exports = {
  apps: [
    {
      name: "web",
      cwd: "./apps/web",
      script: "npm",
      args: "run dev -- --host 0.0.0.0",
      env: {
        NODE_ENV: "development"
      },
      watch: false,
      autorestart: true,
      max_memory_restart: "500M"
    },
    {
      name: "api",
      cwd: "./apps/api",
      script: "python",
      args: "-m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000",
      interpreter: "python3",
      env: {
        ENVIRONMENT: "development"
      },
      watch: false,
      autorestart: true,
      max_memory_restart: "500M"
    },
    {
      name: "demos",
      cwd: "./apps/demos",
      script: "python",
      args: "-m streamlit run app.py --server.address 0.0.0.0 --server.port 7860 --server.baseUrlPath demos",
      interpreter: "python3",
      env: {
        STREAMLIT_SERVER_PORT: "7860"
      },
      watch: false,
      autorestart: true,
      max_memory_restart: "1G"
    }
  ]
};
```

---

## Task 5.7: Create Local Environment File

Create `.env.local`:

```bash
# .env.local
# Local development environment variables

# Environment
ENVIRONMENT=development

# API Configuration
API_PORT=8000
API_HOST=0.0.0.0

# Email Service (use test credentials for local dev)
SENDGRID_API_KEY=your_test_api_key_here
FROM_EMAIL=noreply@localhost
TO_EMAIL=test@localhost

# Rate Limiting
RATE_LIMIT_PER_MINUTE=10

# CORS
CORS_ORIGINS=http://localhost:4321,http://localhost:3000

# Streamlit
STREAMLIT_PORT=7860

# Web
WEB_PORT=4321
```

---

## Task 5.8: Create .dockerignore Files

### For Web

Create `apps/web/.dockerignore`:

```
node_modules
.astro
dist
.env*
.git
.gitignore
README.md
.vscode
.idea
*.log
```

### For API

Create `apps/api/.dockerignore`:

```
__pycache__
*.pyc
*.pyo
*.pyd
.Python
env
venv
.venv
.env*
.git
.gitignore
README.md
.vscode
.idea
*.log
.pytest_cache
```

### For Demos

Create `apps/demos/.dockerignore`:

```
__pycache__
*.pyc
*.pyo
*.pyd
.Python
env
venv
.venv
.env*
.git
.gitignore
README.md
.vscode
.idea
*.log
.pytest_cache
```

---

## Task 5.9: Test Docker Builds

### Build All Images

```bash
# Build web (production)
docker build -t portfolio-web:latest ./apps/web

# Build web (development)
docker build -f ./apps/web/Dockerfile.dev -t portfolio-web:dev ./apps/web

# Build API
docker build -t portfolio-api:latest ./apps/api

# Build demos
docker build -t portfolio-demos:latest ./apps/demos

# Verify images
docker images | grep portfolio
```

### Test Individual Containers

```bash
# Test web container
docker run -p 8080:8080 portfolio-web:latest
# Visit http://localhost:8080

# Test API container
docker run -p 8000:8000 --env-file .env.local portfolio-api:latest
# Visit http://localhost:8000/api/health

# Test demos container
docker run -p 7860:7860 portfolio-demos:latest
# Visit http://localhost:7860/demos/
```

---

## Task 5.10: Test Docker Compose (Development)

```bash
# Create local data directories
mkdir -p data/models data/datasets data/outputs data/uploads

# Start all services
docker compose -f docker-compose.dev.yml up --build

# View logs
docker compose -f docker-compose.dev.yml logs -f

# Test endpoints
curl http://localhost:4321  # Web
curl http://localhost:8000/api/health  # API
curl http://localhost:7860/demos/  # Demos

# Stop services
docker compose -f docker-compose.dev.yml down
```

---

## Task 5.11: Test PM2 (Fast Development)

```bash
# Install PM2 globally (if not already installed)
npm install -g pm2

# Start all services
pm2 start ecosystem.config.cjs

# View logs
pm2 logs

# View status
pm2 status

# Restart specific service
pm2 restart web

# Stop all services
pm2 stop all

# Delete all processes
pm2 delete all
```

---

## Task 5.12: Create Helper Scripts

### Build Script

Create `scripts/build_images.py`:

```python
#!/usr/bin/env python3
"""
Build all Docker images locally
"""
import subprocess
import sys
from pathlib import Path

def run_command(cmd, cwd=None):
    """Run a shell command"""
    try:
        result = subprocess.run(
            cmd,
            shell=True,
            cwd=cwd,
            check=True,
            capture_output=True,
            text=True
        )
        print(result.stdout)
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Error: {e.stderr}")
        return False

def main():
    """Build all images"""
    print("🔨 Building Docker images...\n")
    
    images = [
        ("web", "./apps/web", "Dockerfile"),
        ("api", "./apps/api", "Dockerfile"),
        ("demos", "./apps/demos", "Dockerfile"),
    ]
    
    for name, context, dockerfile in images:
        print(f"📦 Building {name}...")
        cmd = f"docker build -t portfolio-{name}:latest -f {dockerfile} {context}"
        if not run_command(cmd):
            print(f"❌ Failed to build {name}")
            return 1
        print(f"✅ {name} built successfully\n")
    
    print("✅ All images built successfully!")
    print("\nVerify with: docker images | grep portfolio")
    return 0

if __name__ == "__main__":
    sys.exit(main())
```

Make it executable:

```bash
chmod +x scripts/build_images.py
```

### Start Development Script

Create `scripts/start_dev.py`:

```python
#!/usr/bin/env python3
"""
Start all services for local development
"""
import subprocess
import sys
import os

def main():
    """Start development environment"""
    print("🚀 Starting development environment...\n")
    
    # Check if .env.local exists
    if not os.path.exists(".env.local"):
        print("⚠️  .env.local not found. Creating from .env.example...")
        if os.path.exists(".env.example"):
            subprocess.run(["cp", ".env.example", ".env.local"])
        else:
            print("❌ .env.example not found. Please create .env.local manually.")
            return 1
    
    # Ask user which method to use
    print("Choose development method:")
    print("1. PM2 (fast, hot reload)")
    print("2. Docker Compose (production parity)")
    
    choice = input("\nEnter choice (1 or 2): ").strip()
    
    if choice == "1":
        print("\n🚀 Starting with PM2...")
        subprocess.run(["pm2", "start", "ecosystem.config.cjs"])
        subprocess.run(["pm2", "logs"])
    elif choice == "2":
        print("\n🐳 Starting with Docker Compose...")
        subprocess.run(["docker", "compose", "-f", "docker-compose.dev.yml", "up", "--build"])
    else:
        print("❌ Invalid choice")
        return 1
    
    return 0

if __name__ == "__main__":
    sys.exit(main())
```

---

## Task 5.13: Integration Testing

### Test Multi-Service Communication

Create `scripts/test_integration.py`:

```python
#!/usr/bin/env python3
"""
Integration tests for all services
"""
import requests
import sys
import time

def test_endpoint(name, url, expected_status=200):
    """Test an endpoint"""
    try:
        response = requests.get(url, timeout=5)
        if response.status_code == expected_status:
            print(f"✅ {name}: OK")
            return True
        else:
            print(f"❌ {name}: Expected {expected_status}, got {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ {name}: {str(e)}")
        return False

def test_contact_form():
    """Test contact form submission"""
    try:
        response = requests.post(
            "http://localhost:8000/api/contact",
            json={
                "name": "Test User",
                "email": "test@example.com",
                "message": "This is a test message"
            },
            timeout=5
        )
        if response.status_code == 200:
            print("✅ Contact form: OK")
            return True
        else:
            print(f"❌ Contact form: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Contact form: {str(e)}")
        return False

def main():
    """Run integration tests"""
    print("🧪 Running integration tests...\n")
    
    # Wait for services to start
    print("⏳ Waiting for services to start...")
    time.sleep(5)
    
    tests = [
        ("Web homepage", "http://localhost:4321"),
        ("API health", "http://localhost:8000/api/health"),
        ("Demos", "http://localhost:7860/demos/"),
    ]
    
    results = []
    for name, url in tests:
        results.append(test_endpoint(name, url))
    
    # Test contact form
    results.append(test_contact_form())
    
    print()
    if all(results):
        print("✅ All tests passed!")
        return 0
    else:
        print("❌ Some tests failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())
```

Install requests:

```bash
pip install requests
```

Run tests:

```bash
python scripts/test_integration.py
```

---

## Task 5.14: Verify Production Parity

### Checklist

Test the following scenarios:

- [ ] **Build succeeds**: All Docker images build without errors
- [ ] **Containers start**: All containers start and stay running
- [ ] **Health checks pass**: All health checks return 200
- [ ] **Port bindings work**: Services accessible on correct ports
- [ ] **Volume mounts work**: Data persists across container restarts
- [ ] **Environment variables**: Services read env vars correctly
- [ ] **Networking**: Services can communicate (if needed)
- [ ] **Logs visible**: Can view logs from all containers
- [ ] **Hot reload works**: Code changes reflect in dev compose
- [ ] **Production compose**: Prod compose works with localhost binds

### Test Production Compose Locally

```bash
# Build and tag images as "latest"
docker build -t portfolio-web:latest ./apps/web
docker build -t portfolio-api:latest ./apps/api
docker build -t portfolio-demos:latest ./apps/demos

# Update docker-compose.prod.yml to use local images
# Change image: lines to:
#   image: portfolio-web:latest
#   image: portfolio-api:latest
#   image: portfolio-demos:latest

# Start production compose
docker compose -f docker-compose.prod.yml up

# Test endpoints
curl http://localhost:8080  # Web
curl http://localhost:8000/api/health  # API
curl http://localhost:7860/demos/  # Demos

# Stop
docker compose -f docker-compose.prod.yml down
```

---

## Stage 3 Completion Checklist

By the end of Stage 3, you should have:

- [ ] Production Dockerfiles for all services
- [ ] Development Dockerfile for web (hot reload)
- [ ] Docker Compose dev configuration
- [ ] Docker Compose prod configuration
- [ ] PM2 configuration for fast development
- [ ] .dockerignore files for all services
- [ ] .env.local for local development
- [ ] Helper scripts (build, start, test)
- [ ] All services tested in containers
- [ ] Integration tests passing
- [ ] Production parity verified

---

## Next Steps

Once Stage 3 is complete, proceed to:

**[Stage 4: GCP Deployment & CI/CD](STAGE_4_GCP_DEPLOYMENT.md)** - Deploy to Google Cloud Platform and set up automated deployments.

---

## Troubleshooting

### Docker Build Fails

**Problem:** Build fails with dependency errors
```bash
# Clear Docker cache
docker system prune -a
docker compose build --no-cache
```

### Container Exits Immediately

**Problem:** Container starts then stops
```bash
# View logs
docker logs <container_name>

# Check if port is already in use
netstat -ano | findstr :8000  # Windows
lsof -i :8000  # Linux/Mac
```

### Volume Permissions (Linux)

**Problem:** Permission denied in mounted volumes
```bash
# Fix permissions
sudo chown -R $USER:$USER data/
chmod -R 755 data/
```

### Hot Reload Not Working

**Problem:** Code changes don't reflect in dev containers
```bash
# Ensure volumes are mounted correctly
# Check docker-compose.dev.yml volumes section
# Restart containers
docker compose -f docker-compose.dev.yml restart
```

### PM2 Python Not Found

**Problem:** PM2 can't find Python
```bash
# Use full path to Python
which python3  # Copy this path
# Update ecosystem.config.cjs with full path
```

---

**Stage 3 Complete!** 🎉

Your services are now containerized and ready for production deployment. Move on to Stage 4 to deploy to GCP.
