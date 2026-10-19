# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Thai-language reading site for the novel *Forcadia: The Shattered Ring* plus an encyclopedia of its world, with an `/admin` CMS. Next.js 16 App Router, React 19, Tailwind CSS 4, Prisma 7 on PostgreSQL (Neon in production, via Vercel).

## Commands

```bash
npm run dev                 # dev server
npm run build               # production build + TypeScript check
npm run lint                # ESLint
npx tsc --noEmit -p .       # type-check only
npm run validate:data       # consistency check of the static data in src/data
npx tsx --test scripts/database-config.test.ts   # the only unit test (node:test)
npm run db:migrate:deploy   # apply migrations (uses DIRECT_URL)
npm run db:seed             # upsert src/data/* into the database — OVERWRITES admin edits
npm run db:generate         # regenerate the Prisma client into src/generated/prisma
```

**WSL + Neon:** this WSL environment has no working IPv6, so Node times out connecting to Neon. Prefix any DB-touching command (dev server, migrate, seed, scripts) with:
`NODE_OPTIONS="--dns-result-order=ipv4first --no-network-family-autoselection"`

Production deploys run from the CLI (`vercel deploy --prod --yes`), not from Git; `.vercelignore` keeps `.env*` and `.impeccable/` out of uploads.

## Architecture

**Two sources of content, one shape.** Every public read goes through `src/lib/public-content.ts`. Each getter queries Prisma and, on any error, logs "Database unavailable … using bundled public content" and returns the static data from `src/data/*` mapped to the same shape as the Prisma result. Consequences:
- The site must render fully with no database; keep static data and DB shapes in sync when adding fields (fallbacks spread nullable lore fields as `null`).
- `src/data/*` is also the seed source (`prisma/seed.ts`) and presentation data (accents, emblems, artwork) that the DB rows are merged with by `slug`.
- Houses, characters and cities are sorted in the story's **canonical order** (the order in `src/data`), not by name — the home card fan numbering (I–VIII) and Night-Fall's "displaced" card depend on it.

**Character lore** (`src/data/character-lore.ts`) holds the extended per-sovereign fields. `characterLoreFieldNames`/`characterLoreFields` drive the Prisma columns (all nullable), the admin form fieldset (`components/admin/character-lore-fields.tsx`), the form parser (`lib/character-form.ts`) and the public `CharacterLoreSection`. Adding a lore field means: data file entry, Prisma column + migration, nothing else in the form/parser.

**Admin** (`src/app/admin`): HMAC-signed session cookie (`lib/admin-auth.ts`, needs `ADMIN_PASSWORD` and a ≥32-char `ADMIN_SESSION_SECRET`), login rate limiting in the DB, and `src/proxy.ts` rejecting cross-origin POSTs to `/admin/api/*`. Mutations are plain HTML form posts to route handlers under `src/app/admin/api/*` that redirect back with `?saved=1` / `?error=…` flags (success flags become toasts via `FlashToast`).

**DB connection**: `lib/prisma.ts` → `lib/database-config.ts`, which pins Supabase's root CA for `*.supabase.*` hosts (legacy) and passes other hosts through. `prisma.config.ts` uses `DIRECT_URL` for CLI work; the app uses `DATABASE_URL`.

## Design system ("The Ring Deck")

`DESIGN.md` (tokens + rules) and `PRODUCT.md` (audience, brand commitments) are authoritative; read them before UI work. Key rules enforced in `src/app/globals.css`:
- Wine "cloth" ground, card-stock surfaces with a foil inner frame; gold foil is a line or ink, never a gradient fill. Light and dark themes via `data-theme` on `<html>` (not the OS setting); Tailwind's `dark:` variant is bound to it.
- Tailwind `slate`/`amber` scales are re-cut into wine-tinted neutrals and foil tones, and light-theme overrides re-ink dark-first utilities — so existing utility classes (including admin) inherit the theme. House colour fields come from `data-house="<slug>"`.
- No eyebrow/kicker labels above headings, no Unicode glyphs as icons (use `src/components/icons.tsx`, incl. `SymbolIcon` for content symbols like ☀ ⌛ ≋).
- shadcn/ui primitives live in `src/components/ui/*` with colours mapped to these tokens in an `@theme inline` block; icons are swapped to the local icon set and the toaster follows the site theme (no `next-themes`, no `lucide-react`).
- Thai is the primary language. *Forcadia* is the novel's title; the empire is *Fourcadir* (จักรวรรดิโฟร์คาเดียร์).

Unused legacy code (not routed): `src/components/cinematic-home.*`, `src/components/archive/*`, the PascalCase files in `src/components/ui/` (HeroOverlay, InfoPanel …; the lowercase ones are shadcn), the 3D/`archive-*` CSS block, `src/store`, `src/hooks`.
