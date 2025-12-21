# Stage 4: GCP Deployment & CI/CD
## Phases 6-8: Cloud Infrastructure and Automation

**Duration:** 1 week  
**Prerequisites:** Stage 3 completed (containerized services)  
**Deliverables:** Production deployment on GCP with automated CI/CD

---

## Overview

This stage takes your containerized services to production on Google Cloud Platform. You'll provision a VM with persistent storage, configure Nginx as a reverse proxy with SSL, and set up automated deployments via GitHub Actions.

**Key Goals:**
- Deploy to a production-ready GCP environment
- Configure HTTPS with Let's Encrypt
- Set up automated CI/CD pipeline
- Ensure zero-downtime deployments

---

## Phase 6: Provision GCP VM + Persistent Disk

### Objectives
- Create and configure a GCP Compute Engine VM
- Attach and mount a persistent disk for data storage
- Install Docker and required dependencies
- Configure networking and firewall rules

---

## Task 6.1: Set Up GCP Project

### Create GCP Project

```bash
# Set variables
export PROJECT_ID="your-portfolio-project"
export PROJECT_NAME="Portfolio Platform"
export BILLING_ACCOUNT_ID="your-billing-account-id"

# Create project
gcloud projects create $PROJECT_ID \
  --name="$PROJECT_NAME"

# Link billing account
gcloud billing projects link $PROJECT_ID \
  --billing-account=$BILLING_ACCOUNT_ID

# Set as default project
gcloud config set project $PROJECT_ID
```

### Enable Required APIs

```bash
# Enable Compute Engine API
gcloud services enable compute.googleapis.com

# Enable Artifact Registry API (for Docker images)
gcloud services enable artifactregistry.googleapis.com

# Enable Cloud Build API (for CI/CD)
gcloud services enable cloudbuild.googleapis.com

# Verify enabled services
gcloud services list --enabled
```

---

## Task 6.2: Create Compute Engine VM

### Set Variables

```bash
# VM configuration
export VM_NAME="portfolio-vm"
export ZONE="us-central1-a"
export REGION="us-central1"
export MACHINE_TYPE="e2-medium"  # 2 vCPU, 4GB RAM
export BOOT_DISK_SIZE="20GB"
export IMAGE_FAMILY="ubuntu-2204-lts"
export IMAGE_PROJECT="ubuntu-os-cloud"
```

### Create VM Instance

```bash
# Create VM
gcloud compute instances create $VM_NAME \
  --project=$PROJECT_ID \
  --zone=$ZONE \
  --machine-type=$MACHINE_TYPE \
  --image-family=$IMAGE_FAMILY \
  --image-project=$IMAGE_PROJECT \
  --boot-disk-size=$BOOT_DISK_SIZE \
  --boot-disk-type=pd-standard \
  --tags=http-server,https-server \
  --metadata=startup-script='#!/bin/bash
    apt-get update
    apt-get install -y git curl wget
  '

# Verify VM is running
gcloud compute instances list
```

---

## Task 6.3: Reserve Static IP Address

```bash
# Reserve static external IP
gcloud compute addresses create portfolio-ip \
  --project=$PROJECT_ID \
  --region=$REGION

# Get the reserved IP address
export STATIC_IP=$(gcloud compute addresses describe portfolio-ip \
  --project=$PROJECT_ID \
  --region=$REGION \
  --format="get(address)")

echo "Reserved IP: $STATIC_IP"

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
```

**Important:** Point your domain's A record to this IP address in your DNS settings.

---

## Task 6.4: Configure Firewall Rules

