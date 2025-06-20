# Docker Setup for NDA Forum

This document explains how to run the NDA Forum application using Docker.

## Prerequisites

- Docker
- Docker Compose
- OpenAI API Key (optional, for AI features)

## Quick Start

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Nda_Forum
   ```

2. **Set up environment variables:**
   ```bash
   # Create .env file in root directory
   echo "OPENAI_API_KEY=your_openai_api_key_here" > .env
   ```

3. **Build and start all services:**
   ```bash
   docker-compose up --build
   ```

4. **Access the application:**
   - Frontend: http://localhost
   - Backend API: http://localhost:3000
   - Database: localhost:5432

## Services

### Frontend (Port 80)
- Vue.js application served by Nginx
- API proxy to backend
- Static file serving with gzip compression

### Backend (Port 3000)
- NestJS application
- JWT authentication
- NDA validation endpoints
- Health check endpoint

### Database (Port 5432)
- PostgreSQL 15
- Persistent data storage
- Automatic initialization

## Docker Commands

### Start services
```bash
docker-compose up
```

### Start in background
```bash
docker-compose up -d
```

### Stop services
```bash
docker-compose down
```

### View logs
```bash
docker-compose logs -f
```

### Rebuild services
```bash
docker-compose up --build
```

### Clean up
```bash
docker-compose down -v  # Removes volumes
docker system prune     # Removes unused images
```

## Development

### Running individual services
```bash
# Backend only
docker-compose up backend

# Frontend only
docker-compose up frontend

# Database only
docker-compose up postgres
```

### Accessing containers
```bash
# Backend shell
docker-compose exec backend sh

# Database shell
docker-compose exec postgres psql -U postgres -d nda_forum

# Frontend shell
docker-compose exec frontend sh
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `OPENAI_API_KEY` | OpenAI API key for AI features | - |
| `DB_HOST` | Database host | postgres |
| `DB_PORT` | Database port | 5432 |
| `DB_USERNAME` | Database username | postgres |
| `DB_PASSWORD` | Database password | postgres |
| `DB_DATABASE` | Database name | nda_forum |
| `JWT_SECRET` | JWT signing secret | your-super-secret-jwt-key-change-in-production |

## Health Checks

All services include health checks:
- **Frontend**: HTTP check on port 80
- **Backend**: HTTP check on `/health` endpoint
- **Database**: PostgreSQL readiness check

## Troubleshooting

### Port conflicts
If ports are already in use, modify the `docker-compose.yml` file:
```yaml
ports:
  - "8080:80"  # Change frontend port
  - "3001:3000"  # Change backend port
  - "5433:5432"  # Change database port
```

### Database connection issues
1. Check if PostgreSQL container is running: `docker-compose ps`
2. Check logs: `docker-compose logs postgres`
3. Ensure backend waits for database: `docker-compose up postgres` then `docker-compose up backend`

### Build issues
1. Clear Docker cache: `docker system prune -a`
2. Rebuild without cache: `docker-compose build --no-cache`

## Production Deployment

For production deployment:

1. **Update environment variables:**
   - Change `JWT_SECRET` to a strong secret
   - Set `NODE_ENV=production`
   - Configure proper database credentials

2. **Security considerations:**
   - Use external PostgreSQL service
   - Configure proper SSL certificates
   - Set up reverse proxy (nginx/traefik)
   - Use secrets management

3. **Scaling:**
   ```bash
   # Scale backend instances
   docker-compose up --scale backend=3
   ``` 