# ProcessMind LLC — Claude Context
**Last updated:** May 2026
**Version:** 1.0.0

## What This Is
The professional consulting website for ProcessMind LLC — a process consulting and AI-enabled solutions firm owned by Phil Fenton. Dark authoritative aesthetic matching the MWS circle badge mark. Tagline: "Every broken process has a solution. We find both." Built in React/Vite, deployed to GitHub Pages.

## Current Status
- **Live:** mysterwolf.github.io/processmind/ (base path fix may be needed)
- **Custom domain:** useprocessmind.com or similar (TBD — not yet registered)
- **Known issue:** vite.config.js base path may need to be '/processmind/' if site not rendering
- **Deployed from:** gh-pages branch

## Tech Stack
| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | React/Vite | Single page app |
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
| src/ProcessMind.jsx | Main component. Full consulting site. |
| vite.config.js | base: '/processmind/' for GitHub Pages subdirectory |

## Site Sections
1. Hero — tagline, discovery call CTA, concentric circle geometric
2. Marquee — seven step names cycling continuously
3. Animated stats — $200K+, 7 steps, 90%, 3x (count up on scroll)
4. Seven Steps framework — hover turns name gold
5. Use Cases — 4 cards, 2x2 grid
6. About — fixer positioning, pricing grid
7. CTA — "Tell us what's broken. We'll handle the rest."
8. Contact — discovery call form → mailto:info@mysterwolf.studio

## Architecture Decisions
- Contact form uses mailto: info@mysterwolf.studio until ProcessMind domain acquired
- MWS circle badge mark in nav (dark version, 36px)
- No analytics, no backend, no CMS
- Noise texture overlay via SVG data URI — no external image
- Animated stats use IntersectionObserver + setInterval

## Invariants — Never Change These
- **vite.config.js base must match deployment path** — '/processmind/' for subdirectory, '/' for custom domain
- **CSS variables live only in :root block** — never hardcode colors
- **Contact routes to info@mysterwolf.studio until domain is set up**
- **MWS mark (dark version) in nav and footer — never light version**

## Pending Work
1. Fix base path if site not rendering (set to '/processmind/' in vite.config.js)
2. Register domain — useprocessmind.com or similar
3. Add CNAME when domain is ready, change base to '/', redeploy
4. Update contact email when processmind domain email is set up
5. Add real case studies as engagements complete
6. Add testimonials section when client feedback is available

## Entity Note
ProcessMind LLC is a single-member LLC owned solely by Phil Fenton. Any partner involvement is project-based and contract-specific — not a standing partnership. This site represents Phil's consulting business, not a shared entity.

## Claude Code Session Starter
"I'm working on the ProcessMind LLC consulting site at github.com/MysterWolf/processmind. Pull the repo and read CLAUDE.md. If the site isn't rendering, check vite.config.js base path — it should be '/processmind/'. CSS variables only in :root. Contact routes to info@mysterwolf.studio. Confirm before making any changes."

## Changelog
### May 2026
- Initial site built: dark navy/gold theme, seven steps, animated stats, marquee, use cases
- Deployed to GitHub Pages
- Base path issue identified — may need '/processmind/' in vite.config.js
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
Then pull this repo and read CLAUDE.md in full. If the site isn't rendering check vite.config.js
base path — it should be '/processmind/'. CSS variables only in :root.
Contact routes to info@mysterwolf.studio until domain is acquired.
Confirm before making any changes."
