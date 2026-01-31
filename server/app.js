/**
 * BlogPeek API Server
 * 
 * Main entry point for the Express.js backend.
 * Configures middleware stack with security and performance optimizations.
 * 
 * @module app
 */

const express = require('express');
const helmet = require('helmet');
const compression = require('compression');

const config = require('./config/config');
const corsMiddleware = require('./middleware/cors');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');
const postsRoutes = require('./routes/posts.routes');
const logger = require('./utils/logger');

// Initialize Express app
const app = express();

// ======================
// SECURITY MIDDLEWARE
// ======================

// Helmet: Security headers (XSS, CSP, clickjacking protection)
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  crossOriginEmbedderPolicy: false, // Allow embedding for portfolio demos
}));

// CORS: Cross-Origin Resource Sharing
app.use(corsMiddleware);

// ======================
// PERFORMANCE MIDDLEWARE
// ======================

// Compression: Gzip responses (~70% size reduction)
app.use(compression());

// JSON Parser: Request body parsing with size limit
app.use(express.json({ limit: '10kb' }));

// ======================
// API ROUTES
// ======================

/**
 * Health Check Endpoint
 * @route GET /api/health
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
    environment: config.nodeEnv,
  });
});

// Blog Posts Routes
app.use('/api/posts', postsRoutes);

// ======================
// ERROR HANDLING
// ======================

// 404 Handler (must be after all routes)
app.use(notFoundHandler);

// Global Error Handler (must be last)
app.use(errorHandler);

// ======================
// SERVER STARTUP
// ======================

const startServer = () => {
  app.listen(config.port, () => {
    logger.info(`🚀 BlogPeek API Server started`, {
      port: config.port,
      environment: config.nodeEnv,
      url: `http://localhost:${config.port}`,
    });
    logger.info(`📚 API Endpoints:`, {
      health: `GET /api/health`,
      posts: `GET /api/posts`,
      postById: `GET /api/posts/:id`,
    });
  });
};

// Start server if run directly (not imported for testing)
if (require.main === module) {
  startServer();
}

// Export for testing
module.exports = { app, startServer };
