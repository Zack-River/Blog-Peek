/**
 * BlogPeek Posts Controller
 * 
 * Business logic for blog post operations.
 * All route handlers for /api/posts endpoints.
 * 
 * @module controllers/posts
 */

const { getAllPosts, getPostById } = require('../data/posts.data');

/**
 * Get all blog posts
 * @route GET /api/posts
 * @returns {Array<BlogPost>} Array of blog post objects
 */
exports.getAll = (req, res, next) => {
  try {
    const posts = getAllPosts();
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

/**
 * Get a single blog post by ID
 * @route GET /api/posts/:id
 * @param {string} req.params.id - Post ID
 * @returns {BlogPost} Single blog post object
 */
exports.getById = (req, res, next) => {
  try {
    // Validate ID parameter
    const id = parseInt(req.params.id, 10);
    if (isNaN(id) || id < 1) {
      return res.status(400).json({
        error: {
          code: 'BAD_REQUEST',
          message: 'Invalid post ID. Must be a positive integer.',
          timestamp: new Date().toISOString(),
        }
      });
    }

    const post = getPostById(id);
    if (!post) {
      return res.status(404).json({
        error: {
          code: 'NOT_FOUND',
          message: `Post with ID ${id} not found`,
          timestamp: new Date().toISOString(),
        }
      });
    }

    res.json(post);
  } catch (error) {
    next(error);
  }
};
