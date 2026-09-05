/**
 * Bridges the Cloudflare runtime and the shared store: pages call these with `Astro.locals`
 * and get listings/testimonials with stale-while-revalidate, never throwing.
 */
import { env } from 'cloudflare:workers';
import { getListings, getDetail, getTestimonials } from './store.js';

function ctxOf(locals) {
  return locals?.cfContext || null;
}

export function cfEnv() {
  return env;
}

export function loadListings(locals) {
  return getListings(env, ctxOf(locals));
}

export function loadDetail(locals, listing) {
  return getDetail(env, ctxOf(locals), listing);
}

export function loadTestimonials(locals) {
  return getTestimonials(env, ctxOf(locals));
}

export function siteUrl() {
  return (env.SITE_URL || 'https://niimoti.com').replace(/\/$/, '');
}

export function json(obj, status = 200, extra = {}) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...extra },
  });
}

/** Cache headers for rendered pages (short edge TTL; listings refresh in the background). */
export function pageHeaders(response, { noindex = false } = {}) {
  response.headers.set('cache-control', noindex ? 'no-store' : 'public, max-age=120, s-maxage=300, stale-while-revalidate=600');
  response.headers.set('x-content-type-options', 'nosniff');
  response.headers.set('referrer-policy', 'strict-origin-when-cross-origin');
  return response;
}
