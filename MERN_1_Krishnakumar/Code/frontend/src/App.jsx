import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected 'user' Route */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={['user', 'admin']}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        {/* Protected 'admin' Route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;