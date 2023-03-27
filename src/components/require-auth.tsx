import React from 'react';
import {useAppSelector} from '@/hooks/redux';
import {selectUser} from '@/store/slices/userSlice';
import {Navigate, Outlet} from 'react-router-dom';
import {CLIENT_ROUTES} from '@/config';

const RequireAuth: React.FC = () => {
  const user = useAppSelector(selectUser);

  if (!user) {
    return <Navigate to={CLIENT_ROUTES.login} replace />;
  }

  return <Outlet />
};

export default RequireAuth;