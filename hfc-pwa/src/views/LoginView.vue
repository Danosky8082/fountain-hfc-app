<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-4">
        <div class="card shadow">
          <div class="card-body p-4">
            <!-- Add Logo Here -->
            <div class="text-center">
              <img
                src="/fountain.jpg"
                alt="Fountain of Life Logo"
                class="img-fluid mb-3"
                style="max-height: 80px"
              />
            </div>
            <h3 class="text-center mb-2">Fountain of Life</h3>
            <p class="text-center text-muted">Home Fellowship Centre</p>
            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label class="form-label">Church ID</label>
                <input
                  v-model="churchId"
                  type="text"
                  class="form-control"
                  placeholder="e.g., FT0671NG"
                  required
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Password</label>
                <input
                  v-model="password"
                  type="password"
                  class="form-control"
                  placeholder="••••••••"
                  required
                />
              </div>
              <button
                :disabled="loading"
                type="submit"
                class="btn btn-primary w-100"
              >
                <span
                  v-if="loading"
                  class="spinner-border spinner-border-sm me-2"
                ></span>
                Login
              </button>
              <div v-if="error" class="alert alert-danger mt-3">
                {{ error }}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();
const router = useRouter();
const churchId = ref("");
const password = ref("");
const loading = ref(false);
const error = ref("");

const handleLogin = async () => {
  loading.value = true;
  error.value = "";
  const result = await authStore.login(churchId.value, password.value);
  loading.value = false;
  if (result.success) {
    router.push("/dashboard");
  } else {
    error.value = result.message;
  }
};
</script>
