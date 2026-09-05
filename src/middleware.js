/**
 * Request middleware:
 *  - www.niimoti.com → niimoti.com
 *  - language detection: /en/... is rewritten to the same page with locals.lang = 'en'
 *  - trailing slashes and duplicate slashes are normalised
 * Pages read `Astro.locals.lang` and `Astro.locals.path` (the language-less canonical path).
 */
import { defineMiddleware } from 'astro:middleware';

const EN_ALIASES = { '/map': '/karta', '/reviews': '/otzivi', '/properties': '/imoti' };

export const onRequest = defineMiddleware(async (context, next) => {
  const url = context.url;

  if (url.hostname.startsWith('www.') && !url.hostname.endsWith('.workers.dev')) {
    const target = new URL(url);
    target.hostname = url.hostname.slice(4);
    return context.redirect(target.toString(), 301);
  }

  let path = url.pathname.replace(/\/{2,}/g, '/');
  let lang = 'bg';
  if (path === '/en' || path.startsWith('/en/')) {
    lang = 'en';
    path = path.slice(3) || '/';
    if (EN_ALIASES[path]) path = EN_ALIASES[path];
  }
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);

  context.locals.lang = lang;
  context.locals.path = path;

  if (path !== url.pathname) return next(path + url.search);
  return next();
});
