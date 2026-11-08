const INTERDITS = ["/connexion", "/creer-compte", "/redirection", "/api"];

// Accepte uniquement un chemin interne du site (jamais une adresse externe).
export function cheminSur(valeur: string | null | undefined): string | null {
  if (!valeur) return null;
  if (!valeur.startsWith("/") || valeur.startsWith("//") || valeur.includes("\\")) {
    return null;
  }
  if (INTERDITS.some((p) => estDans(valeur, p))) return null;
  return valeur;
}

export function estDans(chemin: string, base: string): boolean {
  return (
    chemin === base ||
    chemin.startsWith(base + "/") ||
    chemin.startsWith(base + "?")
  );
}