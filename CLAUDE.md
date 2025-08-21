# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development**: `pnpm dev` (starts Next.js dev server on localhost:3000)
- **Build**: `pnpm build` (production build)
- **Linting**: `pnpm lint` (ESLint with Next.js config)
- **Start**: `pnpm start` (starts production server)

## Architecture Overview

This is a personal portfolio website built with Next.js 15 App Router, TypeScript, and Tailwind CSS. The site features:

### Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4 with custom theme
- **Content**: MDX support for blog posts
- **Theme**: Dark/light mode with next-themes
- **Icons**: Lucide React and React Icons
- **Analytics**: Vercel Analytics and Speed Insights

### Project Structure

- **App Router**: Uses Next.js 13+ app directory structure
- **Components**: Organized by feature with Models/Data/Components subfolders
- **Path Mapping**: TypeScript paths configured for `@/components/*`, `@/styles/*`, `@/content/*`
- **Content**: MDX files in `src/content/` for blog posts

### Component Organization

Components follow a structured pattern:

- `Components/` - React components
- `Data/` - Static data and configuration
- `Models/` - TypeScript interfaces/types
- `index.tsx` - Main export file

Example: `src/components/Experience/` contains experience data, models, and components.

### Key Features

- **Responsive Design**: Mobile-first with Tailwind breakpoints
- **Theme Switching**: Light/dark/system theme support
- **Blog Support**: MDX-powered blog with dynamic routing
- **Resume Integration**: PDF resume download functionality
- **Analytics**: Built-in Vercel analytics and speed insights

### Styling

- Uses Tailwind CSS v4 with custom brand colors
- Custom UI components in `src/styles/components/ui/`
- Global styles in `src/app/globals.css`
- Theme-aware components with CSS variables

### Package Manager

Uses `pnpm` for dependency management (see pnpm-lock.yaml).

## Visual Development

### Design Principles

- Comprehensive design checklist in `/context/design-principles.md`
- Brand style guide in `/context/style-guide.md`
- When making visual (front-end, UI/UX) changes, always refer to these files for guidance

### Quick Visual Check

IMMEDIATELY after implementing any front-end change:

1. **Identify what changed** - Review the modified components/pages
2. **Navigate to affected pages** - Use `mcp__playwright__browser_navigate` to visit each changed view
3. **Verify design compliance** - Compare against `/context/design-principles.md` and `/context/style-guide.md`
4. **Validate feature implementation** - Ensure the change fulfills the user's specific request
5. **Check acceptance criteria** - Review any provided context files or requirements
6. **Capture evidence** - Take full page screenshot at desktop viewport (1440px) of each changed view
7. **Check for errors** - Run `mcp__playwright__browser_console_messages`

This verification ensures changes meet design standards and user requirements.

### Comprehensive Design Review

Invoke the `@agent-design-review` subagent for thorough design validation when:

- Completing significant UI/UX features
- Before finalizing PRs with visual changes
- Needing comprehensive accessibility and responsiveness testing
