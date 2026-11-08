import type { Metadata } from "next";
import { SuiviDemande } from "./SuiviDemande";
import { trouverDemandeDuCompte } from "../../lib/demandes";

export const metadata: Metadata = {
  title: "Mon espace — Akieni College",
};

// PROVISOIRE : l’identifiant du compte devra venir de la session Auth.js.
// À remplacer quand la pull request « auth » sera fusionnée : renvoyer null
// si personne n’est connecté.
async function obtenirCompteId(): Promise<number | null> {
  return 1;
}

// Page rendue côté serveur à chaque visite (SSR) : le suivi de la demande
// doit toujours être à jour.
export default async function PageEspaceEleve() {
  const compteId = await obtenirCompteId();

  if (compteId === null) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-10">
        <p className="text-slate-700">
          Vous devez être connecté pour voir votre espace.
        </p>
      </main>
    );
  }

  const demande = await trouverDemandeDuCompte(compteId);

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900">Mon espace</h1>
      <p className="mt-2 mb-8 text-slate-600">
        Suivez l’état de votre demande d’inscription à Akieni College.
      </p>
      <SuiviDemande demande={demande} />
    </main>
  );
}
