import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SuiviDemande } from "./SuiviDemande";
import { trouverDemandeDuCompte } from "@/lib/demandes";
import { obtenirCompteId, obtenirRole } from "@/lib/session";

export const metadata: Metadata = {
  title: "Mon espace — Akieni College",
};

// SSR : la page lit la session et la base à chaque visite,
// pour que le suivi de la demande soit toujours à jour.
export default async function PageEspaceEleve() {
  // Revérification côté serveur (issue #12) : proxy.ts ne suffit pas.
  if ((await obtenirRole()) === "ecole") redirect("/ecole");
  const compteId = await obtenirCompteId();
  if (compteId === null) redirect("/connexion?callbackUrl=%2Fespace-eleve");

  // L'élève ne voit que sa propre demande : le filtre vient de la session.
  const demande = await trouverDemandeDuCompte(compteId);

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold text-marine">Mon espace</h1>
      <p className="mt-2 text-texte-secondaire">
        Suivez l’état de votre demande d’inscription à Akieni College.
      </p>
      <SuiviDemande demande={demande} />
    </main>
  );
}
