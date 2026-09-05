/**
 * Copy for both languages + small formatting helpers.
 * Listing content comes from suprimmo.bg in Bulgarian; in English mode we translate
 * labels, property types and transliterate place names.
 */

export const AGENT = {
  name: { bg: 'Никола Иванов', en: 'Nikola Ivanov' },
  role: { bg: 'брокер, Централна Стара планина', en: 'broker, Central Balkan' },
  roleLong: { bg: 'Консултант недвижими имоти · Офис Велико Търново (PROPERTY.BG / SUPRIMMO)', en: 'Real estate consultant · Veliko Tarnovo office (PROPERTY.BG / SUPRIMMO)' },
  mobile: '+359 882 638 423',
  office: '+359 62 588 042',
  whatsapp: '+359 883 700 335',
  whatsappDigits: '359883700335',
  address: { bg: 'гр. Велико Търново 5000, ул. Никола Пиколо 23', en: '23 Nikola Pikolo St., 5000 Veliko Tarnovo, Bulgaria' },
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('ул. Никола Пиколо 23, Велико Търново 5000'),
  languages: { bg: 'Български · English · Español', en: 'Bulgarian · English · Spanish' },
  sourceUrl: 'https://www.suprimmo.bg/oferti-na-brokera-nikola-ivanov/',
  profileUrl: 'https://www.suprimmo.bg/broker-467-nikola-ivanov/',
};

export const SITE = {
  name: 'НИ Имоти',
  nameLatin: 'NI Imoti',
  domain: 'niimoti.com',
  tagline: { bg: 'Find your place', en: 'Find your place' },
};

