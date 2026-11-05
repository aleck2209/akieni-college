import type { Metadata } from "next";
import Link from "next/link";
import ConnexionForm from "./connexion-form";
import "./connexion.css";

export const metadata: Metadata = {
  title: "Connexion – Collège Akieni",
  description: "Connectez-vous pour déposer ou suivre votre demande d’inscription.",
};

export default function PageConnexion() {
  return (
    <div className="cx">
      <header className="cx-entete">
        <Link href="/" className="cx-marque">
          <span className="cx-logo" aria-hidden="true">CA</span>
          <span>
            <strong>Collège Akieni</strong>
            <small>Portail Pédagogique &amp; Admission</small>
          </span>
        </Link>
        <nav className="cx-entete-droite" aria-label="Navigation">
          <Link href="/">← Retour à l’accueil</Link>
          <span className="cx-pastille">Rentrée 2026-2027</span>
        </nav>
      </header>

      <main className="cx-main">
        <section className="cx-carte">
          <ConnexionForm />
        </section>

        <aside className="cx-lateral">
          <figure className="cx-temoignage">
            <div className="cx-photo">
              <span className="cx-etiquette">Série C – Maths &amp; Sciences</span>
              <span className="cx-niveau">Terminale</span>
              <p className="cx-nom">Sarah N. Ondo</p>
            </div>
            <div className="cx-temoignage-texte">
              <p className="cx-etoiles" role="img" aria-label="5 étoiles sur 5">
                ★★★★★ <span>Excellence académique</span>
              </p>
              <blockquote>
                « L’inscription dématérialisée m’a permis d’intégrer le Collège
                Akieni sans délai. »
              </blockquote>
            </div>
          </figure>

          <section className="cx-demarches" aria-labelledby="demarches">
            <h2 id="demarches">
              Démarches Rentrée 2026-2027 <span className="cx-badge">100 % numérique</span>
            </h2>
            <ol className="cx-etapes">
              <li>
                <strong>Création du compte</strong>
                <span>Créez votre compte avec votre adresse e-mail.</span>
              </li>
              <li>
                <strong>Dossier d’inscription</strong>
                <span>Choisissez la classe et renseignez les informations de l’élève.</span>
              </li>
              <li>
                <strong>Réponse de l’école</strong>
                <span>L’école valide ou refuse la demande : suivez-la dans votre espace.</span>
              </li>
            </ol>
            <p className="cx-aide">
              Besoin d’assistance ? <Link href="/#contact">Contact secrétariat</Link>
            </p>
          </section>
        </aside>
      </main>

      <footer className="cx-pied">
        <strong>Collège Akieni</strong>
        <p>© 2026 Collège Akieni. Tous droits réservés.</p>
      </footer>
    </div>
  );
}