-- ============================================================
-- Akieni College — Portail d'inscription
--
-- ============================================================


-- ------------------------------------------------------------
-- 1. Suppression des tables, si elles existent
-- ------------------------------------------------------------
DROP TABLE IF EXISTS demande, classe, compte;


-- ------------------------------------------------------------
-- 2. Création des tables
-- ------------------------------------------------------------

-- Les comptes qui se connectent au portail : les élèves et l'école
CREATE TABLE compte (
  id                serial       PRIMARY KEY,
  nom               varchar(100) NOT NULL,
  prenom            varchar(100) NOT NULL,
  email             varchar(255) NOT NULL UNIQUE,
  mot_de_passe_hash varchar(255) NOT NULL,  -- hash bcrypt, jamais le mot de passe en clair
  role              varchar(10)  NOT NULL DEFAULT 'eleve' CHECK (role IN ('eleve', 'ecole')),
  cree_le           timestamptz  NOT NULL DEFAULT now()
);

-- Les 8 classes d'Akieni College
CREATE TABLE classe (
  id                    serial      PRIMARY KEY,
  slug                  varchar(30) NOT NULL UNIQUE,  -- ex. 'premiere-c', utilisé dans l'adresse de la fiche
  niveau                varchar(10) NOT NULL CHECK (niveau IN ('seconde', 'premiere', 'terminale')),
  serie                 char(1)     NOT NULL CHECK (serie IN ('A', 'C', 'D')),
  libelle               varchar(30) NOT NULL,         -- nom affiché, ex. 'Première C'
  matieres_dominantes   text        NOT NULL,
  condition_admission   text        NOT NULL,
  inscriptions_ouvertes boolean     NOT NULL DEFAULT true,
  ordre                 smallint    NOT NULL,         -- ordre d'affichage dans la liste (1 à 8)
  UNIQUE (niveau, serie),
  CHECK (NOT (niveau = 'seconde' AND serie = 'D'))   -- pas de Seconde D
);

-- Les demandes d'inscription (une seule par élève)
CREATE TABLE demande (
  id                      serial       PRIMARY KEY,
  compte_id               integer      NOT NULL UNIQUE REFERENCES compte (id) ON DELETE CASCADE,
  classe_id               integer      NOT NULL REFERENCES classe (id),

  -- L'élève
  eleve_nom               varchar(100) NOT NULL,
  eleve_prenoms           varchar(150) NOT NULL,
  sexe                    char(1)      NOT NULL CHECK (sexe IN ('F', 'M')),
  date_naissance          date         NOT NULL,
  lieu_naissance          varchar(100) NOT NULL,
  nationalite             varchar(60)  NOT NULL,
  adresse_quartier        varchar(100) NOT NULL,
  adresse_ville           varchar(100) NOT NULL,
  telephone               varchar(20),

  -- Scolarité précédente
  etablissement_precedent varchar(150) NOT NULL,
  derniere_classe         varchar(50)  NOT NULL,
  moyenne_annuelle        numeric(4,2) NOT NULL CHECK (moyenne_annuelle BETWEEN 0 AND 20),
  moyenne_bepc            numeric(4,2) CHECK (moyenne_bepc BETWEEN 0 AND 20),  -- seulement pour une entrée en Seconde

  -- Responsable légal
  responsable_nom         varchar(100) NOT NULL,
  responsable_prenoms     varchar(150) NOT NULL,
  responsable_lien        varchar(10)  NOT NULL CHECK (responsable_lien IN ('pere', 'mere', 'tuteur')),
  responsable_telephone   varchar(20)  NOT NULL,
  responsable_email       varchar(255),

  -- Suivi de la demande
  statut                  varchar(12)  NOT NULL DEFAULT 'en_attente' CHECK (statut IN ('en_attente', 'validee', 'refusee')),
  envoyee_le              timestamptz  NOT NULL DEFAULT now(),
  traitee_le              timestamptz   -- date de la décision de l'école
);


-- ------------------------------------------------------------
-- 3. Sécurité Supabase
-- Supabase rend les tables du schéma public accessibles par son
-- API web. On active la sécurité par ligne (RLS) sans aucune règle :
-- l'API web ne peut plus ni lire ni modifier ces tables.
-- Notre application n'est pas concernée : elle se connecte
-- directement à la base avec l'adresse de connexion Supabase.
-- ------------------------------------------------------------
ALTER TABLE compte  ENABLE ROW LEVEL SECURITY;
ALTER TABLE classe  ENABLE ROW LEVEL SECURITY;
ALTER TABLE demande ENABLE ROW LEVEL SECURITY;


-- ------------------------------------------------------------
-- 4. Données : les 8 classes d'Akieni College
-- ------------------------------------------------------------
INSERT INTO classe (ordre, slug, niveau, serie, libelle, matieres_dominantes, condition_admission) VALUES
  (1, 'seconde-a',   'seconde',   'A', 'Seconde A',   'Lettres, langues et sciences humaines',                             'Être titulaire du BEPC'),
  (2, 'seconde-c',   'seconde',   'C', 'Seconde C',   'Mathématiques et sciences physiques',                               'Être titulaire du BEPC avec au moins 12/20 de moyenne, et au moins 13/20 en mathématiques, sciences physiques et SVT'),
  (3, 'premiere-a',  'premiere',  'A', 'Première A',  'Lettres, langues et sciences humaines',                             'Avoir terminé la Seconde A'),
  (4, 'premiere-c',  'premiere',  'C', 'Première C',  'Mathématiques et sciences physiques',                               'Avoir terminé la Seconde C'),
  (5, 'premiere-d',  'premiere',  'D', 'Première D',  'Sciences de la vie et de la Terre, mathématiques, physique-chimie', 'Avoir terminé la Seconde C'),
  (6, 'terminale-a', 'terminale', 'A', 'Terminale A', 'Lettres, langues et sciences humaines',                             'Avoir terminé la Première A'),
  (7, 'terminale-c', 'terminale', 'C', 'Terminale C', 'Mathématiques et sciences physiques',                               'Avoir terminé la Première C'),
  (8, 'terminale-d', 'terminale', 'D', 'Terminale D', 'Sciences de la vie et de la Terre, mathématiques, physique-chimie', 'Avoir terminé la Première D');
