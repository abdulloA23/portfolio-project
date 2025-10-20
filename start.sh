#!/bin/bash

# Запуск PHP-FPM в фоне
php-fpm -D

# Выполнение миграций
php artisan migrate --force

# Кэширование конфигурации
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Запуск Nginx
nginx -g 'daemon off;'
```

## 4. Настройте .env для production

Убедитесь, что в вашем `.env` указано:
```
APP_ENV=production
APP_DEBUG=false
