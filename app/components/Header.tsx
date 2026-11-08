import Link from "next/link";
import BoutonConnexion from "./BoutonConnexion";

export default function Header() {
  return (
    <header className="bg-marine text-white">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3 sm:px-6">
        <Link href="/" className="flex min-h-11 items-center gap-3 text-lg font-semibold">
          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-ocre text-sm"
          >
            AC
          </span>
          Akieni College
        </Link>

        <nav aria-label="Navigation principale" className="flex items-center gap-2 sm:gap-4">
          <Link href="/" className="flex min-h-11 items-center px-2 hover:underline">
            Accueil
          </Link>
          <Link href="/classes" className="flex min-h-11 items-center px-2 hover:underline">
            Classes
          </Link>
          <BoutonConnexion />
        </nav>
      </div>
    </header>
  );
}
