<template>
  <div class="card">
    <div class="icon-title-row">
      <span class="emoji">🤝</span>
      <h1 class="title">NDA Clause Checker</h1>
    </div>
    <div v-if="user" class="user-info">
      <span>Logged in as: <b>{{ user.email }}</b></span>
      <button @click="handleLogout" class="logout-btn">Logout</button>
    </div>
    <form @submit.prevent="handleSubmit" class="nda-form">
      <label for="nda-input" class="nda-label">Paste your NDA text:</label>
      <textarea
        id="nda-input"
        v-model="ndaText"
        required
        rows="8"
        placeholder="Paste your NDA here..."
        class="nda-textarea"
      ></textarea>

      <button type="submit" :disabled="loading" class="submit-btn">
        <span v-if="loading">
          <svg class="spinner" viewBox="0 0 50 50">
            <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
          </svg>
          Checking...
        </span>
        <span v-else>Check NDA</span>
      </button>

      <div v-if="error" class="error-msg">
        {{ error }}
      </div>
    </form>

    <!-- Results Section -->
    <div v-if="results" class="results-section">
      <h3>Analysis Results</h3>
      
      <!-- AI Analysis Results -->
      <div v-if="results.confidentiality || results.term || results.jurisdiction || results.remedies || results.exclusions || results.signatures" class="ai-results">
        <div class="ai-header">
          <span class="ai-icon">🤖</span>
          <span class="ai-title">AI-Powered Analysis</span>
        </div>
        <div class="clauses-container">
          <ClauseStatus 
            v-for="(data, clauseName) in results" 
            :key="clauseName"
            :clauseName="clauseName"
            :data="data"
          />
        </div>
      </div>

      <!-- Fallback Results (when AI is not available) -->
      <div v-else-if="results.fallback" class="fallback-results">
        <div class="fallback-header">
          <span class="fallback-icon">📋</span>
          <span class="fallback-title">Basic Pattern Analysis</span>
        </div>
        <div class="fallback-message">
          {{ results.message }}
        </div>
        <div class="clauses-container">
          <ClauseStatus 
            v-for="(data, clauseName) in results.fallback" 
            :key="clauseName"
            :clauseName="clauseName"
            :data="data"
          />
        </div>
      </div>

      <!-- Error or Raw Results -->
      <div v-else class="raw-results">
        <pre class="raw-data">{{ JSON.stringify(results, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { checkNdaAI } from '@/services/api.js';
import ClauseStatus from './ClauseStatus.vue';

const props = defineProps({
  onResults: {
    type: Function,
    required: false
  }
});

const ndaText = ref('');
const loading = ref(false);
const error = ref('');
const results = ref(null);
const router = useRouter();
const user = ref(null);

onMounted(() => {
  const jwt = localStorage.getItem('jwt');
  const userStr = localStorage.getItem('user');
  if (!jwt) {
    router.push('/login');
  } else {
    user.value = userStr ? JSON.parse(userStr) : null;
  }
});

const handleSubmit = async () => {
  error.value = '';
  loading.value = true;
  results.value = null;
  try {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      router.push('/login');
      return;
    }
    console.log('Submitting NDA text:', ndaText.value.substring(0, 100) + '...');
    const apiResults = await checkNdaAI(ndaText.value, jwt);
    console.log('API Response:', apiResults);
    results.value = apiResults;
    if (props.onResults) props.onResults(apiResults);
  } catch (err) {
    console.error('Error in handleSubmit:', err);
    error.value = err?.message || String(err) || 'An error occurred';
  } finally {
    loading.value = false;
  }
};

const handleLogout = () => {
  localStorage.removeItem('jwt');
  localStorage.removeItem('user');
  router.push('/login');
};
</script>

<style scoped>
:root {
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  line-height: 1.6;
  font-weight: 400;
  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.92);
  background-color: #1e1e1e;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 320px;
  min-height: 100vh;
  background-color: #1e1e1e;
  padding: 1rem;
}

#app {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  box-sizing: border-box;
  text-align: center;
}

.card {
  width: 100%;
  max-width: 600px;
  padding: 2rem;
  margin: 1rem auto;
  background-color: #f7f7f8;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  color: #1a1a1a;
  box-sizing: border-box;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.icon-title-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  margin-bottom: 1rem;
}

.emoji {
  font-size: 1.75rem;
  color: #1a1a1a;
}

h1.title {
  font-size: 2rem;
  color: #1a1a1a;
  margin: 0;
}

.nda-label {
  margin-bottom: 0.5rem;
  font-weight: 500;
}

textarea {
  width: 100%;
  max-width: 500px;
  height: 150px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1em;
  resize: vertical;
  box-sizing: border-box;
}

button {
  border-radius: 8px;
  border: none;
  padding: 0.75em 1.5em;
  font-size: 1em;
  font-weight: 600;
  font-family: inherit;
  background-color: #3d7eff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 1.5rem;
}

button:hover {
  background-color: #1f5eff;
}

button:focus,
button:focus-visible {
  outline: 3px solid #a3c0ff;
  outline-offset: 2px;
}

.spinner {
  width: 1em;
  height: 1em;
  margin-right: 0.5em;
  animation: spin 1s linear infinite;
}

.spinner .path {
  stroke: white;
  stroke-linecap: round;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.error-msg {
  color: red;
  margin-top: 1rem;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #1a1a1a;
    background-color: #ffffff;
  }

  .card {
    background-color: #ffffff;
    color: #1a1a1a;
  }

  a:hover {
    color: #1f5eff;
  }

  button {
    background-color: #3d7eff;
  }
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}
.logout-btn {
  background: #ff4d4f;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.5em 1em;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s;
}
.logout-btn:hover {
  background: #d9363e;
}

.results-section {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.results-section h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: #1a1a1a;
}

.ai-results {
  margin-bottom: 1rem;
}

.ai-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.ai-icon {
  font-size: 1.5rem;
  color: #1a1a1a;
}

.ai-title {
  font-size: 1.5rem;
  color: #1a1a1a;
  margin: 0;
}

.fallback-results {
  margin-bottom: 1rem;
}

.fallback-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.fallback-icon {
  font-size: 1.5rem;
  color: #1a1a1a;
}

.fallback-title {
  font-size: 1.5rem;
  color: #1a1a1a;
  margin: 0;
}

.fallback-message {
  color: #d35400;
  margin-bottom: 1rem;
  font-style: italic;
}

.clauses-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.raw-results {
  margin-top: 1rem;
}

.raw-data {
  background-color: #f7f7f8;
  padding: 1rem;
  border-radius: 8px;
  overflow-wrap: break-word;
}
</style>
