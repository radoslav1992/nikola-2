/** Compact listing representation shared by the AI concierge (initial server render + JSON API). */
import { fmtPrice, placeLabel, typeLabel, fmtArea, listingHref, imgUrl } from './i18n.js';

export function matchItem(l, lang) {
  const tags = [typeLabel(l.type, lang)];
  if (l.area != null) tags.push(fmtArea(l.area, lang));
  if (l.plotArea != null) tags.push(`${lang === 'en' ? 'plot' : 'двор'} ${fmtArea(l.plotArea, lang)}`);
  if (l.discount) tags.push(`-${l.discount}%`);
  return {
    id: l.id,
    url: listingHref(l, lang),
    img: l.images?.[0] ? imgUrl(l.images[0], 'medium') : null,
    price: fmtPrice(l, lang),
    title: l.title,
    place: placeLabel(l.place, lang),
    tags: tags.slice(0, 3),
  };
}
