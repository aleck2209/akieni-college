-- ============================================================
-- Akieni College — Comptes de test (issue #13)
--
-- À lancer après schemas.sql, dans le SQL Editor de Supabase.
-- Mot de passe des deux comptes : Motdepasse123, chiffré avec bcrypt.
-- Ce sont des comptes de démonstration : ce mot de passe n'est pas un secret.
-- Relancer le script remet les deux comptes dans leur état de départ.
-- ============================================================

INSERT INTO compte (nom, prenom, email, mot_de_passe_hash, role) VALUES
  ('MALONGA',        'Grâce',       'eleve@exemple.test', '$2b$10$adhRoIU/ZiSl1Z0iZ4XQJ.On1SlEzqqT1MBM.ApYHI.NugadHSrDu', 'eleve'),
  ('AKIENI COLLEGE', 'Secrétariat', 'ecole@exemple.test', '$2b$10$rm99JA.oo/lQAGbSv3L8hO0OMA8YZrfrCrlAjUwvpwikR4KWNS1Na', 'ecole')
ON CONFLICT (email) DO UPDATE SET
  nom               = EXCLUDED.nom,
  prenom            = EXCLUDED.prenom,
  mot_de_passe_hash = EXCLUDED.mot_de_passe_hash,
  role              = EXCLUDED.role;
