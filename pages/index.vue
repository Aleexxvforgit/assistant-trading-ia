<template>
  <div class="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
    <!-- Contenu principal -->
    <main class="flex flex-col items-center justify-center min-h-screen px-4 py-12">
      <h1 class="text-4xl font-bold mb-6 text-center">
        Assistant IA de Trading 📊
      </h1>

      <form @submit.prevent="analyserTrade" class="space-y-4 w-full max-w-md">
        <div>
          <label class="block mb-1 font-medium">Type de trade</label>
          <select v-model="trade.type" class="w-full p-2 rounded bg-gray-100 dark:bg-gray-800">
            <option value="buy">Achat</option>
            <option value="sell">Vente</option>
          </select>
        </div>

        <div>
          <label class="block mb-1 font-medium">Actif</label>
          <input
            v-model="trade.asset"
            type="text"
            placeholder="EUR/USD, BTC/USDT..."
            class="w-full p-2 rounded bg-gray-100 dark:bg-gray-800"
          />
        </div>

        <div>
          <label class="block mb-1 font-medium">Prix d'entrée</label>
          <input
            v-model.number="trade.entry"
            type="number"
            step="0.0001"
            class="w-full p-2 rounded bg-gray-100 dark:bg-gray-800"
          />
        </div>

        <div>
          <label class="block mb-1 font-medium">Prix de sortie</label>
          <input
            v-model.number="trade.exit"
            type="number"
            step="0.0001"
            class="w-full p-2 rounded bg-gray-100 dark:bg-gray-800"
          />
        </div>

        <button type="submit" :disabled="isLoading" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
          {{ isLoading ? 'Analyse en cours...' : 'Analyser le trade' }}
        </button>
      </form>

      <div v-if="result" class="mt-6 text-center max-w-md">
        <h2 class="text-xl font-bold mb-2">Résultat :</h2>
        <p>{{ result }}</p>
      </div>

      <p class="mt-4">Thème actuel : {{ theme }}</p>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { $fetch } from 'ofetch'
import { useTheme } from '@/composables/useTheme'

const { theme, toggleTheme } = useTheme()

const trade = ref({
  type: 'buy',
  asset: '',
  entry: null as number | null,
  exit: null as number | null,
})

const isLoading = ref(false)
const result = ref('')
const pendingTrade = ref(false)

const analyserTrade = async () => {
  isLoading.value = true
  pendingTrade.value = true
  result.value = ''

  try {
    const response = await $fetch('/api/analyse-trade', {
      method: 'POST',
      body: trade.value,
    })
    console.log('Réponse de l’analyse :', response)

    result.value = response.result || 'Aucune réponse reçue'

    const history = JSON.parse(localStorage.getItem('tradeHistory') || '[]')
    history.push({ ...trade.value, result: result.value })
    localStorage.setItem('tradeHistory', JSON.stringify(history))
  } catch (e) {
    result.value = '❌ Erreur pendant l’analyse du trade.'
  } finally {
    isLoading.value = false
    pendingTrade.value = false
  }
}
</script>

<style scoped>
/* Tu peux ajouter du style personnalisé ici si nécessaire */
</style>
