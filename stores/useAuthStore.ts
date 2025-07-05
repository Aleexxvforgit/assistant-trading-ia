// stores/useAuthStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useNuxtApp } from '#app'
import { onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<{
    id: string;
    email: string;
    displayName: string | null;
    photoURL?: string | null;
    provider?: string;
  } | null>(null)

  const isAuthenticated = computed(() => !!user.value)
  const isOfflineMode = ref(false)
  const isAuthReady = ref(false)

  // Fonction pour simuler une connexion en mode hors ligne
  function loginOffline(email: string) {
    user.value = {
      id: 'offline-user',
      email,
      displayName: email.split('@')[0],
      provider: 'offline',
    }
    isOfflineMode.value = true
    localStorage.setItem('offlineUser', JSON.stringify(user.value))
    isAuthReady.value = true
  }

  // Fonction pour se déconnecter (Firebase ou offline)
  async function logout() {
    const { $auth, $router } = useNuxtApp()
    if (!isOfflineMode.value && $auth) {
      try {
        await signOut($auth)
      } catch (e) {
        // ignore
      }
    }
    user.value = null
    isOfflineMode.value = false
    isAuthReady.value = false
    localStorage.removeItem('offlineUser')
    // Redirige vers la page d'accueil après déconnexion
    if ($router) {
      $router.push('/')
    }
  }

  // Initialiser l'état à partir du localStorage (pour le mode hors ligne)
  function initFromLocalStorage() {
    const storedUser = localStorage.getItem('offlineUser')
    if (storedUser) {
      user.value = JSON.parse(storedUser)
      isOfflineMode.value = true
    }
    isAuthReady.value = true
  }

  // Observer l'état Firebase Auth
  function initFirebaseAuthListener() {
    const { $auth } = useNuxtApp()
    if ($auth) {
      onAuthStateChanged($auth, (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
          user.value = {
            id: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            provider: firebaseUser.providerData[0]?.providerId || 'firebase',
          }
          isOfflineMode.value = false
        } else if (!isOfflineMode.value) {
          user.value = null
        }
        isAuthReady.value = true
      })
    } else {
      isAuthReady.value = true
    }
  }

  return {
    user,
    isAuthenticated,
    isOfflineMode,
    isAuthReady,
    loginOffline,
    logout,
    initFromLocalStorage,
    initFirebaseAuthListener,
  }
})