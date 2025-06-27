// ==============================
// /pages/historique.vue
// ==============================
<template>
  <div class="min-h-screen bg-[#0F1117] text-white p-6 max-w-6xl mx-auto font-sans">
    <h1 class="text-4xl font-bold mb-8 text-[#00FFC3]">Historique des Trades</h1>

    <div class="flex flex-col md:flex-row md:items-center gap-4 mb-8">
      <input
        v-model="filters.asset"
        type="text"
        placeholder="🔍 Filtrer par actif"
        class="p-3 rounded-md bg-gray-900 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00FFC3] w-full md:w-1/3"
      />
      <input
        v-model="filters.strategy"
        type="text"
        placeholder="🔍 Filtrer par stratégie"
        class="p-3 rounded-md bg-gray-900 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00FFC3] w-full md:w-1/3"
      />
      <button
        @click="resetFilters"
        class="px-5 py-3 rounded-md bg-[#004cff] text-black font-semibold hover:bg-opacity-90 transition"
      >
        Réinitialiser
      </button>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-sm text-left border border-gray-800 rounded-lg overflow-hidden">
        <thead class="bg-[#1a1c22] text-[#0062ff] uppercase text-xs">
          <tr>
            <th class="px-4 py-3">Actif</th>
            <th class="px-4 py-3">Entrée</th>
            <th class="px-4 py-3">Sortie</th>
            <th class="px-4 py-3">Résultat</th>
            <th class="px-4 py-3">Stratégie</th>
            <th class="px-4 py-3">Commentaire</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(trade, index) in filteredTrades"
            :key="index"
            class="odd:bg-gray-800 even:bg-gray-900 border-b border-gray-700 hover:bg-gray-700/30"
          >
            <td class="px-4 py-2">{{ trade.asset }}</td>
            <td class="px-4 py-2">{{ trade.entry }}</td>
            <td class="px-4 py-2">{{ trade.exit }}</td>
            <td class="px-4 py-2">{{ trade.result }}</td>
            <td class="px-4 py-2">{{ trade.strategy }}</td>
            <td class="px-4 py-2">{{ trade.comment }}</td>
          </tr>
        </tbody>
      </table>
    </div>
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
th,
td {
  white-space: nowrap;
}
</style>
