export interface TradeData {
  type: string
  asset: string
  entry: string
  exit: string
  result: string
  strategy: string
comment: string
}

export function createPrompt({
  asset,
  entry,
  exit,
  result: tradeResult, // Renommer la variable pour éviter les conflits
  strategy,
  type, // Ajouter la variable type
  comment = ''
}: TradeData): string {
  const action = type === 'buy' ? 'acheté' : 'vendu';
  const direction = type === 'buy' ? 'à la hausse' : 'à la baisse';
  const tradeOutcome = type === 'buy'
    ? entry < exit ? 'profitable' : 'en perte'
    : entry > exit ? 'profitable' : 'en perte';
  return `Voici un trade effectué :
- Actif : ${asset}
- Entrée : ${entry}
- Sortie : ${exit}
- Résultat : ${tradeResult}
- Stratégie : ${strategy}
- Commentaire : ${comment}

Analyse ce trade en 3 points :
1. Ce qui a bien fonctionné :
    - Bonne identification du point d'entrée.
    - Timing de sortie approprié.
2. Ce qui aurait pu mal tourner :
    - Risque de perte si le marché a continué dans la direction opposée.
    - Manque de diversification dans le portefeuille.
3. Conseils personnalisés pour l’avenir :
    - Considérer l'utilisation de stop-loss pour limiter les pertes.
    - Analyser les indicateurs techniques avant d'entrer dans un trade.`}
