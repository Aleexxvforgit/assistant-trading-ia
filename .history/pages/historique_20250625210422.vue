<template>
  <div>
    <h1>Historique des trades</h1>

    <input
      v-model="searchTerm"
      type="text"
      placeholder="Rechercher par actif ou stratégie..."
    />

    <table v-if="filteredTrades.length">
      <thead>
        <tr>
          <th>Actif</th>
          <th>Entrée</th>
          <th>Sortie</th>
          <th>Résultat</th>
          <th>Stratégie</th>
          <th>Commentaire</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(trade, index) in filteredTrades" :key="index">
          <td data-label="Actif">{{ trade.asset }}</td>
          <td data-label="Entrée">{{ trade.entry }}</td>
          <td data-label="Sortie">{{ trade.exit }}</td>
          <td data-label="Résultat">{{ trade.result }}</td>
          <td data-label="Stratégie">{{ trade.strategy }}</td>
          <td data-label="Commentaire">{{ trade.comment }}</td>
        </tr>
      </tbody>
    </table>

    <p v-else>Aucun trade trouvé.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const trades = ref([
  {
    asset: 'EUR/USD',
    entry: '1.0800',
    exit: '1.0850',
    result: '+50 pips',
    strategy: 'Breakout + RSI',
    comment: 'Sortie anticipée pour news'
  },
  {
    asset: 'USD/JPY',
    entry: '110.50',
    exit: '111.00',
    result: '+50 pips',
    strategy: 'Support + MACD',
    comment: 'Bonne gestion du risque'
  }
])

const searchTerm = ref('')

const filteredTrades = computed(() => {
  if (!searchTerm.value) return trades.value
  return trades.value.filter(t =>
    t.asset.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    t.strategy.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})
</script>
