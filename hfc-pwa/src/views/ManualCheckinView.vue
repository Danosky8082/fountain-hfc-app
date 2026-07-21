<template>
  <div class="container mt-4">
    <h4>📋 Manual Check-in</h4>
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
  // Use your backend IP/port – adjust if needed
  window.open(`http://192.168.69.125:5000/api/qr/member/${memberId}`, "_blank");
};

onMounted(() => {
  fetchMembers();
});
</script>
