// Formats français pour l'affichage (prompt de la maquette).

// Date et heure → JJ/MM/AAAA, à l'heure de Brazzaville
export function formaterDate(date: Date): string {
  return date.toLocaleDateString("fr-FR", { timeZone: "Africa/Brazzaville" });
}

// Date lue en texte dans la base ("2010-04-17") → "17/04/2010"
export function formaterDateTexte(date: string): string {
  const [annee, mois, jour] = date.split("-");
  return jour && mois && annee ? `${jour}/${mois}/${annee}` : date;
}

// Moyenne lue en texte dans la base ("13.50") → "13,50"
export function formaterMoyenne(moyenne: string): string {
  return moyenne.replace(".", ",");
}
