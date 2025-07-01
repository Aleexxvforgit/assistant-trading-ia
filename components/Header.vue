<template>
  <nav
    class="fixed top-0 left-0 w-full z-50 shadow-md px-4 py-3 flex justify-between items-center bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300"
  >
    <!-- Logo / Titre -->
    <NuxtLink to="/" class="text-3xl font-bold bg-white text-black dark:bg-gray-900 dark:text-blue-400 transition-colors duration-300">
      TradeGenius 🤖
    </NuxtLink>

    <!-- Menu desktop (toujours visible) -->
    <div v-if="isClient" class="flex items-center space-x-6">
      <NuxtLink
        to="/"
        class="bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300"
      
        exact
      >
        Accueil
      </NuxtLink>

      <NuxtLink
        v-if="authStore.isAuthenticated"
        to="/historique"
        class="bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300"
      >
        Historique
      </NuxtLink>

      <NuxtLink
        v-if="authStore.isAuthenticated"
        to="/dashboard"
        class="bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300 font-semibold text-blue-600 dark:text-blue-400"
      >
        Dashboard
      </NuxtLink>

      <NuxtLink
        v-if="authStore.isAuthenticated"
        to="/profil"
        class="bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300"
      >
        Profil
      </NuxtLink>

      <!-- Lien d'authentification conditionnel -->
      <NuxtLink
        v-if="!authStore.isAuthenticated"
        to="/auth"
        class="bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300"
      >
        Connexion
      </NuxtLink>

      <!-- Bouton de switch thème -->
      <button
        @click="toggleTheme"
        class="bg-gray-200 dark:bg-gray-700 text-sm rounded-xl shadow hover:opacity-100 px-3 py-1 transition"
      >
        {{ theme === 'dark' ? '☀︎' : '⏾' }}
      </button>

      <!-- Menu utilisateur (seulement si connecté) -->
      <div v-if="authStore.isAuthenticated" class="relative">
        <div
          class="flex items-center space-x-2 cursor-pointer"
          @click="toggleUserMenu"
        >
          <img
            src="https://api.dicebear.com/7.x/bottts/svg?seed=user"
            alt="avatar"
            class="w-8 h-8 rounded-full cursor-pointer"
          />
          <UBadge v-if="authStore.isOfflineMode" color="orange" size="xs">Hors ligne</UBadge>
          <span class="text-sm hidden lg:inline">{{ authStore.user?.email }}</span>
        </div>
        <div
          v-if="userMenuOpen"
          class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-xl z-50 overflow-hidden"
        >
          <div class="px-4 py-2">
            <p class="text-sm font-medium">{{ authStore.user?.email }}</p>
            <p class="text-xs text-gray-500">{{ authStore.isOfflineMode ? 'Mode hors ligne' : 'Connecté' }}</p>
          </div>
          <button
            @click="logout"
            class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600 dark:text-red-400"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </div>

    <!-- Burger menu button (mobile only) -->
    <button
      v-if="isClient"
      @click="menuOpen = !menuOpen"
      class="md:hidden text-black dark:text-white focus:outline-none"
    >
      <svg v-if="!menuOpen" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2"
        viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
      <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2"
        viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
        <path d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>

    <!-- Menu mobile -->
    <div v-if="isClient && menuOpen" class="absolute top-16 left-0 w-full bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300 z-40 shadow-lg">
      <ul class="flex flex-col space-y-4 px-4 py-2">
        <li>
          <NuxtLink
            to="/"
            class="block py-2"
            active-class="text-[#00FFC3] font-semibold"
            @click="menuOpen = false"
            exact
          >
            Accueil
          </NuxtLink>
        </li>

        <li v-if="authStore.isAuthenticated">
          <NuxtLink
            to="/historique"
            class="block py-2"
            active-class="text-[#00FFC3] font-semibold"
            @click="menuOpen = false"
          >
            Historique
          </NuxtLink>
        </li>

        <li v-if="authStore.isAuthenticated">
          <NuxtLink
            to="/dashboard"
            class="block py-2 font-semibold text-blue-600 dark:text-blue-400"
            active-class="text-[#00FFC3] font-semibold"
            @click="menuOpen = false"
          >
            Dashboard
          </NuxtLink>
        </li>

        <li v-if="authStore.isAuthenticated">
          <NuxtLink
            to="/profil"
            class="block py-2"
            active-class="text-[#00FFC3] font-semibold"
            @click="menuOpen = false"
          >
            Profil
          </NuxtLink>
        </li>

        <li v-if="!authStore.isAuthenticated">
          <NuxtLink
            to="/auth"
            class="block py-2"
            active-class="text-[#00FFC3] font-semibold"
            @click="menuOpen = false"
          >
            Connexion
          </NuxtLink>
        </li>

        <li>
          <button
            @click="toggleTheme"
            class="w-full text-left py-2 flex items-center"
          >
            <span class="mr-2">{{ theme === 'dark' ? '☀️' : '🌙' }}</span>
            {{ theme === 'dark' ? 'Thème Clair' : 'Thème Sombre' }}
          </button>
        </li>

        <li v-if="authStore.isAuthenticated">
          <div class="pt-2 pb-3">
            <div class="flex items-center mb-2">
              <img
                src="https://api.dicebear.com/7.x/bottts/svg?seed=user"
                alt="avatar"
                class="w-6 h-6 rounded-full mr-2"
              />
              <span class="text-sm">{{ authStore.user?.email }}</span>
              <UBadge v-if="authStore.isOfflineMode" color="orange" size="xs" class="ml-2">Hors ligne</UBadge>
            </div>

            <button
              @click="logout"
              class="w-full text-left py-2 text-red-600 dark:text-red-400"
            >
              Déconnexion
            </button>
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
  router.push('/auth')
}
</script>

<style scoped>
/* Scroll fix pour header fixe */
body {
  scroll-padding-top: 72px;
}
</style>

