<template>
  <div class="min-h-screen bg-dark text-white p-6 max-w-5xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">Historique des Trades</h1>

    <div class="flex flex-col md:flex-row md:items-center gap-4 mb-6">
      <input
        v-model="filters.asset"
        type="text"
        placeholder="Filtrer par actif"
        class="p-2 border border-gray-600 rounded bg-dark text-white w-full md:w-1/3"
      />
      <input
        v-model="filters.strategy"
        type="text"
        placeholder="Filtrer par stratégie"
        class="p-2 border border-gray-600 rounded bg-dark text-white w-full md:w-1/3"
      />
      <button
        @click="resetFilters"
        class="bg-primary text-black px-4 py-2 rounded hover:opacity-90"
      >
        Réinitialiser
      </button>
    </div>

    <table class="w-full text-left border border-gray-700 rounded overflow-hidden">
      <thead class="bg-gray-800 text-primary">
        <tr>
          <th class="p-2">Actif</th>
          <th class="p-2">Entrée</th>
          <th class="p-2">Sortie</th>
          <th class="p-2">Résultat</th>
          <th class="p-2">Stratégie</th>
          <th class="p-2">Commentaire</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(trade, index) in filteredTrades" :key="index" class="odd:bg-gray-900 even:bg-gray-800">
          <td class="p-2">{{ trade.asset }}</td>
          <td class="p-2">{{ trade.entry }}</td>
          <td class="p-2">{{ trade.exit }}</td>
          <td class="p-2">{{ trade.result }}</td>
          <td class="p-2">{{ trade.strategy }}</td>
          <td class="p-2">{{ trade.comment }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface TradeData {
  asset: string
  entry: string
  exit: string
  result: string
  strategy: string
  comment: string
}

const trades = ref<TradeData[]>([])
const filters = ref({
  asset: '',
  strategy: ''
})

onMounted(() => {
  const stored = localStorage.getItem('tradeHistory')
  if (stored) trades.value = JSON.parse(stored)
})

const filteredTrades = computed(() => {
  return trades.value.filter((trade) => {
    const matchAsset = trade.asset.toLowerCase().includes(filters.value.asset.toLowerCase())
    const matchStrategy = trade.strategy.toLowerCase().includes(filters.value.strategy.toLowerCase())
    return matchAsset && matchStrategy
  })
})

function resetFilters() {
  filters.value.asset = ''
  filters.value.strategy = ''
}
</script>

<style scoped>
/
</style>
