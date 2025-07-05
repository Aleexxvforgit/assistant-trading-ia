<template>
  <div class="min-h-screen transition-colors duration-300" style="background: var(--background);">
    <main style="color: var(--text);">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'

// Initialiser le thème
useTheme()
</script>
