export const revalidate = 60;
export default function ClassesPage() {
  const classes = [
    {
      niveau: "6e",
      description: "Première année du collège",
      couleur: "bg-blue-100 text-blue-700",
    },
    {
      niveau: "5e",
      description: "Deuxième année du collège",
      couleur: "bg-cyan-100 text-cyan-700",
    },
    {
      niveau: "4e",
      description: "Troisième année du collège",
      couleur: "bg-emerald-100 text-emerald-700",
    },
    {
      niveau: "3e",
      description: "Année de préparation au BEPC",
      couleur: "bg-amber-100 text-amber-700",
    },
    {
      niveau: "2nde",
      description: "Première année du lycée",
      couleur: "bg-purple-100 text-purple-700",
    },
    {
      niveau: "1ère",
      description: "Préparation au baccalauréat",
      couleur: "bg-pink-100 text-pink-700",
    },
    {
      niveau: "Terminale",
      description: "Année de préparation au BAC",
      couleur: "bg-indigo-100 text-indigo-700",
    },
  ];

  return (
    <div className="flex flex-col gap-8">

      {/* EN-TÊTE DE LA PAGE */}
      <section>
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          Espace académique
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Nos classes
        </h1>

        <p className="mt-2 text-slate-500">
          Découvrez les différents niveaux d'enseignement
          proposés par Akieni College.
        </p>
      </section>

      {/* LISTE DES CLASSES */}
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">

        {classes.map((classe) => (
          <article
            key={classe.niveau}
            className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <span
              className={`inline-flex rounded-lg px-4 py-2 text-sm font-bold ${classe.couleur}`}
            >
              Classe de {classe.niveau}
            </span>

            <p className="mt-5 text-sm leading-6 text-slate-600">
              {classe.description}
            </p>

            <a
              href={`/classes/${classe.niveau}`}
              className="mt-6 inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800"
            >
              Voir les détails →
            </a>
          </article>
        ))}

      </section>
    </div>
  );
}
