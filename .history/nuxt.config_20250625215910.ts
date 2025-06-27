export default defineNuxtConfig({
  runtimeConfig: {
    MISTRAL_API_KEY: process.env.MISTRAL_API_KEY
  },
  css: ['~/assets/css/tailwind.css']
})
