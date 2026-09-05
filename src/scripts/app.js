/* НИ Имоти — progressive enhancement. The site renders fully without JS; this adds:
   menu sheet, hero AI search + concierge wizard, region guides, card hover/touch, favourites, carousels,
   property Q&A, contact forms via fetch, gallery + lightbox, Leaflet maps. */
(function () {
  'use strict';
  var lang = document.body.getAttribute('data-lang') || 'bg';
  var bg = lang === 'bg';
  var T = {
    sending: bg ? 'Изпращане…' : 'Sending…',
    ok: bg ? 'Благодаря! Получих запитването и ще се свържа с вас.' : 'Thank you! I have received your enquiry and will be in touch.',
    okWa: bg ? 'Може също да ми пишете директно в WhatsApp:' : 'You can also message me directly on WhatsApp:',
    fail: bg ? 'Формата не е налична в момента — моля, обадете се или пишете в WhatsApp:' : 'The form is unavailable right now — please call or message on WhatsApp:',
    invalid: bg ? 'Моля, попълнете име и телефон/имейл.' : 'Please fill in your name and phone/email.',
    asking: bg ? 'Търсим отговор в обявата…' : 'Checking the listing…',
    askError: bg ? 'Асистентът не отговори. Опитайте отново или се обадете на Никола.' : 'The assistant did not answer. Try again or call Nikola.',
    yourAnswers: bg ? 'Моите отговори' : 'My answers',
    freeIntro: bg ? 'Търсене' : 'Search'
  };

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]; }); }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function postJSON(url, data) {
    return fetch(url, { method: 'POST', headers: { 'content-type': 'application/json', accept: 'application/json' }, body: JSON.stringify(data) })
      .then(function (r) { return r.json().then(function (j) { j.__status = r.status; return j; }); });
  }
  function store(key, val) { try { if (val === undefined) return JSON.parse(localStorage.getItem(key) || 'null'); localStorage.setItem(key, JSON.stringify(val)); } catch (e) { return null; } }

  /* Menu sheet */
  var menuBtn = $('[data-menu]');
  var sheet = $('#menu-sheet');
  if (menuBtn && sheet) {
    menuBtn.addEventListener('click', function () {
      var open = sheet.hidden;
      sheet.hidden = !open;
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.textContent = open ? '×' : '≡';
    });
    sheet.addEventListener('click', function (e) { if (e.target.tagName === 'A') { sheet.hidden = true; menuBtn.setAttribute('aria-expanded', 'false'); menuBtn.textContent = '≡'; } });
  }

  /* Favourites (per browser) */
  var favs = store('ni-favs') || {};
  $all('[data-fav]').forEach(function (b) {
    var id = b.getAttribute('data-fav');
    function paint() { b.classList.toggle('on', !!favs[id]); b.textContent = favs[id] ? '♥' : '♡'; }
    paint();
    b.addEventListener('click', function (e) {
      e.preventDefault(); e.stopPropagation();
      favs[id] = !favs[id];
      if (!favs[id]) delete favs[id];
      store('ni-favs', favs);
      $all('[data-fav="' + id + '"]').forEach(function (o) { o.classList.toggle('on', !!favs[id]); o.textContent = favs[id] ? '♥' : '♡'; });
    });
  });

  /* Hover cards on touch: first tap reveals the actions, second tap follows the link */
  $all('.hover-card').forEach(function (card) {
    card.addEventListener('touchend', function (e) {
      if (card.classList.contains('touch')) return;
      var a = e.target.closest('a');
      if (a && !a.classList.contains('featured-arrow')) return;
      e.preventDefault();
      $all('.hover-card.touch').forEach(function (c) { c.classList.remove('touch'); });
      card.classList.add('touch');
    }, { passive: false });
  });
  document.addEventListener('touchstart', function (e) { if (!e.target.closest('.hover-card')) $all('.hover-card.touch').forEach(function (c) { c.classList.remove('touch'); }); }, { passive: true });

  /* Catalogue card carousels */
  $all('[data-carousel]').forEach(function (media) {
    var imgs = $all('.slides img', media);
    var dots = $all('.dots i', media);
    var idx = 0;
    function show(i) {
      idx = (i + imgs.length) % imgs.length;
      imgs.forEach(function (im, k) { im.classList.toggle('on', k === idx); if (k === idx && im.loading === 'lazy') im.loading = 'eager'; });
      dots.forEach(function (d, k) { d.classList.toggle('on', k === idx); });
    }
    $all('.zones span', media).forEach(function (z, k) { z.addEventListener('mouseenter', function () { show(k); }); });
    media.addEventListener('mouseleave', function () { show(0); });
    var tx = null;
    media.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; }, { passive: true });
    media.addEventListener('touchend', function (e) {
      if (tx == null) return;
      var dx = e.changedTouches[0].clientX - tx;
      tx = null;
      if (Math.abs(dx) > 40) { e.preventDefault(); show(dx < 0 ? idx + 1 : idx - 1); }
    });
  });

  /* Region cards → local guide */
  var regionRow = $('[data-region-row]');
  if (regionRow) {
    function openRegion(key) {
      $all('[data-region]').forEach(function (b) { b.setAttribute('aria-expanded', String(b.getAttribute('data-region') === key)); });
      $all('[data-region-panel]').forEach(function (p) { p.hidden = p.getAttribute('data-region-panel') !== key; });
    }
    $all('[data-region]').forEach(function (b) {
      b.addEventListener('click', function () {
        var key = b.getAttribute('data-region');
        var isOpen = b.getAttribute('aria-expanded') === 'true';
        openRegion(isOpen ? null : key);
        if (!isOpen) { var p = $('[data-region-panel="' + key + '"]'); if (p && window.innerWidth < 900) p.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      });
    });
    $all('[data-region-close]').forEach(function (b) { b.addEventListener('click', function () { openRegion(null); }); });
  }

  /* ───────── AI concierge ───────── */
  var conc = $('[data-concierge]');
  var cfg = null;
  try { cfg = conc && JSON.parse($('[data-concierge-config]', conc).textContent); } catch (e) { cfg = null; }
  var chat = conc && $('[data-chat]', conc);
  var matchesEl = conc && $('[data-matches]', conc);
  var countEl = conc && $('[data-match-count]', conc);
  var answers = [];
  var busy = false;

  function matchRow(m, badge, best) {
    return '<a class="match" href="' + esc(m.url) + '">' +
      (m.img ? '<img class="match-img" src="' + esc(m.img) + '" alt="" loading="lazy" width="264" height="184">' : '<div class="match-img noimg"></div>') +
      '<div class="min0"><div class="match-price">' + esc(m.price) + '</div><div class="match-title">' + esc(m.title) + ' · ' + esc(m.place) + '</div>' +
      '<div class="match-tags">' + (m.tags || []).map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</div></div>' +
      '<div class="match-side">' + (badge ? '<span class="badge' + (best ? ' sage' : '') + '">' + esc(badge) + '</span>' : '') + '<span class="go">↗</span></div></a>';
  }
  function setCount(n) { if (countEl) countEl.textContent = n + ' ' + (n === 1 ? cfg.labels.propsCount1 : cfg.labels.propsCount); }
  function renderMatches(res) {
    if (!matchesEl) return;
    var items = res.items || [];
    var html = items.map(function (m, i) {
      var best = res.source === 'ai' && i === 0;
      var badge = res.source === 'ai' ? (i === 0 ? cfg.labels.best : cfg.labels.good) : cfg.labels.keyword;
      return matchRow(m, badge, best);
    }).join('');
    var note = res.answer ? '<p class="ai-note">' + esc(res.answer) + '</p>' : (!items.length || res.relaxed ? '<p class="ai-note">' + esc(cfg.labels.none) + '</p>' : '');
    matchesEl.innerHTML = note + html;
    setCount(items.length);
  }

  function renderChat() {
    if (!chat || !cfg) return;
    var qs = cfg.questions;
    var step = answers.length;
    var html = answers.map(function (a, i) {
      return '<div class="turn"><div class="bubble-q">' + esc(qs[i].q) + '</div><div class="bubble-a">' + esc(qs[i].o[a]) + '</div></div>';
    }).join('');
    if (busy) {
      html += '<div class="turn"><div class="bubble-q current">' + esc(cfg.labels.thinking) + '</div></div>';
    } else if (step < qs.length) {
      html += '<div class="turn"><div class="bubble-q current">' + esc(qs[step].q) + '</div><div class="options">' +
        qs[step].o.map(function (o, i) { return '<button type="button" class="opt" data-i="' + i + '">' + esc(o) + '</button>'; }).join('') +
        '</div><div class="step">' + esc(cfg.labels.stepOf) + ' ' + (step + 1) + ' ' + esc(cfg.labels.of) + ' ' + qs.length + '</div></div>';
    } else {
      html += '<div class="turn"><div class="bubble-q current">' + esc(cfg.labels.done) + '</div><div class="row">' +
        '<a class="btn btn-sage" href="' + esc(cfg.contactHref) + '" data-tell-nikola>' + esc(cfg.labels.tellNikola) + '</a>' +
        '<button type="button" class="opt" data-restart>' + esc(cfg.labels.restart) + '</button></div></div>';
    }
    chat.innerHTML = html;
    $all('.opt[data-i]', chat).forEach(function (b) { b.addEventListener('click', function () { answers.push(+b.getAttribute('data-i')); if (answers.length >= qs.length) finish(); else renderChat(); }); });
    var r = $('[data-restart]', chat); if (r) r.addEventListener('click', function () { answers = []; renderChat(); });
    var tell = $('[data-tell-nikola]', chat);
    if (tell) tell.addEventListener('click', function () {
      var msg = $('#contact textarea[name=message]');
      if (msg && !msg.value) msg.value = T.yourAnswers + ': ' + answers.map(function (a, i) { return qs[i].o[a]; }).join(', ') + '.';
    });
  }

  function finish() {
    var qs = cfg.questions;
    var b = cfg.budgets[answers[0]] || [null, null];
    var filters = { min: b[0], max: b[1], cat: cfg.cats[answers[1]] || '', region: (qs[2].keys || [])[answers[2]] || '' };
    var q = answers.map(function (a, i) { return qs[i].q + ' ' + qs[i].o[a]; }).join('. ');
    busy = true; renderChat();
    if (matchesEl) matchesEl.innerHTML = '<p class="ai-note">' + esc(cfg.labels.thinking) + '</p>';
    postJSON('/api/ask', { q: q, lang: lang, filters: filters }).then(function (res) {
      if (res.error) throw new Error(res.error);
      renderMatches(res);
    }).catch(function () {
      if (matchesEl) matchesEl.innerHTML = '<p class="ai-note error">' + esc(cfg.labels.error) + '</p> <p class="matches-foot"><a href="' + esc(cfg.allHref) + '">' + esc(cfg.labels.restart) + '</a></p>';
    }).then(function () { busy = false; renderChat(); });
  }

  /* Free-text search (hero) → concierge panel */
  function freeSearch(q, about) {
    if (!conc || !cfg) { window.location.href = (bg ? '' : '/en') + '/imoti?q=' + encodeURIComponent(q); return; }
    conc.scrollIntoView({ behavior: 'smooth', block: 'start' });
    busy = true; answers = []; renderChat();
    if (matchesEl) matchesEl.innerHTML = '<p class="ai-note">' + esc(cfg.labels.thinking) + '</p>';
    postJSON('/api/ask', { q: q, lang: lang, listingId: about || undefined }).then(function (res) {
      if (res.error) throw new Error(res.error);
      if (about) { if (matchesEl) matchesEl.innerHTML = '<p class="ai-note">' + esc(res.answer || cfg.labels.error) + '</p>'; }
      else renderMatches(res);
    }).catch(function () {
      if (matchesEl) matchesEl.innerHTML = '<p class="ai-note error">' + esc(cfg.labels.error) + '</p>';
    }).then(function () { busy = false; renderChat(); });
  }
  var free = $('[data-ai-free]');
  if (free) {
    var ta = $('textarea', free);
    $all('[data-pill]', free).forEach(function (p) { p.addEventListener('click', function () { ta.value = (ta.value.trim() ? ta.value.trim().replace(/[.,]?$/, ', ') : '') + p.textContent.trim(); ta.focus(); }); });
    free.addEventListener('submit', function (e) { e.preventDefault(); var q = ta.value.trim(); if (q) freeSearch(q); });
  }
  $all('[data-ai-jump]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (!conc) return;
      e.preventDefault();
      conc.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (a.getAttribute('data-ai-about') && ta) { ta.value = ''; }
    });
  });
  if (chat && cfg) renderChat();

  /* Property page: "Is this property right for you?" */
  var fit = $('[data-fit]');
  if (fit) {
    var thread = $('[data-fit-thread]', fit);
    var form = $('[data-fit-form]', fit);
    var listingId = fit.getAttribute('data-listing');
    function ask(q, btn) {
      $all('.fit-q', fit).forEach(function (b) { b.classList.toggle('on', b === btn); });
      thread.innerHTML = '<div class="bubble-a">' + esc(q) + '</div><div class="bubble-q">' + esc(T.asking) + '</div>';
      postJSON('/api/ask', { q: q, lang: lang, listingId: listingId }).then(function (res) {
        if (res.error) throw new Error(res.error);
        thread.innerHTML = '<div class="bubble-a">' + esc(q) + '</div><div class="bubble-q">' + esc(res.answer || T.askError) + '</div>';
      }).catch(function () {
        thread.innerHTML = '<div class="bubble-a">' + esc(q) + '</div><div class="bubble-q">' + esc(T.askError) + '</div>';
      });
    }
    $all('[data-fit-q]', fit).forEach(function (b) { b.addEventListener('click', function () { ask(b.textContent.trim(), b); }); });
    form.addEventListener('submit', function (e) { e.preventDefault(); var q = form.q.value.trim(); if (q) { ask(q, null); form.q.value = ''; } });
  }

  /* Contact forms */
  $all('[data-contact]').forEach(function (form) {
    var status = form.querySelector('.form-status');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = {};
      $all('input, textarea', form).forEach(function (el) { if (el.name) data[el.name] = el.value; });
      if (!data.name || !data.contact) { status.className = 'form-status err'; status.textContent = T.invalid; return; }
      var btn = form.querySelector('button[type=submit]');
      btn.disabled = true;
      status.className = 'form-status';
      status.textContent = T.sending;
      postJSON('/api/contact', data).then(function (res) {
        var wa = res.whatsapp ? ' <a href="' + esc(res.whatsapp) + '" target="_blank" rel="noopener">WhatsApp ↗</a>' : '';
        if (res.ok) {
          status.className = 'form-status ok';
          status.innerHTML = esc(T.ok) + (wa ? ' ' + esc(T.okWa) + wa : '');
          form.reset();
        } else {
          status.className = 'form-status err';
          status.innerHTML = esc(res.__status === 400 ? T.invalid : T.fail) + wa;
        }
      }).catch(function () {
        status.className = 'form-status err';
        status.textContent = T.fail;
      }).then(function () { btn.disabled = false; });
    });
  });

  /* Gallery + lightbox */
  var gallery = $('[data-gallery]');
  var lightbox = $('[data-lightbox]');
  if (gallery && lightbox) {
    var images = [];
    try { images = JSON.parse($('[data-gallery-images]', gallery).textContent); } catch (err) { images = []; }
    var lbImg = $('img', lightbox);
    var lbCount = $('.lb-count', lightbox);
    var idx = 0;
    function show(i) {
      if (!images.length) return;
      idx = (i + images.length) % images.length;
      lbImg.src = images[idx];
      lbCount.textContent = (idx + 1) + ' / ' + images.length;
    }
    function open(i) { show(i); lightbox.hidden = false; document.body.style.overflow = 'hidden'; }
    function close() { lightbox.hidden = true; document.body.style.overflow = ''; }
    $all('[data-gallery-index]', gallery).forEach(function (b) { b.addEventListener('click', function () { open(parseInt(b.getAttribute('data-gallery-index'), 10) || 0); }); });
    $('[data-lb-close]', lightbox).addEventListener('click', close);
    $('[data-lb-prev]', lightbox).addEventListener('click', function () { show(idx - 1); });
    $('[data-lb-next]', lightbox).addEventListener('click', function () { show(idx + 1); });
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', function (e) {
      if (lightbox.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
    });
    var touchX = null;
    lightbox.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; }, { passive: true });
    lightbox.addEventListener('touchend', function (e) {
      if (touchX == null) return;
      var dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 40) show(dx < 0 ? idx + 1 : idx - 1);
      touchX = null;
    });
  }

  /* Maps (Leaflet is only loaded on pages that need it; it is deferred, so wait for it) */
  function withLeaflet(fn) {
    if (window.L) return fn(window.L);
    var s = $('script[src*="leaflet"]');
    if (s) s.addEventListener('load', function () { fn(window.L); });
  }
  function tiles(L, map) {
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(map);
  }
  var mapEl = $('[data-map]');
  if (mapEl) withLeaflet(function (L) {
    var points = [];
    try { points = JSON.parse($('[data-map-points]').textContent); } catch (err) { points = []; }
    var map = L.map(mapEl, { scrollWheelZoom: true, zoomControl: false });
    L.control.zoom({ position: 'bottomright' }).addTo(map);
    tiles(L, map);
    var bounds = [];
    var openLabel = mapEl.getAttribute('data-open');
    var approxLabel = mapEl.getAttribute('data-approx');
    var exactLabel = mapEl.getAttribute('data-exact');
    points.forEach(function (p) {
      var icon = L.divIcon({ className: 'price-pin-wrap', html: '<div class="price-pin' + (p.approx ? ' approx' : '') + '">' + esc(p.priceLabel) + '</div>', iconSize: [0, 0] });
      var m = L.marker([p.lat, p.lng], { icon: icon, title: p.title }).addTo(map);
      var meta = [];
      if (p.area) meta.push(p.area + ' m²');
      if (p.plotArea) meta.push((bg ? 'двор ' : 'plot ') + p.plotArea + ' m²');
      if (p.bedrooms) meta.push(p.bedrooms + (bg ? ' спални' : ' bd'));
      m.bindPopup(
        '<div class="map-pop">' + (p.img ? '<img src="' + esc(p.img) + '" alt="" loading="lazy">' : '') +
        '<div class="map-pop-body"><div class="price">' + esc(p.priceLabel) + '</div>' +
        '<div class="title">' + esc(p.title) + '</div>' +
        '<div class="loc">' + esc(p.typeLabel) + ' · ' + esc(p.placeLabel) + (meta.length ? '<br>' + esc(meta.join(' · ')) : '') + '</div>' +
        '<div class="loc">' + esc(p.approx ? approxLabel : exactLabel) + '</div>' +
        '<a class="btn btn-dark" href="' + esc(p.url) + '">' + esc(openLabel) + '</a></div></div>',
        { maxWidth: 280, minWidth: 260, closeButton: true }
      );
      m.on('popupopen', function () { var el = m.getElement(); if (el) el.querySelector('.price-pin').classList.add('active'); });
      m.on('popupclose', function () { var el = m.getElement(); if (el) el.querySelector('.price-pin').classList.remove('active'); });
      bounds.push([p.lat, p.lng]);
    });
    if (bounds.length) map.fitBounds(bounds, { padding: [60, 60], maxZoom: 12 });
    else map.setView([43.0, 25.3], 9);
  });
  var propMap = $('[data-propmap]');
  if (propMap) withLeaflet(function (L) {
    var lat = parseFloat(propMap.getAttribute('data-lat'));
    var lng = parseFloat(propMap.getAttribute('data-lng'));
    var approx = propMap.getAttribute('data-approx') === '1';
    if (!isFinite(lat) || !isFinite(lng)) return;
    var pm = L.map(propMap, { scrollWheelZoom: false, zoomControl: true });
    tiles(L, pm);
    if (approx) {
      L.circle([lat, lng], { radius: 1000, color: '#173D32', fillColor: '#AFC4A4', fillOpacity: 0.35, weight: 2 }).addTo(pm);
      pm.setView([lat, lng], 12);
    } else {
      L.marker([lat, lng]).addTo(pm);
      pm.setView([lat, lng], 14);
    }
  });
})();
