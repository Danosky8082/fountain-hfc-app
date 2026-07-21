import axios from 'axios'

// Use your local IP for the backend (port 5000)
const BACKEND_URL = 'https://172.16.3.218:5000'
//const baseURL = `${BACKEND_URL}/api`
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api