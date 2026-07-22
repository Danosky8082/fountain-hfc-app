import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/dashboard' },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue'),
      meta: { requiresGuest: true },
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/scanner',
      name: 'Scanner',
      component: () => import('../views/ScannerView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/manual',
      name: 'ManualCheckin',
      component: () => import('../views/ManualCheckinView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/attendance',
      name: 'Attendance',
      component: () => import('../views/AttendanceView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/report',
      name: 'Report',
      component: () => import('../views/ReportView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/hod-dashboard',
      name: 'HODDashboard',
      component: () => import('../views/HODDashboardView.vue'),
      meta: { requiresAuth: true, requiresHOD: true },
    },
    {
      path: '/admin',
      name: 'Admin',
      component: () => import('../views/AdminView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/members',
      name: 'Members',
      component: () => import('../views/MembersView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true },
    },
  ],
});

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();

  // If route requires authentication, check if we need to restore session
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      const restored = await authStore.restoreSession();
      if (!restored) {
        return '/login';
      }
    } else {
      return '/login';
    }
  }

  // If route requires guest (login page) and user is authenticated
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    return '/dashboard';
  }

  // Role-based restrictions
  if (to.meta.requiresHOD && authStore.user?.role !== 'HOD' && authStore.user?.role !== 'ADMIN') {
    return '/dashboard';
  }
  if (to.meta.requiresAdmin && authStore.user?.role !== 'ADMIN') {
    return '/dashboard';
  }

  return true;
});

export default router;