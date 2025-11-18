import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home (Public)</Link>
        </li>
        {user && (
          <li>
            <Link to="/profile">Profile (User)</Link>
          </li>
        )}
        {user && user.role === 'admin' && (
          <li>
            <Link to="/admin">Admin (Admin)</Link>
          </li>
        )}
      </ul>
      <div className="auth-links">
        {user ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;