import "server-only";
import { Pool } from "pg";

// Seul fichier qui ouvre la connexion à la base (guide Supabase §8).
// La connexion est partagée par toutes les requêtes. En développement, on la garde
// sur globalThis pour ne pas en ouvrir une nouvelle à chaque rechargement de page.
const g = globalThis as unknown as { pool?: Pool };

export const pool =
  g.pool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    max: 5,
  });

if (process.env.NODE_ENV !== "production") g.pool = pool;
