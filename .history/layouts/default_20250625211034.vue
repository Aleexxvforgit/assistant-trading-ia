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
/* Conteneur principal */
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%);
  font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #1f2937;
}

/* Header avec fond clair et ombre */
nav.nav-bar {
  background: #f9fafb;
  box-shadow: 0 4px 12px rgb(0 0 0 / 0.1);
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
}

/* Menu horizontal centré */
.nav-bar ul {
  display: flex;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2.5rem;
}

/* Liens menu */
.nav-bar ul li a {
  font-weight: 600;
  font-size: 1.1rem;
  color: #4f46e5;
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
  background: #4f46e5;
  transition: width 0.3s ease;
  border-radius: 3px;
}

.nav-bar ul li a:hover,
.nav-bar ul li a.router-link-active {
  color: #3730a3;
}

.nav-bar ul li a:hover::after,
.nav-bar ul li a.router-link-active::after {
  width: 100%;
}

/* Contenu principal */
.main-content {
  flex: 1;
  max-width: 720px;
  margin: 3rem auto 4rem auto;
  padding: 2rem 2rem 3rem 2rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 50px rgb(0 0 0 / 0.1);
  transition: box-shadow 0.3s ease;
}

.main-content:hover {
  box-shadow: 0 30px 70px rgb(0 0 0 / 0.15);
}

/* Titres */
h1 {
  font-weight: 700;
  font-size: 2.25rem;
  margin-bottom: 1.5rem;
  color: #3730a3;
  text-align: center;
}

h2 {
  font-weight: 600;
  color: #4f46e5;
  margin-bottom: 0.75rem;
}

/* Formulaire */
input, textarea {
  width: 100%;
  padding: 0.85rem 1.25rem;
  border-radius: 14px;
  border: 1.5px solid #cbd5e1;
  font-size: 1rem;
  font-weight: 500;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  resize: vertical;
  box-sizing: border-box;
}

input:focus, textarea:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 12px rgba(79, 70, 229, 0.5);
}

/* Boutons */
button {
  background: linear-gradient(90deg, #6366f1, #4338ca);
  color: white;
  font-weight: 700;
  font-size: 1.15rem;
  padding: 0.85rem 2.5rem;
  border-radius: 16px;
  border: none;
  cursor: pointer;
  box-shadow: 0 8px 24px rgb(67 56 202 / 0.4);
  transition: background 0.4s ease, box-shadow 0.3s ease;
  display: block;
  margin: 1.5rem auto 0 auto;
}

button:hover {
  background: linear-gradient(90deg, #4338ca, #6366f1);
  box-shadow: 0 12px 36px rgb(67 56 202 / 0.7);
}

/* Analyse box */
.analysis-box {
  margin-top: 2.5rem;
  padding: 1.25rem 1.5rem;
  background-color: #eef2ff;
  border-radius: 16px;
  box-shadow: 0 6px 18px rgb(79 70 229 / 0.25);
  line-height: 1.5;
  color: #3730a3;
}

/* Table */
table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 14px;
  margin-top: 1.75rem;
  font-weight: 500;
  color: #334155;
}

th, td {
  padding: 1rem 1.5rem;
  text-align: left;
}

th {
  background-color: #4f46e5;
  color: white;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  user-select: none;
}

tbody tr {
  background: #e0e7ff;
  border-radius: 16px;
  box-shadow: 0 6px 14px rgb(79 70 229 / 0.15);
  transition: background-color 0.3s ease;
}

tbody tr:hover {
  background-color: #c7d2fe;
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
    border-radius: 16px;
    padding: 1rem 1rem 1.5rem 1rem;
  }

  tbody tr td {
    padding: 0.75rem 0;
    position: relative;
    padding-left: 55%;
    text-align: right;
    font-weight: 600;
    border-bottom: 1px solid #cbd5e1;
  }

  tbody tr td::before {
    position: absolute;
    left: 1rem;
    width: 50%;
    white-space: nowrap;
    font-weight: 700;
    color: #4f46e5;
    content: attr(data-label);
    text-align: left;
  }

  tbody tr td:last-child {
    border-bottom: none;
  }
}
</style>
