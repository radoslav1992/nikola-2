import { json } from '../lib/data.js';
export function GET() {
  return json({ ok: true, site: 'niimoti.com', time: new Date().toISOString() });
}
