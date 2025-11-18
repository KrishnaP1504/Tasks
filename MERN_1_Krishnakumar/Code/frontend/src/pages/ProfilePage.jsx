import React, { useState, useEffect } from 'react';
import { getUserProfile } from '../services/userService';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const [content, setContent] = useState(null);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    getUserProfile()
      .then((response) => {
        setContent(response.data);
      })
      .catch((err) => {
        setError(err.response?.data?.message || 'An error occurred');
      });
  }, []);

  return (
    <div className="container">
      <h1>Profile Page</h1>
      <p>this page is visible to logged in with (role: 'user' or 'admin').</p>
      <p>Welcome, <strong>{user?.name || user?.email}</strong>! Your role is: <strong>{user?.role}</strong></p>
      
      <h3>detail from database user API:</h3>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <pre className="data-box">{JSON.stringify(content, null, 2)}</pre>
      )}
    </div>
  );
};

export default ProfilePage;