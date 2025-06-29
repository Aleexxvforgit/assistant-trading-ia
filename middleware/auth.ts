// middleware/auth.ts
import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'
import { useAuthStore } from '~/stores/useAuthStore'

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  
  // Si l'utilisateur n'est pas authentifié et tente d'accéder à une page protégée
  if (!authStore.isAuthenticated && to.path !== '/auth') {
    return navigateTo('/auth')
  }
})