export const T = {
  bg: {
    brandTag: 'Недвижими имоти в Стара планина и Северна България',
    navProps: 'Имоти', navRegions: 'Региони', navAI: 'AI търсене', navNikola: 'Никола', navMap: 'Карта', navReviews: 'Отзиви', navCall: 'Обади се',
    metaHome: 'НИ Имоти — къщи, парцели и имоти в Централна Стара планина и Северна България. Лични консултации от Никола Иванов, Велико Търново.',
    heroTitle: 'Мястото, което търсите, може би вече ви очаква.',
    searchTitle: 'Какъв имот търсите?',
    searchPlaceholder: '„Стара къща за ремонт, голям двор, гледка към Балкана и бюджет до 55 000 евро.“',
    findAI: 'Намери с AI', useFilters: 'Използвай филтри',
    pills: ['Уединена къща', 'До планина', 'Голям двор', 'До €50 000', 'За ремонт'],
    bentoTitle: 'Избрано тази седмица', allProps: 'Всички имоти', featured: 'Избран имот', newListing: 'Нова обява', reducedBadge: 'Намалена цена',
    viewProp: 'Виж имота', askAI: 'Попитай AI', region: 'Регион', propsCount: (n) => (n === 1 ? 'имот' : 'имота'), broker: 'Вашият брокер',
    askNikola: 'Попитайте Никола за всичко около имота.',
    aiCardTitle: 'Опишете мястото, не филтрите.', aiCardBody: 'Кажете ни как искате да живеете и AI ще подбере имоти от актуалните оферти, които отговарят на това.', startAI: 'Започни разговор',
    discoverKicker: 'Открийте България', discoverTitle: (n) => `Едно пътуване през ${['', 'един', 'два', 'три', 'четири', 'пет', 'шест'][n] || n} ${n === 1 ? 'регион' : 'региона'}`,
    discoverBody: 'Изберете регион, за да видите наличните имоти и кратък местен пътеводител: пътища, климат, какво има наоколо.',
    localGuide: 'Местен пътеводител', close: 'Затвори', allInRegion: 'Всички имоти в региона',
    aiKicker: 'AI консиерж', aiTitle: 'Не сте сигурни откъде да започнете?',
    aiBody: 'Отговорете на четири кратки въпроса или опишете мястото със свои думи — ще подредим актуалните имоти по това, което ни разкажете.',
    questions: [
      { q: 'Какъв е приблизителният ви бюджет?', o: ['До €30 000', '€30 000 – €60 000', '€60 000 – €120 000', 'Над €120 000', 'Още не знам'] },
      { q: 'Какъв имот търсите?', o: ['Къща с двор', 'Парцел или земя', 'Апартамент', 'Бизнес имот', 'Няма значение'] },
      { q: 'Има ли район, който предпочитате?', o: [] },
      { q: 'Кое е най-важно за вас?', o: ['Уединение и природа', 'Близо до град и удобства', 'Голям двор за стопанство', 'Инвестиция или наем'] },
    ],
    anyRegion: 'Няма значение',
    stepOf: 'Въпрос', of: 'от',
    aiThinking: 'Подреждаме имотите по вашите отговори…', aiDone: 'Благодаря. Подредихме имотите вдясно по това, което ни разказахте. Искате ли Никола да ви се обади?',
    aiNone: 'Не намерихме точно съвпадение. Показваме най-близките предложения — а Никола знае и за имоти, които още не са публикувани.',
    aiError: 'Търсенето не сработи. Опитайте отново или разгледайте всички имоти.',
    tellNikola: 'Свържи ме с Никола', restart: 'Започни отначало', matches: 'Подходящи имоти', best: 'Най-близък', good: 'Подходящ', keyword: 'По ключови думи',
    quote: '„Добрият имот не е само цена и квадратура. Важно е мястото да отговаря на начина, по който искате да живеете.“',
    nikolaTitle: 'Познавам всяка къща, която показвам.',
    nikolaBody: 'Консултант в офиса на PROPERTY.BG / SUPRIMMO във Велико Търново. Всеки имот е видян лично — казвам и това, което не е в обявата, и оставам до нотариуса и след него.',
    areas: 'Райони', languages: 'Езици', phone: 'Директен телефон', messengers: 'WhatsApp и Viber', testimonials: 'Клиенти', allReviews: 'Всички отзиви →',
    tellMe: 'Разкажете ми какво търсите',
    footProp: 'Всички имоти', footMap: 'Карта', footReviews: 'Отзиви', footNote: 'Всички цени са ориентировъчни', footSource: 'Обявите се публикуват от SUPRIMMO / PROPERTY.BG с отговорен брокер Никола Иванов и се обновяват автоматично.', footUpdated: 'Обновено',
    call: 'Обади се', message: 'Съобщение',
    // catalogue
    catKicker: 'Централна Стара планина и Северна България', catTitle: 'Имоти', map: 'Карта', list: 'Списък', swipeHint: 'плъзнете настрани',
    results: (n) => `${n} ${n === 1 ? 'имот' : 'имота'}`, noResults: 'Няма имоти по тези критерии.', clearFilters: 'Изчисти филтрите', pagePrev: '← Назад', pageNext: 'Напред →', page: 'Страница',
    fLocation: 'Локация', fLocationPh: 'Град, село или регион', fBudget: 'Бюджет', fBudgetAny: 'Всякакъв бюджет', fBudget1: 'до 30 000 €', fBudget2: '30 000 – 60 000 €', fBudget3: '60 000 – 120 000 €', fBudget4: 'над 120 000 €',
    fType: 'Тип имот', fTypeAny: 'Всички', fDeal: 'Сделка', fDealAny: 'Продажба и наем', fSale: 'Продажба', fRent: 'Наем', fSearch: 'Покажи', fSort: 'Подредба', filters: 'Филтри',
    sortTop: 'Топ оферти', sortPriceAsc: 'Цена: ниска → висока', sortPriceDesc: 'Цена: висока → ниска', sortAreaAsc: 'Площ: малка → голяма', sortAreaDesc: 'Площ: голяма → малка',
    catHouses: 'Къщи и вили', catPlots: 'Парцели', catLand: 'Земеделска земя', catBusiness: 'Бизнес имоти', catRent: 'Под наем', catReduced: 'Намалени цени', catApartments: 'Апартаменти',
    // property
    back: 'Всички имоти', allPhotos: 'Виж всички снимки', pricePer: (v) => `≈ €${v} / м²`, ref: 'Реф. №', statusRent: 'Под наем', akt16: 'Акт 16',
    fHouse: 'Сграда', fPlot: 'Двор', fArea: 'Площ', fBedrooms: 'Спални', fFloors: 'Етажи', fTypeLabel: 'Тип', fRegion: 'Област', fOldPrice: 'Предишна цена', fDiscount: 'Намаление', fPricePerSqm: 'Цена на м²', fAkt16: 'Разрешение за ползване', fAkt16Val: 'Да (Акт 16)',
    descTitle: 'Описание', descMissing: 'Пълното описание и всички снимки са в оригиналната обява на SUPRIMMO.', descSource: 'Виж обявата в SUPRIMMO →',
    charTitle: 'Характеристики', mapTitle: 'Местоположение и околности', mapSub: 'Точният адрес се предоставя при оглед.', mapOpen: 'Отвори картата', approxLocation: 'Приблизително местоположение', exactLocation: 'Точно местоположение', openListing: 'Виж имота',
    fitTitle: 'Подходящ ли е този имот за вас?', fitBody: 'Задайте въпрос за имота, района или начина на живот там. Отговаряме по данните в обявата; за останалото — Никола.',
    fitQs: ['Подходящ ли е за целогодишно живеене?', 'Колко е далеч от най-близкия град?', 'Има ли ток и вода в имота?', 'Какви са данъците и таксите при покупка?'],
    fitInput: 'Или напишете свой въпрос…', fitAsking: 'Търсим отговор в обявата…',
    fName: 'Вашето име', fPhone: 'Телефон или имейл', fMsg: 'Кога бихте искали оглед? Имате ли въпроси?', fMsgHome: 'Какъв имот търсите?', fSend: 'Изпрати запитване', fNote: 'Никола отговаря обикновено в рамките на деня.',
    formSending: 'Изпращане…', formOk: 'Благодаря! Получих запитването и ще се свържа с вас.', formOkWa: 'Може също да ми пишете директно в WhatsApp:', formFail: 'Формата не е налична в момента — моля, обадете се или пишете в WhatsApp:', formInvalid: 'Моля, попълнете име и телефон/имейл.',
    similarTitle: 'Подобни имоти', videoTitle: 'Видео',
    // reviews
    reviewsTitle: 'Какво казват клиентите', reviewsSub: 'Отзиви от купувачи и продавачи, работили с Никола, публикувани в системата на PROPERTY.BG / LUXIMMO.', reviewsSource: 'Виж отзивите в LUXIMMO ↗', reviewsCount: (n) => `${n} ${n === 1 ? 'отзив' : 'отзива'}`, reviewsEmpty: 'Все още няма публикувани отзиви.', anonymous: 'Клиент', reviewProperty: 'Имот', translatedFrom: { en: 'превод от английски', bg: '' },
    // map
    mapTitle2: 'Имотите на картата', mapSub2: 'Местоположението е по населено място; точният адрес се уточнява при оглед.', mapCount: (n) => `${n} ${n === 1 ? 'имот' : 'имота'}`,
    notFoundTitle: 'Страницата не е намерена', notFoundSub: 'Имотът може да е продаден или свален от продажба.', backHome: 'Към началната страница',
    photoOf: (i, n) => `Снимка ${i} от ${n}`, prev: 'Предишна', next: 'Следваща', menu: 'Меню', favourite: 'Запази',
  },
  en: {
    brandTag: 'Real estate in the Balkan Mountains and northern Bulgaria',
    navProps: 'Properties', navRegions: 'Regions', navAI: 'AI search', navNikola: 'Nikola', navMap: 'Map', navReviews: 'Reviews', navCall: 'Call',
    metaHome: 'NI Imoti — houses, plots and property in the central Balkan Mountains and northern Bulgaria. Personal guidance from Nikola Ivanov, Veliko Tarnovo.',
    heroTitle: 'The place you are looking for may already be waiting for you.',
    searchTitle: 'What kind of property are you looking for?',
    searchPlaceholder: '“An old house to renovate, a big yard, a view of the Balkan and a budget up to €55,000.”',
    findAI: 'Find with AI', useFilters: 'Use filters',
    pills: ['Secluded house', 'Near mountains', 'Large yard', 'Under €50,000', 'To renovate'],
    bentoTitle: 'Selected this week', allProps: 'All properties', featured: 'Featured', newListing: 'New listing', reducedBadge: 'Price reduced',
    viewProp: 'View property', askAI: 'Ask AI', region: 'Region', propsCount: (n) => (n === 1 ? 'property' : 'properties'), broker: 'Your broker',
    askNikola: 'Ask Nikola anything about a property.',
    aiCardTitle: 'Describe the place, not the filters.', aiCardBody: 'Tell us how you want to live and the AI will pick the current listings that fit.', startAI: 'Start a conversation',
    discoverKicker: 'Discover Bulgaria', discoverTitle: (n) => `A journey through ${['', 'one', 'two', 'three', 'four', 'five', 'six'][n] || n} ${n === 1 ? 'region' : 'regions'}`,
    discoverBody: 'Pick a region to see available properties and a short local guide: roads, climate, what is nearby.',
    localGuide: 'Local guide', close: 'Close', allInRegion: 'All properties in this region',
    aiKicker: 'AI concierge', aiTitle: 'Not sure where to start?',
    aiBody: 'Answer four short questions or describe the place in your own words — we will sort the current listings by what you tell us.',
    questions: [
      { q: 'What is your approximate budget?', o: ['Up to €30,000', '€30,000 – €60,000', '€60,000 – €120,000', 'Over €120,000', 'Not sure yet'] },
      { q: 'What kind of property are you after?', o: ['House with a yard', 'Plot or land', 'Apartment', 'Business property', 'No preference'] },
      { q: 'Is there an area you prefer?', o: [] },
      { q: 'What matters most to you?', o: ['Seclusion and nature', 'Close to a town and amenities', 'A large yard for a smallholding', 'Investment or rental'] },
    ],
    anyRegion: 'No preference',
    stepOf: 'Question', of: 'of',
    aiThinking: 'Sorting the listings by your answers…', aiDone: 'Thank you. The properties on the right are sorted by what you told us. Would you like Nikola to call you?',
    aiNone: 'No exact match. These are the closest listings — and Nikola knows about properties that are not published yet.',
    aiError: 'Search did not work. Please try again or browse all properties.',
    tellNikola: 'Connect me with Nikola', restart: 'Start over', matches: 'Matching properties', best: 'Closest match', good: 'Good fit', keyword: 'Keyword match',
    quote: '“A good property is not just price and square metres. What matters is that the place fits the way you want to live.”',
    nikolaTitle: 'I know every house I show.',
    nikolaBody: 'Consultant at the PROPERTY.BG / SUPRIMMO office in Veliko Tarnovo. Every property has been seen in person — I tell you what the listing leaves out and stay with you through the notary and beyond.',
    areas: 'Areas', languages: 'Languages', phone: 'Direct phone', messengers: 'WhatsApp and Viber', testimonials: 'Clients', allReviews: 'All reviews →',
    tellMe: 'Tell me what you are looking for',
    footProp: 'All properties', footMap: 'Map', footReviews: 'Reviews', footNote: 'All prices are indicative', footSource: 'Listings are published by SUPRIMMO / PROPERTY.BG with Nikola Ivanov as responsible agent and refresh automatically.', footUpdated: 'Updated',
    call: 'Call', message: 'Message',
    catKicker: 'Central Balkan and northern Bulgaria', catTitle: 'Properties', map: 'Map', list: 'List', swipeHint: 'swipe sideways',
    results: (n) => `${n} ${n === 1 ? 'property' : 'properties'}`, noResults: 'No properties match these filters.', clearFilters: 'Clear filters', pagePrev: '← Previous', pageNext: 'Next →', page: 'Page',
    fLocation: 'Location', fLocationPh: 'Town, village or region', fBudget: 'Budget', fBudgetAny: 'Any budget', fBudget1: 'up to €30,000', fBudget2: '€30,000 – 60,000', fBudget3: '€60,000 – 120,000', fBudget4: 'over €120,000',
    fType: 'Property type', fTypeAny: 'All', fDeal: 'Deal', fDealAny: 'Sale and rent', fSale: 'For sale', fRent: 'For rent', fSearch: 'Show', fSort: 'Sort', filters: 'Filters',
    sortTop: 'Top offers', sortPriceAsc: 'Price: low → high', sortPriceDesc: 'Price: high → low', sortAreaAsc: 'Area: small → large', sortAreaDesc: 'Area: large → small',
    catHouses: 'Houses & villas', catPlots: 'Plots', catLand: 'Agricultural land', catBusiness: 'Business properties', catRent: 'For rent', catReduced: 'Reduced prices', catApartments: 'Apartments',
    back: 'All properties', allPhotos: 'See all photos', pricePer: (v) => `≈ €${v} / m²`, ref: 'Ref.', statusRent: 'For rent', akt16: 'Act 16',
    fHouse: 'Building', fPlot: 'Plot', fArea: 'Area', fBedrooms: 'Bedrooms', fFloors: 'Floors', fTypeLabel: 'Type', fRegion: 'Province', fOldPrice: 'Previous price', fDiscount: 'Reduction', fPricePerSqm: 'Price per m²', fAkt16: 'Occupancy permit', fAkt16Val: 'Yes (Act 16)',
    descTitle: 'Description', descMissing: 'The full description and all photos are in the original SUPRIMMO listing (in Bulgarian).', descSource: 'Open the SUPRIMMO listing →',
    charTitle: 'Characteristics', mapTitle: 'Location and surroundings', mapSub: 'The exact address is shared at viewing.', mapOpen: 'Open map', approxLocation: 'Approximate location', exactLocation: 'Exact location', openListing: 'View property',
    fitTitle: 'Is this property right for you?', fitBody: 'Ask about the property, the area or life there. Answers draw on the listing; for everything else — Nikola.',
    fitQs: ['Is it suitable for year-round living?', 'How far is the nearest town?', 'Does the property have electricity and water?', 'What are the purchase taxes and fees?'],
    fitInput: 'Or type your own question…', fitAsking: 'Checking the listing…',
    fName: 'Your name', fPhone: 'Phone or email', fMsg: 'When would you like a viewing? Any questions?', fMsgHome: 'What kind of property are you after?', fSend: 'Send enquiry', fNote: 'Nikola usually replies the same day.',
    formSending: 'Sending…', formOk: 'Thank you! I have received your enquiry and will be in touch.', formOkWa: 'You can also message me directly on WhatsApp:', formFail: 'The form is unavailable right now — please call or message on WhatsApp:', formInvalid: 'Please fill in your name and phone/email.',
    similarTitle: 'Similar properties', videoTitle: 'Video',
    reviewsTitle: 'What clients say', reviewsSub: 'Feedback from buyers and sellers who worked with Nikola, as published in the PROPERTY.BG / LUXIMMO system.', reviewsSource: 'See the reviews on LUXIMMO ↗', reviewsCount: (n) => `${n} ${n === 1 ? 'review' : 'reviews'}`, reviewsEmpty: 'No reviews published yet.', anonymous: 'Client', reviewProperty: 'Property', translatedFrom: { bg: 'translated from Bulgarian', en: '' },
    mapTitle2: 'Properties on the map', mapSub2: 'Locations are by town or village; the exact address is shared at viewing.', mapCount: (n) => `${n} ${n === 1 ? 'property' : 'properties'}`,
    notFoundTitle: 'Page not found', notFoundSub: 'The property may have been sold or withdrawn.', backHome: 'Back to the home page',
    photoOf: (i, n) => `Photo ${i} of ${n}`, prev: 'Previous', next: 'Next', menu: 'Menu', favourite: 'Save',
  },
};

