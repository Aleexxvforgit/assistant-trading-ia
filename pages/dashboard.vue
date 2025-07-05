<template>
  <div class="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
    <main class="container mx-auto px-4 py-12 pt-28 max-w-4xl">
      <UCard>
        <template #header>
          <div class="flex justify-between items-center">
            <h1 class="text-3xl font-bold">Dashboard Analytique</h1>
            <UBadge v-if="authStore.isOfflineMode" color="orange">Mode Hors Ligne</UBadge>
          </div>
        </template>
        <div v-if="authStore.isAuthenticated">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 class="text-lg font-semibold mb-2">Statistiques globales</h2>
              <ul class="space-y-2">
                <li><span class="font-medium">Nombre de trades :</span> {{ tradesStore.trades.length }}</li>
                <li><span class="font-medium">Winrate :</span> {{ winrate }}%</li>
                <li><span class="font-medium">PnL total :</span> {{ totalPnL }}</li>
                <li><span class="font-medium">Meilleur trade :</span> {{ bestTrade }}</li>
                <li><span class="font-medium">Pire trade :</span> {{ worstTrade }}</li>
              </ul>
            </div>
            <div>
              <h2 class="text-lg font-semibold mb-2">Répartition</h2>
              <!-- Placeholders pour graphiques -->
              <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 flex flex-col items-center justify-center min-h-[180px]">
                <span class="text-gray-400">[Graphique à venir]</span>
              </div>
            </div>
          </div>
          <div>
            <h2 class="text-lg font-semibold mb-4">Évolution du capital</h2>
            <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 flex flex-col items-center justify-center min-h-[220px] w-full">
              <CapitalChart v-if="tradesStore.trades.length > 0" :trades="tradesStore.trades" />
              <span v-else class="text-gray-400">Aucun trade à afficher</span>
            </div>
          </div>
        </div>
        <div v-else class="flex flex-col items-center justify-center py-12">
          <UIcon name="i-heroicons-lock-closed" class="text-4xl text-blue-500 dark:text-blue-400 mb-4" />
          <h2 class="text-2xl font-bold text-center mb-2">Connexion requise</h2>
          <p class="mb-6 text-base text-gray-600 dark:text-gray-300 text-center max-w-xl">
            Vous devez être connecté pour accéder à cette page et consulter votre dashboard analytique.
          </p>
          <UButton to="/auth" color="primary" block class="w-full max-w-xs py-2 text-base font-semibold rounded-xl shadow-sm flex items-center justify-center gap-2 bg-blue-100/60 hover:bg-blue-200/80 text-blue-700 border border-blue-200 dark:bg-blue-800/60 dark:hover:bg-blue-800/80 dark:text-white dark:border-blue-700 transition">
            <span class="i-heroicons-arrow-right-on-rectangle"></span>
            Se connecter
          </UButton>
        </div>
      </UCard>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '~/stores/useAuthStore'
import { useTradesStore } from '~/stores/useTradesStore'
import CapitalChart from '~/components/CapitalChart.vue'

definePageMeta({ middleware: 'auth' })

const authStore = useAuthStore()
const tradesStore = useTradesStore()

const winrate = computed(() => {
  const total = tradesStore.trades.length
  if (!total) return 0
  const wins = tradesStore.trades.filter(t => t.result?.includes('✅')).length
  return ((wins / total) * 100).toFixed(1)
})

const totalPnL = computed(() => {
  if (!tradesStore.trades.length) return 0
  return tradesStore.trades.reduce((acc, t) => acc + (t.exit - t.entry), 0).toFixed(2)
})

const bestTrade = computed(() => {
  if (!tradesStore.trades.length) return '-'
  const best = tradesStore.trades.reduce((a, b) => (b.exit - b.entry) > (a.exit - a.entry) ? b : a)
  return `${best.asset} (${(best.exit - best.entry).toFixed(2)})`
})

const worstTrade = computed(() => {
  if (!tradesStore.trades.length) return '-'
  const worst = tradesStore.trades.reduce((a, b) => (b.exit - b.entry) < (a.exit - a.entry) ? b : a)
  return `${worst.asset} (${(worst.exit - worst.entry).toFixed(2)})`
})
</script>
