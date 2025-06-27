<template>
  <div class="container">
    <Header />
    <h1>Historique des trades</h1>

    <input
      v-model="searchTerm"
      type="text"
      placeholder="Rechercher par actif ou stratégie..."
      class="search-input"
    />

    <table class="trade-table" v-if="filteredTrades.length">
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
          <td>{{ trade.asset }}</td>
          <td>{{ trade.entry }}</td>
          <td>{{ trade.exit }}</td>
          <td>{{ trade.result }}</td>
          <td>{{ trade.strategy }}</td>
          <td>{{ trade.comment }}</td>
        </tr>
      </tbody>
    </table>

    <p v-else>Aucun trade trouvé.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Header from '~/components/Header.vue'

// Simule un store local, à remplacer par un vrai store ou stockage
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

<style scoped>
.container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 1rem;
  color: #333;
}

.search-input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.trade-table {
  width: 100%;
  border-collapse: collapse;
}

.trade-table th,
.trade-table td {
  padding: 0.75rem;
  border: 1px solid #ccc;
  text-align: left;
}

.trade-table th {
  background-color: #3b82f6;
  color: white;
}

.trade-table tbody tr:hover {
  background-color: #e0f2fe;
}
</style>