/* ───────────── regions copy (keys match src/lib/regions.js) ───────────── */

export const REGION_COPY = {
  tarnovo: {
    name: { bg: 'Велико Търново', en: 'Veliko Tarnovo' },
    tagline: { bg: 'Старата столица над Янтра', en: 'The old capital above the Yantra' },
    guide: {
      bg: 'Град с университет, болници, международна общност и добра инфраструктура. Къщите в Стария град и Арбанаси са реставрирани и по-скъпи; селата на 15–20 минути около Павликени, Лясковец и Елена са значително по-достъпни.',
      en: 'A city with a university, hospitals, an international community and good infrastructure. Old-town and Arbanasi houses are restored and pricier; villages 15–20 minutes away around Pavlikeni, Lyaskovets and Elena are far more affordable.',
    },
    facts: { bg: ['Университет и болници', 'Международна общност', 'Летище Горна Оряховица'], en: ['University and hospitals', 'International community', 'Gorna Oryahovitsa airport'] },
  },
  gabrovo: {
    name: { bg: 'Габрово и Трявна', en: 'Gabrovo and Tryavna' },
    tagline: { bg: 'Възрожденска архитектура и гори', en: 'Revival architecture and forests' },
    guide: {
      bg: 'Трявна е може би най-добре запазеното възрожденско градче в Балкана. Габрово има университет, болница и индустрия. Много села около Боженци и Плачковци с реставрирани къщи, гори и пътеки от прага.',
      en: 'Tryavna is perhaps the best-preserved Revival-era town in the Balkan. Gabrovo has a university, a hospital and industry. Many villages around Bozhentsi and Plachkovtsi with restored houses, forests and trails from the doorstep.',
    },
    facts: { bg: ['Архитектурен резерват Боженци', 'Влак до Трявна', 'Ски и пътеки: Узана'], en: ['Bozhentsi reserve', 'Train to Tryavna', 'Skiing and trails: Uzana'] },
  },
  sevlievo: {
    name: { bg: 'Севлиево и Априлци', en: 'Sevlievo and Apriltsi' },
    tagline: { bg: 'Язовир, ливади и връх Ботев на хоризонта', en: 'A lake, meadows and Botev peak on the horizon' },
    guide: {
      bg: 'Севлиево е малък град с болница, пазар и работеща индустрия; наоколо са селата към язовир „Александър Стамболийски“ и Предбалкана. Априлци е разпръснато планинско градче с широки ливади и гледка към Ботев — добър баланс между спокойствие и удобства.',
      en: 'Sevlievo is a small town with a hospital, a market and working industry; around it lie the villages towards the Alexander Stamboliyski reservoir and the Balkan foothills. Apriltsi is a scattered mountain town with wide meadows and a view of Botev peak — a good balance of calm and amenities.',
    },
    facts: { bg: ['Болница и пазар в Севлиево', 'Язовир Ал. Стамболийски', 'Централен Балкан на 20 мин'], en: ['Hospital and market in Sevlievo', 'Alexander Stamboliyski reservoir', 'Central Balkan park in 20 min'] },
  },
  lovech: {
    name: { bg: 'Ловеч и Троян', en: 'Lovech and Troyan' },
    tagline: { bg: 'Покритият мост, манастирът, занаятите', en: 'The covered bridge, the monastery, the crafts' },
    guide: {
      bg: 'Ловеч е областен град с болница и Покрития мост над Осъм. Троян е известен с манастира, керамиката и пътя през Беклемето към Южна България. Селата по Осъма са тихи, с целогодишен достъп по асфалт.',
      en: 'Lovech is the provincial capital with a hospital and the covered bridge over the Osam. Troyan is known for its monastery, pottery and the Beklemeto pass road to southern Bulgaria. The villages along the Osam are quiet, with paved year-round access.',
    },
    facts: { bg: ['Троянски манастир', 'Ски: Беклемето', 'Автомагистрала Хемус наблизо'], en: ['Troyan Monastery', 'Skiing: Beklemeto', 'Hemus motorway nearby'] },
  },
  teteven: {
    name: { bg: 'Тетевен и Рибарица', en: 'Teteven and Ribaritsa' },
    tagline: { bg: 'Река, скали и тишина', en: 'A river, cliffs and silence' },
    guide: {
      bg: 'Долината на Бели Вит: къщи край реката, скални стени над града. Рибарица е курортно село с хотели и ресторанти, но встрани от главния път е много тихо. Най-близкият до София планински район.',
      en: 'The Beli Vit valley: houses by the river, rock walls above the town. Ribaritsa is a resort village with hotels and restaurants, yet very quiet off the main road. The mountain area closest to Sofia.',
    },
    facts: { bg: ['Около 2 ч от София', 'Гложенски манастир', 'Река и водопади'], en: ['About 2h from Sofia', 'Glozhene Monastery', 'River and waterfalls'] },
  },
  other: {
    name: { bg: 'Другаде в България', en: 'Elsewhere in Bulgaria' },
    tagline: { bg: 'Имоти извън Централния Балкан', en: 'Properties beyond the Central Balkan' },
    guide: {
      bg: 'Никола помага на купувачи и извън своя район — от Дунавската равнина до Южна България. Всеки имот тук е видян лично или проверен с колега от съответния офис на PROPERTY.BG.',
      en: 'Nikola also helps buyers outside his home area — from the Danube plain to southern Bulgaria. Every property here has been seen in person or checked with a colleague from the local PROPERTY.BG office.',
    },
    facts: { bg: ['Мрежа от офиси в цялата страна', 'Огледи по договорка', 'Съдействие до нотариуса'], en: ['Offices across the country', 'Viewings by arrangement', 'Support through the notary'] },
  },
};

