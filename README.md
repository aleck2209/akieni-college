# Akieni College — Portail d'inscription

## Présentation du projet

Portail web d'inscription en ligne au lycée Akieni College (Livrable S22, Akieni Academy).

**Stack :** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, ESLint

**Authentification :** Auth.js, par e-mail et mot de passe. Depuis Next.js 16, le fichier `middleware.ts` s'appelle `proxy.ts` : c'est lui qui protège `/espace-eleve`, `/demande` et `/ecole`.

## Membres du groupe et comptes Git

_Chaque membre ajoute son nom, son rôle et ses comptes Git._

| Membre | Tache | Compte(s) Git |
|---|---|---|
| APEMBET-ALECK Virgile Yann | Deploiement | aleck2209 |
| ELENGA Messi Soleil | Feature | elengamessisoleil-hash |
| MBAMA-KIBANGOU Dieu Merci  | rendu & perf | mbamahonore15-sys |
| OKANA Todd Gusman Hashall | auth | toddokana645-tech |

## Lancer le projet en local

**Prérequis :** Node.js 20.9 ou plus récent, et npm.

Avant le premier lancement, copier `.env.example` en `.env.local`, puis y remplir `DATABASE_URL` avec l'adresse de connexion à la base, reçue en message privé. La commande `npx auth secret` ajoute ensuite `AUTH_SECRET`, la clé qui protège les sessions. Ce fichier n'est jamais commité : il contient le mot de passe de la base.

```bash
cp .env.example .env.local
npm install
npm run dev
```

Puis ouvrir [http://localhost:3000](http://localhost:3000).

| Commande | Rôle |
|---|---|
| `npm run dev` | Lance le serveur de développement |
| `npm run build` | Construit la version de production et affiche le type de rendu de chaque page |
| `npm run start` | Lance la version de production construite |
| `npm run lint` | Vérifie le code avec ESLint |

## Comptes de test

| Compte | E-mail | Mot de passe | Accès |
|---|---|---|---|
| Élève | `eleve@exemple.test` | `Motdepasse123` | Espace élève et demande d'inscription |
| École | `ecole@exemple.test` | `Motdepasse123` | Espace école |

Ils sont créés par `comptes-test.sql`, à lancer après `schemas.sql` dans le SQL Editor de Supabase. Ce sont des comptes de démonstration sur des données fictives : ne pas réutiliser ce mot de passe ailleurs.

## Rendu

| Page | Adresse | Rendu | Pourquoi |
|---|---|---|---|
| Accueil | `/` | SSG | Même contenu pour tous, qui ne change qu'au déploiement : la page est générée une seule fois, au build. |
| Liste des classes | `/classes` | ISR, 60 s | Très consultée, rarement modifiée : servie comme une page statique, elle se met à jour depuis la base sans redéploiement (`revalidate = 60`). |
| Fiche d'une classe | `/classes/[slug]` | ISR, 60 s | Les 8 fiches sont générées au build (`generateStaticParams`), puis mises à jour comme la liste. |
| Espace élève | `/espace-eleve` | SSR | Données propres à l'élève connecté, toujours à jour. |
| Espace école | `/ecole` | SSR | Demandes reçues, toujours à jour pour l'école. |

L'en-tête lit l'état de connexion côté navigateur : les pages publiques restent statiques.

Sortie de `npm run build`, qui confirme ce tableau : `captures/next-build.png`.

## Audit Lighthouse

Audit en mode mobile, sur l'URL de production.

| Catégorie | Score | Objectif |
|---|---|---|
| Performance | _à mesurer_ | 80 minimum |
| Accessibility | _à mesurer_ | 80 minimum |

Capture du rapport : `captures/lighthouse-mobile.png`.

## Déploiement

### URL de production

_À compléter par Déploiement._

### Checklist de déploiement

_À compléter par Déploiement._
