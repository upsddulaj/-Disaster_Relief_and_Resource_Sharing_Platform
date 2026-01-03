import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../services/api';
import socket from '../services/socket';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      socket.connect();
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    setError('');
    const { data } = await api.post('/auth/login', credentials);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
    socket.connect();
  };

  const register = async (payload) => {
    setError('');
    await api.post('/auth/register', payload);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    socket.disconnect();
  };

  const value = useMemo(() => ({ user, loading, error, setError, login, register, logout }), [
    user,
    loading,
    error
  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
