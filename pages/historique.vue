<template>
  <div>
    <main>
      <div>
        <h1>Historique des trades</h1>
        <UBadge v-if="authStore.isOfflineMode">Mode Hors Ligne</UBadge>
      </div>
      <div v-if="!authStore.isAuthenticated">
        <UIcon name="i-heroicons-lock-closed" />
        <h2>Connexion requise</h2>
        <p>
          Vous devez être connecté pour accéder à cette page et consulter votre historique de trades.
        </p>
        <UButton to="/auth">Se connecter</UButton>
      </div>
      <template v-else>
        <div>
          <TradeStats :trades="tradesStore.trades" title="Statistiques globales" />
          <UCard>
            <template #header>
              <h2>Filtres</h2>
            </template>
            <div>
              <h3>Filtres avancés</h3>
              <div>
                <div>
                  <label for="filter-type">Type de trade</label>
                  <select id="filter-type" v-model="filters.type">
                    <option value="all" disabled selected hidden>Type de trade</option>
                    <option value="all">Tous</option>
                    <option value="buy">Achat</option>
                    <option value="sell">Vente</option>
                  </select>
                </div>
                <div>
                  <label for="filter-result">Résultat</label>
                  <select id="filter-result" v-model="filters.result">
                    <option value="all" disabled selected hidden>Résultat</option>
                    <option value="all">Tous</option>
                    <option value="win">Gagnant</option>
                    <option value="loss">Perdant</option>
                  </select>
                </div>
                <div>
                  <label for="filter-asset">Actif</label>
                  <UInput id="filter-asset" v-model="filters.asset" placeholder="Filtrer par actif..." />
                </div>
                <div>
                  <label for="filter-strategy">Stratégie</label>
                  <select id="filter-strategy" v-model="filters.strategy">
                    <option value="all" disabled selected hidden>Stratégie</option>
                    <option value="all">Toutes</option>
                    <option value="breakout">Breakout</option>
                    <option value="range">Range</option>
                    <option value="trend">Tendance</option>
                    <option value="scalping">Scalping</option>
                    <option value="swing">Swing</option>
                  </select>
                </div>
                <div>
                  <UButton @click="resetFilters">Réinitialiser</UButton>
                  <UButton @click="exportTrades">Exporter</UButton>
                  <UButton @click="() => $refs.csvInput.click()">
                    <span class="i-heroicons-arrow-up-tray"></span>
                    Importer un CSV
                  </UButton>
                  <input ref="csvInput" type="file" accept=".csv" @change="handleCsvImport" />
                  <UButton @click="resetHistory">Effacer l'historique</UButton>
                  <UButton @click="syncCloud">
                    <span class="i-heroicons-cloud-arrow-up"></span>
                    Synchroniser avec le cloud
                  </UButton>
                  <div v-if="tradesStore.trades.length === 0">
                    <UButton @click="syncFromCloud">
                      <span class="i-heroicons-cloud-arrow-down"></span>
                      Récupérer depuis le cloud
                    </UButton>
                  </div>
                  <p>Affinez votre recherche grâce aux filtres avancés.</p>
                </div>
              </div>
            </div>
          </UCard>
        </div>
        <UCard v-if="tradesStore.trades.length === 0">
          <div>
            <UIcon name="i-heroicons-inbox" />
            <h3>Aucun trade enregistré</h3>
            <p>Vous n'avez pas encore effectué d'analyses de trades.</p>
            <UButton to="/">Analyser un trade</UButton>
            <div>
              <UButton @click="() => $refs.csvInput.click()">
                <span class="i-heroicons-arrow-up-tray"></span>
                Importer un CSV
              </UButton>
              <input ref="csvInput" type="file" accept=".csv" @change="handleCsvImport" />
              <UButton @click="syncFromCloud">
                <span class="i-heroicons-cloud-arrow-down"></span>
                Récupérer depuis le cloud
              </UButton>
            </div>
          </div>
        </UCard>
        <div v-else>
          <UCard v-if="filteredTrades.length === 0">
            <UIcon name="i-heroicons-magnifying-glass" />
            <h3>Aucun résultat</h3>
            <p>Aucun trade ne correspond à vos critères de filtrage.</p>
            <UButton @click="resetFilters">Réinitialiser les filtres</UButton>
          </UCard>
          <UCard v-for="trade in filteredTrades" :key="trade.id">
            <template #header>
              <div>
                <h3>
                  {{ trade.type === 'buy' ? '🔵 Achat' : '🔴 Vente' }} - {{ trade.asset }}
                </h3>
                <UBadge :color="trade.result?.includes('✅') ? 'green' : 'red'">
                  {{ trade.result?.includes('✅') ? 'Gagnant' : 'Perdant' }}
                </UBadge>
              </div>
            </template>
            <div>
              <div>
                <p>Prix d'entrée</p>
                <p>{{ trade.entry }}</p>
              </div>
              <div>
                <p>Prix de sortie</p>
                <p>{{ trade.exit }}</p>
              </div>
            </div>
            <div>
              <p>Analyse</p>
              <p>{{ trade.result }}</p>
            </div>
            <template #footer>
              <div>
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

<!-- <style scoped>
@keyframes scale-in {
  0% { opacity: 0; transform: scale(0.9); }
  100% { opacity: 1; transform: scale(1); }
}
.animate-scale-in {
  animation: scale-in 0.25s cubic-bezier(0.4,0,0.2,1);
}
</style> -->

