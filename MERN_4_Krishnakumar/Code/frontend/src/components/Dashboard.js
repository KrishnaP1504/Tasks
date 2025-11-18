import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadUser, logout } from '../store/actions/authActions';

const Dashboard = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      navigate('/login');
    } else if (isAuthenticated && !user) {
      dispatch(loadUser());
    }
  }, [isAuthenticated, loading, user, navigate, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  if (loading || !user) {
    return (
      <div style={styles.container}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Dashboard</h2>
        <div style={styles.userInfo}>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
        <button onClick={handleLogout} style={styles.button}>
          Logout
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '500px',
  },
  title: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#333',
  },
  userInfo: {
    marginBottom: '1.5rem',
    padding: '1rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px',
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
};

export default Dashboard;

