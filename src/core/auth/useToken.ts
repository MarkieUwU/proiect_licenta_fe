import { useState } from 'react';

export const useToken = () => {
  const [token, setTokenInternal] = useState(() => {
    return localStorage.getItem('token');
  });

  const setToken = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setTokenInternal(newToken);
  };

  const removeToken = () => {
    localStorage.removeItem('token');
  };

  return { token, setToken, removeToken };
};
