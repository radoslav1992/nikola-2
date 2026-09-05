/**
 * POST /api/ask
 *   { q, lang, listingId }                     → answer about one property
 *   { q, lang, filters: {min,max,cat,region} } → ranked matches (concierge / free-text search)
 */
import { env } from 'cloudflare:workers';
import { loadListings, loadDetail, json } from '../../lib/data.js';
import { searchListings, askAboutListing } from '../../lib/ai.js';
import { applyFilters } from '../../lib/catalog.js';
import { matchItem } from '../../lib/present.js';
import { readBody } from '../../lib/request.js';

export async function POST({ request, locals }) {
  const body = await readBody(request);
  const lang = body.lang === 'en' ? 'en' : 'bg';
  const q = String(body.q || '').trim().slice(0, 400);
  if (!q) return json({ error: 'empty question' }, 400);
  const data = await loadListings(locals);

  const listingId = parseInt(body.listingId, 10);
  if (listingId) {
    const listing = data.items.find((l) => l.id === listingId);
    if (!listing) return json({ error: 'unknown listing' }, 404);
    const detail = await loadDetail(locals, listing);
    return json(await askAboutListing(env, listing, detail, q, lang));
  }

  // Structured answers from the concierge narrow the catalogue before the AI ranks it.
  const f = body.filters && typeof body.filters === 'object' ? body.filters : {};
  const filters = {
    q: '', loc: '', type: '', deal: '', sort: 'top', page: 1,
    cat: typeof f.cat === 'string' ? f.cat.slice(0, 20) : '',
    region: typeof f.region === 'string' ? f.region.slice(0, 20) : '',
    min: Number.isFinite(+f.min) && f.min != null ? +f.min : null,
    max: Number.isFinite(+f.max) && f.max != null ? +f.max : null,
  };
  let pool = applyFilters(data.items, filters);
  let relaxed = false;
  for (const key of ['max', 'cat', 'region', 'min']) {
    if (pool.length >= 3) break;
    if (filters[key] === null || filters[key] === '') continue;
    filters[key] = key === 'max' || key === 'min' ? null : '';
    pool = applyFilters(data.items, filters);
    relaxed = true;
  }
  if (!pool.length) pool = data.items;

  const res = await searchListings(env, pool, q, lang);
  let ids = res.ids;
  if (!ids.length) ids = pool.slice(0, 6).map((l) => l.id);
  const items = ids.map((id) => data.items.find((l) => l.id === id)).filter(Boolean);
  return json({ ...res, ids, relaxed, count: items.length, items: items.map((l) => matchItem(l, lang)) });
}
