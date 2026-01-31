# BlogPeek API Reference

Base URL: `http://localhost:3000`

---

## Endpoints

### Health Check

```
GET /api/health
```

**Description:** Check if the API is running.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-01-31T12:00:00.000Z",
  "uptime": 3600
}
```

---

### Get All Posts

```
GET /api/posts
```

**Description:** Retrieve all blog posts.

**Response:**
```json
[
  {
    "id": 1,
    "title": "Why Simplicity Wins",
    "description": "Simple systems scale better...",
    "createdAt": "2026-01-15T10:00:00Z",
    "category": "Engineering"
  },
  {
    "id": 2,
    "title": "The Art of Clean Code",
    "description": "Writing maintainable code...",
    "createdAt": "2026-01-20T14:30:00Z",
    "category": "Best Practices"
  }
]
```

**Status Codes:**
| Code | Description |
|------|-------------|
| 200 | Success |
| 500 | Server error |

---

### Get Single Post

```
GET /api/posts/:id
```

**Description:** Retrieve a single blog post by ID.

**Parameters:**
| Name | Type | Location | Required |
|------|------|----------|----------|
| id | integer | path | yes |

**Response (200):**
```json
{
  "id": 1,
  "title": "Why Simplicity Wins",
  "description": "Simple systems scale better...",
  "createdAt": "2026-01-15T10:00:00Z",
  "category": "Engineering"
}
```

**Response (404):**
```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Post not found",
    "timestamp": "2026-01-31T12:00:00Z"
  }
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message",
    "timestamp": "ISO 8601 timestamp"
  }
}
```

**Error Codes:**
| Code | HTTP Status | Description |
|------|-------------|-------------|
| NOT_FOUND | 404 | Resource not found |
| BAD_REQUEST | 400 | Invalid request |
| INTERNAL_ERROR | 500 | Server error |

---

## Testing with cURL

```bash
# Health check
curl http://localhost:3000/api/health

# Get all posts
curl http://localhost:3000/api/posts

# Get single post
curl http://localhost:3000/api/posts/1
```

---

## CORS

Allowed origins (configurable via `ALLOWED_ORIGINS` env var):
- Development: `http://localhost:4200`
- Production: Add your domain

---

*Last Updated: January 2026*
