
export const dynamic = "force-dynamic";

export default function AdministrationPage() {
  const statistiques = [
    {
      titre: "Total des élèves",
      valeur: "1 248",
      description: "Élèves enregistrés",
      couleur: "bg-blue-50 text-blue-700",
    },
    {
      titre: "Dossiers en attente",
      valeur: "36",
      description: "À examiner",
      couleur: "bg-amber-50 text-amber-700",
    },
    {
      titre: "Inscriptions validées",
      valeur: "892",
      description: "Dossiers acceptés",
      couleur: "bg-emerald-50 text-emerald-700",
    },
  ];

  const classes = [
    { niveau: "6e", effectif: 180 },
    { niveau: "5e", effectif: 165 },
    { niveau: "4e", effectif: 172 },
    { niveau: "3e", effectif: 190 },
    { niveau: "2nde", effectif: 185 },
    { niveau: "1ère", effectif: 178 },
    { niveau: "Terminale", effectif: 178 },
  ];

  return (
    <div className="flex flex-col gap-8">
      <section>
        <p className="text-sm font-medium text-blue-600">
          ESPACE DE GESTION
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Administration
        </h1>

        <p className="mt-2 text-slate-500">
          Gérez les inscriptions et suivez les activités de votre établissement.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {statistiques.map((statistique) => (
          <article
            key={statistique.titre}
            className="rounded-2xl bg-white p-6 shadow-sm"
          >
            <p className="text-sm text-slate-500">
              {statistique.titre}
            </p>

            <p className="mt-3 text-3xl font-bold text-slate-900">
              {statistique.valeur}
            </p>

            <span
              className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-medium ${statistique.couleur}`}
            >
              {statistique.description}
            </span>
          </article>
        ))}
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">
          Effectifs par classe
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Répartition des élèves par niveau scolaire.
        </p>

        <div className="mt-6 flex flex-col gap-5">
          {classes.map((classe) => (
            <div key={classe.niveau}>
              <div className="mb-2 flex items-center justify-between">
                <span className="font-medium text-slate-700">
                  {classe.niveau}
                </span>

                <span className="text-sm text-slate-500">
                  {classe.effectif} élèves
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-blue-600"
                  style={{ width: `${(classe.effectif / 200) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
