<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h4>📊 Current Week Attendance</h4>
      <button class="btn btn-secondary btn-sm" @click="goBack">← Back</button>
    </div>

    <!-- Fellowship selector for Admin/HOD -->
    <div v-if="isAdminOrHod" class="mb-3">
      <label class="form-label">Select Fellowship</label>
      <select v-model="selectedFellowshipId" class="form-control" @change="onFellowshipChange">
        <option v-for="f in fellowships" :key="f.id" :value="f.id">{{ f.name }}</option>
      </select>
    </div>

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
import { ref, onMounted, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner.vue';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();
const loading = ref(true);
const session = ref(null);
const members = ref([]);
const submitting = ref(false);

// Fellowship selector (for Admin/HOD)
const fellowships = ref([]);
const selectedFellowshipId = ref(null);
const isAdminOrHod = computed(() => authStore.user?.role === 'ADMIN' || authStore.user?.role === 'HOD');

const goBack = () => {
  router.push('/dashboard');
};

// ─── Fetch fellowships (for Admin/HOD) ──────────────────────────
const fetchFellowships = async () => {
  try {
    const res = await api.get('/fellowship/list');
    if (res.data.success) {
      fellowships.value = res.data.data;
      if (isAdminOrHod.value && !selectedFellowshipId.value && fellowships.value.length > 0) {
        selectedFellowshipId.value = fellowships.value[0].id;
      }
    }
  } catch (error) {
    console.error('Failed to fetch fellowships', error);
  }
};

// ─── Fetch data ──────────────────────────────────────────────────
const fetchData = async () => {
  if (isAdminOrHod.value && !selectedFellowshipId.value) {
    loading.value = false;
    return;
  }

  let fellowshipId = selectedFellowshipId.value || authStore.fellowship?.id;
  if (!fellowshipId) {
    loading.value = false;
    return;
  }

  try {
    const url = `/attendance/current-session?fellowshipId=${fellowshipId}`;
    const res = await api.get(url);
    if (res.data.success) {
      session.value = res.data.data.session;
      members.value = res.data.data.members || [];
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

// ─── Submit Week (No Questions - Just Submit) ───────────────────
const submitWeek = async () => {
  if (submitting.value) return;
  submitting.value = true;

  try {
    let fellowshipId = selectedFellowshipId.value || authStore.fellowship?.id;
    if (!fellowshipId) {
      throw new Error('No fellowship selected.');
    }

    // Check if this is the last week of the month (week 4 or 5)
    const now = new Date();
    const currentWeek = session.value.weekNumber;
    const monthYear = now.toISOString().slice(0, 7);
    
    // Find the last week of the month
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const lastWeek = Math.ceil((lastDay.getDate() + (7 - new Date(now.getFullYear(), now.getMonth(), 1).getDay())) / 7);
    const isLastWeek = currentWeek >= Math.min(lastWeek, 5);

    // Submit the week
    const response = await api.post('/attendance/submit-week', { fellowshipId });
    
    if (response.data.success) {
      // If this is the last week, redirect to monthly report
      if (isLastWeek) {
        alert('✅ Week submitted! Please complete the monthly report.');
        router.push('/report');
      } else {
        alert('✅ Week submitted successfully!');
        await fetchData();
      }
    }
  } catch (error) {
    console.error('Error submitting week:', error);
    const errMsg = error.response?.data?.message || error.message;
    alert('❌ Error: ' + errMsg);
  } finally {
    submitting.value = false;
  }
};

// ─── Watch for fellowship change ──────────────────────────────
const onFellowshipChange = () => {
  if (selectedFellowshipId.value) {
    fetchData();
  }
};

onMounted(async () => {
  if (isAdminOrHod.value) {
    await fetchFellowships();
  } else {
    selectedFellowshipId.value = authStore.fellowship?.id;
    await fetchData();
  }
});

watch(selectedFellowshipId, (newVal) => {
  if (isAdminOrHod.value && newVal) {
    fetchData();
  }
});
</script>