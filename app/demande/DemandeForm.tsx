"use client";

import Link from "next/link";
import { startTransition, useActionState, useState, type FormEvent, type ReactNode } from "react";
import { deposerDemande, type EtatDemande } from "./actions";
import type { Classe } from "@/lib/classes";
import type { ChampDemande } from "@/lib/validation-demande";

const etatInitial: EtatDemande = {
  succes: false,
  message: "",
  erreurs: {},
  valeurs: {},
};

const styleChamp = "champ rounded-xl aria-[invalid=true]:border-refusee";

type Option = { valeur: string; libelle: string; desactive?: boolean };

type ChampProps = {
  nom: ChampDemande;
  libelle: string;
  erreur?: string;
  valeur?: string;
  obligatoire?: boolean;
  type?: string;
  inputMode?: "text" | "decimal" | "tel" | "email";
  autoComplete?: string;
  options?: Option[];
  large?: boolean;
  // Pour un champ contrôlé (la classe choisie)
  valeurControlee?: string;
  onChange?: (valeur: string) => void;
};

function Obligatoire({ obligatoire }: { obligatoire: boolean }) {
  return obligatoire ? (
    <span className="text-refusee"> *</span>
  ) : (
    <span className="font-normal text-texte-secondaire"> (facultatif)</span>
  );
}

function Erreur({ nom, erreur }: { nom: string; erreur?: string }) {
  return erreur ? (
    <p id={`${nom}-erreur`} className="mt-1 text-sm text-refusee">
      {erreur}
    </p>
  ) : null;
}

function Champ({
  nom,
  libelle,
  erreur,
  valeur = "",
  obligatoire = true,
  type = "text",
  inputMode,
  autoComplete,
  options,
  large = false,
  valeurControlee,
  onChange,
}: ChampProps) {
  const commun = {
    id: nom,
    name: nom,
    className: styleChamp,
    "aria-invalid": erreur ? true : undefined,
    "aria-describedby": erreur ? `${nom}-erreur` : undefined,
  };

  const controle = options ? (
    <select
      {...commun}
      {...(valeurControlee !== undefined
        ? { value: valeurControlee, onChange: (e) => onChange?.(e.target.value) }
        : { defaultValue: valeur })}
    >
      <option value="">Choisir…</option>
      {options.map((option) => (
        <option key={option.valeur} value={option.valeur} disabled={option.desactive}>
          {option.libelle}
        </option>
      ))}
    </select>
  ) : (
    <input
      {...commun}
      type={type}
      inputMode={inputMode}
      autoComplete={autoComplete}
      defaultValue={valeur}
    />
  );

  return (
    <div className={large ? "sm:col-span-2" : undefined}>
      <label htmlFor={nom} className="libelle text-sm">
        {libelle}
        <Obligatoire obligatoire={obligatoire} />
      </label>
      {controle}
      <Erreur nom={nom} erreur={erreur} />
    </div>
  );
}

// Une partie du formulaire, présentée en carte numérotée comme dans la maquette.
function Partie({
  numero,
  titre,
  sousTitre,
  children,
}: {
  numero: number;
  titre: string;
  sousTitre: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-6 rounded-3xl border border-bordure bg-white p-6 sm:p-8">
      <fieldset>
        <legend>
          <span className="block text-xl font-semibold text-marine">
            {numero}. {titre}
          </span>
          <span className="block text-sm text-texte-secondaire">{sousTitre}</span>
        </legend>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">{children}</div>
      </fieldset>
    </section>
  );
}

