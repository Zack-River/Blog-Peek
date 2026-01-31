/**
 * BlogPeek API Server Configuration
 * 
 * Centralized configuration from environment variables.
 * All configuration values should be accessed through this module.
 * 
 * @module config
 */

require('dotenv').config();

const config = {
  // Server settings
  port: parseInt(process.env.PORT, 10) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // CORS settings
  allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:4200'],
  
  // API settings
  apiPrefix: '/api',
  
  // Logging
  logLevel: process.env.LOG_LEVEL || 'debug',
  
  // Helpers
  isDev: () => config.nodeEnv === 'development',
  isProd: () => config.nodeEnv === 'production',
};

// Validate required config in production
if (config.isProd()) {
  const required = ['PORT', 'ALLOWED_ORIGINS'];
  const missing = required.filter(key => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

module.exports = config;
