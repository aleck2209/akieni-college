import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { documentsAApporter } from "@/lib/documents-a-apporter";
import { CONTACTS_LYCEE } from "@/lib/contacts-lycee";
import type { DemandeEleve, StatutDemande } from "@/lib/demandes";

const LIBELLES_STATUT: Record<StatutDemande, string> = {
  en_attente: "En attente",
  validee: "Validée",
  refusee: "Refusée",
};

// Couleurs des statuts de la charte (app/globals.css), toujours avec leur libellé
const STYLES_STATUT: Record<StatutDemande, string> = {
  en_attente: "bg-attente-fond text-attente",
  validee: "bg-validee-fond text-validee",
  refusee: "bg-refusee-fond text-refusee",
};

// Date au format JJ/MM/AAAA, à l'heure de Brazzaville
function formaterDate(date: Date): string {
  return date.toLocaleDateString("fr-FR", { timeZone: "Africa/Brazzaville" });
}

// Cartes de la maquette : blanche pour les informations, colorée pour la décision
const carte = "mt-6 rounded-3xl border border-bordure bg-white p-6 sm:p-8";
const carteDecision = "mt-6 rounded-3xl p-6 sm:p-8";

export function SuiviDemande({ demande }: { demande: DemandeEleve | null }) {
  // Cas 1 : aucune demande
  if (demande === null) {
    return (
      <section className={carte}>
        <h2 className="text-xl font-semibold text-marine">Aucune demande pour le moment</h2>
        <p className="mt-2 text-texte-secondaire">
          Vous n’avez pas encore déposé de demande d’inscription.
        </p>
        <Link href="/demande" className="bouton mt-6 rounded-full">
          Déposer ma demande
        </Link>
      </section>
    );
  }

  const { classe, envoyeeLe, statut } = demande;

  return (
    <>
      {/* En-tête de la demande et statut actuel, comme dans la maquette */}
      <section className={`${carte} flex flex-col gap-6 md:flex-row md:items-center md:justify-between`}>
        <dl className="grid gap-x-12 gap-y-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-texte-secondaire">Classe demandée</dt>
            <dd className="mt-1 text-xl font-semibold text-marine">{classe.libelle}</dd>
          </div>
          <div>
            <dt className="text-sm text-texte-secondaire">Date d’envoi</dt>
            <dd className="mt-1 text-xl font-semibold text-marine">{formaterDate(envoyeeLe)}</dd>
          </div>
        </dl>
        <div className={`rounded-2xl px-5 py-4 ${STYLES_STATUT[statut]}`}>
          <p className="text-sm font-semibold">Statut</p>
          <p className="text-lg font-semibold">{LIBELLES_STATUT[statut]}</p>
        </div>
      </section>

      {/* Cas 2 : en attente */}
      {statut === "en_attente" ? (
        <section className={`${carteDecision} bg-attente-fond`}>
          <p className="text-lg font-semibold text-attente">
            Votre demande est en cours d’examen.
          </p>
        </section>
      ) : null}

      {/* Cas 3 : validée */}
      {statut === "validee" ? (
        <>
          <section className={`${carteDecision} bg-validee-fond`}>
            <p className="text-lg font-semibold text-validee">
              Félicitations, votre demande a été validée !
            </p>
            <p className="mt-2 text-texte">
              Pour finaliser votre inscription en {classe.libelle}, apportez les documents
              ci-dessous au secrétariat du lycée.
            </p>
          </section>

          <section className={carte}>
            <h2 className="text-xl font-semibold text-marine">
              Documents à apporter au secrétariat
            </h2>
            <ol className="mt-4 grid gap-3">
              {documentsAApporter(classe.niveau).map((document, index) => (
                <li
                  key={document}
                  className="flex items-center gap-3 rounded-2xl border border-bordure p-4"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-fond font-semibold text-marine"
                  >
                    {index + 1}
                  </span>
                  {document}
                </li>
              ))}
            </ol>
            <p className="mt-5 rounded-2xl bg-fond p-4 text-sm">
              Les frais d’inscription se règlent sur place, au secrétariat.
            </p>
          </section>
        </>
      ) : null}

      {/* Cas 4 : refusée */}
      {statut === "refusee" ? (
        <>
          <section className={`${carteDecision} bg-refusee-fond`}>
            <p className="text-lg font-semibold text-refusee">
              Votre demande n’a pas été retenue.
            </p>
          </section>

          <section className={carte}>
            <h2 className="text-xl font-semibold text-marine">Contacter le lycée</h2>
            <address className="mt-4 grid gap-1 not-italic">
              <span className="flex min-h-11 items-center gap-3">
                <MapPin size={18} aria-hidden="true" />
                {CONTACTS_LYCEE.adresse}
              </span>
              <a href={CONTACTS_LYCEE.lienTelephone} className="flex min-h-11 items-center gap-3 hover:underline">
                <Phone size={18} aria-hidden="true" />
                {CONTACTS_LYCEE.telephone}
              </a>
              <a href={`mailto:${CONTACTS_LYCEE.email}`} className="flex min-h-11 items-center gap-3 hover:underline">
                <Mail size={18} aria-hidden="true" />
                {CONTACTS_LYCEE.email}
              </a>
            </address>
          </section>
        </>
      ) : null}
    </>
  );
}
