<template>
  <div style="min-height: 100vh; background: var(--background); margin-top: 80px;">
    <!-- Hero Section -->
    <section style="padding: 3rem 1rem; text-align: center; background: var(--background);">
      <div style="max-width: 800px; margin: 0 auto; margin-bottom: 3rem;">
        <!-- Logo/Titre principal -->
        <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin-bottom: 2rem;">
          <span style="font-size: 3rem; font-weight: bold; background: linear-gradient(135deg, var(--primary) 0%, var(--primary-600) 100%); -webkit-background-clip: text; background-clip: text; color: transparent; line-height: 1; display: flex; align-items: center;">TradeGenius</span>
          <span style="font-size: 3rem; line-height: 1;">🤖</span>
        </div>
        
        <!-- Titre et description -->
        <h1 style="font-size: 2.5rem; font-weight: bold; color: var(--text); margin-bottom: 1.5rem; line-height: 1.2;">
          Dashboard Analytique
        </h1>
        <p style="font-size: 1.25rem; color: var(--text-secondary); margin-bottom: 0; line-height: 1.6;">
          Analysez vos performances et optimisez votre stratégie de trading
        </p>
      </div>
    </section>

    <!-- Contenu principal -->
    <main style="padding: 0 1rem 3rem; max-width: 800px; margin: 0 auto;">
      <div v-if="!authStore.isAuthenticated" style="text-align: center; padding: 3rem 1rem;">
        <div style="background: var(--card); border: 1px solid var(--border); border-radius: 20px; padding: 3rem; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08); backdrop-filter: blur(20px);">
          <div style="width: 64px; height: 64px; background: var(--warning-100); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto;">
            <Icon name="heroicons:lock-closed-20-solid" style="width: 32px; height: 32px; color: var(--warning-600);" />
          </div>
          <h2 style="font-size: 1.5rem; font-weight: 600; color: var(--text); margin-bottom: 1rem;">Connexion requise</h2>
          <p style="color: var(--text-secondary); margin-bottom: 2rem; line-height: 1.6;">
            Vous devez être connecté pour accéder au dashboard et consulter vos analyses.
          </p>
          <NuxtLink to="/auth" 
                    style="background: linear-gradient(135deg, var(--primary) 0%, var(--primary-600) 100%); color: white; padding: 1rem 2rem; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 1rem; transition: all 0.2s ease; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3); display: inline-block;"
                    onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 24px rgba(59, 130, 246, 0.4)'"
                    onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(59, 130, 246, 0.3)'">
            Se connecter
          </NuxtLink>
        </div>
      </div>

      <template v-else>
        <!-- Badge Mode Hors Ligne -->
        <div v-if="authStore.isOfflineMode" style="margin-bottom: 2rem; text-align: center;">
          <span style="background: var(--warning-100); color: var(--warning-700); padding: 0.5rem 1rem; border-radius: 16px; font-size: 0.875rem; font-weight: 600; border: 1px solid var(--warning-200);">
            Mode Hors Ligne
          </span>
        </div>

        <!-- Statistiques globales -->
        <div style="background: var(--card); border: 1px solid var(--border); border-radius: 20px; padding: 2.5rem; margin-bottom: 2rem; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08); backdrop-filter: blur(20px);">
          <h2 style="font-size: 1.5rem; font-weight: 600; color: var(--text); margin-bottom: 2rem; display: flex; align-items: center; gap: 0.5rem;">
            <Icon name="heroicons:chart-bar-20-solid" style="width: 20px; height: 20px; color: var(--primary);" />
            Statistiques globales
          </h2>

          <div v-if="tradesStore.trades.length === 0" style="text-align: center; padding: 2rem;">
            <div style="width: 64px; height: 64px; background: var(--muted); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto;">
              <Icon name="heroicons:chart-pie-20-solid" style="width: 32px; height: 32px; color: var(--text-secondary);" />
            </div>
            <h3 style="font-size: 1.125rem; font-weight: 600; color: var(--text); margin-bottom: 0.5rem;">Aucune donnée disponible</h3>
            <p style="color: var(--text-secondary); margin-bottom: 1.5rem; line-height: 1.6;">
              Commencez à analyser vos trades pour voir vos statistiques.
            </p>
            <NuxtLink to="/" 
                      style="background: var(--primary); color: white; padding: 0.75rem 1.5rem; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 0.875rem; transition: all 0.2s ease;"
                      onmouseover="this.style.background='var(--primary-600)'"
                      onmouseout="this.style.background='var(--primary)'">
              Analyser un trade
            </NuxtLink>
          </div>

          <div v-else style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem;">
            <!-- Nombre de trades -->
            <div style="background: var(--background); border: 1px solid var(--border); border-radius: 16px; padding: 1.5rem; text-align: center;">
              <div style="font-size: 2rem; font-weight: 700; color: var(--primary); margin-bottom: 0.5rem;">
                {{ tradesStore.trades.length }}
              </div>
              <div style="font-size: 0.875rem; color: var(--text-secondary); font-weight: 500;">
                Trades analysés
              </div>
            </div>

            <!-- Winrate -->
            <div style="background: var(--background); border: 1px solid var(--border); border-radius: 16px; padding: 1.5rem; text-align: center;">
              <div :style="`font-size: 2rem; font-weight: 700; color: ${winrate >= 50 ? 'var(--success-600)' : 'var(--destructive-600)'}; margin-bottom: 0.5rem;`">
                {{ winrate }}%
              </div>
              <div style="font-size: 0.875rem; color: var(--text-secondary); font-weight: 500;">
                Taux de réussite
              </div>
            </div>

            <!-- PnL Total -->
            <div style="background: var(--background); border: 1px solid var(--border); border-radius: 16px; padding: 1.5rem; text-align: center;">
              <div :style="`font-size: 2rem; font-weight: 700; color: ${totalPnL >= 0 ? 'var(--success-600)' : 'var(--destructive-600)'}; margin-bottom: 0.5rem;`">
                {{ totalPnL >= 0 ? '+' : '' }}{{ totalPnL.toFixed(2) }}%
              </div>
              <div style="font-size: 0.875rem; color: var(--text-secondary); font-weight: 500;">
                Performance totale
              </div>
            </div>

            <!-- Meilleur trade -->
            <div style="background: var(--background); border: 1px solid var(--border); border-radius: 16px; padding: 1.5rem; text-align: center;">
              <div style="font-size: 2rem; font-weight: 700; color: var(--success-600); margin-bottom: 0.5rem;">
                +{{ bestTrade.toFixed(2) }}%
              </div>
              <div style="font-size: 0.875rem; color: var(--text-secondary); font-weight: 500;">
                Meilleur trade
              </div>
            </div>

            <!-- Pire trade -->
            <div style="background: var(--background); border: 1px solid var(--border); border-radius: 16px; padding: 1.5rem; text-align: center;">
              <div style="font-size: 2rem; font-weight: 700; color: var(--destructive-600); margin-bottom: 0.5rem;">
                {{ worstTrade.toFixed(2) }}%
              </div>
              <div style="font-size: 0.875rem; color: var(--text-secondary); font-weight: 500;">
                Pire trade
              </div>
            </div>
          </div>
        </div>

        <!-- Répartition et analyses -->
        <div style="background: var(--card); border: 1px solid var(--border); border-radius: 20px; padding: 2.5rem; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08); backdrop-filter: blur(20px);">
          <h2 style="font-size: 1.5rem; font-weight: 600; color: var(--text); margin-bottom: 2rem; display: flex; align-items: center; gap: 0.5rem;">
            <Icon name="heroicons:chart-pie-20-solid" style="width: 20px; height: 20px; color: var(--primary);" />
            Analyses avancées
          </h2>

          <div style="background: var(--info-50); border: 2px solid var(--info-200); border-radius: 16px; padding: 2rem; text-align: center;">
            <Icon name="heroicons:wrench-screwdriver-20-solid" style="width: 48px; height: 48px; color: var(--info-600); margin: 0 auto 1rem auto; display: block;" />
            <h3 style="font-size: 1.125rem; font-weight: 600; color: var(--info-700); margin-bottom: 0.75rem;">
              Graphiques et analyses en développement
            </h3>
            <p style="color: var(--info-700); margin: 0; opacity: 0.9; line-height: 1.5;">
              Les graphiques avancés et les analyses détaillées seront bientôt disponibles pour vous aider à optimiser vos stratégies de trading.
            </p>
          </div>
        </div>
      </template>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '~/stores/useAuthStore'
