<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-12">
        <div class="card shadow-sm">
          <div class="card-body">
            <h4>Welcome, {{ authStore.user?.fullName }}</h4>
            <p class="text-muted">{{ authStore.fellowship?.name }} – {{ authStore.fellowship?.location }}</p>
            <hr />
            <div class="row g-2 mt-3">
              <div class="col-6 col-md-4">
                <div class="card text-white bg-success h-100">
                  <div class="card-body d-flex flex-column">
                    <h5 class="card-title">📊 Attendance</h5>
                    <router-link to="/attendance" class="btn btn-light btn-sm mt-auto">View</router-link>
                  </div>
                </div>
              </div>
              <div class="col-6 col-md-4">
                <div class="card text-white bg-primary h-100">
                  <div class="card-body d-flex flex-column">
                    <h5 class="card-title">📷 Scan QR</h5>
                    <router-link to="/scanner" class="btn btn-light btn-sm mt-auto">Scan</router-link>
                  </div>
                </div>
              </div>
              <div class="col-6 col-md-4">
                <div class="card text-white bg-info h-100">
                  <div class="card-body d-flex flex-column">
                    <h5 class="card-title">📋 Manual Check-in</h5>
                    <router-link to="/manual" class="btn btn-light btn-sm mt-auto">Check-in</router-link>
                  </div>
                </div>
              </div>
              <div class="col-6 col-md-6">
                <div class="card text-white bg-warning h-100">
                  <div class="card-body d-flex flex-column">
                    <h5 class="card-title">📄 Report</h5>
                    <router-link to="/report" class="btn btn-dark btn-sm mt-auto">View Report</router-link>
                  </div>
                </div>
              </div>
              <!-- Admin/HOD cards can be added here if needed -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth';
const authStore = useAuthStore();
</script>