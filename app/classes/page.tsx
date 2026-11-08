import type { Metadata } from "next";
import Link from "next/link";
import BadgeInscriptions from "../components/BadgeInscriptions";
import { listerClasses, NIVEAUX } from "@/lib/classes";

export const metadata: Metadata = {
  title: "Les classes — Akieni College",
};

// ISR : la page est générée au build, puis régénérée au plus toutes les 60 secondes.
export const revalidate = 60;

export default async function PageClasses() {
  const classes = await listerClasses();

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold text-marine">Les classes</h1>
      <p className="mt-2 text-texte-secondaire">
        Choisissez une classe pour voir ses matières dominantes et sa condition
        d&apos;admission.
      </p>

      {NIVEAUX.map((niveau) => (
        <section
          key={niveau.valeur}
          aria-labelledby={`niveau-${niveau.valeur}`}
          className="mt-10"
        >
          <h2 id={`niveau-${niveau.valeur}`} className="text-xl font-semibold text-marine">
            {niveau.libelle}
          </h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {classes
              .filter((classe) => classe.niveau === niveau.valeur)
              .map((classe) => (
                <li key={classe.id}>
                  <Link
                    href={`/classes/${classe.slug}`}
                    className="flex h-full flex-col gap-2 rounded-lg border border-bordure p-5 hover:border-marine"
                  >
                    <span className="text-lg font-semibold text-marine">{classe.libelle}</span>
                    <span className="text-sm text-texte-secondaire">
                      Série {classe.serie} · {classe.matieres_dominantes}
                    </span>
                    <BadgeInscriptions ouvertes={classe.inscriptions_ouvertes} />
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
