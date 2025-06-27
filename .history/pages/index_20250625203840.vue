
<template>
  <div>
    <!-- Menu de navigation -->
    <nav class="nav-bar">
      <ul>
        <li><NuxtLink to="/">Accueil</NuxtLink></li>
        <li><NuxtLink to="/historique">Historique</NuxtLink></li>
        <li><NuxtLink to="/import-csv">Import CSV</NuxtLink></li>
        <li><NuxtLink to="/dashboard">Dashboard</NuxtLink></li>
      </ul>
    </nav>

    <!-- Contenu principal -->
    <div class="container">
      <!-- ... ton formulaire et contenu actuel ... -->
    </div>
  </div>
</template>

<script setup lang="ts">
interface ApiResponse {
  result: string
}

const trade = reactive({
  asset: '', entry: '', exit: '', result: '', strategy: '', comment: ''
})
const analysis = ref('')

async function submitTrade() {
  const res: ApiResponse = await $fetch('/api/analyse-trade', {
    method: 'POST',
    body: trade
  })
  analysis.value = res.result
}
</script>

<style scoped>
.nav-bar {
  background-color: #3b82f6;
  padding: 1rem;
}

.nav-bar ul {
  display: flex;
  list-style: none;
  gap: 2rem;
  justify-content: center;
  margin: 0;
  padding: 0;
}

.nav-bar ul li a {
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
}

.nav-bar ul li a:hover {
  text-decoration: underline;
}
</style>
