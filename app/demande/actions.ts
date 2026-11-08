"use server";

import {
  CHAMPS_DEMANDE,
  validerDemande,
  type ChampDemande,
  type DonneesDemande,
  type ErreursDemande,
} from "@/lib/validation-demande";
import { compteADejaUneDemande, creerDemande } from "@/lib/demandes";
import { listerClasses } from "@/lib/classes";
import { obtenirCompteId } from "@/lib/session";

// État renvoyé au formulaire après chaque envoi
export type EtatDemande = {
  succes: boolean;
  message: string;
  erreurs: ErreursDemande;
  valeurs: Partial<Record<ChampDemande, string>>;
};

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

  // 2. Vérifier qui est connecté, dans l'action elle-même (issue #12)
  const compteId = await obtenirCompteId();
  if (compteId === null) {
    return {
      succes: false,
      message: "Vous devez être connecté avec un compte élève pour déposer une demande.",
      erreurs: {},
      valeurs,
    };
  }

  // 3. Retrouver la classe choisie, dans la base
  const classeId = Number(valeurs.classe_id);
  const classes = await listerClasses();
  const classe = classes.find((c) => c.id === classeId) ?? null;

  // La moyenne du BEPC ne concerne que l'entrée en Seconde
  if (classe?.niveau !== "seconde") valeurs.moyenne_bepc = "";

  // 4. Vérifier les champs, puis la règle « classe fermée »
  const erreurs = validerDemande(valeurs, classe?.niveau ?? null);
  if (classe && !classe.inscriptions_ouvertes) {
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
    return { succes: false, message: resultat.erreur, erreurs: {}, valeurs };
  }

  return {
    succes: true,
    message: "Votre demande a bien été envoyée. Elle est en attente d’examen par l’école.",
    erreurs: {},
    valeurs: {},
  };
}
