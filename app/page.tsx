import Image from "next/image";
import Link from "next/link";

// SSG : la page ne lit ni la base ni la session. Elle est générée une seule fois, au build.

const POINTS_FORTS = [
  {
    titre: "Inscription en ligne",
    texte: "Déposez votre demande depuis chez vous, puis suivez sa réponse dans votre espace.",
  },
  {
    titre: "Des conditions claires",
    texte: "Chaque classe affiche ses conditions d'admission avant votre demande.",
  },
  {
    titre: "Un suivi attentif",
    texte: "Une équipe pédagogique accompagne chaque élève, de la Seconde à la Terminale.",
  },
];

const SERIES = [
  { serie: "A", dominante: "Lettres, langues et sciences humaines" },
  { serie: "C", dominante: "Mathématiques et sciences physiques" },
  {
    serie: "D",
    dominante: "Sciences de la vie et de la Terre, mathématiques, physique-chimie",
  },
];

export default function Accueil() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
      {/* Bienvenue */}
      <section className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <h1 className="text-3xl font-semibold text-marine sm:text-4xl">
            Bienvenue à Akieni College
          </h1>
          <p className="mt-4 text-lg">
            Lycée d&apos;enseignement général à Brazzaville, Akieni College accueille les
            élèves de la Seconde à la Terminale. Inscrivez-vous en ligne, sans vous
            déplacer.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/classes" className="bouton">
              Voir les classes
            </Link>
            <Link href="/creer-compte" className="bouton bouton-secondaire">
              Créer mon compte
            </Link>
          </div>
        </div>

        <Image
          src="/images/illustration-accueil.svg"
          alt="Illustration du bâtiment d'Akieni College"
          width={480}
          height={320}
          priority
          className="h-auto w-full"
        />
      </section>

      {/* Points forts */}
      <section aria-labelledby="points-forts" className="mt-16">
        <h2 id="points-forts" className="text-2xl font-semibold text-marine">
          Nos points forts
        </h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {POINTS_FORTS.map((point) => (
            <li key={point.titre} className="rounded-lg border border-bordure p-6">
              <h3 className="border-b-2 border-ocre pb-2 font-semibold text-marine">
                {point.titre}
              </h3>
              <p className="mt-3 text-texte-secondaire">{point.texte}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Séries */}
      <section aria-labelledby="series" className="mt-16">
        <h2 id="series" className="text-2xl font-semibold text-marine">
          Les séries proposées
        </h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {SERIES.map((item) => (
            <li key={item.serie} className="rounded-lg bg-fond p-6">
              <p className="text-xl font-semibold text-marine">Série {item.serie}</p>
              <p className="mt-2 text-texte-secondaire">{item.dominante}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
