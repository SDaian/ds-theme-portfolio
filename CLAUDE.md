# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **pnpm**.

- `pnpm dev` — Next.js dev server on http://localhost:3000
- `pnpm build` — production build
- `pnpm start` — serve the production build
- `pnpm lint` — `next lint`, scoped to `src/` (see `eslint.config.mjs`, `next.config.ts`)

There is no test runner configured in this project — no Jest, Vitest, or Playwright dependency exists. Don't invent test commands; verify changes by building and running the app.

## Commits and pull requests

Husky is active, so commits run real checks:

- `.husky/pre-commit` → `lint-staged` (`.lintstagedrc.json`): Prettier + `eslint --fix` on staged JS/TS, Prettier on staged JSON/MD/YML
- `.husky/commit-msg` → `commitlint` with `@commitlint/config-conventional`

Commit messages:

- **One line only.** Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, …), no body, no bullet list of changes. Write a subject that explains itself.
- Never mention Claude — no "Generated with Claude Code", no "Co-Authored-By: Claude".
- **Author must be `Daian Scuarissi <scuarissid@gmail.com>`.** A `SessionStart` hook in `.claude/settings.json` sets this, but sandboxes ship with a global `user.name=Claude`, so verify with `git log -1 --format='%an <%ae>'` before pushing.
- If commitlint rejects a message, fix the message; never bypass hooks with `--no-verify`.

Pull requests:

- **Leave the description empty.** The commit message is self-explanatory, so a PR body is redundant. Do not write Summary, What changed, Verification, Test plan, or similar sections.
- Title matches the commit subject.

## Architecture

Next.js 15 App Router portfolio + blog. React 19, TypeScript (strict), Tailwind CSS v4.

Deployed at https://daian-scuarissi.vercel.app/

### Content pipeline

Blog posts are MDX files in `src/content/`, compiled by `@next/mdx` (configured in `next.config.ts`) with `remark-frontmatter` + `remark-mdx-frontmatter` for YAML frontmatter and `rehype-pretty-code`/Shiki (`one-dark-pro`) for syntax highlighting. `mdx-components.tsx` at the repo root supplies the MDX component overrides.

At runtime, `src/lib/mdx.ts` reads the same files off disk with `gray-matter` to pull metadata (title, description, publishedAt, modifiedAt, author, tags, image) for listings and SEO tags. So each post is read two ways: compiled as a component, and parsed as frontmatter.

**Adding a blog post takes three edits, not one:**

1. Create `src/content/<slug>.mdx` with the frontmatter fields above
2. Add the slug to `generateStaticParams()` in `src/app/blog/[slug]/page.tsx`
3. Add the slug to the `blogSlugs` array in `src/lib/mdx.ts` (drives listings/sorting)

`dynamicParams = false` on the blog route, so a slug missing from step 2 renders a 404 no matter that the MDX file exists.

### Layout

- `src/app/` — routes; `layout.tsx`, home `page.tsx`, `blog/`, `frontend-interview-preparation/`, `globals.css`
- `src/components/` — feature components. Non-trivial ones are folders following the `Components/` + `Data/` + `Models/` + `index.tsx` convention (see `src/components/Experience/`): components, static data, and TypeScript types kept side by side.
- `src/styles/components/ui/` — shadcn/ui primitives (new-york style, `components.json`), built on Radix UI + `class-variance-authority` + `tailwind-merge`. Note the non-default location: shadcn aliases point at `@/styles/*`, not `@/components/*`. This project does **not** use NextUI.
- `src/lib/` — `mdx.ts`, `blog-types.ts`, `blog-filters.ts`, `date-utils.ts`, `tag-colors.ts`
- `src/hooks/` — `useDebounce`, `useScrollSpy`
- `helpers/` — interview-prep markdown source, not application code

Path aliases (`tsconfig.json`, `baseUrl: ./src`): `@/components/*`, `@/styles/*`, `@/content/*`, `@/lib/*`, `@/hooks/*`.

### Theming

Light/dark/system via `next-themes`, driven by CSS variables in `src/app/globals.css`. Components must work in both themes.

## UI changes

For front-end work, follow the standards in `context/design-principles.md` and the visual-verification flow in `context/design-review.md` (Playwright MCP: navigate the changed views, screenshot at 1440px, check the console).

Slash commands available in `.claude/commands/`: `/design-review` for comprehensive design validation, `/code-review` for code review.
