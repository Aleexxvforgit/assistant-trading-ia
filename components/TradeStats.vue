<template>
  <div style="background: var(--card); border: 1px solid var(--border); border-radius: 20px; padding: 2.5rem; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08); backdrop-filter: blur(20px);">
    <h2 style="font-size: 1.5rem; font-weight: 600; color: var(--text); margin-bottom: 2rem; display: flex; align-items: center; gap: 0.5rem;">
      <Icon name="heroicons:chart-bar-20-solid" style="width: 20px; height: 20px; color: var(--primary);" />
      {{ title }}
    </h2>
    
    <div v-if="trades.length === 0" style="text-align: center; padding: 2rem 0;">
      <div style="width: 64px; height: 64px; background: var(--muted); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto;">
        <Icon name="heroicons:chart-bar-20-solid" style="width: 32px; height: 32px; color: var(--text-secondary);" />
      </div>
      <p style="color: var(--text-secondary); font-size: 1rem; margin: 0;">Aucune donnée disponible</p>
    </div>
    
    <div v-else>
      <!-- Statistiques de base -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
        <div style="background: var(--background); border: 1px solid var(--border); border-radius: 16px; padding: 1.5rem; text-align: center;">
          <div style="color: var(--text-secondary); font-size: 0.875rem; font-weight: 600; margin-bottom: 0.5rem;">Total des trades</div>
          <div style="color: var(--text); font-size: 2rem; font-weight: bold;">{{ trades.length }}</div>
        </div>
        <div style="background: var(--background); border: 1px solid var(--border); border-radius: 16px; padding: 1.5rem; text-align: center;">
          <div style="color: var(--text-secondary); font-size: 0.875rem; font-weight: 600; margin-bottom: 0.5rem;">Taux de réussite</div>
          <div style="color: var(--success-600); font-size: 2rem; font-weight: bold;">{{ winRate }}%</div>
        </div>
      </div>
      
      <!-- Distribution des trades -->
      <div style="margin-bottom: 2rem;">
        <h3 style="font-size: 1.125rem; font-weight: 600; color: var(--text); margin-bottom: 1rem;">Distribution des résultats</h3>
        <div style="display: grid; gap: 1rem;">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <div style="min-width: 80px; color: var(--text-secondary); font-size: 0.875rem; font-weight: 600;">Gagnants</div>
            <div style="flex: 1; background: var(--muted); border-radius: 8px; height: 8px; overflow: hidden;">
              <div 
                :style="`width: ${winRate}%; background: linear-gradient(90deg, var(--success-500), var(--success-600)); height: 100%; border-radius: 8px; transition: all 0.3s ease;`">
              </div>
            </div>
            <div style="min-width: 40px; color: var(--success-600); font-weight: 600; font-size: 0.875rem; text-align: right;">{{ winCount }}</div>
          </div>
          <div style="display: flex; align-items: center; gap: 1rem;">
            <div style="min-width: 80px; color: var(--text-secondary); font-size: 0.875rem; font-weight: 600;">Perdants</div>
            <div style="flex: 1; background: var(--muted); border-radius: 8px; height: 8px; overflow: hidden;">
              <div 
                :style="`width: ${lossRate}%; background: linear-gradient(90deg, var(--danger-500), var(--danger-600)); height: 100%; border-radius: 8px; transition: all 0.3s ease;`">
              </div>
            </div>
            <div style="min-width: 40px; color: var(--danger-600); font-weight: 600; font-size: 0.875rem; text-align: right;">{{ lossCount }}</div>
          </div>
        </div>
      </div>
      
      <!-- Types d'actifs -->
      <div v-if="showAssets && Object.keys(topAssets).length > 0">
        <h3 style="font-size: 1.125rem; font-weight: 600; color: var(--text); margin-bottom: 1rem;">Actifs les plus tradés</h3>
        <div style="display: grid; gap: 0.75rem;">
          <div 
            v-for="(count, asset) in topAssets" 
            :key="asset"
            style="display: flex; align-items: center; gap: 1rem; padding: 0.75rem; background: var(--background); border: 1px solid var(--border); border-radius: 12px;">
            <div style="min-width: 80px; color: var(--text); font-weight: 600; font-size: 0.875rem;">{{ asset }}</div>
            <div style="flex: 1; background: var(--muted); border-radius: 6px; height: 6px; overflow: hidden;">
              <div 
                :style="`width: ${(count / trades.length) * 100}%; background: linear-gradient(90deg, var(--primary), var(--primary-600)); height: 100%; border-radius: 6px; transition: all 0.3s ease;`">
              </div>
            </div>
            <div style="min-width: 40px; color: var(--primary); font-weight: 600; font-size: 0.875rem; text-align: right;">{{ count }}</div>
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