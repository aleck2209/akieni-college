import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    role?: "eleve" | "ecole";
  }
  interface Session {
    user: { id: string; role: "eleve" | "ecole" } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: "eleve" | "ecole";
  }
}