<template>
  <div class="container mt-4">
    <h4>📊 HOD Dashboard – All Reports</h4>
    <div class="row mb-3">
      <div class="col-md-4">
        <label class="form-label">Month</label>
        <input type="month" v-model="selectedMonth" class="form-control" @change="fetchReports" />
      </div>
    </div>

    <div v-if="loading" class="text-center"><LoadingSpinner /></div>
    <div v-else-if="reports.length === 0" class="alert alert-info">No reports found for this month.</div>
    <div v-else>
      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Fellowship</th>
            <th>Month</th>
            <th>Week1</th>
            <th>Week2</th>
            <th>Week3</th>
            <th>Week4</th>
            <th>Week5</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="report in reports" :key="report.id">
            <td>{{ report.fellowship.name }}</td>
            <td>{{ report.monthYear }}</td>
            <td>{{ report.week1Count }}</td>
            <td>{{ report.week2Count }}</td>
            <td>{{ report.week3Count }}</td>
            <td>{{ report.week4Count }}</td>
            <td>{{ report.week5Count }}</td>
            <td>
              <span :class="'badge ' + (report.status === 'FINALIZED' ? 'bg-success' : 'bg-warning')">
                {{ report.status }}
              </span>
            </td>
            <td>
              <button class="btn btn-sm btn-info" @click="downloadPDF(report.id)">PDF</button>
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
import LoadingSpinner from '../components/LoadingSpinner.vue';

const loading = ref(true);
const reports = ref([]);
const selectedMonth = ref(new Date().toISOString().slice(0, 7));

const fetchReports = async () => {
  loading.value = true;
  try {
    const res = await api.get(`/reports/all?monthYear=${selectedMonth.value}`);
    if (res.data.success) {
      reports.value = res.data.data;
    }
  } catch (error) {
    console.error('Failed to fetch reports', error);
  } finally {
    loading.value = false;
  }
};

const downloadPDF = (reportId) => {
  window.open(`/api/reports/${reportId}/pdf`, '_blank');
};

onMounted(fetchReports);
</script>