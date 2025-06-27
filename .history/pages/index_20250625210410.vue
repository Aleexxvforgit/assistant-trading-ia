<template>
  <div>
    <h1>Saisir un trade</h1>
    <form @submit.prevent="submitTrade" class="form-space">
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

<style>
/* Form spacing handled by global styles */
.form-space > * + * {
  margin-top: 1rem;
}

.analysis-box {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f3f4f6;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgb(0 0 0 / 0.05);
}

.analysis-box h2 {
  margin-bottom: 0.5rem;
  font-weight: 700;
  color: #2563eb;
}
</style>
