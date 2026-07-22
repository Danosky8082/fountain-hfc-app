import { defineStore } from 'pinia';
import { ref } from 'vue';
import { login as apiLogin, getToken, removeToken } from '../services/auth';
import api from '../services/api';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const fellowship = ref(null);
  const token = ref(null);
  const isAuthenticated = ref(false);

  const login = async (churchId, password) => {
    try {
      const result = await apiLogin(churchId, password);
      if (result.success) {
        user.value = result.user;
        fellowship.value = result.fellowship || null;
        token.value = result.token;
        isAuthenticated.value = true;
        return { success: true };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    removeToken();
    user.value = null;
    fellowship.value = null;
    token.value = null;
    isAuthenticated.value = false;
  };

  // ✅ Restore session from token (calls /auth/me)
  const restoreSession = async () => {
    const storedToken = getToken();
    if (!storedToken) {
      isAuthenticated.value = false;
      return false;
    }
    try {
      const response = await api.get('/auth/me');
      if (response.data.success) {
        user.value = response.data.data;
        fellowship.value = response.data.data.leading || response.data.data.assisting || null;
        token.value = storedToken;
        isAuthenticated.value = true;
        return true;
      } else {
        removeToken();
        isAuthenticated.value = false;
        user.value = null;
        fellowship.value = null;
        token.value = null;
        return false;
      }
    } catch (error) {
      removeToken();
      isAuthenticated.value = false;
      user.value = null;
      fellowship.value = null;
      token.value = null;
      return false;
    }
  };

  // checkToken now performs full session restoration
  const checkToken = async () => {
    await restoreSession();
  };

  return {
    user,
    fellowship,
    token,
    isAuthenticated,
    login,
    logout,
    restoreSession,
    checkToken,
  };
});