"use client";

import { useActionState, useState } from "react";
import { deposerDemande, type EtatDemande } from "./actions";
import type { Classe } from "../../lib/demandes";
import type { ChampDemande } from "../../lib/validation-demande";

const etatInitial: EtatDemande = {
  succes: false,
  message: "",
  erreurs: {},
  valeurs: {},
};

const styleChamp =
  "mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 aria-[invalid=true]:border-red-600";

type Option = { valeur: string; libelle: string; desactive?: boolean };

type ChampProps = {
  nom: ChampDemande;
  libelle: string;
  erreur?: string;
  valeur?: string;
  obligatoire?: boolean;
  type?: string;
  inputMode?: "text" | "decimal" | "tel" | "email";
  options?: Option[];
  // Pour un champ contrôlé (la classe choisie)
  valeurControlee?: string;
  onChange?: (valeur: string) => void;
};

function Champ({
  nom,
  libelle,
  erreur,
  valeur = "",
  obligatoire = true,
  type = "text",
  inputMode,
  options,
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
    <input {...commun} type={type} inputMode={inputMode} defaultValue={valeur} />
  );

  return (
    <div>
      <label htmlFor={nom} className="block text-sm font-medium text-slate-800">
        {libelle}
        {obligatoire ? (
          <span className="text-red-600"> *</span>
        ) : (
          <span className="font-normal text-slate-500"> (facultatif)</span>
        )}
      </label>
      {controle}
      {erreur ? (
        <p id={`${nom}-erreur`} className="mt-1 text-sm text-red-700">
          {erreur}
        </p>
      ) : null}
    </div>
  );
}

export function DemandeForm({
  classes,
  classeInitialeId,
}: {
  classes: Classe[];
  classeInitialeId?: number;
}) {
  const [etat, formAction, enCours] = useActionState(deposerDemande, etatInitial);
  const [classeChoisie, setClasseChoisie] = useState(
    classeInitialeId ? String(classeInitialeId) : "",
  );

  const niveauChoisi = classes.find((c) => String(c.id) === classeChoisie)?.niveau;
  const { erreurs, valeurs } = etat;

  return (
    <form action={formAction} className="space-y-8">
      {etat.message ? (
        <p
          role="status"
          aria-live="polite"
          className={
            etat.succes
              ? "rounded-md bg-green-50 p-4 text-green-800"
              : "rounded-md bg-red-50 p-4 text-red-800"
          }
        >
          {etat.message}
        </p>
      ) : null}

      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-slate-900">1. Classe demandée</legend>
        <Champ
          nom="classe_id"
          libelle="Classe"
          erreur={erreurs.classe_id}
          valeurControlee={classeChoisie}
          onChange={setClasseChoisie}
          options={classes.map((c) => ({
            valeur: String(c.id),
            libelle: c.inscriptionsOuvertes ? c.libelle : `${c.libelle} (inscriptions fermées)`,
            desactive: !c.inscriptionsOuvertes,
          }))}
        />
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-slate-900">2. L’élève</legend>
        <Champ nom="eleve_nom" libelle="Nom" erreur={erreurs.eleve_nom} valeur={valeurs.eleve_nom} />
        <Champ nom="eleve_prenoms" libelle="Prénom(s)" erreur={erreurs.eleve_prenoms} valeur={valeurs.eleve_prenoms} />
        <Champ
          nom="sexe"
          libelle="Sexe"
          erreur={erreurs.sexe}
          valeur={valeurs.sexe}
          options={[
            { valeur: "F", libelle: "Féminin" },
            { valeur: "M", libelle: "Masculin" },
          ]}
        />
        <Champ nom="date_naissance" libelle="Date de naissance" type="date" erreur={erreurs.date_naissance} valeur={valeurs.date_naissance} />
        <Champ nom="lieu_naissance" libelle="Lieu de naissance" erreur={erreurs.lieu_naissance} valeur={valeurs.lieu_naissance} />
        <Champ nom="nationalite" libelle="Nationalité" erreur={erreurs.nationalite} valeur={valeurs.nationalite} />
        <Champ nom="adresse_quartier" libelle="Adresse : quartier" erreur={erreurs.adresse_quartier} valeur={valeurs.adresse_quartier} />
        <Champ nom="adresse_ville" libelle="Adresse : ville" erreur={erreurs.adresse_ville} valeur={valeurs.adresse_ville} />
        <Champ nom="telephone" libelle="Téléphone" type="tel" inputMode="tel" obligatoire={false} erreur={erreurs.telephone} valeur={valeurs.telephone} />
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-slate-900">3. Scolarité précédente</legend>
        <Champ nom="etablissement_precedent" libelle="Établissement fréquenté l’année dernière" erreur={erreurs.etablissement_precedent} valeur={valeurs.etablissement_precedent} />
        <Champ nom="derniere_classe" libelle="Dernière classe suivie (ex. : 3e, Seconde C)" erreur={erreurs.derniere_classe} valeur={valeurs.derniere_classe} />
        <Champ nom="moyenne_annuelle" libelle="Moyenne générale annuelle de cette classe, sur 20" inputMode="decimal" erreur={erreurs.moyenne_annuelle} valeur={valeurs.moyenne_annuelle} />
        {niveauChoisi === "seconde" ? (
          <Champ nom="moyenne_bepc" libelle="Moyenne obtenue au BEPC, sur 20" inputMode="decimal" erreur={erreurs.moyenne_bepc} valeur={valeurs.moyenne_bepc} />
        ) : null}
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-slate-900">4. Responsable légal</legend>
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
        <Champ nom="responsable_email" libelle="Adresse e-mail" type="email" inputMode="email" obligatoire={false} erreur={erreurs.responsable_email} valeur={valeurs.responsable_email} />
      </fieldset>

      <button
        type="submit"
        disabled={enCours}
        className="rounded-md bg-blue-800 px-5 py-2.5 font-medium text-white hover:bg-blue-900 disabled:opacity-60"
      >
        {enCours ? "Envoi en cours…" : "Envoyer ma demande"}
      </button>
    </form>
  );
}
