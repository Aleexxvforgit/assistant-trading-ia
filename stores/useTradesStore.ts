// stores/useTradesStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

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
  
  // Charger les trades depuis le localStorage
  function loadTrades() {
    const storedTrades = localStorage.getItem('tradeHistory')
    if (storedTrades) {
      trades.value = JSON.parse(storedTrades)
    }
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
  
  return {
    trades,
    isLoading,
    loadTrades,
    addTrade,
    analyseTrade
  }
})