<template>
  <div class="container mt-4">
    <h4>⚙️ Admin Dashboard</h4>
    <p class="text-muted">Create new fellowships and members.</p>

    <!-- === Create Fellowship Form === -->
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

    <!-- === Create Member Form === -->
    <div class="card">
      <div class="card-header bg-success text-white">Add Member</div>
      <div class="card-body">
        <form @submit.prevent="createMember">
          <div class="row">
            <div class="col-md-3 mb-2">
              <label class="form-label">Full Name</label>
              <input v-model="memberForm.fullName" type="text" class="form-control" required />
            </div>
            <div class="col-md-2 mb-2">
              <label class="form-label">Phone</label>
              <input v-model="memberForm.phone" type="text" class="form-control" />
            </div>
            <div class="col-md-3 mb-2">
              <label class="form-label">Email</label>
              <input v-model="memberForm.email" type="email" class="form-control" />
            </div>
            <div class="col-md-2 mb-2">
              <label class="form-label">Fellowship</label>
              <select v-model="memberForm.fellowshipId" class="form-control" required>
                <option value="" disabled>Select Fellowship</option>
                <option v-for="f in fellowships" :key="f.id" :value="f.id">{{ f.name }}</option>
              </select>
            </div>
            <div class="col-md-2 mb-2 d-flex align-items-end">
              <button type="submit" class="btn btn-primary w-100" :disabled="memberLoading">
                <span v-if="memberLoading" class="spinner-border spinner-border-sm me-2"></span>
                Add Member
              </button>
            </div>
          </div>
        </form>
        <div v-if="memberMessage" class="mt-2" :class="memberMessageClass">{{ memberMessage }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../services/api';

const fellowships = ref([]);

// Fellowship form
const fellowshipForm = ref({ name: '', location: '' });
const fellowshipLoading = ref(false);
const fellowshipMessage = ref('');
const fellowshipMessageClass = ref('text-success');

// Member form
const memberForm = ref({ fullName: '', phone: '', email: '', fellowshipId: '' });
const memberLoading = ref(false);
const memberMessage = ref('');
const memberMessageClass = ref('text-success');

// Fetch all fellowships for dropdown
const fetchFellowships = async () => {
  try {
    const res = await api.get('/fellowship/list'); // we need to add this endpoint
    if (res.data.success) fellowships.value = res.data.data;
  } catch (error) {
    console.error('Failed to load fellowships', error);
  }
};

// Create fellowship
const createFellowship = async () => {
  fellowshipLoading.value = true;
  fellowshipMessage.value = '';
  try {
    const res = await api.post('/admin/fellowship', fellowshipForm.value);
    if (res.data.success) {
      fellowshipMessage.value = `✅ Fellowship "${res.data.data.name}" created!`;
      fellowshipMessageClass.value = 'text-success';
      fellowshipForm.value = { name: '', location: '' };
      await fetchFellowships(); // refresh dropdown
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

// Create member
const createMember = async () => {
  memberLoading.value = true;
  memberMessage.value = '';
  try {
    const res = await api.post('/admin/member', memberForm.value);
    if (res.data.success) {
      memberMessage.value = `✅ Member "${res.data.data.fullName}" added!`;
      memberMessageClass.value = 'text-success';
      memberForm.value = { fullName: '', phone: '', email: '', fellowshipId: '' };
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

onMounted(() => {
  fetchFellowships();
});
</script>