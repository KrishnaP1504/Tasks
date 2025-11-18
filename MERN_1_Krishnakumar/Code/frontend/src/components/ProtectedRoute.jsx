import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  const location = useLocation();

  // 1. Check if user is logged in
  if (!user) {
    // Redirect to login page, saving the current location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Check if user has the required role
  if (!allowedRoles.includes(user.role)) {
    // Redirect to home page (or an 'Unauthorized' page)
    return <Navigate to="/" replace />;
  }

  // 3. If logged in and has role, render the component
  return children;
};

export default ProtectedRoute;