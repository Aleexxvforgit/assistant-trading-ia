<template>
  <div>
    <main>
      <UCard>
        <template #header>
          <div>
            <h1>Mon Profil</h1>
            <UBadge v-if="authStore.isOfflineMode">Mode Hors Ligne</UBadge>
          </div>
        </template>

        <div v-if="authStore.isAuthenticated">
          <div>
            <img
              src="https://api.dicebear.com/7.x/bottts/svg?seed=user"
              alt="avatar"
            />
            <div>
              <h2>{{ authStore.user?.displayName || 'Utilisateur' }}</h2>
              <p>{{ authStore.user?.email }}</p>
            </div>
          </div>

          <div>
            <div>
              <h3>Statistiques</h3>
              <div>
                <div>
                  <span>Total des trades:</span>
                  <span>{{ tradesStore.trades.length }}</span>
                </div>
                <div>
                  <span>Trades gagnants:</span>
                  <span>
                    {{ winningTrades }}
                  </span>
                </div>
                <div>
                  <span>Trades perdants:</span>
                  <span>
                    {{ losingTrades }}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3>Préférences</h3>
              <div>
                <div>
                  <span>Thème</span>
                  <UButtonGroup>
                    <UButton 
                      :color="theme === 'light' ? 'primary' : 'gray'" 
                      @click="setTheme('light')"
                    >
                      ☀️ Clair
                    </UButton>
                    <UButton 
                      :color="theme === 'dark' ? 'primary' : 'gray'" 
                      @click="setTheme('dark')"
                    >
                      🌙 Sombre
                    </UButton>
                  </UButtonGroup>
                </div>
                <div>
                  <UCheckbox 
                    v-model="offlineMode" 
                    label="Mode hors ligne"
                    :disabled="true"
                  />
                  <p>Définissable uniquement lors de la connexion</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div v-else>
          <UIcon name="i-heroicons-lock-closed" />
          <h2>Connexion requise</h2>
          <p>
            Vous devez être connecté pour accéder à cette page et consulter votre profil utilisateur.
          </p>
          <UButton to="/auth">
            <span class="i-heroicons-arrow-right-on-rectangle"></span>
            Se connecter
          </UButton>
        </div>

        <template #footer>
          <div>
            <UButton
              v-if="authStore.isAuthenticated"
              @click="logout"
            >
              <span class="i-heroicons-arrow-left-on-rectangle"></span>
              Se déconnecter
            </UButton>
          </div>
        </template>
      </UCard>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '~/stores/useAuthStore'
import { useTradesStore } from '~/stores/useTradesStore'
import { useTheme } from '~/composables/useTheme'
import { useRouter } from 'vue-router'

definePageMeta({ middleware: 'auth' })

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