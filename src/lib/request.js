/** Parses JSON or form bodies, never throws. */
export async function readBody(request) {
  const ct = request.headers.get('content-type') || '';
  try {
    if (ct.includes('application/json')) return (await request.json()) || {};
    if (ct.includes('form')) {
      const fd = await request.formData();
      return Object.fromEntries([...fd.entries()].map(([k, v]) => [k, typeof v === 'string' ? v : '']));
    }
    const text = await request.text();
    try { return JSON.parse(text); } catch { return Object.fromEntries(new URLSearchParams(text)); }
  } catch {
    return {};
  }
}
