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

  // Vérifier la disponibilité de la clé API Mistral
  const mistralApiKey = process.env.MISTRAL_API_KEY
  const useFallback = !mistralApiKey

  try {
    if (!useFallback) {
      // Essayer d'utiliser l'API Mistral si la clé est disponible
      try {
        const mistralRes = await $fetch<MistralResponse>('https://api.mistral.ai/v1/chat/completions', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${mistralApiKey}`,
            'Content-Type': 'application/json'
          },
          body: {
            model: 'mistral-medium',
            messages: [
              {
                role: 'system',
                content: "Tu es un assistant expert en trading, analyse les décisions de l'utilisateur avec pédagogie"
              },
              {
                role: 'user',
                content: prompt
              }
            ]
          },
          timeout: 10000 // 10 secondes timeout
        })

        const result = mistralRes.choices?.[0]?.message?.content
        if (result) {
          return { result }
        }
      } catch (error) {
        console.error('Erreur lors de l\'appel à Mistral AI:', error)
        // En cas d'erreur, on utilise le fallback
      }
    }

    // Mode fallback - analyse simple
    console.log('Utilisation du mode fallback pour l\'analyse de trade')
    
    // Analyse du trade (logique simple)
    let result = ''
    
    if (body.type === 'buy') {
      const entry = Number(body.entry)
      const exit = Number(body.exit)
      const profit = exit - entry

      let profitPercentage = 0
      if (entry !== 0) {
        profitPercentage = (profit / entry) * 100
      } else {
        profitPercentage = 0 // ou une autre valeur par défaut si nécessaire
      }
      
      if (profit > 0) {
        result = `✅ Bonne opération! Profit de ${profit.toFixed(4)} (${profitPercentage.toFixed(2)}%). `
        result += `Ce trade d'achat sur ${body.asset} montre une bonne lecture du marché.\n\n`
        result += `Points forts:\n- Bonne identification du point d'entrée\n- Sortie avec profit\n`
        result += `\n(Mode d'analyse simplifié - Mistral AI non disponible)`
      } else {
        result = `❌ Opération perdante. Perte de ${profit.toFixed(4)} (${profitPercentage.toFixed(2)}%). `
        result += `Revoir votre analyse pour ce trade d'achat sur ${body.asset}.\n\n`
        result += `Points à améliorer:\n- Réévaluer votre stratégie d'entrée\n- Considérer l'utilisation de stop-loss\n`
        result += `\n(Mode d'analyse simplifié - Mistral AI non disponible)`
      }
    } else { // sell
      const entry = Number(body.entry)
const exit = Number(body.exit)
      const profit = entry - exit

      let profitPercentage = 0
      if (entry !== 0) {
        profitPercentage = (profit / entry) * 100
      } else {
        profitPercentage = 0 // ou une autre valeur par défaut si nécessaire
      }

      if (profit > 0) {
        result = `✅ Bonne opération! Profit de ${profit.toFixed(4)} (${profitPercentage.toFixed(2)}%). `
        result += `Ce trade de vente sur ${body.asset} montre une bonne anticipation baissière.\n\n`
        result += `Points forts:\n- Bonne identification de la tendance baissière\n- Timing de sortie approprié\n`
        result += `\n(Mode d'analyse simplifié - Mistral AI non disponible)`
      } else {
        result = `❌ Opération perdante. Perte de ${profit.toFixed(4)} (${profitPercentage.toFixed(2)}%). `
        result += `Revoir votre analyse pour ce trade de vente sur ${body.asset}.\n\n`
        result += `Points à améliorer:\n- Revoir les indicateurs utilisés pour les ventes\n- Considérer la tendance globale du marché\n`
        result += `\n(Mode d'analyse simplifié - Mistral AI non disponible)`
      }
    }
    
    return { result }
  } catch (error) {
    console.error('Erreur générale dans l\'analyse de trade:', error)
    return { 
      result: '❌ Une erreur est survenue lors de l\'analyse. Veuillez réessayer.'
    }
  }
})