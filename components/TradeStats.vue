<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
    <h3 class="text-lg font-semibold mb-4">{{ title }}</h3>
    
    <div v-if="trades.length === 0" class="text-center py-8 text-gray-500">
      <UIcon name="i-heroicons-chart-bar" class="text-4xl mb-2" />
      <p>Aucune donnée disponible</p>
    </div>
    
    <div v-else>
      <!-- Statistiques de base -->
      <div class="grid grid-cols-2 gap-4 mb-6">
        <div class="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
          <div class="text-sm text-gray-500 dark:text-gray-400">Total des trades</div>
          <div class="text-2xl font-bold">{{ trades.length }}</div>
        </div>
        <div class="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
          <div class="text-sm text-gray-500 dark:text-gray-400">Taux de réussite</div>
          <div class="text-2xl font-bold">{{ winRate }}%</div>
        </div>
      </div>
      
      <!-- Distribution des trades -->
      <div class="space-y-2 mb-6">
        <div class="flex items-center">
          <div class="w-24 text-sm">Gagnants</div>
          <div class="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
            <div 
              class="bg-green-500 h-full" 
              :style="`width: ${winRate}%`"
            ></div>
          </div>
          <div class="w-12 text-right text-sm ml-2">{{ winCount }}</div>
        </div>
        <div class="flex items-center">
          <div class="w-24 text-sm">Perdants</div>
          <div class="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
            <div 
              class="bg-red-500 h-full" 
              :style="`width: ${lossRate}%`"
            ></div>
          </div>
          <div class="w-12 text-right text-sm ml-2">{{ lossCount }}</div>
        </div>
      </div>
      
      <!-- Types d'actifs -->
      <div v-if="showAssets" class="mb-6">
        <h4 class="text-sm font-medium mb-2">Actifs les plus tradés</h4>
        <div class="space-y-2">
          <div v-for="(count, asset) in topAssets" :key="asset" class="flex items-center">
            <div class="w-24 truncate text-sm">{{ asset }}</div>
            <div class="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
              <div 
                class="bg-blue-500 h-full" 
                :style="`width: ${(count / trades.length) * 100}%`"
              ></div>
            </div>
            <div class="w-12 text-right text-sm ml-2">{{ count }}</div>
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