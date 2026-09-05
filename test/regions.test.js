import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { regionOf, groupByRegion, REGIONS, isRegionKey } from '../src/lib/regions.js';
import { REGION_COPY } from '../src/lib/i18n.js';
import { applyFilters, parseFilters } from '../src/lib/catalog.js';
import { matchItem } from '../src/lib/present.js';

const seed = JSON.parse(readFileSync(new URL('../data/seed.json', import.meta.url), 'utf8'));
const items = seed.items;

test('every region has copy in both languages', () => {
  for (const r of REGIONS) {
    assert.ok(REGION_COPY[r.key], `copy for ${r.key}`);
    for (const lang of ['bg', 'en']) {
      assert.ok(REGION_COPY[r.key].name[lang] && REGION_COPY[r.key].guide[lang] && REGION_COPY[r.key].facts[lang].length >= 3);
    }
  }
});

test('regionOf maps towns and falls back to the province', () => {
  assert.equal(regionOf({ place: 'близо до гр. Севлиево', region: 'Габровска област' }), 'sevlievo');
  assert.equal(regionOf({ place: 'гр. Априлци', region: 'Ловешка област' }), 'sevlievo');
  assert.equal(regionOf({ place: 'гр. Габрово / кв. Център', region: 'Габровска област' }), 'gabrovo');
  assert.equal(regionOf({ place: 'с. Орешене', region: 'Ловешка област' }), 'teteven');
  assert.equal(regionOf({ place: 'с. Незнайно', region: 'Ловешка област' }), 'lovech');
  assert.equal(regionOf({ place: 'с. Незнайно', region: 'Габровска област' }), 'sevlievo');
  assert.equal(regionOf({ place: 'гр. Варна', region: 'Варненска област' }), 'other');
});

test('groupByRegion covers every seed listing exactly once', () => {
  const groups = groupByRegion(items);
  const total = groups.reduce((n, g) => n + g.count, 0);
  assert.equal(total, items.length);
  assert.ok(groups.find((g) => g.key === 'sevlievo').count >= 8);
  assert.ok(isRegionKey('tarnovo') && !isRegionKey('mars'));
});

test('region filter works through parseFilters/applyFilters', () => {
  const res = applyFilters(items, parseFilters(new URLSearchParams('region=sevlievo&budget=0-30000')));
  assert.ok(res.length > 0);
  assert.ok(res.every((l) => regionOf(l) === 'sevlievo' && l.price <= 30000));
  assert.equal(parseFilters(new URLSearchParams('region=nope')).region, '');
});

test('matchItem produces the compact shape used by the concierge', () => {
  const m = matchItem(items[1], 'en');
  assert.equal(m.id, 89460);
  assert.match(m.url, /^\/en\/imot\/89460\//);
  assert.match(m.img, /^\/img\/medium\//);
  assert.equal(m.price, '€15 500');
  assert.ok(m.tags.length >= 2 && m.tags[0] === 'House');
});
