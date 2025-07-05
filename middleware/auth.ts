// middleware/auth.ts
import { defineNuxtRouteMiddleware } from 'nuxt/app'
import { useAuthStore } from '~/stores/useAuthStore'

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  // Attendre que l'état d'auth soit prêt avant de rediriger
  if (!authStore.isAuthReady) {
    // On ne fait rien tant que l'auth n'est pas prête (évite la redirection prématurée)
    return
  }
  // Ne pas rediriger automatiquement, l'UI gère l'affichage du bloc Connexion requise
})