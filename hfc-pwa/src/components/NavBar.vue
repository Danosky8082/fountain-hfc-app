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
          <!-- Common links -->
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

          <!-- Members – Admin only -->
          <li class="nav-item" v-if="isAdmin">
            <router-link class="nav-link" to="/members">Members</router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link" to="/report">Report</router-link>
          </li>

          <!-- Correction – HOD or ADMIN -->
          <li class="nav-item" v-if="isAdminOrHod">
            <router-link class="nav-link" to="/admin/correction">📝 Correction</router-link>
          </li>

          <!-- ⚠️ Temporary debug link – remove later -->
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/correction" style="background: yellow; color: black;">
              🐞 Debug Correction (always visible)
            </router-link>
          </li>
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
const isHod = computed(() => authStore.user?.role === 'HOD');
const isAdminOrHod = computed(() => isAdmin.value || isHod.value);

// ─── Debug (remove after confirming) ──────────────────────────
console.log('🔍 NavBar – user role:', authStore.user?.role);

const logout = () => {
  authStore.logout();
  router.push("/login");
};
</script>