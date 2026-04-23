# EDENS — Barbershop & Tattoo Studio Website

High-end, single-page website for EDENS Barbershop, Wymondham, UK. Built with Next.js 16, Tailwind CSS v4, and Framer Motion.

---

## Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# → http://localhost:3000

# Build for production
npm run build

# Run production build
npm run start
```

---

## Deployment (Vercel — recommended)

1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → Import Project → select the repo
3. Framework: **Next.js** (auto-detected)
4. Click **Deploy** — no environment variables required for the base build

After deploying, update `metadataBase` in `app/layout.tsx` with your production domain:
```ts
metadataBase: new URL("https://your-actual-domain.com"),
```

---

## TODO — Items to Replace Before Going Live

| # | File | What to change |
|---|------|----------------|
| 1 | `lib/data.ts` | Replace `BOOKSY_URL` with the real Booksy profile URL |
| 2 | `lib/data.ts` | Replace placeholder team `image` URLs with real headshot photos (place in `public/images/`) |
| 3 | `lib/data.ts` | Replace placeholder `testimonials` with verified real reviews |
| 4 | `components/Contact.tsx` | Replace the Google Maps embed URL with a precise embed for Unit 5 Acorn Court (get from Google Maps → Share → Embed) |
| 5 | `app/layout.tsx` | Update `metadataBase` with your production domain |
| 6 | `components/Gallery.tsx` | Add real Instagram Basic Display API integration (comment marked `// TODO`) |
| 7 | `public/logo.jpg` | Already using the real logo — confirm it looks correct at small nav size |

---

## Instagram API Integration (when ready)

The gallery section has a placeholder for a live Instagram feed. To add it:

1. Create a Facebook Developer App at [developers.facebook.com](https://developers.facebook.com)
2. Add the **Instagram Basic Display** product
3. Get a long-lived access token for each account
4. Store tokens in `.env.local`:
   ```
   INSTAGRAM_ACCESS_TOKEN_LEWIS=...
   INSTAGRAM_ACCESS_TOKEN_RT=...
   INSTAGRAM_ACCESS_TOKEN_OLI=...
   ```
5. Replace the static follow links in `Gallery.tsx` with a server component that fetches from the Instagram API

---

## Project Structure

```
edens-barbershop/
├── app/
│   ├── globals.css        # Tailwind v4 design system (@theme tokens)
│   ├── fonts.ts           # Cormorant Garamond + Archivo font config
│   ├── layout.tsx         # Root layout, metadata, structured data
│   └── page.tsx           # Single-page composition
├── components/
│   ├── Navigation.tsx     # Fixed nav, mobile overlay
│   ├── Hero.tsx           # Full-viewport hero with parallax
│   ├── About.tsx          # Two-column about + animated counters
│   ├── Services.tsx       # Service cards grid (dark)
│   ├── Team.tsx           # Team cards with hover bio reveal
│   ├── Gallery.tsx        # Masonry gallery with lightbox trigger
│   ├── Lightbox.tsx       # Image modal, keyboard/arrow navigation
│   ├── BookingTeaser.tsx  # Specialist selector + modal
│   ├── Testimonials.tsx   # Auto-rotating carousel
│   ├── Contact.tsx        # Address, hours, map embed
│   ├── Footer.tsx         # Three-column footer
│   ├── CustomCursor.tsx   # Morphing cursor (desktop only)
│   ├── LoadingScreen.tsx  # First-visit loading animation
│   ├── SmoothScroll.tsx   # Lenis smooth scroll wrapper
│   └── ui/
│       ├── Button.tsx
│       ├── SectionHeading.tsx
│       └── InstagramIcon.tsx
├── lib/
│   ├── data.ts            # All content: services, team, testimonials, gallery
│   └── utils.ts
└── public/
    ├── logo.jpg
    └── images/            # All brand photography
```

---

## Design System

**Colors** (defined in `app/globals.css` via `@theme`):
- `bone` — `#FAFAF7` — Background
- `near-black` — `#0A0A0A` — Primary text / dark sections
- `charcoal` — `#1A1A1A` — Services background, elevated surfaces
- `warm-grey` — `#6B6B6B` — Secondary text
- `gold` — `#C9A961` — Accent (hover states, highlights)

**Fonts**:
- Display: Cormorant Garamond (weight 300–600, italic) — headings
- Body: Archivo (weight 300–600) — UI text, labels, nav

**Key classes**: `font-display`, `font-sans`, `text-bone`, `bg-near-black`, `text-gold`

---

## Accessibility

- Semantic HTML throughout (`<header>`, `<main>`, `<nav>`, `<section>`, `<footer>`, `<address>`)
- All interactive elements have `aria-label`
- `prefers-reduced-motion` respected — animations disabled for users who prefer it
- Custom cursor hidden on touch devices and when reduced motion is set
- Loading screen skipped on repeat visits (sessionStorage)
- Keyboard navigation: Gallery lightbox supports ESC + arrow keys
- Focus-visible styles on all focusable elements (`outline: 2px solid #C9A961`)
# Edens-barbershop
