// stores/useTradesStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useNuxtApp } from '#app'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { useAuthStore } from './useAuthStore'

export interface Trade {
  id: string;
  type: 'buy' | 'sell';
  asset: string;
  entry: number;
  exit: number;
  strategy?: string;
  comment?: string;
  result?: string;
  createdAt: Date;
}

export const useTradesStore = defineStore('trades', () => {
  const trades = ref<Trade[]>([])
  const isLoading = ref(false)
  
  // Charger les trades depuis le localStorage (robuste)
  function loadTrades() {
    const storedTrades = localStorage.getItem('tradeHistory')
    if (storedTrades) {
      try {
        const parsed = JSON.parse(storedTrades)
        if (Array.isArray(parsed)) {
          trades.value = parsed
        } else {
          throw new Error('Format invalide')
        }
      } catch (e) {
        // Données corrompues : on réinitialise
        console.warn('Historique corrompu, réinitialisation locale', e)
        localStorage.removeItem('tradeHistory')
        trades.value = []
      }
    }
  }

  // Réinitialiser l'historique local
  function resetHistory() {
    trades.value = []
    localStorage.removeItem('tradeHistory')
  }
  
  // Ajouter un trade (fonctionne même sans Firebase)
  function addTrade(trade: Omit<Trade, 'id' | 'createdAt'>) {
    isLoading.value = true
    
    try {
      const newTrade: Trade = {
        ...trade,
        id: `local-${Date.now()}`,
        createdAt: new Date()
      }
      
      trades.value.push(newTrade)
      
      // Sauvegarder dans localStorage
      localStorage.setItem('tradeHistory', JSON.stringify(trades.value))
      
      return newTrade
    } finally {
      isLoading.value = false
    }
  }
  
  // Analyser un trade (simulé)
  function analyseTrade(trade: Omit<Trade, 'id' | 'createdAt' | 'result'>) {
    isLoading.value = true
    
    return new Promise<string>((resolve) => {
      // Simuler un délai d'analyse
      setTimeout(() => {
        let result = ''
        
        // Logique de base pour l'analyse
        if (trade.type === 'buy') {
          const profit = trade.exit - trade.entry
          const profitPercentage = (profit / trade.entry) * 100
          
          if (profit > 0) {
            result = `✅ Bonne opération! Profit de ${profit.toFixed(4)} (${profitPercentage.toFixed(2)}%). `
            result += `Ce trade d'achat sur ${trade.asset} montre une bonne lecture du marché.`
          } else {
            result = `❌ Opération perdante. Perte de ${profit.toFixed(4)} (${profitPercentage.toFixed(2)}%). `
            result += `Revoir votre analyse pour ce trade d'achat sur ${trade.asset}.`
          }
        } else { // sell
          const profit = trade.entry - trade.exit
          const profitPercentage = (profit / trade.entry) * 100
          
          if (profit > 0) {
            result = `✅ Bonne opération! Profit de ${profit.toFixed(4)} (${profitPercentage.toFixed(2)}%). `
            result += `Ce trade de vente sur ${trade.asset} montre une bonne anticipation baissière.`
          } else {
            result = `❌ Opération perdante. Perte de ${profit.toFixed(4)} (${profitPercentage.toFixed(2)}%). `
            result += `Revoir votre analyse pour ce trade de vente sur ${trade.asset}.`
          }
        }
        
        isLoading.value = false
        resolve(result)
      }, 1000)
    })
  }
  
  // Synchroniser l'historique local vers Firestore (upload)
  async function syncToCloud() {
    const { $db } = useNuxtApp()
    const authStore = useAuthStore()
    if (!authStore.user?.id || authStore.isOfflineMode) return false
    const userId = authStore.user.id
    await setDoc(doc($db, 'tradeHistories', userId), {
      trades: trades.value
    })
    return true
  }

  // Récupérer l'historique Firestore (download)
  async function syncFromCloud() {
    const { $db } = useNuxtApp()
    const authStore = useAuthStore()
    if (!authStore.user?.id || authStore.isOfflineMode) return false
    const userId = authStore.user.id
    const snap = await getDoc(doc($db, 'tradeHistories', userId))
    if (snap.exists() && Array.isArray(snap.data().trades)) {
      trades.value = snap.data().trades
      localStorage.setItem('tradeHistory', JSON.stringify(trades.value))
      return true
    }
    return false
  }
  
  return {
    trades,
    isLoading,
    loadTrades,
    addTrade,
    analyseTrade,
    resetHistory,
    syncToCloud,
    syncFromCloud
  }
})