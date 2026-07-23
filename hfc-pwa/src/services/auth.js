import api from './api';

export const login = async (churchId, password) => {
  try {
    const response = await api.post('/auth/login', { churchId, password });
    if (response.data.success) {
      const { user, fellowship, token } = response.data.data;
      localStorage.setItem('jwt_token', token);
      console.log('✅ Token saved to localStorage');
      return { success: true, user, fellowship, token };
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Network error' };
  }
};

export const getToken = () => localStorage.getItem('jwt_token');
export const removeToken = () => localStorage.removeItem('jwt_token');