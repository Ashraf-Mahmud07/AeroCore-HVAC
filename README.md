# AeroCore HVAC

A production Next.js 15 marketing site for AeroCore HVAC, rebuilt from a set of
`.dc.html` design components and the `industry` design system that accompanied
them.

Those source files were the reference for layout, spacing, typography, colour,
animation, interaction and copy. The proprietary Design Component runtime
(`<x-dc>`, `sc-for`, `sc-if`, `DCLogic`) was dropped and everything it expressed
was rebuilt in React. The design sources have since been removed from the repo;
`styles/tokens.css` is the surviving verbatim copy of the design system.

---

## Tech stack

| Concern   | Choice                                                            |
| --------- | ----------------------------------------------------------------- |
| Framework | Next.js 15 (App Router), React 19                                 |
| Language  | TypeScript, `strict` + `noUncheckedIndexedAccess`                 |
| Styling   | Plain CSS — design-system tokens + CSS Modules. No CSS framework. |
| Icons     | `lucide-react`                                                    |
| Fonts     | `next/font/google` — Barlow, Barlow Condensed (self-hosted)       |
| Images    | `next/image` with AVIF/WebP                                       |
| Forms     | React Server Actions + `useActionState`                           |
| Tooling   | ESLint 9 (flat config), Prettier                                  |

---

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

### Scripts

| Script                 | What it does                                        |
| ---------------------- | --------------------------------------------------- |
| `npm run dev`          | Development server                                  |
| `npm run build`        | Production build                                    |
| `npm start`            | Serve the production build                          |
| `npm run lint`         | ESLint                                              |
| `npm run typecheck`    | `tsc --noEmit`                                      |
| `npm run format`       | Prettier write                                      |
| `npm run format:check` | Prettier check                                      |
| `npm run images:fetch` | Re-download the stand-in photography (see _Images_) |

`npm install`, `npm run dev` and `npm run build` all complete with no warnings
or errors.

### Environment

Copy `.env.example` to `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://www.aerocorehvac.com
```

This drives `metadataBase`, every canonical URL, `sitemap.xml`, `robots.txt` and
the `@id`s inside the JSON-LD graph. It falls back to
`https://www.aerocorehvac.com` when unset, so the build never breaks — but set it
per environment so preview deploys do not advertise production canonicals.

---

## Routes

| Path        | Page                                  |
| ----------- | ------------------------------------- |
| `/`         | Home                                  |
| `/services` | Service catalog, method band, CTA     |
| `/contact`  | Contact details + booking form + chat |
| _(404)_     | `app/not-found.tsx`                   |

---

## Folder structure

```
app/
  layout.tsx                  Root: fonts, metadata, global JSON-LD
  (marketing)/
    layout.tsx                Header + Footer + sticky mobile bar + skip link
    page.tsx                  Home
    services/page.tsx
    contact/page.tsx
  not-found.tsx               404
  sitemap.ts  robots.ts  manifest.ts
  icon.svg  favicon.ico  apple-icon.png

components/
  layout/     Header, MobileNav, Footer, Logo, SkipLink, StickyMobileBar
  home/       Hero (3 variants), ServicesGrid, WhyChooseUs, ProcessSteps,
              Projects + ProjectGallery + BeforeAfterSlider, Testimonials,
              Financing, ServiceAreas + ZipChecker, Blog + Newsletter,
              HomeFaq, ContactCta + QuickRequestForm
  services/   ServicesHero, ServiceCatalog, MethodBand
  contact/    ContactHero, ContactInfo, ServiceRequestForm, LiveChatWidget
  shared/     BrandMarquee, FaqAccordion, CtaBand, Breadcrumb, Field,
              FormSuccess, JsonLd
  ui/         Button, Container, Section, SectionHeading, BlueprintGrid,
              Corners, Counter, DuotoneImage, Icon, Reveal, StarRating

hooks/        useInView, useCountUp, useScrolled, useLockBodyScroll,
              usePrefersReducedMotion
lib/          data.ts, site-config.ts, seo.ts, actions.ts, icons.ts, utils.ts
types/        index.ts, forms.ts
styles/       tokens.css (design system), globals.css (app-level)
scripts/      fetch-images.mjs
public/       images/, icons/, mask-icon.svg
```

### Where things live

- **Content** — every headline, list, FAQ, testimonial and label comes from
  `lib/data.ts`, extracted from the design components' `renderVals()`. Nothing is
  hardcoded twice.
