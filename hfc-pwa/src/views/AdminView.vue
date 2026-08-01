<script setup>
import { ref, onMounted, computed } from 'vue';  // ← Added computed here
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner.vue';

const fellowships = ref([]);
const users = ref([]);
const fellowshipsList = ref([]);
const loadingFellowships = ref(false);

// ---- Fellowship ----
const fellowshipForm = ref({ name: '', location: '', leaderId: '', associateId: '' });
const fellowshipLoading = ref(false);
const fellowshipMessage = ref('');
const fellowshipMessageClass = ref('text-success');

// ---- Member ----
const memberForm = ref({ fullName: '', phone: '', email: '', fellowshipId: '', memberNumber: '' });
const memberLoading = ref(false);
const memberMessage = ref('');
const memberMessageClass = ref('text-success');

// ---- User ----
const userForm = ref({ churchId: '', fullName: '', email: '', password: '', role: '' });
const userLoading = ref(false);
const userMessage = ref('');
const userMessageClass = ref('text-success');

// ---- Edit Fellowship ----
const showEditFellowshipModal = ref(false);
const editFellowship = ref({ id: '', name: '', location: '', leaderId: '', associateId: '' });
const savingEditFellowship = ref(false);
const editFellowshipMessage = ref('');
const editFellowshipMessageClass = ref('text-success');

// ---- Batch QR ----
const batchFellowshipId = ref('');
const batchLoading = ref(false);
const batchMessage = ref('');
const batchMessageClass = ref('text-success');

// ---- Members Modal ----
const showMembersModal = ref(false);
const selectedFellowshipForMembers = ref(null);
const fellowshipMembersList = ref([]);
const loadingMembers = ref(false);

// ─── Fetch fellowships (for dropdown) ──────────────────────────
const fetchFellowships = async () => {
  try {
    const res = await api.get('/fellowship/list');
    if (res.data.success) fellowships.value = res.data.data;
  } catch (error) {
    console.error('Failed to load fellowships', error);
  }
};

// ─── Fetch users (FL/ASSOCIATE) ────────────────────────────────
const fetchUsers = async () => {
  try {
    const res = await api.get('/admin/users');
    if (res.data.success) users.value = res.data.data;
  } catch (error) {
    console.error('Failed to load users', error);
  }
};

// ─── Fetch fellowship list for management ──────────────────────
const fetchFellowshipsList = async () => {
  loadingFellowships.value = true;
  try {
    const res = await api.get('/admin/fellowships');
    if (res.data.success) fellowshipsList.value = res.data.data;
  } catch (error) {
    console.error('Failed to fetch fellowships list', error);
  } finally {
    loadingFellowships.value = false;
  }
};

// ─── Open Members Modal ─────────────────────────────────────────
const openMembersModal = async (fellowship) => {
  selectedFellowshipForMembers.value = fellowship;
  loadingMembers.value = true;
  showMembersModal.value = true;
  try {
    const res = await api.get('/admin/members');
    if (res.data.success) {
      fellowshipMembersList.value = res.data.data.filter(
        m => m.fellowshipId === fellowship.id
      );
    }
  } catch (error) {
    console.error('Failed to fetch members:', error);
    fellowshipMembersList.value = [];
  } finally {
    loadingMembers.value = false;
  }
};

const closeMembersModal = () => {
  showMembersModal.value = false;
  selectedFellowshipForMembers.value = null;
  fellowshipMembersList.value = [];
};

// ─── Create Fellowship ──────────────────────────────────────────
const createFellowship = async () => {
  fellowshipLoading.value = true;
  fellowshipMessage.value = '';
  try {
    const res = await api.post('/admin/fellowship', fellowshipForm.value);
    if (res.data.success) {
      fellowshipMessage.value = `✅ Fellowship "${res.data.data.name}" created!`;
      fellowshipMessageClass.value = 'text-success';
      fellowshipForm.value = { name: '', location: '', leaderId: '', associateId: '' };
      await fetchFellowships();
      await fetchFellowshipsList();
    } else {
      fellowshipMessage.value = '❌ ' + res.data.message;
      fellowshipMessageClass.value = 'text-danger';
    }
  } catch (error) {
    fellowshipMessage.value = '❌ Error: ' + (error.response?.data?.message || error.message);
    fellowshipMessageClass.value = 'text-danger';
  } finally {
    fellowshipLoading.value = false;
  }
};

// ─── Create Member ──────────────────────────────────────────────
const createMember = async () => {
  memberLoading.value = true;
  memberMessage.value = '';
  try {
    const res = await api.post('/members', memberForm.value);
    if (res.data.success) {
      memberMessage.value = `✅ Member "${res.data.data.fullName}" added!`;
      memberMessageClass.value = 'text-success';
      memberForm.value = { fullName: '', phone: '', email: '', fellowshipId: '', memberNumber: '' };
    } else {
      memberMessage.value = '❌ ' + res.data.message;
      memberMessageClass.value = 'text-danger';
    }
  } catch (error) {
    memberMessage.value = '❌ Error: ' + (error.response?.data?.message || error.message);
    memberMessageClass.value = 'text-danger';
  } finally {
    memberLoading.value = false;
  }
};

