# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Three audiences, all confirmed as primary:

- **Thai novel readers** who come to read *Forcadia: The Shattered Ring* chapter by chapter, resume where they stopped, and follow new chapters.
- **World-explorer fans** who dig into characters, the eight Houses, cities, lore, the glossary, Sovereign Keys and the timeline as much as the story itself.
- **First-time visitors** who have never heard of Forcadia and need to be drawn in and pointed at the first chapter.

A single author/admin also manages books, chapters, characters and Houses through `/admin`.

## Product Purpose

A Thai-language home for an original fantasy novel together with the encyclopedia of its world. Success means visitors become absorbed in the world: they keep moving between story and encyclopedia, spend long sessions exploring characters and lore, and come back.

## Positioning

The novel and its world live in one place. Reading a chapter and looking up the character, House, city or term it mentions are part of the same experience, built around the novel's own cast, eight Houses, crests and portraits.

## Operating Context

- Reading happens in a dedicated reader with adjustable theme, font size, line height and page width; progress and bookmarks are kept in `localStorage`.
- Content comes from Supabase PostgreSQL via Prisma, with static fallback data in `src/data` when the database is unreachable.
- Search covers content across the universe.

## Capabilities and Constraints

- Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4.
- Public routes: home, books, read, characters, houses, world, lore, glossary, sovereign-keys, timeline, gallery, library, search.
- Admin area for CRUD on books, chapters, characters, Houses and other content.
- Strict Content-Security-Policy in `next.config.ts`; external origins must be added deliberately.

## Brand Commitments

- **Thai first.** Body content and navigation are in Thai; English is used for proper names and small section labels.
- **Names.** *Forcadia* is the empire and the story title; *Fourcadir* is the imperial bloodline and appears in the site brand ("Fourcadir · Imperial Archive", "Codex of Fourcadir"). Both stay.
- **Both light and dark themes** remain, switchable by the reader.
- **Existing artwork** (House crests, nameplates, character portraits, the Unity Crown logo) is the visual source material.

## Evidence on Hand

- Crests: `public/images/crests-transparent/`, `public/images/crests-presentation/`
- House art: `public/images/houses/`, nameplates: `public/images/nameplates/`
- Portraits: `public/images/portraits/` (including `group.png`)
- Logos: `public/images/logos/` (Unity Crown webmarks)
- Story and world data: `src/data/*.ts`, plus database content.
- No reader testimonials, review quotes, readership numbers or press exist; none may be invented.

## Product Principles

1. The world is the product: every page should make the next discovery feel one step away.
2. Story and encyclopedia cross-link; neither is a dead end.
3. Reading comfort is never traded for spectacle on the reading surface.
4. Thai typography is the norm, not an afterthought.
5. Only real content and real artwork; nothing fabricated.
