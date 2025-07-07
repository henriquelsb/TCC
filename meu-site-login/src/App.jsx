import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';  // default export
import HomePage from './pages/HomePage';          // default export
import AdminPage from './pages/AdminPage';        // default export
import { AuthProvider, useAuth } from './context/AuthContext';
import Navigation from './components/Navigation';

const ProtectedRoute = ({ children, adminOnly }) => {
  const { user, isAdmin } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && !isAdmin) return <Navigate to="/" />;
  return children;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin"
      element={
        <ProtectedRoute adminOnly>
          <AdminPage />
        </ProtectedRoute>
      }
    />
  </Routes>
);

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Navigation />
      <AppRoutes />
    </BrowserRouter>
  </AuthProvider>
);

export default App;
