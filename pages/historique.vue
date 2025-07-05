<template>
  <div class="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
    <div v-if="showDeleteModal && tradesStore.trades.length > 0" class="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div class="flex items-center justify-center w-full h-full">
        <div class="p-8 text-center bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg animate-scale-in">
          <UIcon name="i-heroicons-exclamation-triangle" class="text-5xl text-red-500 mb-6" />
          <h3 class="text-2xl font-bold mb-4 text-red-700 dark:text-red-400">Suppression définitive</h3>
          <p class="mb-8 text-lg text-gray-700 dark:text-gray-200">
            Cette action va <span class="font-bold text-red-600">effacer <u>tous vos trades</u></span> de façon <span class="font-bold">irréversible</span>.<br>
            Êtes-vous certain de vouloir continuer&nbsp;?
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-4 mt-2">
            <UButton color="white" block class="py-3 text-lg font-semibold rounded-xl shadow-sm flex items-center justify-center gap-2 bg-gray-100/60 hover:bg-gray-200/80 text-black border border-gray-200 dark:bg-gray-800/60 dark:hover:bg-gray-800/80 dark:text-white dark:border-gray-700 transition" @click="showDeleteModal = false">
              Annuler
            </UButton>
            <UButton color="white" block class="py-3 text-lg font-semibold rounded-xl shadow-sm flex items-center justify-center gap-2 bg-red-100/60 hover:bg-red-200/80 text-red-700 border border-red-200 dark:bg-red-800/60 dark:hover:bg-red-800/80 dark:text-white dark:border-red-700 transition" @click="confirmDeleteHistory">
              Oui, tout effacer
            </UButton>
          </div>
        </div>
      </div>
    </div>
    <main class="container mx-auto px-4 py-12 pt-28">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold">Historique des trades</h1>
        <UBadge v-if="authStore.isOfflineMode" color="orange">Mode Hors Ligne</UBadge>
      </div>
      <div v-if="!authStore.isAuthenticated" class="flex flex-col items-center justify-center py-16">
        <UIcon name="i-heroicons-lock-closed" class="text-4xl text-blue-500 dark:text-blue-400 mb-4" />
        <h2 class="text-2xl font-bold text-center mb-2">Connexion requise</h2>
        <p class="mb-6 text-base text-gray-600 dark:text-gray-300 text-center max-w-xl">
          Vous devez être connecté pour accéder à cette page et consulter votre historique de trades.
        </p>
        <UButton
          to="/auth"
          color="primary"
          block
          class="w-full max-w-xs py-2 text-base font-semibold rounded-xl shadow-sm flex items-center justify-center gap-2 bg-blue-100/60 hover:bg-blue-200/80 text-blue-700 border border-blue-200 dark:bg-blue-800/60 dark:hover:bg-blue-800/80 dark:text-white dark:border-blue-700 transition"
        >
          <span class="i-heroicons-arrow-right-on-rectangle"></span>
          Se connecter
        </UButton>
      </div>
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
                  <UButton
                    @click="resetFilters"
                    color="white"
                    block
                    class="py-2 text-base font-semibold rounded-xl shadow-sm flex items-center justify-center gap-2 bg-gray-100/60 hover:bg-gray-200/80 text-black border border-gray-200 dark:bg-gray-800/60 dark:hover:bg-gray-800/80 dark:text-white dark:border-gray-700 transition"
                  >
                    Réinitialiser
                  </UButton>
                  <UButton
                    color="white"
                    @click="exportTrades"
                    block
                    class="py-2 text-base font-semibold rounded-xl shadow-sm flex items-center justify-center gap-2 bg-gray-100/60 hover:bg-gray-200/80 text-black border border-gray-200 dark:bg-gray-800/60 dark:hover:bg-gray-800/80 dark:text-white dark:border-gray-700 transition"
                  >
                    Exporter
                  </UButton>
                  <UButton color="white" @click="() => $refs.csvInput.click()" block class="py-2 text-base font-semibold rounded-xl shadow-sm flex items-center justify-center gap-2 bg-gray-100/60 hover:bg-gray-200/80 text-black border border-gray-200 dark:bg-gray-800/60 dark:hover:bg-gray-800/80 dark:text-white dark:border-gray-700 transition">
                    <span class="i-heroicons-arrow-up-tray"></span>
                    Importer un CSV
                  </UButton>
                  <input ref="csvInput" type="file" accept=".csv" class="hidden" @change="handleCsvImport" />
                  <UButton color="white" variant="soft" @click="resetHistory" block class="py-2 text-base font-semibold rounded-xl shadow-sm flex items-center justify-center gap-2 bg-red-100/60 hover:bg-red-200/80 text-red-700 border border-red-200 dark:bg-red-800/60 dark:hover:bg-red-800/80 dark:text-white dark:border-red-700 transition">
                    Effacer l'historique
                  </UButton>
                  <UButton color="white" @click="syncCloud" block class="py-2 text-base font-semibold rounded-xl shadow-sm flex items-center justify-center gap-2 bg-blue-100/60 hover:bg-blue-200/80 text-blue-700 border border-blue-200 dark:bg-blue-800/60 dark:hover:bg-blue-800/80 dark:text-white dark:border-blue-700 transition">
                    <span class="i-heroicons-cloud-arrow-up"></span>
                    Synchroniser avec le cloud
                  </UButton>
                  <div v-if="tradesStore.trades.length === 0" class="mt-4">
                    <UButton color="white" @click="syncFromCloud" block class="py-2 text-base font-semibold rounded-xl shadow-sm flex items-center justify-center gap-2 bg-blue-100/60 hover:bg-blue-200/80 text-blue-700 border border-blue-200 dark:bg-blue-800/60 dark:hover:bg-blue-800/80 dark:text-white dark:border-blue-700 transition">
                      <span class="i-heroicons-cloud-arrow-down"></span>
                      Récupérer depuis le cloud
                    </UButton>
                  </div>
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
            <div class="mt-6 flex flex-col items-center gap-3">
              <UButton color="white" @click="() => $refs.csvInput.click()" block class="w-full max-w-xs py-2 text-base font-semibold rounded-xl shadow-sm flex items-center justify-center gap-2 bg-gray-100/60 hover:bg-gray-200/80 text-black border border-gray-200 dark:bg-gray-800/60 dark:hover:bg-gray-800/80 dark:text-white dark:border-gray-700 transition">
                <span class="i-heroicons-arrow-up-tray"></span>
                Importer un CSV
              </UButton>
              <input ref="csvInput" type="file" accept=".csv" class="hidden" @change="handleCsvImport" />
              <UButton color="white" @click="syncFromCloud" block class="w-full max-w-xs py-2 text-base font-semibold rounded-xl shadow-sm flex items-center justify-center gap-2 bg-blue-100/60 hover:bg-blue-200/80 text-blue-700 border border-blue-200 dark:bg-blue-800/60 dark:hover:bg-blue-800/80 dark:text-white dark:border-blue-700 transition">
                <span class="i-heroicons-cloud-arrow-down"></span>
                Récupérer depuis le cloud
              </UButton>
            </div>
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
                <span>ID: {{ trade.id ? trade.id.substring(0, 8) : 'N/A' }}</span>
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

