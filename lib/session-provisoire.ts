// PROVISOIRE : le rôle devra venir de la session Auth.js (jamais d’un champ
// de formulaire ni d’une adresse). À remplacer quand la PR « auth » sera
// fusionnée : renvoyer null si personne n’est connecté.
export async function obtenirRole(): Promise<"eleve" | "ecole" | null> {
  return "ecole";
}
