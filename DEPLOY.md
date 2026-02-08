# Deployment Guide - Google Cloud VM

## Требования

- **Сервер**: Google Cloud VM Instance
- **ОС**: Ubuntu 24.04 LTS
- **Домен**: confkaraganda2026.kz
- **DNS**: Убедитесь, что A-запись домена указывает на IP вашего сервера
- **Права**: root доступ (sudo)

## Подготовка

### GitHub Repository

Код находится в репозитории: **https://github.com/sultangali/conference-karnu.git**

Убедитесь, что:
1. Весь код из папки `client/` запушен в репозиторий
2. Есть все необходимые файлы: `package.json`, `vite.config.js`, `src/`, `public/`
3. В `public/documents/` добавлены все документы (или будут загружены на сервер после деплоя)

## Деплой на сервер

### Вариант 1: Автоматический деплой (рекомендуется)

#### Шаг 1: Подключение к серверу

```bash
ssh username@your-server-ip
```

#### Шаг 2: Загрузка deploy скрипта

На сервере:

```bash
# Скачать скрипт
curl -O https://raw.githubusercontent.com/sultangali/conference-karnu/main/deploy.sh

# Или загрузить с локального компьютера
# На локальном: scp v1.2/deploy.sh username@server-ip:/tmp/
```

#### Шаг 3: Запуск деплоя

```bash
sudo bash deploy.sh
```

Скрипт автоматически:
1. Обновит систему
2. Установит nginx, certbot, Node.js 20 LTS
3. Клонирует репозиторий из GitHub в `/opt/conference-repo`
4. Выполнит `npm install` и `npm run build`
5. Скопирует собранные файлы в `/var/www/conference`
6. Настроит nginx
7. Получит SSL сертификат для confkaraganda2026.kz
8. Настроит автоматическое обновление SSL

### Вариант 2: Ручной деплой

#### 1. Подключение к серверу

```bash
ssh username@your-server-ip
```

#### 2. Обновление системы

```bash
sudo apt update
sudo apt upgrade -y
```

#### 3. Установка Nginx

