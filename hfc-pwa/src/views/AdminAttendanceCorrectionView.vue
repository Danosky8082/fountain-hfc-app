<template>
  <div class="container mt-4">
    <h4>📝 Correct Past Attendance (Admin/HOD only)</h4>
    <p class="text-muted">Add or update attendance for any member in a past week.</p>

    <form @submit.prevent="fetchMembers">
      <div class="row mb-3">
        <div class="col-md-4">
          <label class="form-label">Fellowship</label>
          <select v-model="selectedFellowshipId" class="form-control" required>
            <option value="">Select Fellowship</option>
            <option v-for="f in fellowships" :key="f.id" :value="f.id">{{ f.name }}</option>
          </select>
        </div>
        <div class="col-md-3">
          <label class="form-label">Month/Year</label>
          <input type="month" v-model="monthYear" class="form-control" required />
        </div>
        <div class="col-md-2">
          <label class="form-label">Week</label>
          <select v-model="weekNumber" class="form-control" required>
            <option v-for="i in 5" :key="i" :value="i">Week {{ i }}</option>
          </select>
        </div>
        <div class="col-md-3 d-flex align-items-end">
          <button type="submit" class="btn btn-primary w-100" :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
            Load Members
          </button>
        </div>
      </div>
    </form>

    <div v-if="members.length > 0" class="mt-3">
      <table class="table table-bordered">
        <thead>
          <tr><th>Name</th><th>Present</th><th>Method</th><th>Action</th></tr>
        </thead>
        <tbody>
          <tr v-for="m in members" :key="m.id">
            <td>{{ m.fullName }}</td>
            <td>
              <input type="checkbox" v-model="m.isPresent" @change="onChange(m)" />
            </td>
            <td>
              <select v-model="m.checkInMethod" class="form-control form-control-sm">
                <option value="MANUAL">Manual</option>
                <option value="QR_SCAN">QR Scan</option>
                <option value="VIRTUAL">Virtual</option>
                <option value="PIN_CHECKIN">PIN</option>
              </select>
            </td>
            <td>
              <button class="btn btn-sm btn-success" @click="saveCorrection(m)" :disabled="saving[m.id]">
                <span v-if="saving[m.id]" class="spinner-border spinner-border-sm me-1"></span>
                Save
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../services/api';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
const fellowships = ref([]);
const selectedFellowshipId = ref('');
const monthYear = ref(new Date().toISOString().slice(0, 7));
const weekNumber = ref(1);
const members = ref([]);
const loading = ref(false);
const saving = ref({});

const fetchFellowships = async () => {
  try {
    const res = await api.get('/fellowship/list');
    if (res.data.success) fellowships.value = res.data.data;
  } catch (e) { console.error(e); }
};

const fetchMembers = async () => {
  if (!selectedFellowshipId.value) return;
  loading.value = true;
  try {
    // Get all members of this fellowship
    const res = await api.get(`/admin/fellowship/${selectedFellowshipId.value}/members`); // You may need to create this endpoint
    // Alternative: use existing /admin/members then filter
    const allRes = await api.get('/admin/members');
    const filtered = allRes.data.data.filter(m => m.fellowshipId === selectedFellowshipId.value);
    members.value = filtered.map(m => ({
      ...m,
      isPresent: false,
      checkInMethod: 'MANUAL',
    }));
    // Then we need to check if there is an existing session to know who is already present.
    // We could also have a dedicated endpoint that returns the session records.
    // For simplicity, we'll let the user check/uncheck as needed.
  } catch (e) { console.error(e); } finally { loading.value = false; }
};

const onChange = (member) => {
  // Optionally auto‑save or just track state
};

const saveCorrection = async (member) => {
  saving.value[member.id] = true;
  try {
    const payload = {
      fellowshipId: selectedFellowshipId.value,
      weekNumber: weekNumber.value,
      monthYear: monthYear.value,
      memberId: member.id,
      checkInMethod: member.checkInMethod,
    };
    await api.post('/admin/attendance/correct', payload);
    alert(`✅ ${member.fullName} updated.`);
  } catch (e) {
    alert('❌ Error: ' + (e.response?.data?.message || e.message));
  } finally {
    saving.value[member.id] = false;
  }
};

onMounted(fetchFellowships);
</script>