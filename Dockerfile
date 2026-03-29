# Menggunakan Node.js 20 Alpine (Ringan & Stabil)
FROM node:20

# 1. Instal library sistem yang dibutuhkan untuk WA Bot (FFmpeg, dll)
RUN apk add --no-cache \
    apt-get update \
    apt-get install -y \
    ffmpeg \
    nodejs \
    imagemagick \
    webp \
    apt-get upgrade -y \
    g++ \
    git

# 2. Set environment agar NPM tidak rewel saat instalasi di CI
ENV NPM_CONFIG_LOGLEVEL=warn
ENV NODE_ENV=production

WORKDIR /app

# 3. Salin file package saja dulu untuk optimasi cache layer
COPY package*.json ./

# 4. Trik Rahasia: Naikkan timeout NPM & Retry agar tidak kena Error 254
RUN npm config set fetch-retries 5 && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000 && \
    npm install -g pm2
# 5. Salin sisa kode project
COPY RAEHAN2GD.js

# 6. Jalankan aplikasi (Bisa ganti ke pm2-runtime jika kamu pakai PM2)
CMD ["pm2 start", "index.js"]
