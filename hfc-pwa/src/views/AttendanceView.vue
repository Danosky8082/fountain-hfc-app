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
          <!-- FIX: Format the date here -->
          <h5>Week {{ session.weekNumber }} – {{ formatDate(session.meetingDate) }}</h5>
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

// ─── Date Formatting Function ──────────────────────────────────
const formatDate = (dateString) => {
  if (!dateString) return '—';
  try {
    const date = new Date(dateString);
    // Format as "Aug 2, 2026"
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
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

// ─── Submit Week ──────────────────────────────────────────────────
const submitWeek = async () => {
  if (submitting.value) return;
  submitting.value = true;

  try {
    let fellowshipId = selectedFellowshipId.value || authStore.fellowship?.id;
    if (!fellowshipId) {
      throw new Error('No fellowship selected.');
    }

    const response = await api.post('/attendance/submit-week', { fellowshipId });
    
    if (response.data.success) {
      const { isLastWeek, monthYear } = response.data.data;
      
      // Show success message
      alert('✅ Week submitted successfully!');
      
      // Refresh the attendance view
      await fetchData();
      
      // If this is the last week, redirect to monthly report
      if (isLastWeek) {
        const confirmRedirect = confirm(
          '🎉 This is the last week of the month!\n\n' +
          'Would you like to complete the monthly report now?\n' +
          '(This includes pastoral questions and finalizes the month)'
        );
        if (confirmRedirect) {
          router.push('/report');
        }
      }
    }
  } catch (error) {
    console.error('Error submitting week:', error);
    
    // Check if it's a missing weeks error
    if (error.response?.data?.missingWeeks) {
      const missingWeeks = error.response.data.missingWeeks.join(', ');
      const confirmForce = confirm(
        `⚠️ You are missing submissions for Week(s) ${missingWeeks}.\n\n` +
        `Do you want to continue submitting Week ${session.value.weekNumber}?\n` +
        `Missing weeks will be marked with zero attendance.`
      );
      
      if (confirmForce) {
        try {
          const forceResponse = await api.post('/attendance/submit-week', { 
            fellowshipId, 
            force: true 
          });
          if (forceResponse.data.success) {
            alert('✅ Week submitted with force! Missing weeks marked as zero.');
            await fetchData();
          }
        } catch (forceError) {
          alert('❌ Error: ' + (forceError.response?.data?.message || forceError.message));
        }
      }
    } else {
      const errMsg = error.response?.data?.message || error.message;
      alert('❌ Error: ' + errMsg);
    }
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