/* ───────────── property type translation ───────────── */

const TYPE_EN = {
  'къща': 'House', 'къщи': 'Houses', 'вила': 'Villa', 'бунгало': 'Bungalow', 'планинска къща': 'Mountain house', 'едноетажна къща': 'Single-storey house',
  'къща-близнак': 'Semi-detached house', 'редова къща': 'Terraced house', 'етаж от къща': 'Floor of a house', 'имение': 'Estate',
  'парцел в регулация': 'Regulated plot', 'парцел': 'Plot', 'парцел за инвестиция': 'Investment plot', 'промишлен парцел': 'Industrial plot', 'парцел с проект': 'Plot with project',
  'земеделска земя': 'Agricultural land', 'земя': 'Land', 'гора': 'Forest', 'лозе': 'Vineyard',
  'склад': 'Warehouse', 'магазин': 'Shop', 'офис': 'Office', 'хотел': 'Hotel', 'ресторант': 'Restaurant', 'бизнес': 'Business', 'къща за гости': 'Guest house',
  'производствена сграда': 'Industrial building', 'промишлена сграда': 'Industrial building', 'цех': 'Workshop', 'ферма': 'Farm', 'сграда': 'Building', 'селскостопанска постройка': 'Farm building',
  'апартамент': 'Apartment', 'едностаен апартамент': 'Studio apartment', 'двустаен апартамент': 'One-bedroom apartment', 'тристаен апартамент': 'Two-bedroom apartment', 'четиристаен апартамент': 'Three-bedroom apartment', 'многостаен апартамент': 'Large apartment', 'мезонет': 'Maisonette', 'пентхаус': 'Penthouse',
  'гараж': 'Garage', 'паркомясто': 'Parking space', 'друг имот': 'Other property', 'мазе': 'Basement',
};

