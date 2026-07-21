<template>
  <div class="container mt-4">
    <h4>📷 Scan QR Code</h4>
    <p class="text-muted">Point your camera at a member's QR code.</p>
    <div id="qr-reader" class="qr-reader"></div>
    <div v-if="scanResult" class="alert alert-success mt-3">
      ✅ Scanned: <strong>{{ scanResult }}</strong>
      <button class="btn btn-success btn-sm ms-2" @click="markPresent">Mark Present</button>
    </div>
    <div v-if="scanError" class="alert alert-danger mt-3">{{ scanError }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Html5Qrcode } from 'html5-qrcode'
import api from '../services/api'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const scanResult = ref(null)
const scanError = ref(null)
let html5QrCode = null

onMounted(() => {
  html5QrCode = new Html5Qrcode('qr-reader')
  html5QrCode.start(
    { facingMode: 'environment' },
    {
      fps: 10,
      qrbox: { width: 250, height: 250 },
    },
    (decodedText) => {
      scanResult.value = decodedText
      html5QrCode.stop()
    },
    (error) => {}
  ).catch((err) => {
    scanError.value = 'Camera access denied or unavailable. Please allow camera permissions.'
    console.error(err)
  })
})

onUnmounted(() => {
  if (html5QrCode) {
    html5QrCode.stop()
    html5QrCode.clear()
  }
})

const markPresent = async () => {
  if (!scanResult.value) return
  try {
    const response = await api.post('/attendance/mark', {
      memberId: scanResult.value,
      checkInMethod: 'QR_SCAN'
    })
    if (response.data.success) {
      alert('✅ Check-in successful!')
      scanResult.value = null
      html5QrCode.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          scanResult.value = decodedText
          html5QrCode.stop()
        },
        (error) => {}
      )
    } else {
      alert('❌ Failed: ' + response.data.message)
    }
  } catch (error) {
    alert('Error marking attendance')
  }
}
</script>