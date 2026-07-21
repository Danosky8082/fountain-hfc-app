// create-files.js
const fs = require('fs');
const path = require('path');

const files = {
  // src/main.js
  'src/main.js': `import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './assets/main.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')`,

  // src/App.vue
  'src/App.vue': `<template>
  <div id="app">
    <NavBar v-if="authStore.isAuthenticated" />
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from './stores/auth'
import NavBar from './components/NavBar.vue'

const authStore = useAuthStore()

onMounted(() => {
  authStore.checkToken()
})
</script>`,

  // src/assets/main.css
  'src/assets/main.css': `body {
  background-color: #f8f9fa;
}
.clickable {
  cursor: pointer;
}
.qr-reader {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}`,

  // src/components/NavBar.vue
  'src/components/NavBar.vue': `<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container">
      <router-link class="navbar-brand" to="/dashboard">
        <i class="bi bi-church"></i> Fountain HFC
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/scanner">Scan QR</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/manual">Manual Check-in</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/attendance">Attendance</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/report">Report</router-link>
          </li>
        </ul>
        <button class="btn btn-outline-light" @click="logout">Logout</button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>`,

  // src/components/LoadingSpinner.vue
  'src/components/LoadingSpinner.vue': `<template>
  <div class="text-center my-5">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>`,

  // src/router/index.js
  'src/router/index.js': `import { createRouter, createWebHistory } from 'vue-router'
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

export default router`,

  // src/stores/auth.js
  'src/stores/auth.js': `import { defineStore } from 'pinia'
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
})`,

  // src/services/api.js
  'src/services/api.js': `import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt_token')
  if (token) {
    config.headers.Authorization = \`Bearer \${token}\`
  }
  return config
})

export default api`,

  // src/services/auth.js
  'src/services/auth.js': `import api from './api'

export const login = async (churchId, password) => {
  try {
    const response = await api.post('/auth/login', { churchId, password })
    if (response.data.success) {
      const { user, fellowship, token } = response.data.data
      localStorage.setItem('jwt_token', token)
      return { success: true, user, fellowship, token }
    } else {
      return { success: false, message: response.data.message }
    }
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Network error' }
  }
}

export const getToken = () => localStorage.getItem('jwt_token')
export const removeToken = () => localStorage.removeItem('jwt_token')`,

  // views
  'src/views/LoginView.vue': `<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-4">
        <div class="card shadow">
          <div class="card-body p-4">
            <h3 class="text-center mb-4">Fountain of Life</h3>
            <p class="text-center text-muted">Home Fellowship Centre</p>
            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label class="form-label">Church ID</label>
                <input v-model="churchId" type="text" class="form-control" placeholder="e.g., FT0671NG" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Password</label>
                <input v-model="password" type="password" class="form-control" placeholder="••••••••" required />
              </div>
              <button :disabled="loading" type="submit" class="btn btn-primary w-100">
                <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                Login
              </button>
              <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const router = useRouter()
const churchId = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  const result = await authStore.login(churchId.value, password.value)
  loading.value = false
  if (result.success) {
    router.push('/dashboard')
  } else {
    error.value = result.message
  }
}
</script>`,

  'src/views/DashboardView.vue': `<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-12">
        <div class="card shadow-sm">
          <div class="card-body">
            <h4>Welcome, {{ authStore.user?.fullName }}</h4>
            <p class="text-muted">{{ authStore.fellowship?.name }} – {{ authStore.fellowship?.location }}</p>
            <hr />
            <div class="row mt-3">
              <div class="col-md-4">
                <div class="card text-white bg-success">
                  <div class="card-body">
                    <h5 class="card-title">📊 Attendance</h5>
                    <router-link to="/attendance" class="btn btn-light btn-sm">View</router-link>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card text-white bg-primary">
                  <div class="card-body">
                    <h5 class="card-title">📷 Scan QR</h5>
                    <router-link to="/scanner" class="btn btn-light btn-sm">Scan</router-link>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card text-white bg-info">
                  <div class="card-body">
                    <h5 class="card-title">📋 Manual Check-in</h5>
                    <router-link to="/manual" class="btn btn-light btn-sm">Check-in</router-link>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-md-6">
                <div class="card text-white bg-warning">
                  <div class="card-body">
                    <h5 class="card-title">📄 Monthly Report</h5>
                    <router-link to="/report" class="btn btn-dark btn-sm">View Report</router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
const authStore = useAuthStore()
</script>`,

  'src/views/ScannerView.vue': `<template>
  <div class="container mt-4">
    <h4>📷 Scan QR Code</h4>
    <p class="text-muted">Point your camera at a member's QR code.</p>
    <div id="qr-reader" class="qr-reader"></div>
    <div v-if="scanResult" class="alert alert-success mt-3">
      ✅ Scanned: <strong>{{ scanResult }}</strong>
      <button class="btn btn-success btn-sm ms-2" @click="markPresent">Mark Present</button>
    </div>
    <div v-if="scanError" class="alert alert-danger mt-3">{{ scanError }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Html5Qrcode } from 'html5-qrcode'
import api from '../services/api'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const scanResult = ref(null)
const scanError = ref(null)
let html5QrCode = null

onMounted(() => {
  html5QrCode = new Html5Qrcode('qr-reader')
  html5QrCode.start(
    { facingMode: 'environment' },
    {
      fps: 10,
      qrbox: { width: 250, height: 250 },
    },
    (decodedText) => {
      scanResult.value = decodedText
      html5QrCode.stop()
    },
    (error) => {}
  ).catch((err) => {
    scanError.value = 'Camera access denied or unavailable. Please allow camera permissions.'
    console.error(err)
  })
})

onUnmounted(() => {
  if (html5QrCode) {
    html5QrCode.stop()
    html5QrCode.clear()
  }
})

const markPresent = async () => {
  if (!scanResult.value) return
  try {
    const response = await api.post('/attendance/mark', {
      memberId: scanResult.value,
      checkInMethod: 'QR_SCAN'
    })
    if (response.data.success) {
      alert('✅ Check-in successful!')
      scanResult.value = null
      html5QrCode.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          scanResult.value = decodedText
          html5QrCode.stop()
        },
        (error) => {}
      )
    } else {
      alert('❌ Failed: ' + response.data.message)
    }
  } catch (error) {
    alert('Error marking attendance')
  }
}
</script>`,

  'src/views/ManualCheckinView.vue': `<template>
  <div class="container mt-4">
    <h4>📋 Manual Check-in</h4>
    <p class="text-muted">Select members present (for those who lost their QR cards).</p>
    <div v-if="loading" class="text-center my-5"><LoadingSpinner /></div>
    <div v-else-if="members.length === 0" class="alert alert-info">No active members found in your fellowship.</div>
    <div v-else>
      <div class="input-group mb-3">
        <input v-model="search" type="text" class="form-control" placeholder="Search members..." />
        <span class="input-group-text"><i class="bi bi-search"></i></span>
      </div>
      <div class="list-group">
        <div
          v-for="member in filteredMembers"
          :key="member.id"
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          <span>{{ member.fullName }}</span>
          <div>
            <span v-if="member.isPresent" class="badge bg-success me-2">Present</span>
            <button
              v-if="!member.isPresent"
              class="btn btn-sm btn-outline-primary"
              @click="checkIn(member.id)"
            >
              Check-in
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '../services/api'
import { useAuthStore } from '../stores/auth'
import LoadingSpinner from '../components/LoadingSpinner.vue'

const authStore = useAuthStore()
const loading = ref(true)
const members = ref([])
const search = ref('')

const filteredMembers = computed(() => {
  if (!search.value) return members.value
  return members.value.filter(m => m.fullName.toLowerCase().includes(search.value.toLowerCase()))
})

const fetchMembers = async () => {
  try {
    const response = await api.get('/fellowship/members')
    if (response.data.success) {
      members.value = response.data.data.map(m => ({ ...m, isPresent: false }))
      await fetchAttendance()
    }
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

const fetchAttendance = async () => {
  try {
    const res = await api.get('/attendance/current-session')
    if (res.data.success) {
      const sessionMembers = res.data.data.members
      members.value = members.value.map(m => {
        const found = sessionMembers.find(sm => sm.id === m.id)
        return { ...m, isPresent: found?.isPresent || false }
      })
    }
  } catch (error) {
    console.error('Failed to fetch attendance', error)
  }
}

const checkIn = async (memberId) => {
  try {
    const res = await api.post('/attendance/mark', {
      memberId,
      checkInMethod: 'MANUAL'
    })
    if (res.data.success) {
      const member = members.value.find(m => m.id === memberId)
      if (member) member.isPresent = true
      alert('✅ Check-in successful!')
    } else {
      alert('❌ Failed: ' + res.data.message)
    }
  } catch (error) {
    alert('Error checking in')
  }
}

onMounted(() => {
  fetchMembers()
})
</script>`,

  'src/views/AttendanceView.vue': `<template>
  <div class="container mt-4">
    <h4>📊 Current Week Attendance</h4>
    <div v-if="loading" class="text-center"><LoadingSpinner /></div>
    <div v-else-if="session">
      <div class="card mb-3">
        <div class="card-body">
          <h5>Week {{ session.weekNumber }} – {{ session.meetingDate }}</h5>
          <p>Total Present: <strong>{{ session.totalPresent }}</strong></p>
          <button
            :disabled="session.isSubmitted"
            class="btn btn-success"
            @click="submitWeek"
          >
            {{ session.isSubmitted ? '✅ Submitted' : 'Submit Week' }}
          </button>
          <span v-if="submitting" class="ms-2 spinner-border spinner-border-sm"></span>
        </div>
      </div>
      <div class="list-group">
        <div v-for="member in members" :key="member.id" class="list-group-item d-flex justify-content-between">
          <span>{{ member.fullName }}</span>
          <span v-if="member.isPresent" class="badge bg-success">✅ Present</span>
          <span v-else class="badge bg-secondary">Absent</span>
        </div>
      </div>
    </div>
    <div v-else class="alert alert-info">No active session found. Scan members to start one.</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner.vue'

const loading = ref(true)
const session = ref(null)
const members = ref([])
const submitting = ref(false)

const fetchData = async () => {
  try {
    const res = await api.get('/attendance/current-session')
    if (res.data.success) {
      session.value = res.data.data.session
      members.value = res.data.data.members || []
    }
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

const submitWeek = async () => {
  if (submitting.value) return
  if (!confirm('Are you sure you want to submit this week? This cannot be undone.')) return
  submitting.value = true
  try {
    const res = await api.post('/attendance/submit-week')
    if (res.data.success) {
      alert('✅ Week submitted successfully!')
      await fetchData()
    } else {
      alert('❌ ' + res.data.message)
    }
  } catch (error) {
    alert('Error submitting week')
  } finally {
    submitting.value = false
  }
}

onMounted(fetchData)
</script>`,

  'src/views/ReportView.vue': `<template>
  <div class="container mt-4">
    <h4>📄 Monthly Report</h4>
    <div v-if="loading" class="text-center"><LoadingSpinner /></div>
    <div v-else-if="report">
      <div class="card">
        <div class="card-body">
          <h5>{{ report.fellowship.name }} – {{ report.monthYear }}</h5>
          <p><strong>Status:</strong> {{ report.status }}</p>
          <hr />
          <h6>Weekly Attendance</h6>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Week</th>
                <th>Date</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="i in 5" :key="i">
                <td>Week {{ i }}</td>
                <td>{{ report[\`week\${i}Date\`] ? formatDate(report[\`week\${i}Date\`]) : '—' }}</td>
                <td>{{ report[\`week\${i}Count\`] || 0 }}</td>
              </tr>
            </tbody>
          </table>
          <hr />
          <h6>Pastoral & Follow-up</h6>
          <div class="mb-2">
            <label class="form-label">Prayed for every member at least once a week?</label>
            <div class="form-check">
              <input v-model="form.prayerFlag" class="form-check-input" type="checkbox" id="prayerFlag" />
              <label class="form-check-label" for="prayerFlag">Yes</label>
            </div>
          </div>
          <div class="mb-2">
            <label class="form-label">First Timers / New Converts</label>
            <input v-model.number="form.firstTimers" type="number" class="form-control" min="0" />
          </div>
          <div class="mb-2">
            <label class="form-label">New Members (total)</label>
            <input v-model.number="form.newMembers" type="number" class="form-control" min="0" />
          </div>
          <div class="mb-2">
            <label class="form-label">Follow-ups</label>
            <input v-model.number="form.followUps" type="number" class="form-control" min="0" />
          </div>
          <div class="mb-2">
            <label class="form-label">Issues for Escalation</label>
            <textarea v-model="form.escalations" class="form-control" rows="2"></textarea>
          </div>
          <div class="mb-2">
            <label class="form-label">Comments / Feedback</label>
            <textarea v-model="form.comments" class="form-control" rows="2"></textarea>
          </div>
          <div class="d-flex gap-2">
            <button class="btn btn-primary" @click="saveReport(false)">💾 Save Draft</button>
            <button class="btn btn-success" @click="saveReport(true)">✅ Finalize Report</button>
            <button class="btn btn-info" @click="downloadPDF">📄 Download PDF</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="alert alert-warning">No report found. Please ensure you have submitted at least one week.</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner.vue'

const loading = ref(true)
const report = ref(null)
const form = ref({
  prayerFlag: false,
  firstTimers: 0,
  newMembers: 0,
  followUps: 0,
  escalations: '',
  comments: '',
})

const formatDate = (dateStr) => {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const fetchReport = async () => {
  try {
    const res = await api.get('/reports/current')
    if (res.data.success) {
      report.value = res.data.data
      form.value.prayerFlag = report.value.prayerFlag || false
      form.value.firstTimers = report.value.firstTimers || 0
      form.value.newMembers = report.value.newMembers || 0
      form.value.followUps = report.value.followUps || 0
      form.value.escalations = report.value.escalations || ''
      form.value.comments = report.value.comments || ''
    }
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

const saveReport = async (finalize) => {
  if (!report.value) return
  try {
    const payload = {
      ...form.value,
      action: finalize ? 'FINALIZE' : 'SAVE',
    }
    const res = await api.put(\`/reports/\${report.value.id}\`, payload)
    if (res.data.success) {
      alert(finalize ? '✅ Report finalized!' : '💾 Draft saved!')
      await fetchReport()
    } else {
      alert('❌ Failed: ' + res.data.message)
    }
  } catch (error) {
    alert('Error saving report')
  }
}

const downloadPDF = () => {
  if (!report.value) return
  const url = \`/api/reports/\${report.value.id}/pdf\`
  window.open(url, '_blank')
}

onMounted(fetchReport)
</script>`
};

// Write all files
Object.entries(files).forEach(([filepath, content]) => {
  const fullPath = path.join(__dirname, filepath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`✅ Created ${filepath}`);
});

console.log('🎉 All files created successfully!');
console.log('👉 Run "npm run dev" to start the app.');