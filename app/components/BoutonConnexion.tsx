"use client";

import Link from "next/link";

// Emplacement du bouton « Se connecter / Se déconnecter » de l'en-tête.
// Composant navigateur : l'état de connexion sera lu ici, côté navigateur,
// pour que les pages publiques restent statiques (SSG et ISR).
// Auth le branche sur la session dans l'issue #11 (F5).
export default function BoutonConnexion() {
  return (
    <Link href="/connexion" className="bouton bouton-secondaire">
      Se connecter
    </Link>
  );
}
