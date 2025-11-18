import React, { useState, useEffect } from 'react';
import { getPublicContent } from '../services/userService';

const HomePage = () => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getPublicContent()
      .then((response) => {
        setContent(response.data.message);
      })
      .catch((err) => {
        setError(err.response?.data?.message || 'An error occurred');
      });
  }, []);

  return (
    <div className="container">
      <h1>Home Page</h1>
      <p>this page is visible to everyone.</p>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div className="data-box">{content}</div>
      )}
    </div>
  );
};

export default HomePage;