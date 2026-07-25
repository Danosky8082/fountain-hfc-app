<template>
  <div id="app">
    <GlobalLoading />
    <Toast ref="toastRef" />
    <NavBar v-if="authStore.isAuthenticated" />
    <router-view />
  </div>
</template>

<script setup>
import { onMounted, ref, computed, watch, provide } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from './stores/auth';
import NavBar from './components/NavBar.vue';
import GlobalLoading from './components/GlobalLoading.vue';
import Toast from './components/Toast.vue';

// Initialize stores and router
const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();
const toastRef = ref(null);

// Computed properties
const isAuthenticated = computed(() => authStore.isAuthenticated);
const currentUser = computed(() => authStore.user);
const userRole = computed(() => authStore.user?.role || '');
const isLoading = computed(() => authStore.isLoading || false);

// Watch for authentication changes
watch(
  () => authStore.isAuthenticated,
  (newVal, oldVal) => {
    console.log('🔐 Auth state changed:', { from: oldVal, to: newVal });
    if (newVal && !oldVal) {
      // User just logged in
      console.log('✅ User logged in:', authStore.user?.fullName);
    } else if (!newVal && oldVal) {
      // User just logged out
      console.log('👋 User logged out');
      router.push('/login');
    }
  },
  { immediate: false }
);

// Watch for role changes
watch(
  () => authStore.user?.role,
  (newRole, oldRole) => {
    if (newRole && newRole !== oldRole) {
      console.log('🔄 User role changed:', { from: oldRole, to: newRole });
    }
  }
);

// Global toast methods
const showToast = (message, type = 'success', duration = 3000) => {
  if (toastRef.value) {
    toastRef.value.show(message, type, duration);
  } else {
    console.warn('Toast not ready yet:', message);
  }
};

// Global error handler
const handleGlobalError = (error) => {
  console.error('❌ Global error caught:', error);
  
  let errorMessage = 'An unexpected error occurred. Please try again.';
  
  if (error.response) {
    // Server responded with error
    const status = error.response.status;
    const data = error.response.data;
    
    if (status === 401) {
      errorMessage = 'Your session has expired. Please login again.';
      authStore.logout();
      router.push('/login');
    } else if (status === 403) {
      errorMessage = 'You do not have permission to perform this action.';
    } else if (status === 404) {
      errorMessage = 'The requested resource was not found.';
    } else if (status === 500) {
      errorMessage = 'Server error. Please try again later.';
    } else if (data?.message) {
      errorMessage = data.message;
    }
  } else if (error.request) {
    // Request made but no response
    errorMessage = 'Network error. Please check your connection.';
  } else if (error.message) {
    errorMessage = error.message;
  }
  
  showToast(errorMessage, 'error');
};

// Route guard for protected routes
const checkRouteAccess = (to, from, next) => {
  // Skip for public routes
  const publicRoutes = ['/login', '/register', '/forgot-password', '/reset-password', '/help'];
  if (publicRoutes.includes(to.path)) {
    return next();
  }

  // Check authentication
  if (!authStore.isAuthenticated) {
    showToast('Please login to access this page', 'warning');
    return next('/login');
  }

  // Check role-based access
  const userRole = authStore.user?.role;
  const requiredRole = to.meta?.requiredRole;
  const allowedRoles = to.meta?.allowedRoles || [];

  if (requiredRole && userRole !== requiredRole) {
    showToast('You do not have access to this page', 'error');
    return next('/dashboard');
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    showToast('You do not have access to this page', 'error');
    return next('/dashboard');
  }

  // Check fellowship access
  if (to.meta?.requiresFellowship && !authStore.user?.fellowshipId) {
    showToast('You need to be assigned to a fellowship', 'warning');
    return next('/dashboard');
  }

  next();
};

// Setup global error handling
const setupGlobalErrorHandling = () => {
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    console.error('❌ Unhandled Promise Rejection:', event.reason);
    handleGlobalError(event.reason);
    event.preventDefault();
  });

  // Handle global errors
  window.addEventListener('error', (event) => {
    console.error('❌ Global Error:', event.error);
    handleGlobalError(event.error);
    event.preventDefault();
  });

  // Axios interceptors for global error handling
  const axios = window.axios || require('axios');
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      handleGlobalError(error);
      return Promise.reject(error);
    }
  );
};

// Provide toast globally
provide('toast', {
  show: showToast,
  success: (msg, duration) => showToast(msg, 'success', duration),
  error: (msg, duration) => showToast(msg, 'error', duration),
  warning: (msg, duration) => showToast(msg, 'warning', duration),
  info: (msg, duration) => showToast(msg, 'info', duration),
});

// Lifecycle hooks
onMounted(() => {
  console.log('🚀 App mounted');
  
  // Expose toast globally
  window.$toast = toastRef.value;
  window.showToast = showToast;
  window.handleGlobalError = handleGlobalError;
  
  // Setup global error handling
  setupGlobalErrorHandling();
  
  // Restore session
  try {
    authStore.restoreSession();
    console.log('✅ Session restored successfully');
  } catch (error) {
    console.error('❌ Failed to restore session:', error);
    showToast('Failed to restore session. Please login again.', 'error');
  }
  
  // Set up route guards
  router.beforeEach(checkRouteAccess);
});

// Cleanup on unmount
const cleanup = () => {
  // Remove event listeners
  window.removeEventListener('unhandledrejection', handleGlobalError);
  window.removeEventListener('error', handleGlobalError);
  console.log('🧹 App cleanup completed');
};

// Export for use in other components
defineExpose({
  showToast,
  handleGlobalError,
  isAuthenticated,
  currentUser,
  userRole,
  isLoading
});
</script>

<style>
/* Global styles */
#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  background-color: #f8f9fa;
}

/* Loading overlay styles */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

/* Toast container styles */
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9998;
  max-width: 350px;
}

/* Animation for toast */
@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOutRight {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}

.toast-enter-active {
  animation: slideInRight 0.3s ease forwards;
}

.toast-leave-active {
  animation: slideOutRight 0.3s ease forwards;
}

/* Responsive design */
@media (max-width: 768px) {
  .toast-container {
    top: 10px;
    right: 10px;
    left: 10px;
    max-width: 100%;
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Utility classes */
.text-center {
  text-align: center;
}

.mt-3 {
  margin-top: 1rem;
}

.mb-3 {
  margin-bottom: 1rem;
}

.p-3 {
  padding: 1rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

/* Print styles */
@media print {
  .no-print {
    display: none !important;
  }
  
  .print-only {
    display: block !important;
  }
}
</style>