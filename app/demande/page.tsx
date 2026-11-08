import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { DemandeForm } from "./DemandeForm";
import { listerClasses } from "@/lib/classes";
import { compteADejaUneDemande, lireIdentite } from "@/lib/demandes";
import { obtenirCompteId, obtenirRole } from "@/lib/session";

export const metadata: Metadata = {
  title: "Demande d’inscription — Akieni College",
};

// SSR : la page lit la session et la base à chaque visite.
export default async function PageDemande({
  searchParams,
}: {
  searchParams: Promise<{ classe?: string }>;
}) {
  const { classe } = await searchParams;

  // Revérification côté serveur (issue #12) : proxy.ts ne suffit pas.
  if ((await obtenirRole()) === "ecole") redirect("/ecole");
  const compteId = await obtenirCompteId();
  if (compteId === null) {
    const retour = classe ? `/demande?classe=${classe}` : "/demande";
    redirect(`/connexion?callbackUrl=${encodeURIComponent(retour)}`);
  }

  const [classes, identite, dejaDeposee] = await Promise.all([
    listerClasses(),
    lireIdentite(compteId),
    compteADejaUneDemande(compteId),
  ]);

  // Préremplissage : /demande?classe=premiere-c (lien depuis la fiche d'une classe)
  const classeInitiale = classes.find(
    (c) => c.slug === classe && c.inscriptions_ouvertes,
  );

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <section className="rounded-3xl border border-bordure bg-white p-6 sm:p-8">
        <h1 className="text-3xl font-semibold text-marine">Demande d’inscription</h1>
        <p className="mt-3 text-texte-secondaire">
          Remplissez les quatre parties ci-dessous. Les champs marqués d’une étoile sont
          obligatoires.
        </p>
        <p className="mt-5 rounded-2xl bg-fond p-4 text-sm">
          <strong className="text-marine">Aucun document à envoyer en ligne :</strong> les
          pièces sont apportées au secrétariat du lycée après la validation de votre demande.
        </p>
      </section>

      {dejaDeposee ? (
        <section className="mt-6 rounded-3xl border border-bordure bg-white p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-marine">
            Vous avez déjà déposé votre demande
          </h2>
          <p className="mt-2 text-texte-secondaire">
            Un élève ne dépose qu’une seule demande d’inscription. Suivez-la dans votre espace.
          </p>
          <Link href="/espace-eleve" className="bouton mt-6 rounded-full">
            Suivre ma demande
          </Link>
        </section>
      ) : (
        <DemandeForm
          classes={classes}
          classeInitialeId={classeInitiale?.id}
          identite={identite}
        />
      )}
    </main>
  );
}
