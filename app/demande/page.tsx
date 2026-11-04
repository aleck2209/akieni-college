import type { Metadata } from "next";
import { DemandeForm } from "./DemandeForm";
import { listerClasses } from "../../lib/demandes";

export const metadata: Metadata = {
  title: "Demande d’inscription — Akieni College",
};

// Page rendue côté serveur à chaque visite : elle lira bientôt la session
// de l’élève connecté (Auth.js) et ses données dans la base.
export default async function PageDemande({
  searchParams,
}: {
  searchParams: Promise<{ classe?: string }>;
}) {
  const { classe } = await searchParams;
  const classes = await listerClasses();

  // Préremplissage : /demande?classe=premiere-c (lien depuis la fiche d’une classe)
  const classeInitiale = classes.find(
    (c) => c.slug === classe && c.inscriptionsOuvertes,
  );

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900">
        Demande d’inscription
      </h1>
      <p className="mt-2 mb-8 text-slate-600">
        Remplissez les quatre parties ci-dessous. Les champs marqués d’une
        étoile sont obligatoires. Aucun document n’est à envoyer en ligne : les
        pièces sont apportées au lycée après la validation.
      </p>
      <DemandeForm classes={classes} classeInitialeId={classeInitiale?.id} />
    </main>
  );
}
