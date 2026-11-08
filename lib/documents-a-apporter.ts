// Documents à apporter au secrétariat après la validation de la demande (F7).
// Source : document « Fonctionnalités », §6.

import type { Classe } from "./classes";

export function documentsAApporter(niveau: Classe["niveau"]): string[] {
  const documents = ["Extrait d’acte de naissance"];

  // La copie du BEPC ne concerne que l’entrée en Seconde
  if (niveau === "seconde") {
    documents.push("Copie légalisée du BEPC et relevé de notes");
  }

  documents.push("2 photos d’identité");
  return documents;
}
