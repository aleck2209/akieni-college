import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const user = req.auth?.user;
  const { pathname } = req.nextUrl;

  if (!user) {
    return NextResponse.redirect(new URL("/connexion", req.nextUrl));
  }
  if (pathname.startsWith("/ecole") && user.role !== "ecole") {
    return NextResponse.redirect(new URL("/eleve", req.nextUrl));
  }
  if (pathname.startsWith("/eleve") && user.role === "ecole") {
    return NextResponse.redirect(new URL("/ecole", req.nextUrl));
  }
});

export const config = { matcher: ["/eleve/:path*", "/ecole/:path*"] };