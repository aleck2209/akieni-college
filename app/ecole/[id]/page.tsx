import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { PastilleStatut } from "../PastilleStatut";
import { decider } from "./actions";
import { trouverDemande } from "../../../lib/demandes";
import { obtenirRole } from "../../../lib/session-provisoire";

export const metadata: Metadata = {
  title: "Demande d’inscription — Espace école",
};

function formaterDate(date: Date): string {
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const SEXES: Record<string, string> = { F: "Féminin", M: "Masculin" };
const LIENS: Record<string, string> = { pere: "Père", mere: "Mère", tuteur: "Tuteur" };

function Info({ libelle, valeur }: { libelle: string; valeur: string }) {
  return (
    <div>
      <dt className="text-sm text-slate-500">{libelle}</dt>
      <dd className="font-medium text-slate-900">{valeur || "Non renseigné"}</dd>
    </div>
  );
}

function Bloc({ titre, children }: { titre: string; children: ReactNode }) {
  return (
    <section className="rounded-md border border-slate-200 bg-white p-5">
      <h2 className="mb-4 text-lg font-semibold text-slate-900">{titre}</h2>
      <dl className="grid gap-4 sm:grid-cols-2">{children}</dl>
    </section>
  );
}

// Page rendue côté serveur à chaque visite (SSR) : la décision doit
// toujours s’afficher à jour.
export default async function PageDetailDemande({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await connection();

  if ((await obtenirRole()) !== "ecole") {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-slate-700">Cet espace est réservé à l’école.</p>
      </main>
    );
  }

  const { id } = await params;
  const numero = Number(id);
  const demande = Number.isInteger(numero) ? await trouverDemande(numero) : null;
  if (!demande) {
    notFound();
  }

  const d = demande.donnees;
  const nomEleve = `${d.eleve_nom} ${d.eleve_prenoms}`;
  const enAttente = demande.statut === "en_attente";

  return (
    <main className="mx-auto max-w-3xl space-y-6 px-4 py-10">
      <Link href="/ecole" className="text-sm text-blue-800 underline">
        ← Retour à la liste des demandes
      </Link>

      <header>
        <h1 className="text-2xl font-bold text-slate-900">{nomEleve}</h1>
        <p className="mt-2 flex flex-wrap items-center gap-3 text-slate-600">
          <span>
            Demande reçue le {formaterDate(demande.envoyeeLe)} pour la classe{" "}
            {demande.classe.libelle}
          </span>
          <PastilleStatut statut={demande.statut} />
        </p>
      </header>

      <Bloc titre="L’élève">
        <Info libelle="Nom" valeur={d.eleve_nom} />
        <Info libelle="Prénom(s)" valeur={d.eleve_prenoms} />
        <Info libelle="Sexe" valeur={SEXES[d.sexe] ?? d.sexe} />
        <Info libelle="Date de naissance" valeur={formaterDate(new Date(d.date_naissance))} />
        <Info libelle="Lieu de naissance" valeur={d.lieu_naissance} />
        <Info libelle="Nationalité" valeur={d.nationalite} />
        <Info libelle="Quartier" valeur={d.adresse_quartier} />
        <Info libelle="Ville" valeur={d.adresse_ville} />
        <Info libelle="Téléphone" valeur={d.telephone} />
      </Bloc>

      <Bloc titre="Scolarité précédente">
        <Info libelle="Établissement fréquenté l’année dernière" valeur={d.etablissement_precedent} />
        <Info libelle="Dernière classe suivie" valeur={d.derniere_classe} />
        <Info libelle="Moyenne générale annuelle (sur 20)" valeur={d.moyenne_annuelle} />
        {demande.classe.niveau === "seconde" ? (
          <Info libelle="Moyenne obtenue au BEPC (sur 20)" valeur={d.moyenne_bepc} />
        ) : null}
      </Bloc>

      <Bloc titre="Responsable légal">
        <Info libelle="Nom" valeur={d.responsable_nom} />
        <Info libelle="Prénom(s)" valeur={d.responsable_prenoms} />
        <Info libelle="Lien avec l’élève" valeur={LIENS[d.responsable_lien] ?? d.responsable_lien} />
        <Info libelle="Téléphone" valeur={d.responsable_telephone} />
        <Info libelle="Adresse e-mail" valeur={d.responsable_email} />
      </Bloc>

      <section className="rounded-md border border-slate-200 bg-white p-5">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Décision</h2>
        {enAttente ? (
          <div className="flex flex-wrap gap-3">
            <form action={decider.bind(null, demande.id, "validee")}>
              <button
                type="submit"
                className="rounded-md bg-green-700 px-5 py-2.5 font-medium text-white hover:bg-green-800"
              >
                Valider
              </button>
            </form>
            <form action={decider.bind(null, demande.id, "refusee")}>
              <button
                type="submit"
                className="rounded-md bg-red-700 px-5 py-2.5 font-medium text-white hover:bg-red-800"
              >
                Refuser
              </button>
            </form>
          </div>
        ) : (
          <p className="text-slate-700">
            Cette demande a été {demande.statut === "validee" ? "validée" : "refusée"}
            {demande.traiteeLe ? ` le ${formaterDate(demande.traiteeLe)}` : ""}. Elle ne
            peut plus être modifiée.
          </p>
        )}
      </section>
    </main>
  );
}
