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
          Historique des trades
        </h1>
        <p style="font-size: 1.25rem; color: var(--text-secondary); margin-bottom: 0; line-height: 1.6;">
          Consultez et analysez vos performances de trading
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
            Vous devez être connecté pour accéder à cette page et consulter votre historique de trades.
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

        <!-- Statistiques -->
        <div style="margin-bottom: 2rem;">
          <TradeStats :trades="tradesStore.trades" title="Statistiques globales" />
        </div>

        <!-- Card Filtres -->
        <div style="background: var(--card); border: 1px solid var(--border); border-radius: 20px; padding: 2.5rem; margin-bottom: 2rem; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08); backdrop-filter: blur(20px);">
          <h2 style="font-size: 1.5rem; font-weight: 600; color: var(--text); margin-bottom: 2rem; display: flex; align-items: center; gap: 0.5rem;">
            <Icon name="heroicons:funnel-20-solid" style="width: 20px; height: 20px; color: var(--primary);" />
            Filtres avancés
          </h2>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
            <!-- Type de trade -->
            <div>
              <label for="filter-type" style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: var(--text); font-size: 0.875rem;">
                Type de trade
              </label>
              <select id="filter-type" 
                      v-model="filters.type"
                      style="width: 100%; padding: 1rem; border: 2px solid var(--border); border-radius: 12px; background: var(--background); color: var(--text); font-size: 1rem; transition: all 0.2s ease;"
                      onfocus="this.style.borderColor='var(--primary)'; this.style.boxShadow='0 0 0 3px rgba(59, 130, 246, 0.1)'"
                      onblur="this.style.borderColor='var(--border)'; this.style.boxShadow='none'">
                <option value="all">Tous</option>
                <option value="buy">Achat</option>
                <option value="sell">Vente</option>
              </select>
            </div>

            <!-- Résultat -->
            <div>
              <label for="filter-result" style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: var(--text); font-size: 0.875rem;">
                Résultat
              </label>
              <select id="filter-result" 
                      v-model="filters.result"
                      style="width: 100%; padding: 1rem; border: 2px solid var(--border); border-radius: 12px; background: var(--background); color: var(--text); font-size: 1rem; transition: all 0.2s ease;"
                      onfocus="this.style.borderColor='var(--primary)'; this.style.boxShadow='0 0 0 3px rgba(59, 130, 246, 0.1)'"
                      onblur="this.style.borderColor='var(--border)'; this.style.boxShadow='none'">
                <option value="all">Tous</option>
                <option value="win">Gagnant</option>
                <option value="loss">Perdant</option>
              </select>
            </div>

            <!-- Actif -->
            <div>
              <label for="filter-asset" style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: var(--text); font-size: 0.875rem;">
                Actif
              </label>
              <input id="filter-asset" 
                     v-model="filters.asset" 
                     type="text"
                     placeholder="Filtrer par actif..." 
                     style="width: 100%; padding: 1rem; border: 2px solid var(--border); border-radius: 12px; background: var(--background); color: var(--text); font-size: 1rem; transition: all 0.2s ease;"
                     onfocus="this.style.borderColor='var(--primary)'; this.style.boxShadow='0 0 0 3px rgba(59, 130, 246, 0.1)'"
                     onblur="this.style.borderColor='var(--border)'; this.style.boxShadow='none'" />
            </div>

            <!-- Stratégie -->
            <div>
              <label for="filter-strategy" style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: var(--text); font-size: 0.875rem;">
                Stratégie
              </label>
              <select id="filter-strategy" 
                      v-model="filters.strategy"
                      style="width: 100%; padding: 1rem; border: 2px solid var(--border); border-radius: 12px; background: var(--background); color: var(--text); font-size: 1rem; transition: all 0.2s ease;"
                      onfocus="this.style.borderColor='var(--primary)'; this.style.boxShadow='0 0 0 3px rgba(59, 130, 246, 0.1)'"
                      onblur="this.style.borderColor='var(--border)'; this.style.boxShadow='none'">
                <option value="all">Toutes</option>
                <option value="breakout">Breakout</option>
                <option value="range">Range</option>
                <option value="trend">Tendance</option>
                <option value="scalping">Scalping</option>
                <option value="swing">Swing</option>
              </select>
            </div>

            <!-- Commentaire -->
            <div>
              <label for="filter-comment" style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: var(--text); font-size: 0.875rem;">
                Commentaire
              </label>
              <input id="filter-comment" 
                     v-model="filters.comment" 
                     type="text"
                     placeholder="Filtrer par commentaire..." 
                     style="width: 100%; padding: 1rem; border: 2px solid var(--border); border-radius: 12px; background: var(--background); color: var(--text); font-size: 1rem; transition: all 0.2s ease;"
                     onfocus="this.style.borderColor='var(--primary)'; this.style.boxShadow='0 0 0 3px rgba(59, 130, 246, 0.1)'"
                     onblur="this.style.borderColor='var(--border)'; this.style.boxShadow='none'" />
            </div>
          </div>

          <!-- Actions -->
          <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;">
            <button @click="resetFilters" 
                    style="background: var(--muted); color: var(--text); padding: 0.75rem 1.5rem; border: 2px solid var(--border); border-radius: 12px; font-weight: 600; font-size: 0.875rem; cursor: pointer; transition: all 0.2s ease;"
                    onmouseover="this.style.borderColor='var(--primary-200)'; this.style.transform='translateY(-1px)'"
                    onmouseout="this.style.borderColor='var(--border)'; this.style.transform='translateY(0)'">
              Réinitialiser
            </button>
            
            <button @click="exportTrades" 
                    style="background: var(--success-100); color: var(--success-700); padding: 0.75rem 1.5rem; border: 2px solid var(--success-200); border-radius: 12px; font-weight: 600; font-size: 0.875rem; cursor: pointer; transition: all 0.2s ease;"
                    onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 12px rgba(34, 197, 94, 0.2)'"
                    onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
              Exporter CSV
            </button>
            
            <div style="position: relative;">
              <button @click="() => csvInput?.click()" 
                      style="background: var(--info-100); color: var(--info-700); padding: 0.75rem 1.5rem; border: 2px solid var(--info-200); border-radius: 12px; font-weight: 600; font-size: 0.875rem; cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; gap: 0.5rem;"
                      onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 12px rgba(59, 130, 246, 0.2)'"
                      onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                <Icon name="heroicons:arrow-up-tray-20-solid" style="width: 16px; height: 16px;" />
                Importer CSV
              </button>
              <input ref="csvInput" type="file" accept=".csv" @change="handleCsvImport" style="display: none;" />
            </div>
            
            <button @click="resetHistory" 
                    style="background: var(--destructive-100); color: var(--destructive-700); padding: 0.75rem 1.5rem; border: 2px solid var(--destructive-200); border-radius: 12px; font-weight: 600; font-size: 0.875rem; cursor: pointer; transition: all 0.2s ease;"
                    onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 12px rgba(220, 38, 38, 0.2)'"
                    onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
              Effacer l'historique
            </button>
            
            <button @click="syncCloud" 
                    style="background: linear-gradient(135deg, var(--primary) 0%, var(--primary-600) 100%); color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 12px; font-weight: 600; font-size: 0.875rem; cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; gap: 0.5rem; box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);"
                    onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 16px rgba(59, 130, 246, 0.3)'"
                    onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(59, 130, 246, 0.2)'">
              <Icon name="heroicons:cloud-arrow-up-20-solid" style="width: 16px; height: 16px;" />
              Synchroniser
            </button>
            
            <div v-if="tradesStore.trades.length === 0">
              <button @click="syncFromCloud" 
                      style="background: var(--accent-100, var(--primary-100)); color: var(--accent-700, var(--primary-700)); padding: 0.75rem 1.5rem; border: 2px solid var(--accent-200, var(--primary-200)); border-radius: 12px; font-weight: 600; font-size: 0.875rem; cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; gap: 0.5rem;"
                      onmouseover="this.style.transform='translateY(-1px)'"
                      onmouseout="this.style.transform='translateY(0)'">
                <Icon name="heroicons:cloud-arrow-down-20-solid" style="width: 16px; height: 16px;" />
                Récupérer du cloud
              </button>
            </div>
          </div>
        </div>

        <!-- Card Liste des trades -->
        <div style="background: var(--card); border: 1px solid var(--border); border-radius: 20px; padding: 2.5rem; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08); backdrop-filter: blur(20px);">
          <h2 style="font-size: 1.5rem; font-weight: 600; color: var(--text); margin-bottom: 2rem; display: flex; align-items: center; gap: 0.5rem;">
            <Icon name="heroicons:list-bullet-20-solid" style="width: 20px; height: 20px; color: var(--primary);" />
            Historique des trades ({{ filteredTrades.length }})
          </h2>

          <!-- Message si aucun trade -->
          <div v-if="filteredTrades.length === 0" style="text-align: center; padding: 3rem 1rem;">
            <div style="width: 64px; height: 64px; background: var(--muted); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto;">
              <Icon name="heroicons:chart-bar-20-solid" style="width: 32px; height: 32px; color: var(--text-secondary);" />
            </div>
            <h3 style="font-size: 1.25rem; font-weight: 600; color: var(--text); margin-bottom: 0.5rem;">
              {{ tradesStore.trades.length === 0 ? 'Aucun trade enregistré' : 'Aucun trade ne correspond aux filtres' }}
            </h3>
            <p style="color: var(--text-secondary); margin-bottom: 2rem; line-height: 1.6;">
              {{ tradesStore.trades.length === 0 ? 'Commencez à analyser vos trades pour voir votre historique ici.' : 'Essayez de modifier vos critères de filtrage.' }}
            </p>
            <NuxtLink v-if="tradesStore.trades.length === 0" to="/" 
                      style="background: linear-gradient(135deg, var(--primary) 0%, var(--primary-600) 100%); color: white; padding: 0.875rem 1.75rem; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 0.95rem; transition: all 0.2s ease; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3); display: inline-block;"
                      onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 24px rgba(59, 130, 246, 0.4)'"
                      onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(59, 130, 246, 0.3)'">
              Analyser un trade
            </NuxtLink>
          </div>

          <!-- Liste des trades -->
          <div v-else style="display: grid; gap: 1rem;">
            <div v-for="trade in filteredTrades" 
                 :key="trade.id" 
                 style="background: var(--background); border: 1px solid var(--border); border-radius: 16px; padding: 1.5rem; transition: all 0.2s ease;"
                 onmouseover="this.style.borderColor='var(--primary-200)'; this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 24px rgba(0, 0, 0, 0.08)'"
                 onmouseout="this.style.borderColor='var(--border)'; this.style.transform='translateY(0)'; this.style.boxShadow='none'">
              
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                <div>
                  <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
                    <span :style="`background: ${trade.type === 'buy' ? 'var(--success-100)' : 'var(--destructive-100)'}; color: ${trade.type === 'buy' ? 'var(--success-700)' : 'var(--destructive-700)'}; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase;`">
                      {{ trade.type === 'buy' ? 'Achat' : 'Vente' }}
                    </span>
                    <span style="font-weight: 600; color: var(--text); font-size: 1.125rem;">{{ trade.asset }}</span>
                  </div>
                  <p style="color: var(--text-secondary); font-size: 0.875rem; margin: 0;">
                    {{ new Date(trade.createdAt).toLocaleDateString('fr-FR') }}
                  </p>
                </div>
                
                <div style="text-align: right;">
                  <div :style="`font-size: 1.125rem; font-weight: 700; color: ${(trade.exit - trade.entry) * (trade.type === 'buy' ? 1 : -1) > 0 ? 'var(--success-600)' : 'var(--destructive-600)'};`">
                    {{ (trade.exit - trade.entry) * (trade.type === 'buy' ? 1 : -1) > 0 ? '+' : '' }}{{ ((trade.exit - trade.entry) / trade.entry * 100 * (trade.type === 'buy' ? 1 : -1)).toFixed(2) }}%
                  </div>
                  <div style="font-size: 0.875rem; color: var(--text-secondary);">
                    {{ trade.entry }} → {{ trade.exit }}
                  </div>
                </div>
              </div>
              
              <div v-if="trade.strategy" style="margin-bottom: 0.75rem;">
                <span style="background: var(--info-100); color: var(--info-700); padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.75rem; font-weight: 500;">
                  {{ trade.strategy }}
                </span>
              </div>
              
              <div v-if="trade.comment" style="background: var(--muted); padding: 1rem; border-radius: 12px; margin-top: 0.75rem;">
                <p style="color: var(--text); font-size: 0.875rem; margin: 0; line-height: 1.5;">{{ trade.comment }}</p>
              </div>

              <div v-if="trade.result" style="background: var(--background); border: 1px solid var(--border); padding: 1rem; border-radius: 12px; margin-top: 0.75rem;">
                <h4 style="font-size: 0.875rem; font-weight: 600; color: var(--text); margin: 0 0 0.5rem 0;">Analyse IA :</h4>
                <p style="color: var(--text); font-size: 0.875rem; margin: 0; line-height: 1.5; white-space: pre-wrap;">{{ trade.result }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal de confirmation de suppression -->
        <div v-if="showDeleteModal" style="position: fixed; inset: 0; background: rgba(0, 0, 0, 0.5); display: flex; align-items: center; justify-content: center; z-index: 9999; padding: 1rem;" @click="showDeleteModal = false">
          <div style="background: var(--card); border: 1px solid var(--border); border-radius: 20px; padding: 2rem; max-width: 400px; width: 100%; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);" @click.stop>
            <h3 style="font-size: 1.25rem; font-weight: 600; color: var(--text); margin-bottom: 1rem;">Confirmer la suppression</h3>
            <p style="color: var(--text-secondary); margin-bottom: 2rem; line-height: 1.6;">
              Êtes-vous sûr de vouloir supprimer tout votre historique de trades ? Cette action est irréversible.
            </p>
            <div style="display: flex; gap: 1rem; justify-content: flex-end;">
              <button @click="showDeleteModal = false" 
                      style="background: var(--muted); color: var(--text); padding: 0.75rem 1.5rem; border: 2px solid var(--border); border-radius: 12px; font-weight: 600; cursor: pointer; transition: all 0.2s ease;"
                      onmouseover="this.style.borderColor='var(--primary-200)'"
                      onmouseout="this.style.borderColor='var(--border)'">
                Annuler
              </button>
              <button @click="confirmDeleteHistory" 
                      style="background: var(--destructive); color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 12px; font-weight: 600; cursor: pointer; transition: all 0.2s ease;"
                      onmouseover="this.style.background='var(--destructive-600)'"
                      onmouseout="this.style.background='var(--destructive)'">
                Supprimer
              </button>
            </div>
          </div>
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
    if (filters.value.result === 'win') {
      const pnl = (trade.exit - trade.entry) / trade.entry * (trade.type === 'buy' ? 1 : -1)
      if (pnl <= 0) return false
    }
    if (filters.value.result === 'loss') {
      const pnl = (trade.exit - trade.entry) / trade.entry * (trade.type === 'buy' ? 1 : -1)
      if (pnl >= 0) return false
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
  const headers = ['Type', 'Actif', 'Entrée', 'Sortie', 'Résultat (%)', 'Stratégie', 'Commentaire', 'Date']
  const csvContent = [
    headers.join(','),
    ...filteredTrades.value.map(trade => {
      const pnl = ((trade.exit - trade.entry) / trade.entry * 100 * (trade.type === 'buy' ? 1 : -1)).toFixed(2)
      return [
        trade.type,
        trade.asset,
        trade.entry,
        trade.exit,
        pnl,
        trade.strategy || '',
        trade.comment?.replace(/,/g, ';') || '',
        new Date(trade.createdAt).toLocaleString()
      ].map(field => `"${field}"`).join(',')
    })
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

// Référence pour l'input file
const csvInput = ref<HTMLInputElement>()

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
      const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/"/g, ''))
      const required = ['type', 'asset', 'entry', 'exit']
      
      if (!required.every(r => headers.includes(r))) {
        alert('Le CSV doit contenir les colonnes : type, asset, entry, exit')
        return
      }
      
      const trades = lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim().replace(/"/g, ''))
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
            result: ''
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
