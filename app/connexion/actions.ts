"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";

export type EtatConnexion = { erreur?: string; email?: string };

export async function seConnecter(
  _etat: EtatConnexion,
  formData: FormData
): Promise<EtatConnexion> {
  const email = String(formData.get("email") ?? "").trim();
  const motDePasse = String(formData.get("motDePasse") ?? "");

  if (!email || !motDePasse) {
    return { erreur: "Renseignez votre e-mail et votre mot de passe.", email };
  }

  try {
    await signIn("credentials", {
      email,
      password: motDePasse,
      redirectTo: "/redirection",
    });
  } catch (e) {
    if (e instanceof AuthError) {
      return { erreur: "E-mail ou mot de passe incorrect.", email };
    }
    throw e;
  }
  return {};
}