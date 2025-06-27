<template>
  <div class="container">
    <!-- Ton formulaire d’ajout de trade ici (comme avant) -->

    <button @click="exportCSV" class="export-button">Exporter en CSV</button>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

interface TradeData {
  asset: string
  entry: string
  exit: string
  result: string
  strategy: string
  comment: string
}

// Exemple de trades stockés (tu pourras alimenter depuis un formulaire)
const trades = reactive<TradeData[]>([
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

function exportCSV() {
  // En-têtes CSV
  const headers = ['Actif', 'Entrée', 'Sortie', 'Résultat', 'Stratégie', 'Commentaire']
  const rows = trades.map(t => [t.asset, t.entry, t.exit, t.result, t.strategy, t.comment])

  // Construit le contenu CSV
  let csvContent = ''
  csvContent += headers.join(',') + '\n'
  rows.forEach(row => {
    // Échappe les virgules et guillemets si besoin
    const escapedRow = row.map(field => `"${String(field).replace(/"/g, '""')}"`)
    csvContent += escapedRow.join(',') + '\n'
  })

  // Crée un blob et un lien de téléchargement
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', 'trades_export.csv')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
.export-button {
  margin-top: 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
}

.export-button:hover {
  background-color: #2563eb;
}
</style>
