
export const dynamic = "force-dynamic";

export default function EspaceElevePage() {
  const eleve = {
    nom: "Jean Dupont",
    classe: "3e",
    matricule: "AK-2026-001",
    annee: "2025-2026",
    statut: "Dossier validé",
  };

  return (
    <div className="flex flex-col gap-8">

      {/* EN-TÊTE */}
      <section>
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          Espace personnel
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Mon espace élève
        </h1>

        <p className="mt-2 text-slate-500">
          Bienvenue dans votre espace personnel.
          Retrouvez ici vos informations scolaires.
        </p>
      </section>

      {/* PROFIL DE L'ÉLÈVE */}
      <section className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 p-7 text-white shadow-sm">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-3xl font-bold">
            {eleve.nom.charAt(0)}
          </div>

          <div>
            <p className="text-sm text-blue-100">
              Profil de l'élève
            </p>

            <h2 className="mt-1 text-2xl font-bold">
              {eleve.nom}
            </h2>

            <p className="mt-1 text-sm text-blue-100">
              Matricule : {eleve.matricule}
            </p>
          </div>

          <div className="sm:ml-auto">
            <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
              Année {eleve.annee}
            </span>
          </div>

        </div>
      </section>

      {/* INFORMATIONS SCOLAIRES */}
      <section className="grid grid-cols-1 gap-5 md:grid-cols-3">

        <article className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Classe actuelle
          </p>

          <h3 className="mt-3 text-3xl font-bold text-slate-900">
            {eleve.classe}
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Niveau scolaire
          </p>
        </article>

        <article className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Matricule
          </p>

          <h3 className="mt-3 text-2xl font-bold text-slate-900">
            {eleve.matricule}
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Identifiant scolaire
          </p>
        </article>

        <article className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Dossier scolaire
          </p>

          <span className="mt-3 inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            {eleve.statut}
          </span>

          <p className="mt-2 text-sm text-slate-500">
            État de l'inscription
          </p>
        </article>

      </section>

      {/* INFORMATIONS COMPLÉMENTAIRES */}
      <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">
          Informations scolaires
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Cet espace permettra aux élèves de consulter
          leurs informations administratives et scolaires.
        </p>

        <div className="mt-5 rounded-xl bg-blue-50 p-5">
          <p className="font-semibold text-blue-900">
            Suivi scolaire
          </p>

          <p className="mt-2 text-sm text-blue-700">
            Les informations relatives aux résultats,
            aux absences et à la progression scolaire
            seront accessibles dans cet espace.
          </p>
        </div>
      </section>

    </div>
  );
}
