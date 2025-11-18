import React, { createContext, useState, useContext } from 'react';
import * as authService from '../services/authService';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Get user from local storage
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const { data } = await authService.login(email, password);
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      // Redirect based on role
      if (data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/profile');
      }
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };

  const register = async (name, email, password, role) => {
    try {
      const { data } = await authService.register(name, email, password, role);
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      navigate('/profile');
    } catch (error) {
      console.error('Registration failed', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: error.config?.url,
      });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext);
};