export function typeLabel(type, lang) {
  if (!type) return '';
  if (lang !== 'en') return type;
  const k = type.trim().toLowerCase();
  if (TYPE_EN[k]) return TYPE_EN[k];
  for (const key of Object.keys(TYPE_EN)) if (k.includes(key)) return TYPE_EN[key];
  return transliterate(type);
}

/* ───────────── category buckets used for filters & the concierge ───────────── */

export const CATEGORIES = [
  { key: 'houses', label: 'catHouses', test: (l) => /къщ|вил|бунгал|имени|резиден/i.test(l.type) && !l.rent },
  { key: 'plots', label: 'catPlots', test: (l) => /парцел|упи/i.test(l.type) },
  { key: 'land', label: 'catLand', test: (l) => /зем|гор|лоз/i.test(l.type) && !/парцел/i.test(l.type) },
  { key: 'business', label: 'catBusiness', test: (l) => /склад|магазин|офис|хотел|ресторант|бизнес|цех|сград|ферм|производ|промиш|гости/i.test(l.type) },
  { key: 'apartments', label: 'catApartments', test: (l) => /апартамент|мезонет|пентхаус|студио/i.test(l.type) },
  { key: 'rent', label: 'catRent', test: (l) => l.rent },
  { key: 'reduced', label: 'catReduced', test: (l) => l.reduced },
];

