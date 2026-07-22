<template>
  <div class="container mt-4">
    <!-- Header with Add Member button -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h4>📋 Manual Check-in</h4>
      <button class="btn btn-primary btn-sm" @click="showAddMemberModal = true">
        ➕ Add Member
      </button>
    </div>
    <p class="text-muted">
      Select members present (for those who lost their QR cards).
    </p>
    <div v-if="loading" class="text-center my-5"><LoadingSpinner /></div>
    <div v-else-if="members.length === 0" class="alert alert-info">
      No active members found in your fellowship.
    </div>
    <div v-else>
      <div class="input-group mb-3">
        <input
          v-model="search"
          type="text"
          class="form-control"
          placeholder="Search members..."
        />
        <span class="input-group-text"><i class="bi bi-search"></i></span>
      </div>
      <div class="list-group">
        <div
          v-for="member in filteredMembers"
          :key="member.id"
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          <span>{{ member.fullName }}</span>
          <div>
            <span v-if="member.isPresent" class="badge bg-success me-2"
              >Present</span
            >
            <button
              v-if="!member.isPresent"
              class="btn btn-sm btn-outline-primary me-1"
              @click="checkIn(member.id)"
            >
              Check-in
            </button>
            <!-- QR Button – always visible -->
            <button class="btn btn-sm btn-info" @click="showQR(member.id)">
              QR
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Member Modal -->
    <div v-if="showAddMemberModal" class="modal-overlay" @click.self="showAddMemberModal = false">
      <div class="modal-content">
        <h5>Add New Member</h5>
        <form @submit.prevent="addMember">
          <div class="mb-2">
            <label class="form-label">Full Name *</label>
            <input v-model="newMember.fullName" type="text" class="form-control" required />
          </div>
          <div class="mb-2">
            <label class="form-label">Phone</label>
            <input v-model="newMember.phone" type="text" class="form-control" />
          </div>
          <div class="mb-2">
            <label class="form-label">Email</label>
            <input v-model="newMember.email" type="email" class="form-control" />
          </div>
          <div class="d-flex gap-2">
            <button type="submit" class="btn btn-success" :disabled="addingMember">
              <span v-if="addingMember" class="spinner-border spinner-border-sm me-2"></span>
              Add Member
            </button>
            <button type="button" class="btn btn-secondary" @click="showAddMemberModal = false">Cancel</button>
          </div>
        </form>
        <div v-if="memberAddMessage" class="mt-2" :class="memberAddClass">{{ memberAddMessage }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import api from "../services/api";
import { useAuthStore } from "../stores/auth";
import LoadingSpinner from "../components/LoadingSpinner.vue";

const authStore = useAuthStore();
const loading = ref(true);
const members = ref([]);
const search = ref("");

// Modal state
const showAddMemberModal = ref(false);
const addingMember = ref(false);
const memberAddMessage = ref('');
const memberAddClass = ref('text-success');
const newMember = ref({ fullName: '', phone: '', email: '' });

const filteredMembers = computed(() => {
  if (!search.value) return members.value;
  return members.value.filter((m) =>
    m.fullName.toLowerCase().includes(search.value.toLowerCase()),
  );
});

const fetchMembers = async () => {
  try {
    const response = await api.get("/fellowship/members");
    if (response.data.success) {
      members.value = response.data.data.map((m) => ({
        ...m,
        isPresent: false,
      }));
      await fetchAttendance();
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const fetchAttendance = async () => {
  try {
    const res = await api.get("/attendance/current-session");
    if (res.data.success) {
      const sessionMembers = res.data.data.members;
      members.value = members.value.map((m) => {
        const found = sessionMembers.find((sm) => sm.id === m.id);
        return { ...m, isPresent: found?.isPresent || false };
      });
    }
  } catch (error) {
    console.error("Failed to fetch attendance", error);
  }
};

const checkIn = async (memberId) => {
  try {
    const res = await api.post("/attendance/mark", {
      memberId,
      checkInMethod: "MANUAL",
    });
    if (res.data.success) {
      const member = members.value.find((m) => m.id === memberId);
      if (member) member.isPresent = true;
      alert("✅ Check-in successful!");
    } else {
      alert("❌ Failed: " + res.data.message);
    }
  } catch (error) {
    alert("Error checking in");
  }
};

// Show QR code for a member (opens in a new tab)
const showQR = (memberId) => {
  // Use the backend base URL from the API config
  // Assuming api.defaults.baseURL is set (e.g., https://fountain-hfc.onrender.com/api)
  // We strip '/api' from the base to get the root, then append the qr endpoint
  const baseUrl = api.defaults.baseURL.replace(/\/api$/, '');
  window.open(`${baseUrl}/api/qr/member/${memberId}`, "_blank");
};

// Add member
const addMember = async () => {
  addingMember.value = true;
  memberAddMessage.value = '';
  try {
    const res = await api.post('/admin/member', {
      ...newMember.value,
      fellowshipId: authStore.fellowship.id // auto-assign to the FL's fellowship
    });
    if (res.data.success) {
      memberAddMessage.value = `✅ "${res.data.data.fullName}" added!`;
      memberAddClass.value = 'text-success';
      newMember.value = { fullName: '', phone: '', email: '' };
      await fetchMembers(); // refresh the list
      setTimeout(() => {
        showAddMemberModal.value = false;
        memberAddMessage.value = '';
      }, 2000);
    } else {
      memberAddMessage.value = '❌ ' + res.data.message;
      memberAddClass.value = 'text-danger';
    }
  } catch (error) {
    memberAddMessage.value = '❌ Error: ' + (error.response?.data?.message || error.message);
    memberAddClass.value = 'text-danger';
  } finally {
    addingMember.value = false;
  }
};

onMounted(() => {
  fetchMembers();
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
  max-width: 400px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}
/* Touch-friendly button size */
button {
  min-height: 44px;
  touch-action: manipulation;
}
</style>