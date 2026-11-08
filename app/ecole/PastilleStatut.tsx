import type { StatutDemande } from "@/lib/demandes";

const LIBELLES: Record<StatutDemande, string> = {
  en_attente: "En attente",
  validee: "Validée",
  refusee: "Refusée",
};

// Couleurs des statuts de la charte (app/globals.css)
const STYLES: Record<StatutDemande, string> = {
  en_attente: "bg-attente-fond text-attente",
  validee: "bg-validee-fond text-validee",
  refusee: "bg-refusee-fond text-refusee",
};

// Le statut est écrit en toutes lettres : la couleur ne porte pas seule le sens.
export function PastilleStatut({ statut }: { statut: StatutDemande }) {
  return (
    <span
      className={`inline-block whitespace-nowrap rounded-full px-3 py-1 text-sm font-semibold ${STYLES[statut]}`}
    >
      {LIBELLES[statut]}
    </span>
  );
}
