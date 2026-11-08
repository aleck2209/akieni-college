import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { PastilleStatut } from "../PastilleStatut";
import { BoutonsDecision } from "./BoutonsDecision";
import { trouverDemande } from "@/lib/demandes";
import { formaterDate, formaterDateTexte, formaterMoyenne } from "@/lib/format";
import { obtenirRole } from "@/lib/session";

export const metadata: Metadata = {
  title: "Demande d’inscription — Espace école",
};

const SEXES: Record<string, string> = { F: "Féminin", M: "Masculin" };
const LIENS: Record<string, string> = { pere: "Père", mere: "Mère", tuteur: "Tuteur" };

function Info({ libelle, valeur }: { libelle: string; valeur: string }) {
  return (
    <div>
      <dt className="text-sm text-texte-secondaire">{libelle}</dt>
      <dd className="mt-1 font-semibold">{valeur || "Non renseigné"}</dd>
    </div>
  );
}

function Partie({ titre, children }: { titre: string; children: ReactNode }) {
  return (
    <section className="mt-6 rounded-3xl border border-bordure bg-white p-6 sm:p-8">
      <h2 className="text-xl font-semibold text-marine">{titre}</h2>
      <dl className="mt-5 grid gap-5 sm:grid-cols-2">{children}</dl>
    </section>
  );
}

// SSR : la page lit la session et la base à chaque visite,
// pour que la décision s’affiche toujours à jour.
export default async function PageDetailDemande({ params }: PageProps<"/ecole/[id]">) {
  // Revérification côté serveur (issue #12) : proxy.ts ne suffit pas.
  const role = await obtenirRole();
  if (role === "eleve") redirect("/espace-eleve");
  if (role !== "ecole") redirect("/connexion?callbackUrl=%2Fecole");

  const { id } = await params;
  const numero = Number(id);
  const demande = Number.isInteger(numero) ? await trouverDemande(numero) : null;
  if (!demande) notFound();

  const d = demande.donnees;
  const nomEleve = `${d.eleve_nom} ${d.eleve_prenoms}`;

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <Link href="/ecole" className="inline-flex min-h-11 items-center text-marine underline">
        ← Retour à la liste des demandes
      </Link>

      <section className="mt-4 flex flex-col gap-4 rounded-3xl border border-bordure bg-white p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-marine">{nomEleve}</h1>
          <p className="mt-2 text-texte-secondaire">
            Demande pour la classe <strong className="text-texte">{demande.classe.libelle}</strong>,
            reçue le {formaterDate(demande.envoyeeLe)}
          </p>
        </div>
        <PastilleStatut statut={demande.statut} />
      </section>

      <Partie titre="L’élève">
        <Info libelle="Nom" valeur={d.eleve_nom} />
        <Info libelle="Prénom(s)" valeur={d.eleve_prenoms} />
        <Info libelle="Sexe" valeur={SEXES[d.sexe] ?? d.sexe} />
        <Info libelle="Date de naissance" valeur={formaterDateTexte(d.date_naissance)} />
        <Info libelle="Lieu de naissance" valeur={d.lieu_naissance} />
        <Info libelle="Nationalité" valeur={d.nationalite} />
        <Info libelle="Quartier" valeur={d.adresse_quartier} />
        <Info libelle="Ville" valeur={d.adresse_ville} />
        <Info libelle="Téléphone" valeur={d.telephone} />
      </Partie>

      <Partie titre="Scolarité précédente">
        <Info libelle="Établissement fréquenté l’année dernière" valeur={d.etablissement_precedent} />
        <Info libelle="Dernière classe suivie" valeur={d.derniere_classe} />
        <Info libelle="Moyenne générale annuelle (sur 20)" valeur={formaterMoyenne(d.moyenne_annuelle)} />
        {demande.classe.niveau === "seconde" ? (
          <Info libelle="Moyenne obtenue au BEPC (sur 20)" valeur={formaterMoyenne(d.moyenne_bepc)} />
        ) : null}
      </Partie>

      <Partie titre="Responsable légal">
        <Info libelle="Nom" valeur={d.responsable_nom} />
        <Info libelle="Prénom(s)" valeur={d.responsable_prenoms} />
        <Info libelle="Lien avec l’élève" valeur={LIENS[d.responsable_lien] ?? d.responsable_lien} />
        <Info libelle="Téléphone" valeur={d.responsable_telephone} />
        <Info libelle="Adresse e-mail" valeur={d.responsable_email} />
      </Partie>

      <section className="mt-6 rounded-3xl border border-bordure bg-white p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-marine">Décision</h2>
        <div className="mt-5">
          {demande.statut === "en_attente" ? (
            <BoutonsDecision id={demande.id} nomEleve={nomEleve} />
          ) : (
            <p>
              Cette demande a été {demande.statut === "validee" ? "validée" : "refusée"}
              {demande.traiteeLe ? ` le ${formaterDate(demande.traiteeLe)}` : ""}. Elle ne peut
              plus être modifiée.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
