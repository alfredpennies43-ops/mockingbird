---
version: alpha
name: Lucidbloom
description: A psychedelic dark design system for editorial, music, and lifestyle products. Imagery is the hero; deep violet voids hold liquid gradients, hand-drawn cosmic ornament, and chunky display type.
theme: dark
colors:
  void: "#0E0322"
  surface: "#1F0A4A"
  surface-raised: "#2A0F66"
  primary: "#7E3BFF"
  primary-soft: "#A57BFF"
  secondary: "#FF2BB1"
  tertiary: "#FF8A2A"
  highlight: "#FFD23F"
  accent-cool: "#29E5C9"
  on-surface: "#FBF5FF"
  on-surface-muted: "#C9B8E8"
  on-surface-faint: "#8E7BB8"
  border: "rgba(165, 123, 255, 0.22)"
  border-strong: "rgba(165, 123, 255, 0.45)"
  focus: "#FFD23F"
  success: "#29E5C9"
  warning: "#FFD23F"
  error: "#FF2BB1"
typography:
  font-display: "\"Bagel Fat One\", \"Cooper Black\", system-ui, serif"
  font-body: "\"Outfit\", \"Inter\", system-ui, sans-serif"
  display-xl:
    family: "{typography.font-display}"
    size: 6rem
    weight: 400
    lineHeight: 0.92
    letterSpacing: -0.01em
  display-lg:
    family: "{typography.font-display}"
    size: 4.25rem
    weight: 400
    lineHeight: 0.96
    letterSpacing: -0.01em
  headline-lg:
    family: "{typography.font-display}"
    size: 3rem
    weight: 400
    lineHeight: 1
  headline-md:
    family: "{typography.font-display}"
    size: 2.25rem
    weight: 400
    lineHeight: 1
  headline-sm:
    family: "{typography.font-display}"
    size: 1.75rem
    weight: 400
    lineHeight: 1.05
  body-lg:
    family: "{typography.font-body}"
    size: 1.375rem
    weight: 400
    lineHeight: 1.4
  body-md:
    family: "{typography.font-body}"
    size: 1rem
    weight: 400
    lineHeight: 1.5
  body-sm:
    family: "{typography.font-body}"
    size: 0.875rem
    weight: 400
    lineHeight: 1.5
  label-md:
    family: "{typography.font-body}"
    size: 0.875rem
    weight: 600
    letterSpacing: 0.01em
  label-sm:
    family: "{typography.font-body}"
    size: 0.75rem
    weight: 600
    letterSpacing: 0.18em
    textTransform: uppercase
  quote:
    family: "{typography.font-body}"
    size: 1.375rem
    weight: 400
    style: italic
    lineHeight: 1.4
rounded:
  none: 0px
  xs: 6px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 36px
  full: 999px
spacing:
  xs: 0.25rem
  sm: 0.5rem
  md: 1rem
  lg: 1.5rem
  xl: 2rem
  "2xl": 3rem
  "3xl": 4.5rem
  "4xl": 6rem
  container: 1200px
  container-wide: 1400px
  container-narrow: 880px
  gutter: clamp(1rem, 3vw, 2.5rem)
elevation:
  surface:
    boxShadow: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 30px 60px -30px rgba(0,0,0,0.6), 0 0 0 1px rgba(165,123,255,0.18)"
  modal:
    boxShadow: "0 40px 120px -30px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,43,177,0.25), 0 0 80px -20px rgba(126,59,255,0.55)"
  glow-iris:
    boxShadow: "0 0 0 1px rgba(165,123,255,0.25), 0 18px 60px -16px rgba(126,59,255,0.55)"
  glow-magenta:
    boxShadow: "0 0 0 1px rgba(255,43,177,0.35), 0 24px 60px -18px rgba(255,43,177,0.6)"
  glow-citrine:
    boxShadow: "0 0 0 3px rgba(255,210,63,0.18), 0 0 24px -4px rgba(255,210,63,0.55)"
