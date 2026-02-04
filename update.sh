#!/bin/bash

###############################################################################
# Quick Update Script - Update from GitHub
# Run this on the server to pull latest changes and rebuild
###############################################################################

set -e

REPO_DIR="/opt/conference-repo"
APP_DIR="/var/www/conference"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}======================================${NC}"
echo -e "${GREEN}Updating Conference Website${NC}"
echo -e "${GREEN}======================================${NC}"
echo ""

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
  echo -e "${YELLOW}Please run with sudo${NC}"
  exit 1
fi

echo -e "${YELLOW}Step 1: Pulling latest changes from GitHub...${NC}"
cd ${REPO_DIR}
git pull origin main || git pull origin master

echo -e "${YELLOW}Step 2: Installing dependencies...${NC}"
npm install

echo -e "${YELLOW}Step 3: Building application...${NC}"
npm run build

echo -e "${YELLOW}Step 4: Deploying to web directory...${NC}"
rm -rf ${APP_DIR}/*
cp -r ${REPO_DIR}/dist/* ${APP_DIR}/

echo -e "${YELLOW}Step 5: Setting permissions...${NC}"
chown -R www-data:www-data ${APP_DIR}
chmod -R 755 ${APP_DIR}

echo -e "${YELLOW}Step 6: Reloading Nginx...${NC}"
systemctl reload nginx

echo -e "${GREEN}======================================${NC}"
echo -e "${GREEN}Update completed successfully!${NC}"
echo -e "${GREEN}======================================${NC}"
echo -e "Site: ${GREEN}https://confkaraganda2026.kz${NC}"
