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
/* Container principal centré verticalement et horizontalement */
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f9fafb;
  font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Le header est fixe en haut */
header {
  position: sticky;
  top: 0;
  z-index: 100;
}

/* Zone principale, max-width + centré horizontalement avec padding */
.main-content {
  flex: 1;
  max-width: 700px;
  margin: 3rem auto;
  padding: 2rem 1.5rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.07);
  transition: box-shadow 0.3s ease;
}

/* Ombre portée plus intense au hover */
.main-content:hover {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
}

/* Liens globaux */
a {
  color: #2563eb;
  text-decoration: none;
  transition: color 0.3s ease;
}

a:hover {
  color: #1e40af;
  text-decoration: underline;
}

/* Inputs et textarea modernisés */
input, textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  border: 1.5px solid #d1d5db;
  font-size: 1rem;
  font-weight: 500;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  resize: vertical;
}

input:focus, textarea:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 10px rgba(37, 99, 235, 0.5);
}

/* Boutons stylés */
button {
  background-color: #2563eb;
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
  padding: 0.75rem 2rem;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: background-color 0.25s ease;
  box-shadow: 0 6px 12px rgba(37, 99, 235, 0.4);
}

button:hover {
  background-color: #1e40af;
  box-shadow: 0 8px 16px rgba(30, 64, 175, 0.6);
}

/* Table responsive et élégante */
table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 12px;
  margin-top: 1.5rem;
  font-weight: 500;
}

th, td {
  padding: 1rem 1.25rem;
  text-align: left;
}

th {
  background-color: #2563eb;
  color: white;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

tbody tr {
  background: #f3f4f6;
  border-radius: 12px;
  box-shadow: 0 3px 8px rgb(0 0 0 / 0.05);
  transition: background-color 0.3s ease;
}

tbody tr:hover {
  background-color: #e0e7ff;
}

/* Responsive : empilement vertical */
@media (max-width: 600px) {
  .main-content {
    margin: 1.5rem;
    padding: 1.5rem 1rem;
  }

  table, thead, tbody, th, td, tr {
    display: block;
  }

  thead {
    display: none;
  }

  tbody tr {
    margin-bottom: 1.5rem;
    border-radius: 12px;
    padding: 1rem;
  }

  tbody tr td {
    padding: 0.75rem 0;
    position: relative;
    padding-left: 50%;
    text-align: right;
    font-weight: 600;
    border-bottom: 1px solid #ddd;
  }

  tbody tr td::before {
    position: absolute;
    left: 1rem;
    width: 45%;
    white-space: nowrap;
    font-weight: 700;
    color: #2563eb;
    content: attr(data-label);
    text-align: left;
  }

  tbody tr td:last-child {
    border-bottom: none;
  }
}
</style>
