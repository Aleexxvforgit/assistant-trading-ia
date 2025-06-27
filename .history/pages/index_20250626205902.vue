<template>
  <div class="max-w-xl mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6 text-center text-blue-400">Nouveau trade</h1>
    <form @submit.prevent="submitTrade" class="space-y-4">
      <input
        v-model="trade.asset"
        placeholder="Actif (ex: EUR/USD)"
        class="w-full p-2 rounded bg-gray-900 border border-gray-700 text-white"
        required
      />
      <input
        v-model="trade.entry"
        placeholder="Entrée"
        class="w-full p-2 rounded bg-gray-900 border border-gray-700 text-white"
        required
      />
      <input
        v-model="trade.exit"
        placeholder="Sortie"
        class="w-full p-2 rounded bg-gray-900 border border-gray-700 text-white"
        required
      />
      <input
        v-model="trade.result"
        placeholder="Résultat (pips ou €)"
        class="w-full p-2 rounded bg-gray-900 border border-gray-700 text-white"
        required
      />
      <input
        v-model="trade.strategy"
        placeholder="Stratégie / Indicateurs"
        class="w-full p-2 rounded bg-gray-900 border border-gray-700 text-white"
      />
      <textarea
        v-model="trade.comment"
        placeholder="Commentaire du trade"
        class="w-full p-2 rounded bg-gray-900 border border-gray-700 text-white"
        rows="3"
      ></textarea>

      <button
        type="submit"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
      >
        Analyser avec l’IA
      </button>
    </form>

    <AnalysisResult :content="analysis" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import AnalysisResult from '~/components/AnalysisResult.vue'

interface ApiResponse {
  result: string
}

const trade = reactive({
  asset: 'EUR/USD',
  entry: '1.0820',
  exit: '1.0875',
  result: '+55 pips',
  strategy: 'RSI < 30 + Croisement EMA',
  comment: 'Entrée car sur-vente détectée + début de retournement H1'
})

const analysis = ref('')

async function submitTrade() {
  const res: ApiResponse = await $fetch('/api/analyse-trade', {
    method: 'POST',
    body: trade
  })

  analysis.value = res.result

  // Sauvegarde dans localStorage
  const storedTrades = JSON.parse(localStorage.getItem('trade-history') || '[]')

  const newTrade = JSON.parse(JSON.stringify({
    ...trade,
    date: new Date().toISOString(),
    analysis: res.result
  }))

  storedTrades.push(newTrade)
  localStorage.setItem('trade-history', JSON.stringify(storedTrades))
}
</script>
