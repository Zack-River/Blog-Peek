/**
 * BlogPeek Logger Utility
 * 
 * Simple logging utility with environment-aware output.
 * Can be replaced with winston/pino in production.
 * 
 * @module utils/logger
 */

const config = require('../config/config');

/**
 * Log levels
 */
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

const currentLevel = levels[config.logLevel] || levels.debug;

/**
 * Format log message with timestamp
 * @param {string} level - Log level
 * @param {string} message - Log message
 * @param {Object} data - Additional data
 */
const formatLog = (level, message, data) => {
  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}] [${level.toUpperCase()}]`;
  
  if (data) {
    return `${prefix} ${message} ${JSON.stringify(data)}`;
  }
  return `${prefix} ${message}`;
};

const logger = {
  error: (message, data) => {
    if (currentLevel >= levels.error) {
      console.error(formatLog('error', message, data));
    }
  },
  
  warn: (message, data) => {
    if (currentLevel >= levels.warn) {
      console.warn(formatLog('warn', message, data));
    }
  },
  
  info: (message, data) => {
    if (currentLevel >= levels.info) {
      console.log(formatLog('info', message, data));
    }
  },
  
  debug: (message, data) => {
    if (currentLevel >= levels.debug) {
      console.log(formatLog('debug', message, data));
    }
  },
};

module.exports = logger;
