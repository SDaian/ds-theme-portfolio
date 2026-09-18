// The one list of static routes, and the one place a route is marked noindex.
// pageMetadata() reads it to emit the robots tag; sitemap.ts reads it to
// leave the page out. Because both read the same flag, the sitemap can never
// advertise a page that tells robots to ignore it.

export type StaticRoute = {
  /** No trailing slash. "/" for the home page. */
  path: string;
  /** Keep the page out of the index and the sitemap, but leave it reachable. */
  noindex?: boolean;
};

export const STATIC_ROUTES: StaticRoute[] = [
  { path: '/' },
  { path: '/blog' },
  { path: '/projects' },
  { path: '/frontend-interview-preparation' },
];

export function isNoindex(path: string): boolean {
  return STATIC_ROUTES.find((route) => route.path === path)?.noindex === true;
}
