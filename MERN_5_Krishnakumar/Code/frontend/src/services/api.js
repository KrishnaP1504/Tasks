import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/quotes';

// Create axios instance with timeout
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get random quote from external API
export const getRandomQuote = async () => {
  try {
    const response = await api.get('/random');
    return response.data;
  } catch (error) {
    console.error('Error fetching random quote:', error);
    if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
      throw new Error('Cannot connect to server. Please make sure the backend server is running on port 5000.');
    }
    throw error;
  }
};

// Create a new post
export const createPost = async (quoteData) => {
  try {
    const response = await api.post('/posts', quoteData);
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
      throw new Error('Cannot connect to server. Please make sure the backend server is running on port 5000.');
    }
    throw error;
  }
};

// Get all posts
export const getAllPosts = async () => {
  try {
    const response = await api.get('/posts');
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
      throw new Error('Cannot connect to server. Please make sure the backend server is running on port 5000.');
    }
    throw error;
  }
};

// Get a single post by ID
export const getPostById = async (id) => {
  try {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
};

// Delete a post
export const deletePost = async (id) => {
  try {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

