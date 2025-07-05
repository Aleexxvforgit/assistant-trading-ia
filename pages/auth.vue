<template>
  <div style="min-height: 100vh; background: var(--background); margin-top: 80px;">
    <!-- Hero Section -->
    <section style="padding: 3rem 1rem; text-align: center; background: var(--background);">
      <!-- Gradient de fond subtle -->
      <div style="position: absolute; inset: 0; background: radial-gradient(circle at 50% 20%, var(--primary-50) 0%, transparent 50%); opacity: 0.3; pointer-events: none; margin-top: -80px;"></div>
      
      <div style="max-width: 800px; margin: 0 auto; margin-bottom: 3rem; position: relative; z-index: 1;">
        <!-- Logo/Titre principal -->
        <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin-bottom: 2rem;">
          <span style="font-size: 3rem; font-weight: bold; background: linear-gradient(135deg, var(--primary) 0%, var(--primary-600) 100%); -webkit-background-clip: text; background-clip: text; color: transparent; line-height: 1; display: flex; align-items: center;">TradeGenius</span>
          <span style="font-size: 3rem; line-height: 1;">🤖</span>
        </div>
        
        <!-- Titre et description -->
        <h1 style="font-size: 2.5rem; font-weight: bold; color: var(--text); margin-bottom: 1.5rem; line-height: 1.2;">
          Bienvenue sur votre assistant de trading
        </h1>
        <p style="color: var(--text-secondary); font-size: 1.25rem; line-height: 1.6; margin-bottom: 0;">
          Analysez vos trades, suivez vos performances et laissez l'IA vous guider vers de meilleures décisions !
        </p>
      </div>
    </section>

    <!-- Contenu principal -->
    <main style="padding: 0 1rem 3rem; max-width: 800px; margin: 0 auto; position: relative; z-index: 1;">
      <!-- Card principale -->
      <div style="background: var(--card); border: 1px solid var(--border); border-radius: 20px; padding: 2.5rem; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08); backdrop-filter: blur(20px);">
        
        <!-- Formulaire de connexion -->
        <form v-if="!showRegister" @submit.prevent="login" style="display: grid; gap: 1.5rem;">
          <!-- Email -->
          <div>
            <label for="login-email" style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: var(--text); font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em;">
              Email
            </label>
            <div style="position: relative;">
              <input id="login-email" 
                     v-model="email" 
                     type="email" 
                     placeholder="votre@email.com" 
                     autocomplete="email" 
                     required
                     style="width: 100%; padding: 1rem 1rem 1rem 3rem; border: 2px solid var(--border); border-radius: 12px; background: var(--background); color: var(--text); font-size: 1rem; transition: all 0.2s ease;"
                     onfocus="this.style.borderColor='var(--primary)'; this.style.boxShadow='0 0 0 3px rgba(59, 130, 246, 0.1)'"
                     onblur="this.style.borderColor='var(--border)'; this.style.boxShadow='none'" />
              <Icon name="heroicons:envelope-20-solid" style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); width: 20px; height: 20px; color: var(--text-secondary);" />
            </div>
          </div>

          <!-- Mot de passe -->
          <div>
            <label for="login-password" style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: var(--text); font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em;">
              Mot de passe
            </label>
            <div style="position: relative;">
              <input id="login-password" 
                     v-model="password" 
                     type="password" 
                     placeholder="Votre mot de passe" 
                     autocomplete="current-password" 
                     required
                     style="width: 100%; padding: 1rem 1rem 1rem 3rem; border: 2px solid var(--border); border-radius: 12px; background: var(--background); color: var(--text); font-size: 1rem; transition: all 0.2s ease;"
                     onfocus="this.style.borderColor='var(--primary)'; this.style.boxShadow='0 0 0 3px rgba(59, 130, 246, 0.1)'"
                     onblur="this.style.borderColor='var(--border)'; this.style.boxShadow='none'" />
              <Icon name="heroicons:lock-closed-20-solid" style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); width: 20px; height: 20px; color: var(--text-secondary);" />
            </div>
          </div>

          <!-- Boutons d'action -->
          <div style="display: grid; gap: 1rem; margin-top: 1rem;">
            <button type="submit" 
                    :disabled="isLoading"
                    style="width: 100%; background: linear-gradient(135deg, var(--primary) 0%, var(--primary-600) 100%); color: white; padding: 1rem; border: none; border-radius: 12px; font-weight: 600; font-size: 1rem; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);"
                    onmouseover="if(!this.disabled) { this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 24px rgba(59, 130, 246, 0.4)' }"
                    onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(59, 130, 246, 0.3)'">
              <span v-if="isLoading" style="display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
                <div style="width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3); border-top: 2px solid white; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                Connexion...
              </span>
              <span v-else>Se connecter</span>
            </button>

            <!-- Divider -->
            <div style="display: flex; align-items: center; gap: 1rem; margin: 0.5rem 0;">
              <div style="flex: 1; height: 1px; background: var(--border);"></div>
              <span style="color: var(--text-secondary); font-size: 0.875rem; font-weight: 500;">ou</span>
              <div style="flex: 1; height: 1px; background: var(--border);"></div>
            </div>

            <button type="button" 
                    @click="loginWithGoogle"
                    :disabled="isLoading"
                    style="width: 100%; background: #ffffff; color: #374151; border: 2px solid #e5e7eb; padding: 1rem; border-radius: 12px; font-weight: 600; font-size: 1rem; cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; justify-content: center; gap: 0.75rem;"
                    onmouseover="if(!this.disabled) { this.style.backgroundColor='#f9fafb'; this.style.transform='translateY(-1px)' }"
                    onmouseout="this.style.backgroundColor='#ffffff'; this.style.transform='translateY(0)'">
              <Icon name="logos:google-icon" style="width: 20px; height: 20px;" />
              Continuer avec Google
            </button>

            <button type="button" 
                    @click="loginOffline"
                    :disabled="isLoading"
                    style="width: 100%; background: var(--warning-50); color: var(--warning-700); border: 2px solid var(--warning-200); padding: 1rem; border-radius: 12px; font-weight: 600; font-size: 1rem; cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; justify-content: center; gap: 0.75rem;"
                    onmouseover="if(!this.disabled) { this.style.backgroundColor='var(--warning-100)'; this.style.transform='translateY(-1px)' }"
                    onmouseout="this.style.backgroundColor='var(--warning-50)'; this.style.transform='translateY(0)'">
              <Icon name="heroicons:wifi-off-20-solid" style="width: 20px; height: 20px;" />
              Mode démo (hors ligne)
            </button>
          </div>

          <!-- Lien vers inscription -->
          <div style="text-align: center; padding-top: 1.5rem; border-top: 1px solid var(--border);">
            <span style="color: var(--text-secondary); font-size: 0.95rem;">Pas encore de compte ? </span>
            <button type="button" 
                    @click="showRegister = true"
                    style="background: none; border: none; color: var(--primary); font-weight: 600; cursor: pointer; text-decoration: none; font-size: 0.95rem; transition: color 0.2s ease;"
                    onmouseover="this.style.color='var(--primary-600)'"
                    onmouseout="this.style.color='var(--primary)'">
              Créer un compte
            </button>
          </div>

          <!-- Erreur -->
          <div v-if="error" 
               style="background: var(--destructive-50); border: 2px solid var(--destructive-200); color: var(--destructive-700); padding: 1rem; border-radius: 12px; font-size: 0.875rem; display: flex; align-items: center; gap: 0.75rem; font-weight: 500;">
            <Icon name="heroicons:exclamation-triangle-20-solid" style="width: 20px; height: 20px; flex-shrink: 0;" />
            {{ error }}
          </div>
        </form>

        <!-- Formulaire d'inscription -->
        <form v-else @submit.prevent="register" style="display: grid; gap: 1.5rem;">
          <!-- Email -->
          <div>
            <label for="register-email" style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: var(--text); font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em;">
              Email
            </label>
            <div style="position: relative;">
              <input id="register-email" 
                     v-model="registerEmail" 
                     type="email" 
                     placeholder="votre@email.com" 
                     autocomplete="email" 
                     required
                     style="width: 100%; padding: 1rem 1rem 1rem 3rem; border: 2px solid var(--border); border-radius: 12px; background: var(--background); color: var(--text); font-size: 1rem; transition: all 0.2s ease;"
                     onfocus="this.style.borderColor='var(--primary)'; this.style.boxShadow='0 0 0 3px rgba(59, 130, 246, 0.1)'"
                     onblur="this.style.borderColor='var(--border)'; this.style.boxShadow='none'" />
              <Icon name="heroicons:envelope-20-solid" style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); width: 20px; height: 20px; color: var(--text-secondary);" />
            </div>
          </div>

          <!-- Mot de passe -->
          <div>
            <label for="register-password" style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: var(--text); font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em;">
              Mot de passe
            </label>
            <div style="position: relative;">
              <input id="register-password" 
                     v-model="registerPassword" 
                     type="password" 
                     placeholder="Votre mot de passe" 
                     autocomplete="new-password" 
                     required
                     style="width: 100%; padding: 1rem 1rem 1rem 3rem; border: 2px solid var(--border); border-radius: 12px; background: var(--background); color: var(--text); font-size: 1rem; transition: all 0.2s ease;"
                     onfocus="this.style.borderColor='var(--primary)'; this.style.boxShadow='0 0 0 3px rgba(59, 130, 246, 0.1)'"
                     onblur="this.style.borderColor='var(--border)'; this.style.boxShadow='none'" />
              <Icon name="heroicons:lock-closed-20-solid" style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); width: 20px; height: 20px; color: var(--text-secondary);" />
            </div>
          </div>

          <!-- Boutons d'action -->
          <div style="display: grid; gap: 1rem; margin-top: 1rem;">
            <button type="submit" 
                    :disabled="isLoading"
                    style="width: 100%; background: linear-gradient(135deg, var(--primary) 0%, var(--primary-600) 100%); color: white; padding: 1rem; border: none; border-radius: 12px; font-weight: 600; font-size: 1rem; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);"
                    onmouseover="if(!this.disabled) { this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 24px rgba(59, 130, 246, 0.4)' }"
                    onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(59, 130, 246, 0.3)'">
              <span v-if="isLoading" style="display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
                <div style="width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3); border-top: 2px solid white; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                Création...
              </span>
              <span v-else>Créer un compte</span>
            </button>

            <!-- Divider -->
            <div style="display: flex; align-items: center; gap: 1rem; margin: 0.5rem 0;">
              <div style="flex: 1; height: 1px; background: var(--border);"></div>
              <span style="color: var(--text-secondary); font-size: 0.875rem; font-weight: 500;">ou</span>
              <div style="flex: 1; height: 1px; background: var(--border);"></div>
            </div>

            <button type="button" 
                    @click="registerWithGoogle"
                    :disabled="isLoading"
                    style="width: 100%; background: #ffffff; color: #374151; border: 2px solid #e5e7eb; padding: 1rem; border-radius: 12px; font-weight: 600; font-size: 1rem; cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; justify-content: center; gap: 0.75rem;"
                    onmouseover="if(!this.disabled) { this.style.backgroundColor='#f9fafb'; this.style.transform='translateY(-1px)' }"
                    onmouseout="this.style.backgroundColor='#ffffff'; this.style.transform='translateY(0)'">
              <Icon name="logos:google-icon" style="width: 20px; height: 20px;" />
              Continuer avec Google
            </button>
          </div>

          <!-- Lien vers connexion -->
          <div style="text-align: center; padding-top: 1.5rem; border-top: 1px solid var(--border);">
            <span style="color: var(--text-secondary); font-size: 0.95rem;">Déjà un compte ? </span>
            <button type="button" 
                    @click="showRegister = false"
                    style="background: none; border: none; color: var(--primary); font-weight: 600; cursor: pointer; text-decoration: none; font-size: 0.95rem; transition: color 0.2s ease;"
                    onmouseover="this.style.color='var(--primary-600)'"
                    onmouseout="this.style.color='var(--primary)'">
              Se connecter
            </button>
          </div>

          <!-- Erreur -->
          <div v-if="registerError" 
               style="background: var(--destructive-50); border: 2px solid var(--destructive-200); color: var(--destructive-700); padding: 1rem; border-radius: 12px; font-size: 0.875rem; display: flex; align-items: center; gap: 0.75rem; font-weight: 500;">
            <Icon name="heroicons:exclamation-triangle-20-solid" style="width: 20px; height: 20px; flex-shrink: 0;" />
            {{ registerError }}
          </div>
        </form>

        <!-- Footer info -->
        <div style="margin-top: 2.5rem; padding-top: 2rem; border-top: 1px solid var(--border);">
          <div style="background: var(--info-50); border: 2px solid var(--info-200); color: var(--info-700); padding: 1.25rem; border-radius: 12px; display: flex; align-items: flex-start; gap: 1rem;">
            <Icon name="heroicons:information-circle-20-solid" style="width: 24px; height: 24px; flex-shrink: 0; margin-top: 0.125rem;" />
            <div>
              <h4 style="font-weight: 600; margin: 0 0 0.5rem 0; font-size: 0.875rem;">Mode démo disponible</h4>
              <p style="margin: 0; font-size: 0.875rem; line-height: 1.5; opacity: 0.9;">
                Le mode hors ligne vous permet d'explorer toutes les fonctionnalités de TradeGenius. 
                Vos données seront stockées localement dans votre navigateur.
              </p>
            </div>
          </div>
        </div>
      </div>
      </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '~/stores/useAuthStore'
