import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loading from './Loading';

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { token, role, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && role && !allowedRoles.includes(role)) {
    // Redirect based on role if unauthorized for specific route
    return <Navigate to={role === 'Admin' ? '/admin/dashboard' : '/courses'} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
