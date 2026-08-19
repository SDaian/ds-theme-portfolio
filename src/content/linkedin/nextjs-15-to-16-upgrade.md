# LinkedIn Post: Upgraded My Portfolio to Next.js 16.3

**Published:** 2026-08-19
**Blog URL:** <https://daian-scuarissi.vercel.app/blog/nextjs-15-to-16-upgrade>

---

## Post Content

I upgraded my portfolio from Next.js 15.3 to 16.3 this week. Turbopack is the default bundler now, so instead of guessing at the difference, I benchmarked it.

Three cold production builds on each version, same machine, same content:

→ Full build: 42.3s → 17.1s
→ Compile step: 16.0s → 9.4s
→ Dev server ready: 1552ms → 421ms

Builds run ~2.5x faster and the dev server boots in under half a second. One honest note: part of that end-to-end gap is ESLint moving out of `next build`. The 16.0s → 9.4s compile step is the cleaner bundler-to-bundler number.

**Two things you'll hit on the way:**

1. **Turbopack can't serialize MDX plugins.** If you pass `remarkPlugins` as imported functions, the build fails outright. Name them as strings and the loader resolves them itself.

2. **`next lint` is gone**, and `next build` no longer lints. Move to `eslint .` — and if the build was your only lint gate, you need a new one.

The part I didn't expect: three dependency bumps were worth turning down.

→ TypeScript 7 breaks `typescript-eslint` (its peer range stops below 6.1)
→ lucide-react v1 removed the brand icons my footer uses
→ The new react-hooks rule errors on the standard next-themes hydration guard

Each of those would have been a silent regression or a broken build, traded for a version number.

Full write-up with the config diffs and the numbers: <https://daian-scuarissi.vercel.app/blog/nextjs-15-to-16-upgrade>

Already on Next.js 16, or still weighing it? Curious what's holding people back.

---

**Hashtags:**
#NextJS #React #WebDevelopment #Frontend #Turbopack #TypeScript #SoftwareEngineering #Performance

---

## Engagement Strategy

- **Hook:** Measured numbers instead of an announcement — the benchmark is the reason to stop scrolling
- **Value:** Concrete before/after figures, plus the two blocking changes readers will actually hit
- **Credibility:** The honest caveat about the lint pass signals the numbers weren't cherry-picked
- **Differentiator:** The "bumps worth refusing" section is the part nobody else writes
- **CTA:** Open question about their own upgrade status

## Character Count

Approximately 1,500 characters (within LinkedIn's 3,000 limit)

## Optimal Posting Time

- Tuesday-Thursday: 8-10 AM or 12-2 PM (EST)
- Avoid Mondays and Fridays
