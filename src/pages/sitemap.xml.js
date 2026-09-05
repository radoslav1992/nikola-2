import { loadListings, siteUrl } from '../lib/data.js';
import { href, listingPath } from '../lib/i18n.js';

const escXml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export async function GET({ locals }) {
  const site = siteUrl();
  const data = await loadListings(locals);
  const urls = [];
  const add = (p, priority, lastmod) => {
    for (const lang of ['bg', 'en']) {
      urls.push(`<url><loc>${escXml(site + href(lang, p))}</loc>${lastmod ? `<lastmod>${lastmod.slice(0, 10)}</lastmod>` : ''}<priority>${priority}</priority></url>`);
    }
  };
  add('/', '1.0', data.fetchedAt);
  add('/imoti', '0.9', data.fetchedAt);
  add('/karta', '0.6', data.fetchedAt);
  add('/otzivi', '0.5', data.fetchedAt);
  for (const l of data.items) add(listingPath(l), '0.7', data.fetchedAt);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>`;
  return new Response(xml, { headers: { 'content-type': 'application/xml; charset=utf-8', 'cache-control': 'public, max-age=3600' } });
}
