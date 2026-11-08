// Badge « Inscriptions ouvertes » ou « Inscriptions fermées » (liste et fiche des classes).
export default function BadgeInscriptions({ ouvertes }: { ouvertes: boolean }) {
  return ouvertes ? (
    <span className="inline-flex w-fit rounded-full bg-validee-fond px-3 py-1 text-sm font-semibold text-validee">
      Inscriptions ouvertes
    </span>
  ) : (
    <span className="inline-flex w-fit rounded-full bg-ferme-fond px-3 py-1 text-sm font-semibold text-ferme">
      Inscriptions fermées
    </span>
  );
}
