<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 text-black dark:text-white transition-colors duration-300 pt-24 pb-16 flex flex-col items-center justify-center">
    <main class="w-full max-w-md mx-auto flex flex-col items-center justify-center">
      <div class="flex flex-col items-center mb-8">
        <div class="flex items-center gap-3 mb-2">
          <span class="text-3xl font-extrabold text-indigo-600 dark:text-blue-400">TradeGenius</span>
          <span class="text-2xl">🤖</span>
        </div>
        <h1 class="text-2xl md:text-3xl font-bold text-center mb-2">Connexion ou création de compte</h1>
        <p class="text-base text-gray-600 dark:text-gray-300 text-center max-w-xl">Accédez à toutes les fonctionnalités de votre assistant de trading IA.</p>
      </div>
      <div class="w-full max-w-sm">
        <UCard class="bg-white/70 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 shadow-xl rounded-2xl p-6">
          <template #header>
            <div class="flex justify-center items-center gap-2 mb-4">
              <span class="text-xl font-semibold text-indigo-600 dark:text-blue-400">{{ showRegister ? 'Créer un compte' : 'Connexion' }}</span>
            </div>
          </template>
          <div>
            <form v-if="!showRegister" @submit.prevent="login" class="space-y-6 flex flex-col items-center">
              <UFormGroup label="Email" name="email" class="mb-2 w-full">
                <UInput
                  v-model="email"
                  type="email"
                  placeholder="votre@email.com"
                  autocomplete="email"
                  required
                  class="w-full bg-white/70 dark:bg-gray-800/70 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm backdrop-blur"
                />
              </UFormGroup>
              <UFormGroup label="Mot de passe" name="password" class="mb-2 w-full">
                <UInput
                  v-model="password"
                  type="password"
                  placeholder="Votre mot de passe"
                  autocomplete="current-password"
                  required
                  class="w-full bg-white/70 dark:bg-gray-800/70 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm backdrop-blur"
                />
              </UFormGroup>
              <div class="flex flex-col gap-3 items-center w-full mt-4">
                <UButton type="submit" color="white" :loading="isLoading" class="w-full max-w-xs py-2 text-base font-semibold rounded-xl bg-gray-100/60 hover:bg-gray-200/80 text-black border border-gray-200 dark:bg-gray-800/60 dark:hover:bg-gray-800/80 dark:text-white dark:border-gray-700 transition">Se connecter</UButton>
                <UButton type="button" color="white" class="w-full max-w-xs flex items-center justify-center gap-2 py-2 rounded-xl bg-gray-100/60 hover:bg-gray-200/80 text-black border border-gray-200 dark:bg-gray-800/60 dark:hover:bg-gray-800/80 dark:text-white dark:border-gray-700 transition" @click="loginWithGoogle">
                  <span class="i-logos-google-icon"></span> Connexion avec Google
                </UButton>
                <UButton type="button" color="white" class="w-full max-w-xs flex items-center justify-center gap-2 py-2 rounded-xl bg-gray-100/60 hover:bg-gray-200/80 text-black border border-gray-200 dark:bg-gray-800/60 dark:hover:bg-gray-800/80 dark:text-white dark:border-gray-700 transition" @click="loginOffline">
                  <span class="i-heroicons-wifi-off"></span> Mode hors ligne
                </UButton>
              </div>
              <div class="mt-2 text-center w-full">
                <span class="text-sm">Pas encore de compte ? </span>
                <UButton type="button" variant="link" @click="showRegister = true">Créer un compte</UButton>
              </div>
              <p v-if="error" class="mt-2 text-red-500 text-sm">{{ error }}</p>
            </form>
            <form v-else @submit.prevent="register" class="space-y-8">
              <UFormGroup label="Email" name="registerEmail" class="mb-4">
                <UInput
                  v-model="registerEmail"
                  type="email"
                  placeholder="votre@email.com"
                  autocomplete="email"
                  required
                  class="w-full bg-white/70 dark:bg-gray-800/70 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm backdrop-blur"
                />
              </UFormGroup>
              <UFormGroup label="Mot de passe" name="registerPassword">
                <UInput
                  v-model="registerPassword"
                  type="password"
                  placeholder="Votre mot de passe"
                  autocomplete="new-password"
                  required
                  class="w-full bg-white/70 dark:bg-gray-800/70 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm backdrop-blur"
                />
              </UFormGroup>
              <UButton type="submit" color="primary" :loading="isLoading" block class="py-2 rounded-xl font-semibold">Créer un compte</UButton>
              <UButton type="button" color="secondary" class="w-full flex items-center justify-center gap-2 py-2 rounded-xl" @click="registerWithGoogle">
                <span class="i-logos-google-icon"></span> S'inscrire avec Google
              </UButton>
              <div class="mt-2 text-center">
                <UButton type="button" variant="link" @click="showRegister = false">Déjà un compte ? Se connecter</UButton>
              </div>
              <p v-if="registerError" class="mt-2 text-red-500 text-sm">{{ registerError }}</p>
            </form>
          </div>
          <template #footer>
            <p class="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
              Mode hors ligne : permet d'utiliser l'application sans connexion à Firebase. Les données seront stockées localement.
            </p>
          </template>
        </UCard>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '~/stores/useAuthStore'
