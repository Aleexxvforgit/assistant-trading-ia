<template>
  <div class="min-h-screen bg-[#0F1117] text-white p-6 max-w-4xl mx-auto space-y-10">
    <h1 class="text-4xl font-bold text-[#00FFC3]">Analyse de Trade</h1>

    <form @submit.prevent="submitTrade" class="space-y-4">
      <input v-model="trade.asset" type="text" placeholder="Actif (ex: EUR/USD)" class="w-full p-3 bg-gray-800 rounded-md placeholder-gray-400 text-white" />
      <input v-model="trade.entry" type="text" placeholder="Prix d'entrée" class="w-full p-3 bg-gray-800 rounded-md placeholder-gray-400 text-white" />
      <input v-model="trade.exit" type="text" placeholder="Prix de sortie" class="w-full p-3 bg-gray-800 rounded-md placeholder-gray-400 text-white" />
      <input v-model="trade.result" type="text" placeholder="Résultat (ex: +50 pips)" class="w-full p-3 bg-gray-800 rounded-md placeholder-gray-400 text-white" />
      <input v-model="trade.strategy" type="text" placeholder="Stratégie utilisée" class="w-full p-3 bg-gray-800 rounded-md placeholder-gray-400 text-white" />
      <textarea v-model="trade.comment" placeholder="Commentaire" class="w-full p-3 bg-gray-800 rounded-md placeholder-gray-400 text-white"></textarea>
      <button type="submit" class="bg-[#00FFC3] text-black px-6 py-3 rounded-md font-semibold hover:bg-opacity-80 transition">Analyser le trade</button>
    </form>

    <div v-if="isLoading" class="flex items-center gap-3 text-[#00FFC3]">
      <span class="loader animate-spin border-t-2 border-[#00FFC3] border-solid rounded-full h-5 w-5"></span>
      <span>Analyse en cours...</span>
    </div>

    <div v-if="pendingTrade" class="bg-gray-900 p-4 rounded-md border border-gray-700">
      <h2 class="text-xl text-[#00FFC3] font-semibold mb-2">Analyse en attente...</h2>
      <p class="text-sm text-gray-300">L'analyse sera affichée ici une fois l'appel API terminé.</p>
    </div>

    <div v-if="result" class="bg-gray-900 p-6 rounded-md border border-gray-700 space-y-4">
      <h2 class="text-2xl font-semibold text-[#00FFC3]">Analyse terminée :</h2>
      <p class="text-gray-200 whitespace-pre-line">{{ result }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const trade = ref({ asset: '', entry: '', exit: '', result: '', strategy: '', comment: '' })
const result = ref('')
const isLoading = ref(false)
const pendingTrade = ref(false)

async function submitTrade() {
  isLoading.value = true
  pendingTrade.value = true
  result.value = ''

  try {
    const response = await $fetch('/api/analyse-trade', {
      method: 'POST',
      body: trade.value
    })
    result.value = response.result || 'Aucune réponse reçue'
    const history = JSON.parse(localStorage.getItem('tradeHistory') || '[]')
    history.push({ ...trade.value, result: result.value })
    localStorage.setItem('tradeHistory', JSON.stringify(history))
  } catch (e) {
    result.value = 'Erreur pendant l’analyse du trade.'
  } finally {
    isLoading.value = false
    pendingTrade.value = false
  }
}
</script>

<style scoped>
.loader {
  border-width: 3px;
  border-right-color: transparent;
}
</style>
