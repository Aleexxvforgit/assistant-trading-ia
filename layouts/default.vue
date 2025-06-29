<template>
  <div class="min-h-screen flex flex-col bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
    <Header />

    <div class="flex-grow">
      <NuxtPage />
    </div>

    <footer class="py-4 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
      <div class="container mx-auto px-4">
        <p>Assistant IA de Trading &copy; {{ new Date().getFullYear() }}</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'

// Initialiser le thème (uniquement pour l'import, la gestion dynamique est dans le composable)
useTheme()
</script>

