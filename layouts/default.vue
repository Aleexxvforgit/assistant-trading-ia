<template>
  <div>
    <Header />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'
const { theme, toggleTheme } = useTheme()
</script>
