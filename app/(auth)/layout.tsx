import type { ReactNode } from "react";
import Link from "next/link";
import "./connexion/connexion.css";
import "./creer-compte/creer-compte.css";

export default function LayoutAuth({ children }: { children: ReactNode }) {
  return (
    <div className="cx">
      <header className="cx-entete">
        <Link href="/" className="cx-marque">
          <span className="cx-logo" aria-hidden="true">AC</span>
          <span>
            <strong>Akieni College</strong>
            <small>Portail d’inscription</small>
          </span>
        </Link>
        <nav className="cx-entete-droite" aria-label="Navigation">
          <Link href="/">← Retour à l’accueil</Link>
          <span className="cx-pastille">Rentrée 2026-2027</span>
        </nav>
      </header>

      {children}

      <footer className="cx-pied">
        <strong>Akieni College</strong>
        <p>© 2026 Akieni College. Tous droits réservés.</p>
      </footer>
    </div>
  );
}