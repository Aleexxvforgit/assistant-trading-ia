<template>
  <div class="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
    <main class="container mx-auto px-4 py-12 pt-28">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold">Historique des trades</h1>
        <UBadge v-if="authStore.isOfflineMode" color="orange">Mode Hors Ligne</UBadge>
      </div>

      <UCard v-if="!authStore.isAuthenticated" class="mb-8">
        <template #header>
          <h2 class="text-xl font-semibold">Connexion requise</h2>
</template>
        <p class="mb-4">Veuillez vous connecter pour accéder à l'historique.</p>
        <UButton to="/auth" color="primary">Se connecter</UButton>
      </UCard>

      <template v-else>
        <!-- Grille avec statistiques à gauche et filtres à droite -->
        <div v-if="tradesStore.trades.length > 0" class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div class="lg:col-span-2">
            <TradeStats :trades="tradesStore.trades" title="Statistiques globales" />
          </div>
          <div>
            <UCard>
            <template #header>
                <h2 class="text-lg font-semibold">Filtres</h2>
              </template>

              <div class="space-y-8">
                <h3 class="text-xl font-bold mb-2 text-center">Filtres avancés</h3>
                <div class="grid grid-cols-1 gap-6">
                  <div>
                    <label for="filter-type" class="block mb-1 font-medium">Type de trade</label>
                    <select
                      id="filter-type"
                      v-model="filters.type"
                      class="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base text-black dark:text-white"
                    >
                      <option value="all" disabled selected hidden>Type de trade</option>
                      <option value="all">Tous</option>
                      <option value="buy">Achat</option>
                      <option value="sell">Vente</option>
                    </select>
                  </div>
                  <div>
                    <label for="filter-result" class="block mb-1 font-medium">Résultat</label>
                    <select
                      id="filter-result"
                      v-model="filters.result"
                      class="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base text-black dark:text-white"
                    >
                      <option value="all" disabled selected hidden>Résultat</option>
                      <option value="all">Tous</option>
                      <option value="win">Gagnant</option>
                      <option value="loss">Perdant</option>
                    </select>
                  </div>
                  <div>
                    <label for="filter-asset" class="block mb-1 font-medium">Actif</label>
                    <UInput
                      id="filter-asset"
                      v-model="filters.asset"
                      placeholder="Filtrer par actif..."
                      class="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base placeholder-gray-400 dark:placeholder-gray-500"
                    />
                  </div>
                  <div>
                    <label for="filter-strategy" class="block mb-1 font-medium">Stratégie</label>
                    <select
                      id="filter-strategy"
                      v-model="filters.strategy"
                      class="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base text-black dark:text-white"
                    >
                      <option value="all" disabled selected hidden>Stratégie</option>
                      <option value="all">Toutes</option>
                      <option value="breakout">Breakout</option>
                      <option value="range">Range</option>
                      <option value="trend">Tendance</option>
                      <option value="scalping">Scalping</option>
                      <option value="swing">Swing</option>
                    </select>
                  </div>
                </div>
                <div class="flex flex-col gap-2 mt-6">
                  <UButton @click="resetFilters" variant="ghost" block>Réinitialiser</UButton>
                  <UButton color="primary" @click="exportTrades" block>Exporter</UButton>
                  <p class="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">Affinez votre recherche grâce aux filtres avancés.</p>
                </div>
              </div>
            </UCard>
          </div>
  </div>

        <!-- Pas de trades enregistrés -->
        <UCard v-if="tradesStore.trades.length === 0">
          <div class="p-12 text-center">
            <UIcon name="i-heroicons-inbox" class="text-4xl mb-4 text-gray-400" />
            <h3 class="text-xl font-semibold mb-2">Aucun trade enregistré</h3>
            <p class="text-gray-500 dark:text-gray-400 mb-6">
              Vous n'avez pas encore effectué d'analyses de trades.
            </p>
            <UButton to="/" color="primary">Analyser un trade</UButton>
          </div>
        </UCard>

        <!-- Liste des trades filtrée -->
        <div v-else class="space-y-6">
          <UCard v-if="filteredTrades.length === 0" class="text-center py-8">
            <UIcon name="i-heroicons-magnifying-glass" class="text-4xl mb-4 text-gray-400" />
            <h3 class="text-xl font-semibold mb-2">Aucun résultat</h3>
            <p class="text-gray-500 dark:text-gray-400 mb-4">
              Aucun trade ne correspond à vos critères de filtrage.
            </p>
            <UButton @click="resetFilters" variant="ghost">Réinitialiser les filtres</UButton>
          </UCard>

          <UCard v-for="trade in filteredTrades" :key="trade.id" class="overflow-hidden">
            <template #header>
              <div class="flex justify-between items-center">
                <h3 class="font-semibold">
                  {{ trade.type === 'buy' ? '🔵 Achat' : '🔴 Vente' }} - {{ trade.asset }}
                </h3>
                <UBadge :color="trade.result?.includes('✅') ? 'green' : 'red'">
                  {{ trade.result?.includes('✅') ? 'Gagnant' : 'Perdant' }}
                </UBadge>
              </div>
