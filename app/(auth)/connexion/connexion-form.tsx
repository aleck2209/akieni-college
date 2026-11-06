"use client";

import Link from "next/link";
import { useActionState, useId, useState } from "react";
import { seConnecter, type EtatConnexion } from "./actions";
import {
  IconeCadenas,
  IconeEcole,
  IconeEleve,
  IconeMail,
  IconeOeil,
  IconeOeilBarre,
} from "./icones";

type Profil = "eleve" | "ecole";

const etatInitial: EtatConnexion = {};

const TEXTES: Record<Profil, { titre: string; intro: string; placeholder: string }> = {
  eleve: {
    titre: "Connexion à l’Espace Élève & Famille",
    intro: "Déposez votre demande d’inscription et suivez son avancement.",
    placeholder: "prenom.nom@exemple.com",
  },
  ecole: {
    titre: "Connexion à l’Espace École",
    intro: "Consultez les demandes reçues et répondez-y.",
    placeholder: "secretariat@exemple.com",
  },
};

export default function ConnexionForm({ callbackUrl = "" }: { callbackUrl?: string }) {
  const [etat, action, enCours] = useActionState(seConnecter, etatInitial);
  const [profil, setProfil] = useState<Profil>("eleve");
  const [mdpVisible, setMdpVisible] = useState(false);
  const [fermee, setFermee] = useState<EtatConnexion | null>(null);
  const id = useId();

  const erreurVisible = Boolean(etat.erreur) && fermee !== etat;
  const textes = TEXTES[profil];

  return (
    <>
      {erreurVisible && (
        <div role="alert" className="cx-alerte">
          <div>
            <p className="cx-alerte-titre">
              Erreur d’authentification <span className="cx-echec">ÉCHEC</span>
            </p>
            <p>{etat.erreur}</p>
          </div>
          <button
            type="button"
            onClick={() => setFermee(etat)}
            aria-label="Fermer le message d’erreur"
          >
            ×
          </button>
        </div>
      )}

      <nav className="cx-onglets" aria-label="Connexion ou création de compte">
        <span className="cx-onglet cx-onglet--actif" aria-current="page">
          Connexion
        </span>
        <Link className="cx-onglet" href="/creer-compte">
          Créer un compte
        </Link>
      </nav>

      <form action={action} noValidate>
       <input type="hidden" name="callbackUrl" value={callbackUrl} /> 
        <fieldset className="cx-profils">
          <legend>Je me connecte en tant que</legend>
          <label className="cx-profil">
            <input
              type="radio"
              name="profil"
              value="eleve"
              checked={profil === "eleve"}
              onChange={() => setProfil("eleve")}
            />
            <IconeEleve />
            <span>
              <strong>Élève / Parent</strong>
              <small>Accès portail famille</small>
            </span>
          </label>
          <label className="cx-profil">
            <input
              type="radio"
              name="profil"
              value="ecole"
              checked={profil === "ecole"}
              onChange={() => setProfil("ecole")}
            />
            <IconeEcole />
            <span>
              <strong>École / Admin</strong>
              <small>Direction &amp; secrétariat</small>
            </span>
          </label>
        </fieldset>

        <h1 className="cx-titre">{textes.titre}</h1>
        <p className="cx-intro">{textes.intro}</p>

        <div className="cx-champ">
          <label htmlFor={`${id}-email`}>Adresse e-mail</label>
          <div className="cx-saisie">
            <IconeMail />
            <input
              id={`${id}-email`}
              name="email"
              type="email"
              autoComplete="email"
              placeholder={textes.placeholder}
              defaultValue={etat.email}
              required
              aria-invalid={etat.erreur ? true : undefined}
            />
          </div>
        </div>

        <div className="cx-champ">
          <label htmlFor={`${id}-mdp`}>Mot de passe</label>
          <div className="cx-saisie">
            <IconeCadenas />
            <input
              id={`${id}-mdp`}
              name="motDePasse"
              type={mdpVisible ? "text" : "password"}
              autoComplete="current-password"
              required
              aria-invalid={etat.erreur ? true : undefined}
            />
            <button
              type="button"
              className="cx-oeil"
              onClick={() => setMdpVisible((v) => !v)}
              aria-label={mdpVisible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
              aria-pressed={mdpVisible}
            >
              {mdpVisible ? <IconeOeilBarre /> : <IconeOeil />}
            </button>
          </div>
        </div>

        <button type="submit" className="cx-bouton" disabled={enCours}>
          <IconeCadenas />
          {enCours ? "Connexion en cours…" : "Se connecter"}
        </button>
      </form>

      {profil === "eleve" && (
        <p className="cx-pied-carte">
          Pas encore d’identifiant ? <Link href="/creer-compte">Créer mon compte élève</Link>
        </p>
      )}
    </>
  );
}