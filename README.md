# Brightarc Capital — Growth Capital Preset

A clean, optimistic homepage for a **fictional** private investment company that backs startups and small businesses with growth capital, shareholder liquidity and strategy consulting. Cool paper and midnight navy with an amber and a coral arch; a condensed serif display face + Inter. The brand mark (two stacked arches) drives the motion throughout; there is no photography.

Next.js 16 (static export) · GSAP 3 + ScrollTrigger · Lenis · CSS Modules. No UI libraries.

```bash
npm install
npm run dev
npm run build     # static site in ./out
```

## Sections

| Section | What it does |
|---|---|
| Hero | Headline with an underlined italic line, and a dark panel where the two arches enter, draw their outlines and fill, with floating "Strategy" and "Capital" tags. |
| Marquee | Offer and audience keywords. |
| Services | Growth capital, shareholder liquidity and consulting as cards, each with "right for you if". |
| Approach | "The thinking + the fuel": each arch on its own card, then the two meet in the full mark as you scroll. |
| Audience | Who the firm backs, with the arch drawn as a progress marker. |
| Paths | Ways to work together. |
| Process | Steps from first call to partnership. |
| FAQ | Accordion. |
| Contact | Named contact person, phone, email and an enquiry form. |

## Re-skin

- **Copy & data**: `content/site.json` (brand, navigation, contact person, footer) and `content/home.json` (every section).
- **Mark & logo**: the mark's shape is one path, `CHEVRON_PATH` in `components/Chevrons.js`; every animation uses it, so changing it reshapes the whole site. Keep it inside the 120 × 120 box between y 8 and y 64 (see `components/FillingChevrons.js`). The horizontal logo is `components/Logo.js`; favicon `app/icon.svg`.
- **Colour**: tokens at the top of `app/globals.css`. `--blue` is the top (amber) arch and `--green` the lower (coral) arch; the names are kept from the base design.
- **Type**: `app/layout.js`.

## Accessibility & motion

`prefers-reduced-motion` shows the mark already filled and stops the marquee and scroll-driven assembly. Accordion, menu and form are keyboard-operable.

## Demo content

Brightarc Capital, its contact person, figures and email (`.example`) are fictional, and the phone number is a placeholder. A real firm must replace them before launch.