</template>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Prix d'entrée</p>
                <p class="font-medium">{{ trade.entry }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Prix de sortie</p>
                <p class="font-medium">{{ trade.exit }}</p>
              </div>
            </div>

            <div class="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              <p class="text-sm text-gray-500 dark:text-gray-400">Analyse</p>
              <p>{{ trade.result }}</p>
            </div>

            <template #footer>
              <div class="flex justify-between items-center text-sm text-gray-500">
                <span>{{ new Date(trade.createdAt).toLocaleString() }}</span>
                <span>ID: {{ trade.id.substring(0, 8) }}</span>
              </div>
            </template>
          </UCard>
        </div>
      </template>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '~/stores/useAuthStore'
import { useTradesStore } from '~/stores/useTradesStore'

const authStore = useAuthStore()
const tradesStore = useTradesStore()

// Filtres
const filters = ref({
  type: 'all',
  result: 'all',
  asset: '',
  strategy: 'all',
  comment: ''
})

// Réinitialiser les filtres
const resetFilters = () => {
  filters.value = {
    type: 'all',
    result: 'all',
    asset: '',
    strategy: 'all',
    comment: ''
  }
}

// Trades filtrés
const filteredTrades = computed(() => {
  return tradesStore.trades.filter(trade => {
    // Filtre par type
    if (filters.value.type !== 'all' && trade.type !== filters.value.type) {
      return false
    }

    // Filtre par résultat
    if (filters.value.result === 'win' && !trade.result?.includes('✅')) {
      return false
    }
    if (filters.value.result === 'loss' && !trade.result?.includes('❌')) {
      return false
    }

    // Filtre par actif
    if (filters.value.asset && !trade.asset.toLowerCase().includes(filters.value.asset.toLowerCase())) {
      return false
    }

    // Filtre par stratégie
    if (filters.value.strategy !== 'all' && trade.strategy !== filters.value.strategy) {
      return false
    }

    // Filtre par commentaire
    if (filters.value.comment && !trade.comment?.toLowerCase().includes(filters.value.comment.toLowerCase())) {
      return false
    }

    return true
  })
})

// Exporter les trades
const exportTrades = () => {
  // Créer un CSV des trades
  const headers = ['Type', 'Actif', 'Entrée', 'Sortie', 'Résultat', 'Date']
  const csvContent = [
    headers.join(','),
    ...filteredTrades.value.map(trade => [
      trade.type,
      trade.asset,
      trade.entry,
      trade.exit,
      trade.result?.includes('✅') ? 'Gagnant' : 'Perdant',
      new Date(trade.createdAt).toLocaleString()
    ].join(','))
  ].join('\n')

  // Créer un blob et un lien de téléchargement
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', `trades_export_${new Date().toISOString().split('T')[0]}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>