- **Company facts** — phone, email, address, licence, hours, coordinates, rating,
  navigation and footer links live in `lib/site-config.ts`.
- **Design tokens** — `styles/tokens.css` is the `industry` design system ported
  verbatim. The only edits: the Google Fonts `@import` is removed (replaced by
  `next/font`) and `--font-heading` / `--font-body` point at the resulting CSS
  variables. Every colour, space, radius, shadow and component class is unchanged.

---

## Server vs. Client Components

Server Components are the default. These are client-side, and only these:

| Component                                 | Why                                    |
| ----------------------------------------- | -------------------------------------- |
| `Header`                                  | Scroll state, mobile menu, active nav  |
| `MobileNav`                               | Overlay state, Escape key, scroll lock |
| `Reveal`                                  | IntersectionObserver scroll reveal     |
| `Counter`                                 | Animated count-up on scroll            |
| `ProjectGallery`                          | Category filter                        |
| `BeforeAfterSlider`                       | Pointer drag + keyboard slider         |
| `TestimonialCarousel`                     | Carousel state                         |
| `FaqAccordion`                            | Disclosure state                       |
| `ZipChecker`                              | Input validation + live region         |
| `Newsletter`                              | Submit state                           |
| `QuickRequestForm` / `ServiceRequestForm` | `useActionState`                       |
| `LiveChatWidget`                          | Open/close state                       |

