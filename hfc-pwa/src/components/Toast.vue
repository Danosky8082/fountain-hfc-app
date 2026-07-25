<template>
  <div v-if="show" class="toast-container">
    <div class="toast align-items-center text-white bg-success border-0" :class="'bg-' + type" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">
          {{ message }}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" @click="hide"></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineExpose } from 'vue';

const show = ref(false);
const message = ref('');
const type = ref('success');
let timeoutId = null;

const showToast = (msg, t = 'success') => {
  message.value = msg;
  type.value = t;
  show.value = true;
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => { show.value = false; }, 3000);
};

const hide = () => {
  show.value = false;
  clearTimeout(timeoutId);
};

defineExpose({ showToast });
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10000;
}
.toast {
  min-width: 250px;
}
</style>