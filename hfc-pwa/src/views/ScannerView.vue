<template>
  <div class="container mt-4">
    <h4>📷 Check-in Options</h4>

    <div v-if="!scanError">
      <p class="text-muted">Point your camera at a member's QR code.</p>
      <div id="qr-reader" class="qr-reader"></div>
    </div>

    <div v-if="scanError" class="alert alert-warning mt-3">
      <h5>⚠️ Camera Not Available</h5>
      <p>{{ scanError }}</p>
      <p class="small">
        This usually happens when the page is loaded over HTTP instead of HTTPS, or permissions are blocked.
      </p>
      <button class="btn btn-primary btn-sm" @click="goToManual">Go to Manual Check-in</button>
    </div>

    <!-- Manual fallback -->
    <div class="mt-3">
      <label class="form-label">Or enter Member ID manually:</label>
      <div class="input-group">
        <input v-model="manualMemberId" type="text" class="form-control" placeholder="Paste member ID from list..." />
        <button class="btn btn-outline-success" @click="markManualPresent">Check-in</button>
      </div>
      <small class="text-muted">You can find Member IDs in the Manual Check-in list.</small>
    </div>

    <div v-if="scanResult" class="alert alert-success mt-3">
      ✅ Scanned: <strong>{{ scanResult }}</strong>
      <button class="btn btn-success btn-sm ms-2" @click="markPresent">Mark Present</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { Html5Qrcode } from 'html5-qrcode'
import api from '../services/api'

const router = useRouter()
const scanResult = ref(null)
const scanError = ref(null)
const manualMemberId = ref('')
let html5QrCode = null

// ✅ Safe cleanup – stop first, then clear
const stopScanner = async () => {
  if (html5QrCode) {
    try {
      // Check if scanning is active
      if (html5QrCode.isScanning) {
        await html5QrCode.stop()
      }
      await html5QrCode.clear()
    } catch (err) {
      console.warn('Scanner cleanup warning:', err.message)
    }
    html5QrCode = null
  }
}

onMounted(() => {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    scanError.value = 'Camera not supported on this device/browser.'
    return
  }

  try {
    html5QrCode = new Html5Qrcode('qr-reader')
    html5QrCode.start(
      { facingMode: 'environment' },
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      (decodedText) => {
        scanResult.value = decodedText
        // Stop scanning after successful scan
        if (html5QrCode && html5QrCode.isScanning) {
          html5QrCode.stop().catch(() => {})
        }
      },
      (error) => {
        // Ignore continuous scan errors
        if (error && error.includes('Permission')) {
          scanError.value = 'Permission denied. Please allow camera access in browser settings.'
        }
      }
    ).catch((err) => {
      console.error('QR Start Error:', err)
      if (err.name === 'NotAllowedError') {
        scanError.value = 'Camera permission blocked. Please enable camera for this site in your browser settings (lock icon).'
      } else if (err.name === 'NotFoundError' || err.name === 'NotReadableError') {
        scanError.value = 'No camera found or camera busy. Try closing other apps using the camera.'
      } else {
        scanError.value = `Camera unavailable: ${err.message}. Try using Manual Check-in.`
      }
    })
  } catch (err) {
    scanError.value = 'Failed to initialize scanner. Please use Manual Check-in.'
  }
})

onUnmounted(() => {
  // ✅ Clean up on unmount
  stopScanner()
})

const goToManual = () => {
  stopScanner()
  router.push('/manual')
}

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
      // Restart scanner after check‑in
      if (html5QrCode && !html5QrCode.isScanning) {
        html5QrCode.start(
          { facingMode: 'environment' },
          { fps: 10, qrbox: { width: 250, height: 250 } },
          (decodedText) => {
            scanResult.value = decodedText
            if (html5QrCode && html5QrCode.isScanning) {
              html5QrCode.stop().catch(() => {})
            }
          },
          (error) => {}
        ).catch(() => {})
      }
    } else {
      alert('❌ Failed: ' + response.data.message)
    }
  } catch (error) {
    alert('Error marking attendance')
  }
}

const markManualPresent = async () => {
  if (!manualMemberId.value) {
    alert('Please enter a Member ID.')
    return
  }
  try {
    const response = await api.post('/attendance/mark', {
      memberId: manualMemberId.value.trim(),
      checkInMethod: 'MANUAL'
    })
    if (response.data.success) {
      alert('✅ Check-in successful!')
      manualMemberId.value = ''
    } else {
      alert('❌ Failed: ' + response.data.message)
    }
  } catch (error) {
    alert('Error marking attendance')
  }
}
</script>

<style scoped>
/* optional styling */
</style>