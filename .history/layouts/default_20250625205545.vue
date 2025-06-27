<template>
  <div>
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
/* Style global, appliqué à toutes les pages */

body {
  margin: 0;
  font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f0f4f8;
  color: #222;
}

a {
  color: #3b82f6;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.main-content {
  max-width: 900px;
  margin: 2rem auto;
  padding: 1rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgb(59 130 246 / 0.15);
}

input, textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input:focus, textarea:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 8px rgba(37, 99, 235, 0.5);
}

button {
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #1e40af;
}

/* Table styling */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  border-radius: 8px;
  overflow: hidden;
}

th, td {
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  text-align: left;
}

th {
  background-color: #3b82f6;
  color: white;
}

tbody tr:hover {
  background-color: #bfdbfe;
}

/* Responsive */
@media (max-width: 640px) {
  .main-content {
    margin: 1rem;
    padding: 0.5rem;
  }
  
  table, thead, tbody, th, td, tr {
    display: block;
  }
  
  th, td {
    padding: 0.5rem;
    border: none;
    border-bottom: 1px solid #e5e7eb;
  }
  
  tr {
    margin-bottom: 1rem;
  }
  
  th {
    background-color: transparent;
    color: #2563eb;
    font-weight: 700;
  }
}
</style>
