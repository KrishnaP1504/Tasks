import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Add a request interceptor to include the token
api.interceptors.request.use(
  (config) => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user && user.token) {
          config.headers['Authorization'] = `Bearer ${user.token}`;
        }
      } catch (error) {
        // Invalid JSON in localStorage, ignore
      }
    }
    // Log the request URL for debugging
    console.log('API Request:', config.method?.toUpperCase(), config.baseURL + config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for better error logging
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', {
      message: error.message,
      url: error.config?.baseURL + error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
    });
    return Promise.reject(error);
  }
);

export default api;