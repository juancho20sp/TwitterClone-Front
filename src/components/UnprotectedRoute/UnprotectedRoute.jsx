import React, { useEffect } from 'react';

// Routing
import routes from '../../utils/routing/routes';
import { Navigate, Outlet } from 'react-router-dom';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../redux/slices/loginSlice';

// Hooks
import { useAccount } from '../../utils/aws/hooks';

const UnprotectedRoute = ({ children }) => {
  //   const { getSession } = useAccount();

  //   useEffect(() => {
  //     getSession().then(() => {
  //       login();
  //     });
  //   }, []);

  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  return isLoggedIn ? <Navigate to={routes.home.path} replace /> : <Outlet />;
};

export default UnprotectedRoute;
