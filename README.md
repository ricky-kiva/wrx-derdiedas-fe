<p align="center">
  <img src="docs/assets/readme-logo-dark-1-1-c.png" alt="DerDieDas logo" width="192" />
</p>

<h1 align="center">DerDieDas</h1>

<p align="center">
  Learn German noun genders — search 88K+ nouns or play the ranked guessing game.
</p>

<p align="center">
  <a href="https://github.com/ricky-kiva/wrx-derdiedas-fe/actions/workflows/ci-pr.yaml"><img src="https://github.com/ricky-kiva/wrx-derdiedas-fe/actions/workflows/ci-pr.yaml/badge.svg" alt="CI status" /></a>
  <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/22-339933?logo=nodedotjs&logoColor=white" alt="Node.js 22" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/5.8.3-3178C6?logo=typescript&logoColor=white" alt="TypeScript 5.8.3" /></a>
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/19.1.0-61DAFB?logo=react&logoColor=black" alt="React 19.1.0" /></a>
  <a href="https://vite.dev/"><img src="https://img.shields.io/badge/7.0.0-646CFF?logo=vite&logoColor=white" alt="Vite 7.0.0" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/3.4.17-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS 3.4.17" /></a>
</p>

DerDieDas is a German noun-gender trainer. Search a noun to see its article (`der`, `die`, `das`), meanings, and similar words, or play the ranked guessing game and climb the global leaderboard.

This repository contains the frontend only. The API lives in the [backend repository](https://github.com/ricky-kiva/wrx-derdiedas-be).

## Screenshot

<p align="center">
  <img src="docs/assets/readme-page-home-1-1-c.jpg" alt="DerDieDas home page with the search form over a Neuschwanstein Castle background" width="100%" />
</p>

## Features

- Noun search across 88K+ German nouns, with meanings and similar-word matches.
- Ranked `der`/`die`/`das` guessing game with rule-based gender hints.
- Play as a guest, then sign in at the end to save the game's points.
- Global leaderboard with rank medals and pagination; points decay by 5 after 7 days without play.
- Google sign-in, display-name editing, point lookup, and account deletion.
- Responsive, animated UI built with Tailwind CSS, Framer Motion, and Lottie.

## Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server with HMR |
| `npm run build` | Type-check with `tsc -b` and build for production |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

## Architecture

- `src/components` — layout and feature components for the header, search and game forms, matches, modals, and footer.
- `src/services` — typed API modules for auth, users, nouns, games, and the leaderboard.
- `src/lib/api` — the Axios instance plus request/response interceptors that attach the access token and refresh it, retrying the failed request once.
- `src/providers` — React context providers for auth, modals, and toasts.
- `src/hooks` — shared hooks, including the Zustand game store and responsive helpers.
- `src/types` — Zod schemas and TypeScript types for API payloads and domain models.
- `src/commons/config` — environment configuration resolved from `window.__RUNTIME_CONFIG__` or Vite's `VITE_*` variables.

The app has two routes: `/` for search and `/game` for the guessing game. The leaderboard, gender-rules note, and user profile open as modals from the header.

## Notes

### Container Deployments

For container deployments, `public/env/runtime-config.js.template` is rendered by `scripts/docker/env/replace-runtime-config.sh` at startup, so `API_BASE` and `GOOGLE_CLIENT_ID` can be supplied per environment without rebuilding the image.

© 2026 Ricky Fadel M. All rights reserved.