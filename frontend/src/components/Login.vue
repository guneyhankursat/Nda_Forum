<template>
  <div class="login-card">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" v-model="email" type="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input id="password" v-model="password" type="password" required />
      </div>
      <button type="submit" :disabled="loading">Login</button>
      <div v-if="error" class="error-msg">{{ error }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);
const router = useRouter();

const handleLogin = async () => {
  error.value = '';
  loading.value = true;
  try {
    const response = await axios.post('/api/auth/login', {
      email: email.value,
      password: password.value,
    });
    const { access_token, user } = response.data;
    localStorage.setItem('jwt', access_token);
    localStorage.setItem('user', JSON.stringify(user));
    router.push('/');
  } catch (err) {
    error.value = err?.response?.data?.message || err.message || 'Login failed';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-card {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  color: #1a1a1a;
}
h2 {
  margin-bottom: 1.5rem;
}
.form-group {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}
label {
  margin-bottom: 0.5rem;
  font-weight: 500;
}
input {
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1em;
}
button {
  border-radius: 8px;
  border: none;
  padding: 0.75em 1.5em;
  font-size: 1em;
  font-weight: 600;
  background-color: #3d7eff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 1rem;
}
button:disabled {
  background: #b0c4ff;
  cursor: not-allowed;
}
.error-msg {
  color: red;
  margin-top: 1rem;
}
</style> 