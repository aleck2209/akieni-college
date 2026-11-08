"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { cheminSur } from "@/lib/redirection";

export type EtatConnexion = { erreur?: string; email?: string };

export async function seConnecter(
  _etat: EtatConnexion,
  formData: FormData
): Promise<EtatConnexion> {
  const email = String(formData.get("email") ?? "").trim();
  const motDePasse = String(formData.get("motDePasse") ?? "");
  const retour = cheminSur(String(formData.get("callbackUrl") ?? ""));

  if (!email || !motDePasse) {
    return { erreur: "Renseignez votre e-mail et votre mot de passe.", email };
  }

  const redirectTo = retour
    ? `/redirection?callbackUrl=${encodeURIComponent(retour)}`
    : "/redirection";

  try {
    await signIn("credentials", { email, password: motDePasse, redirectTo });
  } catch (e) {
    if (e instanceof AuthError) {
      // Message général : on ne dit pas si c'est l'e-mail ou le mot de passe qui est faux.
      return { erreur: "E-mail ou mot de passe incorrect", email };
    }
    throw e; // la redirection réussie passe par une exception
  }
  return {};
}
