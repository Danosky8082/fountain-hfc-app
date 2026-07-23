<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container">
      <router-link class="navbar-brand" to="/dashboard">
        <img src="/fountain.jpg" alt="Logo" style="height: 30px; margin-right: 8px" />
        Fountain HFC
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/scanner">Scan QR</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/manual">Manual Check-in</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/attendance">Attendance</router-link>
          </li>
          <li class="nav-item" v-if="isAdmin">
            <router-link class="nav-link" to="/members">Members</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/report">Report</router-link>
          </li>
          <li class="nav-item" v-if="isAdminOrHod">
            <router-link class="nav-link" to="/admin/correction">📝 Correction</router-link>
          </li>
          <!-- (Optional) Add HOD Dashboard link here if needed -->
        </ul>
        <button class="btn btn-outline-light" @click="logout">Logout</button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { computed } from "vue";

const authStore = useAuthStore();
const router = useRouter();

// ─── Computed ──────────────────────────────────────────────────
const isAdmin = computed(() => authStore.user?.role === 'ADMIN');
const isAdminOrHod = computed(() => {
  const role = authStore.user?.role;
  return role === 'ADMIN' || role === 'HOD';
});

const logout = () => {
  authStore.logout();
  router.push("/login");
};
</script>