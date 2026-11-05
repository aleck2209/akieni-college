import Image from "next/image";
export default function Home() {
  return (
    <div className="flex flex-col gap-10">

     
      {/* BANNIÈRE D'ACCUEIL */}
      <section className="relative isolate min-h-[430px] overflow-hidden rounded-3xl p-8 text-white shadow-lg lg:min-h-[430px] lg:p-10">

        {/* IMAGE EN ARRIÈRE-PLAN */}
        <Image
          src="/images/angola-libre.jpeg"
          alt="Inauguration du complexe scolaire Angola Libre à Brazzaville"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1200px"
          className="object-cover object-[center_30%]"
        />

        {/* VOILE SOMBRE POUR LA LISIBILITÉ */}
        <div className="absolute inset-0 z-0 bg-slate-950/60" />

        {/* CONTENU PRINCIPAL */}
        <div className="relative z-10 max-w-3xl">

          <span className="inline-flex rounded-full border border-white/30 bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
            Lycée de la Révolution (Brazzaville)
          </span>

          <h1 className="mt-6 max-w-2xl text-3xl font-bold leading-tight lg:text-4xl">
            Bienvenue à Akieni College — Préparez votre avenir dès aujourd'hui !
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/90 lg:text-base">
            Un pôle académique d'excellence au cœur de Brazzaville,
            dédié à la réussite scolaire, à l'épanouissement intellectuel
            et à la préparation de votre avenir.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">

            <a
              href="/inscription"
              className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
            >
              Inscription directe (F6)
            </a>

            <a
              href="/classes"
              className="rounded-xl border border-white/40 bg-white/15 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/25"
            >
              Voir les classes
            </a>

            <a
              href="/connexion"
              className="rounded-xl bg-blue-800/70 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-900"
            >
              Créer mon compte
            </a>

          </div>
        </div>

        {/* CARTE EXCELLENCE */}
        <div className="relative z-10 mt-10 flex justify-end lg:absolute lg:bottom-8 lg:right-10 lg:mt-0">

          <div className="w-full max-w-xs rounded-2xl border border-white/20 bg-white/15 p-6 shadow-xl backdrop-blur-md">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-3xl">
              🎓
            </div>

            <h2 className="mt-5 text-xl font-bold">
              Excellence & Réussite
            </h2>

            <p className="mt-2 text-sm leading-6 text-white/90">
              Construisons ensemble les bases d'un avenir scolaire
              et professionnel prometteur.
            </p>

            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/25">
              <div className="h-full w-[98%] rounded-full bg-cyan-300" />
            </div>

            <p className="mt-2 text-xs font-medium text-white/90">
              L'excellence au quotidien
            </p>

          </div>
        </div>

      </section> 

      {/* CARTES STATISTIQUES */}
      <section className="grid grid-cols-1 gap-5 md:grid-cols-3">

        {/* STATISTIQUE 1 */}
        <article className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Session officielle
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              98.4%
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              BEPC & Baccalauréat
            </p>

            <span className="mt-4 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              Résultats scolaires
            </span>
          </div>

          <div className="flex h-20 w-20 items-center justify-center rounded-full border-[6px] border-blue-100 border-t-blue-600 text-3xl">
            🎓
          </div>
        </article>


        {/* STATISTIQUE 2 */}
        <article className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Rentrée scolaire 2025–2026
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              74 places
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Capacité restante
            </p>

            <span className="mt-4 inline-flex rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
              Places disponibles
            </span>
          </div>

          <div className="flex h-20 w-20 items-center justify-center rounded-full border-[6px] border-teal-100 border-t-teal-500 text-3xl">
            🪑
          </div>
        </article>


        {/* STATISTIQUE 3 */}
        <article className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Secrétariat pédagogique
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              248
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Dossiers traités cette quinzaine
            </p>

            <span className="mt-4 inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
              Suivi des admissions
            </span>
          </div>

          <div className="flex h-20 w-20 items-center justify-center rounded-full border-[6px] border-amber-100 border-t-amber-500 text-3xl">
            ✓
          </div>
        </article>

      </section>
      {/* SECTION LES ATOUTS */}
      <section className="flex flex-col gap-6">

        {/* TITRE DE LA SECTION */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Pourquoi nous choisir ?
            </p>

            <h2 className="mt-2 text-2xl font-bold text-slate-900 lg:text-3xl">
              Les Atouts d'Akieni College
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Un environnement propice à l'émulation intellectuelle
              et citoyenne.
            </p>
          </div>

          <span className="w-fit rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-bold text-amber-700">
            ★ Label d'Excellence Ministériel
          </span>
        </div>


        {/* LES QUATRE CARTES */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

          {/* ATOUT 1 */}
          <article className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-2xl">
              📁
            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-900">
              Filières Générales
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Une formation adaptée aux ambitions académiques
              et professionnelles des élèves.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                Série A
              </span>

              <span className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                Série C
              </span>

              <span className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                Série D
              </span>
            </div>
          </article>


          {/* ATOUT 2 */}
          <article className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
              💡
            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-900">
              Corps Certifié
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Un encadrement pédagogique assuré par des enseignants
              qualifiés et expérimentés.
            </p>

            <span className="mt-5 inline-flex rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700">
              Titulaires de l'ENS
            </span>
          </article>


          {/* ATOUT 3 */}
          <article className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-2xl">
              💻
            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-900">
              Laboratoires & Web
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Des espaces dédiés aux sciences, au numérique
              et à l'apprentissage des nouvelles technologies.
            </p>

            <span className="mt-5 inline-flex rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
              Fibre optique
            </span>
          </article>


          {/* ATOUT 4 */}
          <article className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-2xl">
              👥
            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-900">
              Tutorat & Suivi
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Un accompagnement régulier pour suivre la progression
              et encourager la réussite de chaque élève.
            </p>

            <span className="mt-5 inline-flex rounded-lg bg-purple-50 px-3 py-2 text-xs font-semibold text-purple-700">
              Orientation active
            </span>
          </article>

        </div>
      </section>



    </div>
  );
}


