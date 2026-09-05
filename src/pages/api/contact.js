/** POST /api/contact — stores the lead in KV (if bound) and emails it through Resend (if configured). */
import { env } from 'cloudflare:workers';
import { json } from '../../lib/data.js';
import { storeLead } from '../../lib/store.js';
import { readBody } from '../../lib/request.js';
import { SITE, waLink } from '../../lib/i18n.js';

export async function POST({ request }) {
  const body = await readBody(request);
  const lang = body.lang === 'en' ? 'en' : 'bg';
  const name = String(body.name || '').trim().slice(0, 120);
  const contact = String(body.contact || '').trim().slice(0, 160);
  const message = String(body.message || '').trim().slice(0, 3000);
  const honeypot = String(body.website || '').trim();
  const listingRef = String(body.listingRef || '').trim().slice(0, 40);
  const listingTitle = String(body.listingTitle || '').trim().slice(0, 200);
  const listingId = parseInt(body.listingId, 10) || null;

  const waText = lang === 'en'
    ? `Hello Nikola, I am ${name || '...'}${listingRef ? `, interested in property ${listingRef}` : ''}. ${message}`.trim()
    : `Здравейте, Никола, аз съм ${name || '...'}${listingRef ? `, интересувам се от имот ${listingRef}` : ''}. ${message}`.trim();
  const whatsapp = waLink(waText);

  if (honeypot) return json({ ok: true, whatsapp });
  if (!name || !contact) return json({ ok: false, error: 'invalid', whatsapp }, 400);

  const lead = {
    name, contact, message, listingId, listingRef, listingTitle, lang,
    receivedAt: new Date().toISOString(),
    country: request.cf?.country || null,
    page: request.headers.get('referer') || null,
  };
  const [stored, mailed] = await Promise.all([storeLead(env, lead), sendLeadEmail(lead)]);
  const ok = stored || mailed;
  if (!ok) console.warn('Lead not delivered: configure a KV binding (LISTINGS) or RESEND_API_KEY + CONTACT_TO', lead);
  return json({ ok, stored, mailed, whatsapp }, ok ? 200 : 503);
}

async function sendLeadEmail(lead) {
  if (!env.RESEND_API_KEY || !env.CONTACT_TO) return false;
  const site = (env.SITE_URL || `https://${SITE.domain}`).replace(/\/$/, '');
  const subject = `${SITE.name}: запитване от ${lead.name}${lead.listingRef ? ` за ${lead.listingRef}` : ''}`;
  const text = [
    `Име: ${lead.name}`,
    `Контакт: ${lead.contact}`,
    lead.listingRef ? `Имот: ${lead.listingRef} — ${lead.listingTitle}` : null,
    lead.listingId ? `Линк: ${site}/imot/${lead.listingId}` : null,
    '',
    lead.message || '(без съобщение)',
    '',
    `Език: ${lead.lang} · Държава: ${lead.country || '?'} · Получено: ${lead.receivedAt}`,
    lead.page ? `Страница: ${lead.page}` : null,
  ].filter((x) => x != null).join('\n');
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        from: env.CONTACT_FROM || `${SITE.name} <onboarding@resend.dev>`,
        to: env.CONTACT_TO.split(',').map((s) => s.trim()).filter(Boolean),
        reply_to: /@/.test(lead.contact) ? lead.contact : undefined,
        subject,
        text,
      }),
    });
    if (!res.ok) console.warn('Resend error', res.status, await res.text());
    return res.ok;
  } catch (err) {
    console.warn('Resend failed', err && err.message);
    return false;
  }
}
