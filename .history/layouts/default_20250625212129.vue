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
  background: #0a0a0a;
  font-family: 'Poppins', sans-serif;
  color: #e5e7eb;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: transparent;
  margin: 0;
  padding: 0;
}

/* Header minimaliste */
nav.nav-bar {
  background: #121212;
  box-shadow: 0 1px 5px rgba(0,0,0,0.8);
  padding: 1rem 1.5rem;
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
}

.nav-bar ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;
}

.nav-bar ul li a {
  font-weight: 600;
  font-size: 1.1rem;
  color: #3b82f6;
  text-decoration: none;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.3s ease;
  user-select: none;
}

.nav-bar ul li a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0%;
  height: 2.5px;
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

/* Contenu principal */
.main-content {
  flex: 1;
  max-width: 720px;
  margin: 2rem auto;
  padding: 2rem;
  background: #121212;
  border-radius: 24px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.8);
  color: #e5e7eb;
  -webkit-font-feature-settings: "liga" 1;
  font-feature-settings: "liga" 1;
}

/* Titres */
h1, h2 {
  color: #e5e7eb;
  text-align: center;
  margin-bottom: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.03em;
}

/* Inputs & textarea */
input, textarea {
  width: 100%;
  padding: 1rem 1.5rem;
  border-radius: 18px;
  border: 1.5px solid #1e293b;
  font-size: 1rem;
  font-weight: 500;
  color: #e5e7eb;
  background-color: #0f111a;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  resize: vertical;
  box-sizing: border-box;
  box-shadow: inset 0 0 8px #111827;
  font-variant-numeric: tabular-nums;
}

input::placeholder,
textarea::placeholder {
  color: #64748b;
}

input:focus, textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 14px #3b82f6;
}

/* Boutons */
button {
  background: #3b82f6;
  color: white;
  font-weight: 700;
  font-size: 1.15rem;
  padding: 1rem 3rem;
  border-radius: 24px;
  border: none;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(59,130,246,0.8);
  transition: background 0.3s ease, box-shadow 0.3s ease;
  display: block;
  margin: 2rem auto 0 auto;
  user-select: none;
}

button:hover {
  background: #2563eb;
  box-shadow: 0 10px 30px rgba(37,99,235,0.9);
}

/* Box analyse */
.analysis-box {
  margin-top: 3rem;
  padding: 1.5rem 2rem;
  background-color: #1e293b;
  border-radius: 24px;
  box-shadow: 0 6px 18px rgba(37,99,235,0.25);
  line-height: 1.6;
  color: #dbeafe;
  text-align: left;
  font-feature-settings: "liga" 1;
}

/* Table */
table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 18px;
  margin-top: 2rem;
  font-weight: 500;
  color: #cbd5e1;
  font-variant-numeric: tabular-nums;
}

th, td {
  padding: 1.25rem 1.75rem;
  text-align: left;
}

th {
  background-color: #2563eb;
  color: white;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  user-select: none;
}

tbody tr {
  background: #0f111a;
  border-radius: 24px;
  box-shadow: 0 6px 14px rgba(37, 99, 235, 0.3);
  transition: background-color 0.3s ease;
}

tbody tr:hover {
  background-color: #2563eb;
  color: white;
}

a {
  color: #3b82f6;
  text-decoration: none;
  transition: color 0.3s ease;
}

a:hover {
  color: #2563eb;
  text-decoration: underline;
}

/* Responsive */
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
    border-radius: 24px;
    padding: 1.5rem 1rem 2rem 1rem;
  }

  tbody tr td {
    padding: 0.75rem 0;
    position: relative;
    padding-left: 60%;
    text-align: right;
    font-weight: 600;
    border-bottom: 1px solid rgba(59, 130, 246, 0.5);
  }

  tbody tr td::before {
    position: absolute;
    left: 1rem;
    width: 55%;
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
