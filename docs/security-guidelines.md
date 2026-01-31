# BlogPeek Security Guidelines

This document outlines the security measures implemented in BlogPeek and provides maintenance guidance for future upgrades.

---

## Security Architecture

### 1. HTTP Security Headers (Helmet.js)

**Location:** `server/app.js`

```javascript
const helmet = require('helmet');
app.use(helmet());
```

**Headers Enabled:**
| Header | Purpose |
|--------|---------|
| `X-Content-Type-Options` | Prevents MIME-type sniffing |
| `X-Frame-Options` | Prevents clickjacking |
| `X-XSS-Protection` | XSS attack mitigation |
| `Strict-Transport-Security` | Enforces HTTPS (production) |
| `Content-Security-Policy` | Controls resource loading |

**Maintenance:**
- Update `helmet` quarterly
- Review CSP policy when adding external resources
- Test headers at https://securityheaders.com

---

### 2. CORS Configuration

**Location:** `server/middleware/cors.js`

**Current Configuration:**
```javascript
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:4200'],
  methods: ['GET'],
  allowedHeaders: ['Content-Type'],
  credentials: false
};
```

**Security Notes:**
- Only `GET` method allowed (read-only API)
- Explicit origin whitelist, not `*`
- No credentials (no cookies/auth)

**Maintenance:**
- Add production domains to `ALLOWED_ORIGINS` env var
- Never use `origin: '*'` with credentials

---

### 3. Input Validation

**Location:** `server/controllers/posts.controller.js`

**Validation Points:**
- Route parameters (`:id`) validated as integers
- No user-generated content accepted
- Query parameters sanitized

**Example:**
```javascript
const id = parseInt(req.params.id, 10);
if (isNaN(id) || id < 1) {
  return res.status(400).json({ error: 'Invalid ID' });
}
```

**Maintenance:**
- Add `express-validator` if accepting user input
- Validate all route params and query strings

---

### 4. Error Handling

**Location:** `server/middleware/errorHandler.js`

**Principles:**
- Never expose stack traces in production
- Structured JSON error responses
- Log errors server-side for debugging

**Error Response Format:**
```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found",
    "timestamp": "2026-01-31T12:00:00Z"
  }
}
```

**Maintenance:**
- Review error codes for sensitive data exposure
- Add error tracking (Sentry) in production

---

### 5. Environment Variables

**Location:** `server/.env` (gitignored)

**Protected Variables:**
- `MONGODB_URI` - Database connection string
- `ALLOWED_ORIGINS` - CORS whitelist
- `NODE_ENV` - Environment mode

**Template:** `server/.env.example`

**Maintenance:**
- Never commit `.env` files
- Rotate secrets periodically
- Use secret managers in production (AWS Secrets, Vault)

---

## Security Checklist

### Development
- [ ] All dependencies scanned with `npm audit`
- [ ] No secrets in source code
- [ ] Input validation on all endpoints
- [ ] Error responses sanitized

### Production Deployment
- [ ] HTTPS enforced
- [ ] Environment variables configured
- [ ] CORS origins set to production domains
- [ ] Rate limiting enabled
- [ ] Logging configured

---

## Dependency Security

**Audit Command:**
```bash
cd server && npm audit
cd ../client && npm audit
```

**Recommended Update Frequency:**
- Security patches: Immediately
- Minor versions: Monthly
- Major versions: Quarterly (with testing)

---

## Future Security Enhancements

If adding user authentication:
1. Use `bcrypt` for password hashing (cost factor 12+)
2. Implement JWT with short expiration
3. Add CSRF protection
4. Enable rate limiting
5. Add account lockout after failed attempts

---

*Last Updated: January 2026*
