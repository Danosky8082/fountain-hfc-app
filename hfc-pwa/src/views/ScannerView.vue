<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h4>📷 Check-in Options</h4>
      <button class="btn btn-secondary btn-sm" @click="goBack">← Back</button>
    </div>

    <div v-if="!scanError">
      <p class="text-muted">Point your camera at a member's QR code.</p>
      <div id="qr-reader" class="qr-reader"></div>
    </div>

    <div v-if="scanError" class="alert alert-warning mt-3">
      <h5>⚠️ Camera Not Available</h5>
      <p>{{ scanError }}</p>
      <p class="small">This usually happens when the page is loaded over HTTP instead of HTTPS, or permissions are blocked.</p>
      <button class="btn btn-primary btn-sm" @click="goToManual">Go to Manual Check-in</button>
    </div>

    <!-- Search by Name or Member ID -->
    <div class="mt-3">
      <label class="form-label">🔍 Search Member by Name or ID:</label>
      <div class="input-group">
        <input 
          v-model="searchQuery" 
          type="text" 
          class="form-control" 
          placeholder="Type member name or ID..." 
          @input="searchMembers"
          @keyup.enter="selectFirstMember"
        />
        <button class="btn btn-outline-secondary" @click="clearSearch" type="button">✕</button>
      </div>
      
      <!-- Search Results Dropdown -->
      <div v-if="searchResults.length > 0 && searchQuery.length > 0" class="search-results mt-1">
        <div 
          v-for="member in searchResults" 
          :key="member.id" 
          class="search-result-item"
          @click="selectMember(member)"
        >
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <strong>{{ member.fullName }}</strong>
              <span class="text-muted ms-2">({{ member.memberNumber || 'No ID' }})</span>
            </div>
            <span class="badge" :class="member.isPresent ? 'bg-success' : 'bg-secondary'">
              {{ member.isPresent ? '✅ Present' : '⏳ Not Checked In' }}
            </span>
          </div>
          <div class="small text-muted">
            Fellowship: {{ member.fellowship?.name || 'N/A' }}
          </div>
        </div>
      </div>
      
      <small class="text-muted">Search by name or member ID, then click to check in.</small>
    </div>

    <!-- Manual fallback - Member ID only -->
    <div class="mt-2">
      <label class="form-label">Or enter Member ID manually:</label>
      <div class="input-group">
        <input v-model="manualMemberId" type="text" class="form-control" placeholder="Paste member ID..." />
        <button class="btn btn-outline-success" @click="markManualPresent">Check-in</button>
      </div>
    </div>

    <!-- Scan Result -->
    <div v-if="scanResult" class="alert alert-success mt-3">
      ✅ Scanned: <strong>{{ scanResult }}</strong>
      <button class="btn btn-success btn-sm ms-2" @click="markPresent">Mark Present</button>
    </div>

    <!-- Loading State -->
    <div v-if="searching" class="text-center mt-2">
      <div class="spinner-border spinner-border-sm text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <span class="ms-2 text-muted">Searching...</span>
    </div>

    <!-- No Results Message -->
    <div v-if="noResults && searchQuery.length > 0" class="alert alert-warning mt-2">
      No members found matching "{{ searchQuery }}"
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { Html5Qrcode } from 'html5-qrcode';
import api from '../services/api';

const router = useRouter();
const scanResult = ref(null);
const scanError = ref(null);
const manualMemberId = ref('');
const searchQuery = ref('');
const searchResults = ref([]);
const allMembers = ref([]);
const searching = ref(false);
const noResults = ref(false);
let html5QrCode = null;

const goBack = () => {
  stopScanner();
  router.push('/dashboard');
};

const qrboxSize = ref(250);

const updateQrboxSize = () => {
  const width = window.innerWidth;
  const size = Math.min(Math.max(width * 0.8, 200), 300);
  qrboxSize.value = size;
};

const stopScanner = async () => {
  if (html5QrCode) {
    try {
      if (html5QrCode.isScanning) {
        await html5QrCode.stop();
      }
      await html5QrCode.clear();
    } catch (err) {
      console.warn('Scanner cleanup warning:', err.message);
    }
    html5QrCode = null;
  }
};

