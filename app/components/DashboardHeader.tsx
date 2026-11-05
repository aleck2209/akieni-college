
export default function DashboardHeader() {
  return (
    <header className="flex w-full items-center justify-between gap-6 border-b border-slate-200 bg-white px-8 py-4">

      {/* Barre de recherche */}
      <div className="flex flex-1 items-center gap-3 rounded-xl bg-slate-100 px-4 py-3">
        <span className="text-slate-400">⌕</span>

        <input
          type="search"
          placeholder="Rechercher une classe, matière, élève ou dossier..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
        />
      </div>

      {/* Informations et actions */}
      <div className="flex items-center gap-3">

        <span className="whitespace-nowrap rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
          Année 2025-2026
        </span>

        <span className="whitespace-nowrap rounded-full bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700">
          98.4% Succès
        </span>

        <button className="whitespace-nowrap rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700">
          + Nouvelle inscription
        </button>

      </div>
    </header>
  );
}
