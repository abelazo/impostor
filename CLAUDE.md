# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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
├── layout.tsx       # Root layout (wraps all pages)
├── page.tsx         # Home page (/)
├── globals.css      # Global styles and Tailwind imports
└── __tests__/       # Test files
```

### Key Patterns

- Pages are `page.tsx` files that export a default React component
- Layouts in `layout.tsx` wrap child routes and persist across navigation
- Use `'use client'` directive for client-side interactivity (onClick, useState, etc.)
- Server Components (default) can directly fetch data without useEffect
- Import alias `@/*` maps to `src/*`

## TDD Workflow

Follow Test-Driven Development:
1. Write a failing test first (`bun run test`)
2. Write minimal code to make it pass
3. Refactor while keeping tests green

Test files go in `__tests__/` directories with `.test.tsx` extension.

## CI/CD

On push to `main`, GitHub Actions runs:
1. Lint (`bun run lint`)
2. Test (`bun run test:run`)
3. Build and deploy to GitHub Pages

## Commits

- Follow Conventional Commits specification for commit messages
- Use imperative mood (e.g., "Add feature", "Fix bug")
- Prefix with type (feat, fix, docs, style, refactor, test, chore)
- When linked to a User Story, scope is recommended (e.g., `feat(US-001): Add login`)

## Documentation

- README.md for setup and usage instructions
- README.md shall always be updated with any change in the development lifecycle or architecture
