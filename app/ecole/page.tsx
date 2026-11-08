import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PastilleStatut } from "./PastilleStatut";
import { listerDemandes, type DemandeEcole, type StatutDemande } from "@/lib/demandes";
import { formaterDate, formaterMoyenne } from "@/lib/format";
import { obtenirRole } from "@/lib/session";

export const metadata: Metadata = {
  title: "Espace école — Akieni College",
};

function nomEleve(demande: DemandeEcole): string {
  return `${demande.donnees.eleve_nom} ${demande.donnees.eleve_prenoms}`;
}

function LienOuvrir({ demande }: { demande: DemandeEcole }) {
  return (
    <Link href={`/ecole/${demande.id}`} className="bouton bouton-secondaire rounded-full">
      Ouvrir
      <span className="sr-only"> la demande de {nomEleve(demande)}</span>
    </Link>
  );
}

// SSR : la page lit la session et la base à chaque visite,
// pour que la liste montre toujours les demandes à jour.
export default async function PageEspaceEcole() {
  // Revérification côté serveur (issue #12) : proxy.ts ne suffit pas.
  const role = await obtenirRole();
  if (role === "eleve") redirect("/espace-eleve");
  if (role !== "ecole") redirect("/connexion?callbackUrl=%2Fecole");

  const demandes = await listerDemandes();
  const compter = (statut: StatutDemande) => demandes.filter((d) => d.statut === statut).length;
  const compteurs = [
    { libelle: "Demandes reçues", valeur: demandes.length, couleur: "text-marine" },
    { libelle: "En attente", valeur: compter("en_attente"), couleur: "text-attente" },
    { libelle: "Validées", valeur: compter("validee"), couleur: "text-validee" },
    { libelle: "Refusées", valeur: compter("refusee"), couleur: "text-refusee" },
  ];

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
      <section className="rounded-3xl border border-bordure bg-white p-6 sm:p-8">
        <h1 className="text-3xl font-semibold text-marine">Espace école</h1>
        <p className="mt-2 text-texte-secondaire">
          Demandes d’inscription reçues, les plus récentes en premier.
        </p>
      </section>

      <ul className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {compteurs.map((compteur) => (
          <li key={compteur.libelle} className="rounded-3xl border border-bordure bg-white p-5">
            <p className="text-sm font-semibold text-texte-secondaire">{compteur.libelle}</p>
            <p className={`mt-2 text-3xl font-semibold ${compteur.couleur}`}>{compteur.valeur}</p>
          </li>
        ))}
      </ul>

      {demandes.length === 0 ? (
        <p className="mt-6 rounded-3xl border border-bordure bg-white p-6 text-texte-secondaire">
          Aucune demande reçue pour le moment.
        </p>
      ) : (
        <>
          {/* Ordinateur : un tableau */}
          <div className="mt-6 hidden overflow-hidden rounded-3xl border border-bordure bg-white md:block">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">
                Demandes d’inscription, les plus récentes en premier
              </caption>
              <thead className="bg-fond text-texte-secondaire">
                <tr>
                  <th scope="col" className="px-5 py-3 font-semibold">Date d’envoi</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Élève</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Classe demandée</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Moyenne</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Statut</th>
                  <th scope="col" className="px-5 py-3 font-semibold">
                    <span className="sr-only">Détail</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-bordure">
                {demandes.map((demande) => (
                  <tr key={demande.id}>
                    <td className="px-5 py-4 text-texte-secondaire">{formaterDate(demande.envoyeeLe)}</td>
                    <th scope="row" className="px-5 py-4 font-semibold text-texte">
                      {nomEleve(demande)}
                      <span className="block font-normal text-texte-secondaire">
                        {demande.donnees.etablissement_precedent}
                      </span>
                    </th>
                    <td className="px-5 py-4">{demande.classe.libelle}</td>
                    <td className="px-5 py-4">
                      {formaterMoyenne(demande.donnees.moyenne_annuelle)}/20
                      {demande.donnees.moyenne_bepc ? (
                        <span className="block text-texte-secondaire">
                          BEPC : {formaterMoyenne(demande.donnees.moyenne_bepc)}/20
                        </span>
                      ) : null}
                    </td>
                    <td className="px-5 py-4">
                      <PastilleStatut statut={demande.statut} />
                    </td>
                    <td className="px-5 py-4 text-right">
                      <LienOuvrir demande={demande} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Téléphone : le tableau devient une liste de cartes */}
          <ul className="mt-6 grid gap-4 md:hidden">
            {demandes.map((demande) => (
              <li key={demande.id} className="rounded-3xl border border-bordure bg-white p-5">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-semibold">{nomEleve(demande)}</p>
                  <PastilleStatut statut={demande.statut} />
                </div>
                <p className="mt-1 text-sm text-texte-secondaire">
                  {demande.classe.libelle} · envoyée le {formaterDate(demande.envoyeeLe)}
                </p>
                <div className="mt-4">
                  <LienOuvrir demande={demande} />
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
