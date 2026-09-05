# НИ Имоти — niimoti.com

Сайт на брокер **Никола Иванов** (PROPERTY.BG / SUPRIMMO, офис Велико Търново) в дизайна „Find Your Place“ от Claude Design.
Обявите се теглят автоматично от <https://www.suprimmo.bg/oferti-na-brokera-nikola-ivanov/> (всички страници), кешират се в
Cloudflare и се показват на български и английски: начална страница с избрани имоти, региони с местен пътеводител,
AI консиерж, каталог с филтри, карта, страница за всеки имот с „Подходящ ли е за вас?“, отзиви на клиенти, контактна форма,
WhatsApp/Viber и sitemap за Google.

Технология: **Astro 7** (server output) + **Cloudflare Worker** през `@astrojs/cloudflare`. Деплой се прави директно от
Cloudflare конзолата чрез GitHub интеграцията.

---

## 1. Деплой от Cloudflare конзолата (GitHub интеграция)

1. Влезте в <https://dash.cloudflare.com> → **Workers & Pages** → **Create** → таб **Workers** → **Import a repository**.
2. Свържете GitHub акаунта и изберете това repo (`radoslav1992/nikola-2`) и branch-а, който искате да деплойвате.
3. Настройки на билда:
   - **Project name:** `ni-imoti`
   - **Build command:** `npm run build`
   - **Deploy command:** `npx wrangler deploy`
   - **Root directory:** `/`
4. **Deploy.** След 1–2 минути сайтът е на `https://ni-imoti.<вашият-акаунт>.workers.dev`.
   Всеки следващ push към branch-а деплойва автоматично; pull request-ите получават preview URL.

> `astro build` записва готовия Worker в `dist/server` заедно с `dist/server/wrangler.json`, а `wrangler deploy` го намира сам
> (през `.wrangler/deploy/config.json`). Затова build командата е задължителна — не оставяйте полето празно.

### Домейн niimoti.com

Домейнът трябва да е добавен в същия Cloudflare акаунт (Websites → Add a domain → сменете nameserver-ите при регистратора).
След това: **Workers & Pages → ni-imoti → Settings → Domains & Routes → Add → Custom domain** → `niimoti.com`, и още веднъж за
`www.niimoti.com`. Worker-ът сам пренасочва `www` към `niimoti.com`. DNS и SSL се създават автоматично.

Алтернатива: отблокирайте секцията `routes` в `wrangler.jsonc` и push-нете.

### Препоръчително: KV за кеш на обявите и за запитванията

Без KV сайтът работи (ползва edge-кеша на Cloudflare и вградения seed от 24 обяви), но обявите се презареждат по-често,
а запитванията от формата не се пазят никъде (само се изпращат по имейл, ако е настроен).

1. **Storage & Databases → KV → Create namespace** → име `ni-imoti`.
2. Копирайте **Namespace ID**, отблокирайте блока `kv_namespaces` в `wrangler.jsonc`, поставете ID-то, commit + push.

> Важно: с GitHub интеграцията `wrangler.jsonc` е източникът на истина. Bindings, добавени само през таба *Bindings*
> в конзолата, се губят при следващия deploy — затова ги записвайте във файла. Променливи (Variables) и secrets, добавени
> в конзолата, се запазват (`keep_vars: true`).

### Имейл за запитванията (по желание)

