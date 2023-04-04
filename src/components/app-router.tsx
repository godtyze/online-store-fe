import React from 'react';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import AppLayout from '@/components/app-layout';
import Main from '@/pages/main';
import Device from '@/pages/device';
import Auth from '@/pages/auth';
import Profile from '@/pages/profile';
import NotFound from '@/pages/not-found';
import RequireAuth from '@/components/require-auth';
import Cart from '@/pages/cart';
import {CLIENT_ROUTES} from '@/config';

const AppRouter: React.FC = () => {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path={CLIENT_ROUTES.main} element={<AppLayout />}>
      <Route index element={<Main />} />
      <Route path={CLIENT_ROUTES.device} element={<Device />} />
      <Route path={CLIENT_ROUTES.login} element={<Auth />} />
      <Route path={CLIENT_ROUTES.registration} element={<Auth />} />
      <Route element={<RequireAuth />}>
        <Route path={CLIENT_ROUTES.profile} element={<Profile />} />
        <Route path={CLIENT_ROUTES.cart} element={<Cart />} />
      </Route>
      <Route path={CLIENT_ROUTES.notFound} element={<NotFound />} />
    </Route>
  ), {basename: '/online-store-fe/'});

  return (
    <RouterProvider router={router} />
  );
};

export default AppRouter;