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

export type StatutDemande = "en_attente" | "validee" | "refusee";

export type DemandeEleve = {
  classe: Classe;
  envoyeeLe: Date;
  statut: StatutDemande;
};

// Renvoie la demande du compte, ou null s’il n’en a pas déposé.
// PROVISOIRE : tant que la base n’est pas branchée, rien n’est enregistré.
export async function trouverDemandeDuCompte(
  compteId: number,
): Promise<DemandeEleve | null> {
  void compteId; // inutilisé tant que la base n’est pas branchée
  return null;
}

// PROVISOIRE : fausse demande pour tester les trois affichages
// (en attente, validée, refusée). À supprimer quand la base sera branchée.
export function demandeDeTest(statut: StatutDemande): DemandeEleve {
  return { classe: CLASSES[0], envoyeeLe: new Date(), statut };
}

// ---------------------------------------------------------------
// F8 : traitement des demandes par l’école
// PROVISOIRE : les demandes sont des données de test gardées en mémoire.
// À remplacer par des requêtes sur la table demande (base Supabase).
// ---------------------------------------------------------------

export type DemandeEcole = {
  id: number;
  classe: Classe;
  envoyeeLe: Date;
  statut: StatutDemande;
  traiteeLe: Date | null;
  // Tout ce que l’élève a saisi, sauf la classe (déjà dans « classe »)
  donnees: Omit<DonneesDemande, "classe_id">;
};

function demandeTest(
  id: number,
  classeId: number,
  envoyeeLe: string,
  statut: StatutDemande,
  eleve: { nom: string; prenoms: string; sexe: "F" | "M" },
): DemandeEcole {
  const classe = CLASSES.find((c) => c.id === classeId) ?? CLASSES[0];
  const entreeEnSeconde = classe.niveau === "seconde";
  return {
    id,
    classe,
    envoyeeLe: new Date(envoyeeLe),
    statut,
    traiteeLe: statut === "en_attente" ? null : new Date(envoyeeLe),
    donnees: {
      eleve_nom: eleve.nom,
      eleve_prenoms: eleve.prenoms,
      sexe: eleve.sexe,
      date_naissance: "2010-05-12",
      lieu_naissance: "Brazzaville",
      nationalite: "Congolaise",
      adresse_quartier: "Poto-Poto",
      adresse_ville: "Brazzaville",
      telephone: "",
      etablissement_precedent: "CEG Marien Ngouabi",
      derniere_classe: entreeEnSeconde ? "3e" : "Classe inférieure",
      moyenne_annuelle: "13,50",
      moyenne_bepc: entreeEnSeconde ? "12,75" : "",
      responsable_nom: eleve.nom,
      responsable_prenoms: "Jean",
      responsable_lien: "pere",
      responsable_telephone: "06 000 00 00",
      responsable_email: "",
    },
  };
}

const demandesDeTest: DemandeEcole[] = [
  demandeTest(1, 1, "2026-11-02T09:15:00", "en_attente", { nom: "MBEMBA", prenoms: "Grâce Estelle", sexe: "F" }),
  demandeTest(2, 2, "2026-11-03T14:40:00", "en_attente", { nom: "OKOUMOU", prenoms: "Prince Gaël", sexe: "M" }),
  demandeTest(3, 4, "2026-11-03T16:05:00", "validee", { nom: "NZABA", prenoms: "Merveille", sexe: "F" }),
  demandeTest(4, 8, "2026-11-04T08:30:00", "refusee", { nom: "ITOUA", prenoms: "Kévin Brice", sexe: "M" }),
  demandeTest(5, 3, "2026-11-04T11:20:00", "en_attente", { nom: "NDINGA", prenoms: "Divine", sexe: "F" }),
];

// Toutes les demandes, les plus récentes en premier
export async function listerDemandes(): Promise<DemandeEcole[]> {
  return [...demandesDeTest].sort(
    (a, b) => b.envoyeeLe.getTime() - a.envoyeeLe.getTime(),
  );
}

// Une demande avec toutes les informations saisies par l’élève
export async function trouverDemande(id: number): Promise<DemandeEcole | null> {
  return demandesDeTest.find((demande) => demande.id === id) ?? null;
}

export type ResultatTraitement = { ok: true } | { ok: false; erreur: string };

// Valide ou refuse une demande en attente. Une demande déjà traitée ne change plus.
export async function traiterDemande(
  id: number,
  decision: "validee" | "refusee",
): Promise<ResultatTraitement> {
  const demande = demandesDeTest.find((d) => d.id === id);
  if (!demande) {
    return { ok: false, erreur: "Cette demande n’existe pas." };
  }
  if (demande.statut !== "en_attente") {
    return { ok: false, erreur: "Cette demande a déjà été traitée." };
  }
  demande.statut = decision;
  demande.traiteeLe = new Date();
  return { ok: true };
}