export function DemandeForm({
  classes,
  classeInitialeId,
  identite,
}: {
  classes: Classe[];
  classeInitialeId?: number;
  identite: { nom: string; prenom: string } | null;
}) {
  const [etat, formAction, enCours] = useActionState(deposerDemande, etatInitial);
  const [classeChoisie, setClasseChoisie] = useState(
    classeInitialeId ? String(classeInitialeId) : "",
  );

  const niveauChoisi = classes.find((c) => String(c.id) === classeChoisie)?.niveau;
  const { erreurs, valeurs } = etat;

  // Envoi sans la remise à zéro automatique de React 19 (form action={…}) :
  // après une erreur, l'élève retrouve tout ce qu'il a saisi, listes déroulantes comprises.
  function envoyer(evenement: FormEvent<HTMLFormElement>) {
    evenement.preventDefault();
    const donnees = new FormData(evenement.currentTarget);
    startTransition(() => formAction(donnees));
  }

  // Après l'envoi : message de confirmation à la place du formulaire
  if (etat.succes) {
    return (
      <section className="mt-6 rounded-3xl border border-bordure bg-white p-6 sm:p-8">
        <p role="status" className="rounded-2xl bg-validee-fond p-4 font-semibold text-validee">
          {etat.message}
        </p>
        <Link href="/espace-eleve" className="bouton mt-6 rounded-full">
          Suivre ma demande
        </Link>
      </section>
    );
  }

  return (
    <form onSubmit={envoyer} noValidate>
      {etat.message ? (
        <p
          role="status"
          aria-live="polite"
          className="mt-6 rounded-2xl bg-refusee-fond p-4 font-semibold text-refusee"
        >
          {etat.message}
        </p>
      ) : null}

      <Partie numero={1} titre="Classe demandée" sousTitre="Niveau et série de la classe souhaitée">
        <Champ
          nom="classe_id"
          libelle="Classe"
          large
          erreur={erreurs.classe_id}
          valeurControlee={classeChoisie}
          onChange={setClasseChoisie}
          options={classes.map((c) => ({
            valeur: String(c.id),
            libelle: c.inscriptions_ouvertes ? c.libelle : `${c.libelle} (inscriptions fermées)`,
            desactive: !c.inscriptions_ouvertes,
          }))}
        />
      </Partie>

      <Partie numero={2} titre="L’élève" sousTitre="État civil, conforme aux pièces officielles">
        <Champ
          nom="eleve_nom"
          libelle="Nom"
          autoComplete="family-name"
          erreur={erreurs.eleve_nom}
          valeur={valeurs.eleve_nom ?? identite?.nom}
        />
        <Champ
          nom="eleve_prenoms"
          libelle="Prénom(s)"
          autoComplete="given-name"
          erreur={erreurs.eleve_prenoms}
          valeur={valeurs.eleve_prenoms ?? identite?.prenom}
        />

        <fieldset aria-describedby={erreurs.sexe ? "sexe-erreur" : undefined}>
          <legend className="libelle text-sm">
            Sexe
            <Obligatoire obligatoire />
          </legend>
          <div className="grid grid-cols-2 gap-3">
            {[
              { valeur: "F", libelle: "Féminin" },
              { valeur: "M", libelle: "Masculin" },
            ].map((option) => (
              <label
                key={option.valeur}
                className="flex min-h-11 cursor-pointer items-center justify-center rounded-full border border-texte-secondaire px-4 font-semibold has-[:checked]:border-marine has-[:checked]:bg-marine has-[:checked]:text-white has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ocre"
              >
                <input
                  type="radio"
                  name="sexe"
                  value={option.valeur}
                  defaultChecked={valeurs.sexe === option.valeur}
                  className="sr-only"
                />
                {option.libelle}
              </label>
            ))}
          </div>
          <Erreur nom="sexe" erreur={erreurs.sexe} />
        </fieldset>

        <Champ nom="date_naissance" libelle="Date de naissance" type="date" erreur={erreurs.date_naissance} valeur={valeurs.date_naissance} />
        <Champ nom="lieu_naissance" libelle="Lieu de naissance" erreur={erreurs.lieu_naissance} valeur={valeurs.lieu_naissance} />
        <Champ nom="nationalite" libelle="Nationalité" erreur={erreurs.nationalite} valeur={valeurs.nationalite} />
        <Champ nom="adresse_quartier" libelle="Adresse : quartier" erreur={erreurs.adresse_quartier} valeur={valeurs.adresse_quartier} />
        <Champ nom="adresse_ville" libelle="Adresse : ville" erreur={erreurs.adresse_ville} valeur={valeurs.adresse_ville} />
        <Champ nom="telephone" libelle="Téléphone" type="tel" inputMode="tel" autoComplete="tel" obligatoire={false} erreur={erreurs.telephone} valeur={valeurs.telephone} />
      </Partie>

      <Partie numero={3} titre="Scolarité précédente" sousTitre="Établissement et résultats de l’année dernière">
        <Champ nom="etablissement_precedent" libelle="Établissement fréquenté l’année dernière" large erreur={erreurs.etablissement_precedent} valeur={valeurs.etablissement_precedent} />
        <Champ nom="derniere_classe" libelle="Dernière classe suivie (ex. : 3e, Seconde C)" erreur={erreurs.derniere_classe} valeur={valeurs.derniere_classe} />
        <Champ nom="moyenne_annuelle" libelle="Moyenne générale annuelle, sur 20" inputMode="decimal" erreur={erreurs.moyenne_annuelle} valeur={valeurs.moyenne_annuelle} />
        {niveauChoisi === "seconde" ? (
          <div className="rounded-2xl bg-fond p-4 sm:col-span-2">
            <p className="mb-3 text-sm text-texte-secondaire">
              Obligatoire pour une entrée en Seconde.
            </p>
            <Champ nom="moyenne_bepc" libelle="Moyenne obtenue au BEPC, sur 20" inputMode="decimal" erreur={erreurs.moyenne_bepc} valeur={valeurs.moyenne_bepc} />
          </div>
        ) : null}
      </Partie>

      <Partie numero={4} titre="Responsable légal" sousTitre="Personne à contacter pour le suivi de la demande">
        <Champ nom="responsable_nom" libelle="Nom" erreur={erreurs.responsable_nom} valeur={valeurs.responsable_nom} />
        <Champ nom="responsable_prenoms" libelle="Prénom(s)" erreur={erreurs.responsable_prenoms} valeur={valeurs.responsable_prenoms} />
        <Champ
          nom="responsable_lien"
          libelle="Lien avec l’élève"
          erreur={erreurs.responsable_lien}
          valeur={valeurs.responsable_lien}
          options={[
            { valeur: "pere", libelle: "Père" },
            { valeur: "mere", libelle: "Mère" },
            { valeur: "tuteur", libelle: "Tuteur" },
          ]}
        />
        <Champ nom="responsable_telephone" libelle="Téléphone" type="tel" inputMode="tel" erreur={erreurs.responsable_telephone} valeur={valeurs.responsable_telephone} />
        <Champ nom="responsable_email" libelle="Adresse e-mail" type="email" inputMode="email" large obligatoire={false} erreur={erreurs.responsable_email} valeur={valeurs.responsable_email} />
      </Partie>

      <div className="mt-6 flex justify-end">
        <button type="submit" disabled={enCours} className="bouton rounded-full px-8">
          {enCours ? "Envoi en cours…" : "Envoyer ma demande"}
        </button>
      </div>
    </form>
  );
}
