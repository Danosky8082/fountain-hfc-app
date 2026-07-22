import axios from 'axios';

// ✅ Use environment variable in production, fallback to localhost for development
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🔑 Interceptor to attach JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt_token');
    // Debug log – remove after confirming it works
    console.log('🔑 Token from localStorage:', token ? '✅ Present' : '❌ Missing');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('✅ Authorization header set');
    } else {
      console.warn('⚠️ No token found – request will be unauthorized');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;