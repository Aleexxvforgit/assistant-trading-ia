// Fichiers clés pour ton assistant IA Nuxt.js (starter)

// ==============================
// /pages/index.vue
// ==============================
<template>
  <div class="p-6 max-w-xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Saisir un trade</h1>
    <form @submit.prevent="submitTrade" class="space-y-4">
      <input v-model="trade.asset" placeholder="Actif (ex: EUR/USD)" class="w-full p-2 border rounded" />
      <input v-model="trade.entry" placeholder="Entrée" class="w-full p-2 border rounded" />
      <input v-model="trade.exit" placeholder="Sortie" class="w-full p-2 border rounded" />
      <input v-model="trade.result" placeholder="Résultat (pips ou €)" class="w-full p-2 border rounded" />
      <input v-model="trade.strategy" placeholder="Stratégie / Indicateurs" class="w-full p-2 border rounded" />
      <textarea v-model="trade.comment" placeholder="Commentaire du trade" class="w-full p-2 border rounded"></textarea>
      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">Analyser avec l'IA</button>
    </form>

    <div v-if="analysis" class="mt-6 p-4 bg-gray-100 rounded">
      <h2 class="font-bold">Analyse IA</h2>
      <p>{{ analysis }}</p>
    </div>
  </div>
</template>

<script setup>
const trade = reactive({
  asset: '', entry: '', exit: '', result: '', strategy: '', comment: ''
});
const analysis = ref('');

async function submitTrade() {
  const res = await $fetch('/api/analyse-trade', {
    method: 'POST',
    body: trade
  });
  analysis.value = res.result;
}
</script>

// ==============================
// /server/api/analyse-trade.ts
// ==============================
import { defineEventHandler, readBody } from 'h3';
import { createPrompt } from '../../utils/prompt';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const prompt = createPrompt(body);

  const mistralRes = await $fetch('https://api.mistral.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: {
      model: 'mistral-medium',
      messages: [
        { role: 'system', content: 'Tu es un assistant expert en trading, analyse les décisions de l’utilisateur de manière pédagogique.' },
        { role: 'user', content: prompt }
      ]
    }
  });

  const result = mistralRes.choices?.[0]?.message?.content;
  return { result };
});

// ==============================
// /utils/prompt.ts
// ==============================
export function createPrompt({ asset, entry, exit, result, strategy, comment }) {
  return `Voici un trade effectué :\n
- Actif : ${asset}\n- Entrée : ${entry}\n- Sortie : ${exit}\n- Résultat : ${result}\n- Stratégie : ${strategy}\n- Commentaire : ${comment}\n
Analyse ce trade en 3 points :\n1. Ce qui a bien fonctionné\n2. Ce qui aurait pu mal tourner\n3. Conseils personnalisés pour l’avenir.`;
}

// ==============================
// .env (ne jamais push sur GitHub)
// ==============================
MISTRAL_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxx

// ==============================
// /nuxt.config.ts (ajout runtime config)
// ==============================
export default defineNuxtConfig({
  runtimeConfig: {
    MISTRAL_API_KEY: process.env.MISTRAL_API_KEY
  }
});
