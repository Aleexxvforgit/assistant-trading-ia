<template>
  <nav>
    <!-- Logo / Titre -->
    <NuxtLink to="/">
      TradeGenius 🤖
    </NuxtLink>

    <!-- Menu desktop (toujours visible) -->
    <div v-if="isClient">
      <NuxtLink to="/" exact>Accueil</NuxtLink>
      <NuxtLink v-if="authStore.isAuthenticated" to="/historique">Historique</NuxtLink>
      <NuxtLink v-if="authStore.isAuthenticated" to="/dashboard">Dashboard</NuxtLink>
      <NuxtLink v-if="!authStore.isAuthenticated" to="/auth">Connexion</NuxtLink>
      <button @click="toggleTheme">{{ theme === 'dark' ? '☀︎' : '⏾' }}</button>
      <div v-if="authStore.isAuthenticated">
        <div @click="toggleUserMenu" style="cursor:pointer;display:inline-flex;align-items:center;gap:8px;">
          <img src="https://api.dicebear.com/7.x/bottts/svg?seed=user" alt="avatar" width="32" height="32" />
          <UBadge v-if="authStore.isOfflineMode">Hors ligne</UBadge>
          <span>{{ authStore.user?.email }}</span>
        </div>
        <div v-if="userMenuOpen" style="position:absolute;background:#fff;border:1px solid #ccc;padding:8px;z-index:100;min-width:150px;">
          <p>{{ authStore.user?.email }}</p>
          <p>{{ authStore.isOfflineMode ? 'Mode hors ligne' : 'Connecté' }}</p>
          <NuxtLink to="/profil" @click="userMenuOpen = false">Profil</NuxtLink>
          <button @click="logout">Déconnexion</button>
        </div>
      </div>
    </div>

    <!-- Burger menu button (mobile only) -->
    <button v-if="isClient" @click="menuOpen = !menuOpen">
      <svg v-if="!menuOpen" width="24" height="24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
      <svg v-else width="24" height="24"><path d="M6 18L18 6M6 6l12 12"/></svg>
    </button>

    <!-- Menu mobile -->
    <div v-if="isClient && menuOpen">
      <ul>
        <li><NuxtLink to="/" exact @click="menuOpen = false">Accueil</NuxtLink></li>
        <li v-if="authStore.isAuthenticated"><NuxtLink to="/historique" @click="menuOpen = false">Historique</NuxtLink></li>
        <li v-if="authStore.isAuthenticated"><NuxtLink to="/dashboard" @click="menuOpen = false">Dashboard</NuxtLink></li>
        <li v-if="!authStore.isAuthenticated"><NuxtLink to="/auth" @click="menuOpen = false">Connexion</NuxtLink></li>
        <li><button @click="toggleTheme">{{ theme === 'dark' ? '☀️' : '🌙' }} {{ theme === 'dark' ? 'Thème Clair' : 'Thème Sombre' }}</button></li>
        <li v-if="authStore.isAuthenticated">
          <div>
            <img src="https://api.dicebear.com/7.x/bottts/svg?seed=user" alt="avatar" width="24" height="24" />
            <span>{{ authStore.user?.email }}</span>
            <UBadge v-if="authStore.isOfflineMode">Hors ligne</UBadge>
            <button @click="logout">Déconnexion</button>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTheme } from '@/composables/useTheme'
import { useAuthStore } from '~/stores/useAuthStore'
import { useRouter } from 'vue-router'

// Thème
const { theme, toggleTheme } = useTheme()

// Auth store
const authStore = useAuthStore()
const router = useRouter()

// Menu burger
const menuOpen = ref(false)

// Menu utilisateur
const userMenuOpen = ref(false)
const toggleUserMenu = () => {
  userMenuOpen.value = !userMenuOpen.value
}

// Pour forcer le rendu côté client
const isClient = ref(false)
onMounted(() => {
  isClient.value = true
})

// Déconnexion
const logout = () => {
  authStore.logout()
  userMenuOpen.value = false
  menuOpen.value = false
  // Ne pas rediriger ici, la logique est dans le store
}
</script>

<!-- Menu déroulant utilisateur visible et fonctionnel même sans CSS externe -->

