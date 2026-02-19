#!/bin/bash

# EC2 setup script
set -e

echo "🔧 Setting up EC2 instance for deployment..."

# Update system
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Docker
echo "🐳 Installing Docker..."
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Install Docker Compose
echo "🔗 Installing Docker Compose..."
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Install Git
echo "📥 Installing Git..."
sudo apt install git -y

# Install Nginx (for SSL termination if needed)
echo "🌐 Installing Nginx..."
sudo apt install nginx -y

# Create app directory
echo "📁 Creating application directory..."
sudo mkdir -p /opt/event-platform
sudo chown $USER:$USER /opt/event-platform

# Create backup directory
echo "💾 Creating backup directory..."
sudo mkdir -p /opt/backups/event-platform
sudo chown $USER:$USER /opt/backups/event-platform

# Setup firewall
echo "🔥 Setting up firewall..."
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw --force enable

# Setup log rotation
echo "📋 Setting up log rotation..."
sudo tee /etc/logrotate.d/event-platform << EOF
/opt/event-platform/logs/*/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    create 644 root root
}
EOF

# Create monitoring config
echo "📊 Setting up monitoring..."
mkdir -p /opt/event-platform/monitoring

cat > /opt/event-platform/monitoring/prometheus.yml << EOF
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'event-backend'
    static_configs:
      - targets: ['backend:5000']
    metrics_path: '/metrics'
    scrape_interval: 5s

  - job_name: 'nginx'
    static_configs:
      - targets: ['frontend:80']
    metrics_path: '/metrics'
    scrape_interval: 5s
EOF

echo "✅ EC2 setup completed!"
echo "🔄 Please log out and log back in to apply Docker group changes"
echo "📝 Next steps:"
echo "   1. Copy your .env file to /opt/event-platform/.env"
echo "   2. Run: cd /opt/event-platform && ./scripts/deploy.sh"
