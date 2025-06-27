<template>
  <div class="app-wrapper">
    <Header />
    <main class="main-content">
      <slot />
    </main>
  </div>
</template>

<script setup>
import Header from '~/components/Header.vue'
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%);
  font-family: 'Poppins', sans-serif;
  color: #f0f0f0;
}

.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: transparent;
  margin: 0;
  padding: 0;
}

.main-content {
  flex: 1;
  max-width: 720px;
  margin: 2rem auto;
  padding: 2rem;
  background: #1e1e2f;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.7);
  color: #e0e0e0;
}

input, textarea {
  width: 100%;
  padding: 0.85rem 1.25rem;
  border-radius: 14px;
  border: 1.5px solid #44476a;
  font-size: 1rem;
  font-weight: 500;
  color: #d1d5db;
  background-color: #2c2c46;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  resize: vertical;
  box-sizing: border-box;
}

input::placeholder,
textarea::placeholder {
  color: #9ca3af;
}

input:focus, textarea:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 12px rgba(99,102,241,0.7);
}

button {
  background: #6366f1;
  color: white;
  font-weight: 700;
  font-size: 1.15rem;
  padding: 0.85rem 2.5rem;
  border-radius: 16px;
  border: none;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(99,102,241,0.7);
  transition: background 0.4s ease, box-shadow 0.3s ease;
  display: block;
  margin: 1.5rem auto 0 auto;
}

button:hover {
  background: #4f46e5;
  box-shadow: 0 10px 30px rgba(79,70,229,0.8);
}

</style>
