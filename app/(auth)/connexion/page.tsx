import type { Metadata } from "next";
import ConnexionForm from "./connexion-form";
import { cheminSur } from "@/lib/redirection";

export const metadata: Metadata = {
  title: "Connexion – Akieni College",
  description: "Connectez-vous pour déposer ou suivre votre demande d’inscription.",
};

export default async function PageConnexion({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; compte?: string }>;
}) {
  const { callbackUrl, compte } = await searchParams;

  return (
    <main className="cx-main">
      <section className="cx-carte">
        <ConnexionForm
          callbackUrl={cheminSur(callbackUrl) ?? ""}
          compteCree={compte === "cree"}
        />
      </section>

      <aside className="cx-lateral">
        <section className="cx-demarches" aria-labelledby="demarches">
          <h2 id="demarches">
            Démarches Rentrée 2026-2027 <span className="cx-badge">100 % numérique</span>
          </h2>
          <ol className="cx-etapes">
            <li>
              <strong>Création du compte</strong>
              <span>Créez votre compte avec votre adresse e-mail.</span>
            </li>
            <li>
              <strong>Dossier d’inscription</strong>
              <span>Choisissez la classe et renseignez les informations de l’élève.</span>
            </li>
            <li>
              <strong>Réponse de l’école</strong>
              <span>L’école valide ou refuse la demande : suivez-la dans votre espace.</span>
            </li>
          </ol>
        </section>
      </aside>
    </main>
  );
}