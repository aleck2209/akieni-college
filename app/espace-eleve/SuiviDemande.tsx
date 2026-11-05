import Link from "next/link";
import { documentsAApporter } from "../../lib/documents-a-apporter";
import type { DemandeEleve, StatutDemande } from "../../lib/demandes";

// PROVISOIRE : à remplacer par les contacts de la page d’accueil (F1)
const CONTACTS_LYCEE = {
  adresse: "Adresse du lycée (à compléter)",
  telephone: "Téléphone du lycée (à compléter)",
  email: "E-mail du lycée (à compléter)",
};

const LIBELLES_STATUT: Record<StatutDemande, string> = {
  en_attente: "En attente",
  validee: "Validée",
  refusee: "Refusée",
};

const STYLES_STATUT: Record<StatutDemande, string> = {
  en_attente: "bg-amber-100 text-amber-900",
  validee: "bg-green-100 text-green-900",
  refusee: "bg-red-100 text-red-900",
};

function formaterDate(date: Date): string {
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function SuiviDemande({ demande }: { demande: DemandeEleve | null }) {
  // Cas 1 : aucune demande
  if (demande === null) {
    return (
      <section className="space-y-4">
        <p className="text-slate-700">
          Vous n’avez pas encore déposé de demande d’inscription.
        </p>
        <Link
          href="/demande"
          className="inline-block rounded-md bg-blue-800 px-5 py-2.5 font-medium text-white hover:bg-blue-900"
        >
          Déposer ma demande
        </Link>
      </section>
    );
  }

  const { classe, envoyeeLe, statut } = demande;

  return (
    <section className="space-y-6">
      <dl className="space-y-3 rounded-md border border-slate-200 bg-white p-5">
        <div>
          <dt className="text-sm text-slate-500">Classe demandée</dt>
          <dd className="font-medium text-slate-900">{classe.libelle}</dd>
        </div>
        <div>
          <dt className="text-sm text-slate-500">Date d’envoi</dt>
          <dd className="font-medium text-slate-900">{formaterDate(envoyeeLe)}</dd>
        </div>
        <div>
          <dt className="text-sm text-slate-500">Statut</dt>
          <dd>
            <span
              className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${STYLES_STATUT[statut]}`}
            >
              {LIBELLES_STATUT[statut]}
            </span>
          </dd>
        </div>
      </dl>

      {/* Cas 2 : en attente */}
      {statut === "en_attente" ? (
        <p className="text-slate-700">Votre demande est en cours d’examen.</p>
      ) : null}

      {/* Cas 3 : validée */}
      {statut === "validee" ? (
        <div className="space-y-4">
          <p className="text-slate-700">
            Votre demande a été validée. Pour finaliser votre inscription,
            apportez ces documents au secrétariat du lycée :
          </p>
          <ul className="list-disc space-y-1 pl-6 text-slate-800">
            {documentsAApporter(classe.niveau).map((document) => (
              <li key={document}>{document}</li>
            ))}
          </ul>
          <p className="text-slate-700">
            Les frais d’inscription se règlent sur place, au secrétariat.
          </p>
        </div>
      ) : null}

      {/* Cas 4 : refusée */}
      {statut === "refusee" ? (
        <div className="space-y-4">
          <p className="text-slate-700">Votre demande n’a pas été retenue.</p>
          <div>
            <h2 className="font-semibold text-slate-900">Contacter le lycée</h2>
            <ul className="mt-2 space-y-1 text-slate-700">
              <li>{CONTACTS_LYCEE.adresse}</li>
              <li>{CONTACTS_LYCEE.telephone}</li>
              <li>{CONTACTS_LYCEE.email}</li>
            </ul>
          </div>
        </div>
      ) : null}
    </section>
  );
}
