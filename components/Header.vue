<template>
  <nav class="bg-gray-900 shadow-md p-4 flex justify-between items-center">
    <h1 class="text-xl font-bold text-[#ff0000]">Assistant Trading IA</h1>
    <ul class="flex space-x-6">
      <li>
        <NuxtLink
          to="/"
          class="hover:bg-opacity-80 transition"
          active-class="text-[#00FFC3] font-semibold"
          exact
        >Accueil</NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/historique"
          class="hover:bg-opacity-80 transition"
          active-class="text-[#00FFC3] font-semibold"
        >Historique</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup></script>

<style scoped>
/* Pas de styles additionnels pour l’instant */
</style>
