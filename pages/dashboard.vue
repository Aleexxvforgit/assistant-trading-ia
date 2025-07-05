<template>
  <div>
    <main>
      <UCard>
        <template #header>
          <div>
            <h1>Dashboard Analytique</h1>
            <UBadge v-if="authStore.isOfflineMode">Mode Hors Ligne</UBadge>
          </div>
        </template>
        <div v-if="authStore.isAuthenticated">
          <div>
            <div>
              <h2>Statistiques globales</h2>
              <ul>
                <li><span>Nombre de trades :</span> {{ tradesStore.trades.length }}</li>
                <li><span>Winrate :</span> {{ winrate }}%</li>
                <li><span>PnL total :</span> {{ totalPnL }}</li>
                <li><span>Meilleur trade :</span> {{ bestTrade }}</li>
                <li><span>Pire trade :</span> {{ worstTrade }}</li>
              </ul>
            </div>
            <div>
              <h2>Répartition</h2>
              <!-- Placeholders pour graphiques -->
              <div>
                <span>[Graphique à venir]</span>
              </div>
            </div>
          </div>
          <div>
            <h2>Évolution du capital</h2>
            <div>
              <CapitalChart v-if="tradesStore.trades.length > 0" :trades="tradesStore.trades" />
              <span v-else>Aucun trade à afficher</span>
            </div>
          </div>
        </div>
        <div v-else>
          <UIcon name="i-heroicons-lock-closed" />
          <h2>Connexion requise</h2>
          <p>
            Vous devez être connecté pour accéder à cette page et consulter votre dashboard analytique.
          </p>
          <UButton to="/auth">
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
