<template>
  <div>
    <main>
      <div>
        <div>
          <span>TradeGenius</span>
          <span>🤖</span>
        </div>
        <h1>Connexion ou création de compte</h1>
        <p>Accédez à toutes les fonctionnalités de votre assistant de trading IA.</p>
      </div>
      <div>
        <UCard>
          <template #header>
            <div>
              <span>{{ showRegister ? 'Créer un compte' : 'Connexion' }}</span>
            </div>
          </template>
          <div>
            <form v-if="!showRegister" @submit.prevent="login">
              <UFormGroup label="Email" name="email">
                <UInput v-model="email" type="email" placeholder="votre@email.com" autocomplete="email" required />
              </UFormGroup>
              <UFormGroup label="Mot de passe" name="password">
                <UInput v-model="password" type="password" placeholder="Votre mot de passe" autocomplete="current-password" required />
              </UFormGroup>
              <div>
                <UButton type="submit" color="white" :loading="isLoading">Se connecter</UButton>
                <UButton type="button" color="white" @click="loginWithGoogle">
                  <span class="i-logos-google-icon"></span> Connexion avec Google
                </UButton>
                <UButton type="button" color="white" @click="loginOffline">
                  <span class="i-heroicons-wifi-off"></span> Mode hors ligne
                </UButton>
              </div>
              <div>
                <span>Pas encore de compte ? </span>
                <UButton type="button" variant="link" @click="showRegister = true">Créer un compte</UButton>
              </div>
              <p v-if="error">{{ error }}</p>
            </form>
            <form v-else @submit.prevent="register">
              <UFormGroup label="Email" name="registerEmail">
                <UInput v-model="registerEmail" type="email" placeholder="votre@email.com" autocomplete="email" required />
              </UFormGroup>
              <UFormGroup label="Mot de passe" name="registerPassword">
                <UInput v-model="registerPassword" type="password" placeholder="Votre mot de passe" autocomplete="new-password" required />
              </UFormGroup>
              <UButton type="submit" color="primary" :loading="isLoading">Créer un compte</UButton>
              <UButton type="button" color="secondary" @click="registerWithGoogle">
                <span class="i-logos-google-icon"></span> S'inscrire avec Google
              </UButton>
              <div>
                <UButton type="button" variant="link" @click="showRegister = false">Déjà un compte ? Se connecter</UButton>
              </div>
              <p v-if="registerError">{{ registerError }}</p>
            </form>
          </div>
          <template #footer>
            <p>
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
