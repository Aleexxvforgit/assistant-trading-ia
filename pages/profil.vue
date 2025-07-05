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
          Mon Profil
        </h1>
        <p style="font-size: 1.25rem; color: var(--text-secondary); margin-bottom: 0; line-height: 1.6;">
          Gérez vos informations personnelles et vos préférences de trading
        </p>
      </div>
    </section>

    <!-- Contenu principal -->
    <main style="padding: 0 1rem 3rem; max-width: 800px; margin: 0 auto;">
      <div v-if="authStore.isAuthenticated">
        <!-- Card Profil Utilisateur -->
        <div style="background: var(--card); border: 1px solid var(--border); border-radius: 20px; padding: 2.5rem; margin-bottom: 2rem; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08); backdrop-filter: blur(20px);">
          <div style="display: flex; align-items: center; gap: 1.5rem; margin-bottom: 2rem;">
            <img src="https://api.dicebear.com/7.x/bottts/svg?seed=user" 
                 alt="avatar" 
                 style="width: 4rem; height: 4rem; border-radius: 50%; border: 3px solid var(--primary);" />
            <div>
              <h2 style="font-size: 1.5rem; font-weight: 600; color: var(--text); margin: 0 0 0.5rem 0;">
                {{ authStore.user?.displayName || 'Utilisateur' }}
              </h2>
              <p style="color: var(--text-secondary); margin: 0; font-size: 1rem;">{{ authStore.user?.email }}</p>
              <div v-if="authStore.isOfflineMode" style="margin-top: 0.5rem;">
                <span style="background: var(--warning-100); color: var(--warning-700); padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.875rem; font-weight: 500;">
                  Mode Hors Ligne
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Card Statistiques -->
        <div style="background: var(--card); border: 1px solid var(--border); border-radius: 20px; padding: 2.5rem; margin-bottom: 2rem; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08); backdrop-filter: blur(20px);">
          <h3 style="font-size: 1.25rem; font-weight: 600; color: var(--text); margin: 0 0 1.5rem 0; display: flex; align-items: center; gap: 0.5rem;">
            <Icon name="heroicons:chart-bar-20-solid" style="width: 20px; height: 20px; color: var(--primary);" />
            Statistiques de Trading
          </h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem;">
            <div style="background: var(--muted); padding: 1.5rem; border-radius: 12px;">
              <div style="font-size: 2rem; font-weight: bold; color: var(--primary); margin-bottom: 0.5rem;">
                {{ tradesStore.trades.length }}
              </div>
              <div style="color: var(--text-secondary); font-size: 0.875rem;">Total des trades</div>
            </div>
            <div style="background: var(--muted); padding: 1.5rem; border-radius: 12px;">
              <div style="font-size: 2rem; font-weight: bold; color: var(--success); margin-bottom: 0.5rem;">
                {{ winningTrades }}
              </div>
              <div style="color: var(--text-secondary); font-size: 0.875rem;">Trades gagnants</div>
            </div>
            <div style="background: var(--muted); padding: 1.5rem; border-radius: 12px;">
              <div style="font-size: 2rem; font-weight: bold; color: var(--destructive); margin-bottom: 0.5rem;">
                {{ losingTrades }}
              </div>
              <div style="color: var(--text-secondary); font-size: 0.875rem;">Trades perdants</div>
            </div>
          </div>
        </div>

        <!-- Card Préférences -->
        <div style="background: var(--card); border: 1px solid var(--border); border-radius: 20px; padding: 2.5rem; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08); backdrop-filter: blur(20px);">
          <h3 style="font-size: 1.25rem; font-weight: 600; color: var(--text); margin: 0 0 1.5rem 0; display: flex; align-items: center; gap: 0.5rem;">
            <Icon name="heroicons:cog-6-tooth-20-solid" style="width: 20px; height: 20px; color: var(--primary);" />
            Préférences
          </h3>
          
          <div style="display: grid; gap: 2rem;">
            <!-- Thème -->
            <div>
              <label style="display: block; margin-bottom: 1rem; font-weight: 600; color: var(--text);">
                Thème de l'application
              </label>
              <div style="display: flex; gap: 0.75rem;">
                <button @click="setTheme('light')" 
                        :style="`background: ${theme === 'light' ? 'linear-gradient(135deg, var(--primary) 0%, var(--primary-600) 100%)' : 'var(--muted)'}; color: ${theme === 'light' ? 'white' : 'var(--text)'}; padding: 0.75rem 1.5rem; border: none; border-radius: 12px; font-weight: 600; cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; gap: 0.5rem;`">
                  ☀️ Clair
                </button>
                <button @click="setTheme('dark')" 
                        :style="`background: ${theme === 'dark' ? 'linear-gradient(135deg, var(--primary) 0%, var(--primary-600) 100%)' : 'var(--muted)'}; color: ${theme === 'dark' ? 'white' : 'var(--text)'}; padding: 0.75rem 1.5rem; border: none; border-radius: 12px; font-weight: 600; cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; gap: 0.5rem;`">
                  🌙 Sombre
                </button>
              </div>
            </div>

            <!-- Mode hors ligne -->
            <div style="background: var(--info-50); border: 2px solid var(--info-200); border-radius: 12px; padding: 1.5rem;">
              <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 0.75rem;">
                <Icon name="heroicons:information-circle-20-solid" style="width: 20px; height: 20px; color: var(--info-700);" />
                <span style="font-weight: 600; color: var(--info-700);">Mode hors ligne</span>
              </div>
              <p style="color: var(--info-700); margin: 0; font-size: 0.875rem; opacity: 0.9;">
                Le mode hors ligne est défini lors de la connexion. Vos données sont stockées localement dans votre navigateur.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else style="text-align: center; padding: 2rem;">
        <div style="background: var(--card); border: 1px solid var(--border); border-radius: 20px; padding: 2.5rem; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08); backdrop-filter: blur(20px);">
          <Icon name="heroicons:user-circle-20-solid" style="width: 4rem; height: 4rem; color: var(--text-secondary); margin: 0 auto 1rem;" />
          <h2 style="font-size: 1.5rem; font-weight: 600; color: var(--text); margin-bottom: 1rem;">
            Connexion requise
          </h2>
          <p style="color: var(--text-secondary); margin-bottom: 2rem;">
            Vous devez être connecté pour accéder à votre profil.
          </p>
          <NuxtLink to="/auth" 
                    style="background: linear-gradient(135deg, var(--primary) 0%, var(--primary-600) 100%); color: white; padding: 1rem 2rem; border-radius: 12px; text-decoration: none; font-weight: 600; transition: all 0.2s ease; display: inline-block;"
                    onmouseover="this.style.transform='translateY(-2px)'"
                    onmouseout="this.style.transform='translateY(0)'">
            Se connecter
          </NuxtLink>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '~/stores/useAuthStore'
import { useTradesStore } from '~/stores/useTradesStore'
import { useTheme } from '~/composables/useTheme'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
const tradesStore = useTradesStore()
const { theme, toggleTheme } = useTheme()

// Statistiques de trading
const winningTrades = computed(() => {
  return tradesStore.trades.filter(trade => trade.result?.includes('✅')).length
})

const losingTrades = computed(() => {
  return tradesStore.trades.filter(trade => trade.result?.includes('❌')).length
})

// Mode hors ligne (juste pour affichage)
const offlineMode = computed(() => authStore.isOfflineMode)

// Changer le thème
const setTheme = (newTheme: 'light' | 'dark') => {
  if (theme.value !== newTheme) {
    toggleTheme()
  }
}

// Déconnexion
const logout = async () => {
  authStore.logout()
  await router.push('/auth')
}
</script>
