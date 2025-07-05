<template>
  <nav style="position: fixed; top: 0; left: 0; right: 0; z-index: 1000; background: var(--background); border-bottom: 1px solid var(--border); padding: 1rem; backdrop-filter: blur(20px); transition: background-color 0.3s ease, border-color 0.3s ease;">
    <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center;">
      <!-- Logo -->
      <NuxtLink to="/" style="font-weight: bold; font-size: 2.25rem; text-decoration: none; display: flex; align-items: center; gap: 0.5rem;">
        <span style="background: linear-gradient(135deg, var(--primary) 0%, var(--primary-600) 100%); -webkit-background-clip: text; background-clip: text; color: transparent;">TradeGenius</span>
        <span style="font-size: 2.25rem;">🤖</span>
      </NuxtLink>

      <!-- Navigation principale (desktop) -->
      <div style="display: flex; align-items: center; gap: 1rem;" class="hidden-mobile">
        <NuxtLink to="/" style="color: var(--text); text-decoration: none; font-weight: 600; padding: 0.75rem 1.25rem; border-radius: 12px; transition: all 0.2s ease; border: 1px solid transparent;"
                  onmouseover="this.style.background='var(--muted)'; this.style.color='var(--primary)'; this.style.borderColor='var(--primary-200)'; this.style.transform='translateY(-1px)'"
                  onmouseout="this.style.background='transparent'; this.style.color='var(--text)'; this.style.borderColor='transparent'; this.style.transform='translateY(0)'">
          Accueil
        </NuxtLink>
        <NuxtLink v-if="authStore.isAuthenticated" to="/historique" style="color: var(--text); text-decoration: none; font-weight: 600; padding: 0.75rem 1.25rem; border-radius: 12px; transition: all 0.2s ease; border: 1px solid transparent;"
                  onmouseover="this.style.background='var(--muted)'; this.style.color='var(--primary)'; this.style.borderColor='var(--primary-200)'; this.style.transform='translateY(-1px)'"
                  onmouseout="this.style.background='transparent'; this.style.color='var(--text)'; this.style.borderColor='transparent'; this.style.transform='translateY(0)'">
          Historique
        </NuxtLink>
        <NuxtLink v-if="authStore.isAuthenticated" to="/dashboard" style="color: var(--text); text-decoration: none; font-weight: 600; padding: 0.75rem 1.25rem; border-radius: 12px; transition: all 0.2s ease; border: 1px solid transparent;"
                  onmouseover="this.style.background='var(--muted)'; this.style.color='var(--primary)'; this.style.borderColor='var(--primary-200)'; this.style.transform='translateY(-1px)'"
                  onmouseout="this.style.background='transparent'; this.style.color='var(--text)'; this.style.borderColor='transparent'; this.style.transform='translateY(0)'">
          Dashboard
        </NuxtLink>
        
        <!-- Auth / User (desktop) -->
        <div v-if="!authStore.isAuthenticated && $route.path !== '/auth'" class="hidden-mobile">
          <NuxtLink to="/auth" 
                    style="background: linear-gradient(135deg, var(--primary) 0%, var(--primary-600) 100%); color: white; padding: 0.875rem 1.75rem; border-radius: 16px; text-decoration: none; font-weight: 700; transition: all 0.2s ease; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25); font-size: 0.95rem;"
                    onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 24px rgba(59, 130, 246, 0.35)'"
                    onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(59, 130, 246, 0.25)'">
            Se connecter
          </NuxtLink>
        </div>
        
        <div v-if="authStore.isAuthenticated" style="position: relative;" class="hidden-mobile">
          <button @click="toggleUserMenu" 
                  style="background: var(--card); border: 2px solid var(--border); cursor: pointer; display: flex; align-items: center; gap: 0.875rem; padding: 0.875rem 1rem; border-radius: 16px; color: var(--text); transition: all 0.2s ease; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);"
                  onmouseover="this.style.borderColor='var(--primary-200)'; this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 16px rgba(0, 0, 0, 0.08)'"
                  onmouseout="this.style.borderColor='var(--border)'; this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0, 0, 0, 0.04)'">
            <img src="https://api.dicebear.com/7.x/bottts/svg?seed=user" 
                 alt="avatar" 
                 style="width: 2.25rem; height: 2.25rem; border-radius: 50%; border: 2px solid var(--primary-200);" />
            <span style="font-size: 0.9rem; font-weight: 600;">{{ authStore.user?.email }}</span>
          </button>
          
          <div v-if="userMenuOpen" 
               style="position: absolute; right: 0; top: 100%; margin-top: 0.75rem; background: var(--card); border: 2px solid var(--border); border-radius: 20px; padding: 1.5rem; min-width: 240px; z-index: 50; box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12); backdrop-filter: blur(20px); transition: all 0.3s ease;">
            <div style="padding: 1rem; border-bottom: 1px solid var(--border); margin-bottom: 1rem; border-radius: 12px; background: var(--muted); transition: border-color 0.3s ease;">
              <p style="font-size: 0.95rem; font-weight: 700; color: var(--text); margin: 0 0 0.5rem 0; transition: color 0.3s ease;">{{ authStore.user?.email }}</p>
              <p style="font-size: 0.8rem; color: var(--text-secondary); margin: 0; transition: color 0.3s ease; font-weight: 500;">
                {{ authStore.isOfflineMode ? 'Mode hors ligne' : 'Connecté' }}
              </p>
            </div>
            <NuxtLink to="/profil" 
                      @click="userMenuOpen = false"
                      style="display: block; padding: 1rem; color: var(--text); text-decoration: none; border-radius: 12px; font-weight: 600; transition: all 0.2s ease; border: 1px solid transparent;"
                      onmouseover="this.style.background='var(--muted)'; this.style.color='var(--primary)'; this.style.borderColor='var(--primary-200)'; this.style.transform='translateX(4px)'"
                      onmouseout="this.style.background='transparent'; this.style.color='var(--text)'; this.style.borderColor='transparent'; this.style.transform='translateX(0)'">
              Profil
            </NuxtLink>
            <button @click="logout" 
                    style="width: 100%; text-align: left; padding: 1rem; background: none; border: 1px solid transparent; color: #dc2626; cursor: pointer; border-radius: 12px; font-weight: 600; transition: all 0.2s ease;"
                    onmouseover="this.style.background='#fef2f2'; this.style.borderColor='#fecaca'; this.style.transform='translateX(4px)'"
                    onmouseout="this.style.background='transparent'; this.style.borderColor='transparent'; this.style.transform='translateX(0)'">
              Déconnexion
            </button>
          </div>
        </div>

        <!-- Switch thème (desktop) -->
        <button @click="toggleTheme" 
                style="background: var(--card); border: 2px solid var(--border); cursor: pointer; padding: 0.875rem; border-radius: 16px; color: var(--text); transition: all 0.2s ease; font-size: 1.25rem; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);"
                onmouseover="this.style.borderColor='var(--primary-200)'; this.style.transform='translateY(-1px) scale(1.05)'; this.style.boxShadow='0 4px 16px rgba(0, 0, 0, 0.08)'"
                onmouseout="this.style.borderColor='var(--border)'; this.style.transform='translateY(0) scale(1)'; this.style.boxShadow='0 2px 8px rgba(0, 0, 0, 0.04)'"
                aria-label="Changer de thème"
                class="hidden-mobile">
          {{ theme === 'dark' ? '☀️' : '🌙' }}
        </button>
      </div>

      <!-- Menu mobile -->
      <div class="mobile-menu">
        <!-- Switch thème mobile -->
        <button @click="toggleTheme" 
                style="background: var(--card); border: 2px solid var(--border); cursor: pointer; padding: 0.75rem; border-radius: 12px; color: var(--text); transition: all 0.2s ease; font-size: 1.125rem; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04); margin-right: 0.5rem;"
                onmouseover="this.style.borderColor='var(--primary-200)'; this.style.transform='translateY(-1px) scale(1.05)'; this.style.boxShadow='0 4px 16px rgba(0, 0, 0, 0.08)'"
                onmouseout="this.style.borderColor='var(--border)'; this.style.transform='translateY(0) scale(1)'; this.style.boxShadow='0 2px 8px rgba(0, 0, 0, 0.04)'"
                aria-label="Changer de thème">
          {{ theme === 'dark' ? '☀️' : '🌙' }}
        </button>

        <!-- Menu burger -->
        <button @click="toggleMobileMenu" 
                style="background: var(--card); border: 2px solid var(--border); cursor: pointer; padding: 0.75rem; border-radius: 12px; color: var(--text); transition: all 0.2s ease; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);"
                onmouseover="this.style.borderColor='var(--primary-200)'; this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 16px rgba(0, 0, 0, 0.08)'"
                onmouseout="this.style.borderColor='var(--border)'; this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0, 0, 0, 0.04)'"
                aria-label="Menu">
          <div style="width: 1.5rem; height: 1.125rem; display: flex; flex-direction: column; justify-content: space-between;">
            <span :style="`width: 100%; height: 2px; background: var(--text); border-radius: 2px; transform: ${mobileMenuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'rotate(0)'}; transition: all 0.3s ease;`"></span>
            <span :style="`width: 100%; height: 2px; background: var(--text); border-radius: 2px; opacity: ${mobileMenuOpen ? '0' : '1'}; transition: all 0.3s ease;`"></span>
            <span :style="`width: 100%; height: 2px; background: var(--text); border-radius: 2px; transform: ${mobileMenuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'rotate(0)'}; transition: all 0.3s ease;`"></span>
          </div>
        </button>
      </div>
    </div>

    <!-- Menu mobile dropdown -->
    <div v-if="mobileMenuOpen" 
         style="position: absolute; top: 100%; left: 0; right: 0; background: var(--background); border-bottom: 1px solid var(--border); backdrop-filter: blur(20px); z-index: 40; padding: 1rem;"
         class="mobile-dropdown">
      <div style="max-width: 1200px; margin: 0 auto; display: flex; flex-direction: column; gap: 0.5rem;">
        <NuxtLink to="/" 
                  @click="mobileMenuOpen = false"
                  style="color: var(--text); text-decoration: none; font-weight: 600; padding: 1rem 1.25rem; border-radius: 12px; transition: all 0.2s ease; border: 1px solid transparent;"
                  onmouseover="this.style.background='var(--muted)'; this.style.color='var(--primary)'; this.style.borderColor='var(--primary-200)'"
                  onmouseout="this.style.background='transparent'; this.style.color='var(--text)'; this.style.borderColor='transparent'">
          Accueil
        </NuxtLink>
        <NuxtLink v-if="authStore.isAuthenticated" 
                  to="/historique" 
                  @click="mobileMenuOpen = false"
                  style="color: var(--text); text-decoration: none; font-weight: 600; padding: 1rem 1.25rem; border-radius: 12px; transition: all 0.2s ease; border: 1px solid transparent;"
                  onmouseover="this.style.background='var(--muted)'; this.style.color='var(--primary)'; this.style.borderColor='var(--primary-200)'"
                  onmouseout="this.style.background='transparent'; this.style.color='var(--text)'; this.style.borderColor='transparent'">
          Historique
        </NuxtLink>
        <NuxtLink v-if="authStore.isAuthenticated" 
                  to="/dashboard" 
                  @click="mobileMenuOpen = false"
                  style="color: var(--text); text-decoration: none; font-weight: 600; padding: 1rem 1.25rem; border-radius: 12px; transition: all 0.2s ease; border: 1px solid transparent;"
                  onmouseover="this.style.background='var(--muted)'; this.style.color='var(--primary)'; this.style.borderColor='var(--primary-200)'"
                  onmouseout="this.style.background='transparent'; this.style.color='var(--text)'; this.style.borderColor='transparent'">
          Dashboard
        </NuxtLink>
        <NuxtLink v-if="authStore.isAuthenticated" 
                  to="/profil" 
                  @click="mobileMenuOpen = false"
                  style="color: var(--text); text-decoration: none; font-weight: 600; padding: 1rem 1.25rem; border-radius: 12px; transition: all 0.2s ease; border: 1px solid transparent;"
                  onmouseover="this.style.background='var(--muted)'; this.style.color='var(--primary)'; this.style.borderColor='var(--primary-200)'"
                  onmouseout="this.style.background='transparent'; this.style.color='var(--text)'; this.style.borderColor='transparent'">
          Profil
        </NuxtLink>
        
        <div v-if="!authStore.isAuthenticated && $route.path !== '/auth'" style="margin-top: 0.5rem;">
          <NuxtLink to="/auth" 
                    @click="mobileMenuOpen = false"
                    style="display: block; background: linear-gradient(135deg, var(--primary) 0%, var(--primary-600) 100%); color: white; padding: 1rem 1.25rem; border-radius: 12px; text-decoration: none; font-weight: 700; transition: all 0.2s ease; text-align: center;"
                    onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 16px rgba(59, 130, 246, 0.25)'"
                    onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
            Se connecter
          </NuxtLink>
        </div>
        
        <div v-if="authStore.isAuthenticated" style="border-top: 1px solid var(--border); margin-top: 1rem; padding-top: 1rem;">
          <div style="padding: 1rem; border-radius: 12px; background: var(--muted); margin-bottom: 0.5rem;">
            <p style="font-size: 0.9rem; font-weight: 700; color: var(--text); margin: 0 0 0.25rem 0;">{{ authStore.user?.email }}</p>
            <p style="font-size: 0.75rem; color: var(--text-secondary); margin: 0; font-weight: 500;">
              {{ authStore.isOfflineMode ? 'Mode hors ligne' : 'Connecté' }}
            </p>
          </div>
          <button @click="logout; mobileMenuOpen = false" 
                  style="width: 100%; text-align: center; padding: 1rem; background: #fef2f2; border: 1px solid #fecaca; color: #dc2626; cursor: pointer; border-radius: 12px; font-weight: 600; transition: all 0.2s ease;"
                  onmouseover="this.style.background='#fee2e2'; this.style.borderColor='#f87171'"
                  onmouseout="this.style.background='#fef2f2'; this.style.borderColor='#fecaca'">
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTheme } from '@/composables/useTheme'
import { useAuthStore } from '~/stores/useAuthStore'

// Thème
const { theme, toggleTheme } = useTheme()

// Auth store
const authStore = useAuthStore()

// Menu utilisateur
const userMenuOpen = ref(false)
const toggleUserMenu = () => {
  userMenuOpen.value = !userMenuOpen.value
}

// Menu mobile
const mobileMenuOpen = ref(false)
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

// Déconnexion
const logout = () => {
  authStore.logout()
  userMenuOpen.value = false
  mobileMenuOpen.value = false
}
</script>

<style>
/* Media queries pour le responsive */
@media (min-width: 768px) {
  .mobile-menu {
    display: none;
  }
  .mobile-dropdown {
    display: none !important;
  }
}

@media (max-width: 767px) {
  .hidden-mobile {
    display: none !important;
  }
  .mobile-menu {
    display: flex;
    align-items: center;
  }
}
</style>

