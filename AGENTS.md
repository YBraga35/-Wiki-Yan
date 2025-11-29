# Repository Guidelines

## Project Structure & Module Organization
- `content/` holds the published notes. Key areas: `RPG/Thylea/` (chapters under `md/`, setting pages in `Locais/`, `Personagens/`, `Itens/`), plus other domains like `Dev - Computação`, `Faculdade`, `Pessoal`, and `_Meta`.
- `content/images-obsidian/` stores shared assets; reference them with relative paths from the page that uses them.
- `docs/` and `public/` are build outputs; regenerate rather than editing directly.
- `quartz/`, `quartz.config.ts`, and `quartz.layout.ts` define the Quartz generator and theme; keep changes documented and minimal.

## Build, Test, and Development Commands
- `npm install` (Node 20/22) installs dependencies.
- `npx quartz build` produces a static build in `public/`.
- `npm run docs` builds and serves from `docs/` for local preview.
- `npm run check` runs TypeScript `--noEmit` and Prettier in check mode.
- `npm test` runs path and dependency graph unit tests; `npm run format` applies Prettier.

## Coding Style & Naming Conventions
- Notes are Markdown with YAML frontmatter; include `title`, `aliases` when helpful, `tags`, `draft`, and date fields already used in nearby files. Preserve domain-specific keys (`tipo`, `governante`, etc.). Example:

```markdown
---
title: Mytros
aliases: [City of Mytros]
tags: [thylea, local]
draft: false
date: 2025-11-27
---
```

- H1 should mirror `title`; keep summaries concise.
- Prefer wiki links (`[[RPG/Thylea/Locais/Cidades/Mytros|Mytros]]`) over raw URLs; match existing casing and spacing.
- Keep existing Title Case filenames (spaces allowed). New chapters under `content/RPG/Thylea/md/` follow the `NN Chapter - Title.md` numbering.

## Testing Guidelines
- For content edits, run `npx quartz build` or `npm run docs` to catch frontmatter errors, broken links, or missing assets.
- For config or TypeScript changes, run `npm run check` and `npm test`; preview locally before publishing.

## Commit & Pull Request Guidelines
- Recent history uses `Quartz sync: <MMM DD, YYYY, HH:MM TZ>` for publish commits; for feature/content batches, use short imperative titles (e.g., `Add Thylea Mytros overview`).
- PRs should describe scope, affected sections, verification commands, and linked issues/notes; include screenshots for layout or theme changes.
- Note follow-ups (e.g., indexes to refresh or assets to compress) so sync steps stay clear.

## Content & Asset Tips
- Place images in `content/images-obsidian/`; compress before committing and reference with relative paths.
- Update index/overview notes when adding new locations, NPCs, or chapters so navigation remains coherent.
- Avoid deleting legacy links; add redirects/alias entries in frontmatter when renaming pages.
