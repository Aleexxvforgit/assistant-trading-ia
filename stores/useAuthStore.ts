// stores/useAuthStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<{ 
    id: string; 
    email: string;
    displayName: string | null;
  } | null>(null)
  
  const isAuthenticated = computed(() => !!user.value)
  const isOfflineMode = ref(false)
  
  // Fonction pour simuler une connexion en mode hors ligne
  function loginOffline(email: string) {
    user.value = {
      id: 'offline-user',
      email,
      displayName: email.split('@')[0]
    }
    isOfflineMode.value = true
    localStorage.setItem('offlineUser', JSON.stringify(user.value))
  }
  
  // Fonction pour se déconnecter
  function logout() {
    user.value = null
    isOfflineMode.value = false
    localStorage.removeItem('offlineUser')
  }
  
  // Initialiser l'état à partir du localStorage (pour le mode hors ligne)
  function initFromLocalStorage() {
    const storedUser = localStorage.getItem('offlineUser')
    if (storedUser) {
      user.value = JSON.parse(storedUser)
      isOfflineMode.value = true
    }
  }
  
  return {
    user,
    isAuthenticated,
    isOfflineMode,
    loginOffline,
    logout,
    initFromLocalStorage
  }
})