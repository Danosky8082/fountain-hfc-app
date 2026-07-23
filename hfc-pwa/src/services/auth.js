import api from './api';

export const login = async (churchId, password) => {
  try {
    const response = await api.post('/auth/login', { churchId, password });
    console.log('🔍 Login response:', response.data);
    if (response.data.success) {
      const { user, fellowship, token } = response.data.data;
      console.log('🔍 User from login:', user);
      localStorage.setItem('jwt_token', token);
      return { success: true, user, fellowship, token };
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: error.response?.data?.message || 'Network error' };
  }
};