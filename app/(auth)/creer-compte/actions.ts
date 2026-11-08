"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { pool } from "@/lib/db";
import { cheminSur } from "@/lib/redirection";

export type EtatCreation = {
  erreurs?: {
    nom?: string;
    prenom?: string;
    email?: string;
    motDePasse?: string;
    confirmation?: string;
    general?: string;
  };
  valeurs?: { nom: string; prenom: string; email: string };
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function creerCompte(
  _etat: EtatCreation,
  formData: FormData
): Promise<EtatCreation> {
  const nom = String(formData.get("nom") ?? "").trim();
  const prenom = String(formData.get("prenom") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const motDePasse = String(formData.get("motDePasse") ?? "");
  const confirmation = String(formData.get("confirmation") ?? "");
  const retour = cheminSur(String(formData.get("callbackUrl") ?? ""));
  const valeurs = { nom, prenom, email };

  const erreurs: NonNullable<EtatCreation["erreurs"]> = {};
  if (!nom) erreurs.nom = "Indiquez votre nom.";
  else if (nom.length > 100) erreurs.nom = "Le nom est trop long.";
  if (!prenom) erreurs.prenom = "Indiquez votre prénom.";
  else if (prenom.length > 100) erreurs.prenom = "Le prénom est trop long.";
  if (!EMAIL.test(email) || email.length > 255) {
    erreurs.email = "Indiquez une adresse e-mail valide.";
  }
  if (motDePasse.length < 8) {
    erreurs.motDePasse = "Le mot de passe doit contenir au moins 8 caractères.";
  } else if (Buffer.byteLength(motDePasse, "utf8") > 72) {
  erreurs.motDePasse =
    "Le mot de passe est trop long (72 octets maximum : les lettres accentuées comptent double).";
}
  if (!erreurs.motDePasse && confirmation !== motDePasse) {
    erreurs.confirmation = "Les deux mots de passe ne sont pas identiques.";
  }
  if (Object.keys(erreurs).length > 0) return { erreurs, valeurs };

  try {
    const hash = await bcrypt.hash(motDePasse, 10);
    // Le rôle est fixé ici : un compte créé depuis le portail est toujours un élève.
    await pool.query(
      `INSERT INTO compte (nom, prenom, email, mot_de_passe_hash, role)
       VALUES ($1, $2, $3, $4, 'eleve')`,
      [nom, prenom, email, hash]
    );
  } catch (e) {
    if ((e as { code?: string }).code === "23505") {
      return {
        erreurs: { email: "Un compte existe déjà avec cette adresse e-mail." },
        valeurs,
      };
    }
    console.error("Création de compte :", e);
    return {
      erreurs: { general: "Une erreur est survenue. Réessayez dans un instant." },
      valeurs,
    };
  }

  // Compte créé : l'élève est invité à se connecter (issue #10).
  const parametres = new URLSearchParams({ compte: "cree" });
  if (retour) parametres.set("callbackUrl", retour);
  redirect(`/connexion?${parametres}`);
}