```bash
# Allow HTTP (port 80)
gcloud compute firewall-rules create allow-http \
  --project=$PROJECT_ID \
  --allow=tcp:80 \
  --source-ranges=0.0.0.0/0 \
  --target-tags=http-server \
  --description="Allow HTTP traffic"

# Allow HTTPS (port 443)
gcloud compute firewall-rules create allow-https \
  --project=$PROJECT_ID \
  --allow=tcp:443 \
  --source-ranges=0.0.0.0/0 \
  --target-tags=https-server \
  --description="Allow HTTPS traffic"

# SSH via Identity-Aware Proxy (recommended)
gcloud compute firewall-rules create allow-ssh-iap \
  --project=$PROJECT_ID \
  --allow=tcp:22 \
  --source-ranges=35.235.240.0/20 \
  --description="Allow SSH via IAP"

# Verify firewall rules
gcloud compute firewall-rules list
```

---

## Task 6.5: Create and Attach Persistent Disk

### Create Persistent Disk

```bash
# Disk configuration
export DISK_NAME="portfolio-data-disk"
export DISK_SIZE="100GB"  # Adjust based on your needs
export DISK_TYPE="pd-standard"  # or pd-ssd for better performance

# Create disk
gcloud compute disks create $DISK_NAME \
  --project=$PROJECT_ID \
  --zone=$ZONE \
  --size=$DISK_SIZE \
  --type=$DISK_TYPE

# Attach disk to VM
gcloud compute instances attach-disk $VM_NAME \
  --project=$PROJECT_ID \
  --zone=$ZONE \
  --disk=$DISK_NAME
```

---

## Task 6.6: SSH into VM and Configure

### Connect to VM

```bash
# SSH via IAP (recommended)
gcloud compute ssh $VM_NAME \
  --project=$PROJECT_ID \
  --zone=$ZONE \
  --tunnel-through-iap

# Or use standard SSH
gcloud compute ssh $VM_NAME \
  --project=$PROJECT_ID \
  --zone=$ZONE
```

### Format and Mount Persistent Disk

```bash
# Find the disk device name
ls -l /dev/disk/by-id/google-*

# Set the disk device path (use stable by-id path)
export DISK_DEVICE="/dev/disk/by-id/google-portfolio-data-disk"

# Format the disk (ONLY DO THIS ONCE - will erase data!)
sudo mkfs.ext4 -m 0 -E lazy_itable_init=0,lazy_journal_init=0,discard $DISK_DEVICE

# Create mount point
sudo mkdir -p /mnt/data

# Mount the disk
sudo mount -o discard,defaults $DISK_DEVICE /mnt/data

# Set permissions
sudo chmod a+w /mnt/data
sudo chown $USER:$USER /mnt/data

# Verify mount
df -h /mnt/data
```

### Configure Automatic Mount on Reboot

```bash
# Get the disk UUID
sudo blkid $DISK_DEVICE

# Copy the UUID value (e.g., UUID="abc123...")

# Edit fstab
sudo nano /etc/fstab

# Add this line (replace UUID with your actual UUID):
# UUID=your-uuid-here /mnt/data ext4 discard,defaults,nofail 0 2

# Test the fstab entry
sudo umount /mnt/data
sudo mount -a
df -h /mnt/data  # Should show the disk mounted
```

---

## Task 6.7: Create Data Directory Structure

```bash
# Create directory structure on persistent disk
cd /mnt/data
mkdir -p models datasets outputs uploads

# Create subdirectories for organization
mkdir -p models/{nlp,cv,audio}
mkdir -p datasets/{images,text,audio}
mkdir -p outputs/{generated_text,generated_images}
mkdir -p uploads/user_files

# Set permissions
chmod -R 755 /mnt/data

# Verify structure
tree -L 2 /mnt/data
```

---

## Task 6.8: Install Docker and Docker Compose

```bash
# Update system
sudo apt-get update
sudo apt-get upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add user to docker group
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Log out and back in for group changes to take effect
exit

# SSH back in
gcloud compute ssh $VM_NAME --zone=$ZONE --tunnel-through-iap

# Verify installations
docker --version
docker compose version
```

---

## Task 6.9: Clone Repository and Set Up

