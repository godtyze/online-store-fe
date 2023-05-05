import {FC} from 'react';
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import AppLayout from '@/components/app-layout';
import Main from '@/pages/main';
import Device from '@/pages/device';
import Auth from '@/pages/auth';
import Profile from '@/pages/profile';
import NotFound from '@/pages/not-found';
import RequireAuth from '@/components/require-auth';
import Cart from '@/pages/cart';
import {CLIENT_ROUTES} from '@/config';

const AppRouter: FC = () => {
  const routerConfig = [
    {
      path: CLIENT_ROUTES.main,
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <Main />
        },
        {
          path: CLIENT_ROUTES.device,
          element: <Device />
        },
        {
          path: CLIENT_ROUTES.login,
          element: <Auth />
        },
        {
          path: CLIENT_ROUTES.registration,
          element: <Auth />
        },
        {
          element: <RequireAuth />,
          children: [
            {
              path: CLIENT_ROUTES.profile,
              element: <Profile />
            },
            {
              path: CLIENT_ROUTES.cart,
              element: <Cart />
            }
          ]
        },
        {
          path: '*',
          element: <Navigate to={CLIENT_ROUTES.notFound} />,
        },
        {
          path: CLIENT_ROUTES.notFound,
          element: <NotFound />,
        },
      ]
    }
  ];
  const router = createBrowserRouter(routerConfig, {
    basename: '/online-store-fe/'
  });

  return (
    <RouterProvider router={router} />
  );
};

export default AppRouter;