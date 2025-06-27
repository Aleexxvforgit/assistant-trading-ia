<template>
  <div class="max-w-3xl mx-auto p-6 text-white">
    <h1 class="text-3xl font-bold mb-6 text-center text-blue-400">Historique des trades</h1>

    <div v-if="trades.length === 0" class="text-center text-gray-400">
      Aucun trade enregistré pour l’instant.
    </div>

    <div
      v-for="(t, i) in trades"
      :key="i"
      class="bg-gray-900 rounded p-4 mb-4 border border-gray-700"
    >
      <p><strong>Date :</strong> {{ new Date(t.date).toLocaleString() }}</p>
      <p><strong>Actif :</strong> {{ t.asset }}</p>
      <p><strong>Entrée :</strong> {{ t.entry }} - <strong>Sortie :</strong> {{ t.exit }}</p>
      <p><strong>Résultat :</strong> {{ t.result }}</p>
      <p><strong>Stratégie :</strong> {{ t.strategy }}</p>
      <p><strong>Commentaire :</strong> {{ t.comment }}</p>
      <details class="mt-2">
        <summary class="text-blue-400 cursor-pointer">Voir l’analyse IA</summary>
        <p class="mt-2 whitespace-pre-wrap text-sm">{{ t.analysis }}</p>
      </details>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const trades = ref<any[]>([])

onMounted(() => {
  const stored = localStorage.getItem('trade-history')
  if (stored) trades.value = JSON.parse(stored)
})
</script>
