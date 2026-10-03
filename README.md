# Fahmida Yeasmin — MERN Stack Developer

Portfolio site built with React, Tailwind CSS v4 and Framer Motion.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build -> dist/
npm run preview  # serve the production build
```

## Stack

| Purpose | Choice |
| --- | --- |
| Build | Vite 8 |
| UI | React 19 |
| Styling | Tailwind CSS v4 (CSS-variable driven, light + dark) |
| Animation | Framer Motion (reduced-motion aware) |
| Icons | Lucide React + local brand glyphs |
| Lint | oxlint |

## Structure

```
src/
  components/     reusable UI (Navbar, ProjectCard, ProjectModal, ContactForm, ui/*)
  sections/       page sections, one file per section
  data/           all content — profile, projects, skills, journey
  hooks/          useTheme, useScrollSpy, useScrollPosition, useGithubProfile
  layouts/        RootLayout (skip link, nav, main, footer)
  lib/            cn()
```

## Editing content

Everything recruiters read lives in `src/data/`, so no component edits are needed:

- `profile.js` — name, role, headline, intro, About copy, email, socials, resume, contact endpoint
- `projects.js` — add an object to the array; cards, modals and counts all follow automatically
- `skills.js` — MERN highlight, skill groups, "What I Build" cards
- `journey.js` — timeline stages

### Placeholders that need your input

| What | Where | Note |
| --- | --- | --- |
| LinkedIn URL | `data/profile.js` → `socials` | `href: null` renders a non-navigating placeholder rather than a guessed link |
| Deployment domain | `index.html`, `public/robots.txt`, `public/sitemap.xml` | currently `https://fahmidayeasmin.dev` |
| Resume | `data/profile.js` → `resume` | drop the PDF in `public/` and set `available: true` |
| Contact form delivery | `data/profile.js` → `contactEndpoint` | `null` composes a `mailto:`; set a Formspree/Web3Forms URL to POST directly |
| Portrait | `public/fahmida.jpg` | falls back to a monogram card if the file is missing |

## GitHub section

Repo count, followers and the language breakdown are fetched live from the public
GitHub API and are **hidden rather than estimated** if the request fails — the
section then falls back to curated project links. Unauthenticated requests are
rate-limited per IP, so a failure here is expected sometimes, not a bug.

## Verification

```bash
npm run lint          # oxlint
npm run check:icons   # verifies every icon/JSX import resolves
npm run audit         # headless-browser checks (see below)
```

`npm run audit` needs Chromium once: `npx playwright install chromium`, and a
running preview server on port 4173 (`npm run preview`). It asserts layout
integrity at five widths, WCAG AA contrast in both themes, heading order, focus
trapping in the modal, form validation, offline degradation and reduced-motion
behaviour. Remove `playwright` from `devDependencies` and the `audit` script if
you don't want it in the project.