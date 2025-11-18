import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login, clearErrors } from '../store/actions/authActions';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  const { isAuthenticated, error, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
    if (error) {
      setTimeout(() => dispatch(clearErrors()), 5000);
    }
  }, [isAuthenticated, error, navigate, dispatch]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>
        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}
        <form onSubmit={onSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              required
              style={styles.input}
              placeholder="Enter your email"
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
              minLength="6"
              style={styles.input}
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={styles.button}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p style={styles.linkText}>
          Don't have an account? <Link to="/register" style={styles.link}>Register</Link>
        </p>
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
    maxWidth: '400px',
  },
  title: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '1rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    color: '#555',
    fontWeight: '500',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    boxSizing: 'border-box',
  },
  button: {
    padding: '0.75rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '1rem',
  },
  error: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: '0.75rem',
    borderRadius: '4px',
    marginBottom: '1rem',
  },
  linkText: {
    textAlign: 'center',
    marginTop: '1rem',
    color: '#666',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
  },
};

export default Login;

