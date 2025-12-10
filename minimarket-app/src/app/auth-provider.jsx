import React, { createContext, useContext, useState } from 'react';
import { login as loginService, logout as logoutService, getCurrentUser, register as registerService } from '../services/auth-service';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getCurrentUser());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const u = await loginService(credentials);
      setUser(u);
      return u;
    } catch (e) {
      setError(e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    await logoutService();
    setUser(null);
    setLoading(false);
  };

  const register = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const u = await registerService(payload);
      setUser(u);
      return u;
    } catch (e) {
      setError(e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

