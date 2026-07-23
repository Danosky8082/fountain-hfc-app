import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { login as apiLogin, getToken, removeToken } from '../services/auth';
import api from '../services/api';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const fellowship = ref(null);
  const token = ref(null);
  const isAuthenticated = ref(false);

  // ─── Login ──────────────────────────────────────────────────
  const login = async (churchId, password) => {
    try {
      const result = await apiLogin(churchId, password);
      if (result.success) {
        user.value = result.user;
        fellowship.value = result.fellowship || null;
        token.value = result.token;
        isAuthenticated.value = true;
        console.log('✅ Login success – user:', user.value);
        return { success: true };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // ─── Logout ──────────────────────────────────────────────────
  const logout = () => {
    removeToken();
    user.value = null;
    fellowship.value = null;
    token.value = null;
    isAuthenticated.value = false;
  };

  // ─── Restore Session ──────────────────────────────────────────
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
        console.log('✅ Session restored – user:', user.value);
        console.log('✅ Role:', user.value?.role);
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

  // ─── Computed ──────────────────────────────────────────────────
  const userRole = computed(() => user.value?.role || null);
  const isAdmin = computed(() => userRole.value === 'ADMIN');
  const isHod = computed(() => userRole.value === 'HOD');
  const isAdminOrHod = computed(() => isAdmin.value || isHod.value);

  // ─── Public API ──────────────────────────────────────────────
  return {
    user,
    fellowship,
    token,
    isAuthenticated,
    userRole,
    isAdmin,
    isHod,
    isAdminOrHod,
    login,
    logout,
    restoreSession,
    checkToken: restoreSession,
  };
});