```bash
# Clone repository
cd ~
git clone https://github.com/yourusername/portfolio.git
cd portfolio

# Create symlink to data directory
ln -s /mnt/data data

# Verify symlink
ls -la data/

# Create production environment file
sudo mkdir -p /etc/portfolio
sudo touch /etc/portfolio/.env
sudo chmod 600 /etc/portfolio/.env
sudo chown $USER:$USER /etc/portfolio/.env

# Edit environment file
nano /etc/portfolio/.env
```

Add production environment variables:

```bash
# /etc/portfolio/.env
ENVIRONMENT=production

# Email Configuration
SENDGRID_API_KEY=your_production_sendgrid_key
FROM_EMAIL=noreply@yourdomain.com
TO_EMAIL=your@email.com

# Rate Limiting
RATE_LIMIT_PER_MINUTE=5

# CORS
CORS_ORIGINS=https://yourdomain.com

# GCP Configuration
GCP_PROJECT_ID=your-portfolio-project
GCP_REGION=us-central1
```

---

## Phase 7: Configure Host Nginx + TLS

### Objectives
- Install and configure Nginx as reverse proxy
- Obtain SSL certificate with Let's Encrypt
- Configure path-based routing for all services
- Set up automatic certificate renewal

---

## Task 7.1: Install Nginx

```bash
# Install Nginx
sudo apt-get update
sudo apt-get install -y nginx

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Verify Nginx is running
sudo systemctl status nginx

# Test default page
curl http://localhost
```

---

## Task 7.2: Create Nginx Configuration

Create `infra/nginx/portfolio.conf`:

```nginx
# HTTP to HTTPS redirect
server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com www.yourdomain.com;
    
    # Allow Let's Encrypt ACME challenge
    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }
    
    # Redirect all other traffic to HTTPS
    location / {
        return 301 https://$server_name$request_uri;
    }
}

# HTTPS server
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL certificates (will be configured by certbot)
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Logging
    access_log /var/log/nginx/portfolio-access.log;
    error_log /var/log/nginx/portfolio-error.log;

    # Trailing slash redirects
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
    location /demos/ {
        proxy_pass http://127.0.0.1:7860;
        proxy_http_version 1.1;
        
        # WebSocket support
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Prefix /demos;
        
        # Timeouts for long-running requests
        proxy_connect_timeout 300s;
        proxy_send_timeout 300s;
        proxy_read_timeout 300s;
    }

    # Web - Astro static served by nginx container (must be last)
    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            proxy_pass http://127.0.0.1:8080;
            proxy_cache_valid 200 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

---

## Task 7.3: Deploy Nginx Configuration

```bash
# Copy configuration to Nginx sites-available
sudo cp ~/portfolio/infra/nginx/portfolio.conf /etc/nginx/sites-available/portfolio

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Enable portfolio site
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/

# Test configuration (will fail until SSL certs are obtained)
sudo nginx -t

# Don't reload yet - we need SSL certificates first
```

---

## Task 7.4: Obtain SSL Certificate with Let's Encrypt

```bash
# Install Certbot
sudo apt-get update
sudo apt-get install -y certbot python3-certbot-nginx

# Obtain certificate (replace with your domain)
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Follow prompts:
# - Enter email address
# - Agree to terms of service
# - Choose whether to redirect HTTP to HTTPS (select Yes)

# Test automatic renewal
sudo certbot renew --dry-run

# Certbot will automatically set up a cron job for renewal
```

---

## Task 7.5: Test Nginx Configuration

```bash
# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx

# Check status
sudo systemctl status nginx

# View logs
sudo tail -f /var/log/nginx/portfolio-error.log
```

---

## Phase 8: CI/CD with GitHub Actions

### Objectives
- Set up GCP Artifact Registry for Docker images
- Create GitHub Actions workflow for automated builds
- Configure automated deployment to VM
- Implement smoke tests after deployment

---

## Task 8.1: Set Up Artifact Registry

```bash
# Create Artifact Registry repository
gcloud artifacts repositories create portfolio \
  --project=$PROJECT_ID \
  --repository-format=docker \
  --location=$REGION \
  --description="Portfolio Docker images"

