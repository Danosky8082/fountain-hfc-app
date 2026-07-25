<template>
  <div id="app">
    <GlobalLoading />
    <Toast ref="toastRef" />
    <NavBar v-if="authStore.isAuthenticated" />
    <router-view />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useAuthStore } from './stores/auth';
import NavBar from './components/NavBar.vue';
import GlobalLoading from './components/GlobalLoading.vue';
import Toast from './components/Toast.vue';

const authStore = useAuthStore();
const toastRef = ref(null);

// Expose toast globally
onMounted(() => {
  window.$toast = toastRef.value;
  // Restore session
  authStore.restoreSession();
});
</script>