import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router';
import { AuthProvider } from './app/auth-provider';
import { CartProvider } from './context/CartContext';
import { SettingsProvider } from './app/settings-provider';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <SettingsProvider>
          <RouterProvider router={router} />
        </SettingsProvider>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
