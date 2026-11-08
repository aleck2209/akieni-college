"use server";

import { revalidatePath } from "next/cache";
import { traiterDemande } from "@/lib/demandes";
import { obtenirRole } from "@/lib/session";

// Valide ou refuse une demande en attente (F8).
export async function decider(
  id: number,
  decision: "validee" | "refusee",
): Promise<void> {
  // Vérifié dans l’action elle-même, à partir de la session : seul le compte école peut décider.
  if ((await obtenirRole()) !== "ecole") {
    throw new Error("Non autorisé");
  }

  // Les arguments viennent du navigateur : on les revérifie côté serveur.
  if (!Number.isInteger(id) || (decision !== "validee" && decision !== "refusee")) {
    throw new Error("Requête invalide");
  }

  // traiterDemande refuse si la demande a déjà été traitée : dans ce cas,
  // rien ne change et la page affiche simplement la décision déjà prise.
  await traiterDemande(id, decision);

  revalidatePath("/ecole");
  revalidatePath(`/ecole/${id}`);
}
