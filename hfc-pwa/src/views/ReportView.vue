<template>
  <div class="container mt-4">
    <h4>📄 Monthly Report</h4>
    <div v-if="loading" class="text-center"><LoadingSpinner /></div>
    <div v-else-if="report">
      <div class="card">
        <div class="card-body">
          <h5>{{ report.fellowship.name }} – {{ report.monthYear }}</h5>
          <p><strong>Status:</strong> {{ report.status }}</p>
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
          <h6>Pastoral & Follow-up</h6>
          <div class="mb-2">
            <label class="form-label">Prayed for every member at least once a week?</label>
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
          <div class="d-flex gap-2">
            <button class="btn btn-primary" @click="saveReport(false)">💾 Save Draft</button>
            <button class="btn btn-success" @click="saveReport(true)">✅ Finalize Report</button>
            <button class="btn btn-info" @click="downloadPDF">📄 Download PDF</button>
            <button
  v-if="report?.status === 'FINALIZED' && (authStore.user?.role === 'ADMIN' || authStore.user?.role === 'HOD' || report.fellowship.leaderId === authStore.user?.id)"
  class="btn btn-warning"
  @click="resetReport"
>
  🔄 Reset to Draft
</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="alert alert-warning">No report found. Please ensure you have submitted at least one week.</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner.vue'

const loading = ref(true)
const report = ref(null)
const form = ref({
  prayerFlag: false,
  firstTimers: 0,
  newMembers: 0,
  followUps: 0,
  escalations: '',
  comments: '',
})

const formatDate = (dateStr) => {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const fetchReport = async () => {
  try {
    const res = await api.get('/reports/current')
    if (res.data.success) {
      report.value = res.data.data
      form.value.prayerFlag = report.value.prayerFlag || false
      form.value.firstTimers = report.value.firstTimers || 0
      form.value.newMembers = report.value.newMembers || 0
      form.value.followUps = report.value.followUps || 0
      form.value.escalations = report.value.escalations || ''
      form.value.comments = report.value.comments || ''
    }
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

const saveReport = async (finalize) => {
  if (!report.value) return
  try {
    const payload = {
      ...form.value,
      action: finalize ? 'FINALIZE' : 'SAVE',
    }
    const res = await api.put(`/reports/${report.value.id}`, payload)
    if (res.data.success) {
      alert(finalize ? '✅ Report finalized!' : '💾 Draft saved!')
      await fetchReport()
    } else {
      alert('❌ Failed: ' + res.data.message)
    }
  } catch (error) {
    alert('Error saving report')
  }
}

const downloadPDF = () => {
  if (!report.value) return
  const url = `/api/reports/${report.value.id}/pdf`
  window.open(url, '_blank')
}

onMounted(fetchReport)

const resetReport = async () => {
  if (!report.value) return;
  if (!confirm('Are you sure you want to reset this finalized report to draft?')) return;
  try {
    const res = await api.post(`/reports/${report.value.id}/reset`);
    if (res.data.success) {
      alert('✅ Report reset to draft!');
      await fetchReport();
    } else {
      alert('❌ ' + res.data.message);
    }
  } catch (error) {
    alert('Error resetting report');
  }
};
</script>