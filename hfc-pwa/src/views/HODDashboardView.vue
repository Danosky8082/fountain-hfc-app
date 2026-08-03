<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h4>📊 HOD Dashboard – All Reports</h4>
      <button class="btn btn-secondary btn-sm" @click="goBack">← Back</button>
    </div>

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
      <div class="col-md-3 d-flex align-items-end gap-2 flex-wrap">
        <button class="btn btn-success" @click="exportCSV">📥 Export CSV</button>
        <button class="btn btn-info" @click="downloadAllPDFs" :disabled="downloadingAll">
          <span v-if="downloadingAll" class="spinner-border spinner-border-sm me-1"></span>
          {{ downloadingAll ? 'Downloading...' : '📄 Download All PDFs' }}
        </button>
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
      <div class="table-responsive">
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
              <td>{{ report.fellowship?.name || 'Unknown' }}</td>
              <td>{{ report.monthYear }}</td>
              <td>{{ report.week1Count || 0 }}</td>
              <td>{{ report.week2Count || 0 }}</td>
              <td>{{ report.week3Count || 0 }}</td>
              <td>{{ report.week4Count || 0 }}</td>
              <td>{{ report.week5Count || 0 }}</td>
              <td>
                <span :class="'badge ' + (report.status === 'FINALIZED' ? 'bg-success' : 'bg-warning')">
                  {{ report.status || 'DRAFT' }}
                </span>
              </td>
              <td>
                <button class="btn btn-sm btn-info me-1" @click="downloadPDF(report.id)" :disabled="downloadingPDF[report.id]">
                  <span v-if="downloadingPDF[report.id]" class="spinner-border spinner-border-sm me-1"></span>
                  PDF
                </button>
                <button class="btn btn-sm btn-secondary" @click="viewReport(report.id)">View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner.vue';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();
const loading = ref(true);
const reports = ref([]);
const fellowships = ref([]);
const downloadingAll = ref(false);
const downloadingPDF = ref({});

const filters = ref({
  month: new Date().toISOString().slice(0, 7),
  fellowship: '',
  status: '',
});

const chartCanvas = ref(null);
let chartInstance = null;

// ─── Computed ──────────────────────────────────────────────────────
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

// ─── Navigation ──────────────────────────────────────────────────
const goBack = () => {
  router.push('/dashboard');
};

// ─── Fetch Data ──────────────────────────────────────────────────
const fetchData = async () => {
  loading.value = true;
  try {
    const res = await api.get(`/reports/all?monthYear=${filters.value.month}`);
    if (res.data.success) {
      reports.value = res.data.data;
    }
    const fRes = await api.get('/fellowship/list');
    if (fRes.data.success) {
      fellowships.value = fRes.data.data;
    }
    await nextTick();
    renderChart();
  } catch (error) {
    console.error('Failed to fetch data', error);
    if (error.response?.status === 403) {
      alert('❌ You do not have permission to view this page.');
      router.push('/dashboard');
    } else {
      alert('❌ Failed to load reports. Please try again.');
    }
  } finally {
    loading.value = false;
  }
};

// ─── Render Chart ──────────────────────────────────────────────────
const renderChart = () => {
  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }
  
  const ctx = chartCanvas.value?.getContext('2d');
  if (!ctx) return;

  if (filteredReports.value.length === 0) {
    return;
  }

  const labels = filteredReports.value.map(r => r.fellowship?.name || 'Unknown');
  const data = filteredReports.value.map(r => 
    (r.week1Count || 0) + (r.week2Count || 0) + (r.week3Count || 0) + 
    (r.week4Count || 0) + (r.week5Count || 0)
  );

  const isSmallScreen = window.innerWidth < 576;
  const tickFontSize = isSmallScreen ? 8 : 11;

  try {
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
          y: { 
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          },
          x: {
            ticks: {
              maxRotation: 45,
              minRotation: 0,
              font: {
                size: tickFontSize,
              },
            },
          },
        },
      },
    });
  } catch (error) {
    console.error('Chart rendering error:', error);
  }
};

