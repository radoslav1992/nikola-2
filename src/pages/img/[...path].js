/**
 * Image proxy: /img/{medium|big|small}/{file} → static4.superimoti.bg, /img/agent.jpg → Nikola's photo.
 * Responses are cached at the edge for 30 days.
 */
import { IMAGE_BASE, AGENT_PHOTO_URL } from '../../lib/scraper.js';

const IMAGE_HEADERS = {
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
  accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
  referer: 'https://www.suprimmo.bg/',
};

export async function GET({ params, request, locals }) {
  const path = `/img/${params.path || ''}`;
  let upstream;
  if (path === '/img/agent.jpg') {
    upstream = AGENT_PHOTO_URL;
  } else {
    const m = path.match(/^\/img\/(medium|big|small)\/([A-Za-z0-9._%-]+)$/);
    const file = m && decodeURIComponent(m[2]);
    if (!m || !/^\d+T\d+_\d+\.(jpe?g|png|webp)$/i.test(file)) return new Response('Not found', { status: 404 });
    upstream = `${IMAGE_BASE}/${m[1]}/${file}`;
  }

  const cacheKey = new Request(new URL(path, request.url).toString(), { method: 'GET' });
  const cache = caches.default;
  const hit = await cache.match(cacheKey).catch(() => null);
  if (hit) return hit;

  let res;
  try {
    res = await fetch(upstream, { headers: IMAGE_HEADERS, cf: { cacheEverything: true, cacheTtl: 60 * 60 * 24 * 30 } });
  } catch {
    res = null;
  }
  if (!res || !res.ok) {
    if (path === '/img/agent.jpg') return placeholderAvatar();
    return new Response('Image unavailable', { status: 502 });
  }
  const out = new Response(res.body, {
    status: 200,
    headers: {
      'content-type': res.headers.get('content-type') || 'image/jpeg',
      'cache-control': 'public, max-age=2592000, immutable',
      'x-image-source': new URL(upstream).hostname,
    },
  });
  const ctx = locals?.cfContext;
  if (ctx?.waitUntil) ctx.waitUntil(cache.put(cacheKey, out.clone()).catch(() => {}));
  return out;
}

function placeholderAvatar() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="480" viewBox="0 0 480 480"><rect width="480" height="480" fill="#DCCDB8"/><circle cx="240" cy="190" r="90" fill="#AFC4A4"/><path d="M80 440c20-90 90-140 160-140s140 50 160 140z" fill="#AFC4A4"/><text x="240" y="215" text-anchor="middle" font-family="Georgia,serif" font-size="72" fill="#173D32">НИ</text></svg>`;
  return new Response(svg, { headers: { 'content-type': 'image/svg+xml', 'cache-control': 'public, max-age=3600' } });
}
