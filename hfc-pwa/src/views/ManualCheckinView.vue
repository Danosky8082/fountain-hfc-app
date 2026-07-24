<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-3 flex-wrap">
      <h4>📋 Manual Check-in</h4>
      <button class="btn btn-primary btn-sm" @click="showAddMemberModal = true">
        ➕ Add Member
      </button>
    </div>
    <p class="text-muted">Select members present (for those who lost their QR cards).</p>

    <!-- Fellowship selector for Admin/HOD -->
    <div v-if="isAdminOrHod" class="mb-3">
      <label class="form-label">Select Fellowship</label>
      <select v-model="selectedFellowshipId" class="form-control" @change="onFellowshipChange">
        <option v-for="f in fellowships" :key="f.id" :value="f.id">{{ f.name }}</option>
      </select>
    </div>

    <div v-if="loading" class="text-center my-5"><LoadingSpinner /></div>
    <div v-else-if="members.length === 0" class="alert alert-info">No active members found.</div>
    <div v-else>
      <div class="input-group mb-3">
        <input v-model="search" type="text" class="form-control" placeholder="Search members..." />
        <span class="input-group-text"><i class="bi bi-search"></i></span>
      </div>
      <!-- Warning if week submitted -->
      <div v-if="sessionSubmitted" class="alert alert-warning">
        ⚠️ The current week has already been submitted. You cannot mark additional members present.
        <span v-if="isAdminOrHod">
          Use the <router-link to="/admin/correction">Correction page</router-link> to adjust attendance.
        </span>
      </div>
      <div class="list-group">
        <div v-for="member in filteredMembers" :key="member.id" class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
          <span>{{ member.fullName }}</span>
          <div class="d-flex gap-1 flex-wrap">
            <span v-if="member.isPresent" class="badge bg-success me-2">Present</span>
            <button
              v-if="!member.isPresent && !sessionSubmitted"
              class="btn btn-sm btn-outline-primary me-1"
              @click="checkIn(member.id)"
            >
              Check-in
            </button>
            <button v-if="!member.isPresent && sessionSubmitted" class="btn btn-sm btn-secondary me-1" disabled>
              Check-in
            </button>
            <button class="btn btn-sm btn-info" @click="showQR(member.id)">QR</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Member Modal -->
    <div v-if="showAddMemberModal" class="modal-overlay" @click.self="showAddMemberModal = false">
      <div class="modal-content">
        <h5>Add New Member</h5>
        <form @submit.prevent="addMember">
          <div class="mb-2"><label class="form-label">Full Name *</label><input v-model="newMember.fullName" type="text" class="form-control" required /></div>
          <div class="mb-2"><label class="form-label">Phone</label><input v-model="newMember.phone" type="text" class="form-control" /></div>
          <div class="mb-2"><label class="form-label">Email</label><input v-model="newMember.email" type="email" class="form-control" /></div>
          <div class="mb-2"><label class="form-label">Member Number (optional)</label><input v-model="newMember.memberNumber" type="text" class="form-control" placeholder="e.g., M001" /></div>
          <div class="d-flex gap-2 flex-wrap">
            <button type="submit" class="btn btn-success" :disabled="addingMember"><span v-if="addingMember" class="spinner-border spinner-border-sm me-2"></span>Add Member</button>
            <button type="button" class="btn btn-secondary" @click="showAddMemberModal = false">Cancel</button>
          </div>
        </form>
        <div v-if="memberAddMessage" class="mt-2" :class="memberAddClass">{{ memberAddMessage }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import api from '../services/api';
import { useAuthStore } from '../stores/auth';
import LoadingSpinner from '../components/LoadingSpinner.vue';

const authStore = useAuthStore();
const loading = ref(true);
const members = ref([]);
const search = ref('');
const sessionSubmitted = ref(false);

// Fellowship selector (for Admin/HOD)
const fellowships = ref([]);
const selectedFellowshipId = ref(null);
const isAdminOrHod = computed(() => authStore.user?.role === 'ADMIN' || authStore.user?.role === 'HOD');

// Modal state
const showAddMemberModal = ref(false);
const addingMember = ref(false);
const memberAddMessage = ref('');
const memberAddClass = ref('text-success');
const newMember = ref({ fullName: '', phone: '', email: '', memberNumber: '' });

const filteredMembers = computed(() => {
  if (!search.value) return members.value;
  return members.value.filter(m => m.fullName.toLowerCase().includes(search.value.toLowerCase()));
});

// ─── Fetch fellowships (for Admin/HOD) ──────────────────────────
const fetchFellowships = async () => {
  try {
    const res = await api.get('/fellowship/list');
    if (res.data.success) {
      fellowships.value = res.data.data;
      // Auto-select the first one if user is Admin/HOD and no selection yet
      if (isAdminOrHod.value && !selectedFellowshipId.value && fellowships.value.length > 0) {
        selectedFellowshipId.value = fellowships.value[0].id;
      }
    }
  } catch (error) {
    console.error('Failed to fetch fellowships', error);
  }
};

// ─── Fetch members ──────────────────────────────────────────────
const fetchMembers = async () => {
  // If Admin/HOD and no fellowship selected, don't fetch
  if (isAdminOrHod.value && !selectedFellowshipId.value) {
    loading.value = false;
    return;
  }

  let fellowshipId = selectedFellowshipId.value || authStore.fellowship?.id;
  if (!fellowshipId) {
    loading.value = false;
    return;
  }

  loading.value = true;
  try {
    const url = `/fellowship/members?fellowshipId=${fellowshipId}`;
    const response = await api.get(url);
    if (response.data.success) {
      members.value = response.data.data.map(m => ({ ...m, isPresent: false }));
      await fetchAttendance(fellowshipId);
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const fetchAttendance = async (fellowshipId) => {
  try {
    const url = `/attendance/current-session?fellowshipId=${fellowshipId}`;
    const res = await api.get(url);
    if (res.data.success) {
      const sessionMembers = res.data.data.members;
      sessionSubmitted.value = res.data.data.session.isSubmitted;
      members.value = members.value.map(m => {
        const found = sessionMembers.find(sm => sm.id === m.id);
        return { ...m, isPresent: found?.isPresent || false };
      });
    }
  } catch (error) {
    console.error('Failed to fetch attendance', error);
  }
};

// ─── Check-in ──────────────────────────────────────────────────
const checkIn = async (memberId) => {
  if (sessionSubmitted.value) {
    alert('⚠️ The current week has already been submitted. You cannot add more check‑ins.');
    return;
  }
  try {
    const fellowshipId = selectedFellowshipId.value || authStore.fellowship?.id;
    const res = await api.post('/attendance/mark', { memberId, checkInMethod: 'MANUAL' });
    if (res.data.success) {
      const member = members.value.find(m => m.id === memberId);
      if (member) member.isPresent = true;
      alert('✅ Check-in successful!');
    } else {
      alert('❌ Failed: ' + res.data.message);
    }
  } catch (error) {
    alert('Error checking in');
  }
};

// ─── QR code ──────────────────────────────────────────────────
const showQR = (memberId) => {
  const token = authStore.token;
  if (!token) {
    alert('You are not logged in. Please log in again.');
    return;
  }
  const baseUrl = api.defaults.baseURL.replace(/\/api$/, '');
  window.open(`${baseUrl}/api/qr/member/${memberId}?token=${token}`, '_blank');
};

// ─── Add Member ──────────────────────────────────────────────────
const addMember = async () => {
  addingMember.value = true;
  memberAddMessage.value = '';
  try {
    const fellowshipId = selectedFellowshipId.value || authStore.fellowship?.id;
    if (!fellowshipId) {
      throw new Error('No fellowship selected.');
    }
    const res = await api.post('/members', {
      ...newMember.value,
      fellowshipId,
    });
    if (res.data.success) {
      memberAddMessage.value = `✅ "${res.data.data.fullName}" added!`;
      memberAddClass.value = 'text-success';
      newMember.value = { fullName: '', phone: '', email: '', memberNumber: '' };
      await fetchMembers();
      setTimeout(() => {
        showAddMemberModal.value = false;
        memberAddMessage.value = '';
      }, 2000);
    } else {
      memberAddMessage.value = '❌ ' + res.data.message;
      memberAddClass.value = 'text-danger';
    }
  } catch (error) {
    memberAddMessage.value = '❌ Error: ' + (error.response?.data?.message || error.message);
    memberAddClass.value = 'text-danger';
  } finally {
    addingMember.value = false;
  }
};

// ─── Watch for fellowship change ──────────────────────────────
const onFellowshipChange = () => {
  if (selectedFellowshipId.value) {
    fetchMembers();
  }
};

onMounted(async () => {
  if (isAdminOrHod.value) {
    await fetchFellowships();
  } else {
    // For FL/Associate, just use their own fellowship
    selectedFellowshipId.value = authStore.fellowship?.id;
    await fetchMembers();
  }
});

// Watch selectedFellowshipId for changes (if Admin/HOD)
watch(selectedFellowshipId, (newVal) => {
  if (isAdminOrHod.value && newVal) {
    fetchMembers();
  }
});
</script>

<style scoped>
.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
.modal-content { background: white; padding: 24px; border-radius: 12px; max-width: 400px; width: 90%; max-height: 90vh; overflow-y: auto; }
button { min-height: 44px; touch-action: manipulation; }
</style>