FROM php:8.2-fpm

# Установка зависимостей
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    nginx

# Установка PHP расширений
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Установка Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Рабочая директория
WORKDIR /var/www

# Копирование файлов проекта
COPY . /var/www

# Установка зависимостей Laravel
RUN composer install --optimize-autoloader --no-dev

# Настройка прав
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# Копирование конфигурации Nginx
COPY nginx.conf /etc/nginx/sites-available/default

# Скрипт запуска
COPY start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 8080

CMD ["/start.sh"]
