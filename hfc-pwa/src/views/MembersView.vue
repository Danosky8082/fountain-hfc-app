<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h4>👥 All Members (Register)</h4>
      <button class="btn btn-primary" @click="goToAdmin">➕ Add Member</button>
    </div>
    <p class="text-muted">Full list of members across all fellowships.</p>

    <div class="mb-3">
      <input v-model="search" type="text" class="form-control" placeholder="Search by name, phone, email, or fellowship..." />
    </div>

    <div v-if="loading || !authStore.token" class="text-center"><LoadingSpinner /></div>
    <div v-else-if="members.length === 0" class="alert alert-info">No members found.</div>
    <div v-else>
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Fellowship</th>
            <th>QR Code</th>
            <th>Actions</th>
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
            <td>
              <button class="btn btn-sm btn-warning me-1" @click="openEditModal(member)">✏️</button>
              <button class="btn btn-sm btn-danger" @click="confirmDelete(member.id)">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Edit Modal -->
    <div v-if="showEditModal" class="modal-overlay" @click.self="closeEditModal">
      <div class="modal-content">
        <h5>Edit Member</h5>
        <form @submit.prevent="saveEdit">
          <div class="mb-2">
            <label class="form-label">Full Name *</label>
            <input v-model="editForm.fullName" type="text" class="form-control" required />
          </div>
          <div class="mb-2">
            <label class="form-label">Phone</label>
            <input v-model="editForm.phone" type="text" class="form-control" />
          </div>
          <div class="mb-2">
            <label class="form-label">Email</label>
            <input v-model="editForm.email" type="email" class="form-control" />
          </div>
          <div class="mb-2">
            <label class="form-label">Member Number (optional)</label>
            <input v-model="editForm.memberNumber" type="text" class="form-control" />
          </div>
          <div class="mb-2">
            <label class="form-label">Fellowship *</label>
            <select v-model="editForm.fellowshipId" class="form-control" required>
              <option v-for="f in fellowships" :key="f.id" :value="f.id">{{ f.name }}</option>
            </select>
          </div>
          <div class="d-flex gap-2">
            <button type="submit" class="btn btn-success" :disabled="savingEdit">
              <span v-if="savingEdit" class="spinner-border spinner-border-sm me-2"></span>
              Save
            </button>
            <button type="button" class="btn btn-secondary" @click="closeEditModal">Cancel</button>
          </div>
        </form>
        <div v-if="editMessage" class="mt-2" :class="editMessageClass">{{ editMessage }}</div>
      </div>
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
const fellowships = ref([]);

// Edit modal state
const showEditModal = ref(false);
const editForm = ref({ id: '', fullName: '', phone: '', email: '', memberNumber: '', fellowshipId: '' });
const savingEdit = ref(false);
const editMessage = ref('');
const editMessageClass = ref('text-success');

const filteredMembers = computed(() => {
  if (!search.value) return members.value;
  const s = search.value.toLowerCase();
  return members.value.filter(m =>
    m.fullName.toLowerCase().includes(s) ||
    (m.phone && m.phone.includes(s)) ||
    (m.email && m.email.toLowerCase().includes(s)) ||
    (m.fellowship?.name && m.fellowship.name.toLowerCase().includes(s))
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

const fetchFellowships = async () => {
  try {
    const res = await api.get('/fellowship/list');
    if (res.data.success) fellowships.value = res.data.data;
  } catch (e) {
    console.error('Failed to fetch fellowships', e);
  }
};

const showQR = (memberId) => {
  const token = authStore.token;
  if (!token) { alert('Please log in.'); return; }
  const baseUrl = api.defaults.baseURL.replace(/\/api$/, '');
  window.open(`${baseUrl}/api/qr/member/${memberId}?token=${token}`, '_blank');
};

const goToAdmin = () => router.push('/admin');

// ─── Edit ──────────────────────────────────────────────────────
const openEditModal = (member) => {
  editForm.value = {
    id: member.id,
    fullName: member.fullName,
    phone: member.phone || '',
    email: member.email || '',
    memberNumber: member.memberNumber || '',
    fellowshipId: member.fellowshipId,
  };
  showEditModal.value = true;
  editMessage.value = '';
};

const closeEditModal = () => {
  showEditModal.value = false;
  editForm.value = { id: '', fullName: '', phone: '', email: '', memberNumber: '', fellowshipId: '' };
  savingEdit.value = false;
  editMessage.value = '';
};

const saveEdit = async () => {
  savingEdit.value = true;
  editMessage.value = '';
  try {
    const res = await api.put(`/admin/member/${editForm.value.id}`, editForm.value);
    if (res.data.success) {
      editMessage.value = '✅ Member updated successfully!';
      editMessageClass.value = 'text-success';
      await fetchMembers();
      setTimeout(() => closeEditModal(), 1500);
    } else {
      editMessage.value = '❌ ' + res.data.message;
      editMessageClass.value = 'text-danger';
    }
  } catch (error) {
    editMessage.value = '❌ Error: ' + (error.response?.data?.message || error.message);
    editMessageClass.value = 'text-danger';
  } finally {
    savingEdit.value = false;
  }
};

// ─── Delete ────────────────────────────────────────────────────
const confirmDelete = (memberId) => {
  if (!confirm('Are you sure you want to delete this member? This action cannot be undone.')) return;
  deleteMember(memberId);
};

const deleteMember = async (memberId) => {
  try {
    const res = await api.delete(`/admin/member/${memberId}`);
    if (res.data.success) {
      alert('✅ Member deleted successfully!');
      await fetchMembers();
    } else {
      alert('❌ ' + res.data.message);
    }
  } catch (error) {
    alert('❌ Error: ' + (error.response?.data?.message || error.message));
  }
};

watchEffect(() => {
  if (authStore.token) {
    fetchMembers();
    fetchFellowships();
  }
});

onMounted(async () => {
  await authStore.restoreSession();
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-content {
  background: white;
  padding: 24px;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}
button { min-height: 44px; touch-action: manipulation; }
</style>