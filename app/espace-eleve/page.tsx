import type { Metadata } from "next";
import { SuiviDemande } from "./SuiviDemande";
import {
  demandeDeTest,
  trouverDemandeDuCompte,
  type StatutDemande,
} from "../../lib/demandes";

export const metadata: Metadata = {
  title: "Mon espace — Akieni College",
};

// PROVISOIRE : l’identifiant du compte devra venir de la session Auth.js.
// À remplacer quand la pull request « auth » sera fusionnée : renvoyer null
// si personne n’est connecté.
async function obtenirCompteId(): Promise<number | null> {
  return 1;
}

const STATUTS_TEST: StatutDemande[] = ["en_attente", "validee", "refusee"];

// Page rendue côté serveur à chaque visite (SSR) : le suivi de la demande
// doit toujours être à jour.
export default async function PageEspaceEleve({
  searchParams,
}: {
  searchParams: Promise<{ etat?: string }>;
}) {
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

  // Aide au développement : /espace-eleve?etat=validee simule une demande.
  // Ignorée en production.
  const { etat } = await searchParams;
  const statutTest = STATUTS_TEST.find((statut) => statut === etat);
  const demande =
    process.env.NODE_ENV !== "production" && statutTest
      ? demandeDeTest(statutTest)
      : await trouverDemandeDuCompte(compteId);

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
