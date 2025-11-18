import React, { useState, useEffect } from 'react';
import './App.css';
import QuoteDisplay from './components/QuoteDisplay';
import PostList from './components/PostList';
import { getRandomQuote, createPost, getAllPosts } from './services/api';

function App() {
  const [currentQuote, setCurrentQuote] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchRandomQuote = async () => {
    setLoading(true);
    setMessage('');
    try {
      const quote = await getRandomQuote();
      setCurrentQuote(quote);
      setMessage('');
    } catch (error) {
      // Extract error message from response
      let errorMessage = 'Failed to fetch random quote.';
      
      if (error.response?.data) {
        const errorData = error.response.data;
        errorMessage = errorData.error || errorData.message || errorMessage;
        
        // Add details if available
        if (errorData.details) {
          errorMessage += `\n\nDetails: ${errorData.details}`;
        }
        
        // Add error code if available
        if (errorData.errorCode) {
          errorMessage += `\n\nError Code: ${errorData.errorCode}`;
        }
        
        // Show troubleshooting tips for network errors
        if (errorData.troubleshooting && errorData.troubleshooting.length > 0) {
          errorMessage += '\n\nTroubleshooting:\n' + errorData.troubleshooting.map((tip, i) => `${i + 1}. ${tip}`).join('\n');
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      // Check for connection errors
      if (error.code === 'ECONNREFUSED' || error.message?.includes('Network Error')) {
        errorMessage = 'Cannot connect to server. Please make sure the backend server is running on port 5000.';
      }
      
      setMessage(errorMessage);
      console.error('Error fetching random quote:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      console.error('Error code:', error.code);
      
      // Log full error details for debugging
      if (error.response?.data) {
        console.error('Full error details:', JSON.stringify(error.response.data, null, 2));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async () => {
    if (!currentQuote) {
      setMessage('Please fetch a quote first');
      return;
    }

    setLoading(true);
    setMessage('');
    try {
      const newPost = await createPost(currentQuote);
      setPosts([newPost, ...posts]);
      setMessage('Post created successfully!');
      setCurrentQuote(null);
    } catch (error) {
      setMessage('Failed to create post');
      console.error('Error creating post:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    try {
      const allPosts = await getAllPosts();
      setPosts(allPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Quotes Generator</h1>
        <p>Get random quotes and save them as posts</p>
      </header>

      <main className="App-main">
        <div className="quote-section">
          <div className="quote-actions">
            <button 
              onClick={fetchRandomQuote} 
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? 'Loading...' : 'Get Random Quote'}
            </button>
            {currentQuote && (
              <button 
                onClick={handleCreatePost} 
                disabled={loading}
                className="btn btn-success"
              >
                Create Post
              </button>
            )}
          </div>

          {message && (
            <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}

          {currentQuote && (
            <QuoteDisplay quote={currentQuote} />
          )}
        </div>

        <div className="posts-section">
          <h2>Saved Posts</h2>
          <PostList posts={posts} onDelete={fetchPosts} />
        </div>
      </main>
    </div>
  );
}

export default App;

