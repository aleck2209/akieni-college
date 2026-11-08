import Link from "next/link";

// Affichée pour une adresse inconnue, et pour une classe qui n'existe pas (notFound()).
export default function PageIntrouvable() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold text-marine">Page introuvable</h1>
      <p className="mt-3 text-texte-secondaire">
        Cette page n&apos;existe pas, ou la classe demandée ne fait pas partie
        d&apos;Akieni College.
      </p>
      <Link href="/classes" className="bouton mt-8">
        Voir les classes
      </Link>
    </main>
  );
}
