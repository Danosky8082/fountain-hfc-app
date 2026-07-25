<template>
  <div class="container mt-4">
    <h2>📘 User Guide – Fountain HFC</h2>
    <p class="text-muted">Quick reference for all roles.</p>

    <div class="accordion" id="helpAccordion">
      <!-- FL -->
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#flHelp">
            👤 Fellowship Leader (FL)
          </button>
        </h2>
        <div id="flHelp" class="accordion-collapse collapse show" data-bs-parent="#helpAccordion">
          <div class="accordion-body">
            <ul>
              <li><strong>Scan QR</strong> – Mark attendance by scanning member QR codes.</li>
              <li><strong>Manual Check‑in</strong> – Mark members present without scanning (lost cards).</li>
              <li><strong>Attendance</strong> – View current week; submit or force‑submit.</li>
              <li><strong>Report</strong> – View monthly report, fill pastoral questions, save draft, finalize, download PDF.</li>
              <li><strong>Dashboard</strong> – Quick access to all functions.</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- HOD -->
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#hodHelp">
            📊 Head of Department (HOD)
          </button>
        </h2>
        <div id="hodHelp" class="accordion-collapse collapse" data-bs-parent="#helpAccordion">
          <div class="accordion-body">
            <ul>
              <li><strong>HOD Dashboard</strong> – View all fellowships’ reports; filter by month, fellowship, status; export CSV, download PDFs.</li>
              <li><strong>Correction</strong> – Correct attendance for any past week (Admin/HOD only).</li>
              <li><strong>Users</strong> – View all system users (Admin/HOD only).</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Admin -->
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#adminHelp">
            ⚙️ Admin
          </button>
        </h2>
        <div id="adminHelp" class="accordion-collapse collapse" data-bs-parent="#helpAccordion">
          <div class="accordion-body">
            <ul>
              <li><strong>Admin Panel</strong> – Create fellowships, members, system users.</li>
              <li><strong>Manage Fellowships</strong> – Edit/delete fellowships (click member count to see members).</li>
              <li><strong>Add Member</strong> – Add members to any fellowship.</li>
              <li><strong>Create System User</strong> – Create FL, HOD, ADMIN users.</li>
              <li><strong>Batch QR</strong> – Download QR codes for all members as ZIP.</li>
              <li><strong>Export Data</strong> – Backup all data as CSV (ZIP).</li>
              <li><strong>Correction</strong> – Correct attendance for any week.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No additional logic needed – static guide
</script>

<style scoped>
.accordion-button:not(.collapsed) {
  background-color: #e7f1ff;
  color: #0c63e4;
}
</style>