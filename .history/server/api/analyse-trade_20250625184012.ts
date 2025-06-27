import { defineEventHandler, readBody } from 'h3'
import { createPrompt, TradeData } from '~/utils/prompt'

type MistralResponse = {
  choices: {
    message: {
      content: string
    }
  }[]
}

export default defineEventHandler(async (event) => {
  const body: TradeData = await readBody(event)
  const prompt = createPrompt(body)

  const mistralRes = await $fetch<MistralResponse>('https://api.mistral.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: {
      model: 'mistral-medium',
      messages: [
        {
          role: 'system',
          content: 'Tu es un assistant expert en trading, analyse les décisions de l’utilisateur avec pédagogie.'
        },
        {
          role: 'user',
          content: prompt
        }
      ]
    }
  })

  const result = mistralRes.choices?.[0]?.message?.content ?? 'Pas de réponse de l’IA.'
  return { result }
})