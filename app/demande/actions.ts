"use server";

import {
  CHAMPS_DEMANDE,
  validerDemande,
  type ChampDemande,
  type DonneesDemande,
  type ErreursDemande,
} from "../../lib/validation-demande";
import {
  compteADejaUneDemande,
  creerDemande,
  trouverClasse,
} from "../../lib/demandes";

// État renvoyé au formulaire après chaque envoi
export type EtatDemande = {
  succes: boolean;
  message: string;
  erreurs: ErreursDemande;
  valeurs: Partial<Record<ChampDemande, string>>;
};

// PROVISOIRE : l’identifiant du compte devra venir de la session Auth.js
// (jamais du formulaire). À remplacer quand la pull request « auth » sera
// fusionnée : renvoyer null si personne n’est connecté.
async function obtenirCompteId(): Promise<number | null> {
  return 1;
}

export async function deposerDemande(
  _etatPrecedent: EtatDemande,
  formData: FormData,
): Promise<EtatDemande> {
  // 1. Lire tous les champs sous forme de texte
  const valeurs = {} as DonneesDemande;
  for (const champ of CHAMPS_DEMANDE) {
    const valeur = formData.get(champ);
    valeurs[champ] = typeof valeur === "string" ? valeur : "";
  }

  // 2. Vérifier qui est connecté, dans l’action elle-même
  const compteId = await obtenirCompteId();
  if (compteId === null) {
    return {
      succes: false,
      message: "Vous devez être connecté pour déposer une demande.",
      erreurs: {},
      valeurs,
    };
  }

  // 3. Retrouver la classe choisie
  const classeId = Number(valeurs.classe_id);
  const classe = Number.isInteger(classeId) ? await trouverClasse(classeId) : null;

  // 4. Vérifier les champs, puis la règle « classe fermée »
  const erreurs = validerDemande(valeurs, classe?.niveau ?? null);
  if (classe && !classe.inscriptionsOuvertes) {
    erreurs.classe_id = "Les inscriptions sont fermées pour cette classe.";
  }
  if (!classe || Object.keys(erreurs).length > 0) {
    return {
      succes: false,
      message: "Le formulaire contient des erreurs. Corrigez les champs signalés.",
      erreurs,
      valeurs,
    };
  }

  // 5. Une seule demande par élève
  if (await compteADejaUneDemande(compteId)) {
    return {
      succes: false,
      message: "Vous avez déjà déposé une demande d’inscription.",
      erreurs: {},
      valeurs,
    };
  }

  // 6. Enregistrer la demande (statut « en attente »)
  const resultat = await creerDemande(compteId, classe.id, valeurs);
  if (!resultat.ok) {
    return {
      succes: false,
      message: resultat.erreur,
      erreurs: {},
      valeurs,
    };
  }

  return {
    succes: true,
    message: "Votre demande a bien été envoyée. Elle est en attente d’examen.",
    erreurs: {},
    valeurs: {},
  };
}
