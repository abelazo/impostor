# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **Keep this file up to date.** Update CLAUDE.md whenever the project structure, architecture, tech stack, commands, or workflow changes (e.g. adding a new dependency, reorganizing directories, changing CI steps, or introducing a new pattern).

## Project Overview

"Impostor Game" is a browser-based party game assistant. Players take turns being shown their role (civilian or impostor) along with a secret word on a shared device, without the others seeing. The game then plays out verbally among participants.

Key behaviours:

- Word bank loaded remotely from a YAML file (GitHub raw URL) and cached in memory
- Last-used word is excluded from the next random draw to avoid immediate repetition
- Game setup (participant count, impostor count, topic) persisted in `localStorage` and restored on next session
- Min 3 / max 10 participants; impostor count capped at half the participant count

## Commands

```bash
bun run dev       # Start development server (http://localhost:3000)
bun run build     # Build for production (static export to ./out)
bun run start     # Start production server
bun run lint      # Run ESLint
bun run test      # Run tests in watch mode
bun run test:run  # Run tests once
```

## Architecture

This is a Next.js 16 web application using:

- **App Router** (`src/app/`) - File-based routing with React Server Components by default
- **TypeScript** - Strict type checking enabled
- **Tailwind CSS v4** - Utility-first styling via `@tailwindcss/postcss`
- **Vitest** - Testing framework with React Testing Library

### Project Structure

```
src/app/
├── layout.tsx                    # Root layout (wraps all pages)
├── page.tsx                      # Home page — game orchestrator (loading → setup → playing phases)
├── globals.css                   # Global styles and Tailwind imports
├── components/
│   ├── ParticipantSetup.tsx      # Setup screen: participant list, topic, impostor count, start button
│   ├── PlayerReveal.tsx          # Per-player role reveal screen (shown one player at a time)
│   ├── ImpostorCounter.tsx       # +/- control for choosing how many impostors
│   └── TopicSelector.tsx         # Dropdown for selecting a word-bank topic
├── lib/
│   ├── gameLogic.ts              # Role assignment and shuffle logic
│   ├── gameSettings.ts           # localStorage persistence of last game config
│   └── wordBank.ts               # Remote YAML word-bank loader, topic listing, word selection
└── __tests__/                    # Vitest + React Testing Library test files
```

### Word Bank

The word bank lives in `word-bank/es.yaml` (checked into the repo) and is served from GitHub's raw CDN at runtime:

```
https://raw.githubusercontent.com/abelazo/impostor/refs/heads/main/word-bank/es.yaml
```

Format:

```yaml
topics:
  <topicId>:
    title: "Display Name"
    words: [word1, word2, ...]
```

### Key Patterns

- Pages are `page.tsx` files that export a default React component
- Layouts in `layout.tsx` wrap child routes and persist across navigation
- Use `'use client'` directive for client-side interactivity (onClick, useState, etc.)
- Server Components (default) can directly fetch data without useEffect
- Import alias `@/*` maps to `src/*`
- The whole app is a single client-side page; there is currently no server-side logic or API routes

## TDD Workflow

Follow Test-Driven Development:

1. Write a failing test first (`bun run test`)
2. Write minimal code to make it pass
3. Refactor while keeping tests green

Test files go in `__tests__/` directories with `.test.tsx` extension.

## Pre-commit Hooks

Pre-commit hooks are driven by `.pre-commit-config.yaml`. Active hooks:

- **trailing-whitespace**, **end-of-file-fixer**, **mixed-line-ending**, **check-case-conflict**, **check-merge-conflict** — general file hygiene
- **prettier** — code formatting (runs on staged files)
- **commitizen** — enforces Conventional Commits on commit messages

To install hooks locally:

```bash
pre-commit install
```

## CI/CD

Two workflows drive the pipeline:

**`deploy.yml`** — triggered on push to `main`:

1. Lint (`bun run lint`)
2. Test (`bun run test:run`)
3. Build
4. Semantic release (creates a GitHub release from conventional commits)

**`pages.yml`** — triggered on GitHub release published:

1. Build
2. Deploy to GitHub Pages

### Third-party action versions

Always use the **latest** major version. Do **not** downgrade. Current pinned versions:

| Action                          | Version |
| ------------------------------- | ------- |
| `actions/checkout`              | `v6`    |
| `oven-sh/setup-bun`             | `v2`    |
| `actions/configure-pages`       | `v6`    |
| `actions/upload-pages-artifact` | `v5`    |
| `actions/deploy-pages`          | `v5`    |

## Commits

- Follow Conventional Commits specification for commit messages
- Use imperative mood (e.g., "Add feature", "Fix bug")
- Prefix with type (feat, fix, docs, style, refactor, test, chore)
- When linked to a User Story, scope is recommended (e.g., `feat(US-001): Add login`)

## Documentation

- README.md for setup and usage instructions
- README.md shall always be updated with any change in the development lifecycle or architecture
