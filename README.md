# Akieni College — Portail d'inscription

Portail web d'inscription en ligne au lycée Akieni College (Livrable S22, Akieni Academy).

## Prérequis

- Node.js 20.9 ou plus récent
- npm

## Lancer le projet en local

```bash
npm install
npm run dev
```

Puis ouvrir [http://localhost:3000](http://localhost:3000).

## Scripts

| Commande | Rôle |
|---|---|
| `npm run dev` | Lance le serveur de développement |
| `npm run build` | Construit la version de production et affiche le type de rendu de chaque page |
| `npm run start` | Lance la version de production construite |
| `npm run lint` | Vérifie le code avec ESLint |

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS 4
- ESLint

## Rendu et performances

### 1. Page d'accueil — SSG

La page d'accueil (`/`) utilise le **Static Site Generation (SSG)**.

Elle est pré-générée sous forme de HTML pendant la compilation du projet. Cette stratégie permet de fournir rapidement le contenu aux visiteurs et d'améliorer les performances de chargement.

### 2. Liste et détails des classes — ISR

Les pages suivantes utilisent l'**Incremental Static Regeneration (ISR)** :

- `/classes`
- `/classes/[niveau]`

La propriété `revalidate = 60` permet à Next.js de réactualiser les pages après un intervalle de 60 secondes, lorsqu'une nouvelle requête déclenche leur régénération.

Cette stratégie permet de bénéficier des avantages des pages statiques tout en permettant l'actualisation périodique du contenu.

### 3. Espaces élève et administration — SSR

Les pages suivantes utilisent le **Server-Side Rendering (SSR)** :

- `/espace-eleve`
- `/administration`

La configuration `dynamic = "force-dynamic"` demande à Next.js de générer ces pages côté serveur à chaque requête.

Cette stratégie est adaptée aux espaces personnalisés dont le scontenu peut dépendre de l'utilisateur connecté et des données disponibles.

### 4. Optimisation des images avec next/image

Le projet utilise le composant `Image` de `next/image` fourni par Next.js.

Cette solution permet notamment :
- L'optimisation des images.
- L'adaptation des images aux différentes tailles d'écran.
- Le chargement optimisé des images.
- Une meilleure maîtrise de l'affichage des images.

Les images locales sont stockées dans le dossier `public/images/`.

### 5. Audit Lighthouse — Mobile

Un audit Lighthouse a été réalisé avec Google Chrome en mode Mobile.

Résultats obtenus :

| Indicateur | Score | Objectif |
|---|---:|---:|
| Performance | 84/100 | ≥ 80 |
| Accessibilité | 96/100 | ≥ 80 |
| Bonnes pratiques | 96/100 | — |
| SEO | 100/100 | — |

Les objectifs minimums de performance et d'accessibilité fixés pour le livrable S22 sont atteints.

### 6. Preuve de l'audit

La capture d'écran complète des résultats Lighthouse est disponible dans le dossier :

`captures/lighthouse-mobile.png`

## Rendu et performances

### Stratégies de rendu

- **SSG — Accueil (`/`) :** la page d'accueil est générée à la compilation.
- **ISR — Classes (`/classes` et `/classes/[niveau]`) :** les pages sont régénérées après 60 secondes grâce à `revalidate = 60`.
- **SSR — Espaces (`/espace-eleve` et `/administration`) :** les pages sont rendues dynamiquement côté serveur grâce à `dynamic = "force-dynamic"`.

### Optimisation des images

Les images sont intégrées avec `next/image` afin de bénéficier de l'optimisation proposée par Next.js.

### Résultats Lighthouse (mobile)

- Performance : 84
- Accessibilité : 96
- Bonnes pratiques : 96
- SEO : 100

Les objectifs minimaux de 80 en Performance et en Accessibilité sont atteints.

### Capture Lighthouse

Voir : `captures/lighthouse-mobile.png`.

