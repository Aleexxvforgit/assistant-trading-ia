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
  background: #0f111a;
  font-family: 'Poppins', sans-serif;
  color: #cbd5e1;
}

.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: transparent;
  margin: 0;
  padding: 0;
}

nav.nav-bar {
  background: #121726;
  box-shadow: 0 4px 12px rgba(27, 38, 71, 0.8);
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-bar ul {
  display: flex;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2.5rem;
}

.nav-bar ul li a {
  font-weight: 600;
  font-size: 1.1rem;
  color: #3b82f6;
  text-decoration: none;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.3s ease;
}

.nav-bar ul li a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0%;
  height: 3px;
  background: #3b82f6;
  transition: width 0.3s ease;
  border-radius: 3px;
}

.nav-bar ul li a:hover,
.nav-bar ul li a.router-link-active {
  color: #2563eb;
}

.nav-bar ul li a:hover::after,
.nav-bar ul li a.router-link-active::after {
  width: 100%;
}

.main-content {
  flex: 1;
  max-width: 720px;
  margin: 2rem auto;
  padding: 2rem;
  background: #121726;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(27, 38, 71, 0.9);
  color: #cbd5e1;
}

h1, h2 {
  color: #cbd5e1;
  text-align: center;
  margin-bottom: 1rem;
  font-weight: 700;
}

input, textarea {
  width: 100%;
  padding: 0.85rem 1.25rem;
  border-radius: 14px;
  border: 1.5px solid #2c3a99;
  font-size: 1rem;
  font-weight: 500;
  color: #cbd5e1;
  background-color: #1c2748;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  resize: vertical;
  box-sizing: border-box;
}

input::placeholder,
textarea::placeholder {
  color: #6b7bbf;
}

input:focus, textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 12px rgba(59, 130, 246, 0.7);
}

button {
  background: #3b82f6;
  color: white;
  font-weight: 700;
  font-size: 1.15rem;
  padding: 0.85rem 2.5rem;
  border-radius: 16px;
  border: none;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(59, 130, 246, 0.7);
  transition: background 0.4s ease, box-shadow 0.3s ease;
  display: block;
  margin: 1.5rem auto 0 auto;
}

button:hover {
  background: #2563eb;
  box-shadow: 0 10px 30px rgba(37, 99, 235, 0.8);
}

.analysis-box {
  margin-top: 2.5rem;
  padding: 1.25rem 1.5rem;
  background-color: rgba(59, 130, 246, 0.15);
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(59, 130, 246, 0.25);
  line-height: 1.5;
  color: #dbeafe;
  text-align: left;
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 14px;
  margin-top: 1.75rem;
  font-weight: 500;
  color: #cbd5e1;
}

th, td {
  padding: 1rem 1.5rem;
  text-align: left;
}

th {
  background-color: #2563eb;
  color: white;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  user-select: none;
}

tbody tr {
  background: #1c2748;
  border-radius: 16px;
  box-shadow: 0 6px 14px rgba(37, 99, 235, 0.3);
  transition: background-color 0.3s ease;
}

tbody tr:hover {
  background-color: #2563eb;
}

a {
  color: #3b82f6;
}

a:hover {
  color: #2563eb;
}

@media (max-width: 640px) {
  .main-content {
    margin: 2rem 1rem;
    padding: 1.75rem 1.5rem;
  }

  table, thead, tbody, th, td, tr {
    display: block;
  }

  thead {
    display: none;
  }

  tbody tr {
    margin-bottom: 1.75rem;
    border-radius: 16px;
    padding: 1rem 1rem 1.5rem 1rem;
  }

  tbody tr td {
    padding: 0.75rem 0;
    position: relative;
    padding-left: 55%;
    text-align: right;
    font-weight: 600;
    border-bottom: 1px solid rgba(59, 130, 246, 0.5);
  }

  tbody tr td::before {
    position: absolute;
    left: 1rem;
    width: 50%;
    white-space: nowrap;
    font-weight: 700;
    color: #3b82f6;
    content: attr(data-label);
    text-align: left;
  }

  tbody tr td:last-child {
    border-bottom: none;
  }
}

</style>
