import type { Metadata } from "next";
import Link from "next/link";
import CreerCompteForm from "./creer-compte-form";
import "../connexion/connexion.css";
import "./creer-compte.css";

export const metadata: Metadata = {
  title: "Créer un compte – Collège Akieni",
  description: "Créez votre compte élève pour déposer une demande d’inscription.",
};

export default function PageCreerCompte() {
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

      <main className="cx-main cx-main--seul">
        <section className="cx-carte">
          <CreerCompteForm />
        </section>
      </main>

      <footer className="cx-pied">
        <strong>Collège Akieni</strong>
        <p>© 2026 Collège Akieni. Tous droits réservés.</p>
      </footer>
    </div>
  );
}