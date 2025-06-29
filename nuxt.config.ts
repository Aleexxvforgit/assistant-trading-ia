import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxt/ui',
    '@vueuse/nuxt',
  ],
  css: ['~/assets/css/tailwind.css'],
  nitro: {
    compatibilityDate: {
      date: '2024-04-03'
    },
  },
  typescript: {
    strict: true,
    shim: false,
  },
  runtimeConfig: {
    // Clés privées accessibles côté serveur uniquement
    mistralApiKey: process.env.MISTRAL_API_KEY,
    
    // Clés publiques exposées au client
    public: {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
    }
  },
  devtools: { enabled: true },
  app: {
    // Pour une transition plus fluide entre les pages
    pageTransition: { name: 'page', mode: 'out-in' }
  }
})