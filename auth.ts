import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { pool } from "@/lib/db";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        const email = String(credentials?.email ?? "").trim().toLowerCase();
        const motDePasse = String(credentials?.password ?? "");
        if (!email || !motDePasse) return null;

        const { rows } = await pool.query(
          "SELECT id, nom, prenom, email, mot_de_passe_hash, role FROM compte WHERE email = $1",
          [email]
        );
        const compte = rows[0];
        if (!compte) return null;

        const ok = await bcrypt.compare(motDePasse, compte.mot_de_passe_hash);
        if (!ok) return null;

        // L'élève et l'école se connectent de la même façon : le rôle vient de la base.
        return {
          id: String(compte.id),
          name: `${compte.prenom} ${compte.nom}`,
          email: compte.email,
          role: compte.role,
        };
      },
    }),
  ],
});