import { useTradesStore } from '~/stores/useTradesStore'

const authStore = useAuthStore()
const tradesStore = useTradesStore()

// Calculs des statistiques
const winrate = computed(() => {
  if (tradesStore.trades.length === 0) return 0
  const winners = tradesStore.trades.filter(trade => {
    const pnl = (trade.exit - trade.entry) / trade.entry * (trade.type === 'buy' ? 1 : -1)
    return pnl > 0
  }).length
  return Math.round((winners / tradesStore.trades.length) * 100)
})

const totalPnL = computed(() => {
  return tradesStore.trades.reduce((total, trade) => {
    const pnl = (trade.exit - trade.entry) / trade.entry * 100 * (trade.type === 'buy' ? 1 : -1)
    return total + pnl
  }, 0)
})

const bestTrade = computed(() => {
  if (tradesStore.trades.length === 0) return 0
  return Math.max(...tradesStore.trades.map(trade => {
    return (trade.exit - trade.entry) / trade.entry * 100 * (trade.type === 'buy' ? 1 : -1)
  }))
})

const worstTrade = computed(() => {
  if (tradesStore.trades.length === 0) return 0
  return Math.min(...tradesStore.trades.map(trade => {
    return (trade.exit - trade.entry) / trade.entry * 100 * (trade.type === 'buy' ? 1 : -1)
  }))
})
</script>
