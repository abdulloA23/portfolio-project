#!/bin/bash
set -e

# Запуск PHP-FPM в фоне
php-fpm -D

# Выполнение миграций (если есть БД)
if [ ! -z "$DB_HOST" ]; then
    php artisan migrate --force
fi

# Кэширование конфигурации
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Запуск Nginx
nginx -g 'daemon off;'
