<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-4">
        <div class="card shadow">
          <div class="card-body p-4">
            <div class="text-center">
              <img src="/fountain.jpg" alt="Logo" class="img-fluid mb-3" style="max-height: 80px;" />
            </div>
            <h3 class="text-center mb-2">Fountain of Life</h3>
            <p class="text-center text-muted">Home Fellowship Centre</p>

            <!-- Step 1: Church ID -->
            <form v-if="!otpSent" @submit.prevent="requestOTP">
              <div class="mb-3">
                <label class="form-label">Church ID</label>
                <input v-model="churchId" type="text" class="form-control" placeholder="e.g., FT0671NG" required />
              </div>
              <button :disabled="loading" type="submit" class="btn btn-primary w-100">
                <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                Send OTP
              </button>
              <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
              <div v-if="message" class="alert alert-success mt-3">{{ message }}</div>
            </form>

            <!-- Step 2: OTP -->
            <form v-else @submit.prevent="verifyOTP">
              <p class="text-muted">Enter the 6‑digit code sent to your email.</p>
              <div class="mb-3">
                <label class="form-label">OTP</label>
                <input v-model="otp" type="text" class="form-control" placeholder="123456" maxlength="6" required />
              </div>
              <button :disabled="loading" type="submit" class="btn btn-success w-100">
                <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                Verify OTP
              </button>
              <button type="button" class="btn btn-link btn-sm mt-2" @click="resendOTP">Resend OTP</button>
              <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
            </form>

            <!-- Password login link (for HOD/ADMIN) -->
            <div class="mt-3 text-center">
              <a href="#" @click.prevent="showPasswordLogin = !showPasswordLogin">
                {{ showPasswordLogin ? 'Back to OTP login' : 'Login with password (HOD/Admin only)' }}
              </a>
            </div>

            <!-- Password Login (collapsible) -->
            <form v-if="showPasswordLogin" @submit.prevent="handlePasswordLogin" class="mt-3">
              <div class="mb-3">
                <label class="form-label">Church ID</label>
                <input v-model="passwordChurchId" type="text" class="form-control" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Password</label>
                <input v-model="password" type="password" class="form-control" required />
              </div>
              <button :disabled="loading" type="submit" class="btn btn-secondary w-100">
                <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                Login
              </button>
              <div v-if="passwordError" class="alert alert-danger mt-3">{{ passwordError }}</div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import api from '../services/api';

const router = useRouter();
const authStore = useAuthStore();

const churchId = ref('');
const otp = ref('');
const userId = ref(null);
const otpSent = ref(false);
const loading = ref(false);
const error = ref('');
const message = ref('');
const showPasswordLogin = ref(false);
const passwordChurchId = ref('');
const password = ref('');
const passwordError = ref('');

const requestOTP = async () => {
  loading.value = true;
  error.value = '';
  message.value = '';
  try {
    const res = await api.post('/auth/request-otp', { churchId: churchId.value });
    if (res.data.success) {
      userId.value = res.data.data.userId;
      otpSent.value = true;
      message.value = 'OTP sent to your email.';
    } else {
      error.value = res.data.message;
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Error requesting OTP.';
  } finally {
    loading.value = false;
  }
};

const verifyOTP = async () => {
  loading.value = true;
  error.value = '';
  try {
    const res = await api.post('/auth/verify-otp', {
      userId: userId.value,
      otp: otp.value,
    });
    if (res.data.success) {
      const { user, fellowship, token } = res.data.data;
      authStore.user = user;
      authStore.fellowship = fellowship;
      authStore.token = token;
      authStore.isAuthenticated = true;
      localStorage.setItem('jwt_token', token);
      router.push('/dashboard');
    } else {
      error.value = res.data.message;
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Error verifying OTP.';
  } finally {
    loading.value = false;
  }
};

const resendOTP = async () => {
  otp.value = '';
  await requestOTP();
};

const handlePasswordLogin = async () => {
  loading.value = true;
  passwordError.value = '';
  try {
    const result = await authStore.login(passwordChurchId.value, password.value);
    if (result.success) {
      router.push('/dashboard');
    } else {
      passwordError.value = result.message;
    }
  } catch (err) {
    passwordError.value = err.response?.data?.message || 'Login failed.';
  } finally {
    loading.value = false;
  }
};
</script>