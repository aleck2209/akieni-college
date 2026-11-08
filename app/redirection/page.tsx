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
  const ecole = session.user.role === "ecole";
  const monEspace = ecole ? "/ecole" : "/espace-eleve";
  const espacesInterdits = ecole ? ["/espace-eleve", "/demande"] : ["/ecole"];

  // On revient à la page demandée, sauf si elle est réservée à l'autre rôle.
  if (retour && !espacesInterdits.some((espace) => estDans(retour, espace))) {
    redirect(retour);
  }
  redirect(monEspace);
}