import { useRouter } from 'vue-router'
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

const authStore = useAuthStore()
const router = useRouter()

// État du formulaire
const showRegister = ref(false)
const isLoading = ref(false)

// Connexion
const email = ref('')
const password = ref('')
const error = ref('')

// Inscription
const registerEmail = ref('')
const registerPassword = ref('')
const registerError = ref('')

// Fonctions d'authentification
const login = async () => {
  if (!email.value || !password.value) return
  
  isLoading.value = true
  error.value = ''
  
  try {
    // Simulation de connexion pour l'instant
    authStore.loginOffline(email.value)
    router.push('/')
  } catch (e: any) {
    error.value = e.message || 'Erreur lors de la connexion'
  } finally {
    isLoading.value = false
  }
}

const register = async () => {
  if (!registerEmail.value || !registerPassword.value) return
  
  isLoading.value = true
  registerError.value = ''
  
  try {
    // Simulation d'inscription pour l'instant
    authStore.loginOffline(registerEmail.value)
    router.push('/')
  } catch (e: any) {
    registerError.value = e.message || 'Erreur lors de la création du compte'
  } finally {
    isLoading.value = false
  }
}

const loginWithGoogle = async () => {
  isLoading.value = true
  error.value = ''
  
  try {
    // Simulation de connexion Google pour l'instant
    authStore.loginOffline('google-user@gmail.com')
    router.push('/')
  } catch (e: any) {
    error.value = e.message || 'Erreur lors de la connexion Google'
  } finally {
    isLoading.value = false
  }
}

const registerWithGoogle = async () => {
  isLoading.value = true
  registerError.value = ''
  
  try {
    // Simulation d'inscription Google pour l'instant
    authStore.loginOffline('google-user@gmail.com')
    router.push('/')
  } catch (e: any) {
    registerError.value = e.message || 'Erreur lors de l\'inscription Google'
  } finally {
    isLoading.value = false
  }
}

const loginOffline = () => {
  authStore.loginOffline('user-offline@local.com')
  router.push('/')
}
</script>

<style scoped>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

<!-- TODO : Supprimer complètement le mode hors ligne (UI + logique) dès que la connexion à la base de données et l'authentification sécurisée sont effectives.
Cela inclut :
- Suppression du bouton "Mode hors ligne" sur la page d'authentification
- Suppression de la logique loginOffline dans le store et les composants
- Vérification que l'accès à l'application nécessite une authentification sécurisée
-->
