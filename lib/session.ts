import "server-only";
import { auth } from "@/auth";

// À appeler dans chaque page et chaque action protégée (issue #12) :
// proxy.ts ne suffit pas, on revérifie la session côté serveur.
// Remplace lib/session-provisoire.ts des branches Features : mêmes noms de fonctions.

// Rôle du compte connecté, ou null si personne n'est connecté.
export async function obtenirRole(): Promise<"eleve" | "ecole" | null> {
  const session = await auth();
  return session?.user?.role ?? null;
}

// Identifiant (compte.id) de l'élève connecté, ou null si ce n'est pas un élève connecté.
export async function obtenirCompteId(): Promise<number | null> {
  const session = await auth();
  if (session?.user?.role !== "eleve") return null;
  return Number(session.user.id);
}
