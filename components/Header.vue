<template>

  <nav
    class="shadow-md px-4 py-3 flex justify-between items-center bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300"
  >
    <!-- Logo / Titre -->
    <h1 class="text-xl font-bold bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">Assistant Trading IA</h1>

    <!-- Menu desktop -->
    <ul class="hidden md:flex space-x-6">
      <li>
        <NuxtLink
          to="/"
          class="bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300"
          active-class="text-[#00FFC3] font-semibold"
          exact
        >
          Accueil
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/historique"
          class=" bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300"
          active-class="text-[#00FFC3] font-semibold"
        >
          Historique
        </NuxtLink>
      </li>
      <li>
              <!-- Bouton de switch thème -->
    <button
      @click="toggleTheme"
      class="bg-gray-200 dark:bg-gray-700 text-sm rounded-xl shadow hover:opacity-100 size:400 transition"
    >
      {{ theme === 'dark' ? '☀︎' : '⏾' }}
    </button>
      </li>
    </ul>
    

    <!-- Burger menu button (mobile only) -->
    <button
      @click="menuOpen = !menuOpen"
      class="md:hidden text-white dark:text-gray-300 focus:outline-none"
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
    <div v-if="menuOpen" class="absolute top-16 left-0 w-full  bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <ul class="flex flex-col space-y-4">
        <li>
          <NuxtLink
            to="/"
            class= "bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300"
            active-class="text-[#00FFC3] font-semibold"
            @click="menuOpen = false"
            exact
          >
            Accueil
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/historique"
            class=" bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300"
            active-class="text-[#00FFC3] font-semibold"
            @click="menuOpen = false"
          >
            Historique
          </NuxtLink>
        </li>
        <li>
              <!-- Bouton de switch thème -->
    <button
      @click="toggleTheme"
      class="bg-gray-200 dark:bg-gray-700 text-sm rounded-xl shadow hover:opacity-80 transition"
    >
      {{ theme === 'dark' ? '☀️' : '🌙' }}
    </button>
      </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTheme } from '@/composables/useTheme'

const menuOpen = ref(false)
const { theme, toggleTheme } = useTheme()
</script>

<style scoped>
/* Ajoute ici si tu veux plus de style custom */
</style>
