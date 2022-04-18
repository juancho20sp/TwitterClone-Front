import React, { useEffect } from 'react';

// Routing
import routes from '../../utils/routing/routes';
import { Navigate, Outlet } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

const UnprotectedRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  return isLoggedIn ? <Navigate to={routes.home.path} replace /> : <Outlet />;
};

export default UnprotectedRoute;
