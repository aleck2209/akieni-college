import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "./auth.config";

// Depuis Next.js 16, le fichier middleware.ts s'appelle proxy.ts.
// Il vérifie seulement la session : il ne lit jamais la base.
const { auth } = NextAuth(authConfig);

const ESPACE_ELEVE = "/espace-eleve";
const ESPACE_ECOLE = "/ecole";

export default auth((req) => {
  const user = req.auth?.user;
  const { pathname, search } = req.nextUrl;

  // Visiteur : vers la connexion, puis retour à la page demandée.
  if (!user) {
    const url = new URL("/connexion", req.nextUrl);
    url.searchParams.set("callbackUrl", pathname + search);
    return NextResponse.redirect(url);
  }

  // L'espace école est réservé au compte de l'école.
  if (pathname.startsWith(ESPACE_ECOLE) && user.role !== "ecole") {
    return NextResponse.redirect(new URL(ESPACE_ELEVE, req.nextUrl));
  }

  // L'espace élève et la demande d'inscription sont réservés aux élèves.
  if (!pathname.startsWith(ESPACE_ECOLE) && user.role === "ecole") {
    return NextResponse.redirect(new URL(ESPACE_ECOLE, req.nextUrl));
  }
});

export const config = {
  matcher: ["/espace-eleve/:path*", "/demande/:path*", "/ecole/:path*"],
};
