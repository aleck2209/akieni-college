"use client";

import Link from "next/link";
import { useActionState, useId, useState, type ReactNode } from "react";
import { creerCompte, type EtatCreation } from "./actions";
import {
  IconeCadenas,
  IconeMail,
  IconeOeil,
  IconeOeilBarre,
} from "../connexion/icones";

const etatInitial: EtatCreation = {};

type ChampProps = {
  id: string;
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  defaultValue?: string;
  erreur?: string;
  icone?: ReactNode;
  droite?: ReactNode;
};

function Champ({
  id,
  label,
  name,
  type = "text",
  autoComplete,
  defaultValue,
  erreur,
  icone,
  droite,
}: ChampProps) {
  return (
    <div className="cx-champ">
      <label htmlFor={id}>{label}</label>
      <div className={icone ? "cx-saisie" : "cx-saisie cx-saisie--sans-icone"}>
        {icone}
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          defaultValue={defaultValue}
          required
          aria-invalid={erreur ? true : undefined}
          aria-describedby={erreur ? `${id}-erreur` : undefined}
        />
        {droite}
      </div>
      {erreur && (
        <p id={`${id}-erreur`} className="cx-erreur-champ">
          {erreur}
        </p>
      )}
    </div>
  );
}

export default function CreerCompteForm() {
  const [etat, action, enCours] = useActionState(creerCompte, etatInitial);
  const [mdpVisible, setMdpVisible] = useState(false);
  const id = useId();
  const erreurs = etat.erreurs ?? {};
  const valeurs = etat.valeurs;

  const boutonOeil = (
    <button
      type="button"
      className="cx-oeil"
      onClick={() => setMdpVisible((v) => !v)}
      aria-label={mdpVisible ? "Masquer les mots de passe" : "Afficher les mots de passe"}
      aria-pressed={mdpVisible}
    >
      {mdpVisible ? <IconeOeilBarre /> : <IconeOeil />}
    </button>
  );

  return (
    <>
      <nav className="cx-onglets" aria-label="Connexion ou création de compte">
        <Link className="cx-onglet" href="/connexion">
          Connexion
        </Link>
        <span className="cx-onglet cx-onglet--actif" aria-current="page">
          Créer un compte
        </span>
      </nav>

      <h1 className="cx-titre cx-titre--creation">Créer mon compte élève</h1>
      <p className="cx-intro">
        Créer un compte n’est pas encore s’inscrire : vous remplirez ensuite
        votre demande d’inscription depuis votre espace.
      </p>

      <form action={action} noValidate>
        {erreurs.general && (
          <p role="alert" className="cx-erreur-general">
            {erreurs.general}
          </p>
        )}

        <div className="cx-deux">
          <Champ
            id={`${id}-nom`}
            label="Nom"
            name="nom"
            autoComplete="family-name"
            defaultValue={valeurs?.nom}
            erreur={erreurs.nom}
          />
          <Champ
            id={`${id}-prenom`}
            label="Prénom"
            name="prenom"
            autoComplete="given-name"
            defaultValue={valeurs?.prenom}
            erreur={erreurs.prenom}
          />
        </div>

        <Champ
          id={`${id}-email`}
          label="Adresse e-mail"
          name="email"
          type="email"
          autoComplete="email"
          defaultValue={valeurs?.email}
          erreur={erreurs.email}
          icone={<IconeMail />}
        />

        <Champ
          id={`${id}-mdp`}
          label="Mot de passe (8 caractères minimum)"
          name="motDePasse"
          type={mdpVisible ? "text" : "password"}
          autoComplete="new-password"
          erreur={erreurs.motDePasse}
          icone={<IconeCadenas />}
          droite={boutonOeil}
        />

        <Champ
          id={`${id}-confirmation`}
          label="Confirmer le mot de passe"
          name="confirmation"
          type={mdpVisible ? "text" : "password"}
          autoComplete="new-password"
          erreur={erreurs.confirmation}
          icone={<IconeCadenas />}
        />

        <button type="submit" className="cx-bouton" disabled={enCours}>
          {enCours ? "Création en cours…" : "Créer mon compte"}
        </button>
      </form>

      <p className="cx-pied-carte">
        Vous avez déjà un compte ? <Link href="/connexion">Se connecter</Link>
      </p>
    </>
  );
}