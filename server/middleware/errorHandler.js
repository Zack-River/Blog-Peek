/**
 * BlogPeek Global Error Handler
 * 
 * Centralized error handling middleware.
 * Ensures consistent error responses and prevents leaking sensitive information.
 * 
 * @module middleware/errorHandler
 */

const config = require('../config/config');
const logger = require('../utils/logger');

/**
 * Global error handling middleware
 * @param {Error} err - Error object
 * @param {Request} req - Express request
 * @param {Response} res - Express response
 * @param {Function} next - Next middleware
 */
const errorHandler = (err, req, res, next) => {
  // Log error details (full stack in development)
  logger.error('Error occurred:', {
    message: err.message,
    stack: config.isDev() ? err.stack : undefined,
    path: req.path,
    method: req.method,
  });

  // Determine status code
  const statusCode = err.statusCode || err.status || 500;

  // Build error response
  const errorResponse = {
    error: {
      code: err.code || 'INTERNAL_ERROR',
      message: config.isProd() && statusCode === 500 
        ? 'An unexpected error occurred' 
        : err.message,
      timestamp: new Date().toISOString(),
    }
  };

  // Add stack trace in development
  if (config.isDev()) {
    errorResponse.error.stack = err.stack;
  }

  res.status(statusCode).json(errorResponse);
};

/**
 * 404 Not Found handler
 * @param {Request} req - Express request
 * @param {Response} res - Express response
 */
const notFoundHandler = (req, res) => {
  res.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: `Route ${req.method} ${req.path} not found`,
      timestamp: new Date().toISOString(),
    }
  });
};

module.exports = {
  errorHandler,
  notFoundHandler,
};