// ─── Fetch all members for search ──────────────────────────────
const fetchMembers = async () => {
  try {
    const response = await api.get('/admin/members');
    if (response.data.success) {
      allMembers.value = response.data.data;
    }
  } catch (error) {
    console.error('Failed to fetch members:', error);
  }
};

// ─── Search members by name or ID ──────────────────────────────
const searchMembers = () => {
  const query = searchQuery.value.trim().toLowerCase();
  
  if (!query) {
    searchResults.value = [];
    noResults.value = false;
    return;
  }

  searching.value = true;
  noResults.value = false;

  try {
    // Search by fullName or memberNumber or id
    const results = allMembers.value.filter(member => {
      const nameMatch = member.fullName?.toLowerCase().includes(query);
      const numberMatch = member.memberNumber?.toLowerCase().includes(query);
      const idMatch = member.id?.toLowerCase().includes(query);
      return nameMatch || numberMatch || idMatch;
    });

    // Sort results: exact matches first, then partial matches
    results.sort((a, b) => {
      const aName = a.fullName?.toLowerCase() || '';
      const bName = b.fullName?.toLowerCase() || '';
      const aStarts = aName.startsWith(query);
      const bStarts = bName.startsWith(query);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return aName.localeCompare(bName);
    });

    searchResults.value = results.slice(0, 10); // Limit to 10 results
    noResults.value = results.length === 0;
  } catch (error) {
    console.error('Search error:', error);
    searchResults.value = [];
  } finally {
    searching.value = false;
  }
};

// ─── Select a member from search results ───────────────────────
const selectMember = async (member) => {
  if (member.isPresent) {
    alert(`⚠️ ${member.fullName} is already checked in for this week.`);
    return;
  }

  try {
    const response = await api.post('/attendance/mark', {
      memberId: member.id,
      checkInMethod: 'MANUAL',
    });
    
    if (response.data.success) {
      alert(`✅ ${member.fullName} checked in successfully!`);
      // Update the member's status locally
      member.isPresent = true;
      searchQuery.value = '';
      searchResults.value = [];
      noResults.value = false;
      // Refresh the list
      await fetchMembers();
    } else {
      alert('❌ Failed: ' + (response.data.message || 'Check-in failed.'));
    }
  } catch (error) {
    console.error('Check-in error:', error);
    const msg = error.response?.data?.message || error.message || 'Unknown error';
    alert('❌ Error: ' + msg);
  }
};

// ─── Select first member on Enter key ──────────────────────────
const selectFirstMember = () => {
  if (searchResults.value.length > 0) {
    selectMember(searchResults.value[0]);
  }
};

// ─── Clear search ──────────────────────────────────────────────
const clearSearch = () => {
  searchQuery.value = '';
  searchResults.value = [];
  noResults.value = false;
};

// ─── Mark attendance via QR scan ───────────────────────────────
const markPresent = async () => {
  if (!scanResult.value) {
    alert('No QR code scanned.');
    return;
  }

  let memberId = scanResult.value;
  let memberName = '';

  try {
    const parsed = JSON.parse(scanResult.value);
    memberId = parsed.id;
    memberName = parsed.name;
  } catch (e) {
    // fallback – treat as plain string
  }

  if (!memberId) {
    alert('Invalid QR code – member ID not found.');
    return;
  }

  try {
    const response = await api.post('/attendance/mark', {
      memberId: memberId,
      checkInMethod: 'QR_SCAN',
    });
    
    if (response.data.success) {
      const name = memberName || response.data.data?.member?.fullName || 'Member';
      alert(`✅ ${name} checked in successfully!`);
      scanResult.value = null;
      
      // Refresh member list to update status
      await fetchMembers();
      
      // Restart scanner
      if (html5QrCode && !html5QrCode.isScanning) {
        html5QrCode.start(
          { facingMode: 'environment' },
          {
            fps: 10,
            qrbox: { width: qrboxSize.value, height: qrboxSize.value },
          },
          (decodedText) => {
            scanResult.value = decodedText;
            if (html5QrCode && html5QrCode.isScanning) {
              html5QrCode.stop().catch(() => {});
            }
          },
          (error) => {}
        ).catch(() => {});
      }
    } else {
      alert('❌ Failed: ' + (response.data.message || 'Check-in failed.'));
    }
  } catch (error) {
    console.error('Check-in error:', error);
    const msg = error.response?.data?.message || error.message || 'Unknown error';
    alert('❌ Error: ' + msg);
  }
};

