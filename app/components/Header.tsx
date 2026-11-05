
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">

        {/* Logo et nom de l'établissement */}
        <Link href="/" className="text-xl font-bold text-blue-700">
          Akieni College
        </Link>

        {/* Navigation principale */}
        <nav className="flex flex-wrap items-center gap-6 text-sm font-medium text-slate-700">
          <Link href="/" className="hover:text-blue-600">
            Accueil
          </Link>

          <Link href="/classes" className="hover:text-blue-600">
            Classes
          </Link>

          <Link href="/inscription" className="hover:text-blue-600">
            Inscription
          </Link>

          <Link
            href="/connexion"
            className="rounded-full bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          >
            Connexion
          </Link>
        </nav>

      </div>
    </header>
  );
}
