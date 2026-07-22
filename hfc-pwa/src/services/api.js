import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt_token');
    // Only log warnings for non‑login endpoints
    const isLoginRequest = config.url?.includes('/auth/login');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      if (!isLoginRequest) console.log('🔑 Token attached');
    } else {
      if (!isLoginRequest) console.warn('⚠️ No token – request may fail');
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;