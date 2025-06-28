<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup>
import { useTheme } from '@/composables/useTheme'
useTheme() // important ici aussi pour les pages autres que index.vue
</script>
