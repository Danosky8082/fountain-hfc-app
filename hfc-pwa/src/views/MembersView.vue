<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h4>👥 All Members (Register)</h4>
      <button class="btn btn-primary" @click="goToAdmin">➕ Add Member</button>
    </div>
    <p class="text-muted">Full list of members across all fellowships.</p>

    <div class="mb-3">
      <input v-model="search" type="text" class="form-control" placeholder="Search by name..." />
    </div>

    <div v-if="loading || !authStore.token" class="text-center"><LoadingSpinner /></div>
    <div v-else-if="members.length === 0" class="alert alert-info">No members found.</div>
    <div v-else>
      <table class="table table-bordered">
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
import { ref, computed, onMounted, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner.vue';

const router = useRouter();
const authStore = useAuthStore();

const loading = ref(true);
const members = ref([]);
const search = ref('');

const filteredMembers = computed(() => {
  if (!search.value) return members.value;
  const s = search.value.toLowerCase();
  return members.value.filter(m =>
    m.fullName.toLowerCase().includes(s) ||
    (m.phone && m.phone.includes(s)) ||
    (m.email && m.email.toLowerCase().includes(s))
  );
});

const fetchMembers = async () => {
  if (!authStore.token) return;
  loading.value = true;
  try {
    const res = await api.get('/admin/members');
    if (res.data.success) members.value = res.data.data;
  } catch (e) {
    console.error('Failed to fetch members', e);
  } finally {
    loading.value = false;
  }
};

// 👇 Automatically fetch whenever token becomes available
watchEffect(() => {
  if (authStore.token) fetchMembers();
});

const showQR = (memberId) => {
  const token = authStore.token;
  if (!token) { alert('Please log in.'); return; }
  const baseUrl = api.defaults.baseURL.replace(/\/api$/, '');
  window.open(`${baseUrl}/api/qr/member/${memberId}?token=${token}`, '_blank');
};

const goToAdmin = () => router.push('/admin');

onMounted(async () => {
  await authStore.restoreSession(); // load token from localStorage
});
</script>