import React, { useState, useEffect } from 'react';
import { getAdminBoard } from '../services/userService';

const AdminPage = () => {
  const [content, setContent] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getAdminBoard()
      .then((response) => {
        setContent(response.data);
      })
      .catch((err) => {
        setError(err.response?.data?.message || 'An error occurred');
      });
  }, []);

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>
      <p>this page is visible to logged in with 'admin' role.</p>
      <h3>detail from database admin API:</h3>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <pre className="data-box">{JSON.stringify(content, null, 2)}</pre>
      )}
    </div>
  );
};

export default AdminPage;