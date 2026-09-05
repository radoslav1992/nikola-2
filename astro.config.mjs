// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

// НИ Имоти — every page is rendered on demand by the Cloudflare Worker (listings change every few hours).
export default defineConfig({
  site: 'https://niimoti.com',
  output: 'server',
  trailingSlash: 'never',
  adapter: cloudflare({
    // Photos are proxied from suprimmo.bg by /img/*, so Astro's image optimisation is not needed.
    imageService: 'passthrough',
  }),
  // No sessions / cookies are used; keeps the adapter from asking for a SESSION KV namespace.
  session: false,
  build: { assets: '_astro' },
  server: { port: 4321 },
});
