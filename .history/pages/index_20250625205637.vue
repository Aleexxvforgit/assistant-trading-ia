<template>
  <div>
    <Header />

    <div class="container">
      <h1 class="text-2xl font-bold mb-4">Saisir un trade</h1>
      <form @submit.prevent="submitTrade" class="space-y-4">
        <!-- Ton formulaire ici, inchangé -->
        <input v-model="trade.asset" placeholder="Actif (ex: EUR/USD)" class="w-full p-2 border rounded" />
        <input v-model="trade.entry" placeholder="Entrée" class="w-full p-2 border rounded" />
        <input v-model="trade.exit" placeholder="Sortie" class="w-full p-2 border rounded" />
        <input v-model="trade.result" placeholder="Résultat (pips ou €)" class="w-full p-2 border rounded" />
        <input v-model="trade.strategy" placeholder="Stratégie / Indicateurs" class="w-full p-2 border rounded" />
        <textarea v-model="trade.comment" placeholder="Commentaire du trade" class="w-full p-2 border rounded"></textarea>
        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">Analyser avec l'IA</button>
      </form>

      <div v-if="analysis" class="mt-6 p-4 bg-gray-100 rounded">
        <h2 class="font-bold">Analyse IA</h2>
        <p>{{ analysis }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '~/components/Header.vue'

interface ApiResponse {
  result: string
}

const trade = reactive({
  asset: '', entry: '', exit: '', result: '', strategy: '', comment: ''
})
const analysis = ref('')

async function submitTrade() {
  const res: ApiResponse = await $fetch('/api/analyse-trade', {
    method: 'POST',
    body: trade
  })
  analysis.value = res.result
}
</script>

<style >

</style>
