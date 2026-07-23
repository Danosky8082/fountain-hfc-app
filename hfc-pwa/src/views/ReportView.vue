<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center">
      <h4>📄 Monthly Report</h4>
      <button
        v-if="canReset"
        class="btn btn-warning"
        @click="resetToDraft"
        :disabled="resetting"
      >
        <span v-if="resetting" class="spinner-border spinner-border-sm me-2"></span>
        🔄 Reset to Draft
      </button>
    </div>

    <div v-if="loading" class="text-center my-5"><LoadingSpinner /></div>

    <div v-else-if="report" class="card">
      <div class="card-body">
        <h5>{{ report.fellowship?.name || 'Unknown Fellowship' }} – {{ report.monthYear }}</h5>
        <p>
          <strong>Status:</strong>
          <span :class="'badge ' + (report.status === 'FINALIZED' ? 'bg-success' : 'bg-warning')">
            {{ report.status }}
          </span>
        </p>
        <hr />

        <h6>Weekly Attendance</h6>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Week</th>
              <th>Date</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in 5" :key="i">
              <td>Week {{ i }}</td>
              <td>{{ report[`week${i}Date`] ? formatDate(report[`week${i}Date`]) : '—' }}</td>
              <td>{{ report[`week${i}Count`] || 0 }}</td>
            </tr>
          </tbody>
        </table>
        <hr />

        <h6>🙏 Pastoral & Follow-up</h6>

        <div class="mb-2">
          <label class="form-label">I PRAYED FOR EVERY MEMBER... AT LEAST ONCE A WEEK?</label>
          <div class="form-check">
            <input v-model="form.prayerFlag" class="form-check-input" type="checkbox" id="prayerFlag" />
            <label class="form-check-label" for="prayerFlag">Yes</label>
          </div>
        </div>

        <div class="mb-2">
          <label class="form-label">First Timers / New Converts</label>
          <input v-model.number="form.firstTimers" type="number" class="form-control" min="0" />
        </div>

        <div class="mb-2">
          <label class="form-label">New Members (total)</label>
          <input v-model.number="form.newMembers" type="number" class="form-control" min="0" />
        </div>

        <div class="mb-2">
          <label class="form-label">Follow-ups</label>
          <input v-model.number="form.followUps" type="number" class="form-control" min="0" />
        </div>

        <div class="mb-2">
          <label class="form-label">Issues for Escalation</label>
          <textarea v-model="form.escalations" class="form-control" rows="2"></textarea>
        </div>

        <div class="mb-2">
          <label class="form-label">Comments / Feedback</label>
          <textarea v-model="form.comments" class="form-control" rows="2"></textarea>
        </div>

        <div class="d-flex gap-2 flex-wrap">
          <button class="btn btn-primary" @click="saveReport(false)" :disabled="saving || report.status === 'FINALIZED'">
            <span v-if="saving" class="spinner-border spinner-border-sm me-2"></span>
            💾 Save Draft
          </button>
          <button class="btn btn-success" @click="saveReport(true)" :disabled="saving || report.status === 'FINALIZED'">
            <span v-if="saving" class="spinner-border spinner-border-sm me-2"></span>
            ✅ Finalize Report
          </button>
          <button class="btn btn-info" @click="downloadPDF" :disabled="downloading">
            <span v-if="downloading" class="spinner-border spinner-border-sm me-2"></span>
            📄 Download PDF
          </button>
        </div>

        <div v-if="message" class="mt-3" :class="messageClass">{{ message }}</div>
      </div>
    </div>

    <div v-else class="alert alert-warning">
      No report found. Please ensure you have submitted at least one week.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner.vue';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const loading = ref(true);
const saving = ref(false);
const downloading = ref(false);
const resetting = ref(false);
const report = ref(null);
const message = ref('');
const messageClass = ref('text-success');

const form = ref({
  prayerFlag: false,
  firstTimers: 0,
  newMembers: 0,
  followUps: 0,
  escalations: '',
  comments: '',
});

const canReset = computed(() => {
  if (!report.value) return false;
  if (report.value.status !== 'FINALIZED') return false;
  const role = authStore.user?.role;
  const isAdminOrHod = role === 'ADMIN' || role === 'HOD';
  const isOwner = authStore.fellowship?.id === report.value.fellowshipId;
  return isAdminOrHod || isOwner;
});

const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return '—';
  }
};

const fetchReport = async () => {
  const reportId = route.params.id;
  const url = reportId ? `/reports/${reportId}` : '/reports/current';

  loading.value = true;
  try {
    const res = await api.get(url);
    if (res.data.success) {
      report.value = res.data.data;
      form.value.prayerFlag = report.value.prayerFlag || false;
      form.value.firstTimers = report.value.firstTimers || 0;
      form.value.newMembers = report.value.newMembers || 0;
      form.value.followUps = report.value.followUps || 0;
      form.value.escalations = report.value.escalations || '';
      form.value.comments = report.value.comments || '';
    }
  } catch (error) {
    console.error('Failed to fetch report', error);
    message.value = '❌ Error loading report';
    messageClass.value = 'text-danger';
  } finally {
    loading.value = false;
  }
};

const saveReport = async (finalize) => {
  if (!report.value) return;
  if (report.value.status === 'FINALIZED') {
    message.value = '⚠️ This report is already finalized and cannot be edited.';
    messageClass.value = 'text-warning';
    return;
  }

  saving.value = true;
  message.value = '';
  try {
    const payload = {
      ...form.value,
      action: finalize ? 'FINALIZE' : 'SAVE',
    };
    const res = await api.put(`/reports/${report.value.id}`, payload);
    if (res.data.success) {
      const successMsg = finalize
        ? '✅ Report finalized successfully! Emails have been sent to HODs.'
        : '💾 Draft saved!';
      message.value = successMsg;
      messageClass.value = 'text-success';
      if (finalize) alert(successMsg);
      await fetchReport();
    } else {
      message.value = '❌ ' + res.data.message;
      messageClass.value = 'text-danger';
    }
  } catch (error) {
    console.error('Error saving report', error);
    message.value = '❌ Error: ' + (error.response?.data?.message || error.message);
    messageClass.value = 'text-danger';
  } finally {
    saving.value = false;
  }
};

const downloadPDF = async () => {
  if (!report.value) return;
  downloading.value = true;
  try {
    const url = `/api/reports/${report.value.id}/pdf`;
    window.open(url, '_blank');
  } catch (error) {
    console.error('PDF download error', error);
    message.value = '❌ Failed to download PDF';
    messageClass.value = 'text-danger';
  } finally {
    downloading.value = false;
  }
};

const resetToDraft = async () => {
  if (!report.value) return;
  if (!confirm('Are you sure you want to reset this report from FINALIZED to DRAFT?')) return;

  resetting.value = true;
  message.value = '';
  try {
    const res = await api.put(`/reports/${report.value.id}`, {
      action: 'RESET_TO_DRAFT',
    });
    if (res.data.success) {
      message.value = '✅ Report reset to DRAFT successfully!';
      messageClass.value = 'text-success';
      await fetchReport();
    } else {
      message.value = '❌ ' + res.data.message;
      messageClass.value = 'text-danger';
    }
  } catch (error) {
    console.error('Reset error', error);
    message.value = '❌ Error resetting report';
    messageClass.value = 'text-danger';
  } finally {
    resetting.value = false;
  }
};

onMounted(async () => {
  if (!authStore.isAuthenticated) {
    const restored = await authStore.restoreSession();
    if (!restored) {
      router.push('/login');
      return;
    }
  }
  await fetchReport();
});
</script>