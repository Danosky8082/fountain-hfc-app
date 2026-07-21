import axios from 'axios'

// Use the IP address for network access, fallback to localhost for local testing
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://192.168.69.125:5000/api'

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