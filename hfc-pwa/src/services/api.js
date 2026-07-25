import axios from 'axios';
import { useLoadingStore } from '../stores/loading';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const loadingStore = useLoadingStore();
  loadingStore.setLoading(true);
  const token = localStorage.getItem('jwt_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => {
    const loadingStore = useLoadingStore();
    loadingStore.setLoading(false);
    return response;
  },
  (error) => {
    const loadingStore = useLoadingStore();
    loadingStore.setLoading(false);
    return Promise.reject(error);
  }
);

export default api;