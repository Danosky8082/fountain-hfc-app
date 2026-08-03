// src/services/api.js
import axios from 'axios';
import { useLoadingStore } from '../stores/loading';

// ─── Use the correct backend URL ───
const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://fountain-hfc.onrender.com/api';

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

// ─── Request Interceptor ───
api.interceptors.request.use(
  (config) => {
    const loadingStore = useLoadingStore();
    loadingStore.setLoading(true);
    
    const token = localStorage.getItem('jwt_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log the request for debugging
    console.log(`📤 ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    
    return config;
  },
  (error) => {
    const loadingStore = useLoadingStore();
    loadingStore.setLoading(false);
    return Promise.reject(error);
  }
);

// ─── Response Interceptor ───
api.interceptors.response.use(
  (response) => {
    const loadingStore = useLoadingStore();
    loadingStore.setLoading(false);
    return response;
  },
  (error) => {
    const loadingStore = useLoadingStore();
    loadingStore.setLoading(false);
    
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      console.warn('⚠️ Session expired. Redirecting to login...');
      localStorage.removeItem('jwt_token');
      // Redirect to login page if not already there
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    
    console.error('❌ API Error:', error.response?.status, error.response?.data?.message || error.message);
    
    return Promise.reject(error);
  }
);

export default api;