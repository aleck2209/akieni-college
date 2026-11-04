// Accès aux données de la demande d’inscription (F6).
// PROVISOIRE : données écrites à la main, copiées de schemas.sql.
// À remplacer par des requêtes sur la base Supabase quand elle sera prête :
// seul ce fichier devra changer.

import type { DonneesDemande } from "./validation-demande";

export type Classe = {
  id: number;
  slug: string;
  niveau: "seconde" | "premiere" | "terminale";
  serie: "A" | "C" | "D";
  libelle: string;
  inscriptionsOuvertes: boolean;
};

const CLASSES: Classe[] = [
  { id: 1, slug: "seconde-a", niveau: "seconde", serie: "A", libelle: "Seconde A", inscriptionsOuvertes: true },
  { id: 2, slug: "seconde-c", niveau: "seconde", serie: "C", libelle: "Seconde C", inscriptionsOuvertes: true },
  { id: 3, slug: "premiere-a", niveau: "premiere", serie: "A", libelle: "Première A", inscriptionsOuvertes: true },
  { id: 4, slug: "premiere-c", niveau: "premiere", serie: "C", libelle: "Première C", inscriptionsOuvertes: true },
  { id: 5, slug: "premiere-d", niveau: "premiere", serie: "D", libelle: "Première D", inscriptionsOuvertes: true },
  { id: 6, slug: "terminale-a", niveau: "terminale", serie: "A", libelle: "Terminale A", inscriptionsOuvertes: true },
  { id: 7, slug: "terminale-c", niveau: "terminale", serie: "C", libelle: "Terminale C", inscriptionsOuvertes: true },
  { id: 8, slug: "terminale-d", niveau: "terminale", serie: "D", libelle: "Terminale D", inscriptionsOuvertes: true },
];

export async function listerClasses(): Promise<Classe[]> {
  return CLASSES;
}

export async function trouverClasse(id: number): Promise<Classe | null> {
  return CLASSES.find((classe) => classe.id === id) ?? null;
}

// La table demande impose une seule demande par compte (compte_id UNIQUE).
export async function compteADejaUneDemande(compteId: number): Promise<boolean> {
  void compteId; // inutilisé tant que la base n’est pas branchée
  return false;
}

export type ResultatCreation = { ok: true } | { ok: false; erreur: string };

// Enregistre la demande avec le statut « en_attente ».
export async function creerDemande(
  compteId: number,
  classeId: number,
  donnees: DonneesDemande,
): Promise<ResultatCreation> {
  void compteId;
  void classeId;
  void donnees; // inutilisés tant que la base n’est pas branchée
  return { ok: true };
}
