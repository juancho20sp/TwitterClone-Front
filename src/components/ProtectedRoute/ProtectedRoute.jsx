import React, { useEffect } from 'react';

// Routing
import { routes } from '../../utils';
import { Navigate, Outlet } from 'react-router-dom';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../redux/slices/loginSlice';

// Hooks
import { useAccount } from '../../utils/aws/hooks';

const ProtectedRoute = ({ children }) => {
  const { getSession } = useAccount();

  useEffect(() => {
    getSession().then((data) => {
      // $
      debugger;

      login();
    });
  }, []);

  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  return isLoggedIn ? <Outlet /> : <Navigate to={routes.login.path} replace />;
};

export default ProtectedRoute;
