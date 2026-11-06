import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { PastilleStatut } from "./PastilleStatut";
import { listerDemandes } from "../../lib/demandes";

export const metadata: Metadata = {
  title: "Espace école — Akieni College",
};

// PROVISOIRE : le rôle devra venir de la session Auth.js (jamais d’un champ
// de formulaire ni d’une adresse). À remplacer quand la PR « auth » sera fusionnée :
// renvoyer null si personne n’est connecté.
async function obtenirRole(): Promise<"eleve" | "ecole" | null> {
  return "ecole";
}

function formaterDate(date: Date): string {
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Page rendue côté serveur à chaque visite (SSR) : la liste doit toujours
// montrer les demandes à jour.
export default async function PageEspaceEcole() {
  await connection();

  const role = await obtenirRole();
  if (role !== "ecole") {
    return (
      <main className="mx-auto max-w-4xl px-4 py-10">
        <p className="text-slate-700">Cet espace est réservé à l’école.</p>
      </main>
    );
  }

  const demandes = await listerDemandes();
  const enAttente = demandes.filter((d) => d.statut === "en_attente").length;

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900">Espace école</h1>
      <p className="mt-2 mb-8 text-slate-600">
        {demandes.length === 0
          ? "Aucune demande reçue pour le moment."
          : `${demandes.length} demande(s) reçue(s), dont ${enAttente} en attente de traitement.`}
      </p>

      {demandes.length > 0 ? (
        <div className="overflow-x-auto rounded-md border border-slate-200 bg-white">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">
              Demandes d’inscription, les plus récentes en premier
            </caption>
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th scope="col" className="px-4 py-3 font-medium">Élève</th>
                <th scope="col" className="px-4 py-3 font-medium">Classe demandée</th>
                <th scope="col" className="px-4 py-3 font-medium">Date d’envoi</th>
                <th scope="col" className="px-4 py-3 font-medium">Statut</th>
                <th scope="col" className="px-4 py-3 font-medium">Détail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {demandes.map((demande) => {
                const nomEleve = `${demande.donnees.eleve_nom} ${demande.donnees.eleve_prenoms}`;
                return (
                  <tr key={demande.id}>
                    <th scope="row" className="px-4 py-3 font-medium text-slate-900">
                      {nomEleve}
                    </th>
                    <td className="px-4 py-3 text-slate-700">{demande.classe.libelle}</td>
                    <td className="px-4 py-3 text-slate-700">{formaterDate(demande.envoyeeLe)}</td>
                    <td className="px-4 py-3">
                      <PastilleStatut statut={demande.statut} />
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/ecole/${demande.id}`}
                        className="font-medium text-blue-800 underline hover:text-blue-900"
                      >
                        Ouvrir
                        <span className="sr-only"> la demande de {nomEleve}</span>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : null}
    </main>
  );
}