# Configure Docker to use Artifact Registry
gcloud auth configure-docker ${REGION}-docker.pkg.dev

# Verify repository
gcloud artifacts repositories list --project=$PROJECT_ID
```

---

## Task 8.2: Create Service Account for CI/CD

```bash
# Create service account
gcloud iam service-accounts create github-actions \
  --project=$PROJECT_ID \
  --description="Service account for GitHub Actions" \
  --display-name="GitHub Actions"

# Grant permissions
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:github-actions@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role="roles/artifactregistry.writer"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:github-actions@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role="roles/compute.instanceAdmin.v1"

# Create and download key
gcloud iam service-accounts keys create ~/github-actions-key.json \
  --iam-account=github-actions@${PROJECT_ID}.iam.gserviceaccount.com

# Display key (save this for GitHub Secrets)
cat ~/github-actions-key.json
```

---

## Task 8.3: Configure GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add the following secrets:

| Secret Name | Value |
|-------------|-------|
| `GCP_PROJECT_ID` | Your GCP project ID |
| `GCP_REGION` | `us-central1` |
| `GCP_SA_KEY` | Contents of `github-actions-key.json` |
| `VM_IP` | Your VM's static IP address |
| `VM_USER` | Your VM username (usually your Google account name) |
| `SSH_PRIVATE_KEY` | SSH private key for VM access (see below) |

### Generate SSH Key for GitHub Actions

```bash
# On your local machine
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github-actions

# Copy public key
cat ~/.ssh/github-actions.pub

# Add public key to VM
gcloud compute ssh $VM_NAME --zone=$ZONE --tunnel-through-iap

# On VM
mkdir -p ~/.ssh
nano ~/.ssh/authorized_keys
# Paste the public key, save and exit

