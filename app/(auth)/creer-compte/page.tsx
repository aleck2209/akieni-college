import type { Metadata } from "next";
import CreerCompteForm from "./creer-compte-form";

export const metadata: Metadata = {
  title: "Créer un compte – Akieni College",
  description: "Créez votre compte élève pour déposer une demande d’inscription.",
};

export default function PageCreerCompte() {
  return (
    <main className="cx-main cx-main--seul">
      <section className="cx-carte">
        <CreerCompteForm />
      </section>
    </main>
  );
}