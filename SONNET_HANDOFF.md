# Sonnet Handoff — IEEE SAC Modernization

Opus has built the foundation. Your job is the mechanical migration.

## What's already in place

- **Eleventy build:** `package.json`, `.eleventy.js`, updated `.github/workflows/static.yml`.
- **Design system:** `css/modern.css` (tokens, components, dark mode) + `js/modern-site.js` (sticky header, mobile nav, theme toggle, reveal-on-scroll). Do **not** add Bootstrap/jQuery/AOS back.
- **Layouts:** `src/_includes/layouts/base.njk`, partials at `src/_includes/partials/{header,footer,event-card}.njk`.
- **Data layer:** `data/nav.json`, `data/site.json`, `data/team/*.json`, plus loaders in `src/_data/`.
- **Reference pages already migrated (study these first):** `src/index.njk`, `src/events.njk`, `src/sn-team.njk`.
- **Decap CMS:** `admin/index.html` + `admin/config.yml` (4 collections). The OAuth proxy + GitHub OAuth App still need to be configured by the maintainer — `admin/config.yml` has TODO markers showing exactly where.
- **vTools importer:** `scripts/import-vtools.mjs`. Run `npm install` then `npm run import:vtools` to seed 16 events.

## First step: verify the foundation builds

```bash
npm install
npm run serve
```

Visit http://localhost:8080. The three reference pages (`/`, `/events/`, `/sn-team/`) should render. If they don't, fix that before doing anything else.

## Your work — strictly mechanical

### 1. Port remaining pages to Nunjucks (highest priority)

For each HTML file below, create a `.njk` counterpart in `src/` extending `layouts/base.njk`. Copy the body content into the layout; **do not** retain the old header/footer/nav markup — those are now in partials. Strip Bootstrap classes and rewrite with the design system tokens in `css/modern.css` (`.section`, `.container`, `.grid`, `.card`, `.btn`, `.eyebrow`, etc.).

| Source HTML | New Nunjucks file | Permalink |
|---|---|---|
| `about-sac.html` | `src/about-sac.njk` | `/about-sac/` |
| `about-ieee.html` | `src/about-ieee.njk` | `/about-ieee/` |
| `contact-us.html` | `src/contact-us.njk` | `/contact-us/` |
| `chapter-affinity.html` | `src/chapter-affinity.njk` | `/chapter-affinity/` |
| `membership-benefits.html` | `src/membership-benefits.njk` | `/membership-benefits/` |
| `gallery.html` | `src/gallery.njk` | `/gallery/` |
| `reports.html` | `src/reports.njk` | `/reports/` |
| `event-reports.html` | `src/event-reports.njk` | `/event-reports/` (data-driven from `reports` collection) |
| `sac-core-team.html` | `src/sac-core-team.njk` | `/sac-core-team/` (data-driven from `team.core`) |
| `humanitarian-activities.html` | `src/humanitarian-activities.njk` | `/humanitarian-activities/` |
| `student-branch-details.html` | `src/student-branch-details.njk` | `/student-branch-details/` |
| `student-professional-awareness.html` | `src/student-professional-awareness.njk` | `/student-professional-awareness/` |
| `young-professionals.html` | `src/young-professionals.njk` | `/young-professionals/` |
| `sac-award-programs.html` | `src/sac-award-programs.njk` | `/sac-award-programs/` |

**Pattern to follow:** look at `src/sn-team.njk` for a data-driven page and `src/index.njk` for a content-heavy page.

### 2. Archive legacy event pages

`git mv` the following to `archive/` (Eleventy already passthrough-copies the `archive/` folder):

```
SSC2022.html SSC2023.html evolvex-21.html adithyam.html parjanya.html
igen.html utsang.html umang.html unlock-15.html udgama.html ssc.html
```

The nav links in `data/nav.json` already point to `/archive/<filename>.html`.

### 3. Run the vTools importer + clean up

```bash
npm run import:vtools
```

Then manually review each `data/events/*.json` for:
- Date parsing accuracy (vTools sometimes splits date/time across rows)
- Poster image — if the og:image is a generic IEEE banner, replace with `""` so the card uses a fallback
- Description trimming
- Set `featured: true` on 1–2 marquee events

### 4. Move loose root images out of the way

There are ~50 ad-hoc photos at repo root (`amitsir.JPG`, `audi.JPG`, `IMG_*`, etc.). Move them into `archive/legacy-images/`. Do not `git rm` — preserve everything.

### 5. Final cleanup

- Delete `js/header.js` and `js/footer.js` once **all** pages are ported (not before).
- Delete the original `*.html` files from root after their `.njk` counterparts work.
- Write a short `CONTRIBUTING.md` (~30 lines) for non-tech editors explaining: visit `/admin/`, log in with GitHub, click "Events" → "New Event", fill the form, click "Save". Mention the editorial workflow (creates a PR; needs review/merge to go live).

### 6. Verification checklist

- [ ] `npm run build` succeeds with no errors
- [ ] Every migrated page renders at its permalink
- [ ] Mobile nav opens/closes at <1024px
- [ ] Theme toggle switches light/dark
- [ ] No 404s on internal links (run `npx broken-link-checker http://localhost:8080 -ro` after `npm run serve`)
- [ ] Lighthouse on `/`: ≥ 90 Performance, 100 Accessibility, 100 Best Practices
- [ ] `/admin/` loads (it will show a login screen even before OAuth is configured — that's fine; the maintainer wires up auth separately)

## Constraints — do not violate

- **No Bootstrap, jQuery, AOS, Feather, Remixicon.** The new design system is hand-rolled and intentionally framework-free.
- **No new dependencies** without strong justification. The build already does what it needs.
- **Do not edit `data/events/*.json` schema** — the CMS config in `admin/config.yml` mirrors it exactly. Changing one without the other breaks the editor experience.
- **Keep `ID/` PHP folder untouched** — it lives on a separate PHP host.
- **No emojis in source files** unless the user explicitly asks.