gradients:
  aurora: "linear-gradient(135deg, #7E3BFF 0%, #FF2BB1 55%, #FF8A2A 100%)"
  halo: "radial-gradient(circle at center, rgba(255,210,63,0.55) 0%, rgba(255,138,42,0.18) 40%, transparent 70%)"
  bloom: "radial-gradient(120% 80% at 20% 0%, rgba(126,59,255,0.45) 0%, transparent 55%), radial-gradient(80% 70% at 100% 100%, rgba(255,43,177,0.35) 0%, transparent 60%)"
  marble: "conic-gradient(from 220deg at 50% 50%, #7E3BFF, #FF2BB1, #FF8A2A, #FFD23F, #29E5C9, #7E3BFF)"
motion:
  ease: cubic-bezier(0.22, 1, 0.36, 1)
  ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1)
  duration-fast: 140ms
  duration-base: 240ms
  duration-slow: 480ms
components:
  button-primary:
    backgroundColor: "{gradients.aurora}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.full}"
    padding: "0.95rem 1.5rem"
    typography: "{typography.label-md}"
    boxShadow: "0 14px 36px -14px rgba(255,43,177,0.55), inset 0 1px 0 rgba(255,255,255,0.25)"
  button-primary-hover:
    backgroundColor: "{gradients.aurora}"
    boxShadow: "0 18px 44px -10px rgba(255,43,177,0.75), inset 0 1px 0 rgba(255,255,255,0.3)"
  button-secondary:
    backgroundColor: transparent
    textColor: "{colors.on-surface}"
    borderColor: "{colors.primary}"
    rounded: "{rounded.full}"
    padding: "0.95rem 1.5rem"
    typography: "{typography.label-md}"
  button-secondary-hover:
    backgroundColor: "rgba(126,59,255,0.18)"
    borderColor: "{colors.secondary}"
  button-ghost:
    backgroundColor: transparent
    textColor: "{colors.on-surface-muted}"
    padding: "0.95rem 0.75rem"
    typography: "{typography.label-md}"
  input-field:
    backgroundColor: "rgba(14,3,34,0.6)"
    textColor: "{colors.on-surface}"
    borderColor: "rgba(165,123,255,0.32)"
    rounded: "{rounded.md}"
    padding: "0.85rem 1rem"
    typography: "{typography.body-md}"
  input-field-focus:
    borderColor: "{colors.focus}"
    boxShadow: "{elevation.glow-citrine.boxShadow}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    borderColor: "{colors.border}"
    rounded: "{rounded.lg}"
    padding: "1.5rem"
    boxShadow: "{elevation.surface.boxShadow}"
  card-feature:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.border-strong}"
    rounded: "{rounded.lg}"
    padding: "1.5rem"
  checkbox:
    backgroundColor: "rgba(14,3,34,0.6)"
    borderColor: "{colors.primary}"
    rounded: 8px
    size: 1.25rem
  checkbox-checked:
    backgroundColor: "{gradients.aurora}"
    borderColor: transparent
    textColor: "{colors.on-surface}"
  tabs-inactive:
    textColor: "{colors.on-surface-muted}"
    typography: "{typography.label-md}"
  tabs-active:
    textColor: "{colors.on-surface}"
    indicatorColor: "{gradients.aurora}"
    dotColor: "{colors.highlight}"
  badge:
    backgroundColor: "rgba(126,59,255,0.18)"
    textColor: "{colors.primary-soft}"
    borderColor: "rgba(126,59,255,0.4)"
    rounded: "{rounded.full}"
    padding: "0.35rem 0.75rem"
    typography: "{typography.label-sm}"
icons:
  library: Phosphor Icons
  weight: regular
  color: "{colors.on-surface}"
  accent: "{colors.highlight}"
---

## Overview

Lucidbloom is a psychedelic dark system for products that want to feel **mystical, vivid, and hand-touched** — editorial magazines, music platforms, festivals, esoteric tooling, creative communities. The product should feel like turning the pages of a velvet-printed zine under blacklight, not like a SaaS dashboard with purple accents.

The visual metaphor is **ink dropped in violet water**: deep cosmic voids hold floating panels, and saturated color blooms through them in slow, organic shapes. Imagery is the hero — every screen treats photography and illustration as primary content, not decoration. Type, ornament, and color exist to frame it.

What Lucidbloom must feel like:

- **Saturated but composed.** Jewel-tone color sits against a velvet-violet ground, never neutral grey or pure black.
- **Material, not flat.** Surfaces carry a faint grain and a subtle inner bloom so they read as printed or screen-glow, not vector flat.
- **Hand-touched.** Wavy lines, halo rings, eight-pointed starbursts, and chunky display type carry the human-drawn warmth of the 1970s blacklight poster tradition.
- **Hypnotic, never costume-shop.** The system is calmly trippy — no random rainbow gradients, no tie-dye clichés. Color follows a tight five-stop palette with deliberate rhythm.

Source traits to preserve: the deep violet-black background, the saturated magenta–marigold–teal–iris palette, swirling fluid forms, layered translucency, and dominant photographic imagery framed by ornament.

## Colors

The palette is anchored by a single deep ground (Cosmic Void `#0E0322`) and one raised surface (Velvet Nebula `#1F0A4A`). Every other token is an accent. Treat the five accents as **chord notes** — pick two or three per surface, never all of them at once.

| Token | Hex | Role |
|---|---|---|
| `void` | `#0E0322` | Page background. Treat pure `#000000` as forbidden. |
| `surface` | `#1F0A4A` | Cards, panels, modals. |
| `surface-raised` | `#2A0F66` | Quote cards, hover-elevated surfaces. |
| `primary` (Iris Bloom) | `#7E3BFF` | Primary actions, active states, focus rings, links-on-card. |
| `secondary` (Aurora Magenta) | `#FF2BB1` | Highlights, badges, drop caps, pull-quotes. |
| `tertiary` (Solar Flare) | `#FF8A2A` | CTA glow, warm halos behind imagery, warning tone. |
| `highlight` (Halo Citrine) | `#FFD23F` | Ornament dots, focus rings, success markers. |
| `accent-cool` (Mycelia Teal) | `#29E5C9` | Body links, micro-icons, counter-balance to magenta. |
| `on-surface` (Lucid Ink) | `#FBF5FF` | Headlines and body copy. |
| `on-surface-muted` (Lavender Mist) | `#C9B8E8` | Secondary text, meta, captions. |

**Signature gradient — Aurora**: `linear-gradient(135deg, #7E3BFF → #FF2BB1 → #FF8A2A)`. Reserve it for primary CTAs, active tab indicators, gradient text moments, and one hero overlay per page. Overuse kills the magic.

**Halo glow** is a radial `#FFD23F → transparent` used behind imagery, behind icons inside circular badges, and behind avatars in editorial layouts.

Accessibility: Lucid Ink on Cosmic Void passes WCAG AA at all sizes. Lavender Mist on Cosmic Void passes AA for body 16px+. Never set Halo Citrine or Mycelia Teal as body text on Velvet Nebula — they are accent-only.

## Typography

Two free Google Fonts:

- **Bagel Fat One** — chunky, organic display with rounded terminals. Use for `h1`, `h2`, hero numerals, card titles, and the wordmark. Sized large and tight (`line-height: 0.92–1`, letter-spacing slightly negative). Never set body or UI controls in Bagel Fat One.
- **Outfit** — clean variable grotesque for paragraphs, labels, navigation, buttons, and form controls. Use 400 for body, 500 for nav and meta, 600 for buttons and labels, 700 for emphasis.

Pairing rules:

- Body inside cards starts at `1rem` (16px) Outfit 400, line-height 1.5, color `on-surface-muted`.
- Lead paragraphs use Outfit 400 at `1.375rem` for editorial intros, color `on-surface-muted`.
- Section meta (date, tag, category metadata inside a card body — never above the heading) uses Outfit 500, uppercase, letter-spacing `0.18em`, color `on-surface-faint`.
- Pull-quotes use Outfit italic with a magenta drop cap and a 3px magenta left border.
- Display gradient text is allowed on hero numerals or a single hero word — apply `lb-gradient-text` to a `<span>` inside the heading, not the whole heading.

## Layout

Lucidbloom is **container-led with editorial generosity**. Content sits inside a 1200px container with `clamp(1rem, 3vw, 2.5rem)` gutters. Use the narrow 880px container for long-form reading, the wide 1400px container only for hero imagery or showcase galleries.

Rhythm:

- Sections are `clamp(3rem, 8vw, 6rem)` of vertical padding. Never less — the system breathes.
- Stack vertical rhythm in multiples of `0.5rem` from the spacing token scale; avoid arbitrary pixel gaps.
- Default headline-to-supporting-copy gap is `1.5rem`. Default headline-to-button gap is `2rem`.

