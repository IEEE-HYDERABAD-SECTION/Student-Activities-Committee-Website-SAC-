# IEEE Hyderabad Section — Student Activities Committee Website

Official website of the IEEE Hyderabad Section Student Activities Committee, live at **[sac.ieeehyd.org](https://sac.ieeehyd.org)**.

---

## Tech Stack

| Layer | Tool |
|-------|------|
| Static site generator | [Eleventy (11ty) v3](https://www.11ty.dev/) |
| Templates | Nunjucks |
| CMS | [Decap CMS v3](https://decapcms.org/) at `/admin/` |
| Auth proxy | Cloudflare Worker ([sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth)) |
| Hosting | GitHub Pages via GitHub Actions |
| CSS | Custom design system (`css/modern.css`) — no Bootstrap |

---

## Local Development

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start local dev server (live reload)
npm run serve
# → http://localhost:8080

# Production build
npm run build
# → output in _site/
```

---

## Project Structure

```
├── src/                    # Eleventy source — all pages as .njk templates
│   ├── _includes/
│   │   ├── layouts/        # base.njk — shared HTML shell (head, nav, footer)
│   │   └── partials/       # header, footer, event-card partials
│   └── _data/              # JS data loaders (events.js, global.js)
├── data/                   # CMS-managed content (JSON files, edited via /admin/)
│   ├── events/             # One JSON file per event
│   ├── team/               # sn-2025-26.json, core-2026-27.json
│   ├── nav.json            # Navigation mega-menu structure
│   └── site.json           # Homepage hero, stats, announcements
├── admin/                  # Decap CMS
│   ├── index.html          # CMS entry point
│   └── config.yml          # Collections schema
├── css/modern.css          # Design system (tokens, components, dark mode)
├── js/modern-site.js       # Theme toggle, nav, scroll reveals
├── images/                 # Logos, team photos, hero image
├── assets/                 # CMS-uploaded files (events posters, reports, uploads)
├── archive/                # Legacy event HTML pages (read-only, preserved for history)
├── scripts/
│   └── import-vtools.mjs   # One-time importer for IEEE vTools event pages
├── .eleventy.js            # Eleventy configuration
└── .github/workflows/
    └── static.yml          # GitHub Actions — builds and deploys to GitHub Pages
```

---

## Adding / Editing Content (CMS)

Non-technical editors can manage all content at **[sac.ieeehyd.org/admin/](https://sac.ieeehyd.org/admin/)**.

Login requires a GitHub account with write access to this repository. See [CONTRIBUTING.md](CONTRIBUTING.md) for a step-by-step guide.

**What you can edit in the CMS:**

- **Events** — add new events, upload posters, set dates/venues
- **Event Reports** — upload PDF reports and photo galleries
- **SN Team** — update 2025-26 member roster and photos
- **SAC Core Team** — update 2026-27 executive committee
- **Homepage** — change hero title, subtitle, hero image, announcement bar, stats

CMS edits create a pull request (editorial workflow). A team admin merges the PR, and the site rebuilds automatically in ~60 seconds.

---

## Importing Events from IEEE vTools

```bash
node scripts/import-vtools.mjs
```

Reads vTools event page URLs from the script, fetches metadata (title, date, venue, poster), and writes one JSON file per event into `data/events/`. Review the generated files before committing.

---

## Deployment

Every push to `main` triggers a GitHub Actions workflow that:
1. Runs `npm ci && npm run build`
2. Uploads `_site/` to GitHub Pages

The site is served at `sac.ieeehyd.org` via the `CNAME` file.

---

## CMS Authentication Setup (one-time, for maintainers)

1. A GitHub OAuth App must be registered and a Cloudflare Worker deployed with the client credentials. See `admin/config.yml` for the current worker URL.
2. The OAuth App must be approved in the IEEE-HYDERABAD-SECTION org settings under **Third-party Access → OAuth application policy**.
3. Any GitHub user with write access to this repo can then log in at `/admin/`.

---

## Contributing

- **Content edits** — use the CMS at `/admin/`
- **Code changes** — open a pull request against `main`
- **Team photos / logos** — place in `images/` and reference in the relevant JSON file in `data/team/`
