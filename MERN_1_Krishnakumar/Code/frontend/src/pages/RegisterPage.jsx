import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role is 'user'
  const [error, setError] = useState('');
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(name, email, password, role);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to register';
      const status = err.response?.status;
      if (status === 404) {
        setError('Backend server not found. Please make sure the backend is running on port 5000.');
      } else if (status === 500) {
        setError('Server error: ' + errorMessage);
      } else {
        setError(errorMessage);
      }
      console.error('Registration error:', err);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        {error && <p className="error-msg">{error}</p>}
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;