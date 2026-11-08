import "server-only";
import { pool } from "./db";

// Une ligne de la table classe, avec les noms du dictionnaire de données.
export type Classe = {
  id: number;
  slug: string;
  niveau: "seconde" | "premiere" | "terminale";
  serie: "A" | "C" | "D";
  libelle: string;
  matieres_dominantes: string;
  condition_admission: string;
  inscriptions_ouvertes: boolean;
  ordre: number;
};

// Les niveaux, dans l'ordre d'affichage, avec leur texte affiché (dictionnaire §7).
export const NIVEAUX = [
  { valeur: "seconde", libelle: "Seconde" },
  { valeur: "premiere", libelle: "Première" },
  { valeur: "terminale", libelle: "Terminale" },
] as const;

const CHAMPS =
  "id, slug, niveau, serie, libelle, matieres_dominantes, condition_admission, inscriptions_ouvertes, ordre";

export async function listerClasses(): Promise<Classe[]> {
  const { rows } = await pool.query<Classe>(
    `SELECT ${CHAMPS} FROM classe ORDER BY ordre`,
  );
  return rows;
}

export async function trouverClasse(slug: string): Promise<Classe | null> {
  const { rows } = await pool.query<Classe>(
    `SELECT ${CHAMPS} FROM classe WHERE slug = $1`,
    [slug],
  );
  return rows[0] ?? null;
}
