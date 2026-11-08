"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { seDeconnecter } from "./deconnexion";

type Utilisateur = { role: "eleve" | "ecole" };

// Bouton « Se connecter / Se déconnecter » de l'en-tête.
// L'état de connexion est lu ici, côté navigateur, pour que les pages publiques
// restent statiques (SSG et ISR). Il est relu à chaque changement de page.
export default function BoutonConnexion() {
  const pathname = usePathname();
  const [utilisateur, setUtilisateur] = useState<Utilisateur | null>(null);

  useEffect(() => {
    let actif = true;
    fetch("/api/auth/session")
      .then((reponse) => reponse.json())
      .then((session) => {
        if (actif) setUtilisateur(session?.user ?? null);
      })
      .catch(() => {
        if (actif) setUtilisateur(null);
      });
    return () => {
      actif = false;
    };
  }, [pathname]);

  if (!utilisateur) {
    return (
      <Link href="/connexion" className="bouton bouton-secondaire">
        Se connecter
      </Link>
    );
  }

  const espace =
    utilisateur.role === "ecole"
      ? { href: "/ecole", libelle: "Espace école" }
      : { href: "/espace-eleve", libelle: "Mon espace" };

  async function deconnecter() {
    setUtilisateur(null);
    await seDeconnecter();
  }

  return (
    <>
      <Link href={espace.href} className="flex min-h-11 items-center px-2 hover:underline">
        {espace.libelle}
      </Link>
      <form action={deconnecter}>
        <button type="submit" className="bouton bouton-secondaire">
          Se déconnecter
        </button>
      </form>
    </>
  );
}
