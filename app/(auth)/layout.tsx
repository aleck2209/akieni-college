import type { ReactNode } from "react";
import "./connexion/connexion.css";
import "./creer-compte/creer-compte.css";

// L'en-tête et le pied de page communs viennent de app/layout.tsx (issue #6).
export default function LayoutAuth({ children }: { children: ReactNode }) {
  return <div className="cx">{children}</div>;
}
