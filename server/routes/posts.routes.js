/**
 * BlogPeek Posts Routes
 * 
 * API route definitions for blog post endpoints.
 * 
 * @module routes/posts
 */

const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts.controller');

/**
 * @route GET /api/posts
 * @description Get all blog posts
 * @access Public
 */
router.get('/', postsController.getAll);

/**
 * @route GET /api/posts/:id
 * @description Get a single blog post by ID
 * @access Public
 */
router.get('/:id', postsController.getById);

module.exports = router;
