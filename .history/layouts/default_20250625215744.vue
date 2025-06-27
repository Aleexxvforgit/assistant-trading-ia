<template>
  <div class="min-h-screen bg-black text-white flex flex-col">
    <Header />
    <main class="flex-grow container mx-auto px-4 py-6">
      <NuxtPage />
    </main>
    <footer class="text-center p-4 text-sm text-gray-500">
      &copy; 2025 Assistant Trading IA
    </footer>
  </div>
</template>

<script setup>
import Header from '~/components/Header.vue'
</script>

<style>
/* On peut ajouter ici du CSS global léger si besoin */
</style>
