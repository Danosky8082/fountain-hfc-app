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
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router