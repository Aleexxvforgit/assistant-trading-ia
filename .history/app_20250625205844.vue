<template>
  <div>
      <NuxtPage />
  </div>
  export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap' }
      ]
    }
  }
})
</template>
