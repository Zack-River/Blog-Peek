/**
 * BlogPeek CORS Configuration
 * 
 * Cross-Origin Resource Sharing middleware configuration.
 * Restricts API access to whitelisted origins.
 * 
 * @module middleware/cors
 */

const cors = require('cors');
const config = require('../config/config');

/**
 * CORS options configuration
 * - Only allows specified origins
 * - Restricts to GET method (read-only API)
 * - No credentials (no cookies/auth tokens)
 */
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin) {
      return callback(null, true);
    }
    
    if (config.allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  methods: ['GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept'],
  credentials: false,
  maxAge: 86400, // 24 hours preflight cache
};

module.exports = cors(corsOptions);
