# BlogPeek Architecture

This document describes the system architecture and design decisions for BlogPeek.

---

## System Overview

```
┌─────────────────────────────────────────┐
│         Angular UI (Port 4200)          │
│  - PostListComponent                    │
│  - PostPreviewComponent                 │
│  - PostsService (HTTP Client)           │
└────────────────┬────────────────────────┘
                 │
                 │ HTTP GET /api/posts
                 │
                 ▼
┌─────────────────────────────────────────┐
│    Express.js API (Port 3000)           │
│  - Security: Helmet, CORS               │
│  - Routes: /api/posts, /api/health      │
│  - Controllers: Business Logic          │
│  - Middleware: Error Handling           │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│       Static Data Layer                 │
│  - posts.data.js (In-Memory)            │
│  - Read-Only Access                     │
└─────────────────────────────────────────┘
```

---

## Backend Architecture

### Layer Structure

```
server/
├── app.js              # Entry point, middleware stack
├── config/
│   └── config.js       # Environment configuration
├── routes/
│   └── posts.routes.js # Route definitions
├── controllers/
│   └── posts.controller.js # Business logic
├── data/
│   └── posts.data.js   # Static data store
├── middleware/
│   ├── errorHandler.js # Global error handling
│   └── cors.js         # CORS configuration
└── utils/
    └── logger.js       # Logging utility
```

### Request Flow

1. Request hits Express server
2. Middleware chain: `helmet` → `cors` → `compression` → `json parser`
3. Router matches endpoint
4. Controller processes request
5. Data layer returns data
6. Response sent (or error handler catches)

### Middleware Stack Order

```javascript
app.use(helmet());           // 1. Security headers
app.use(cors(corsOptions));  // 2. CORS handling
app.use(compression());      // 3. Response compression
app.use(express.json());     // 4. Body parsing
app.use('/api', routes);     // 5. API routes
app.use(errorHandler);       // 6. Error handling (last)
```

---

## Frontend Architecture

### Component Hierarchy

```
AppComponent
└── Main Layout
    ├── PostListComponent (Left Panel)
    │   └── Individual post titles
    └── PostPreviewComponent (Right Panel)
        └── Selected post content
```

### Data Flow

```
PostsService.getPosts()
       │
       ▼ Observable<BlogPost[]>
       │
PostListComponent
       │
       │ @Output selectedPost
       ▼
PostPreviewComponent
       │
       ▼ Displays content
```

### State Management

Simple component state (no NgRx needed for this scope):
- `selectedPost: BlogPost | null` — Currently selected post
- `posts: BlogPost[]` — All posts from API
- `isLoading: boolean` — Loading state
- `error: string | null` — Error message

---

## API Design

### Endpoints

| Method | Endpoint | Description | Response |
|--------|----------|-------------|----------|
| GET | `/api/posts` | All posts | `BlogPost[]` |
| GET | `/api/posts/:id` | Single post | `BlogPost` |
| GET | `/api/health` | Health check | `{status, timestamp}` |

### Data Model

```typescript
interface BlogPost {
  id: number;
  title: string;
  description: string;
  createdAt?: string;
  category?: string;
}
```

---

## Design Decisions

### Why Static Data Instead of MongoDB?

For a portfolio demo:
- Simpler deployment (no database setup)
- Faster development cycle
- Zero infrastructure cost
- Easy to add MongoDB later if needed

### Why Component Communication Over NgRx?

- App state is minimal (1 selected post)
- No complex data flows
- `@Input`/`@Output` sufficient
- Avoids over-engineering

### Why Helmet.js?

- Industry standard security headers
- One-line setup
- OWASP recommended
- Minimal performance impact

---

## Performance Optimizations

1. **Compression** — `compression` middleware reduces payload ~70%
2. **Minimal Bundle** — No unnecessary dependencies
3. **OnPush Strategy** — Angular change detection optimization
4. **HTTP Caching** — Cache headers for static data

---

## Scalability Path

If extending BlogPeek:

1. **Add MongoDB** — Replace `posts.data.js` with Mongoose models
2. **Add Auth** — JWT with Passport.js
3. **Add SSR** — Angular Universal for SEO
4. **Add Caching** — Redis for API caching
5. **Add CDN** — CloudFlare for static assets

---

*Last Updated: January 2026*