/* ───────────── transliteration (Bulgarian official-ish) ───────────── */

const CYR = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ж: 'zh', з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p',
  р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sht', ъ: 'a', ь: 'y', ю: 'yu', я: 'ya',
};

export function transliterate(str) {
  if (!str) return '';
  return String(str).replace(/[А-Яа-яЁё]/g, (ch) => {
    const lower = ch.toLowerCase();
    const out = CYR[lower] ?? ch;
    return ch === lower ? out : out.charAt(0).toUpperCase() + out.slice(1);
  });
}

/** "близо до гр. Севлиево" → "near Sevlievo" ; "гр. Габрово / кв. Център" → "Gabrovo, Tsentar district" */
export function placeLabel(place, lang) {
  if (!place) return '';
  if (lang !== 'en') return place;
  let p = place;
  let prefix = '';
  if (/^близо до/i.test(p)) { prefix = 'near '; p = p.replace(/^близо до\s*/i, ''); }
  p = p.replace(/^гр\.\s*/i, '').replace(/^с\.\s*/i, 'village of ').replace(/^к\.к\.\s*/i, 'resort ');
  p = p.replace(/\s*\/\s*кв\.\s*/i, ', ').replace(/\s*\/\s*/g, ', ');
  const t = transliterate(p);
  return prefix + (p.includes(', ') ? t.replace(/, (.*)$/, ', $1 district') : t);
}

