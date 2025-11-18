const express = require('express');
const router = express.Router();
const {
  getRandomQuote,
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
  testConnectivity,
} = require('../controllers/quoteController');

// Test connectivity to quotes API (for debugging)
router.get('/test-connectivity', testConnectivity);

// Get random quote from external API
router.get('/random', getRandomQuote);

// Create a new post
router.post('/posts', createPost);

// Get all posts
router.get('/posts', getAllPosts);

// Get a single post by ID
router.get('/posts/:id', getPostById);

// Delete a post
router.delete('/posts/:id', deletePost);

module.exports = router;

