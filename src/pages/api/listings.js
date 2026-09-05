import { loadListings, json } from '../../lib/data.js';

export async function GET({ locals }) {
  const data = await loadListings(locals);
  return json({ total: data.items.length, sourceTotal: data.total, fetchedAt: data.fetchedAt, seed: Boolean(data.seed), items: data.items }, 200, { 'cache-control': 'public, max-age=300' });
}
