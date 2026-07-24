<template>
  <div class="container mt-4">
    <h4>📊 Current Week Attendance</h4>

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
            @click="openReportModal"
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

    <!-- Report Questions Modal -->
    <div v-if="showReportModal" class="modal-overlay" @click.self="showReportModal = false">
      <div class="modal-content">
        <h5>📋 Monthly Report Questions</h5>
        <p class="text-muted">Please answer these questions before submitting.</p>

        <div class="mb-2">
          <label class="form-label">I PRAYED FOR EVERY MEMBER... AT LEAST ONCE A WEEK?</label>
          <div class="d-flex gap-3">
            <label><input type="radio" v-model="reportQuestions.prayerFlag" :value="true" /> YES</label>
            <label><input type="radio" v-model="reportQuestions.prayerFlag" :value="false" /> NO</label>
          </div>
        </div>

        <div class="mb-2">
          <label class="form-label">HOW MANY FIRST TIMER OR NEW CONVERTS JOINED THIS MONTH?</label>
          <input v-model.number="reportQuestions.firstTimers" type="number" class="form-control" min="0" />
        </div>

        <div class="mb-2">
          <label class="form-label">GENERALLY, HOW MANY NEW MEMBERS JOINED THIS MONTH?</label>
          <input v-model.number="reportQuestions.newMembers" type="number" class="form-control" min="0" />
        </div>

        <div class="mb-2">
          <label class="form-label">HOW MANY MEMBERS DID YOU FOLLOW UP THIS MONTH?</label>
          <input v-model.number="reportQuestions.followUps" type="number" class="form-control" min="0" />
        </div>

        <div class="mb-2">
          <label class="form-label">ANY ISSUES FOR ESCALATION?</label>
          <textarea v-model="reportQuestions.escalations" class="form-control" rows="2"></textarea>
        </div>

        <div class="mb-2">
          <label class="form-label">COMMENTS / FEEDBACK / QUESTIONS</label>
          <textarea v-model="reportQuestions.comments" class="form-control" rows="2"></textarea>
        </div>

        <div class="d-flex gap-2">
          <button class="btn btn-success" @click="submitWeekWithReport" :disabled="submitting">
            <span v-if="submitting" class="spinner-border spinner-border-sm me-2"></span>
            Submit Week & Report
          </button>
          <button class="btn btn-secondary" @click="showReportModal = false">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner.vue';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
const loading = ref(true);
const session = ref(null);
const members = ref([]);
const submitting = ref(false);
const showReportModal = ref(false);

// Fellowship selector (for Admin/HOD)
const fellowships = ref([]);
const selectedFellowshipId = ref(null);
const isAdminOrHod = computed(() => authStore.user?.role === 'ADMIN' || authStore.user?.role === 'HOD');

const reportQuestions = ref({
  prayerFlag: false,
  firstTimers: 0,
  newMembers: 0,
  followUps: 0,
  escalations: '',
  comments: '',
});

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

// ─── Open modal ──────────────────────────────────────────────────
const openReportModal = () => {
  if (submitting.value) return;
  reportQuestions.value = {
    prayerFlag: false,
    firstTimers: 0,
    newMembers: 0,
    followUps: 0,
    escalations: '',
    comments: '',
  };
  showReportModal.value = true;
};

// ─── Submit week with report ────────────────────────────────────
const submitWeekWithReport = async () => {
  submitting.value = true;
  try {
    let fellowshipId = selectedFellowshipId.value || authStore.fellowship?.id;
    if (!fellowshipId) {
      throw new Error('No fellowship selected.');
    }

    let weekRes;
    try {
      weekRes = await api.post('/attendance/submit-week', { fellowshipId });
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.missingWeeks && error.response.data.canForce) {
        weekRes = error.response.data;
      } else {
        throw error;
      }
    }

    if (weekRes.missingWeeks && weekRes.canForce) {
      const weekList = weekRes.missingWeeks.join(', ');
      const userConfirmed = confirm(
        `⚠️ You are missing submissions for Week(s) ${weekList}.\n\n` +
        `Do you want to continue submitting Week ${session.value.weekNumber}?\n` +
        `Missing weeks will be marked with zero attendance.`
      );
      if (userConfirmed) {
        const forceRes = await api.post('/attendance/submit-week', { force: true, fellowshipId });
        if (forceRes.data.success) {
          weekRes = forceRes.data;
        } else {
          alert('❌ ' + forceRes.data.message);
          submitting.value = false;
          return;
        }
      } else {
        submitting.value = false;
        return;
      }
    }

    if (!weekRes.success) {
      alert('❌ ' + weekRes.message);
      submitting.value = false;
      return;
    }

    // Save report questions
    const reportRes = await api.get('/reports/current');
    if (reportRes.data.success) {
      const reportId = reportRes.data.data.id;
      await api.put(`/reports/${reportId}`, {
        prayerFlag: reportQuestions.value.prayerFlag,
        firstTimers: reportQuestions.value.firstTimers,
        newMembers: reportQuestions.value.newMembers,
        followUps: reportQuestions.value.followUps,
        escalations: reportQuestions.value.escalations,
        comments: reportQuestions.value.comments,
        action: 'SAVE',
      });
    }

    alert('✅ Week submitted with report data!');
    showReportModal.value = false;
    await fetchData();
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
  width: 95%;
  max-height: 90vh;
  overflow-y: auto;
}
button {
  min-height: 44px;
  touch-action: manipulation;
}
</style>