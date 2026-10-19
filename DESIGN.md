---
name: Forcadia
description: The Ring Deck. A Thai fantasy novel and its world encyclopedia, laid out as a tarot reading on wine-velvet cloth.
colors:
  cloth: "#2a0f1f"
  cloth-deep: "#1d0915"
  stock: "#331a2a"
  stock-edge: "#4a2639"
  ink: "#f5ecf1"
  ink-muted: "#b89fae"
  foil: "#e0b95f"
  foil-pale: "#ecd08a"
  foil-cream: "#f5e3b3"
  foil-line: "rgba(224, 185, 95, 0.42)"
  wine: "#7d1f45"
  wine-ink: "#22101b"
  bone: "#f4ebe2"
  bone-ink: "#24141d"
  bone-ink-soft: "#4a3540"
  card-foil: "#b98a2e"
  card-index-red: "#8a2a3c"
  card-band-wine: "#6d1d3c"
  deck-box: "#4a1430"
  cloth-light: "#ece6ee"
  cloth-deep-light: "#e0d7e3"
  stock-light: "#f8f3f2"
  stock-edge-light: "#d7c7c9"
  bone-light: "#fbf7f3"
  ink-light: "#1f1419"
  ink-muted-light: "#5d4a55"
  foil-light: "#8a6420"
  foil-deep-light: "#6e4c12"
  foil-line-light: "rgba(138, 100, 32, 0.45)"
  action-light: "#5e1834"
  action-hover-light: "#7d2347"
  action-ink-light: "#fbefe0"
  house-saint-cross: "#d9a21f"
  house-saint-cross-ink: "#1f1206"
  house-paradise-swan: "#2836a8"
  house-venom-veil: "#1d5e45"
  house-void-requiem: "#463a6e"
  house-azure-song: "#136f80"
  house-royal-flush: "#b3233c"
  house-iron-bastion: "#46525e"
  house-night-fall: "#15111c"
  on-field: "#fbf3ec"
  reader-night: "#1d0f19"
  reader-night-ink: "#ecdfe6"
typography:
  display:
    fontFamily: "Chonburi, Noto Serif Thai, Georgia, serif"
    fontSize: "clamp(2.25rem, 4.2vw, 3.6rem)"
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: "0"
  headline:
    fontFamily: "Chonburi, Noto Serif Thai, Georgia, serif"
    fontSize: "3.75rem"
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: "0"
  headline-section:
    fontFamily: "Chonburi, Noto Serif Thai, Georgia, serif"
    fontSize: "3rem"
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: "0"
  title:
    fontFamily: "Chonburi, Noto Serif Thai, Georgia, serif"
    fontSize: "1.2rem"
    fontWeight: 400
    lineHeight: 1.3
  title-serif:
    fontFamily: "Noto Serif Thai, Georgia, serif"
    fontSize: "1.15rem"
    fontWeight: 600
    lineHeight: 1.45
  reading:
    fontFamily: "Noto Serif Thai, Georgia, serif"
    fontSize: "clamp(1.15rem, 1.5vw, 1.35rem)"
    fontWeight: 400
    lineHeight: 1.9
    letterSpacing: "0.005em"
  body:
    fontFamily: "Noto Sans Thai, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  index:
    fontFamily: "Chonburi, Georgia, serif"
    fontSize: "0.8rem"
    fontWeight: 400
    letterSpacing: "0.16em"
    fontFeature: "lnum"
  label:
    fontFamily: "Noto Sans Thai, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    letterSpacing: "0.14em"
rounded:
  pin: "0.6rem"
  arcana: "0.8rem"
  frame: "0.9rem"
  chapter: "1.1rem"
  card: "1.2rem"
  lead: "1.4rem"
  reader: "1.5rem"
  closing: "1.6rem"
  pill: "999px"
spacing:
  frame-portrait: "5px"
  frame-stock: "7px"
  frame-chapter: "8px"
  frame-reader: "10px"
  frame-lead: "12px"
  gutter: "1.25rem"
  card-gap: "1.5rem"
  card-pad: "1.6rem 1.5rem"
  lead-pad: "clamp(2rem, 4vw, 3.25rem)"
  section: "5rem"
  section-lg: "7rem"
  container: "1200px"
