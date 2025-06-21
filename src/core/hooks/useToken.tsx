import { useState, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';

interface TokenData {
  exp: number;
  id: number;
}

export const getToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  try {
    const decoded = jwtDecode<TokenData>(token);
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem('token');
      return null;
    }
    return token;
  } catch {
    localStorage.removeItem('token');
    return null;
  }
};

export const useToken = () => {
  const [token, setTokenInternal] = useState(() => {
    return localStorage.getItem('token');
  });

  const isTokenExpired = useCallback((token: string) => {
    try {
      const decoded = jwtDecode<TokenData>(token);
      return decoded.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }, []);

  const setToken = useCallback((newToken: string) => {
    if (isTokenExpired(newToken)) {
      removeToken();
      return;
    }
    localStorage.setItem('token', newToken);
    setTokenInternal(newToken);
  }, [isTokenExpired]);

  const removeToken = useCallback(() => {
    localStorage.removeItem('token');
    setTokenInternal(null);
  }, []);

  const getTokenFromHook = useCallback(() => {
    if (!token) return null;
    if (isTokenExpired(token)) {
      removeToken();
      return null;
    }
    return token;
  }, [token, isTokenExpired, removeToken]);

  return { token, setToken, removeToken, getToken: getTokenFromHook };
};
