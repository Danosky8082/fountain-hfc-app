import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

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
})

// Updated navigation guard – no more `next()` callback
router.beforeEach((to, from) => {
  const authStore = useAuthStore()
  
  // If route requires auth and user is not authenticated
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return '/login'
  }
  
  // If route requires guest (login page) and user is already authenticated
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    return '/dashboard'
  }

  // If route requires HOD role and user is not HOD
  if (to.meta.requiresHOD && authStore.user?.role !== 'HOD') {
    return '/dashboard'
  }

  // If route requires Admin role and user is not Admin
  if (to.meta.requiresAdmin && authStore.user?.role !== 'ADMIN') {
    return '/dashboard'
  }
  
  // Proceed normally
  return true
})

export default router