import { useRouter } from 'vue-router'
import { useNuxtApp } from '#app'
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

const authStore = useAuthStore()
const router = useRouter()
const { $auth } = useNuxtApp()
const email = ref('')
const password = ref('')
const isLoading = ref(false)
const error = ref('')
const isOfflineMode = ref(false)

const showRegister = ref(false)
const registerEmail = ref('')
const registerPassword = ref('')
const registerError = ref('')

async function login() {
  isLoading.value = true
  error.value = ''
  try {
    if (isOfflineMode.value) {
      authStore.loginOffline(email.value)
      await router.push('/')
    } else if ($auth) {
      // Authentification email/mot de passe Firebase (optionnel)
      await signInWithEmailAndPassword($auth, email.value, password.value)
      await router.push('/')
    } else {
      error.value = "La connexion à Firebase n'est pas disponible."
    }
  } catch (err) {
    error.value = "Erreur lors de la connexion."
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

async function loginWithGoogle() {
  isLoading.value = true
  error.value = ''
  try {
    if ($auth) {
      const provider = new GoogleAuthProvider()
      await signInWithPopup($auth, provider)
      await router.push('/')
    } else {
      error.value = "Connexion Google non disponible."
    }
  } catch (err) {
    error.value = "Erreur lors de la connexion Google."
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

async function register() {
  isLoading.value = true
  registerError.value = ''
  try {
    if ($auth) {
      await createUserWithEmailAndPassword($auth, registerEmail.value, registerPassword.value)
      await router.push('/')
    } else {
      registerError.value = "Création de compte non disponible."
    }
  } catch (err) {
    registerError.value = "Erreur lors de la création du compte."
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

async function registerWithGoogle() {
  isLoading.value = true
  registerError.value = ''
  try {
    if ($auth) {
      const provider = new GoogleAuthProvider()
      await signInWithPopup($auth, provider)
      await router.push('/')
    } else {
      registerError.value = "Inscription Google non disponible."
    }
  } catch (err) {
    registerError.value = "Erreur lors de l'inscription Google."
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

function loginOffline() {
  authStore.loginOffline(email.value)
  router.push('/')
}
</script>

<!-- TODO : Supprimer complètement le mode hors ligne (UI + logique) dès que la connexion à la base de données et l'authentification sécurisée sont effectives.
Cela inclut :
- Suppression du bouton "Mode hors ligne" sur la page d'authentification
- Suppression de la logique loginOffline dans le store et les composants
- Vérification que l'accès à l'application nécessite une authentification sécurisée
-->
