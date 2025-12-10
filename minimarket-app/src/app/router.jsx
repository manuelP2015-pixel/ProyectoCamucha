import React from 'react';
import { createBrowserRouter, redirect } from 'react-router-dom';
import AuthLayout from '../layouts/auth-layout';
import AdminLayout from '../layouts/admin-layout';
import Layout from '../components/Layout';
import Login from '../pages/auth/login';
import Register from '../pages/auth/register';
import Dashboard from '../pages/admin/dashboard';
import Products from '../pages/admin/products';
import OrdersAdmin, { loader as ordersLoader } from '../pages/admin/orders';
import Settings from '../pages/admin/settings';
import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Offers from '../pages/Offers';
import Checkout from '../pages/Checkout';
import OrdersClient from '../pages/client/orders';
import About from '../pages/info/About';
import Terms from '../pages/info/Terms';
import Privacy from '../pages/info/Privacy';
import Claims from '../pages/info/Claims';
import { adminOnly, clientOnly } from './protected-route';
import { getCurrentUser } from '../services/auth-service';
import { checkoutAction, adminOrderAction } from './actions/order-actions';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'catalog', element: <Catalog /> },
      { path: 'offers', element: <Offers /> },
      { path: 'checkout', element: <Checkout />, action: checkoutAction },
      { path: 'my-orders', element: <OrdersClient />, loader: clientOnly },
      { path: 'nosotros', element: <About /> },
      { path: 'terminos', element: <Terms /> },
      { path: 'privacidad', element: <Privacy /> },
      { path: 'reclamaciones', element: <Claims /> }
    ]
  },
  {
    path: '/login',
    element: <AuthLayout />,
    children: [{ index: true, element: <Login /> }]
  },
  {
    path: '/register',
    element: <AuthLayout />,
    children: [{ index: true, element: <Register /> }]
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    loader: adminOnly,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'products', element: <Products /> },
      { path: 'orders', element: <OrdersAdmin />, loader: ordersLoader, action: adminOrderAction },
      { path: 'settings', element: <Settings /> }
    ]
  }
]);

