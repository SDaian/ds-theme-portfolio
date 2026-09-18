/* eslint-disable no-console -- CLI script: console is its output */
// Push the sitemap's URLs to IndexNow, which feeds Bing, Yandex, DuckDuckGo
// and Yahoo. Google is covered by the sitemap itself. Run after a deploy is
// live, so the engines crawl the new content rather than the old.
//
//   pnpm indexnow            push every URL in the live sitemap
//   pnpm indexnow --dry-run  print the payload, send nothing
//   pnpm indexnow --local    read .next/server/app/sitemap.xml.body instead
//
// Ownership proof is the public key file at the site root (public/<key>.txt,
// containing the key). It is not a secret; this script discovers it there so
// the key lives in exactly one place.

import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ENDPOINT = 'https://api.indexnow.org/indexnow';
const args = new Set(process.argv.slice(2));
const dryRun = args.has('--dry-run');
const local = args.has('--local');

// Same SITE_URL the app uses, read from its one definition.
const siteUrl = (readFileSync('src/lib/site-metadata.ts', 'utf8').match(
  /SITE_URL\s*=\s*'([^']+)'/,
) || [])[1];

if (!siteUrl) {
  console.error('Could not read SITE_URL from src/lib/site-metadata.ts');
  process.exit(1);
}

const host = new URL(siteUrl).host;

const key = readdirSync('public')
  .filter((name) => /^[0-9a-f]{32}\.txt$/.test(name))
  .map((name) => ({ name, body: readFileSync(join('public', name), 'utf8').trim() }))
  .find(({ name, body }) => name === `${body}.txt`)?.body;

if (!key) {
  console.error('No IndexNow key file found in public/ (expected <key>.txt containing <key>)');
  process.exit(1);
}

let xml;

if (local) {
  const file = '.next/server/app/sitemap.xml.body';

  if (!existsSync(file)) {
    console.error(`${file} not found. Run "pnpm build" first.`);
    process.exit(1);
  }
  xml = readFileSync(file, 'utf8');
} else {
  const res = await fetch(`${siteUrl}/sitemap.xml`);

  if (!res.ok) {
    console.error(`Fetching ${siteUrl}/sitemap.xml failed: HTTP ${res.status}`);
    process.exit(1);
  }
  xml = await res.text();
}

const urlList = [...xml.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1]);

if (urlList.length === 0) {
  console.error('Sitemap contained no URLs; nothing to push.');
  process.exit(1);
}

const payload = { host, key, keyLocation: `${siteUrl}/${key}.txt`, urlList };

if (dryRun) {
  console.log(JSON.stringify(payload, null, 2));
  console.log(`\n(dry run) would POST ${urlList.length} URL(s) to ${ENDPOINT}`);
  process.exit(0);
}

const res = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(payload),
});

// IndexNow answers 200 (ok) or 202 (accepted, key not yet validated).
if (res.status === 200 || res.status === 202) {
  console.log(`✓ pushed ${urlList.length} URL(s) to IndexNow (HTTP ${res.status})`);
} else {
  console.error(`IndexNow rejected the push: HTTP ${res.status}\n${await res.text()}`);
  process.exit(1);
}
