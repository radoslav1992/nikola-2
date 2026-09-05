/**
 * Cloudflare Worker entry point.
 *
 * `fetch`     → Astro's request handler (pages, API routes, image proxy, static assets).
 * `scheduled` → the cron from wrangler.jsonc: re-scrapes every page of Nikola's offers on
 *               suprimmo.bg (with Nominatim geocoding for unknown villages) and the client reviews.
 */
import { handle } from '@astrojs/cloudflare/handler';
import { refreshListings, refreshTestimonials } from './lib/store.js';

export default {
  fetch: handle,

  async scheduled(event, env, ctx) {
    ctx.waitUntil(
      refreshListings(env, { network: true }).then(
        (d) => console.log(`cron: refreshed ${d.items.length} listings (${d.pages} pages)`),
        (e) => console.error('cron: listings refresh failed', e && e.message),
      ),
    );
    ctx.waitUntil(
      refreshTestimonials(env).then(
        (d) => console.log(`cron: refreshed ${d.items.length} testimonials`),
        (e) => console.error('cron: testimonials refresh failed', e && e.message),
      ),
    );
  },
};
