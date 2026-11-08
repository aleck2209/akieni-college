import Link from "next/link";
import { notFound } from "next/navigation";
import BadgeInscriptions from "../../components/BadgeInscriptions";
import { listerClasses, NIVEAUX, trouverClasse } from "@/lib/classes";

// ISR : une fiche par classe est générée au build, puis régénérée au plus toutes les 60 secondes.
export const revalidate = 60;

export async function generateStaticParams() {
  const classes = await listerClasses();
  return classes.map((classe) => ({ slug: classe.slug }));
}

export default async function PageClasse({ params }: PageProps<"/classes/[slug]">) {
  const { slug } = await params;
  const classe = await trouverClasse(slug);

  if (!classe) notFound();

  const niveau = NIVEAUX.find((n) => n.valeur === classe.niveau)?.libelle;

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <Link href="/classes" className="inline-flex min-h-11 items-center text-marine underline">
        ← Toutes les classes
      </Link>

      <h1 className="mt-4 text-3xl font-semibold text-marine">{classe.libelle}</h1>
      <div className="mt-3">
        <BadgeInscriptions ouvertes={classe.inscriptions_ouvertes} />
      </div>

      <dl className="mt-8 grid gap-6 rounded-lg border border-bordure p-6 sm:grid-cols-2">
        <div>
          <dt className="text-sm text-texte-secondaire">Niveau</dt>
          <dd className="mt-1 font-semibold">{niveau}</dd>
        </div>
        <div>
          <dt className="text-sm text-texte-secondaire">Série</dt>
          <dd className="mt-1 font-semibold">{classe.serie}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-sm text-texte-secondaire">Matières dominantes</dt>
          <dd className="mt-1 font-semibold">{classe.matieres_dominantes}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-sm text-texte-secondaire">Condition d&apos;admission</dt>
          <dd className="mt-1 font-semibold">{classe.condition_admission}</dd>
        </div>
      </dl>

      <div className="mt-8">
        {classe.inscriptions_ouvertes ? (
          <Link href={`/demande?classe=${classe.slug}`} className="bouton">
            Demander mon inscription
          </Link>
        ) : (
          <>
            <button type="button" className="bouton" disabled>
              Demander mon inscription
            </button>
            <p className="mt-3 text-texte-secondaire">
              Les inscriptions sont fermées pour cette classe : elle n&apos;accepte plus de
              nouvelle demande.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