```bash
sudo apt install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

#### 4. Создание директории для сайта

```bash
sudo mkdir -p /var/www/conference
```

#### 5. Загрузка файлов

С локального компьютера:

```bash
cd v1.2/client
scp -r dist/* username@your-server-ip:/tmp/site/
```

На сервере:

```bash
sudo mv /tmp/site/* /var/www/conference/
sudo chown -R www-data:www-data /var/www/conference
sudo chmod -R 755 /var/www/conference
```

#### 6. Настройка Nginx

Создайте конфигурацию:

```bash
sudo nano /etc/nginx/sites-available/confkaraganda2026.kz
```

Вставьте конфигурацию:

```nginx
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

    # Documents folder: serve real files (PDF etc.), SPA route /documents → index.html (no trailing slash redirect)
    location /documents {
        try_files $uri /index.html;
    }

    # React Router (SPA) - all routes to index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Deny access to hidden files
    location ~ /\. {
        deny all;
    }
}
```

#### 7. Активация сайта

```bash
sudo ln -s /etc/nginx/sites-available/confkaraganda2026.kz /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default  # Удалить дефолтный сайт
sudo nginx -t  # Проверить конфигурацию
sudo systemctl restart nginx
```

#### 8. Настройка Firewall

```bash
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
```

#### 9. Установка SSL сертификата

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d confkaraganda2026.kz -d www.confkaraganda2026.kz --email conf.karaganda.2026@mail.ru --agree-tos --redirect
```

Certbot автоматически:
- Получит SSL сертификат от Let's Encrypt
- Обновит конфигурацию Nginx для HTTPS
- Настроит редирект с HTTP на HTTPS

#### 10. Автоматическое обновление SSL

```bash
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
sudo certbot renew --dry-run  # Тест автообновления
```

## Обновление сайта

### Способ 1: Через GitHub (рекомендуется)

После коммита изменений в GitHub:

**На локальном компьютере:**

```bash
cd v1.2/client
git add .
git commit -m "Update site"
git push origin main
```

**На сервере (или используйте upload-to-server.sh):**

```bash
ssh username@server-ip
sudo bash /opt/conference-repo/update.sh
```

Или вручную:

```bash
cd /opt/conference-repo
sudo git pull origin main
sudo npm install
sudo npm run build
sudo rm -rf /var/www/conference/*
sudo cp -r dist/* /var/www/conference/
sudo chown -R www-data:www-data /var/www/conference
sudo systemctl reload nginx
```

### Способ 2: Автоматизированный update

Используйте скрипт `upload-to-server.sh`:

```bash
# Отредактируйте upload-to-server.sh: укажите SERVER_IP и SERVER_USER
cd v1.2
./upload-to-server.sh
```

Скрипт автоматически подключится к серверу, подтянет изменения из GitHub, пересоберёт и обновит сайт.

## Настройка DNS

В панели вашего регистратора домена (hoster.kz):

1. **A запись**:
   - Host: `@` (или confkaraganda2026.kz)
   - Type: `A`
   - Value: `<IP вашего Google Cloud VM>`
   - TTL: `3600`

2. **A запись для www**:
   - Host: `www`
   - Type: `A`
   - Value: `<IP вашего Google Cloud VM>`
   - TTL: `3600`

Проверка DNS (может занять до 24 часов):

```bash
dig confkaraganda2026.kz +short
dig www.confkaraganda2026.kz +short
```

## Проверка деплоя

### 1. Проверка Nginx

```bash
sudo systemctl status nginx
sudo nginx -t
```

### 2. Проверка SSL

```bash
sudo certbot certificates
```

### 3. Проверка сайта

Откройте в браузере:
- http://confkaraganda2026.kz (должен редиректить на https)
- https://confkaraganda2026.kz
- https://www.confkaraganda2026.kz

### 4. Проверка документов

Убедитесь, что документы доступны:
- https://confkaraganda2026.kz/documents/ru/info_letter_ru.docx

## Logs

### Nginx logs

```bash
# Access log
sudo tail -f /var/log/nginx/access.log

# Error log
sudo tail -f /var/log/nginx/error.log
```

### SSL renewal log

```bash
sudo journalctl -u certbot.timer
```

## Troubleshooting

### Nginx не запускается

```bash
sudo nginx -t  # Проверить конфигурацию
sudo journalctl -xe  # Проверить системные логи
```

### SSL сертификат не получается

1. Проверьте DNS: `dig confkaraganda2026.kz +short`
2. Проверьте firewall: `sudo ufw status`
3. Проверьте, что порты 80 и 443 открыты
4. Проверьте логи: `sudo certbot --nginx -d confkaraganda2026.kz -d www.confkaraganda2026.kz --dry-run`

### Сайт не открывается

1. Проверьте статус nginx: `sudo systemctl status nginx`
2. Проверьте файлы в `/var/www/conference` - должен быть `index.html`
3. Проверьте права: `ls -la /var/www/conference`
4. Проверьте логи nginx

## Бэкап

### Создание бэкапа

```bash
sudo tar -czf /backup/conference-$(date +%Y%m%d).tar.gz /var/www/conference
```

### Восстановление из бэкапа

```bash
sudo tar -xzf /backup/conference-YYYYMMDD.tar.gz -C /
sudo systemctl reload nginx
```

## Мониторинг

### Проверка статуса сервисов

```bash
sudo systemctl status nginx
sudo systemctl status certbot.timer
```

### Проверка использования диска

```bash
df -h
```

### Проверка памяти

```bash
free -h
```

## Важные команды

```bash
# Перезапуск Nginx
sudo systemctl restart nginx

# Reload конфигурации без остановки
sudo systemctl reload nginx

# Проверка конфигурации
sudo nginx -t

# Обновление SSL вручную
sudo certbot renew

# Просмотр всех сертификатов
sudo certbot certificates
```

## Безопасность

### Рекомендации:

1. **SSH**: Используйте ключи вместо паролей
2. **Firewall**: Держите только нужные порты открытыми (22, 80, 443)
3. **Updates**: Регулярно обновляйте систему (`sudo apt update && sudo apt upgrade`)
4. **Backups**: Делайте регулярные бэкапы
5. **Monitoring**: Настройте мониторинг (uptime monitoring, log aggregation)

## Поддержка

Email: conf.karaganda.2026@mail.ru
Phone: +7 775 151 03 36 (Мусина Н.М.)
