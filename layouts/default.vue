<template>
  <div class="min-h-screen transition-colors duration-300" style="background: var(--background);">
    <Header />

    <main style="color: var(--text); padding-top: 5rem;">
      <NuxtPage />
    </main>
    
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'

// Initialiser le thème
useTheme()
</script>