components:
  button-action:
    backgroundColor: "{colors.action-light}"
    textColor: "{colors.action-ink-light}"
    rounded: "{rounded.pill}"
    padding: "0 2rem"
    height: "3rem"
  button-action-hover:
    backgroundColor: "{colors.action-hover-light}"
  button-lead:
    backgroundColor: "{colors.cloth}"
    textColor: "{colors.foil-cream}"
    rounded: "{rounded.pill}"
    padding: "0 1.75rem"
    height: "3.25rem"
  button-lead-hover:
    backgroundColor: "{colors.wine}"
  button-quiet:
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 1.75rem"
    height: "3rem"
  card-stock:
    backgroundColor: "{colors.stock}"
    textColor: "{colors.ink}"
    rounded: "{rounded.closing}"
    padding: "1.5rem"
  card-lead:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.bone-ink}"
    rounded: "{rounded.lead}"
    padding: "{spacing.lead-pad}"
    width: "31rem"
    height: "43rem"
  card-chapter:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.bone-ink}"
    rounded: "{rounded.chapter}"
    padding: "{spacing.card-pad}"
    height: "17rem"
  card-arcana-back:
    backgroundColor: "{colors.deck-box}"
    rounded: "{rounded.arcana}"
    width: "8.5rem"
  card-arcana-face:
    backgroundColor: "{colors.house-royal-flush}"
    textColor: "{colors.on-field}"
    rounded: "{rounded.arcana}"
    padding: "0.7rem 0.5rem 0.8rem"
    width: "8.5rem"
  card-house-arcanum:
    backgroundColor: "{colors.house-paradise-swan}"
    textColor: "{colors.on-field}"
    rounded: "{rounded.card}"
    padding: "1.5rem 1.25rem 1.75rem"
  card-portrait:
    backgroundColor: "{colors.house-venom-veil}"
    textColor: "{colors.on-field}"
    rounded: "{rounded.card}"
    padding: "0.6rem"
  reader-card-night:
    backgroundColor: "{colors.reader-night}"
    textColor: "{colors.reader-night-ink}"
    rounded: "{rounded.reader}"
    padding: "4rem 3.5rem"
  reader-card-paper:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.bone-ink}"
    rounded: "{rounded.reader}"
    padding: "4rem 3.5rem"
  map-tip:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.bone-ink}"
    rounded: "0.7rem"
    padding: "0.6rem 0.85rem"
  nav-link:
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1rem"
  nav-link-active:
    textColor: "{colors.foil-cream}"
---

# Design System: Forcadia

## Overview

**Creative North Star: "The Ring Deck"**

Every page is a card reading. The ground is a wine-velvet reading cloth, and everything that carries content is a printed card laid on it. The prologue is card 0, The Empty Throne, a large bone-stock card set at a slight tilt. The eight imperial Houses are eight major arcana fanned in a broken ring beside it. Night-Fall's card has slipped out of the ring, because its throne is the empty one. Characters are portrait arcana printed on their House's colour field, chapters are bone cards with their order set in a foot band, and the reader is one printed card. The admin and every legacy utility inherit the same cloth because the Tailwind neutral and amber scales are re-cut to the world's own tones.

The density is that of a table spread, not a dashboard. A few large cards with generous cloth between them. Ornament comes from the cards' own furniture: thin gold-foil inner frames, mirrored Roman-numeral corner indices, crosshatched card backs. The colour comes from the House fields. Gold foil appears only as a line or as ink, and it is never a fill or a gradient. The world rejects the default fantasy-site template of a dark hero with gold serif type above a row of equal cards.

The only imagery is real artwork. That means the House crests, the character portraits, the Unity Crown webmark on card backs, and the painted empire map at `public/images/empire/empire-map.webp`, which the user supplied. Icons are a small authored SVG set drawn in a 1.6 stroke, and the world's content symbols are drawn as SVG paths rather than font glyphs.

