# ProcessMind LLC — Claude Context
**Last updated:** June 2026
**Version:** 1.1.0

## What This Is
The professional consulting website for ProcessMind LLC — a process consulting and AI-enabled solutions firm owned by Phil Fenton. Dark authoritative aesthetic matching the MWS circle badge mark. Tagline: "Every broken process has a solution. We find both." Built in React/Vite, deployed to GitHub Pages.

## Current Status
- **Live:** mysterwolf.github.io/processmind/
- **Intro page:** mysterwolf.github.io/processmind/#/intro
- **Custom domain:** useprocessmind.com or similar (TBD — not yet registered)
- **Deployed from:** gh-pages branch

## Tech Stack
| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | React/Vite | Multi-page via HashRouter |
| Routing | react-router-dom (HashRouter) | Hash routing required for GitHub Pages static hosting |
| Hosting | GitHub Pages | gh-pages branch |
| Styling | CSS variables | Full dark palette in :root block |
| Fonts | Cormorant Garamond, DM Sans, DM Mono | Google Fonts |

## Brand Palette (CSS Variables)
```css
--pm-bg:      #0A0C12   /* deep dark navy — matches MWS mark dark bg */
--pm-gold:    #C4A962   /* MWS brand gold */
--pm-text:    #E8E6E0   /* warm off-white text */
--pm-surface: #0F1219   /* card surfaces */
--pm-border:  #1E2230   /* subtle borders */
```
To retheme: update only the :root block. Do not change values elsewhere.

## Key Files
| File | Purpose |
|------|---------|
| src/App.jsx | Main site component. Full consulting site (hero, steps, use cases, about, contact). |
| src/Intro.jsx | Cold intro one-pager. Served at /#/intro. QR code / forwarded link target. |
| src/main.jsx | Entry point. Mounts HashRouter with routes for App and Intro. |
| vite.config.js | base: '/processmind/' for GitHub Pages subdirectory |

## Routes
| Path | Component | Purpose |
|------|-----------|---------|
| `/#/` | src/App.jsx | Main consulting site |
| `/#/intro` | src/Intro.jsx | Cold intro one-pager for QR codes / forwarded links |

**Routing note:** HashRouter is required for GitHub Pages (no server-side routing). All routes use `#/` prefix. When a custom domain is configured, HashRouter stays — do not switch to BrowserRouter without also adding a 404.html redirect.

## Main Site Sections (src/App.jsx)
1. Hero — tagline, discovery call CTA, concentric circle geometric
2. Marquee — seven step names cycling continuously
3. Animated stats — $200K+, 7 steps, 90%, 3x (count up on scroll)
4. Seven Steps framework — hover turns name gold
5. Use Cases — 4 cards, 2x2 grid
6. About — fixer positioning, approach/deliverable/industries grid + soft CTA
7. CTA — "Tell us what's broken. We'll handle the rest."
8. Contact — discovery call form → mailto:info@mysterwolf.studio

## Intro Page Sections (src/Intro.jsx)
1. Hero — "Your processes are costing you more than you think." + pill tags
2. Two Modes — Process Mode / Idea Mode cards with taglines
3. Seven Steps — same framework, same StepRow component pattern
4. Case Study — generic telecom PM example, stat grid (338/203/1), pull quote
5. What to Expect — 4-step numbered list of what happens in a session
6. CTA — "Let's talk about what makes sense." → mailto:info@mysterwolf.studio

## Architecture Decisions
- Contact form uses mailto: info@mysterwolf.studio until ProcessMind domain acquired
- MWS circle badge mark in nav (dark version, 36px)
- No analytics, no backend, no CMS
- Noise texture overlay via SVG data URI — no external image
- Animated stats use IntersectionObserver + setInterval
- HashRouter chosen over BrowserRouter: GitHub Pages serves static files only — direct URL access to `/intro` would 404 without server config; hash routing works natively
- Each page component is self-contained: CSS variables, fonts, and all styles live in a `<style>` block inside the component — do not move shared styles to index.css

## Invariants — Never Change These
- **vite.config.js base must match deployment path** — '/processmind/' for subdirectory, '/' for custom domain
- **CSS variables live only in :root block** — never hardcode colors
- **Contact routes to info@mysterwolf.studio until domain is set up**
- **MWS mark (dark version) in nav and footer — never light version**
- **Use HashRouter — do not switch to BrowserRouter without adding a 404.html redirect for GitHub Pages**
- **New pages go in src/ as standalone components and get a Route in main.jsx** — do not nest pages inside App.jsx

## Pending Work
1. Register domain — useprocessmind.com or similar
2. Add CNAME when domain is ready, change vite.config.js base to '/', redeploy
3. Update contact email when processmind domain email is set up
4. Add real case studies to main site as engagements complete
5. Add testimonials section when client feedback is available

## Entity Note
ProcessMind LLC is a single-member LLC owned solely by Phil Fenton. Any partner involvement is project-based and contract-specific — not a standing partnership. This site represents Phil's consulting business, not a shared entity.

## Claude Code Session Starter
"I'm working on the ProcessMind LLC consulting site at github.com/MysterWolf/processmind. Pull the repo and read CLAUDE.md. If the site isn't rendering, check vite.config.js base path — it should be '/processmind/'. CSS variables only in :root. Contact routes to info@mysterwolf.studio. Confirm before making any changes."

## Changelog
### June 2026
- Removed all explicit pricing from site (discovery fees, build costs, retainer amounts) — pricing is never on the site, it comes up in conversation
- About section info grid now shows Approach, Deliverable, Industries only, with soft CTA below
- Intro page CTA changed from "The first session is free" to "Let's talk about what makes sense"
- Added react-router-dom (HashRouter) — site is now multi-page
- Added src/Intro.jsx — cold intro one-pager at /#/intro for QR codes and forwarded links
- Updated src/main.jsx to mount HashRouter with routes for App and Intro
- Deployed to GitHub Pages

### May 2026
- Initial site built: dark navy/gold theme, seven steps, animated stats, marquee, use cases
- Deployed to GitHub Pages
- Contact: mailto info@mysterwolf.studio (placeholder until domain acquired)

## Available Skills
Skills live at github.com/MysterWolf/skills. Pull that repo and read README.md
to see all available skills before starting work.

Relevant skills for this repo:
- spinup-site — reference for site architecture patterns
- update-context — update this CLAUDE.md after session, commit and push
- audit-repo — read-only snapshot of repo state

## Updated Claude Code Session Starter
"I'm working on the ProcessMind LLC consulting site at github.com/MysterWolf/processmind.
First pull github.com/MysterWolf/skills and read README.md so you know what skills are available.
Then pull this repo and read CLAUDE.md in full.
Routing uses HashRouter — main site is /#/, intro page is /#/intro.
CSS variables only in :root blocks inside each component. Do not move styles to index.css.
Contact routes to info@mysterwolf.studio until domain is acquired.
New pages go in src/ as standalone components with a Route added in main.jsx.
Confirm before making any changes."