// ─── Mark attendance manually by ID ────────────────────────────
const markManualPresent = async () => {
  if (!manualMemberId.value) {
    alert('Please enter a Member ID.');
    return;
  }

  try {
    const response = await api.post('/attendance/mark', {
      memberId: manualMemberId.value.trim(),
      checkInMethod: 'MANUAL',
    });
    
    if (response.data.success) {
      alert('✅ Check-in successful!');
      manualMemberId.value = '';
      // Refresh member list to update status
      await fetchMembers();
    } else {
      alert('❌ Failed: ' + (response.data.message || 'Check-in failed.'));
    }
  } catch (error) {
    console.error('Error marking attendance:', error);
    const msg = error.response?.data?.message || error.message || 'Unknown error';
    alert('❌ Error: ' + msg);
  }
};

// ─── Lifecycle hooks ────────────────────────────────────────────
onMounted(async () => {
  updateQrboxSize();
  window.addEventListener('resize', updateQrboxSize);

  // Fetch members for search
  await fetchMembers();

  // Camera initialization
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    scanError.value = 'Camera not supported on this device/browser.';
    return;
  }

  try {
    html5QrCode = new Html5Qrcode('qr-reader');
    html5QrCode.start(
      { facingMode: 'environment' },
      {
        fps: 10,
        qrbox: { width: qrboxSize.value, height: qrboxSize.value },
      },
      (decodedText) => {
        scanResult.value = decodedText;
        if (html5QrCode && html5QrCode.isScanning) {
          html5QrCode.stop().catch(() => {});
        }
      },
      (error) => {
        if (error && error.includes('Permission')) {
          scanError.value = 'Permission denied. Please allow camera access in browser settings.';
        }
      }
    ).catch((err) => {
      console.error('QR Start Error:', err);
      if (err.name === 'NotAllowedError') {
        scanError.value = 'Camera permission blocked. Please enable camera for this site in your browser settings (lock icon).';
      } else if (err.name === 'NotFoundError' || err.name === 'NotReadableError') {
        scanError.value = 'No camera found or camera busy. Try closing other apps using the camera.';
      } else {
        scanError.value = `Camera unavailable: ${err.message}. Try using Manual Check-in.`;
      }
    });
  } catch (err) {
    scanError.value = 'Failed to initialize scanner. Please use Manual Check-in.';
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', updateQrboxSize);
  stopScanner();
});

const goToManual = () => {
  stopScanner();
  router.push('/manual');
};

// ─── Debounce search to avoid too many updates ──────────────────
watch(searchQuery, () => {
  clearTimeout(searchMembers._timer);
  searchMembers._timer = setTimeout(searchMembers, 300);
});
</script>

<style scoped>
.qr-reader {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.search-results {
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #dee2e6;
  border-radius: 0.375rem;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.search-result-item {
  padding: 10px 15px;
  cursor: pointer;
  border-bottom: 1px solid #f1f3f5;
  transition: background-color 0.2s;
}

.search-result-item:hover {
  background-color: #f8f9fa;
}

.search-result-item:last-child {
  border-bottom: none;
}

.search-result-item .badge {
  font-size: 0.75rem;
  padding: 0.35rem 0.65rem;
}

@media (max-width: 576px) {
  .search-result-item {
    padding: 8px 12px;
    font-size: 0.9rem;
  }
  
  .search-result-item .badge {
    font-size: 0.65rem;
  }
}
</style>