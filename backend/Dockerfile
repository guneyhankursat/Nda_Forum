# Build and run NestJS application
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

# Runtime environment
FROM node:20-alpine AS production

WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install runtime dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy compiled application
COPY --from=builder /app/dist ./dist

# Create application user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

# Set file permissions
RUN chown -R nestjs:nodejs /app
USER nestjs

# Network port
EXPOSE 3000

# Application health monitoring
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

# Launch application
CMD ["node", "dist/main"] 