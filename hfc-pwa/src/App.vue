<template>
  <div id="app">
    <GlobalLoading />
    <Toast ref="toastRef" />
    <NavBar v-if="authStore.isAuthenticated" />
    <router-view />
  </div>
</template>

<script setup>
import Toast from './components/Toast.vue';
import { ref, onMounted } from 'vue';
import GlobalLoading from './components/GlobalLoading.vue';
import { onMounted } from 'vue';
import { useAuthStore } from './stores/auth';
import NavBar from './components/NavBar.vue';

const authStore = useAuthStore();

const toastRef = ref(null);

onMounted(() => {
  window.$toast = toastRef.value;
});
</script>