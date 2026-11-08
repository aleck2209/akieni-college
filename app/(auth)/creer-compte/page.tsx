import type { Metadata } from "next";
import CreerCompteForm from "./creer-compte-form";
import { cheminSur } from "@/lib/redirection";

export const metadata: Metadata = {
  title: "Créer un compte – Akieni College",
  description: "Créez votre compte élève pour déposer une demande d’inscription.",
};

export default async function PageCreerCompte({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;

  return (
    <main className="cx-main cx-main--seul">
      <section className="cx-carte">
        <CreerCompteForm callbackUrl={cheminSur(callbackUrl) ?? ""} />
      </section>
    </main>
  );
}