Формата записва всяко запитване в KV (`lead:*`) и може да го праща и по имейл през [Resend](https://resend.com) (безплатен план).
**Settings → Variables and Secrets** на Worker-а:

| Име | Тип | Стойност |
|---|---|---|
| `RESEND_API_KEY` | Secret | API ключ от Resend |
| `CONTACT_TO` | Variable | имейл(и) на Никола, разделени със запетая |
| `CONTACT_FROM` | Variable | напр. `НИ Имоти <imoti@niimoti.com>` (домейнът трябва да е верифициран в Resend; без него се ползва `onboarding@resend.dev`) |
| `REFRESH_TOKEN` | Secret | произволен дълъг низ — позволява ръчно обновяване: `https://niimoti.com/api/refresh?token=...` |

Ако нито KV, нито Resend са настроени, формата казва на клиента да пише в WhatsApp с предварително попълнено съобщение,
така че нито едно запитване не се губи.

### AI

Работи през **Workers AI** (binding `AI` в `wrangler.jsonc`) — не иска ключове, всеки Cloudflare акаунт има безплатен лимит
(10 000 neurons/ден). Ползва се за: AI консиержа и свободното търсене на началната страница, „Подходящ ли е този имот за вас?“
на страницата на имота и превода на отзивите. Ако не искате AI: изтрийте блока `"ai"` — сайтът автоматично минава на
търсене по ключови думи.

---

## 2. Как работи

```
astro.config.mjs        Astro (output: server) + @astrojs/cloudflare адаптер
wrangler.jsonc          Worker: cron, AI binding, vars, (KV, домейн — по желание)
src/worker.js           входна точка: fetch → Astro; scheduled → обновяване на обявите и отзивите
src/middleware.js       www → apex, език (/en/...), нормализиране на URL
src/pages/              index, imoti (каталог), imot/[id]/[slug] (имот), karta, otzivi, 404
src/pages/api/          listings, ask (AI), contact, refresh
src/pages/img/          прокси за снимките (кеш 30 дни) + снимката на Никола
src/layouts/Base.astro  <head>, SEO/hreflang, плаваща навигация, footer, мобилна лента
src/components/         карти, bento, региони, AI консиерж, секцията на Никола, форма, отзиви…
src/styles/global.css   целият дизайн (Albert Sans + Cormorant Garamond, #173D32 / #AFC4A4 / #DCCDB8)
src/scripts/app.js      клиентски скрипт: консиерж, търсене, региони, галерия, карти, форми
src/lib/scraper.js      парсер на списъка с обяви (пагинация /page/N/) и на страницата на имот
src/lib/store.js        кеш: KV → Cache API → data/seed.json; stale-while-revalidate
src/lib/catalog.js      филтри, сортиране, подобни имоти, keyword fallback за AI
src/lib/regions.js      групиране на обявите по региони („Открийте България“)
src/lib/ai.js           Workers AI: подбор на имоти и въпроси за имот
src/lib/geo.js          координати: справочник, Nominatim (само от cron-а), разпръскване на маркери
src/lib/testimonials.js отзиви от luximmo.com (страницата за обратна връзка на брокера) + превод
src/lib/i18n.js         текстове BG/EN, региони, форматиране, транслитерация
data/seed.json          24-те обяви от стр. 1 (05.09.2026) — стартови данни и авариен fallback
data/testimonials.json  отзивите (стартови данни; обновяват се автоматично)
test/                   node --test; фикстурите са реален HTML от suprimmo.bg и luximmo.com
```

- **Обновяване на обявите:** cron на всеки 6 часа (`triggers.crons`) + фоново обновяване при заявка, когато кешът е по-стар от
  `REFRESH_HOURS`. Ако suprimmo.bg не отговори или смени HTML-а така, че да не се намерят карти, старият кеш се пази.
- **Региони:** обявите се групират по населено място/област във Велико Търново, Габрово и Трявна, Севлиево и Априлци,
  Ловеч и Троян, Тетевен и Рибарица, „Другаде в България“. Показват се само региони с обяви; текстовете са в `src/lib/i18n.js`.
- **AI консиерж:** 4 въпроса (бюджет, тип, район, приоритет) → `POST /api/ask` с `filters` → каталогът се стеснява по твърдите
  критерии, Workers AI подрежда останалото (при неуспех — по ключови думи). Свободният текст от началната страница ползва
  същия endpoint. „Свържи ме с Никола“ попълва отговорите в контактната форма.
- **Снимки:** проксирани през `/img/{medium|big}/{файл}` и `/img/agent.jpg`, кеширани 30 дни. Картите в каталога имат
  галерия при hover/swipe (до 5 снимки), страницата на имота — колаж + lightbox.
- **Карта (`/karta`, `/en/map`):** Leaflet + OpenStreetMap; координати от страницата на имота (когато е отворена), вграден
  справочник, Nominatim (cron) или областния град; приблизителните маркери са с пунктир.
- **Отзиви (`/otzivi`, `/en/reviews` + секцията на Никола):** от <https://www.luximmo.com/customers/feedback/index.html?seller=467>
  веднъж дневно; показват се на езика на посетителя (преводите се правят с Workers AI и се пазят в кеша).
- **URL-и:** `/`, `/imoti?region=sevlievo&cat=houses&budget=0-30000&sort=price_asc`, `/imot/89460/slug`, `/karta`, `/otzivi`;
  английски: `/en/...`.
- **API:** `GET /api/listings`, `POST /api/ask {q, lang, listingId? | filters?}`, `POST /api/contact`, `GET /api/refresh?token=`.

## 3. Локална разработка

```bash
npm install
npm test              # парсер, филтри, региони
npm run dev           # astro dev (workerd; Workers AI изисква `npx wrangler login`)
npm run build         # astro build → dist/
npm run preview       # билднатият Worker локално
npm run check         # тестове + build + wrangler deploy --dry-run
```

## 4. Бележки

- Дизайнът следва handoff-а „Find Your Place“ (Home, Property, Mobile) с брандиране „НИ Имоти“. Разлики спрямо макета:
  регионите и отзивите са реални (от данните), „нова обява/за ремонт“ тагове няма в източника, затова картите показват
  тип имот, намаление и Акт 16; каталогът на мобилен е вертикална мрежа (по-удобна за 200+ обяви от хоризонталния swipe).
- Имейлът на Никола не е публикуван в suprimmo.bg (скрит зад captcha), затова сайтът ползва телефон, WhatsApp, Viber и формата.
- Данните на обявите са собственост на SUPRIMMO / PROPERTY.BG; всяка страница на имот води към оригиналната обява.
- Не добавяйте `nodejs_compat` в `compatibility_flags`: Astro тогава решава, че работи в Node, и връща празни страници в workerd.

---

## English summary

Astro 7 site (server-rendered on a Cloudflare Worker) for agent Nikola Ivanov in the "Find Your Place" design. Listings are
scraped from his SUPRIMMO broker page (all pages), cached in KV / edge cache with a bundled seed fallback, grouped into regions,
and rendered in Bulgarian and English with an AI concierge (Workers AI, keyword fallback). Deploy from the Cloudflare dashboard:
*Workers & Pages → Create → Workers → Import a repository*, build command `npm run build`, deploy command `npx wrangler deploy`.
Add the custom domain under *Settings → Domains & Routes*. Optional: KV namespace (uncomment in `wrangler.jsonc`), Resend email
secrets, `REFRESH_TOKEN`.
