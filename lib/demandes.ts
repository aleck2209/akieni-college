// Accès aux données de la demande d'inscription (F6).
// Les classes viennent de lib/classes.ts, la connexion de lib/db.ts.

import "server-only";
import { pool } from "./db";
import { lireMoyenne, type DonneesDemande } from "./validation-demande";

// Nom et prénom du compte, pour préremplir la partie « L'élève ».
export async function lireIdentite(
  compteId: number,
): Promise<{ nom: string; prenom: string } | null> {
  const { rows } = await pool.query<{ nom: string; prenom: string }>(
    "SELECT nom, prenom FROM compte WHERE id = $1",
    [compteId],
  );
  return rows[0] ?? null;
}

// La table demande impose une seule demande par compte (compte_id UNIQUE).
export async function compteADejaUneDemande(compteId: number): Promise<boolean> {
  const { rowCount } = await pool.query(
    "SELECT 1 FROM demande WHERE compte_id = $1",
    [compteId],
  );
  return (rowCount ?? 0) > 0;
}

export type ResultatCreation = { ok: true } | { ok: false; erreur: string };

// Un champ facultatif vide est enregistré à NULL.
const texteOuNull = (valeur: string) => (valeur.trim() === "" ? null : valeur.trim());

// Enregistre la demande. La base remplit le statut « en_attente » et la date d'envoi.
export async function creerDemande(
  compteId: number,
  classeId: number,
  donnees: DonneesDemande,
): Promise<ResultatCreation> {
  try {
    await pool.query(
      `INSERT INTO demande (
         compte_id, classe_id,
         eleve_nom, eleve_prenoms, sexe, date_naissance, lieu_naissance, nationalite,
         adresse_quartier, adresse_ville, telephone,
         etablissement_precedent, derniere_classe, moyenne_annuelle, moyenne_bepc,
         responsable_nom, responsable_prenoms, responsable_lien, responsable_telephone, responsable_email
       ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)`,
      [
        compteId,
        classeId,
        donnees.eleve_nom.trim(),
        donnees.eleve_prenoms.trim(),
        donnees.sexe,
        donnees.date_naissance,
        donnees.lieu_naissance.trim(),
        donnees.nationalite.trim(),
        donnees.adresse_quartier.trim(),
        donnees.adresse_ville.trim(),
        texteOuNull(donnees.telephone),
        donnees.etablissement_precedent.trim(),
        donnees.derniere_classe.trim(),
        lireMoyenne(donnees.moyenne_annuelle),
        donnees.moyenne_bepc.trim() === "" ? null : lireMoyenne(donnees.moyenne_bepc),
        donnees.responsable_nom.trim(),
        donnees.responsable_prenoms.trim(),
        donnees.responsable_lien,
        donnees.responsable_telephone.trim(),
        texteOuNull(donnees.responsable_email),
      ],
    );
    return { ok: true };
  } catch (e) {
    // Deux envois presque simultanés : la base refuse la deuxième demande.
    if ((e as { code?: string }).code === "23505") {
      return { ok: false, erreur: "Vous avez déjà déposé une demande d’inscription." };
    }
    console.error("Dépôt de la demande :", e);
    return { ok: false, erreur: "Une erreur est survenue. Réessayez dans un instant." };
  }
}
