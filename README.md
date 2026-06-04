# Briticana Website

Next.js 14 (App Router) marketing site and embedded Sanity Studio for **Briticana** — an internship experience and startup showcase platform.

## Tech stack

- **Next.js 14** with the App Router and **TypeScript**
- **Bootstrap 5** (CSS via `globals.css`) and **react-bootstrap** for interactive UI (no Bootstrap JS bundle)
- **Sanity CMS v3** with `next-sanity`, `@sanity/image-url`, and embedded Studio at `/studio`
- **React 18**

## Prerequisites

- Node.js 20+ recommended
- npm

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Environment variables**

   - Copy `.env.example` to `.env.local` (or edit the committed template locally).
   - Fill in:
     - `NEXT_PUBLIC_SANITY_PROJECT_ID` — Sanity project ID
     - `NEXT_PUBLIC_SANITY_DATASET` — defaults to `production` in the template
     - `SANITY_API_TOKEN` — only needed for draft/private content or write clients (keep server-side)
     - `NEXT_PUBLIC_SITE_URL` — canonical site URL for metadata and absolute links later

3. **Sanity project**

   - Create a project at [sanity.io](https://www.sanity.io/) if you do not have one.
   - From the repo root you can run `npx sanity@latest init` **or** attach this codebase to an existing project by setting the env vars above.
   - Deploy schemas from `/sanity/schemas` by running Studio locally (`npm run dev` → `/studio`) and publishing the configured document types.
   - **CORS:** In [Sanity Manage](https://www.sanity.io/manage) → your project → **API** → **CORS origins**, add `http://localhost:3000` and your production site origin so Studio and the Next app can call the API.

4. **Run the dev server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000). Sanity Studio is at [http://localhost:3000/studio](http://localhost:3000/studio).

## Folder structure (high level)

- `src/app` — App Router pages (marketing routes + embedded Studio)
- `src/components` — Feature and layout components grouped by area (`home`, `internships`, `programs`, `verification`, `dashboard`, `shared`, `layout`)
- `src/lib/sanity` — Sanity client, GROQ query strings, and TypeScript document shapes
- `src/styles` — `globals.css` (Bootstrap import + light global tokens)
- `sanity/schemas` — Sanity schema definitions and registry

## CMS access

- Editors open **`/studio`** on the deployed site or local dev server.
- Content types include **home page** (marketing hero), **internship domains** (categories referenced by internships), internships, testimonials, FAQs, startup partners, site settings, and demo student records for verification. See [docs/sanity-seed.md](docs/sanity-seed.md) for optional seed examples.

## Who is working on what

- **Developer 1:** _Add your focus areas here (e.g. marketing pages, Sanity content modelling)._
- **Developer 2:** _Add your focus areas here (e.g. dashboard demo UI, verification flow)._

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start Next.js in dev     |
| `npm run build` | Production build         |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint (Next config) |
