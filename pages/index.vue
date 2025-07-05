<template>
  <div style="min-height: 100vh; background: var(--background); margin-top: 80px;">
    <!-- Hero Section -->
    <section style="padding: 3rem 1rem; text-align: center; background: var(--background);">
      <div style="max-width: 800px; margin: 0 auto; margin-bottom: 3rem;">
        <!-- Logo/Titre principal -->
        <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin-bottom: 2rem;">
          <span style="font-size: 3rem; font-weight: bold; background: linear-gradient(135deg, var(--primary) 0%, var(--primary-600) 100%); -webkit-background-clip: text; background-clip: text; color: transparent; line-height: 1; display: flex; align-items: center;">TradeGenius</span>
          <span style="font-size: 3rem; line-height: 1;">🤖</span>
        </div>
        
        <!-- Titre et description -->
        <h1 style="font-size: 2.5rem; font-weight: bold; color: var(--text); margin-bottom: 1.5rem; line-height: 1.2;">
          Bienvenue sur votre assistant de trading
        </h1>
        <p style="font-size: 1.25rem; color: var(--text-secondary); margin-bottom: 3rem; line-height: 1.6;">
          Analysez vos trades, suivez vos performances et laissez l'IA vous guider vers de meilleures décisions !
        </p>
      </div>
    </section>

    <!-- Contenu principal -->
    <main style="padding: 0 1rem 3rem; max-width: 800px; margin: 0 auto;">
      <div v-if="!ready" style="text-align: center; padding: 2rem;">
        <!-- Placeholder pour éviter le mismatch SSR/CSR -->
        <div style="color: var(--text-secondary);">Chargement...</div>
      </div>
      
      <template v-else>
        <!-- Formulaire d'analyse (utilisateur connecté uniquement) -->
        <div v-if="authStore.isAuthenticated" 
             style="background: var(--card); border: 1px solid var(--border); border-radius: 20px; padding: 2.5rem; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08); backdrop-filter: blur(20px);">
          <form @submit.prevent="analyserTrade">
            <h2 style="color: var(--text); margin-bottom: 2rem; font-size: 1.5rem; font-weight: 600;">
              Nouvelle analyse de trade
            </h2>
            
            <div style="display: grid; gap: 1.5rem;">
              <!-- Type de trade -->
              <div>
                <label for="trade-type" style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: var(--text); font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em;">
                  Type de trade
                </label>
                <select id="trade-type" 
                        v-model="trade.type" 
                        required
                        style="width: 100%; padding: 1rem; border: 2px solid var(--border); border-radius: 12px; background: var(--background); color: var(--text); font-size: 1rem; transition: all 0.2s ease;"
                        onfocus="this.style.borderColor='var(--primary)'; this.style.boxShadow='0 0 0 3px rgba(59, 130, 246, 0.1)'"
                        onblur="this.style.borderColor='var(--border)'; this.style.boxShadow='none'">
                  <option value="" disabled selected hidden>Sélectionnez le type de trade</option>
                  <option value="buy">Achat</option>
                  <option value="sell">Vente</option>
                </select>
              </div>

              <!-- Actif -->
              <div>
                <label for="trade-asset" style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: var(--text);">
                  Actif
                </label>
                <input id="trade-asset" 
                       v-model="trade.asset" 
                       type="text"
                       placeholder="EUR/USD, BTC/USDT..." 
                       required
                       style="width: 100%; padding: 1rem; border: 2px solid var(--border); border-radius: 12px; background: var(--background); color: var(--text); font-size: 1rem; transition: all 0.2s ease;"
                       onfocus="this.style.borderColor='var(--primary)'; this.style.boxShadow='0 0 0 3px rgba(59, 130, 246, 0.1)'"
                       onblur="this.style.borderColor='var(--border)'; this.style.boxShadow='none'" />
              </div>

              <!-- Prix d'entrée -->
              <div>
                <label for="trade-entry" style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: var(--text);">
                  Prix d'entrée
                </label>
                <input id="trade-entry" 
                       v-model.number="trade.entry" 
                       type="number" 
                       step="0.0001" 
                       required
                       style="width: 100%; padding: 1rem; border: 2px solid var(--border); border-radius: 12px; background: var(--background); color: var(--text); font-size: 1rem; transition: all 0.2s ease;"
                       onfocus="this.style.borderColor='var(--primary)'; this.style.boxShadow='0 0 0 3px rgba(59, 130, 246, 0.1)'"
                       onblur="this.style.borderColor='var(--border)'; this.style.boxShadow='none'" />
              </div>

              <!-- Prix de sortie -->
              <div>
                <label for="trade-exit" style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: var(--text);">
                  Prix de sortie
                </label>
                <input id="trade-exit" 
                       v-model.number="trade.exit" 
                       type="number" 
                       step="0.0001" 
                       required
                       style="width: 100%; padding: 1rem; border: 2px solid var(--border); border-radius: 12px; background: var(--background); color: var(--text); font-size: 1rem; transition: all 0.2s ease;"
                       onfocus="this.style.borderColor='var(--primary)'; this.style.boxShadow='0 0 0 3px rgba(59, 130, 246, 0.1)'"
                       onblur="this.style.borderColor='var(--border)'; this.style.boxShadow='none'" />
              </div>

              <!-- Stratégie -->
              <div>
                <label for="trade-strategy" style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: var(--text);">
                  Stratégie (optionnel)
                </label>
                <select id="trade-strategy" 
                        v-model="trade.strategy"
                        style="width: 100%; padding: 1rem; border: 2px solid var(--border); border-radius: 12px; background: var(--background); color: var(--text); font-size: 1rem; transition: all 0.2s ease;"
                        onfocus="this.style.borderColor='var(--primary)'; this.style.boxShadow='0 0 0 3px rgba(59, 130, 246, 0.1)'"
                        onblur="this.style.borderColor='var(--border)'; this.style.boxShadow='none'">
                  <option value="" selected hidden>Sélectionnez la stratégie</option>
                  <option value="breakout">Breakout</option>
                  <option value="range">Range</option>
                  <option value="trend">Tendance</option>
                  <option value="scalping">Scalping</option>
                  <option value="swing">Swing</option>
                </select>
              </div>

              <!-- Commentaire -->
              <div>
                <label for="trade-comment" style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: var(--text);">
                  Commentaire (optionnel)
                </label>
                <textarea id="trade-comment" 
                          v-model="trade.comment" 
                          rows="3" 
                          placeholder="Ajoutez un commentaire sur ce trade..."
                          style="width: 100%; padding: 1rem; border: 2px solid var(--border); border-radius: 12px; background: var(--background); color: var(--text); font-size: 1rem; resize: vertical; transition: all 0.2s ease;"
                          onfocus="this.style.borderColor='var(--primary)'; this.style.boxShadow='0 0 0 3px rgba(59, 130, 246, 0.1)'"
                          onblur="this.style.borderColor='var(--border)'; this.style.boxShadow='none'"></textarea>
              </div>
            </div>

            <!-- Actions -->
            <div style="margin-top: 2rem; text-align: center;">
              <button type="submit" 
                      :disabled="tradesStore.isLoading"
                      style="background: linear-gradient(135deg, var(--primary) 0%, var(--primary-600) 100%); color: white; padding: 1rem 2rem; border: none; border-radius: 12px; font-weight: 600; font-size: 1rem; cursor: pointer; transition: all 0.2s ease; min-width: 200px; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);"
                      onmouseover="if(!this.disabled) { this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 24px rgba(59, 130, 246, 0.4)' }"
                      onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(59, 130, 246, 0.3)'">
                {{ tradesStore.isLoading ? 'Analyse en cours...' : 'Analyser le trade' }}
              </button>
              <p style="margin-top: 1rem; font-size: 0.875rem; color: var(--text-secondary);">
                Vos données restent confidentielles et ne sont utilisées que pour l'analyse IA locale.
              </p>
            </div>
          </form>
        </div>

        <!-- Résultat de l'analyse -->
        <div v-if="result" 
             style="background: var(--card); border: 1px solid var(--border); border-radius: 20px; padding: 2.5rem; margin-top: 2rem; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08); backdrop-filter: blur(20px);">
          <h3 style="color: var(--text); margin-bottom: 1.5rem; font-size: 1.25rem; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
            <Icon name="heroicons:chart-bar-20-solid" />
            Résultat de l'analyse
          </h3>
          <div style="background: var(--muted); padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem;">
            <p style="color: var(--text); white-space: pre-wrap; line-height: 1.6; margin: 0;">{{ result }}</p>
          </div>
          <p style="font-size: 0.875rem; color: var(--text-secondary); margin: 0; text-align: center;">
            Trade analysé en mode {{ authStore.isOfflineMode ? 'hors ligne' : 'en ligne' }}
          </p>
        </div>

        <!-- Message d'invitation pour utilisateurs non connectés -->
        <div v-else style="text-align: center; padding: 2rem 1rem;">
          <div style="max-width: 500px; margin: 0 auto;">
            <div style="background: var(--info-50); border: 2px solid var(--info-200); border-radius: 20px; padding: 3rem 2rem; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);">
              <div style="margin-bottom: 1.5rem;">
                <Icon name="heroicons:information-circle-20-solid" style="width: 48px; height: 48px; color: var(--info-700); margin: 0 auto; display: block;" />
              </div>
              <h4 style="font-size: 1.5rem; font-weight: 600; color: var(--info-700); margin-bottom: 1rem;">
                Commencez dès maintenant
              </h4>
              <p style="color: var(--info-700); margin-bottom: 2rem; opacity: 0.9; line-height: 1.6; font-size: 1.1rem;">
                Connectez-vous pour accéder à toutes les fonctionnalités et commencer à analyser vos trades avec l'IA.
              </p>
              <NuxtLink to="/auth" 
                        style="display: inline-block; background: linear-gradient(135deg, var(--primary) 0%, var(--primary-600) 100%); color: white; padding: 1rem 2rem; border-radius: 12px; font-weight: 600; text-decoration: none; transition: all 0.2s ease; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);"
                        onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 24px rgba(59, 130, 246, 0.4)'"
                        onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(59, 130, 246, 0.3)'">
                Se connecter
              </NuxtLink>
            </div>
          </div>
        </div>
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
