#!/bin/bash

###############################################################################
# Deployment Script for Conference Website
# Target: Google Cloud VM Instance (Ubuntu 24.04 LTS)
# Domain: confkaraganda2026.kz
# Stack: Static React + Nginx + SSL (Certbot)
# Repository: https://github.com/sultangali/conference-karnu.git
###############################################################################

set -e  # Exit on error

# Configuration
DOMAIN="confkaraganda2026.kz"
WWW_DOMAIN="www.${DOMAIN}"
APP_DIR="/var/www/conference"
REPO_DIR="/opt/conference-repo"
NGINX_AVAILABLE="/etc/nginx/sites-available"
NGINX_ENABLED="/etc/nginx/sites-enabled"
EMAIL="conf.karaganda.2026@mail.ru"
REPO_URL="https://github.com/sultangali/conference-karnu.git"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}======================================${NC}"
echo -e "${GREEN}Conference Website Deployment Script${NC}"
echo -e "${GREEN}======================================${NC}"
echo ""

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
  echo -e "${RED}Please run as root (use sudo)${NC}"
  exit 1
fi

echo -e "${YELLOW}Step 1: Updating system packages...${NC}"
apt update
apt upgrade -y

echo -e "${YELLOW}Step 2: Installing required packages...${NC}"
apt install -y nginx certbot python3-certbot-nginx curl git

echo -e "${YELLOW}Step 3: Installing Node.js 20 LTS...${NC}"
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Verify installation
echo -e "${GREEN}Node version: $(node --version)${NC}"
echo -e "${GREEN}NPM version: $(npm --version)${NC}"

echo -e "${YELLOW}Step 4: Cloning repository...${NC}"
if [ -d "${REPO_DIR}" ]; then
  echo -e "${YELLOW}Repository already exists. Pulling latest changes...${NC}"
  cd ${REPO_DIR}
  git pull origin main || git pull origin master
else
  echo -e "${YELLOW}Cloning repository...${NC}"
  git clone ${REPO_URL} ${REPO_DIR}
fi

echo -e "${YELLOW}Step 5: Building React application...${NC}"
cd ${REPO_DIR}
npm install
npm run build

echo -e "${YELLOW}Step 6: Deploying built files...${NC}"
mkdir -p ${APP_DIR}
rm -rf ${APP_DIR}/*
cp -r ${REPO_DIR}/dist/* ${APP_DIR}/

echo -e "${YELLOW}Step 7: Setting correct permissions...${NC}"
chown -R www-data:www-data ${APP_DIR}
chmod -R 755 ${APP_DIR}

echo -e "${YELLOW}Step 8: Configuring Nginx...${NC}"
cat > ${NGINX_AVAILABLE}/${DOMAIN} << 'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name confkaraganda2026.kz www.confkaraganda2026.kz;

    root /var/www/conference;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Documents folder
    location /documents {
        try_files $uri $uri/ =404;
    }

    # Assets folder
    location /assets {
        try_files $uri $uri/ =404;
    }

    # React Router (SPA) - all other routes to index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Deny access to hidden files
    location ~ /\. {
        deny all;
    }
}
EOF

echo -e "${YELLOW}Step 9: Enabling Nginx site...${NC}"
# Remove default site if exists
if [ -L "${NGINX_ENABLED}/default" ]; then
    rm ${NGINX_ENABLED}/default
fi

# Enable our site
ln -sf ${NGINX_AVAILABLE}/${DOMAIN} ${NGINX_ENABLED}/${DOMAIN}

echo -e "${YELLOW}Step 10: Testing Nginx configuration...${NC}"
nginx -t

echo -e "${YELLOW}Step 11: Restarting Nginx...${NC}"
systemctl restart nginx
systemctl enable nginx

echo -e "${YELLOW}Step 12: Configuring firewall...${NC}"
ufw allow 'Nginx Full'
ufw allow OpenSSH
echo "y" | ufw enable

echo -e "${YELLOW}Step 13: Installing SSL certificate with Certbot...${NC}"
echo -e "${YELLOW}Note: Make sure DNS A record for ${DOMAIN} points to this server IP${NC}"
echo -e "${YELLOW}Current server IP:${NC}"
curl -s ifconfig.me
echo ""
echo -e "${YELLOW}Waiting 10 seconds for DNS propagation check...${NC}"
sleep 10

# Obtain SSL certificate
certbot --nginx -d ${DOMAIN} -d ${WWW_DOMAIN} \
  --non-interactive \
  --agree-tos \
  --email ${EMAIL} \
  --redirect

echo -e "${YELLOW}Step 14: Setting up auto-renewal for SSL...${NC}"
systemctl enable certbot.timer
systemctl start certbot.timer

# Test renewal
certbot renew --dry-run

echo -e "${GREEN}======================================${NC}"
echo -e "${GREEN}Deployment completed successfully!${NC}"
echo -e "${GREEN}======================================${NC}"
echo ""
echo -e "${GREEN}Your site is now available at:${NC}"
echo -e "  https://${DOMAIN}"
echo -e "  https://${WWW_DOMAIN}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo -e "1. Upload your documents to: ${APP_DIR}/documents/"
echo -e "   Example:"
echo -e "   scp client/public/documents/kz/info_letter_kz.docx user@server:${APP_DIR}/documents/kz/"
echo -e ""
echo -e "2. Place logo at: ${APP_DIR}/assets/logo.png"
echo -e "   scp assets/logo.png user@server:${APP_DIR}/assets/"
echo -e ""
echo -e "${YELLOW}SSL Certificate will auto-renew via certbot timer${NC}"
echo -e "${YELLOW}Nginx logs: /var/log/nginx/${NC}"
echo -e "${YELLOW}To update site: git pull in ${REPO_DIR}, rebuild, and copy to ${APP_DIR}${NC}"
echo ""
echo -e "${GREEN}Deployment script finished!${NC}"