Section headings are rendered on the server and passed into client components as
props (e.g. `ProjectGallery`'s `heading`), so filterable sections still ship
server-rendered copy.

---

## Interactions

All ported from the design components' `componentDidMount` handlers into React:

- Fixed header, transparent until 36px of scroll, then blurred + hairline + shadow
- Scroll reveal (`IntersectionObserver`, one-shot, per-element delay, 1400ms safety timeout)
- Animated counters (1300ms cubic ease-out, locale grouping, target-matching decimals)
- Testimonial carousel with dots and arrows
- Project category filter
- Before/after comparison slider — pointer drag, **plus** keyboard support
  (`role="slider"`, arrow keys, Home/End) which the original lacked
- FAQ accordion, first item open, click-to-close
- Full-screen mobile navigation, Escape to close, body scroll lock
- Contact form success state
- ZIP checker, newsletter, live chat widget
- Brand marquee, paused on hover
- Smooth scrolling and `prefers-reduced-motion` support

---

## Images

Every `<image-slot>` placeholder became a `next/image`. All images render with
`fill` + `object-fit: cover` inside the design's framed aspect ratios, so a
replacement file of any dimensions drops straight in — no code change, no layout
shift.

### Replacing an image

1. Drop the new file into `public/images/` using the **same file name**.
2. If the extension changes, update the one `src` in `lib/data.ts`.
3. Update the `alt` text in `lib/data.ts` to describe the new photograph.

That's it — sizes, priority and lazy-loading are already set per slot.

### About the shipped photography

The photographs are **licensed stand-ins**, not AeroCore's own work. They were
downloaded from Wikimedia Commons by `scripts/fetch-images.mjs`, hand-picked for
subject relevance and for licences that permit commercial reuse (public domain,
CC0, CC BY, CC BY-SA).

**`public/images/CREDITS.md` lists the author, licence and source page for every
file.** Files under CC BY or CC BY-SA carry an attribution obligation for as long
as they are in use — replace them with AeroCore's own photography before launch,
or publish the credits page.

**Testimonial portraits are deliberately not photographs.** `testimonial-*.png`
are abstract blueprint plates. Putting a real, identifiable person beside a
testimonial they did not give would misrepresent them, so those slots stay
abstract until the client supplies signed-off customer portraits.

### Icons

`app/favicon.ico`, `app/apple-icon.png`, `public/icons/*` and the testimonial
plates were produced by a generator script that has since been removed. The
assets themselves are committed and need no build step; replace them by
overwriting the files in place.

---

## SEO

- **Metadata** per route via `buildPageMetadata()` in `lib/seo.ts`: title,
  description, keywords, canonical, Open Graph, Twitter card. Root layout sets
  `metadataBase` and the `%s | AeroCore HVAC` title template; the homepage opts
  out of the template with an absolute title.
- **Robots** — indexable, with `max-image-preview:large` and unrestricted snippets.
- **JSON-LD**, emitted by `components/shared/JsonLd.tsx`:
  - Root layout — `HVACBusiness` (a `LocalBusiness` subtype, with address, geo,
    opening hours, area served, credentials, offers, aggregate rating),
    `Organization`, `WebSite` + `SearchAction`
  - Home — `FAQPage`, plus `Review` / `AggregateRating`
  - Services — `ItemList` of `Service` nodes, `BreadcrumbList`
  - Contact — `ContactPage`, `BreadcrumbList`
- **`app/sitemap.ts`** — all three routes with priorities and change frequencies.
- **`app/robots.ts`** — allow all, references the sitemap.
- **`app/manifest.ts`** — name, icons (including maskable), screenshots, theme
  colours, `display: standalone`, `start_url`.
- **Icons** — `favicon.ico`, `icon.svg`, `apple-icon.png`, 192/512 PNGs, a
  maskable 512, and a Safari `mask-icon.svg`.
- `<html lang="en">` and light/dark `theme-color`.

The JSON-LD graph is built from typed site data only — never from user input.

---

## Accessibility

Targeting WCAG 2.2 AA:

- Semantic landmarks, exactly one `<h1>` per page, ordered heading levels
- Skip-to-content link as the first tab stop
- Visible focus rings inherited from the design system (`:focus-visible`)
- `aria-expanded` / `aria-controls` on the menu, accordion and chat toggles
- `aria-live` regions for the ZIP checker, newsletter, carousel and form results
- The before/after slider exposes `role="slider"` with `aria-valuenow` and full
  keyboard control
- Every form control has a real `<label>`; the timing radios are grouped in a
  `<fieldset>` / `<legend>`; errors are wired via `aria-describedby` and
  `aria-invalid`
- Decorative icons and SVG chrome are `aria-hidden`; meaningful SVGs use
  `role="img"` with a label
- `prefers-reduced-motion` disables animation, transitions and scroll behaviour,
  and reveals all content immediately
- A `<noscript>` rule reveals scroll-reveal content when JavaScript is off

---

## Performance

- Server Components everywhere except the interactive leaves listed above
- Fonts self-hosted through `next/font` with `display: swap` — no render-blocking
  request, no layout shift
- `next/image` with AVIF/WebP, per-slot `sizes`, `priority` only on the hero
- Fixed aspect ratios on every media frame, so CLS stays at zero
- `optimizePackageImports` for `lucide-react` so only used icons ship
- Route prefetching via `next/link`
- All routes prerender as static HTML (~103 kB shared JS)
- Counters and reveals animate on `requestAnimationFrame` / transform + opacity only

---

## Forms

Both booking forms post to Server Actions in `lib/actions.ts` and read their
result with `useActionState`, so they validate and submit **with JavaScript
disabled**. Each returns typed field-level errors and a success state.

`deliverServiceRequest()` in `lib/actions.ts` is the single integration point —
wire it to the dispatch system or CRM and both forms are live. The ZIP checker
and the live chat composer are likewise stubbed at one function each.

---

## Deployment

### Vercel

```bash
vercel
```

Set `NEXT_PUBLIC_SITE_URL` to the production origin in project settings. No other
configuration is required — the App Router, image optimisation and Server Actions
work out of the box.

### Self-hosted / Docker

```bash
npm ci
npm run build
npm start          # binds PORT, default 3000
```

Run behind a reverse proxy terminating TLS. Server Actions need a Node runtime;
a static export (`output: 'export'`) would disable them and the image optimiser.

---

## Implementation notes

Judgement calls worth knowing about:

1. **One header for every page.** The home design component's header carried
   registration ticks on the logo mark and social links in the top bar; the other
   pages omitted them. A single `Header` is used everywhere and follows the home
   version.

2. **Header CTAs collapse below 820px.** In the original the Call / Book buttons
   stayed in the nav row at every width and overflowed narrow viewports. Below
   820px the sticky bottom bar already carries the identical pair, so the header
   row drops them.

3. **Hero variants.** The home component exposed a `heroVariant` prop
   (`Split` / `Centered` / `Spec sheet`, default `Split`). All three are
   implemented and selected by `siteConfig.heroVariant`, so `heroStats` and
   `specRows` remain live data rather than dead extracts.

4. **Maintenance plans removed.** The Comfort Club page, the homepage plan
   teaser and all supporting data, types and schema were deleted on request. The
   homepage section numbers were resequenced (`02`–`11`) so the kickers stay
   consecutive; the "What's included in a maintenance plan?" FAQ was removed
   along with the product it described. Maintenance remains in the services
   catalog as a service.
