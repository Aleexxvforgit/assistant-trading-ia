<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { onMounted } from 'vue'
import { useTheme } from '@/composables/useTheme'
import { useAuthStore } from '~/stores/useAuthStore'
import { useTradesStore } from '~/stores/useTradesStore'

// Initialiser les stores lors du chargement
const authStore = useAuthStore()
const tradesStore = useTradesStore()
const { theme } = useTheme()

onMounted(() => {
  // Initialiser le thème
  if (theme.value === 'dark') {
    document.documentElement.classList.add('dark')
  }

  // Initialiser les données depuis le localStorage
  authStore.initFromLocalStorage()
  tradesStore.loadTrades()
})
</script>

<!-- Ajout d'un script dans le head pour appliquer la classe dark dès le chargement -->
<script>
export default {
  head: {
    script: [
      {
        innerHTML: `
          try {
            var theme = localStorage.getItem('theme');
            if (!theme) {
              // Prendre la préférence système si aucun thème n'est stocké
              theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            }
            if (theme === 'dark') {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
          } catch (e) {}`,
        type: 'text/javascript',
        charset: 'utf-8'
      }
    ],
    __dangerouslyDisableSanitizers: ['script']
  }
}
</script>

<style>
/* Styles globaux */
body {
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Fallback pour les navigateurs sans support de scroll-behavior */
@supports not (scroll-behavior: smooth) {
  html {
    scroll-behavior: auto;
  }
}
</style>
