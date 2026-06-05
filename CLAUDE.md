# CLAUDE.md — oracaus.dev (apex site)

Guidance for Claude Code working in this repo. **Public repo** — the apex
`oracaus.dev` site under the Oracaus house brand: hub, writing (real-time UI
performance), work, about. Astro, static output, deployed to GitHub Pages.

> Private planning (strategy, chapter map, per-post briefs) lives in the
> **gitignored `tmp/`** — `tmp/PLAN.md` (what to write and why) and
> `tmp/AUTHORING.md` (voice, vocabulary, code-honesty). Never commit `tmp/`.

## Commands

```bash
npm install      # first run also creates package-lock.json (commit it — CI uses npm ci)
npm run dev       # local dev server
npm run build     # static build → dist/
npm run preview   # serve the built output
npm run check     # astro check (types + content schema)
```

## Stack

- **Astro 5**, static (no SSR). `@astrojs/react` (islands), `@astrojs/mdx`,
  `astro-expressive-code` (framed code blocks), `@astrojs/sitemap`,
  `@astrojs/rss`. Tailwind v4 via `@tailwindcss/vite` (same as the demo).
- **Design tokens** in `src/styles/tokens.css` are lifted from the demo
  (`oracaus/demo/src/styles.css`) so this site and `demo.oracaus.dev` cohere.
  Keep them in sync when either moves.

## Structure

```
src/
  content/blog/      # published posts (.mdx) — the book chapters
  content.config.ts  # blog collection schema (Astro 6: at src/ root)
  layouts/           # BaseLayout, PostLayout
  components/         # SiteHeader, SiteFooter
  pages/             # index, about, work, blog/, rss.xml.ts
  styles/tokens.css  # shared @theme
public/CNAME         # oracaus.dev
```

## Authoring a post

Add `src/content/blog/<slug>.mdx` with frontmatter: `title`, `description`,
`pubDate` (required); `updatedDate`, `tags`, `draft`, `canonicalUrl` (optional).
`draft: true` excludes it from build, listing, and RSS. Canonical defaults to
`oracaus.dev/blog/<slug>`; when cross-posting to dev.to, set dev.to's
`canonical_url` to that, so SEO credit consolidates here. Embed the live
testbed via a lazy `<iframe>` to `demo.oracaus.dev`, or small React islands
(`client:visible`) for per-chapter rigs.

The *voice and substance* rules for posts are in `tmp/AUTHORING.md` (private).

## Deploy

`.github/workflows/deploy.yml` builds and deploys to Pages on push to `main`.
Pages "Source" = GitHub Actions (one-time repo setting). Custom domain
`oracaus.dev` via `public/CNAME` + apex A/AAAA DNS records to GitHub Pages.

## Relationship to the other repos

- `oracaus/` — the library (`@oracaus/coherent-derivation`) + the demo. The
  demo deploys separately to `demo.oracaus.dev` from that monorepo. Source of
  truth for all code, numbers, and the testbed.
- `oracaus-mini-series/` — the conceptual-arc LinkedIn content (separate).

## Conventions

British English; AP-style possessive ("Oracaus's"); no em-dashes as a default
connector in published prose (periods / colons / semicolons); no marketing
register. Financial register visually (Inter / JetBrains Mono, tabular-nums).
