/** GET /api/refresh?token=… — manual re-scrape (needs the REFRESH_TOKEN secret). */
import { env } from 'cloudflare:workers';
import { json } from '../../lib/data.js';
import { refreshListings, refreshTestimonials } from '../../lib/store.js';

export async function GET({ request, url }) {
  const token = url.searchParams.get('token') || request.headers.get('x-refresh-token') || '';
  if (!env.REFRESH_TOKEN || token !== env.REFRESH_TOKEN) return json({ error: 'not found' }, 404);
  try {
    const data = await refreshListings(env);
    const reviews = await refreshTestimonials(env).catch((e) => ({ error: String(e && e.message) }));
    return json({ ok: true, items: data.items.length, total: data.total, pages: data.pages, failedPages: data.failedPages, fetchedAt: data.fetchedAt, testimonials: reviews.items ? reviews.items.length : reviews });
  } catch (err) {
    return json({ ok: false, error: String(err && err.message) }, 502);
  }
}
