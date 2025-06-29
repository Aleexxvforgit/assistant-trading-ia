// plugins/init-app.ts
import { defineNuxtPlugin } from 'nuxt/app'
import { useAuthStore } from '~/stores/useAuthStore'
import { useTradesStore } from '~/stores/useTradesStore'

export default defineNuxtPlugin(nuxtApp => {
  if (process.client) {
    const authStore = useAuthStore()
    const tradesStore = useTradesStore()
    
    // Initialiser l'authentification depuis localStorage
    authStore.initFromLocalStorage()
    
    // Charger les trades depuis localStorage
    tradesStore.loadTrades()
  }
  
  // Disponible dans toute l'application
  return {
    provide: {
      isAppReady: true
    }
  }
})
