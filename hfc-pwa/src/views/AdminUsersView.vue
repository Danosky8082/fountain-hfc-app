<template>
  <div class="container mt-4">
    <h4>👥 User Management</h4>
    <p class="text-muted">View and manage all system users.</p>

    <div v-if="loading" class="text-center"><LoadingSpinner /></div>
    <div v-else-if="users.length === 0" class="alert alert-info">No users found.</div>
    <div v-else>
      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Church ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="u in users" :key="u.id">
            <td>{{ u.churchId }}</td>
            <td>{{ u.fullName }}</td>
            <td>{{ u.email }}</td>
            <td>
              <select v-model="u.role" class="form-control form-control-sm" @change="onRoleChange(u)">
                <option value="FL">FL</option>
                <option value="ASSOCIATE">ASSOCIATE</option>
                <option value="HOD">HOD</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </td>
            <td>
              <button class="btn btn-sm btn-success" @click="saveRole(u)" :disabled="saving[u.id]">
                <span v-if="saving[u.id]" class="spinner-border spinner-border-sm me-1"></span>
                Save
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner.vue';

const loading = ref(true);
const users = ref([]);
const saving = ref({});
const originalRoles = ref({});

const fetchUsers = async () => {
  try {
    const res = await api.get('/admin/users');
    if (res.data.success) {
      users.value = res.data.data;
      originalRoles.value = users.value.reduce((acc, u) => {
        acc[u.id] = u.role;
        return acc;
      }, {});
    }
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
};

const onRoleChange = (user) => {
  // Optional: highlight that the role changed
};

const saveRole = async (user) => {
  const original = originalRoles.value[user.id];
  if (original === user.role) {
    alert('Role unchanged.');
    return;
  }

  if (!confirm(`Change ${user.fullName}'s role from ${original} to ${user.role}?`)) {
    user.role = original;
    return;
  }

  saving.value[user.id] = true;
  try {
    const res = await api.put(`/admin/user/${user.id}`, { role: user.role });
    if (res.data.success) {
      alert('✅ Role updated!');
      originalRoles.value[user.id] = user.role;
    } else {
      alert('❌ ' + res.data.message);
      user.role = original;
    }
  } catch (e) {
    alert('❌ Error: ' + (e.response?.data?.message || e.message));
    user.role = original;
  } finally {
    saving.value[user.id] = false;
  }
};

onMounted(fetchUsers);
</script>