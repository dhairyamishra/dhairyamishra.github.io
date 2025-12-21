# Portfolio Website

A modern, full-stack portfolio website with interactive ML demos, deployed on Google Cloud Platform.

## 🎯 Features

- **Professional Portfolio**: Showcase projects, experience, and skills
- **Interactive ML Demos**: Streamlit-powered machine learning demonstrations
- **Contact Form**: Spam-protected contact form with email delivery
- **Serverless Architecture**: Scales automatically, pay only for what you use
- **Single Domain**: Clean path-based routing (no CORS issues)
- **CI/CD Pipeline**: Automated deployments from GitHub to GCP

## 🏗️ Architecture

```
https://yourdomain.com/
├── /              → Web Frontend (React + TypeScript)
├── /api/*         → Backend API (Fastify + TypeScript)
└── /demos/*       → ML Demos (Streamlit + Python)
```

**Tech Stack:**
- **Frontend**: Vite, React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Fastify, TypeScript
- **ML Demos**: Python, Streamlit
- **Infrastructure**: GCP Cloud Run, HTTPS Load Balancer
- **CI/CD**: GitHub Actions with Workload Identity Federation

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Python 3.11+
- Docker & Docker Compose
- PM2 (for local development)
- GCP account (for deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   # Web
   cd apps/web && npm install && cd ../..
   
   # API
   cd apps/api && npm install && cd ../..
   
   # Demos
   cd apps/demos && python -m venv venv && source venv/bin/activate
   pip install -r requirements.txt && cd ../..
   ```

3. **Run all services with PM2**
   ```bash
   npm install -g pm2
   pm2 start ecosystem.config.cjs
   pm2 logs
   ```

4. **Access locally**
   - Web: http://localhost:5173
   - API: http://localhost:8080/api/health
   - Demos: http://localhost:7860

### Docker Development

```bash
# Build and run all services
docker-compose up --build

# Access via:
# http://localhost (web)
# http://localhost/api/health (api)
# http://localhost/demos (streamlit)
```

## 📦 Deployment

See [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) for detailed deployment instructions.

**Quick Deploy to GCP:**
1. Set up GCP project and enable APIs
2. Configure Workload Identity Federation
3. Push to `main` branch → GitHub Actions deploys automatically

## 📁 Project Structure

```
portfolio/
├── apps/
│   ├── web/          # React frontend
│   ├── api/          # Fastify backend
│   └── demos/        # Streamlit ML demos
├── .github/
│   └── workflows/    # CI/CD pipelines
├── docker-compose.yml
├── ecosystem.config.cjs
└── IMPLEMENTATION_PLAN.md
```

## 🔒 Security

- HTTPS enforced with managed SSL certificates
- Rate limiting on contact form (5 requests per 15 min)
- Honeypot spam prevention
- Input validation on all endpoints
- Secrets managed via GCP Secret Manager
- Security headers (CSP, X-Frame-Options, etc.)

## 💰 Cost

**Estimated monthly cost: $20-35** (low traffic)
- Cloud Run: $0-5 (scales to zero)
- HTTPS Load Balancer: $18-25
- Other services: $2-5

## 📝 License

MIT License - see LICENSE file for details

## 🤝 Contributing

This is a personal portfolio project, but feedback and suggestions are welcome!

## 📧 Contact

- Website: https://yourdomain.com
- Email: your-email@example.com
- LinkedIn: https://linkedin.com/in/yourprofile
- GitHub: https://github.com/yourusername
