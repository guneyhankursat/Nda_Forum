<template>
  <div class="app-bg">
    <div class="center-container">
      <NDAForm :onResults="onResults" />
      <div v-if="results" class="results-card">
        <h2 class="results-title">Results</h2>
        <pre class="results-content">{{ results }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NDAForm from './components/NDAForm.vue'

const results = ref(null)

function onResults(res) {
  results.value = res
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Inter:400,600&display=swap');

.app-bg {
  min-height: 100vh;
  min-width: 100vw;
  background: linear-gradient(135deg, #232526 0%, #414345 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', Arial, sans-serif;
}

.center-container {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.results-card {
  margin-top: 2.5rem;
  background: rgba(247, 250, 252, 0.96);
  border-radius: 18px;
  box-shadow: 0 4px 20px 0 rgba(31, 38, 135, 0.15);
  padding: 1.5rem 1.5rem 1.1rem 1.5rem;
  width: 100%;
  max-width: 520px;
  word-break: break-word;
  animation: fadeIn 0.75s cubic-bezier(.8,-0.6,0.2,1.5);
}

.results-title {
  margin: 0 0 0.8rem 0;
  font-size: 1.25rem;
  color: #293145;
  font-weight: 600;
  letter-spacing: 0.01em;
}

.results-content {
  white-space: pre-wrap;
  font-size: 1rem;
  color: #23272f;
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  font-family: 'Inter', monospace, monospace;
}

@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(24px);}
  100% { opacity: 1; transform: translateY(0);}
}
</style>