definePageMeta({ middleware: 'auth' })

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

// Suppression de l'historique
const showDeleteModal = ref(false)

const resetHistory = () => {
  showDeleteModal.value = true
}

const confirmDeleteHistory = () => {
  tradesStore.resetHistory()
  showDeleteModal.value = false
}

// Importer un CSV
const handleCsvImport = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files || input.files.length === 0) return
  const file = input.files[0]
  const reader = new FileReader()
  reader.onload = (e) => {
    const text = e.target?.result as string
    if (!text) return
    try {
      // Parsing CSV simple (séparateur virgule, première ligne = header)
      const lines = text.split(/\r?\n/).filter(Boolean)
      const headers = lines[0].split(',').map(h => h.trim().toLowerCase())
      const required = ['type', 'asset', 'entry', 'exit']
      if (!required.every(r => headers.includes(r))) {
        alert('Le CSV doit contenir les colonnes : type, asset, entry, exit')
        return
      }
      const trades = lines.slice(1).map(line => {
        const values = line.split(',')
        const obj: any = {}
        headers.forEach((h, i) => { obj[h] = values[i] })
        return obj
      })
      let count = 0
      for (const t of trades) {
        if (t.type && t.asset && t.entry && t.exit) {
          tradesStore.addTrade({
            type: t.type.trim() as 'buy' | 'sell',
            asset: t.asset.trim(),
            entry: parseFloat(t.entry),
            exit: parseFloat(t.exit),
            strategy: t.strategy || '',
            comment: t.comment || '',
            result: '',
            // Ajout d'un id unique si jamais la méthode addTrade ne le fait pas (sécurité)
            id: `imported-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
          })
          count++
        }
      }
      alert(count + ' trades importés avec succès !')
    } catch (e) {
      alert('Erreur lors de l\'import du CSV')
    }
  }
  reader.readAsText(file)
}

// Synchroniser avec le cloud
const syncCloud = async () => {
  try {
    const ok = await tradesStore.syncToCloud()
    if (ok) {
      alert('Synchronisation vers le cloud réussie !')
    } else {
      alert('Impossible de synchroniser (mode hors ligne ou non connecté)')
    }
  } catch (e) {
    alert('Erreur lors de la synchronisation cloud')
  }
}

// Récupérer depuis le cloud
const syncFromCloud = async () => {
  try {
    const ok = await tradesStore.syncFromCloud()
    if (ok) {
      alert('Historique récupéré depuis le cloud !')
    } else {
      alert('Aucun historique trouvé sur le cloud ou mode hors ligne/non connecté')
    }
  } catch (e) {
    alert('Erreur lors de la récupération cloud')
  }
}
</script>

<style scoped>
@keyframes scale-in {
  0% { opacity: 0; transform: scale(0.9); }
  100% { opacity: 1; transform: scale(1); }
}
.animate-scale-in {
  animation: scale-in 0.25s cubic-bezier(0.4,0,0.2,1);
}
</style>

