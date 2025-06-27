export function createPrompt({ asset, entry, exit, result, strategy, comment }) {
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
