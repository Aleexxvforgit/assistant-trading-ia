<template>
  <div>
    <header/>
    <div>
      
    </div>
    <!-- Contenu principal -->
    <div class="container">
      <h1 class="text-2xl font-bold mb-4">Saisir un trade</h1>
      <form @submit.prevent="submitTrade" class="space-y-4">
        <input v-model="trade.asset" placeholder="Actif (ex: EUR/USD)" class="w-full p-2 border rounded" />
        <input v-model="trade.entry" placeholder="Entrée" class="w-full p-2 border rounded" />
        <input v-model="trade.exit" placeholder="Sortie" class="w-full p-2 border rounded" />
        <input v-model="trade.result" placeholder="Résultat (pips ou €)" class="w-full p-2 border rounded" />
        <input v-model="trade.strategy" placeholder="Stratégie / Indicateurs" class="w-full p-2 border rounded" />
        <textarea v-model="trade.comment" placeholder="Commentaire du trade" class="w-full p-2 border rounded"></textarea>
        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">Analyser avec l'IA</button>
      </form>

      <div v-if="analysis" class="mt-6 p-4 bg-gray-100 rounded">
        <h2 class="font-bold">Analyse IA</h2>
        <p>{{ analysis }}</p>
      </div>
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

form.space-y-4 > * + * {
  margin-top: 1rem;
}

input, textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  resize: vertical;
}

input:focus, textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
}

button {
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

button:hover {
  background-color: #2563eb;
}

.mt-6 {
  margin-top: 1.5rem;
}

.bg-gray-100 {
  background-color: #f3f4f6;
}

.rounded {
  border-radius: 0.375rem;
}

.p-4 {
  padding: 1rem;
}

.font-bold {
  font-weight: 700;
}
</style>
