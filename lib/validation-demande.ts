// Vérification des champs de la demande d’inscription (F6).
// Fonction pure : elle ne touche ni à la base ni à la session.

export const CHAMPS_DEMANDE = [
  "classe_id",
  "eleve_nom",
  "eleve_prenoms",
  "sexe",
  "date_naissance",
  "lieu_naissance",
  "nationalite",
  "adresse_quartier",
  "adresse_ville",
  "telephone",
  "etablissement_precedent",
  "derniere_classe",
  "moyenne_annuelle",
  "moyenne_bepc",
  "responsable_nom",
  "responsable_prenoms",
  "responsable_lien",
  "responsable_telephone",
  "responsable_email",
] as const;

export type ChampDemande = (typeof CHAMPS_DEMANDE)[number];
export type DonneesDemande = Record<ChampDemande, string>;
export type ErreursDemande = Partial<Record<ChampDemande, string>>;

// Champs obligatoires. Facultatifs : telephone, responsable_email,
// et moyenne_bepc (obligatoire seulement pour une entrée en Seconde).
const OBLIGATOIRES: ChampDemande[] = [
  "classe_id",
  "eleve_nom",
  "eleve_prenoms",
  "sexe",
  "date_naissance",
  "lieu_naissance",
  "nationalite",
  "adresse_quartier",
  "adresse_ville",
  "etablissement_precedent",
  "derniere_classe",
  "moyenne_annuelle",
  "responsable_nom",
  "responsable_prenoms",
  "responsable_lien",
  "responsable_telephone",
];

// Longueurs maximales, identiques à celles de schemas.sql
const LONGUEUR_MAX: Partial<Record<ChampDemande, number>> = {
  eleve_nom: 100,
  eleve_prenoms: 150,
  lieu_naissance: 100,
  nationalite: 60,
  adresse_quartier: 100,
  adresse_ville: 100,
  telephone: 20,
  etablissement_precedent: 150,
  derniere_classe: 50,
  responsable_nom: 100,
  responsable_prenoms: 150,
  responsable_telephone: 20,
  responsable_email: 255,
};

// Lit une moyenne saisie ("12,5" ou "12.5"). Renvoie null si elle est invalide.
export function lireMoyenne(valeur: string): number | null {
  const texte = valeur.trim().replace(",", ".");
  if (!/^\d{1,2}(\.\d{1,2})?$/.test(texte)) return null;
  const nombre = Number(texte);
  return nombre >= 0 && nombre <= 20 ? nombre : null;
}

// niveauClasse : niveau de la classe choisie ("seconde", "premiere",
// "terminale"), ou null si la classe n’existe pas.
export function validerDemande(
  donnees: DonneesDemande,
  niveauClasse: string | null,
): ErreursDemande {
  const erreurs: ErreursDemande = {};

  for (const champ of OBLIGATOIRES) {
    if (donnees[champ].trim() === "") {
      erreurs[champ] = "Ce champ est obligatoire.";
    }
  }

  for (const [champ, max] of Object.entries(LONGUEUR_MAX) as [ChampDemande, number][]) {
    if (!erreurs[champ] && donnees[champ].trim().length > max) {
      erreurs[champ] = `Ce champ est trop long (${max} caractères maximum).`;
    }
  }

  if (!erreurs.classe_id && niveauClasse === null) {
    erreurs.classe_id = "Cette classe n’existe pas.";
  }

  if (!erreurs.sexe && !["F", "M"].includes(donnees.sexe)) {
    erreurs.sexe = "Choisissez Féminin ou Masculin.";
  }

  if (!erreurs.responsable_lien && !["pere", "mere", "tuteur"].includes(donnees.responsable_lien)) {
    erreurs.responsable_lien = "Choisissez père, mère ou tuteur.";
  }

  if (!erreurs.date_naissance) {
    const date = new Date(donnees.date_naissance);
    const formatOk = /^\d{4}-\d{2}-\d{2}$/.test(donnees.date_naissance);
    if (!formatOk || Number.isNaN(date.getTime()) || date > new Date()) {
      erreurs.date_naissance = "Indiquez une date de naissance valide.";
    }
  }

  if (!erreurs.moyenne_annuelle && lireMoyenne(donnees.moyenne_annuelle) === null) {
    erreurs.moyenne_annuelle = "Indiquez une moyenne entre 0 et 20 (2 décimales maximum).";
  }

  // La moyenne du BEPC ne concerne que l’entrée en Seconde
  if (niveauClasse === "seconde") {
    if (donnees.moyenne_bepc.trim() === "") {
      erreurs.moyenne_bepc = "Ce champ est obligatoire pour une entrée en Seconde.";
    } else if (lireMoyenne(donnees.moyenne_bepc) === null) {
      erreurs.moyenne_bepc = "Indiquez une moyenne entre 0 et 20 (2 décimales maximum).";
    }
  }

  const formatTelephone = /^[0-9+() .-]{6,20}$/;
  if (!erreurs.telephone && donnees.telephone.trim() !== "" && !formatTelephone.test(donnees.telephone.trim())) {
    erreurs.telephone = "Numéro de téléphone invalide.";
  }
  if (!erreurs.responsable_telephone && !formatTelephone.test(donnees.responsable_telephone.trim())) {
    erreurs.responsable_telephone = "Numéro de téléphone invalide.";
  }

  if (!erreurs.responsable_email && donnees.responsable_email.trim() !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donnees.responsable_email.trim())) {
    erreurs.responsable_email = "Adresse e-mail invalide.";
  }

  return erreurs;
}
