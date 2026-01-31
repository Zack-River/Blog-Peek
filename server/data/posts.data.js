/**
 * BlogPeek Static Blog Post Data
 * 
 * Static blog posts for the read-only blog explorer.
 * This data can be replaced with MongoDB in future versions.
 * 
 * @module data/posts
 */

/**
 * @typedef {Object} BlogPost
 * @property {number} id - Unique post identifier
 * @property {string} title - Post title
 * @property {string} description - Post description/content
 * @property {string} createdAt - ISO 8601 date string
 * @property {string} category - Post category
 */

/** @type {BlogPost[]} */
const posts = [
  {
    id: 1,
    title: "Why Simplicity Wins",
    description: "Simple systems scale better, break less, and are easier to maintain. In a world obsessed with complexity, the best solutions are often the most straightforward. This principle applies to architecture, code design, and product decisions. Learn why experienced engineers gravitate toward simplicity.",
    createdAt: "2026-01-15T10:00:00Z",
    category: "Engineering"
  },
  {
    id: 2,
    title: "The Art of Clean Code",
    description: "Writing maintainable code is a skill that separates good developers from great ones. Clean code reads like well-written prose — it tells a story, is self-documenting, and respects the reader's time. Discover the principles that matter: meaningful names, small functions, and the single responsibility principle.",
    createdAt: "2026-01-20T14:30:00Z",
    category: "Best Practices"
  },
  {
    id: 3,
    title: "API Design Fundamentals",
    description: "A well-designed API is intuitive, consistent, and forgiving. It anticipates user mistakes and guides developers toward success. From resource naming to error handling, every decision impacts developer experience. These fundamentals will help you build APIs that developers love to use.",
    createdAt: "2026-01-22T09:15:00Z",
    category: "Backend"
  },
  {
    id: 4,
    title: "Modern Frontend Architecture",
    description: "The frontend landscape has evolved dramatically. Component-based architectures, reactive state management, and modular design patterns have become the new standard. Understanding these patterns helps you build scalable, maintainable user interfaces that stand the test of time.",
    createdAt: "2026-01-25T11:45:00Z",
    category: "Frontend"
  },
  {
    id: 5,
    title: "Security-First Development",
    description: "Security isn't a feature you add later — it's a mindset that shapes every decision. From input validation to secure headers, from authentication to error handling, security-conscious development protects your users and your reputation. Start with these essential practices.",
    createdAt: "2026-01-28T16:00:00Z", 
    category: "Security"
  },
  {
    id: 6,
    title: "The Power of Documentation",
    description: "Great documentation is a force multiplier. It reduces onboarding time, decreases support burden, and empowers users to succeed independently. Whether it's API docs, README files, or inline comments, investing in documentation is investing in your project's future.",
    createdAt: "2026-01-30T08:30:00Z",
    category: "Best Practices"
  }
];

/**
 * Get all blog posts
 * @returns {BlogPost[]} Array of all blog posts
 */
const getAllPosts = () => posts;

/**
 * Get a single blog post by ID
 * @param {number} id - Post ID to find
 * @returns {BlogPost|undefined} The found post or undefined
 */
const getPostById = (id) => posts.find(post => post.id === id);

module.exports = {
  posts,
  getAllPosts,
  getPostById,
};
