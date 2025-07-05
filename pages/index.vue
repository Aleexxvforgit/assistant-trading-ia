<template>
  <div>
    <!-- Contenu principal -->
    <main>
      <div>
        <div>
          <span>TradeGenius</span>
          <span>🤖</span>
        </div>
        <h1>Bienvenue sur votre assistant de trading</h1>
        <p>Analysez vos trades, suivez vos performances et laissez l’IA vous guider vers de meilleures décisions !</p>
      </div>

      <div v-if="!ready">
        <!-- Placeholder pour éviter le mismatch SSR/CSR -->
      </div>
      <template v-else>
        <UCard v-if="!authStore.isAuthenticated">
          <UButton to="/auth">
            <span class="i-heroicons-lock-closed"></span>
            Se connecter
          </UButton>
        </UCard>

        <form v-else @submit.prevent="analyserTrade">
          <h2>Nouvelle analyse de trade</h2>
          <div>
            <div>
              <label for="trade-type">Type de trade</label>
              <select id="trade-type" v-model="trade.type" required>
                <option value="" disabled selected hidden>Sélectionnez le type de trade</option>
                <option value="buy">Achat</option>
                <option value="sell">Vente</option>
              </select>
            </div>
            <div>
              <label for="trade-asset">Actif</label>
              <UInput id="trade-asset" v-model="trade.asset" placeholder="EUR/USD, BTC/USDT..." required />
            </div>
            <div>
              <label for="trade-entry">Prix d'entrée</label>
              <UInput id="trade-entry" v-model.number="trade.entry" type="number" step="0.0001" required />
            </div>
            <div>
              <label for="trade-exit">Prix de sortie</label>
              <UInput id="trade-exit" v-model.number="trade.exit" type="number" step="0.0001" required />
            </div>
            <div>
              <label for="trade-strategy">Stratégie (optionnel)</label>
              <select id="trade-strategy" v-model="trade.strategy">
                <option value="" selected hidden>Sélectionnez la stratégie</option>
                <option value="breakout">Breakout</option>
                <option value="range">Range</option>
                <option value="trend">Tendance</option>
                <option value="scalping">Scalping</option>
                <option value="swing">Swing</option>
              </select>
            </div>
            <div>
              <label for="trade-comment">Commentaire (optionnel)</label>
              <textarea id="trade-comment" v-model="trade.comment" rows="3" placeholder="Ajoutez un commentaire sur ce trade..."></textarea>
            </div>
          </div>
          <div>
            <UButton type="submit" :loading="tradesStore.isLoading">
              {{ tradesStore.isLoading ? 'Analyse en cours...' : 'Analyser le trade' }}
            </UButton>
            <p>Vos données restent confidentielles et ne sont utilisées que pour l’analyse IA locale.</p>
          </div>
        </form>

        <UCard v-if="result">
          <template #header>
            <h2>Résultat de l'analyse</h2>
          </template>
          <p class="whitespace-pre-wrap">{{ result }}</p>
          <template #footer>
            <p>Trade analysé en mode {{ authStore.isOfflineMode ? 'hors ligne' : 'en ligne' }}</p>
          </template>
        </UCard>
      </template>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
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
const ready = ref(false)
onMounted(() => {
  ready.value = true
})

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
