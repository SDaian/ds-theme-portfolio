/* eslint-disable no-console -- CLI script: console is its output */
// Post-build SEO audit. Walks every prerendered page under .next/server/app
// and reports defects a reader would never notice: titles and descriptions
// that get cut off, broken heading outlines, missing canonicals or share
// images, share images whose declared size is wrong, malformed dates, and
// missing or invalid JSON-LD. Warns only — it never fails
// the build, because a cosmetic overflow must not take a deploy down.
//
// Run:  pnpm build && pnpm audit:seo

import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = '.next/server/app';
const PUBLIC = 'public';
const MAX_DESCRIPTION = 150;
const MAX_TITLE = 60;
// A date, optionally with a time: what schema.org and Open Graph both expect.
const ISO_DATE = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:\d{2})?)?$/;
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
const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

// Width and height of a PNG or JPEG, read from its header; null for other types.
function imageSize(file) {
  const b = readFileSync(file);

  if (b[0] === 0x89 && b[1] === 0x50) return [b.readUInt32BE(16), b.readUInt32BE(20)];
  if (b[0] === 0xff && b[1] === 0xd8) {
    for (let i = 2; i < b.length - 8;) {
      if (b[i] !== 0xff) {
        i++;
        continue;
      }
      const marker = b[i + 1];

      // Start-of-frame markers carry the dimensions (C4, C8 and CC are not frames).
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker))
        return [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)];
      i += 2 + b.readUInt16BE(i + 2);
    }
  }

  return null;
}
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
  else if (decode(title).length > MAX_TITLE)
    warn(route, `title is ${decode(title).length} chars (cap ${MAX_TITLE})`);

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
    else if (local.startsWith('/')) {
      // A declared size that disagrees with the file makes platforms crop or reject it.
      const w = Number(attr(html, /<meta property="og:image:width" content="([^"]*)"/));
      const h = Number(attr(html, /<meta property="og:image:height" content="([^"]*)"/));
      const real = (w || h) && imageSize(join(PUBLIC, local));

      if (real && (real[0] !== w || real[1] !== h))
        warn(route, `og:image declared ${w}x${h} but the file is ${real[0]}x${real[1]}`);
    }
  }

  for (const [, name, value] of html.matchAll(
    /<meta property="(article:(?:published|modified)_time)" content="([^"]*)"/g,
  )) {
    if (!ISO_DATE.test(value)) warn(route, `${name} is not an ISO 8601 date: "${value}"`);
  }

  // Structured data: every page should describe itself, and every block must parse.
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];

  if (blocks.length === 0) warn(route, 'no JSON-LD structured data');

  for (const [, json] of blocks) {
    let data;

    try {
      data = JSON.parse(json);
    } catch {
      warn(route, 'JSON-LD block does not parse');
      continue;
    }
    for (const node of data['@graph'] ?? [data]) {
      for (const key of ['datePublished', 'dateModified']) {
        if (node[key] && !ISO_DATE.test(node[key]))
          warn(route, `JSON-LD ${node['@type']}.${key} is not an ISO 8601 date: "${node[key]}"`);
      }
    }
  }
}

// Cross-check the sitemap against the pages themselves. The two settings live
// in different files, so this is the guard that catches them drifting apart:
// a noindex page still advertised, or an indexable page the sitemap forgot.
const sitemapFile = join(ROOT, 'sitemap.xml.body');

if (existsSync(sitemapFile)) {
  const listed = new Set(
    [...readFileSync(sitemapFile, 'utf8').matchAll(/<loc>([^<]*)<\/loc>/g)].map(
      (m) => m[1].replace(/^https?:\/\/[^/]+/, '').replace(/\/$/, '') || '/',
    ),
  );

  for (const file of pages) {
    const html = readFileSync(file, 'utf8');
    const route =
      '/' +
      relative(ROOT, file)
        .replace(/\.html$/, '')
        .replace(/^index$/, '');
    const noindex = /<meta name="robots" content="[^"]*noindex/.test(html);

    if (noindex && listed.has(route)) warn(route, 'marked noindex but listed in sitemap.xml');
    if (!noindex && !listed.has(route)) warn(route, 'indexable but missing from sitemap.xml');
  }
} else {
  warn('/sitemap.xml', 'not generated — sitemap cross-check skipped');
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
