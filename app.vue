<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import { useTheme } from '@/composables/useTheme'
import { useAuthStore } from '~/stores/useAuthStore'
import { useTradesStore } from '~/stores/useTradesStore'

// Initialiser les stores lors du chargement
const authStore = useAuthStore()
const tradesStore = useTradesStore()
const { theme } = useTheme()

// Injection du script dark mode dans le head pour éviter le mismatch SSR/CSR
useHead({
  script: [
    {
      innerHTML: `
        try {
          var theme = localStorage.getItem('theme');
          if (!theme) {
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
})

// Initialiser les données depuis le localStorage et Firebase
onMounted(() => {
  authStore.initFromLocalStorage()
  authStore.initFirebaseAuthListener()
  tradesStore.loadTrades()
})
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
