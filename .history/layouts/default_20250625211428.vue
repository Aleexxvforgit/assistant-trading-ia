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
  color: #f0f0f0;
  margin: 0;
  padding: 0;
}

/* Header */
nav.nav-bar {
  background: #1e1e2f;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
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
  color: #a78bfa;
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
  background: #a78bfa;
  transition: width 0.3s ease;
  border-radius: 3px;
}

.nav-bar ul li a:hover,
.nav-bar ul li a.router-link-active {
  color: #7c3aed;
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
  background: rgba(255 255 255 / 0.1);
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  color: #e0e0e0;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

/* Titres */
h1, h2 {
  color: #e0e0ff;
  text-align: center;
  margin-bottom: 1rem;
  font-weight: 700;
}

/* Formulaire */
input, textarea {
  width: 100%;
  padding: 0.85rem 1.25rem;
  border-radius: 14px;
  border: 1.5px solid rgba(255 255 255 / 0.3);
  font-size: 1rem;
  font-weight: 500;
  color: #fafafa;
  background-color: rgba(255 255 255 / 0.15);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  resize: vertical;
  box-sizing: border-box;
}

input::placeholder,
textarea::placeholder {
  color: rgba(255 255 255 / 0.7);
}

input:focus, textarea:focus {
  outline: none;
  border-color: #a78bfa;
  box-shadow: 0 0 12px rgba(167, 139, 250, 0.7);
}

/* Boutons */
button {
  background: linear-gradient(90deg, #8b5cf6, #7c3aed);
  color: white;
  font-weight: 700;
  font-size: 1.15rem;
  padding: 0.85rem 2.5rem;
  border-radius: 16px;
  border: none;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(139, 92, 246, 0.6);
  transition: background 0.4s ease, box-shadow 0.3s ease;
  display: block;
  margin: 1.5rem auto 0 auto;
}

button:hover {
  background: linear-gradient(90deg, #7c3aed, #8b5cf6);
  box-shadow: 0 10px 30px rgba(124, 58, 237, 0.8);
}

/* Analyse box */
.analysis-box {
  margin-top: 2.5rem;
  padding: 1.25rem 1.5rem;
  background-color: rgba(238, 242, 255, 0.15);
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(79, 70, 229, 0.25);
  line-height: 1.5;
  color: #d1d5db;
  text-align: left;
}

/* Table */
table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 14px;
  margin-top: 1.75rem;
  font-weight: 500;
  color: #e0e0e0;
}

th, td {
  padding: 1rem 1.5rem;
  text-align: left;
}

th {
  background-color: rgba(139, 92, 246, 0.8);
  color: white;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  user-select: none;
}

tbody tr {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  box-shadow: 0 6px 14px rgba(79, 70, 229, 0.15);
  transition: background-color 0.3s ease;
}

tbody tr:hover {
  background-color: rgba(139, 92, 246, 0.3);
}

/* Links */
a {
  color: #a78bfa;
}

a:hover {
  color: #7c3aed;
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
    border-bottom: 1px solid rgba(255 255 255, 0.3);
  }

  tbody tr td::before {
    position: absolute;
    left: 1rem;
    width: 50%;
    white-space: nowrap;
    font-weight: 700;
    color: #a78bfa;
    content: attr(data-label);
    text-align: left;
  }

  tbody tr td:last-child {
    border-bottom: none;
  }
}

</style>
