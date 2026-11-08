"use client";

import { useState, useTransition } from "react";
import { decider } from "./actions";

type Decision = "validee" | "refusee";

const STYLES: Record<Decision, string> = {
  validee: "border-validee bg-validee hover:opacity-90",
  refusee: "border-refusee bg-refusee hover:opacity-90",
};

// Boutons « Valider » et « Refuser », avec une confirmation avant la décision,
// car une demande traitée ne peut plus être modifiée.
export function BoutonsDecision({ id, nomEleve }: { id: number; nomEleve: string }) {
  const [choix, setChoix] = useState<Decision | null>(null);
  const [enCours, demarrer] = useTransition();

  if (choix === null) {
    return (
      <div className="flex flex-wrap gap-3">
        <button type="button" className={`bouton rounded-full ${STYLES.validee}`} onClick={() => setChoix("validee")}>
          Valider
        </button>
        <button type="button" className={`bouton rounded-full ${STYLES.refusee}`} onClick={() => setChoix("refusee")}>
          Refuser
        </button>
      </div>
    );
  }

  const valider = choix === "validee";

  return (
    <div role="group" aria-labelledby="confirmation-titre" className="rounded-2xl bg-fond p-5">
      <p id="confirmation-titre" className="font-semibold">
        {valider ? "Valider" : "Refuser"} la demande de {nomEleve} ?
      </p>
      <p className="mt-1 text-sm text-texte-secondaire">
        Cette décision est définitive : la demande ne pourra plus être modifiée.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          className="bouton bouton-secondaire rounded-full"
          disabled={enCours}
          onClick={() => setChoix(null)}
        >
          Annuler
        </button>
        <button
          type="button"
          className={`bouton rounded-full ${STYLES[choix]}`}
          disabled={enCours}
          onClick={() => demarrer(() => decider(id, choix))}
        >
          {enCours ? "Enregistrement…" : valider ? "Confirmer la validation" : "Confirmer le refus"}
        </button>
      </div>
    </div>
  );
}
