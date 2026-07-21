<template>
  <div class="container mt-4">
    <h4>📊 Current Week Attendance</h4>
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
import { ref, onMounted } from 'vue'
import api from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner.vue'

const loading = ref(true)
const session = ref(null)
const members = ref([])
const submitting = ref(false)

const fetchData = async () => {
  try {
    const res = await api.get('/attendance/current-session')
    if (res.data.success) {
      session.value = res.data.data.session
      members.value = res.data.data.members || []
    }
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

const submitWeek = async () => {
  if (submitting.value) return
  if (!confirm('Are you sure you want to submit this week? This cannot be undone.')) return
  submitting.value = true
  try {
    const res = await api.post('/attendance/submit-week')
    if (res.data.success) {
      alert('✅ Week submitted successfully!')
      await fetchData()
    } else {
      alert('❌ ' + res.data.message)
    }
  } catch (error) {
    alert('Error submitting week')
  } finally {
    submitting.value = false
  }
}

onMounted(fetchData)
</script>