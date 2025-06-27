<template>
  <div class="container">
    <h1>Saisir un trade</h1>
    <form @submit.prevent="submitTrade" class="trade-form">
      <input v-model="trade.asset" placeholder="Actif (ex: EUR/USD)" />
      <input v-model="trade.entry" placeholder="Entrée" />
      <input v-model="trade.exit" placeholder="Sortie" />
      <input v-model="trade.result" placeholder="Résultat (pips ou €)" />
      <input v-model="trade.strategy" placeholder="Stratégie / Indicateurs" />
      <textarea v-model="trade.comment" placeholder="Commentaire du trade"></textarea>
      <button type="submit">Analyser avec l'IA</button>
    </form>

    <div v-if="analysis" class="analysis-box">
      <h2>Analyse IA</h2>
      <p>{{ analysis }}</p>
    </div>
  </div>
</template>



<style scoped>
.container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

.trade-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.trade-form input,
.trade-form textarea {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  resize: vertical;
}

.trade-form input:focus,
.trade-form textarea:focus {
  outline: none;
  border-color: #3b82f6; /* Bleu doux */
  box-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
}

.trade-form button {
  padding: 0.75rem;
  background-color: #3b82f6;
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.trade-form button:hover {
  background-color: #2563eb; /* Bleu plus foncé au hover */
}

.analysis-box {
  margin-top: 2rem;
  padding: 1rem;
  background: #e0f2fe;
  border-radius: 6px;
  color: #0369a1;
  white-space: pre-line; /* Garde la mise en forme des retours IA */
  font-family: monospace;
}
</style>



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
