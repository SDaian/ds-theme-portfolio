/* eslint-disable no-console -- CLI script: console is its output */
// Post-build SEO audit. Walks every prerendered page under .next/server/app
// and reports defects a reader would never notice. Warns only — it never fails
// the build, because a cosmetic overflow must not take a deploy down.
//
// Run:  pnpm build && pnpm audit:seo

import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = '.next/server/app';
const PUBLIC = 'public';
const MAX_DESCRIPTION = 150;
const SKIP = /_global-error|_not-found/;

if (!existsSync(ROOT)) {
  console.error(`No build found at ${ROOT}. Run "pnpm build" first.`);
  process.exit(1);
}

const pages = [];

(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);

    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.html') && !SKIP.test(p)) pages.push(p);
  }
})(ROOT);

const attr = (html, re) => (html.match(re) || [])[1] || '';
const findings = [];
const warn = (route, msg) => findings.push({ route, msg });

for (const file of pages.sort()) {
  const html = readFileSync(file, 'utf8');
  const route =
    '/' +
    relative(ROOT, file)
      .replace(/\.html$/, '')
      .replace(/^index$/, '');

  const title = attr(html, /<title[^>]*>([^<]*)<\/title>/);

  if (!title) warn(route, 'missing <title>');

  const description = attr(html, /<meta name="description" content="([^"]*)"/);

  if (!description) warn(route, 'missing meta description');
  else if (description.length > MAX_DESCRIPTION)
    warn(route, `description is ${description.length} chars (cap ${MAX_DESCRIPTION})`);

  const h1s = (html.match(/<h1[\s>]/g) || []).length;

  if (h1s !== 1) warn(route, `${h1s} <h1> elements (want exactly 1)`);

  const levels = [...html.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));

  for (let i = 1; i < levels.length; i++) {
    if (levels[i] > levels[i - 1] + 1) {
      warn(route, `heading level jump h${levels[i - 1]} → h${levels[i]}`);
      break;
    }
  }

  if (!/<link rel="canonical"/.test(html)) warn(route, 'missing canonical');

  if (!/href="#main-content"/.test(html)) warn(route, 'missing skip link');

  const og = attr(html, /<meta property="og:image" content="([^"]*)"/);

  if (!og) warn(route, 'missing og:image');
  else {
    // Only local images can be verified on disk.
    const local = og.replace(/^https?:\/\/[^/]+/, '').split('?')[0];

    if (local.startsWith('/') && !existsSync(join(PUBLIC, local)))
      warn(route, `og:image points at a file that does not exist: ${local}`);
  }
}

if (findings.length === 0) {
  console.log(`✓ ${pages.length} pages audited, no findings`);
} else {
  console.log(`${pages.length} pages audited, ${findings.length} finding(s):\n`);
  let last = '';

  for (const { route, msg } of findings) {
    if (route !== last) console.log(route);
    console.log(`  · ${msg}`);
    last = route;
  }
}
