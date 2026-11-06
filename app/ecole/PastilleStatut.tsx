import type { StatutDemande } from "../../lib/demandes";

const LIBELLES: Record<StatutDemande, string> = {
  en_attente: "En attente",
  validee: "Validée",
  refusee: "Refusée",
};

const STYLES: Record<StatutDemande, string> = {
  en_attente: "bg-amber-100 text-amber-900",
  validee: "bg-green-100 text-green-900",
  refusee: "bg-red-100 text-red-900",
};

// Le statut est écrit en toutes lettres : la couleur ne porte pas seule le sens.
export function PastilleStatut({ statut }: { statut: StatutDemande }) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${STYLES[statut]}`}
    >
      {LIBELLES[statut]}
    </span>
  );
}
