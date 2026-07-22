<template>
  <div class="container mt-4">
    <h4>📊 HOD Dashboard – All Reports</h4>

    <!-- Filters -->
    <div class="row mb-3 g-2">
      <div class="col-md-3">
        <label class="form-label">Month</label>
        <input type="month" v-model="filters.month" class="form-control" @change="fetchData" />
      </div>
      <div class="col-md-3">
        <label class="form-label">Fellowship</label>
        <select v-model="filters.fellowship" class="form-control" @change="fetchData">
          <option value="">All Fellowships</option>
          <option v-for="f in fellowships" :key="f.id" :value="f.id">{{ f.name }}</option>
        </select>
      </div>
      <div class="col-md-3">
        <label class="form-label">Status</label>
        <select v-model="filters.status" class="form-control" @change="fetchData">
          <option value="">All</option>
          <option value="DRAFT">Draft</option>
          <option value="FINALIZED">Finalized</option>
        </select>
      </div>
      <div class="col-md-3 d-flex align-items-end gap-2">
        <button class="btn btn-success" @click="exportCSV">📥 Export CSV</button>
        <button class="btn btn-info" @click="downloadAllPDFs">📄 Download All PDFs</button>
      </div>
    </div>

    <!-- Chart -->
    <div class="card mb-4">
      <div class="card-header">Attendance Overview</div>
      <div class="card-body">
        <canvas ref="chartCanvas" width="400" height="200"></canvas>
      </div>
    </div>

    <!-- Table -->
    <div v-if="loading" class="text-center"><LoadingSpinner /></div>
    <div v-else-if="filteredReports.length === 0" class="alert alert-info">No reports found for the selected filters.</div>
    <div v-else>
      <table class="table table-bordered table-striped table-hover">
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
          <tr v-for="report in filteredReports" :key="report.id">
            <td>{{ report.fellowship.name }}</td>
            <td>{{ report.monthYear }}</td>
            <td>{{ report.week1Count }}</td>
            <td>{{ report.week2Count }}</td>
            <td>{{ report.week3Count }}</td>
            <td>{{ report.week4Count }}</td>
            <td>{{ report.week5Count }}</td>
            <td><span :class="'badge ' + (report.status === 'FINALIZED' ? 'bg-success' : 'bg-warning')">{{ report.status }}</span></td>
            <td>
              <button class="btn btn-sm btn-info me-1" @click="downloadPDF(report.id)">PDF</button>
              <button class="btn btn-sm btn-secondary" @click="viewReport(report.id)">View</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner.vue';

const router = useRouter();
const loading = ref(true);
const reports = ref([]);
const fellowships = ref([]);

const filters = ref({
  month: new Date().toISOString().slice(0, 7),
  fellowship: '',
  status: '',
});

const chartCanvas = ref(null);
let chartInstance = null;

const filteredReports = computed(() => {
  let filtered = reports.value;
  if (filters.value.fellowship) {
    filtered = filtered.filter(r => r.fellowshipId === filters.value.fellowship);
  }
  if (filters.value.status) {
    filtered = filtered.filter(r => r.status === filters.value.status);
  }
  return filtered;
});

const fetchData = async () => {
  loading.value = true;
  try {
    // Fetch reports
    const res = await api.get(`/reports/all?monthYear=${filters.value.month}`);
    if (res.data.success) reports.value = res.data.data;
    // Fetch fellowships for dropdown
    const fRes = await api.get('/fellowship/list');
    if (fRes.data.success) fellowships.value = fRes.data.data;
    await nextTick();
    renderChart();
  } catch (error) {
    console.error('Failed to fetch data', error);
  } finally {
    loading.value = false;
  }
};

const renderChart = () => {
  if (chartInstance) chartInstance.destroy();
  const ctx = chartCanvas.value?.getContext('2d');
  if (!ctx) return;

  const labels = filteredReports.value.map(r => r.fellowship.name);
  const data = filteredReports.value.map(r => r.week1Count + r.week2Count + r.week3Count + r.week4Count + r.week5Count);

  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Total Attendance (All Weeks)',
        data,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: false },
      },
      scales: {
        y: { beginAtZero: true },
      },
    },
  });
};

const downloadPDF = (reportId) => {
  window.open(`/api/reports/${reportId}/pdf`, '_blank');
};

const viewReport = (reportId) => {
  router.push(`/report/${reportId}`);
};

const downloadAllPDFs = () => {
  // Open each PDF in a new tab (or use a batch download)
  for (const report of filteredReports.value) {
    window.open(`/api/reports/${report.id}/pdf`, '_blank');
  }
};

const exportCSV = () => {
  const headers = ['Fellowship', 'Month', 'Week1', 'Week2', 'Week3', 'Week4', 'Week5', 'Status'];
  const rows = filteredReports.value.map(r => [
    r.fellowship.name,
    r.monthYear,
    r.week1Count,
    r.week2Count,
    r.week3Count,
    r.week4Count,
    r.week5Count,
    r.status,
  ]);
  let csv = headers.join(',') + '\n';
  rows.forEach(row => {
    csv += row.join(',') + '\n';
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `reports_${filters.value.month}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
};

// Chart.js CDN load
const loadChart = () => {
  return new Promise((resolve) => {
    if (typeof Chart !== 'undefined') {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.onload = resolve;
    document.head.appendChild(script);
  });
};

onMounted(async () => {
  await loadChart();
  await fetchData();
});

watch(filters, () => {
  renderChart();
}, { deep: true });
</script>