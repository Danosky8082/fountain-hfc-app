<template>
  <div class="container mt-4">
    <h4>⚙️ Admin Dashboard</h4>
    <p class="text-muted">Manage fellowships, members, and system users.</p>

    <!-- === Create Fellowship === -->
    <div class="card mb-4">
      <div class="card-header bg-primary text-white">Create Fellowship</div>
      <div class="card-body">
        <form @submit.prevent="createFellowship">
          <div class="row">
            <div class="col-md-4 mb-2">
              <label class="form-label">Fellowship Name</label>
              <input v-model="fellowshipForm.name" type="text" class="form-control" required />
            </div>
            <div class="col-md-4 mb-2">
              <label class="form-label">Location</label>
              <input v-model="fellowshipForm.location" type="text" class="form-control" required />
            </div>
            <div class="col-md-4 mb-2">
              <label class="form-label">Leader</label>
              <select v-model="fellowshipForm.leaderId" class="form-control">
                <option value="">Select Leader</option>
                <option v-for="u in users" :key="u.id" :value="u.id">
                  {{ u.fullName }} ({{ u.churchId }})
                </option>
              </select>
            </div>
            <div class="col-md-4 mb-2">
              <label class="form-label">Associate Leader</label>
              <select v-model="fellowshipForm.associateId" class="form-control">
                <option value="">Select Associate</option>
                <option v-for="u in users" :key="u.id" :value="u.id">
                  {{ u.fullName }} ({{ u.churchId }})
                </option>
              </select>
            </div>
            <div class="col-md-4 mb-2 d-flex align-items-end">
              <button type="submit" class="btn btn-success w-100" :disabled="fellowshipLoading">
                <span v-if="fellowshipLoading" class="spinner-border spinner-border-sm me-2"></span>
                Create Fellowship
              </button>
            </div>
          </div>
        </form>
        <div v-if="fellowshipMessage" class="mt-2" :class="fellowshipMessageClass">{{ fellowshipMessage }}</div>
      </div>
    </div>

    <!-- === Fellowship List (Manage) === -->
    <div class="card mb-4">
      <div class="card-header bg-info text-white">Manage Fellowships</div>
      <div class="card-body">
        <div v-if="loadingFellowships" class="text-center"><LoadingSpinner /></div>
        <div v-else-if="fellowshipsList.length === 0" class="alert alert-info">No fellowships created yet.</div>
        <div v-else>
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Leader</th>
                <th>Members</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="f in fellowshipsList" :key="f.id">
                <td>{{ f.name }}</td>
                <td>{{ f.location }}</td>
                <td>{{ f.leader?.fullName || '—' }}</td>
                <td>{{ f._count.members }}</td>
                <td>
                  <button class="btn btn-sm btn-warning me-1" @click="openEditFellowship(f)">✏️</button>
                  <button
                    class="btn btn-sm btn-danger"
                    @click="deleteFellowship(f.id)"
                    :disabled="f._count.members > 0"
                    :title="f._count.members > 0 ? 'Cannot delete: has members' : 'Delete fellowship'"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- === Add Member === -->
    <div class="card mb-4">
      <div class="card-header bg-success text-white">Add Member</div>
      <div class="card-body">
        <form @submit.prevent="createMember">
          <div class="row">
            <div class="col-md-3 mb-2">
              <label class="form-label">Full Name *</label>
              <input v-model="memberForm.fullName" type="text" class="form-control" required />
            </div>
            <div class="col-md-2 mb-2">
              <label class="form-label">Phone</label>
              <input v-model="memberForm.phone" type="text" class="form-control" />
            </div>
            <div class="col-md-2 mb-2">
              <label class="form-label">Email</label>
              <input v-model="memberForm.email" type="email" class="form-control" />
            </div>
            <div class="col-md-2 mb-2">
              <label class="form-label">Fellowship *</label>
              <select v-model="memberForm.fellowshipId" class="form-control" required>
                <option value="" disabled>Select Fellowship</option>
                <option v-for="f in fellowships" :key="f.id" :value="f.id">{{ f.name }}</option>
              </select>
            </div>
            <div class="col-md-2 mb-2">
              <label class="form-label">Member Number (optional)</label>
              <input v-model="memberForm.memberNumber" type="text" class="form-control" placeholder="e.g., M001" />
            </div>
            <div class="col-md-12 mb-2">
              <button type="submit" class="btn btn-primary" :disabled="memberLoading">
                <span v-if="memberLoading" class="spinner-border spinner-border-sm me-2"></span>
                Add Member
              </button>
            </div>
          </div>
        </form>
        <div v-if="memberMessage" class="mt-2" :class="memberMessageClass">{{ memberMessage }}</div>
      </div>
    </div>

    <!-- === Create System User === -->
    <div class="card mb-4">
      <div class="card-header bg-warning text-dark">Create System User</div>
      <div class="card-body">
        <form @submit.prevent="createUser">
          <div class="row">
            <div class="col-md-2 mb-2">
              <label class="form-label">Church ID</label>
              <input v-model="userForm.churchId" type="text" class="form-control" required />
            </div>
            <div class="col-md-3 mb-2">
              <label class="form-label">Full Name</label>
              <input v-model="userForm.fullName" type="text" class="form-control" required />
            </div>
            <div class="col-md-2 mb-2">
              <label class="form-label">Email</label>
              <input v-model="userForm.email" type="email" class="form-control" required />
            </div>
            <div class="col-md-2 mb-2">
              <label class="form-label">Password</label>
              <input v-model="userForm.password" type="password" class="form-control" required />
            </div>
            <div class="col-md-3 mb-2">
              <label class="form-label">Role</label>
              <select v-model="userForm.role" class="form-control" required>
                <option value="">Select Role</option>
                <option value="FL">Fellowship Leader</option>
                <option value="ASSOCIATE">Associate FL</option>
                <option value="HOD">Head of Department</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
            <div class="col-12 mb-2">
              <button type="submit" class="btn btn-warning" :disabled="userLoading">
                <span v-if="userLoading" class="spinner-border spinner-border-sm me-2"></span>
                Create User
              </button>
            </div>
          </div>
        </form>
        <div v-if="userMessage" class="mt-2" :class="userMessageClass">{{ userMessage }}</div>
      </div>
    </div>

    <!-- === Edit Fellowship Modal === -->
    <div v-if="showEditFellowshipModal" class="modal-overlay" @click.self="closeEditFellowship">
      <div class="modal-content">
        <h5>Edit Fellowship</h5>
        <form @submit.prevent="saveEditFellowship">
          <div class="mb-2">
            <label class="form-label">Name</label>
            <input v-model="editFellowship.name" type="text" class="form-control" required />
          </div>
          <div class="mb-2">
            <label class="form-label">Location</label>
            <input v-model="editFellowship.location" type="text" class="form-control" required />
          </div>
          <div class="mb-2">
            <label class="form-label">Leader</label>
            <select v-model="editFellowship.leaderId" class="form-control">
              <option value="">Select Leader</option>
              <option v-for="u in users" :key="u.id" :value="u.id">{{ u.fullName }}</option>
            </select>
          </div>
          <div class="mb-2">
            <label class="form-label">Associate</label>
            <select v-model="editFellowship.associateId" class="form-control">
              <option value="">Select Associate</option>
              <option v-for="u in users" :key="u.id" :value="u.id">{{ u.fullName }}</option>
            </select>
          </div>
          <div class="d-flex gap-2">
            <button type="submit" class="btn btn-success" :disabled="savingEditFellowship">
              <span v-if="savingEditFellowship" class="spinner-border spinner-border-sm me-2"></span>
              Save
            </button>
            <button type="button" class="btn btn-secondary" @click="closeEditFellowship">Cancel</button>
          </div>
        </form>
        <div v-if="editFellowshipMessage" class="mt-2" :class="editFellowshipMessageClass">{{ editFellowshipMessage }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
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
      await fetchFellowshipsList(); // refresh management list
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

onMounted(() => {
  fetchFellowships();
  fetchUsers();
  fetchFellowshipsList();
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
button {
  min-height: 44px;
  touch-action: manipulation;
}
</style>