export function regionLabel(region, lang) {
  if (!region) return '';
  if (lang !== 'en') return region;
  return transliterate(region.replace(/\s*област$/i, '')) + ' province';
}

/* ───────────── formatting ───────────── */

export function fmtNumber(n) {
  if (n == null || !Number.isFinite(Number(n))) return '';
  const s = Math.round(Number(n)).toString();
  return s.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export function fmtPrice(l, lang) {
  if (l.price == null) return lang === 'en' ? 'Price on request' : 'Цена при запитване';
  const base = `€${fmtNumber(l.price)}`;
  if (l.rent) return lang === 'en' ? `${base}/month` : `${base}/мес.`;
  return base;
}

export function fmtArea(n, lang) {
  return n == null ? '—' : `${fmtNumber(n)} ${lang === 'en' ? 'm²' : 'м²'}`;
}

export function fmtDate(iso, lang) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const dd = String(d.getUTCDate()).padStart(2, '0');
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
  const yy = d.getUTCFullYear();
  return lang === 'en' ? `${yy}-${mm}-${dd}` : `${dd}.${mm}.${yy}`;
}

export function slugify(str) {
  return transliterate(str || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

/* ───────────── URL helpers ───────────── */

export function href(lang, path = '/') {
  const p = path.startsWith('/') ? path : `/${path}`;
  return lang === 'en' ? (p === '/' ? '/en' : `/en${p}`) : p;
}

export function altHref(lang, path) {
  return href(lang === 'en' ? 'bg' : 'en', path);
}

export function listingPath(l) {
  return `/imot/${l.id}/${l.slug || slugify(l.title)}`;
}

export function listingHref(l, lang) {
  return href(lang, listingPath(l));
}

export function imgUrl(file, size = 'medium') {
  return `/img/${size}/${encodeURIComponent(file)}`;
}

export function waLink(text) {
  return `https://wa.me/${AGENT.whatsappDigits}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
}

export function viberLink() {
  return `viber://chat?number=%2B${AGENT.whatsappDigits}`;
}

export function telHref(num) {
  return `tel:${num.replace(/[^\d+]/g, '')}`;
}

/** Short "140 м² · двор 1 850 м² · 3 спални" line for cards. */
export function metaBits(l, lang) {
  const meta = [];
  if (l.area != null) meta.push(fmtArea(l.area, lang));
  if (l.plotArea != null) meta.push(`${lang === 'en' ? 'plot' : 'двор'} ${fmtArea(l.plotArea, lang)}`);
  if (l.bedrooms != null) meta.push(`${l.bedrooms} ${lang === 'en' ? (l.bedrooms === 1 ? 'bedroom' : 'bedrooms') : (l.bedrooms === 1 ? 'спалня' : 'спални')}`);
  if (!meta.length && l.pricePerSqm != null) meta.push(`€${l.pricePerSqm}/m²`);
  return meta;
}

/** Tag chips shown on cards ("За ремонт" etc. are not in the source data, so we derive from what is). */
export function listingTags(l, lang) {
  const t = T[lang];
  const tags = [typeLabel(l.type, lang)];
  if (l.rent) tags.push(t.statusRent);
  if (l.discount) tags.push(`-${l.discount}%`);
  else if (l.reduced) tags.push(t.reducedBadge);
  if (l.akt16) tags.push(t.akt16);
  return tags;
}

export function initials(name, lang) {
  const n = (name || '').trim();
  if (!n) return lang === 'en' ? 'C' : 'К';
  return n.split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
}
