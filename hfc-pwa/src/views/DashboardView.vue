<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-12">
        <div class="card shadow-sm">
          <div class="card-body">
            <h4>Welcome, {{ authStore.user?.fullName }}</h4>
            <p class="text-muted">{{ authStore.fellowship?.name }} – {{ authStore.fellowship?.location }}</p>
            <hr />
            <div class="row mt-3">
              <div class="col-md-4">
                <div class="card text-white bg-success">
                  <div class="card-body">
                    <h5 class="card-title">📊 Attendance</h5>
                    <router-link to="/attendance" class="btn btn-light btn-sm">View</router-link>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card text-white bg-primary">
                  <div class="card-body">
                    <h5 class="card-title">📷 Scan QR</h5>
                    <router-link to="/scanner" class="btn btn-light btn-sm">Scan</router-link>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card text-white bg-info">
                  <div class="card-body">
                    <h5 class="card-title">📋 Manual Check-in</h5>
                    <router-link to="/manual" class="btn btn-light btn-sm">Check-in</router-link>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-md-6">
                <div class="card text-white bg-warning">
                  <div class="card-body">
                    <h5 class="card-title">📄 Monthly Report</h5>
                    <router-link to="/report" class="btn btn-dark btn-sm">View Report</router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
const authStore = useAuthStore()
</script>