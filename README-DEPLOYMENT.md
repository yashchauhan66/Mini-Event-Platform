# AWS EC2 Deployment Guide

## Prerequisites
- AWS EC2 instance (Ubuntu 20.04+)
- Domain name (optional)
- MongoDB Atlas cluster
- GitHub repository

## Quick Setup

### 1. EC2 Setup
```bash
# SSH into EC2
ssh -i your-key.pem ubuntu@your-ec2-ip

# Run setup script
chmod +x scripts/setup-ec2.sh
./scripts/setup-ec2.sh
```

### 2. GitHub Secrets
Add these to your GitHub repository secrets:
- `EC2_HOST`: Your EC2 IP address
- `EC2_USERNAME`: ubuntu (or your username)
- `EC2_SSH_KEY`: Your private SSH key
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Your JWT secret

### 3. Environment Variables
Create `.env` file on EC2:
```bash
cd /opt/event-platform
cp .env.example .env
# Edit .env with your values
```

### 4. Deploy
```bash
./scripts/deploy.sh
```

## GitHub Actions CI/CD
- Push to `main` branch triggers deployment
- Tests run on every PR
- Images built and pushed to GitHub Container Registry
- Automatic deployment to EC2

## Services
- Frontend: http://your-ec2-ip
- Backend API: http://your-ec2-ip/api
- Monitoring: http://your-ec2-ip:3001 (Grafana)

## SSL Setup (Optional)
1. Place SSL certificates in `./ssl/`
2. Update nginx configuration
3. Restart containers

## Monitoring
- Prometheus metrics: http://your-ec2-ip:9090
- Grafana dashboard: http://your-ec2-ip:3001
- Default Grafana password: Set via `GRAFANA_PASSWORD` env var
