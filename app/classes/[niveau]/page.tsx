
type Classe = {
  niveau: string;
  description: string;
  matieres: string[];
};

const classes: Record<string, Classe> = {
  "6e": {
    niveau: "6e",
    description: "Première année du collège. Les élèves consolident leurs connaissances fondamentales.",
    matieres: ["Français", "Mathématiques", "Anglais", "Histoire-Géographie", "Sciences"],
  },
  "5e": {
    niveau: "5e",
    description: "Deuxième année du collège, consacrée au renforcement des apprentissages.",
    matieres: ["Français", "Mathématiques", "Anglais", "Histoire-Géographie", "Sciences"],
  },
  "4e": {
    niveau: "4e",
    description: "Troisième année du collège, avec un approfondissement des matières fondamentales.",
    matieres: ["Français", "Mathématiques", "Anglais", "Histoire-Géographie", "Sciences"],
  },
  "3e": {
    niveau: "3e",
    description: "Année de préparation à l'examen du BEPC.",
    matieres: ["Français", "Mathématiques", "Anglais", "Physique-Chimie", "SVT"],
  },
  "2nde": {
    niveau: "2nde",
    description: "Première année du lycée, consacrée à l'orientation et à l'approfondissement.",
    matieres: ["Français", "Mathématiques", "Anglais", "Histoire-Géographie", "Sciences"],
  },
  "1ère": {
    niveau: "1ère",
    description: "Année de consolidation des connaissances avant la classe de Terminale.",
    matieres: ["Français", "Mathématiques", "Anglais", "Philosophie", "Sciences"],
  },
  "terminale": {
    niveau: "Terminale",
    description: "Année de préparation à l'examen du Baccalauréat.",
    matieres: ["Philosophie", "Mathématiques", "Français", "Anglais", "Spécialités"],
  },
};

export function generateStaticParams() {
  return Object.keys(classes).map((niveau) => ({
    niveau,
  }));
}

export const revalidate = 60;

export default async function ClasseDetailPage({
  params,
}: {
  params: Promise<{ niveau: string }>;
}) {
  const { niveau } = await params;
  const classe = classes[niveau];

  if (!classe) {
    return (
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">
          Classe introuvable
        </h1>
        <p className="mt-3 text-slate-500">
          Le niveau demandé n'existe pas dans notre établissement.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">

      <section>
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          Espace académique
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Classe de {classe.niveau}
        </h1>

        <p className="mt-3 max-w-2xl leading-7 text-slate-500">
          {classe.description}
        </p>
      </section>

      <section className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">
          Matières enseignées
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Découvrez les principales matières de ce niveau.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {classe.matieres.map((matiere) => (
            <div
              key={matiere}
              className="rounded-xl border border-slate-100 bg-slate-50 p-4"
            >
              <span className="font-medium text-slate-700">
                {matiere}
              </span>
            </div>
          ))}
        </div>
      </section>

      <a
        href="/classes"
        className="w-fit rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        ← Retour aux classes
      </a>

    </div>
  );
}