// ─── Create System User ─────────────────────────────────────────
const createUser = async () => {
  userLoading.value = true;
  userMessage.value = '';
  try {
    const res = await api.post('/admin/user', userForm.value);
    if (res.data.success) {
      userMessage.value = `✅ User "${res.data.data.churchId}" created with role ${res.data.data.role}`;
      userMessageClass.value = 'text-success';
      userForm.value = { churchId: '', fullName: '', email: '', password: '', role: '' };
      await fetchUsers();
    } else {
      userMessage.value = '❌ ' + res.data.message;
      userMessageClass.value = 'text-danger';
    }
  } catch (error) {
    userMessage.value = '❌ Error: ' + (error.response?.data?.message || error.message);
    userMessageClass.value = 'text-danger';
  } finally {
    userLoading.value = false;
  }
};

const exporting = ref(false);
const exportMessage = ref('');
const exportMessageClass = ref('text-success');

const exportAllData = async () => {
  exporting.value = true;
  exportMessage.value = '';
  try {
    const response = await api.get('/admin/export/all', {
      responseType: 'blob',
    });
    const blob = new Blob([response.data], { type: 'application/zip' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'fountain_hfc_export.zip';
    link.click();
    URL.revokeObjectURL(link.href);
    exportMessage.value = '✅ Export downloaded successfully!';
    exportMessageClass.value = 'text-success';
  } catch (error) {
    const msg = error.response?.data?.message || error.message || 'Export failed.';
    exportMessage.value = '❌ ' + msg;
    exportMessageClass.value = 'text-danger';
  } finally {
    exporting.value = false;
  }
};

// ─── Edit Fellowship ────────────────────────────────────────────
const openEditFellowship = (fellowship) => {
  editFellowship.value = {
    id: fellowship.id,
    name: fellowship.name,
    location: fellowship.location,
    leaderId: fellowship.leaderId || '',
    associateId: fellowship.associateId || '',
  };
  showEditFellowshipModal.value = true;
  editFellowshipMessage.value = '';
};

const closeEditFellowship = () => {
  showEditFellowshipModal.value = false;
  editFellowship.value = { id: '', name: '', location: '', leaderId: '', associateId: '' };
  savingEditFellowship.value = false;
};

const saveEditFellowship = async () => {
  savingEditFellowship.value = true;
  editFellowshipMessage.value = '';
  try {
    const res = await api.put(`/admin/fellowship/${editFellowship.value.id}`, editFellowship.value);
    if (res.data.success) {
      editFellowshipMessage.value = '✅ Fellowship updated!';
      editFellowshipMessageClass.value = 'text-success';
      await fetchFellowshipsList();
      setTimeout(() => closeEditFellowship(), 1500);
    } else {
      editFellowshipMessage.value = '❌ ' + res.data.message;
      editFellowshipMessageClass.value = 'text-danger';
    }
  } catch (error) {
    editFellowshipMessage.value = '❌ Error: ' + (error.response?.data?.message || error.message);
    editFellowshipMessageClass.value = 'text-danger';
  } finally {
    savingEditFellowship.value = false;
  }
};

// ─── Delete Fellowship ──────────────────────────────────────────
const deleteFellowship = async (id) => {
  if (!confirm('Delete this fellowship? All members must be removed first.')) return;
  try {
    const res = await api.delete(`/admin/fellowship/${id}`);
    if (res.data.success) {
      alert('✅ Fellowship deleted!');
      await fetchFellowshipsList();
    } else {
      alert('❌ ' + res.data.message);
    }
  } catch (error) {
    alert('❌ Error: ' + (error.response?.data?.message || error.message));
  }
};

// ─── Download Batch QR ──────────────────────────────────────────
const downloadBatchQR = async () => {
  batchLoading.value = true;
  batchMessage.value = '';
  try {
    const params = new URLSearchParams();
    if (batchFellowshipId.value) params.append('fellowshipId', batchFellowshipId.value);
    const url = `/admin/qr/batch?${params.toString()}`;

    const response = await api.get(url, {
      responseType: 'blob',
    });

    const blob = new Blob([response.data], { type: 'application/zip' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'member_qr_codes.zip';
    link.click();
    URL.revokeObjectURL(link.href);

    batchMessage.value = '✅ QR codes downloaded successfully!';
    batchMessageClass.value = 'text-success';
  } catch (error) {
    console.error('Batch QR error:', error);
    const msg = error.response?.data?.message || error.message || 'Failed to download.';
    batchMessage.value = '❌ ' + msg;
    batchMessageClass.value = 'text-danger';
  } finally {
    batchLoading.value = false;
  }
};

onMounted(() => {
  fetchFellowships();
  fetchUsers();
  fetchFellowshipsList();
});
</script>

<style scoped>
.member-count-link {
  cursor: pointer;
  color: #0d6efd;
  text-decoration: underline;
  font-weight: bold;
}
.member-count-link:hover {
  color: #0a58ca;
}
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
  max-width: 700px;
  width: 95%;
  max-height: 90vh;
  overflow-y: auto;
}
button {
  min-height: 44px;
  touch-action: manipulation;
}
</style>