Section patterns:

- **Hero.** Lead with the headline. Place a single block of supporting copy below at `1.375rem`. Pair with one large piece of imagery (square or 3:4 portrait) on the right or below, treated with the duotone overlay. Lay a halo glow behind the image and a faint spinning starburst behind the headline area at low opacity. Do not stack an eyebrow above the headline.
- **Feature grid.** Three columns on desktop, one on mobile. Each tile is a `lb-feature` block with a small gradient icon chip, a short headline, and one paragraph. Mix one tile that breaks the pattern — e.g., uses an image instead of an icon — to keep the rhythm alive.
- **Editorial split.** Left column: long-form prose with a leading pull-quote. Right column: stacked imagery cards using `lb-card__media`. Use a 1.1fr / 0.9fr split, collapsing to a single column under 860px.
- **Showcase gallery.** Use a 4-up `lb-grid--4` of square images with duotone overlay; intersperse with one `lb-card--quote` to break the grid.
- **Form panel.** Centered `lb-container--narrow`. Inputs sit on a `lb-surface--bloom` card with `1.5rem` field gaps and a single primary CTA at the end. Use citrine focus rings — they read like a black-light highlight.
- **CTA band.** Full-bleed Velvet Nebula band with the bloom gradient, an oversized headline, one primary and one secondary button.

Asymmetry and alignment: prefer **left-aligned hero blocks** with imagery offset to the right or trailing edge. Centered alignment is reserved for short manifesto-style CTAs and the cover/landing closer. Avoid centering every section — the system depends on editorial left alignment to read as a magazine.

Mobile behavior: collapse all multi-column grids to one column, halve hero padding, scale display type via `clamp()`, keep imagery full-width with the same duotone treatment.

## Elevation & Depth

Three layers exist, separated by tone and glow rather than heavy shadows:

1. **Void layer.** The page background — Cosmic Void plus the bloom radial gradient plus the SVG grain overlay. Never flat black.
2. **Surface layer.** Velvet Nebula cards and panels with a 1px iris border at 22% opacity and the `lb-shadow-card` token. Inner bloom hint is optional via `lb-surface--bloom`.
3. **Glow layer.** Interactive elements (focused inputs, hovered cards, primary buttons) carry a colored glow — magenta, citrine, or iris — at 40–60px blur. This is the system's signature halation effect.

Borders are 1px and tinted with iris purple at low opacity. Use the strong variant only for emphasis (feature cards, modals). Drop shadows are deep and soft (`0 30px 60px -30px`) — never use the default browser shadow ramp.

Grain: the body carries a subtle SVG noise overlay at 50% opacity, overlay blend mode. This is non-negotiable — it keeps the dark surfaces from looking digitally flat.

## Shapes

The shape language is **generous and organic**:

- Pills (`999px`) on buttons, badges, chips, avatars, and tag selectors.
- Large radius (`24px`) on cards, panels, modals, and image masks.
- Medium radius (`16px`) on inputs and small chips.
- Small radius (`8px`) on checkbox squares only.
- Sharp `0px` corners are forbidden on any primary surface.

Ornaments:

- **Lucidbloom Starburst** — the eight-pointed mark. Use as: nav brand, list bullets, section dividers, focus halos behind avatars, decorative confetti at hero scale. Sizes from 12px (bullet) to 320px (hero backdrop, 6–10% opacity).
- **Halo rings** — radial citrine glow behind imagery and avatars.
- **Wavy underlines** — magenta 2–3px stroke, used as link hover underline.
- **Blob masks** — `lb-media--blob` morphs imagery into liquid organic shapes; animate over 18s. Reserve for hero or showcase moments — never use blob masks on small thumbnails.

Imagery treatment is part of the shape language: every photographic image must be either circular, rounded-rect 24px, or blob-masked. Square-cornered images are not part of Lucidbloom.

## Components

**Buttons.** Three variants:

