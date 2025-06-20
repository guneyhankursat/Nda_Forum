# Build and serve Vue.js application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install build dependencies
RUN npm ci

# Copy source code
COPY . .

# Compile application
RUN npm run build

# Web server environment
FROM nginx:alpine AS production

# Copy compiled application
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy server configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Network port
EXPOSE 80

# Application health monitoring
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

# Launch web server
CMD ["nginx", "-g", "daemon off;"] 