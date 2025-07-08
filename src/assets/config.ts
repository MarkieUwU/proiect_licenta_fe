import { getToken } from '@/core/hooks/useToken';
import { BASE_URL } from '@/environments/env';
import i18n from '@/i18n/i18n';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add current language to request headers
    config.headers['Accept-Language-Preference'] = i18n.language;
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      localStorage.removeItem('token');
      
      return Promise.reject(error);
    }

    return Promise.reject(error);
  });

export default apiClient;
