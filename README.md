# jlang61.github.io

Personal site and résumé of Justin Lang: software engineer working on databases, storage engines, and infrastructure.

**Live:** https://jlang61.github.io

## Stack

- **React 19 + TypeScript**, bundled with **Vite**
- **Pre-rendered to static HTML** at build time (`scripts/prerender.mjs`), then hydrated, so the page reads without JavaScript and unfurls correctly in link previews
- Hand-written CSS: `light-dark()` color tokens, container queries, View Transitions for the theme switch, a print stylesheet that turns the page into a résumé
- No UI or animation libraries; runtime dependencies are just `react` and `react-dom`

Features worth poking at:

- **Live Merkle trie** in the hero. Click a leaf to write a value and watch the hashes propagate to the root; hover a leaf to see its inclusion proof.
- **Command menu**: press `⌘K` / `Ctrl K` (or `/`) to jump anywhere. It's built on the native `<dialog>` element with the ARIA combobox pattern.
- Keyboard and screen-reader friendly, and respects `prefers-reduced-motion` and `prefers-color-scheme`.

## Editing content

Everything shown on the page lives in [`src/content.ts`](src/content.ts): experience, projects, education, skills, and the archive of older work. Components only handle presentation.

The résumé PDF is served from [`public/Justin_Lang_Resume.pdf`](public/Justin_Lang_Resume.pdf).

## Development

```bash
npm install
npm run dev        # dev server at http://localhost:5173
npm run build      # typecheck, build, and pre-render to dist/
npm run preview    # serve the production build
```

## Deploying

Pushing to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the site and publishes `dist/` to the `gh-pages` branch. To deploy by hand instead:

```bash
npm run deploy
```
