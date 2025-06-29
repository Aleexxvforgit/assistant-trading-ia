<template>
  <div class="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
    <main class="container mx-auto px-4 py-12 pt-28 max-w-2xl">
      <UCard>
        <template #header>
          <div class="flex justify-between items-center">
            <h1 class="text-2xl font-bold">Mon Profil</h1>
            <UBadge v-if="authStore.isOfflineMode" color="orange">Mode Hors Ligne</UBadge>
          </div>
        </template>

        <div v-if="authStore.isAuthenticated">
          <div class="flex items-center space-x-4 mb-8">
            <img
              src="https://api.dicebear.com/7.x/bottts/svg?seed=user"
              alt="avatar"
              class="w-20 h-20 rounded-full border border-gray-400 dark:border-gray-600"
            />
            <div>
              <h2 class="text-xl font-semibold">{{ authStore.user?.displayName || 'Utilisateur' }}</h2>
              <p class="text-gray-500 dark:text-gray-400">{{ authStore.user?.email }}</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 class="text-lg font-medium mb-2">Statistiques</h3>
              <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                <div class="flex justify-between mb-2">
                  <span>Total des trades:</span>
                  <span class="font-medium">{{ tradesStore.trades.length }}</span>
                </div>
                <div class="flex justify-between mb-2">
                  <span>Trades gagnants:</span>
                  <span class="font-medium text-green-600 dark:text-green-400">
                    {{ winningTrades }}
                  </span>
                </div>
                <div class="flex justify-between">
                  <span>Trades perdants:</span>
                  <span class="font-medium text-red-600 dark:text-red-400">
                    {{ losingTrades }}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-medium mb-2">Préférences</h3>
              <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                <div class="mb-4">
                  <span class="block mb-2">Thème</span>
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
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Définissable uniquement lors de la connexion
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div v-else class="text-center py-6">
          <p class="mb-4">Vous devez être connecté pour accéder à cette page</p>
          <UButton to="/auth" color="primary">Se connecter</UButton>
        </div>

        <template #footer>
          <div class="flex justify-end">
            <UButton v-if="authStore.isAuthenticated" color="red" @click="logout">
              Se déconnecter
            </UButton>
          </div>
        </template>
      </UCard>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
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