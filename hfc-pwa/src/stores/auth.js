import { defineStore } from 'pinia'
import { ref } from 'vue'
import { login as apiLogin, getToken, removeToken } from '../services/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const fellowship = ref(null)
  const token = ref(null)
  const isAuthenticated = ref(false)

  const login = async (churchId, password) => {
    try {
      const result = await apiLogin(churchId, password)
      if (result.success) {
        user.value = result.user
        fellowship.value = result.fellowship
        token.value = result.token
        isAuthenticated.value = true
        return { success: true }
      } else {
        return { success: false, message: result.message }
      }
    } catch (error) {
      return { success: false, message: error.message }
    }
  }

  const logout = () => {
    removeToken()
    user.value = null
    fellowship.value = null
    token.value = null
    isAuthenticated.value = false
  }

  const checkToken = async () => {
    const stored = getToken()
    if (stored) {
      token.value = stored
      isAuthenticated.value = true
    }
  }

  return { user, fellowship, token, isAuthenticated, login, logout, checkToken }
})