#!/bin/bash

###############################################################################
# Quick Update Script - Deploy from GitHub
# Pulls latest changes from GitHub and redeploys
###############################################################################

set -e

# Configuration - ИЗМЕНИТЕ ЭТИ ЗНАЧЕНИЯ
SERVER_IP="YOUR_SERVER_IP"
SERVER_USER="YOUR_USERNAME"
REPO_DIR="/opt/conference-repo"
APP_DIR="/var/www/conference"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}======================================${NC}"
echo -e "${GREEN}Quick Update from GitHub${NC}"
echo -e "${GREEN}======================================${NC}"
echo ""

if [ "$SERVER_IP" == "YOUR_SERVER_IP" ]; then
  echo -e "${YELLOW}ВНИМАНИЕ: Отредактируйте этот скрипт!${NC}"
  echo -e "${YELLOW}Установите SERVER_IP и SERVER_USER на строках 11-12${NC}"
  exit 1
fi

echo -e "${YELLOW}Connecting to server and updating...${NC}"
echo ""

ssh ${SERVER_USER}@${SERVER_IP} << 'ENDSSH'
set -e

# Colors on server
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

REPO_DIR="/opt/conference-repo"
APP_DIR="/var/www/conference"

echo -e "${YELLOW}Step 1: Pulling latest changes from GitHub...${NC}"
cd ${REPO_DIR}
sudo git pull origin main || sudo git pull origin master

echo -e "${YELLOW}Step 2: Installing dependencies...${NC}"
sudo npm install

echo -e "${YELLOW}Step 3: Building application...${NC}"
sudo npm run build

echo -e "${YELLOW}Step 4: Deploying to web directory...${NC}"
sudo rm -rf ${APP_DIR}/*
sudo cp -r ${REPO_DIR}/dist/* ${APP_DIR}/

echo -e "${YELLOW}Step 5: Setting permissions...${NC}"
sudo chown -R www-data:www-data ${APP_DIR}
sudo chmod -R 755 ${APP_DIR}

echo -e "${YELLOW}Step 6: Reloading Nginx...${NC}"
sudo systemctl reload nginx

echo -e "${GREEN}Update completed successfully!${NC}"
echo -e "${GREEN}Site updated at: https://confkaraganda2026.kz${NC}"

ENDSSH

echo ""
echo -e "${GREEN}======================================${NC}"
echo -e "${GREEN}Remote update completed!${NC}"
echo -e "${GREEN}======================================${NC}"
echo -e "Site: ${GREEN}https://confkaraganda2026.kz${NC}"
