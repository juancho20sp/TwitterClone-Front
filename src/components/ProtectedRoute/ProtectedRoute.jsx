import React from 'react';

// Routing
import { routes } from '../../utils';
import { Navigate, Outlet } from 'react-router-dom';

// Router
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  return isLoggedIn ? <Outlet /> : <Navigate to={routes.login.path} replace />;
};

export default ProtectedRoute;
