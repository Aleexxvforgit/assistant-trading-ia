import { defineEventHandler, readBody } from 'h3';
import { createPrompt } from /utils/prompt';

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
