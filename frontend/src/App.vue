<template>
  <div class="app-bg">
    <div class="center-container">
      <router-view />
    </div>
  </div>
</template>

<script setup>
// Router handles component switching and data flow
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

h1 {
  font-size: 2.5em;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: #ffffff;
}

a {
  font-weight: 500;
  color: #3d7eff;
  text-decoration: none;
}

a:hover {
  color: #1f5eff;
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
</style>
