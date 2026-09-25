# Aboveboard Group homepage

A private redesign demo of the aboveboardgroup.co.uk homepage, built as a single route. The page is light: the reference's cool grey (`#F6F7F9`) alternates with white, and navy appears only twice, as the enquiry card and the footer card. Look and motion both come from one reference, airmastersolutions.com (a Framer site): its framed hero, rounded white and grey cards, "— EYEBROW" labels, pill buttons with an arrow disc, ticker bar and dark footer card, and its reveal spring. Everything visual that is brand (logo, fonts, colours, copy, photos) is Aboveboard's own.

## Run locally

`npm install`, then `npm run dev` (http://127.0.0.1:3019). `npm run build` and `npm start` for production. `npm run typecheck` checks TypeScript.

- `npm run content` re-snapshots the live content and images (Python 3 with Pillow).
- `python3 scripts/trace_logo.py` re-traces the logo (Pillow + vtracer).
- `npm run links` (after a build) checks every outbound link.
- Stop `npm run dev` before `npm run build`: both write `.next`.

## Recon

**Live site.** aboveboardgroup.co.uk is a Readdy-built Vite + React single-page app. The HTML is an empty `#root`; every word and image URL on the homepage is a literal in the main bundle (`/assets/index-*.js`). There is no content API.

**Homepage, in live order** (all kept, see "What's on the homepage" for where each went):

1. Announcement strip: "Looking for Air Conditioning Work? Join our WhatsApp group for live contract roles. Join Group" (mobile: "AC engineers needed across London & Surrey. Get instant job alerts on your phone.") → WhatsApp group.
2. Hero: "Above Board Group" / "Air Conditioning Contractors" / "London, Surrey & Surrounding Areas", line, Call 0203 3930 855, Contact Us, a quick-quote form ("Get a Quick Commercial Quote"). Photo: an office cassette install.
3. "What Do You Need?": Domestic (→ sister company Eco Fix), Commercial, Day Rate, Build Your Team. The last three open an enquiry modal.
4. Tip of the Day: 30 tips, one per day of the year (`dayOfYear % 30`), each linking to a guide or industry page.
5. "How It Works": 4 steps (Same Day / Within 24 Hours / As Scheduled / On Completion), "Call Now — Start Your Project".
6. "Built By Engineers, For Engineers" with counters 100+ projects, 1,000+ pair days, 50+ clients (the counters animate up; a mid-count reading of 73/735/36 is not the value, the bundle's targets are).
7. Meet The Team: Taylor Robinson (Managing Director), Dan Scott (Head of Labour Services), Ricardo Luxford (Head of Projects).
8. "Built On Site, Not In An Office" and 10 points.
9. Recent Projects: Splashes Leisure Centre (Rainham), Royal College of Obstetricians and Gynaecologists (London Bridge), Lidl Fulham, Lidl Hoxton.
10. Latest Work: 9 site photos in a carousel.
11. A long commercial-AC block: intro, 7 systems, 11 client types, 3 project teasers, 12 coverage areas, 4 guides, 8 "Why Choose" points.
12. "Why Businesses Trust Aboveboard Group": 4 cards and 6 certification badges.
13. LinkedIn feed: posts by Dan Scott, Taylor Robinson and Michaela Samet.
14. Google Reviews: 5.0 from 6 reviews.
15. 10 FAQs.
16. "Need AC Labour or Project Support?": phone, email, office, and a detailed enquiry form.
17. Footer: three service blurbs, tagline, quick links, address, keyword line.

**Links.** The server answers 200 for any path (an unknown URL renders the app's not-found view in the browser), so status codes cannot prove a page exists. `sitemap.xml` lists 308 URLs; every link to the live site is checked against it (see Content).

**Structure.** Header: Home, Areas Covered, Blog, Industries, Portfolio, Tenders, Domestic AC (eco-fix.uk), Contact, Call Now. Footer: Quick Links (Areas Covered, Blog, Industries, Portfolio, Tenders, Contact). Accounts: `/register` and `/login`, for engineers bidding on the Tenders board. Socials: LinkedIn company page, Google Business profile.

**Reference.** airmastersolutions.com, Framer. Measured from computed styles, its `framer/appear` config and a rAF probe (values are quoted beside each use in `app/globals.css` and `lib/ease.ts`).

## What's on the homepage

| # | Section | Source on the live homepage | Scene |
| --- | --- | --- | --- |
| 0 | Ticker | The announcement strip, both wordings | navy strip |
| 1 | Preloader | The official logo, traced to vectors | base |
| 2 | Hero | Eyebrow, headline, line, both CTAs, the quick-quote panel, hero photo, 3 accreditations from the trust cards | base |
| 3 | Services | "What Do You Need?", 4 cards | white |
| 4 | About | "Built By Engineers, For Engineers", both CTAs, the 3 counters | base |
| 5 | Process | "How It Works", 4 steps, CTA, plus the Tip of the Day card | white |
| 6 | Projects | "Recent Projects", 4 projects, "View Commercial AC Projects" | base |
| 7 | Why | "Built On Site, Not In An Office", 10 points, CTA | white |
| 8 | Latest Work | 9 site photos in a side-scrolling rail | base |
| 9 | Team | "Meet The Team", 3 leaders | white |
| 10 | Commercial | Intro, systems and client types (as two tabs), coverage areas, 4 guides | base |
| 11 | Trust | 4 cards, 6 badges, the 8 "Why Choose Aboveboard Group?" points | white |
| 12 | Voices | Google reviews (5 written + score), 4 LinkedIn posts | base |
| 13 | FAQ | 10 questions | white |
| 14 | Contact | "Need AC Labour or Project Support?", phone, email, office, quick-quote card | base + navy card |
| 15 | Footer | Service blurbs, tagline, quick links, address, socials, legal, keyword line | navy card |

Merged: the three "Commercial AC projects" teasers are the same jobs as Recent Projects, so only the link survives; the "Why Choose" points join the trust section; the tip joins the process. Copy is verbatim, including its capitalisation.

## Content

- **Copy** is in `lib/home-content.ts`. **Header, menu and footer** data is in `lib/menu.ts`.
- **Bundle data** (`content/home.json`, from `scripts/fetch_content.py`): the script fetches the live shell, finds the current bundle, extracts the arrays the homepage renders (team, stats, projects, gallery, 30 tips, reviews, LinkedIn posts), converts them to JSON and downloads every photo as WebP.
  - LinkedIn: four posts about the work, two per director. Personal posts, reposts of other companies' job ads and posts containing personal mobile numbers are left out. Relative dates ("3w") and reaction counts are dropped because a snapshot makes them wrong.
  - Reviews: the five with text. The reviewer names, counts and "Local Guide" flag are as published.
- **Links**: `scripts/check_links.py` reads the built HTML plus the menu data (only the open tab renders) and checks all of them.
  - 40 links to aboveboardgroup.co.uk: all in its sitemap, except `/register` and `/login`, whose page chunks (`RegisterPage-*.js`, `LoginPage-*.js`) are in the live bundle and which the live Tenders page links to.
  - 5 external links (eco-fix.uk, WhatsApp group, LinkedIn, Google Maps reviews, Google profile): all 200.
  - In-page anchors: `#top`, `#main`, `#contact`, `#projects`, `#team`, each checked against an id on the page. No `#` placeholders.
- **Images** (`public/images/`, WebP, nothing hotlinked), all from the live homepage's own storage (`storage.readdy-site.link`, `static.readdy.ai`):
  - `hero-install.webp`: the live hero photo.
  - `site-work-01…09.webp`: the Latest Work photos. They also illustrate the service cards, About and Why, because those sections have no images of their own on the live page.
  - `project-*.webp`: the portfolio images. Lidl's is its logo, so it is shown whole (`contain`) on white.
  - `team-*.webp`, `avatar-dan-scott.webp`: portraits. Taylor Robinson's LinkedIn avatar is his team photo (the live feed shows an initial).
  - `about-team.webp` is downloaded but not shown: it is the full logo on black, the source of the trace.
- **Icons**: Simple Icons paths for LinkedIn, Google and WhatsApp (`lib/brand-icons.ts`).

## Brand

- **Logo**: only raster logos are published. The sharpest is a 2000×2000 JPG (the logo on black) that the live About section uses. `scripts/trace_logo.py` masks each colour (amber, blue, white) and traces it with vtracer in binary mode into 19 shapes: the mark's **flame**, **hook** and **bowl** (amber) and **wave** (blue), then A-B-O-V-E-B-O-A-R-D and G-R-O-U-P (`lib/logo-parts.ts`). Each shape sits in its own `<g transform="translate()">`, so GSAP can transform the path without overwriting its position.
  - `Logo` in `components/ui.tsx` draws the shapes live: the mark keeps its amber `#FAB52B` and blue `#2575B3`, the wordmark takes `currentColor` (navy on light, white on navy), as the site uses it.
  - `layout="stack"` is the official lockup (preloader, footer). `layout="row"` puts the same mark beside the same wordmark for the header, where the stacked lockup would shrink the letters below reading size.
  - `app/icon.svg` is the traced mark. The live favicon is a 🔥 emoji, which was not reused.
- **Palette**: navy `#06243A` (the live site's `navy` token), orange `#F47C2C` (its accent, the class it calls `text-cyan`), white, plus the reference's neutral grey `#F6F7F9`. The logo's amber and blue live only inside the logo.
  - No other hue appears in the interface, including hovers, focus rings and gradients. Photography keeps its own colour.
  - Orange is never small text on white (2.9:1). It carries rules, discs, step numbers and hover fills, with navy text on it (5.4:1).
- **Type**: the two families aboveboardgroup.co.uk loads: **Outfit** for headings (its `font-heading`) and **Inter** for everything else. Self-hosted from `@fontsource-variable` (OFL) in `app/fonts`. Headings are Outfit 600 with the reference's tight tracking (-0.04em, from its 50px / -2px h2); the hero's second line is Outfit 300.

## How it works

### Preloader (`components/Loader.tsx`)

The company signing its name, built from the traced logo in its real colours on the hero's opening grey, on one GSAP timeline 1.85s long.

| Time | Stage |
| --- | --- |
| 0.10–0.77s | The bowl rises into place on the reveal spring. |
| 0.22–0.67s | The wave wipes across it, left to right. |
| 0.30–0.97s | The flame grows up out of the bowl from its base. At 0.50s the small hook flicks on. |
| 0.42–1.02s | ABOVEBOARD rises letter by letter, 0.03s apart; from 0.62s GROUP wipes in beneath it. |
| 1.02–1.20s | Hold. |
| 1.20–1.85s | Exit: the handover fires, the wordmark lifts away, the mark flies into the header logo's exact position and size (a live FLIP, re-measured every frame), and the grey ground fades to show the hero already entering. |

- **Why this build**: the mark is a flame over a wave in a bowl, so it is lit rather than assembled: the vessel, then the water, then the flame. The wordmark is a heavy grotesque, so it rises as letters and the small spaced GROUP wipes.
- **Handover**: at 1.20s it removes `is-loading` from `<html>`, sets `data-intro="done"` and dispatches `intro:done`. The hero entrance and the header fade listen for that event, so they overlap the exit. The header's own mark stays hidden until the flying mark lands on it (`data-logo="landed"`), so there is never a double logo. Checked by seeking: at 1.84s the loader mark and the header mark share the same box (63.8, 45.5, 35.6px wide at 1440×900).
- **Never blocks**: an inline head script adds `is-loading` before first paint; if hydration is late the loader is skipped; a CSS fallback fades it at 2.2s if JS never runs; the head script hands over at 4.5s whatever happens. Lenis is stopped until handover.
- It plays on each visit. It is `aria-hidden`; reduced motion and `<noscript>` hide it.
- The dev build exposes the timeline as `window.__intro` for seeking. Use `__intro.seek(t, false)` so the flight's `onUpdate` runs. It is not in production.

### Motion system (`components/motion.tsx`, `lib/ease.ts`)

Tokens measured on airmastersolutions.com (its `<script type="framer/appear">` config):

- **Reveal spring**: `{stiffness 400, damping 60, mass 1}` from `y: 40` and opacity 0. Overdamped (ζ 1.5), so it glides with no overshoot. It settles in 0.83s.
- **Appear tween**: 0.4s on Framer's `[.44, 0, .56, 1]`.

`lib/ease.ts` solves the spring analytically for GSAP; the same curve is sampled into a CSS `linear()` as `--ease-reveal` in `app/globals.css`.

| Move | Attribute | What it does |
| --- | --- | --- |
| Headings | `data-rise` | The whole phrase fades and rises 40px on the reveal spring. |
| Paragraphs | `data-words` | Words slide up out of a line mask, at most 0.012s apart. |
| Labels and buttons | `data-appear` | The appear tween, a plain fade, 0.1s apart in reading order. |
| Cards | `data-card` | Batched as they enter: fade and rise 40px on the spring, 0.1s stagger. |
| Images | `data-image` (+ `data-parallax`) | The frame clips open from an inset; the photo drifts ±5% (10% travel). |

- Every move plays once. Sections marked `data-soft` (commercial, trust, voices, FAQ, contact, footer) run the same moves shorter and half the distance.
- Per-word motion outside the preloader and hero is limited to paragraph masks; nothing is per-letter.
- **Counters** (About): count up once to the live targets (100, 1,000, 50) when they enter.

### Other systems

- **Smooth scroll**: Lenis on the GSAP ticker, synced with ScrollTrigger. In-page anchors go through Lenis. The menu and the preloader stop it.
- **Scenes and header**: the reference uses hard section fills (grey `#F6F7F9` / white), so sections declare `data-tone` (`base`, `white`, `navy`). The section under the header sets `html[data-htone]`; the header's text, wordmark, menu button and Call Now pill recolour to match. The header has no bar, hides on scroll down and returns on scroll up or focus.
- **Ticker**: the reference's masked marquee (`.strip`), carrying the live strip text; CSS animation, paused on hover and focus, off with reduced motion.
- **Menu** (`components/chrome.tsx`): Industries, Areas Covered and Blog open a full-screen navy sheet on that tab (12 industry pages, 12 areas, 8 guides). The other nav items, Call, **Register to Bid** and **Sign In** are in the sheet too, so they are reachable on phones. The sheet wipes down, the items rise; the timeline reverses faster on close. Focus is trapped, Esc closes, focus returns to the trigger (checked by keyboard).
- **Hero** (`components/home/Hero.tsx`): 100svh, split 45/55. The photo sits in the reference's frame (16px inset, 24px radius) with the quick-quote panel inside it. Entrance on `intro:done`: the frame rises and unclips, the photo settles from 1.14×, headline words rise from masks, the rest fades in 0.1s apart. It measures exactly 900px at 1440×900; below 960px it stacks.
- **Tip of the Day**: the live rotation formula, run after mount so a static build still shows today's tip.
- **Latest Work**: a native horizontally scrolling row (scroll-snap) with prev/next buttons; the page itself never scrolls sideways.
- **Commercial lists**: the 7 systems and 11 client types are two ARIA tabs (arrow keys switch). The hidden panel stays in the HTML.
- **FAQ**: native `<details>`, so it works without JS; the height animates on the reveal curve where the browser can animate to `auto`.
- **Photography**: full colour. Linked photos zoom 5% on hover, on the reveal spring.

### Copied interaction: airmastersolutions.com "Get Started Now"

`Button` in `components/ui.tsx`, styled by `.btn` in `app/globals.css`. Measured on the live Framer component ("White Button"):

- **Box**: flex, gap 48px, padding 8px 8px 8px 24px, radius 50px, 56px tall; label 16px/600; a 40px disc (12px padding) holding a 16px arrow turned -45°.
- **Hover**: one 0.4s tween on `[.44, 0, .56, 1]`: the pill fills orange, the disc turns dark, the arrow turns level, the label changes colour. The same tween runs back on leave.
- **Brand mapping**: the reference's orange → Aboveboard orange, its black → navy. The label on the orange fill is navy, not white (white on `#F47C2C` is 2.9:1).

Sampled side by side with the same probe (arrow angle, hover-in):

| | airmastersolutions.com | This site |
| --- | --- | --- |
| ~115ms | -38.1° | -38.4° |
| ~210ms | -20.3° (216ms) | -20.9° (208ms) |
| ~305ms | -4.4° (316ms) | -5.5° (305ms) |
| Settled | 0° at 415ms | 0° at 400ms |

Our box measures 273×56 with the same padding, gap and radius. Variants: `navy` (light scenes), `white` (navy scenes), `line` (secondary), and `compact`. Card footers use a small version of the same pill (`.chip-cta`) that turns with the card's hover.

### Accessibility and fallbacks

- **Keyboard**: skip link; focus rings in each scene's contrast colour (navy on light, orange on navy); the menu is a real dialog with tabs; the commercial lists are tabs; the photo rail is focusable and scrolls by keyboard.
- **Contrast** (checked): navy on white 15.9:1, on grey 14.8:1; muted text 7.1:1 / 6.6:1; white on navy 15.9:1; muted white on navy 9.2:1; navy on orange 5.4:1.
- **Reduced motion**: no smooth scroll, loader, reveals or ticker; content is visible without movement; CSS movement (disclosure height, photo zoom, arrow turns) is switched off. Verified by code path; the browser pane used for QA cannot emulate the media query.
- **No JS**: `<noscript>` CSS hides the loader, stops the ticker and shows every revealed element. The FAQ still opens.

## Private demo settings

- `robots` is `noindex, nofollow` in `app/layout.tsx`. There is no sitemap.
- PostHog (EU) and the 25/50/75/100 `scroll_depth` events are in `lib/posthog.ts`, injected in the `<head>`. The key can be overridden with `NEXT_PUBLIC_POSTHOG_KEY`. Surveys are disabled and no visible UI is added. The script never gets `id="posthog"`.
- No form submits anything: enquiry buttons go to the live `/contact` page, which hosts the real form.

## Decisions (the brief left these open)

- **References**: one URL was given, so airmastersolutions.com is both the look and the motion reference. No design infusion.
- **Palette**: navy, orange, white and the reference's grey, as above. The logo's amber and blue stay inside the logo.
- **Typography**: Outfit (display) and Inter (body), the site's own pair.
- **Copied interaction**: the reference's primary pill button hover.
- **Preloader frequency**: every visit.
- **Offer bar**: the live site has no offer, but it has a real announcement strip (join the engineers' WhatsApp group), so that runs in the reference's ticker, verbatim.
- **Forms**: the live hero quick-quote form and the full enquiry form are not rebuilt; their headings and copy stay, and their buttons open the live contact page, so a demo never posts to the company's inbox. The service cards' modal enquiries become links to the enquiry section.
- **Header lockup**: mark beside wordmark (the official parts, rearranged) for legibility at header size; the stacked official lockup is used in the preloader and footer.
- **Section images**: sections without their own imagery use the site's own Latest Work photos; no stock.
- **LinkedIn**: four posts, two per director (see Content for what was left out and why). Michaela Samet's posts are not shown because they carry her personal mobile number.
- **Favicon**: the traced mark instead of the live 🔥 emoji.