# Back on local machine, copy private key for GitHub Secret
cat ~/.ssh/github-actions
# Copy this entire output to GitHub Secret SSH_PRIVATE_KEY
```

---

## Task 8.4: Create GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GCP VM

on:
  push:
    branches: [main]
  workflow_dispatch:  # Allow manual triggers

env:
  GCP_REGION: us-central1
  REGISTRY: us-central1-docker.pkg.dev
  PROJECT_ID: ${{ secrets.GCP_PROJECT_ID }}
  REPO_NAME: portfolio

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Set image tag (git SHA)
        id: vars
        run: echo "IMAGE_TAG=$(git rev-parse --short HEAD)" >> $GITHUB_OUTPUT
      
      - name: Set up Cloud SDK
        uses: google-github-actions/setup-gcloud@v2
        with:
          service_account_key: ${{ secrets.GCP_SA_KEY }}
          project_id: ${{ secrets.GCP_PROJECT_ID }}
      
      - name: Configure Docker for Artifact Registry
        run: gcloud auth configure-docker ${{ env.GCP_REGION }}-docker.pkg.dev
      
      - name: Build and push Web image
        env:
          IMAGE_TAG: ${{ steps.vars.outputs.IMAGE_TAG }}
        run: |
          docker build -t ${{ env.REGISTRY }}/${{ env.PROJECT_ID }}/${{ env.REPO_NAME }}/web:$IMAGE_TAG ./apps/web
          docker tag ${{ env.REGISTRY }}/${{ env.PROJECT_ID }}/${{ env.REPO_NAME }}/web:$IMAGE_TAG \
                     ${{ env.REGISTRY }}/${{ env.PROJECT_ID }}/${{ env.REPO_NAME }}/web:latest
          docker push ${{ env.REGISTRY }}/${{ env.PROJECT_ID }}/${{ env.REPO_NAME }}/web:$IMAGE_TAG
          docker push ${{ env.REGISTRY }}/${{ env.PROJECT_ID }}/${{ env.REPO_NAME }}/web:latest
      
      - name: Build and push API image
        env:
          IMAGE_TAG: ${{ steps.vars.outputs.IMAGE_TAG }}
        run: |
          docker build -t ${{ env.REGISTRY }}/${{ env.PROJECT_ID }}/${{ env.REPO_NAME }}/api:$IMAGE_TAG ./apps/api
          docker tag ${{ env.REGISTRY }}/${{ env.PROJECT_ID }}/${{ env.REPO_NAME }}/api:$IMAGE_TAG \
                     ${{ env.REGISTRY }}/${{ env.PROJECT_ID }}/${{ env.REPO_NAME }}/api:latest
          docker push ${{ env.REGISTRY }}/${{ env.PROJECT_ID }}/${{ env.REPO_NAME }}/api:$IMAGE_TAG
          docker push ${{ env.REGISTRY }}/${{ env.PROJECT_ID }}/${{ env.REPO_NAME }}/api:latest
      
      - name: Build and push Demos image
        env:
          IMAGE_TAG: ${{ steps.vars.outputs.IMAGE_TAG }}
        run: |
          docker build -t ${{ env.REGISTRY }}/${{ env.PROJECT_ID }}/${{ env.REPO_NAME }}/demos:$IMAGE_TAG ./apps/demos
          docker tag ${{ env.REGISTRY }}/${{ env.PROJECT_ID }}/${{ env.REPO_NAME }}/demos:$IMAGE_TAG \
                     ${{ env.REGISTRY }}/${{ env.PROJECT_ID }}/${{ env.REPO_NAME }}/demos:latest
          docker push ${{ env.REGISTRY }}/${{ env.PROJECT_ID }}/${{ env.REPO_NAME }}/demos:$IMAGE_TAG
          docker push ${{ env.REGISTRY }}/${{ env.PROJECT_ID }}/${{ env.REPO_NAME }}/demos:latest
      
      - name: Deploy to VM
        uses: appleboy/ssh-action@master
        env:
          IMAGE_TAG: ${{ steps.vars.outputs.IMAGE_TAG }}
          REGISTRY: ${{ env.REGISTRY }}
          PROJECT_ID: ${{ env.PROJECT_ID }}
          REPO_NAME: ${{ env.REPO_NAME }}
        with:
          host: ${{ secrets.VM_IP }}
          username: ${{ secrets.VM_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          envs: IMAGE_TAG,REGISTRY,PROJECT_ID,REPO_NAME
          script: |
            cd ~/portfolio
            
            # Pull latest code (optional, mainly for configs)
            git pull origin main
            
            # Set environment variables for docker-compose
            export GIT_SHA=$IMAGE_TAG
            export REGISTRY=$REGISTRY
            export PROJECT_ID=$PROJECT_ID
            
            # Configure Docker to use Artifact Registry
            gcloud auth configure-docker ${REGISTRY%%/*}
            
            # Pull latest images
            docker compose -f docker-compose.prod.yml pull
            
            # Restart services
            docker compose -f docker-compose.prod.yml up -d
            
            # Clean up old images
            docker image prune -f
      
      - name: Wait for services to start
        run: sleep 30
      
      - name: Smoke tests
        run: |
          echo "Testing homepage..."
          curl -f https://yourdomain.com || exit 1
          
          echo "Testing API health..."
          curl -f https://yourdomain.com/api/health || exit 1
          
          echo "Testing demos..."
          curl -f https://yourdomain.com/demos/ || exit 1
          
          echo "✅ All smoke tests passed!"
      
      - name: Notify on failure
        if: failure()
        run: echo "❌ Deployment failed! Check logs."
```

---

## Task 8.5: Update docker-compose.prod.yml for Registry

Update `docker-compose.prod.yml` to use Artifact Registry images:

