# BlogPeek Deployment Guide

This guide covers how to deploy BlogPeek to various environments.

---

## Quick Start (Development)

### Prerequisites
- Node.js 20 LTS (recommended) or Node.js 18+
- npm 10+

### Run Locally

**Terminal 1 - Backend:**
```bash
cd blogpeek/server
npm install
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd blogpeek/client
npm install
npm start
```

Open http://localhost:4200 in your browser.

---

## Production Build

### Backend
```bash
cd blogpeek/server
npm install --production
NODE_ENV=production npm start
```

### Frontend
```bash
cd blogpeek/client
npm run build
# Output: dist/blogpeek/
```

Serve the `dist/blogpeek/` folder with any static file server (nginx, Apache, etc.)

---

## Environment Variables

### Backend (server/.env)
```env
PORT=3000
NODE_ENV=production
ALLOWED_ORIGINS=https://yourdomain.com
LOG_LEVEL=info
```

### Frontend (environment.prod.ts)
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.yourdomain.com/api'
};
```

---

## Deployment Options

### Option 1: Heroku (Backend)
```bash
cd blogpeek/server
heroku create blogpeek-api
git push heroku main
heroku config:set NODE_ENV=production
heroku config:set ALLOWED_ORIGINS=https://yourfrontend.com
```

### Option 2: Vercel (Frontend)
```bash
cd blogpeek/client
npm run build
vercel deploy --prod
```

### Option 3: Docker (Both)

**Dockerfile (Backend):**
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["node", "app.js"]
```

**Dockerfile (Frontend):**
```dockerfile
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist/blogpeek /usr/share/nginx/html
```

---

## Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Configure CORS with production domains
- [ ] Set up HTTPS
- [ ] Configure reverse proxy (nginx)
- [ ] Set up monitoring/logging
- [ ] Add rate limiting if needed

---

*Last Updated: January 2026*
