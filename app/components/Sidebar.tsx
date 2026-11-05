
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const getLinkClass = (href: string) => {
    const isActive =
      href === "/"
        ? pathname === "/"
        : pathname === href || pathname.startsWith(`${href}/`);

    return isActive
      ? "rounded-xl bg-blue-600 px-4 py-3 font-medium text-white shadow-sm"
      : "rounded-xl px-4 py-3 font-medium text-slate-600 transition hover:bg-slate-100";
  };

  return (
    <aside className="flex min-h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white p-5">

      {/* Identité de l'établissement */}
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
          <span className="text-xl font-bold">A</span>
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Akieni College
          </h2>
          <p className="text-xs text-slate-500">
            Lycée de la Révolution
          </p>
        </div>
      </div>

      {/* Navigation académique */}
      <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
        Navigation académique
      </div>

      <nav className="flex flex-col gap-2">
        <Link href="/" className={getLinkClass("/")}>
          Accueil
        </Link>

        <Link href="/classes" className={getLinkClass("/classes")}>
          Classes
        </Link>

        <Link href="/espace-eleve" className={getLinkClass("/espace-eleve")}>
          Mon espace élève
        </Link>

        <Link href="/inscription" className={getLinkClass("/inscription")}>
          Inscription
        </Link>
      </nav>

      {/* Gestion et accès */}
      <div className="mb-3 mt-8 text-xs font-semibold uppercase tracking-wider text-slate-400">
        Gestion & accès
      </div>

      <nav className="flex flex-col gap-2">
        <Link href="/administration" className={getLinkClass("/administration")}>
          Administration
        </Link>

        <Link href="/connexion" className={getLinkClass("/connexion")}>
          Connexion
        </Link>
      </nav>

      {/* Portail numérique */}
      <div className="mt-auto rounded-xl border border-blue-100 bg-blue-50 p-4">
        <p className="font-semibold text-blue-900">
          Portail numérique
        </p>

        <span className="mt-2 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          Actif
        </span>

        <p className="mt-2 text-xs text-slate-500">
          Année scolaire 2025-2026
        </p>
      </div>

    </aside>
  );
}

