<template>
  <div v-if="show" class="toast-container">
    <div 
      class="toast align-items-center text-white border-0 show" 
      :class="`bg-${type}`" 
      role="alert" 
      aria-live="assertive" 
      aria-atomic="true"
    >
      <div class="d-flex">
        <div class="toast-body d-flex align-items-center">
          <span class="toast-icon me-2">{{ getIcon() }}</span>
          <span>{{ message }}</span>
        </div>
        <button 
          type="button" 
          class="btn-close btn-close-white me-2 m-auto" 
          @click="hide"
          aria-label="Close"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';

// ─── State ──────────────────────────────────────────────────
const show = ref(false);
const message = ref('');
const type = ref('success');
const duration = ref(3000);
let timeoutId = null;
let isVisible = false;

// ─── Toast Queue ──────────────────────────────────────────
const queue = [];

// ─── Get Icon Based on Type ──────────────────────────────
const getIcon = () => {
  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️',
    danger: '❌',
    primary: '📢',
    secondary: '💬',
    light: '📌',
    dark: '🌙'
  };
  return icons[type.value] || '📢';
};

// ─── Show Toast ────────────────────────────────────────────
const showToast = (msg, t = 'success', dur = 3000) => {
  // If toast is currently showing, queue the new message
  if (isVisible) {
    queue.push({ message: msg, type: t, duration: dur });
    return;
  }

  // Display the toast
  message.value = msg;
  type.value = t;
  duration.value = dur;
  show.value = true;
  isVisible = true;

  // Clear any existing timeout
  clearTimeout(timeoutId);

  // Auto-hide after duration
  if (dur > 0) {
    timeoutId = setTimeout(() => {
      hide();
    }, dur);
  }
};

// ─── Hide Toast ────────────────────────────────────────────
const hide = () => {
  show.value = false;
  isVisible = false;
  clearTimeout(timeoutId);
  
  // Process next toast in queue after a small delay
  setTimeout(() => {
    if (queue.length > 0) {
      const nextToast = queue.shift();
      showToast(nextToast.message, nextToast.type, nextToast.duration);
    }
  }, 300);
};

// ─── Toast Methods ────────────────────────────────────────
const success = (msg, dur = 3000) => showToast(msg, 'success', dur);
const error = (msg, dur = 3000) => showToast(msg, 'error', dur);
const warning = (msg, dur = 3000) => showToast(msg, 'warning', dur);
const info = (msg, dur = 3000) => showToast(msg, 'info', dur);

// ─── Clear All Toasts ─────────────────────────────────────
const clearAll = () => {
  queue.length = 0;
  clearTimeout(timeoutId);
  show.value = false;
  isVisible = false;
};

// ─── Watch for changes ────────────────────────────────────
watch(show, (newVal) => {
  if (!newVal) {
    isVisible = false;
  }
});

// ─── Lifecycle Hooks ──────────────────────────────────────
onMounted(() => {
  console.log('✅ Toast component mounted');
});

onUnmounted(() => {
  clearAll();
  clearTimeout(timeoutId);
});

// ─── Expose Methods ───────────────────────────────────────
defineExpose({
  show: showToast,
  showToast,
  success,
  error,
  warning,
  info,
  hide,
  clearAll
});
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  max-width: 400px;
  width: 100%;
  pointer-events: none;
}

.toast-container .toast {
  pointer-events: auto;
  min-width: 280px;
  max-width: 100%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  animation: slideInRight 0.3s ease forwards;
  margin-bottom: 10px;
}

.toast-body {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  font-size: 14px;
  line-height: 1.5;
  flex: 1;
}

.toast-icon {
  font-size: 20px;
  flex-shrink: 0;
}

.btn-close {
  flex-shrink: 0;
  padding: 8px;
  opacity: 0.8;
}

.btn-close:hover {
  opacity: 1;
}

/* Toast type colors */
.bg-success {
  background-color: #28a745 !important;
}

.bg-error {
  background-color: #dc3545 !important;
}

.bg-danger {
  background-color: #dc3545 !important;
}

.bg-warning {
  background-color: #ffc107 !important;
  color: #000 !important;
}

.bg-info {
  background-color: #17a2b8 !important;
}

.bg-primary {
  background-color: #007bff !important;
}

.bg-secondary {
  background-color: #6c757d !important;
}

.bg-dark {
  background-color: #343a40 !important;
}

.bg-light {
  background-color: #f8f9fa !important;
  color: #000 !important;
}

/* Animations */
@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOutRight {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}

.toast-container .toast.removing {
  animation: slideOutRight 0.3s ease forwards;
}

/* Responsive Design */
@media (max-width: 768px) {
  .toast-container {
    top: 10px;
    right: 10px;
    left: 10px;
    max-width: 100%;
  }
  
  .toast-container .toast {
    min-width: auto;
    width: 100%;
  }
  
  .toast-body {
    font-size: 13px;
    padding: 10px 14px;
  }
}

@media (max-width: 480px) {
  .toast-container {
    top: 5px;
    right: 5px;
    left: 5px;
  }
  
  .toast-body {
    font-size: 12px;
    padding: 8px 12px;
  }
  
  .toast-icon {
    font-size: 16px;
  }
}
</style>