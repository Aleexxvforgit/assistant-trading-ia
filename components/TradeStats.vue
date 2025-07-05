<template>
  <div>
    <h3>{{ title }}</h3>
    <div v-if="trades.length === 0">
      <UIcon name="i-heroicons-chart-bar" />
      <p>Aucune donnée disponible</p>
    </div>
    <div v-else>
      <!-- Statistiques de base -->
      <div>
        <div>
          <div>Total des trades</div>
          <div>{{ trades.length }}</div>
        </div>
        <div>
          <div>Taux de réussite</div>
          <div>{{ winRate }}%</div>
        </div>
      </div>
      <!-- Distribution des trades -->
      <div>
        <div>
          <div>Gagnants</div>
          <div>
            <div :style="`width: ${winRate}%`"></div>
          </div>
          <div>{{ winCount }}</div>
        </div>
        <div>
          <div>Perdants</div>
          <div>
            <div :style="`width: ${lossRate}%`"></div>
          </div>
          <div>{{ lossCount }}</div>
        </div>
      </div>
      <!-- Types d'actifs -->
      <div v-if="showAssets">
        <h4>Actifs les plus tradés</h4>
        <div>
          <div v-for="(count, asset) in topAssets" :key="asset">
            <div>{{ asset }}</div>
            <div>
              <div :style="`width: ${(count / trades.length) * 100}%`"></div>
            </div>
            <div>{{ count }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Trade } from '~/stores/useTradesStore'

const props = defineProps<{
  trades: Trade[]
  title?: string
  showAssets?: boolean
}>()

// Valeurs par défaut
const title = props.title || 'Statistiques de trading'
const showAssets = props.showAssets !== undefined ? props.showAssets : true

// Compteurs
const winCount = computed(() => props.trades.filter(t => t.result?.includes('✅')).length)
const lossCount = computed(() => props.trades.filter(t => t.result?.includes('❌')).length)

// Taux
const winRate = computed(() => {
  if (props.trades.length === 0) return 0
  return Math.round((winCount.value / props.trades.length) * 100)
})
const lossRate = computed(() => {
  if (props.trades.length === 0) return 0
  return Math.round((lossCount.value / props.trades.length) * 100)
})

// Actifs les plus tradés
const topAssets = computed(() => {
  const assetCounts: Record<string, number> = {}
  
  props.trades.forEach(trade => {
    if (!trade.asset) return
    assetCounts[trade.asset] = (assetCounts[trade.asset] || 0) + 1
  })
  
  // Trier par nombre décroissant et prendre les 5 premiers
  return Object.fromEntries(
    Object.entries(assetCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
  )
})
</script>