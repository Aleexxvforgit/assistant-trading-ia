<template>
  <div>
    <Header />

    <div>
      <NuxtPage />
    </div>
    <Footer />

  </div>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'

// Initialiser le thème (uniquement pour l'import, la gestion dynamique est dans le composable)
useTheme()
</script>

