# Repository Guidelines

## Project Structure & Module Organization
- `content/` holds published notes; keep entries under domain folders (e.g., `RPG/Thylea/{Locais,Personagens,Itens,Criaturas}`) with Markdown plus YAML frontmatter.
- `images-obsidian/` and `public/` store shared assets; reference them with relative paths.
- `quartz.config.ts` and `quartz.layout.ts` define site settings and layout; adjust carefully, and keep changes documented.
- `docs/` and `public/` are build outputs; avoid manual edits except for inspection.

## Build, Test, and Development Commands
- `npm install` (Node 20/22) to install dependencies.
- `npx quartz build` generates the static site locally into `public/`.
- `npm run docs` builds and serves the site from `docs/` for local preview.
- `npm run check` runs `tsc --noEmit` plus Prettier in check mode.
- `npm test` runs the path and dependency graph unit tests.
- `npm run format` applies Prettier to the codebase and Markdown.

## Coding Style & Naming Conventions
- Write Markdown in Portuguese with YAML frontmatter: always include `title`, `aliases` (list), and `tags` (list); keep domain fields relevant to the page (e.g., `tipo`, `status`, `governo`).
- H1 should mirror `title`, followed by a concise summary line when useful.
- Prefer wiki links (`[[Target Page]]`) over raw URLs for internal references; match existing casing and spacing (Title Case with spaces allowed, e.g., `Locais/Dungeons/Mithral Mines.md`).
- Reuse section ordering seen in current pages (`Visão Geral`, `História`, `Links Relacionados`, `Referências`) to keep navigation consistent.
- For TypeScript edits, rely on Prettier defaults (2-space indent) and keep exported types explicit.

## Testing Guidelines
- After content edits, run `npx quartz build` or `npm run docs` to catch frontmatter or linking issues before syncing.
- For generator or config changes, run `npm run check` and `npm test`, then spot-check the served site for navigation/search regressions.

## Commit & Pull Request Guidelines
- Recent history uses `Quartz sync: <date, time>` for publish commits; follow that for syncs/deploys and use short imperative titles for content batches (e.g., `Add Estoria overview`).
- PRs should list scope, affected areas, and verification (commands run, pages reviewed); link related issues or notes when available.
- Attach screenshots or notes for layout/theme changes and mention any follow-up tasks needed post-merge.
