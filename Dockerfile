# 1. Use official PHP image with Apache
FROM php:8.2-apache

# 2. Set working directory
WORKDIR /var/www/html

# 3. Install system dependencies and PHP extensions
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    unzip \
    libonig-dev \
    zip \
    npm \
    nodejs \
    && docker-php-ext-configure gd \
        --with-freetype \
        --with-jpeg \
    && docker-php-ext-install pdo pdo_mysql gd zip

# 4. Enable Apache mod_rewrite
RUN a2enmod rewrite

# 5. Install Composer
COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

# 6. Copy project files
COPY . .

# 7. Install PHP dependencies
RUN composer install --optimize-autoloader --no-dev

# 8. Build frontend (если используешь Vite/Laravel Mix)
RUN npm install && npm run build

# 9. Set correct permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage

# 10. Expose port 80
EXPOSE 80

# 11. Start Apache
CMD ["apache2-foreground"]
