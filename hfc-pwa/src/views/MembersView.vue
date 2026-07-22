<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h4>👥 All Members (Register)</h4>
      <button class="btn btn-primary" @click="goToAdmin">➕ Add Member</button>
    </div>
    <p class="text-muted">Full list of members across all fellowships.</p>

    <div class="mb-3">
      <input
        v-model="search"
        type="text"
        class="form-control"
        placeholder="Search by name, phone, or email..."
      />
    </div>

    <div v-if="loading" class="text-center">
      <LoadingSpinner />
    </div>
    <div v-else-if="members.length === 0" class="alert alert-info">No members found.</div>
    <div v-else>
      <table class="table table-bordered table-striped table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Fellowship</th>
            <th>QR Code</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="member in filteredMembers" :key="member.id">
            <td>{{ member.fullName }}</td>
            <td>{{ member.phone || '—' }}</td>
            <td>{{ member.email || '—' }}</td>
            <td>{{ member.fellowship?.name || '—' }}</td>
            <td>
              <button class="btn btn-sm btn-info" @click="showQR(member.id)">QR</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner.vue';

const router = useRouter();
const authStore = useAuthStore();

const loading = ref(true);
const members = ref([]);
const search = ref('');
const initialized = ref(false); // track if restoreSession has run

const filteredMembers = computed(() => {
  if (!search.value) return members.value;
  const s = search.value.toLowerCase();
  return members.value.filter(
    (m) =>
      m.fullName.toLowerCase().includes(s) ||
      (m.phone && m.phone.includes(s)) ||
      (m.email && m.email.toLowerCase().includes(s))
  );
});

const fetchMembers = async () => {
  // Double-check token presence
  const token = authStore.token || localStorage.getItem('jwt_token');
  if (!token) {
    console.warn('⏳ No token available – skipping fetch');
    loading.value = false;
    return;
  }

  loading.value = true;
  try {
    const res = await api.get('/admin/members');
    if (res.data.success) {
      members.value = res.data.data;
    } else {
      console.error('Failed to fetch members:', res.data.message);
    }
  } catch (error) {
    console.error('Failed to fetch members', error);
  } finally {
    loading.value = false;
  }
};

const showQR = (memberId) => {
  const token = authStore.token;
  if (!token) {
    alert('You are not logged in. Please log in again.');
    return;
  }
  const baseUrl = api.defaults.baseURL.replace(/\/api$/, '');
  window.open(`${baseUrl}/api/qr/member/${memberId}?token=${token}`, '_blank');
};

const goToAdmin = () => {
  router.push('/admin');
};

onMounted(async () => {
  // 1. Restore session (load token from localStorage)
  await authStore.restoreSession();
  initialized.value = true;

  // 2. If token is now present, fetch members
  if (authStore.token) {
    await fetchMembers();
  }
});

// 3. Watch for future token changes (e.g., after login)
watch(
  () => authStore.token,
  (newToken) => {
    // Only fetch if the initial restore has finished and token is present
    if (initialized.value && newToken) {
      fetchMembers();
    }
  }
);
</script>