// ─── Download Single PDF ──────────────────────────────────────────
const downloadPDF = async (reportId) => {
  const token = authStore.token;
  if (!token) {
    alert('❌ You are not logged in. Please login again.');
    router.push('/login');
    return;
  }

  // Show loading state for this specific button
  downloadingPDF.value[reportId] = true;

  try {
    // Open PDF with token as query parameter
    const url = `/api/reports/${reportId}/pdf?token=${token}`;
    window.open(url, '_blank');
    
    // Small delay to allow the download to start
    await new Promise(resolve => setTimeout(resolve, 1000));
  } catch (error) {
    console.error('Error downloading PDF:', error);
    alert('❌ Failed to download PDF. Please try again.');
  } finally {
    downloadingPDF.value[reportId] = false;
  }
};

// ─── Download All PDFs ────────────────────────────────────────────
const downloadAllPDFs = async () => {
  const token = authStore.token;
  if (!token) {
    alert('❌ You are not logged in. Please login again.');
    router.push('/login');
    return;
  }

  if (filteredReports.value.length === 0) {
    alert('No reports to download.');
    return;
  }

  if (filteredReports.value.length > 10) {
    const confirm = window.confirm(
      `You are about to download ${filteredReports.value.length} PDFs. ` +
      'This may open many tabs. Do you want to continue?'
    );
    if (!confirm) return;
  }

  downloadingAll.value = true;
  
  try {
    // Download each PDF with a delay to avoid browser blocking
    for (let i = 0; i < filteredReports.value.length; i++) {
      const report = filteredReports.value[i];
      const url = `/api/reports/${report.id}/pdf?token=${token}`;
      
      // Open in new tab with delay between downloads
      window.open(url, '_blank');
      
      // Add delay between downloads (500ms)
      if (i < filteredReports.value.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
    
    alert(`✅ Downloading ${filteredReports.value.length} PDF(s). They will open in new tabs.`);
  } catch (error) {
    console.error('Error downloading PDFs:', error);
    alert('❌ Failed to download some PDFs. Please try again.');
  } finally {
    downloadingAll.value = false;
  }
};

// ─── Export CSV ────────────────────────────────────────────────────
const exportCSV = () => {
  if (filteredReports.value.length === 0) {
    alert('No data to export.');
    return;
  }

  try {
    const headers = ['Fellowship', 'Month', 'Week1', 'Week2', 'Week3', 'Week4', 'Week5', 'Status'];
    const rows = filteredReports.value.map(r => [
      r.fellowship?.name || 'Unknown',
      r.monthYear || '',
      r.week1Count || 0,
      r.week2Count || 0,
      r.week3Count || 0,
      r.week4Count || 0,
      r.week5Count || 0,
      r.status || 'DRAFT',
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
  } catch (error) {
    console.error('CSV export error:', error);
    alert('❌ Failed to export CSV. Please try again.');
  }
};

// ─── View Report ───────────────────────────────────────────────────
const viewReport = (reportId) => {
  router.push(`/report/${reportId}`);
};

// ─── Load Chart Library ──────────────────────────────────────────
const loadChart = () => {
  return new Promise((resolve) => {
    if (typeof Chart !== 'undefined') {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.onload = resolve;
    script.onerror = () => {
      console.error('Failed to load Chart.js');
      resolve();
    };
    document.head.appendChild(script);
  });
};

// ─── Lifecycle Hooks ─────────────────────────────────────────────
onMounted(async () => {
  await loadChart();
  await fetchData();
});

watch(filters, () => {
  renderChart();
}, { deep: true });
</script>

<style scoped>
.btn {
  min-height: 44px;
  touch-action: manipulation;
}

@media (max-width: 576px) {
  .btn {
    min-height: 40px;
    font-size: 0.9rem;
  }
  
  .container {
    padding-left: 10px;
    padding-right: 10px;
  }
}

/* Table responsiveness */
.table-responsive {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.table th, .table td {
  white-space: nowrap;
  padding: 0.5rem;
}

@media (max-width: 768px) {
  .table th, .table td {
    padding: 0.3rem 0.4rem;
    font-size: 0.85rem;
  }
  
  .btn-sm {
    padding: 0.2rem 0.4rem;
    font-size: 0.75rem;
  }
}

/* Chart container */
.card-body {
  min-height: 200px;
}

/* Badge styles */
.badge {
  font-size: 0.75rem;
  padding: 0.35rem 0.65rem;
}

.bg-success {
  background-color: #28a745 !important;
  color: white;
}

.bg-warning {
  background-color: #ffc107 !important;
  color: #212529;
}
</style>