**Key Characteristics:**
- Wine cloth ground in dark (#2a0f1f) and lilac linen in light (#ece6ee), with a faint fractal-noise weave and a wine glow at the top
- Every surface is card stock with a 1px gold-foil inner frame set 5 to 12px in from the edge
- Eight House colour fields keyed by `data-house`, each printed full-bleed on its arcana
- Chonburi, a looped Thai display face, for titles and indices. Noto Serif Thai for reading. Noto Sans Thai for interface text.
- Roman-numeral indices, with labels set below titles or in card foot bands, never above
- One authored motion: a card lifts, or turns over, on ease-out-expo

## Colors

The palette is a tinted cloth, card stock in two weights (wine stock and bone), gold foil kept to lines and ink, and eight saturated House fields that carry all the chroma.

### Primary
- **Wine Velvet Cloth** (cloth): the page ground in dark. The body adds a radial wine glow (`wine` at 28%) from the top and a 5% fractal-noise weave over it. Its deeper shade (cloth-deep) is used for the footer, the chapter-row band, the more menu and scrollbar tracks.
- **Lilac Linen** (cloth-light): the same ground in light theme. Its deeper shade (cloth-deep-light) plays the same banding role.

### Secondary
- **Gold Foil** (foil; light theme: foil-light, a darker bronze for contrast): used as ink and as line. It sets indices, link-hover text, the latest-chapter outline, the text caret, era numerals and the `.gold-text` colour. **Foil Line** (foil-line) is the semi-opaque version used for every inner card frame, quiet-button border, dialogue rule and divider.
- **Pale Foil** (foil-pale) and **Foil Cream** (foil-cream): headline and active-navigation ink on dark grounds, the dark-theme focus ring, and text on the deck-box cover.

### Tertiary: House fields
Each House owns one full colour field. Text on the field uses `on-field` (#fbf3ec), except Saint-Cross, whose saffron field takes the dark `house-saint-cross-ink`.
- **Saint-Cross Saffron** (house-saint-cross)
- **Paradise-Swan Ultramarine** (house-paradise-swan)
- **Venom-Veil Viridian** (house-venom-veil)
- **Void-Requiem Slate Violet** (house-void-requiem)
- **Azure-Song Teal** (house-azure-song)
- **Royal-Flush Vermilion** (house-royal-flush)
- **Iron-Bastion Gunmetal** (house-iron-bastion)
- **Night-Fall Eclipse** (house-night-fall)

### Neutral
- **Wine Stock** (stock, edge stock-edge; light: stock-light / stock-edge-light): the default card surface for panels, the closing card and city cards.
- **Bone Stock** (bone, ink bone-ink, soft ink bone-ink-soft; light: bone-light): text cards. These are the lead card, chapter cards, map tooltips and the paper reader theme. Bone stays bone in both themes.
- **Cloth Ink** (ink / ink-muted; light: ink-light / ink-muted-light): body and secondary text on the cloth.
- **Wine Action** (action-light, hover action-hover-light, ink action-ink-light): the filled action colour in light theme. In the dark-theme lead card the action is a cloth-coloured pill that turns `wine` on hover.
- **Lead Card Furniture**: card-foil is the printed frame line on bone stock. card-index-red sets the corner indices. card-band-wine sets the foot-band text.
- **Deck Box** (deck-box): card backs and book covers, crosshatched with 1px foil lines at 45 and -45 degrees. It stays dark in both themes.

### Named Rules
**The Foil Is a Line Rule.** Gold foil is a stroke or an ink colour: a frame, a rule, an outline, an index, a hatch line. It is never a background fill, a gradient or a glow. If foil covers an area, the card is wrong.

**The Re-cut Scale Rule.** Tailwind's `slate-50…950` and `amber-50…500` are redefined in `@theme` as wine-tinted neutrals and foil tones. In light theme, `text-slate-*`, `text-amber-*`, `border-white/*` and `bg-white/5` are re-inked to the cloth's own inks. Utility classes therefore stay in-world, including in the admin. New code should use these scales rather than raw Tailwind greys or new hex values.

**The House Field Rule.** A House colour is used only as a full field (`var(--field)`) on that House's own card, with `var(--on-field)` text and an inner frame drawn from on-field at 35 to 45%. House colours are not used as accents on cloth.

## Typography

**Display Font:** Chonburi (with Noto Serif Thai, Georgia)
**Body Font:** Noto Sans Thai (with ui-sans-serif, system-ui)
**Reading Font:** Noto Serif Thai (with Georgia)

All three are self-hosted through @fontsource. Chonburi ships at 400 only. Noto Sans Thai ships at 400, 500, 600 and 700. Noto Serif Thai ships at 400, 600 and 700.

**Character:** Chonburi is a high-contrast Thai display face with looped terminals, which gives titles the feel of printed card faces. The Noto pair keeps long Thai reading calm and legible.

### Hierarchy
- **Display** (Chonburi 400, clamp(2.25rem, 4.2vw, 3.6rem), 1.12): the lead card's prologue title only.
- **Headline** (Chonburi 400, 2.25rem to 3.75rem, 1.25, balanced wrap): page `h1`s. Section `h2`s run 1.875rem to 3rem.
- **Title** (Chonburi 400, 1.2 to 1.45rem): portrait and House arcanum names. Chapter-card titles are `h3`s in Noto Serif Thai at 1.15rem / 1.45.
- **Reading** (Noto Serif Thai 400, clamp(1.15rem, 1.5vw, 1.35rem), 1.9): the lead card's opening lines and the novel reader. Paragraphs have no indent and a 1.35rem gap. Dialogue sits behind a 1px foil-line rule on the left.
- **Body** (Noto Sans Thai 400, 1rem, 1.7): interface text and ledes. Ledes cap at 34rem with line-height 1.85.
- **Index** (Chonburi, 0.72 to 1rem, 0.16em tracking, lining numerals): Roman numerals, card-0 corners and uppercase foot bands.
- **Label** (Noto Sans Thai, 0.75rem, 0.14em, uppercase, 85% opacity): the House name on a portrait card and the emblem name on a House arcanum. Labels always sit below the title.

### Named Rules
**The Label Below Rule.** No eyebrow or kicker line sits above a heading. A category, House, emblem or order label goes under the title or into the card's foot band (`lead-card-band`, `chapter-card-band`). The `.section-kicker` class is kept only to hide any leftover markup (`display: none`).

**The Roman Index Rule.** Order is shown as an arcana index: a Roman numeral (I–XII) or 0 for the prologue, set in Chonburi with 0.16em tracking. Arabic counters are not used in their place.

## Layout

There is one master container: `min(1200px, 100% - 2.5rem)`, which gives a 1.25rem gutter. Pages differ by spread, not by grid. The home first viewport is a two-column deck table (0.95fr / 1.05fr, gap clamp(2rem, 4vw, 4rem)) at `100svh - 4.5rem`. It holds the lead card on the left (31rem by up to 43rem, rotated -1.6deg) and the arcana fan on the right. The fan places eight 5:8 cards (6.5 to 8.5rem wide) on a 13deg arc, rotating each about a point 210% below its own centre.

Below the fold, spreads use a three-part head (title, lede, link, aligned to the end). The character spread has four columns with even cards dropped 2.5rem, so it reads as a laid-out hand. The chapter row is an auto-fill grid of 12.5rem cards on a cloth-deep band. The era spread is 0.8fr / 1.2fr with a ruled list. The House arcana grid has four columns with a 1.5rem gap. Sections breathe at 5rem to 7rem vertically.

Responsive behaviour:
- At ≤1023px, spreads go to one column and the lead card loses its tilt. The fan becomes a 4-column grid of face-up cards, because touch has no hover to turn them. Characters and Houses drop to two columns.
- At ≤560px and ≤520px, everything is one column. Arcana names scale with container queries.
- At ≤767px, the empire map sits in a horizontal scroller at a fixed 760px width.

## Elevation & Depth

Depth is physical: cards cast soft, low, wine-tinted shadows onto the cloth, the way paper rests on a table. In dark theme the shadows are near-black wine (rgba(8,2,6)). In light theme they are mauve (rgba(60,22,38)). There are no glows and no glass blur on content cards. Only the sticky header uses a translucent ground with `backdrop-blur`.

### Shadow Vocabulary
- **Card at rest** (`0 18px 40px -12px rgba(8,2,6,.7), 0 4px 10px rgba(8,2,6,.35)`; light `0 16px 34px -14px rgba(60,22,38,.32), 0 3px 8px rgba(60,22,38,.12)`): every stock, portrait, chapter, House and map card.
- **Card lifted** (`0 30px 50px -18px rgba(8,2,6,.7), 0 8px 16px rgba(8,2,6,.3)`): the hover and focus state of the lift.
- **Lead card** (`0 50px 80px -30px rgba(8,2,6,.8), 0 12px 24px rgba(8,2,6,.35)`): card 0 sits highest on the table.
- **Arcana** (`0 18px 26px -14px rgba(8,2,6,.75), 0 3px 6px rgba(8,2,6,.35)`): the small fanned cards.
- **Crest drop** (`drop-shadow(0 10px 14px rgba(0,0,0,.35))`): crests printed on fields.

### Named Rules
**The One Lift Rule.** The world has one authored motion. A card lifts off the cloth: translateY(-6px), rotate(-0.6deg), a deeper shadow and a foil-line edge, over 420ms on ease-out-expo `cubic-bezier(0.16, 1, 0.3, 1)`. An arcana card lifts 2.25rem, scales to 1.08 and turns over in 620ms to show its crest. Colour changes take 200ms ease. Nothing else animates. Under `prefers-reduced-motion`, card backs are removed so faces show flat, the lead card loses its tilt, and every transition collapses to 0.01ms.

## Shapes

Shapes follow playing-card stock: rounded rectangles in a 5:8 or tall portrait ratio, with gently rounded corners (0.8rem on small arcana, 1.1 to 1.6rem on large cards). Pills (999px) are reserved for buttons, navigation and the skip link. Every card carries an inner frame, a 1px line inset 5 to 12px and rounded slightly tighter than the card. The lead card doubles it with a 1.5px frame at 12px and a 1px frame at 17px. Card backs use an outline at -7px or -9px over the crosshatch. Era plates are circular seals: a foil ring with a dashed inner ring at 14px. Portraits sit in 4:5 windows rounded at 0.8rem.

**The Inner Frame Rule.** A surface is a card only if it has a foil (or on-field) inner frame line. A bare rounded box with a border is not part of this world.

## Components

### Buttons
- **Shape:** full pill (999px), min-height 3rem (3.25rem on the lead card), bold Noto Sans Thai, with an arrow icon that slides on hover.
- **Action:** filled. In light theme it is wine (action-light) with cream ink and hovers to action-hover-light. On the lead card it is a cloth-coloured pill with foil-cream ink that turns wine on hover, and the icon gap widens from 0.75rem to 1rem on ease-out-expo.
- **Quiet:** transparent, with a 1px foil-line border and cloth ink. On hover it gets a 10% foil wash.
- **Focus:** a 2px `--focus` outline at 3px offset (pale foil in dark, wine in light). Arcana cards use a 6px offset.

### Cards / Containers
- **Stock card (`glass-panel`)**: wine stock, a 1px stock-edge border, resting shadow, and a foil-line inner frame at 7px and 55% opacity. Rounded per use, usually 1.5rem.
- **Lead card**: bone stock, rotated -1.6deg, with a double card-foil frame and mirrored "0" corner indices in card-index-red (the bottom one rotated 180deg and hidden at ≤640px). It holds the display title, reading text, the lead button and a foot band.
- **Chapter card**: bone stock, min-height 17rem, inner frame at 8px, excerpt clamped to 4 lines, and the order in a wine foot band below a card-foil rule. The latest chapter adds a 2px foil outline at 4px offset.
- **Closing back**: a deck-box card back with the Unity Crown, rotated 4deg, waiting face down beside the closing line.

### Navigation
- A sticky header on a translucent cloth ground with `backdrop-blur-md` and a hairline header-line bottom border. The brand is the Unity Crown webmark plus "FOURCADIR" in Chonburi, with "Imperial Archive" as a label beneath it.
- Links are 15px semibold pills in ink-muted that brighten on hover. The active link turns foil-cream and gains a small lozenge suit mark (SuitIcon). Six secondary routes sit in a "more" menu on cloth-deep (stock in light) with a foil-line border. Below xl, a hamburger opens a grid of bordered pill links.

### Arcana Card (signature)
A 5:8 House card on the home fan. Face down, it shows a deck-box back tinted with the House field (62% field into cloth-deep), a foil crosshatch, a -7px foil outline and the Unity Crown. On hover or focus it lifts and turns over (rotateY) to show the face: the full House field, a Roman index, the crest, and the House name in Chonburi.

### House Arcanum and Portrait Card
- **House arcanum**: a tall card on the House field. It shows the index, a crest at 78% width (scaling to 1.04 on hover), the name, the Thai name, the emblem label and a description. The inner frame is drawn in on-field at 38%.
- **Portrait card**: a 0.6rem margin of House field around a 4:5 portrait window. Below the window come the name (Chonburi 1.2rem), the title, the House label, and a 3-line summary. With no House, it falls back to stock and ink.

### Reader Card
The chapter is set as one printed card, rounded at 1.5rem with a foil inner frame at 10px. It has three themes. Night uses reader-night with a stock-edge border. Paper uses bone with a bronze frame and a wine title. Black uses #000. The title is pale foil, or wine on paper.

### Empire Map and Era Seal
- **Empire map**: the user's painted map is the surface, in a 1.4rem frame with a foil inner line at 8px. Cities are invisible pins over their painted labels. On hover or focus a pin shows a 2px pale-foil outline and a bone tooltip with the name in Chonburi and the ruler beneath it.
- **Era seal**: a circular plate with a foil ring and a dashed inner ring, with the era's mark struck at the centre.

### Icons
An authored 24px SVG set: 1.6 stroke, round caps, `currentColor`. It contains arrow, search, sun, moon, chevron, the lozenge suit, close and bookmark. Content symbols (☀ ⌛ ≋ ♛ ♜ ⚿ ⬢ ◉ ◯ ◆ ◇ ♢ ✦) are drawn as SVG paths by `SymbolIcon` and are never rendered as font glyphs.

## Do's and Don'ts

### Do:
- **Do** put every piece of content on a card: wine stock or bone stock with a 1px foil-line inner frame inset 5 to 12px.
- **Do** colour a House's card with its full field from `data-house` (`var(--field)` / `var(--on-field)`) and nowhere else.
- **Do** use the re-cut `slate-*` and `amber-*` utilities, or the `--cloth`, `--stock`, `--foil`, `--foil-line`, `--bone` variables, so light theme re-inks automatically.
- **Do** mark order with a Roman-numeral arcana index in Chonburi (0.16em tracking), and put labels under titles or in a foot band.
- **Do** use only the one lift-or-turn motion on `cubic-bezier(0.16, 1, 0.3, 1)`, and make sure the reduced-motion path shows card faces flat and untilted.
- **Do** use real artwork only: the House crests, character portraits, the Unity Crown webmark and the painted empire map (`public/images/empire/empire-map.webp`).
- **Do** keep reading text in Noto Serif Thai at line-height 1.9 or more, and keep spectacle off the reading card.

### Don't:
- **Don't** fill, gradient or glow with gold foil. Foil is a line or an ink.
- **Don't** set an eyebrow or kicker label above a heading.
- **Don't** use raw Tailwind greys, blue-black navy grounds, or new hex values that bypass the cloth tokens.
- **Don't** use a House colour as an accent on cloth, or a non-House colour as a card field.
- **Don't** add a second motion vocabulary (springs, parallax, scroll-triggered reveals, looping animation).
- **Don't** invent illustrations, placeholder art or font-glyph icons. Draw marks in SVG and use the supplied artwork.
- **Don't** lay out a row of identical equal cards under a dark gold-serif hero. Spreads should feel laid by hand (tilts, drops, a broken ring).
