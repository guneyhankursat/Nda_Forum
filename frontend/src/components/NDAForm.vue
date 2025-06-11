<template>
  <div class="card">
    <div class="icon-title-row">
      <span class="emoji">🤝</span>
      <h1 class="title">NDA Clause Checker</h1>
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
          <svg class="spinner" viewBox="0 0 50 50"><circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle></svg>
          Checking...
        </span>
        <span v-else>Check NDA</span>
      </button>
      <div v-if="error" class="error-msg">
        {{ error }}
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { checkNdaAI } from '@/services/api.js';

const props = defineProps({
  onResults: {
    type: Function,
    required: true
  }
});

const ndaText = ref('');
const loading = ref(false);
const error = ref('');

const handleSubmit = async () => {
  error.value = '';
  loading.value = true;
  try {
    const results = await checkNdaAI(ndaText.value);
    props.onResults(results);
  } catch (err) {
    error.value = err?.message || String(err) || 'An error occurred';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.card {
  background: rgba(247, 250, 252, 0.97);
  border-radius: 20px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.22);
  padding: 2.5rem 2rem 2rem 2rem;
  width: 100%;
  max-width: 480px;
  min-width: 0;
  margin: 0 auto;
  animation: fadeIn 0.8s cubic-bezier(.8,-0.6,0.2,1.5);
  backdrop-filter: blur(4px);
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (max-width: 600px) {
  .card {
    padding: 1.2rem 0.5rem;
    max-width: 99vw;
  }
}

@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(30px);}
  100% { opacity: 1; transform: translateY(0);}
}

.icon-title-row {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 0.8rem;
  justify-content: center;
  width: 100%;
}

.emoji {
  font-size: 1.5rem;
}

.title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: #293145;
  margin: 0;
  letter-spacing: 0.01em;
}

.nda-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #394150;
  font-size: 1rem;
  text-align: left;
  width: 100%;
}

.nda-textarea {
  width: 100%;
  font-family: inherit;
  font-size: 1rem;
  border-radius: 10px;
  border: 1.5px solid #d1d5db;
  background: #f8fafc;
  padding: 1rem;
  margin-bottom: 1.2rem;
  resize: vertical;
  box-sizing: border-box;
  transition: border-color 0.2s;
  color: #23272f;
  min-height: 130px;
}

.nda-textarea:focus {
  outline: none;
  border-color: #4676fa;
  background: #fff;
}

.submit-btn {
  width: 100%;
  padding: 0.85rem 0;
  font-size: 1.08rem;
  font-weight: 600;
  border: none;
  border-radius: 9px;
  background: linear-gradient(90deg, #4676fa 0%, #5f9cff 100%);
  color: #fff;
  cursor: pointer;
  box-shadow: 0 4px 15px 0 rgba(70, 118, 250, 0.08);
  transition: background 0.18s, transform 0.1s;
  margin-bottom: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
}
.submit-btn:active {
  transform: scale(0.98);
}
.submit-btn:disabled {
  background: #bfc9da;
  color: #7b849c;
  cursor: not-allowed;
}

.spinner {
  width: 20px;
  height: 20px;
  margin-right: 7px;
  animation: spin 1s linear infinite;
  vertical-align: middle;
}
@keyframes spin {
  100% { transform: rotate(360deg); }
}
.spinner .path {
  stroke: #fff;
  stroke-linecap: round;
}

.error-msg {
  color: #c00;
  font-weight: 500;
  background: #fee;
  border: 1px solid #faa;
  border-radius: 8px;
  padding: 0.7rem 1rem;
  margin-top: 0.75rem;
  text-align: center;
  font-size: 1rem;
}
</style>