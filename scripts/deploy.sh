#!/bin/bash

# Deployment script for AWS EC2
set -e

echo "🚀 Starting deployment to EC2..."

# Configuration
APP_DIR="/opt/event-platform"
BACKUP_DIR="/opt/backups/event-platform"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Create backup
echo "📦 Creating backup..."
mkdir -p $BACKUP_DIR
if [ -d "$APP_DIR" ]; then
    tar -czf "$BACKUP_DIR/backup_$TIMESTAMP.tar.gz" -C "$APP_DIR" .
fi

# Create app directory
sudo mkdir -p $APP_DIR
cd $APP_DIR

# Clone or pull latest code
if [ ! -d ".git" ]; then
    echo "📥 Cloning repository..."
    git clone https://github.com/${GITHUB_REPOSITORY}.git .
else
    echo "📥 Pulling latest changes..."
    git pull origin main
fi

# Set up environment
echo "⚙️ Setting up environment..."
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "⚠️  Please update .env file with your production values!"
fi

# Create necessary directories
mkdir -p uploads logs ssl monitoring

# Build and deploy
echo "🐳 Building and deploying containers..."
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml pull
docker-compose -f docker-compose.prod.yml up -d --build

# Wait for services to be healthy
echo "⏳ Waiting for services to be healthy..."
sleep 30

# Check service health
echo "🔍 Checking service health..."
if curl -f http://localhost/api/events > /dev/null 2>&1; then
    echo "✅ Backend is healthy"
else
    echo "❌ Backend health check failed"
    exit 1
fi

if curl -f http://localhost > /dev/null 2>&1; then
    echo "✅ Frontend is healthy"
else
    echo "❌ Frontend health check failed"
    exit 1
fi

# Clean up old images
echo "🧹 Cleaning up old Docker images..."
docker image prune -f

echo "🎉 Deployment completed successfully!"
echo "🌐 Application is available at: http://$(curl -s ifconfig.me)"
echo "📊 Grafana dashboard: http://$(curl -s ifconfig.me):3001"
