<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 text-black dark:text-white transition-colors duration-300">
    <!-- Contenu principal -->
    <main class="flex flex-col items-center justify-center min-h-screen px-4 py-12">
      <div class="flex flex-col items-center mb-10">
        <div class="flex items-center gap-3 mb-2">
          <span class="text-4xl font-extrabold text-indigo-600 dark:text-blue-400">TradeGenius</span>
          <span class="text-2xl">🤖</span>
        </div>
        <h1 class="text-3xl md:text-4xl font-bold text-center mb-2">Bienvenue sur votre assistant de trading</h1>
        <p class="text-base md:text-lg text-gray-600 dark:text-gray-300 text-center max-w-xl">Analysez vos trades, suivez vos performances et laissez l’IA vous guider vers de meilleures décisions !</p>
      </div>

      <UCard v-if="!authStore.isAuthenticated" class="w-full max-w-md mb-8">
        <UButton to="/auth" color="white" block class="py-2 text-base font-semibold rounded-xl shadow-sm flex items-center justify-center gap-2 bg-gray-100/60 hover:bg-gray-200/80 text-black border border-gray-200 dark:bg-gray-800/60 dark:hover:bg-gray-800/80 dark:text-white dark:border-gray-700 transition">
          <span class="i-heroicons-lock-closed"></span>
          Se connecter
        </UButton>
      </UCard>

      <form v-else @submit.prevent="analyserTrade" class="space-y-8 w-full max-w-lg bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 backdrop-blur">
        <h2 class="text-2xl font-bold mb-4 text-center">Nouvelle analyse de trade</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="trade-type" class="block mb-1 font-medium">Type de trade</label>
            <select
              id="trade-type"
              v-model="trade.type"
              required
              class="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base text-black dark:text-white"
            >
              <option value="" disabled selected hidden>Sélectionnez le type de trade</option>
              <option value="buy">Achat</option>
              <option value="sell">Vente</option>
            </select>
          </div>
          <div>
            <label for="trade-asset" class="block mb-1 font-medium">Actif</label>
            <UInput
              id="trade-asset"
              v-model="trade.asset"
              placeholder="EUR/USD, BTC/USDT..."
              required
              class="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>
          <div>
            <label for="trade-entry" class="block mb-1 font-medium">Prix d'entrée</label>
            <UInput
              id="trade-entry"
              v-model.number="trade.entry"
              type="number"
              step="0.0001"
              required
              class="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            />
          </div>
          <div>
            <label for="trade-exit" class="block mb-1 font-medium">Prix de sortie</label>
            <UInput
              id="trade-exit"
              v-model.number="trade.exit"
              type="number"
              step="0.0001"
              required
              class="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            />
          </div>
          <div class="md:col-span-2">
            <label for="trade-strategy" class="block mb-1 font-medium">Stratégie (optionnel)</label>
            <select
              id="trade-strategy"
              v-model="trade.strategy"
              class="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base text-black dark:text-white"
            >
              <option value="" selected hidden>Sélectionnez la stratégie</option>
              <option value="breakout">Breakout</option>
              <option value="range">Range</option>
              <option value="trend">Tendance</option>
              <option value="scalping">Scalping</option>
              <option value="swing">Swing</option>
            </select>
          </div>
          <div class="md:col-span-2">
            <label for="trade-comment" class="block mb-1 font-medium">Commentaire (optionnel)</label>
            <textarea
              id="trade-comment"
              v-model="trade.comment"
              rows="3"
              placeholder="Ajoutez un commentaire sur ce trade..."
              class="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base placeholder-gray-400 dark:placeholder-gray-500 resize-none"
            ></textarea>
          </div>
        </div>
        <div class="flex flex-col gap-2 mt-6">
          <UButton type="submit" color="white" :loading="tradesStore.isLoading" block class="py-2 text-base font-semibold rounded-xl bg-gray-100/60 hover:bg-gray-200/80 text-black border border-gray-200 dark:bg-gray-800/60 dark:hover:bg-gray-800/80 dark:text-white dark:border-gray-700 transition">
            {{ tradesStore.isLoading ? 'Analyse en cours...' : 'Analyser le trade' }}
          </UButton>
          <p class="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">Vos données restent confidentielles et ne sont utilisées que pour l’analyse IA locale.</p>
        </div>
      </form>

      <UCard v-if="result" class="mt-6 w-full max-w-md">
        <template #header>
          <h2 class="text-xl font-semibold">Résultat de l'analyse</h2>
        </template>
        <p class="whitespace-pre-wrap">{{ result }}</p>
        <template #footer>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Trade analysé en mode {{ authStore.isOfflineMode ? 'hors ligne' : 'en ligne' }}
          </p>
        </template>
      </UCard>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '~/stores/useAuthStore'
import { useTradesStore } from '~/stores/useTradesStore'

const authStore = useAuthStore()
const tradesStore = useTradesStore()
const trade = ref({
  type: '', // string pour gérer le placeholder
  asset: '',
  entry: null as number | null,
  exit: null as number | null,
  strategy: '',
  comment: ''
})

const result = ref('')
const analyserTrade = async () => {
  if ((trade.value.type !== 'buy' && trade.value.type !== 'sell') || !trade.value.asset || !trade.value.entry || !trade.value.exit) {
    return
  }
  try {
    // Analyser le trade avec notre store (qui fonctionne en mode hors ligne)
    result.value = await tradesStore.analyseTrade({
      type: trade.value.type as 'buy' | 'sell',
      asset: trade.value.asset,
      entry: trade.value.entry,
      exit: trade.value.exit
    })

    // Ajouter à l'historique
    tradesStore.addTrade({
      ...trade.value,
      type: trade.value.type as 'buy' | 'sell',
      entry: trade.value.entry ?? 0,
      exit: trade.value.exit ?? 0,
      result: result.value
    })

  } catch (e) {
    console.error(e)
    result.value = "❌ Erreur pendant l'analyse du trade."
  }
}
</script>
