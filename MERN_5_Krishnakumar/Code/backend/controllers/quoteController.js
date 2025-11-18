const axios = require('axios');
const mongoose = require('mongoose');
const Quote = require('../models/Quote');

// Get random quote from external API
const getRandomQuote = async (req, res) => {
  try {
    // Using Quotable API - more reliable, better rate limits, and matches our expected format
    const response = await axios.get('https://api.quotable.io/random', {
      timeout: 10000,
      validateStatus: function (status) {
        return status < 500; // Don't throw for 4xx errors
      }
    });

    // Check if response is successful
    if (response.status !== 200) {
      console.error('Quotable API returned non-200 status:', response.status, response.data);
      return res.status(response.status).json({ 
        error: 'Failed to fetch quote from API',
        details: response.data 
      });
    }

    // Validate response data structure
    if (!response.data || !response.data.content || !response.data.author) {
      console.error('Invalid response structure from Quotable API:', response.data);
      return res.status(500).json({ 
        error: 'Invalid response from quotes API',
        details: 'Response missing required fields'
      });
    }

    const quoteData = {
      content: response.data.content,
      author: response.data.author,
      tags: response.data.tags || [],
    };
    
    res.json(quoteData);
  } catch (error) {
    console.error('Error fetching random quote - Full error:', error);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('Error response:', error.response?.data);
    
    // Handle specific error types
    if (error.code === 'ECONNABORTED') {
      return res.status(504).json({ error: 'Request timeout. Please try again.' });
    }
    
    // Handle DNS/Network errors
    if (error.code === 'ENOTFOUND' || error.code === 'EAI_AGAIN') {
      return res.status(503).json({ 
        error: 'DNS resolution failed - Cannot resolve api.quotable.io',
        details: 'This is a network connectivity issue. Please check: 1) Your internet connection, 2) Firewall/VPN settings, 3) DNS configuration. Try running: ping api.quotable.io in your terminal.',
        errorCode: error.code
      });
    }
    
    if (error.code === 'ECONNREFUSED') {
      return res.status(503).json({ 
        error: 'Connection refused - Cannot reach quotes API',
        details: 'The server cannot establish a connection. Check your firewall, proxy, or VPN settings.',
        errorCode: error.code
      });
    }
    
    // Handle rate limiting
    if (error.response && error.response.status === 429) {
      return res.status(429).json({ error: 'Rate limit exceeded. Please wait a moment and try again.' });
    }
    
    // Handle other HTTP errors
    if (error.response) {
      const responseData = typeof error.response.data === 'object' 
        ? JSON.stringify(error.response.data) 
        : error.response.data;
      
      return res.status(error.response.status || 500).json({ 
        error: 'Failed to fetch random quote',
        details: responseData || error.message || 'HTTP error from external API',
        errorCode: error.code || 'HTTP_ERROR',
        statusCode: error.response.status,
        originalMessage: error.message
      });
    }
    
    // Generic error - catch anything else (including DNS/network errors that weren't caught above)
    console.error('Unexpected error type:', error);
    console.error('Error stack:', error.stack);
    
    // Check if it's a network error that wasn't caught
    if (error.code && (error.code.includes('ENOTFOUND') || error.code.includes('EAI_AGAIN') || error.code.includes('ECONNREFUSED'))) {
      return res.status(503).json({ 
        error: 'Network connectivity issue',
        details: `Cannot connect to api.quotable.io. Error: ${error.message}`,
        errorCode: error.code,
        troubleshooting: [
          'Check your internet connection',
          'Test DNS: Run "ping api.quotable.io" in terminal',
          'Check firewall/VPN/proxy settings',
          'Try using a different DNS server (e.g., 8.8.8.8)'
        ]
      });
    }
    
    res.status(500).json({ 
      error: 'Failed to fetch random quote. Please try again.',
      details: error.message || 'Unknown error occurred',
      errorCode: error.code || 'UNKNOWN',
      errorName: error.name || 'Error',
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// Create a new post (save quote to database)
const createPost = async (req, res) => {
  try {
    const { content, author, tags } = req.body;

    if (!content || !author) {
      return res.status(400).json({ error: 'Content and author are required' });
    }

    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not connected. Please make sure MongoDB is running.' });
    }

    const quote = new Quote({
      content,
      author,
      tags: tags || [],
    });

    const savedQuote = await quote.save();
    res.status(201).json(savedQuote);
  } catch (error) {
    console.error('Error creating post:', error);
    if (error.name === 'MongoNetworkError' || error.name === 'MongoServerSelectionError') {
      return res.status(503).json({ error: 'Database connection error. Please make sure MongoDB is running.' });
    }
    res.status(500).json({ error: 'Failed to create post' });
  }
};

// Get all saved posts
const getAllPosts = async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      return res.json([]); // Return empty array if DB not connected
    }
    const posts = await Quote.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    if (error.name === 'MongoNetworkError' || error.name === 'MongoServerSelectionError') {
      return res.json([]); // Return empty array if DB connection error
    }
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

// Get a single post by ID
const getPostById = async (req, res) => {
  try {
    const post = await Quote.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
};

// Delete a post
const deletePost = async (req, res) => {
  try {
    const post = await Quote.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully', post });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
};

// Test connectivity to quotes API
const testConnectivity = async (req, res) => {
  try {
    const response = await axios.get('https://api.quotable.io/random', {
      timeout: 5000,
    });
    
    res.json({
      status: 'success',
      message: 'Successfully connected to Quotable API',
      sampleQuote: {
        content: response.data.content,
        author: response.data.author,
      },
    });
  } catch (error) {
    let errorType = 'Unknown error';
    let troubleshooting = [];
    
    if (error.code === 'ENOTFOUND' || error.code === 'EAI_AGAIN') {
      errorType = 'DNS Resolution Failed';
      troubleshooting = [
        'Check your internet connection',
        'Test DNS: Run "ping api.quotable.io" in terminal',
        'Check firewall/VPN/proxy settings',
        'Try using a different DNS server (e.g., 8.8.8.8)',
      ];
    } else if (error.code === 'ECONNREFUSED') {
      errorType = 'Connection Refused';
      troubleshooting = [
        'Check firewall settings',
        'Disable VPN/proxy temporarily',
        'Check if corporate network is blocking the connection',
      ];
    } else if (error.code === 'ECONNABORTED') {
      errorType = 'Connection Timeout';
      troubleshooting = [
        'Check your internet connection speed',
        'The API might be slow, try again',
      ];
    }
    
    res.status(503).json({
      status: 'failed',
      error: errorType,
      errorCode: error.code,
      message: error.message,
      troubleshooting,
    });
  }
};

module.exports = {
  getRandomQuote,
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
  testConnectivity,
};

