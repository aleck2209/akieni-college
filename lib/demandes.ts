// Accès aux données de la demande d'inscription (F6, F7 et F8).
// Les classes viennent de lib/classes.ts, la connexion de lib/db.ts.

import "server-only";
import { pool } from "./db";
import type { Classe } from "./classes";
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

export type StatutDemande = "en_attente" | "validee" | "refusee";

export type DemandeEleve = {
  classe: Classe;
  envoyeeLe: Date;
  statut: StatutDemande;
};

// Renvoie la demande du compte avec sa classe, ou null s’il n’en a pas déposé.
export async function trouverDemandeDuCompte(
  compteId: number,
): Promise<DemandeEleve | null> {
  const { rows } = await pool.query<Classe & { envoyee_le: Date; statut: StatutDemande }>(
    `SELECT d.envoyee_le, d.statut,
            c.id, c.slug, c.niveau, c.serie, c.libelle, c.matieres_dominantes,
            c.condition_admission, c.inscriptions_ouvertes, c.ordre
       FROM demande d
       JOIN classe c ON c.id = d.classe_id
      WHERE d.compte_id = $1`,
    [compteId],
  );
  const ligne = rows[0];
  if (!ligne) return null;
  const { envoyee_le, statut, ...classe } = ligne;
  return { classe, envoyeeLe: envoyee_le, statut };
}

// ---------------------------------------------------------------
// F8 : traitement des demandes par l’école
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

type LigneDemande = Classe &
  Omit<DonneesDemande, "classe_id"> & {
    demande_id: number;
    envoyee_le: Date;
    statut: StatutDemande;
    traitee_le: Date | null;
  };

// Les nombres et la date de naissance sont lus en texte ; un champ facultatif vide vaut "".
const SELECT_DEMANDES = `
  SELECT d.id AS demande_id, d.envoyee_le, d.statut, d.traitee_le,
         d.eleve_nom, d.eleve_prenoms, d.sexe, d.date_naissance::text AS date_naissance,
         d.lieu_naissance, d.nationalite, d.adresse_quartier, d.adresse_ville,
         COALESCE(d.telephone, '') AS telephone,
         d.etablissement_precedent, d.derniere_classe,
         d.moyenne_annuelle::text AS moyenne_annuelle,
         COALESCE(d.moyenne_bepc::text, '') AS moyenne_bepc,
         d.responsable_nom, d.responsable_prenoms, d.responsable_lien, d.responsable_telephone,
         COALESCE(d.responsable_email, '') AS responsable_email,
         c.id, c.slug, c.niveau, c.serie, c.libelle, c.matieres_dominantes,
         c.condition_admission, c.inscriptions_ouvertes, c.ordre
    FROM demande d
    JOIN classe c ON c.id = d.classe_id`;

function versDemandeEcole(ligne: LigneDemande): DemandeEcole {
  const {
    demande_id, envoyee_le, statut, traitee_le,
    id, slug, niveau, serie, libelle, matieres_dominantes, condition_admission, inscriptions_ouvertes, ordre,
    ...donnees
  } = ligne;
  return {
    id: demande_id,
    classe: { id, slug, niveau, serie, libelle, matieres_dominantes, condition_admission, inscriptions_ouvertes, ordre },
    envoyeeLe: envoyee_le,
    statut,
    traiteeLe: traitee_le,
    donnees,
  };
}

// Toutes les demandes, les plus récentes en premier
export async function listerDemandes(): Promise<DemandeEcole[]> {
  const { rows } = await pool.query<LigneDemande>(
    `${SELECT_DEMANDES} ORDER BY d.envoyee_le DESC`,
  );
  return rows.map(versDemandeEcole);
}

// Une demande avec toutes les informations saisies par l’élève
export async function trouverDemande(id: number): Promise<DemandeEcole | null> {
  const { rows } = await pool.query<LigneDemande>(`${SELECT_DEMANDES} WHERE d.id = $1`, [id]);
  return rows[0] ? versDemandeEcole(rows[0]) : null;
}

export type ResultatTraitement = { ok: true } | { ok: false; erreur: string };

// Valide ou refuse une demande en attente. Une demande déjà traitée ne change plus :
// la condition « statut = 'en_attente' » est vérifiée par la base, dans la même requête.
export async function traiterDemande(
  id: number,
  decision: "validee" | "refusee",
): Promise<ResultatTraitement> {
  const { rowCount } = await pool.query(
    `UPDATE demande SET statut = $2, traitee_le = now()
      WHERE id = $1 AND statut = 'en_attente'`,
    [id, decision],
  );
  if (rowCount === 1) return { ok: true };

  const existe = await pool.query("SELECT 1 FROM demande WHERE id = $1", [id]);
  return existe.rowCount
    ? { ok: false, erreur: "Cette demande a déjà été traitée." }
    : { ok: false, erreur: "Cette demande n’existe pas." };
}
