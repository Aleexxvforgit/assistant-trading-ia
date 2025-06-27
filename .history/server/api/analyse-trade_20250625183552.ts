import { defineEventHandler, readBody } from 'h3';
import { createPrompt } from '~/utils/prompt';

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

  const result = mistralRes.choices?.[0]?.message?.content;export function createPrompt({ asset, entry, exit, result, strategy, comment }) {
  return `Voici un trade effectué :\n
- Actif : ${asset}
- Entrée : ${entry}
- Sortie : ${exit}
- Résultat : ${result}
- Stratégie : ${strategy}
- Commentaire : ${comment}

Analyse ce trade en 3 points :
1. Ce qui a bien fonctionné
2. Ce qui aurait pu mal tourner
3. Conseils personnalisés pour l’avenir.`;
}

  return { result };
});