```yaml
version: '3.8'

services:
  web:
    image: ${REGISTRY}/us-central1-docker.pkg.dev/${PROJECT_ID}/portfolio/web:${GIT_SHA:-latest}
    # ... rest of configuration
  
  api:
    image: ${REGISTRY}/us-central1-docker.pkg.dev/${PROJECT_ID}/portfolio/api:${GIT_SHA:-latest}
    # ... rest of configuration
  
  demos:
    image: ${REGISTRY}/us-central1-docker.pkg.dev/${PROJECT_ID}/portfolio/demos:${GIT_SHA:-latest}
    # ... rest of configuration
```

---

## Task 8.6: Configure VM for Artifact Registry Access

```bash
# SSH into VM
gcloud compute ssh $VM_NAME --zone=$ZONE --tunnel-through-iap

# Configure Docker to use Artifact Registry
gcloud auth configure-docker us-central1-docker.pkg.dev

# Test pulling an image
docker pull us-central1-docker.pkg.dev/${PROJECT_ID}/portfolio/web:latest
```

---

## Task 8.7: Test CI/CD Pipeline

```bash
# Make a small change to trigger deployment
echo "# Test deployment" >> README.md

# Commit and push
git add README.md
git commit -m "test: trigger CI/CD pipeline"
git push origin main

# Monitor GitHub Actions
# Go to: https://github.com/yourusername/portfolio/actions

# Watch the workflow run
# Check VM logs
gcloud compute ssh $VM_NAME --zone=$ZONE --tunnel-through-iap
docker compose -f ~/portfolio/docker-compose.prod.yml logs -f
```

---

## Stage 4 Completion Checklist

By the end of Stage 4, you should have:

- [ ] GCP project created and configured
- [ ] Compute Engine VM provisioned (e2-medium)
- [ ] Static IP address reserved and assigned
- [ ] Persistent disk created, attached, and mounted
- [ ] Firewall rules configured (HTTP, HTTPS, SSH)
- [ ] Docker and Docker Compose installed on VM
- [ ] Data directory structure created
- [ ] Repository cloned on VM
- [ ] Nginx installed and configured
- [ ] SSL certificate obtained (Let's Encrypt)
- [ ] HTTPS working with automatic HTTP redirect
- [ ] Artifact Registry repository created
- [ ] Service account for CI/CD created
- [ ] GitHub Secrets configured
- [ ] GitHub Actions workflow created
- [ ] Automated deployment working
- [ ] Smoke tests passing
- [ ] All services accessible via HTTPS

---

## Next Steps

Once Stage 4 is complete, proceed to:

**[Stage 5: Production Hardening & Expansion](STAGE_5_PRODUCTION.md)** - Secure your deployment, add monitoring, and expand with new projects.

---

## Troubleshooting

### SSL Certificate Issues

**Problem:** Certbot fails to obtain certificate
```bash
# Ensure domain points to VM IP
dig yourdomain.com

# Check Nginx is running
sudo systemctl status nginx

# Try manual certificate
sudo certbot certonly --standalone -d yourdomain.com
```

### Docker Pull Fails on VM

**Problem:** Cannot pull images from Artifact Registry
```bash
# Re-authenticate
gcloud auth configure-docker us-central1-docker.pkg.dev

# Check service account permissions
gcloud projects get-iam-policy $PROJECT_ID
```

### GitHub Actions Fails

**Problem:** Deployment step fails
```bash
# Check GitHub Secrets are set correctly
# Verify SSH key has correct permissions
# Check VM is accessible from GitHub Actions IP ranges
```

### Services Not Starting

**Problem:** Containers exit immediately
```bash
# Check logs
docker compose -f docker-compose.prod.yml logs

# Check environment variables
cat /etc/portfolio/.env

# Verify images pulled correctly
docker images | grep portfolio
```

---

**Stage 4 Complete!** 🎉

Your portfolio is now live on GCP with automated deployments! Move on to Stage 5 to harden security and add new features.