- `lb-btn lb-btn--primary` — aurora gradient pill, white text, soft magenta glow. The gradient animates its position on hover (right-to-left shift). One per section.
- `lb-btn lb-btn--secondary` — transparent fill, 1px iris border, ink text. Border shifts to magenta on hover and fills with iris-glass.
- `lb-btn lb-btn--ghost` — text-only with a magenta underline that appears on hover. For tertiary actions in headers and footers.

Focus state for all three: `lb-glow-citrine` box-shadow. Disabled state: 0.45 opacity.

**Inputs.** Velvet-tinted `lb-input` / `lb-textarea` / `lb-select` with iris border at 32% opacity. Hover lifts the border to full iris; focus shifts to citrine border and citrine outer glow. Labels (`lb-label`) sit above the field; help text (`lb-help`) sits below at `xs` size in lavender mist. Error state uses magenta border with a faint magenta outer ring.

**Cards.** `lb-card` — Velvet Nebula fill, 24px radius, 1px iris border, shadow card token. Optional `lb-card__media` header that bleeds to the card edges and zooms 4% on hover. The card itself lifts 2px and gains a magenta glow on hover. `lb-card--feature` adds a corner bloom gradient. `lb-card--quote` is the magenta-bordered editorial quote variant with a citrine halo bloom.

**Checkboxes.** 1.25rem rounded squares (`8px`), iris border off-state, aurora-gradient fill with a white checkmark when checked. Citrine focus ring. Radios follow the same color logic but as pills with a gradient fill dot.

**Tabs.** Underline tabs with a thick (3px) aurora gradient indicator. Active tab adds a citrine dot before the label with a glow. Inactive tabs are lavender mist; hover lifts to ink. The tab bar carries a 1px iris bottom border at 18% opacity to anchor it.

**Badges and chips.** Pill-shaped, semi-transparent fills tinted from the accent palette. Use `lb-badge--solid` (aurora gradient) only for primary status emphasis like "New" or "Live".

**Imagery.** Use `lb-media` with the duotone overlay when the photo's native palette conflicts with Lucidbloom. Use `lb-media--bloom` for hero imagery to lay a citrine halo behind it. Use `lb-media--blob` for one hero piece per page — overusing it makes the system feel novelty.

**Ornament & dividers.** `lb-divider` is a centered starburst between two faint gradient lines. `lb-list` items use citrine starburst markers instead of dots.

**Icon library: Phosphor Icons (Regular weight).**

- Library: Phosphor Icons
- Link: https://phosphoricons.com/
- License: MIT
- Usage in preview: load the regular-weight stylesheet from the Phosphor CDN and use class-based icon elements (`<i class="ph ph-sparkle">`). Set the icon color via `currentColor` on the parent. Use icons sparingly — they should read as soft companions to photographic imagery, never replace it.

## Do's and Don'ts

**Do**

- Lead every section with the headline itself; no labels, categories, or all-caps lines above it.
- Treat imagery as the hero. Every screen should carry at least one duotone-treated photograph or illustration.
- Use the aurora gradient sparingly — primary CTAs, one hero word, one active tab indicator per surface.
- Keep the grain overlay on. It is what makes Lucidbloom feel printed rather than digital.
- Use the eight-pointed starburst as a recurring grace note — bullets, section breaks, focus halos, hero backdrops at low opacity.
- Pair magenta with marigold and citrine; pair iris with teal. These two chord groups carry the system.
- Animate the blob mask and the spinning hero starburst slowly (18–24s). Slow motion reads as hypnotic; fast motion reads as marketing.

**Don't**

- Don't use pure `#000` for backgrounds. Cosmic Void is `#0E0322` and the bloom radial is part of the surface.
- Don't apply the aurora gradient to every card and every button. Reserve it for the highest-signal element on a surface.
- Don't drop in random tie-dye rainbows, neon-on-white SaaS accents, or generic dashboard chrome — Lucidbloom is editorial, not enterprise.
- Don't set body text in Bagel Fat One. It is a display face only.
- Don't square the corners of imagery. Every photo gets a rounded rect, a circle, or a blob.
- Don't mix icon libraries or invent new SVG glyphs. Phosphor Regular only.
- Don't center every section. Centered alignment is reserved for short manifesto-style closers; the editorial body of the system is left-aligned.
- Don't pile heavy drop shadows under cards. Depth comes from glow, tone shift, and the inner bloom — not Material-style elevation ramps.
