import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { cheminSur, estDans } from "@/lib/redirection";

export default async function Redirection({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/connexion");

  const { callbackUrl } = await searchParams;
  const retour = cheminSur(callbackUrl);
  const role = session.user.role;
  const monEspace = role === "ecole" ? "/ecole" : "/eleve";
  const autreEspace = role === "ecole" ? "/eleve" : "/ecole";

  // On revient à la page demandée, sauf si elle appartient à l'espace de l'autre rôle.
  if (retour && !estDans(retour, autreEspace)) redirect(retour);
  redirect(monEspace);
}