// composables/useTradeHistory.ts
import { ref, onMounted } from 'vue'

export interface TradeEntry {
  asset: string
  entry: string
  exit: string
  result: string
  strategy: string
  comment: string
  analysis?: string
}

const tradeHistory = ref<TradeEntry[]>([])

export function useTradeHistory() {
  const loadHistory = () => {
    const saved = localStorage.getItem('tradeHistory')
    if (saved) {
      tradeHistory.value = JSON.parse(saved)
    }
  }

  const addTrade = (entry: TradeEntry) => {
    tradeHistory.value.push(entry)
    localStorage.setItem('tradeHistory', JSON.stringify(tradeHistory.value))
  }

  const removeTrade = (index: number) => {
    tradeHistory.value.splice(index, 1)
    localStorage.setItem('tradeHistory', JSON.stringify(tradeHistory.value))
  }

  onMounted(() => {
    loadHistory()
  })

  return {
    tradeHistory,
    addTrade,
    removeTrade,
    loadHistory
  }
}
