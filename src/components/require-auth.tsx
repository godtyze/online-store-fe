import {FC} from 'react';
import {useAppSelector} from '@/hooks/redux';
import {selectUser} from '@/store/slices/userSlice';
import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {CLIENT_ROUTES} from '@/config';

const RequireAuth: FC = () => {
  const user = useAppSelector(selectUser);
  const location = useLocation();

  if (!user) {
    return <Navigate to={CLIENT_ROUTES.login} replace state={{from: location.pathname}} />;
  }

  return <Outlet />
};

export default RequireAuth;