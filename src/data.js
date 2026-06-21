export const MC_UPCOMING = [
  { date: '2026-05-14', city: 'Paris',      venue: 'Le République',         status: 'complet', url: '#' },
  { date: '2026-05-15', city: 'Paris',      venue: 'Le République',         status: 'complet', url: '#' },
  { date: '2026-05-16', city: 'Paris',      venue: 'Le République',         status: 'last',    url: '#' },
  { date: '2026-05-22', city: 'Lyon',       venue: 'Espace Gerson',         status: 'new',     url: '#' },
  { date: '2026-05-30', city: 'Bordeaux',   venue: 'Théâtre Fémina',        status: null,      url: '#' },
  { date: '2026-06-05', city: 'Toulouse',   venue: 'Le Bijou',              status: 'last',    url: '#' },
  { date: '2026-06-12', city: 'Marseille',  venue: "L'Art Dû",              status: null,      url: '#' },
  { date: '2026-06-19', city: 'Nantes',     venue: 'Le Théâtre 100 Noms',   status: null,      url: '#' },
  { date: '2026-06-26', city: 'Lille',      venue: 'Le Spotlight',          status: 'new',     url: '#' },
  { date: '2026-07-03', city: 'Strasbourg', venue: "L'Illiade",             status: null,      url: '#' },
  { date: '2026-07-10', city: 'Paris',      venue: 'Théâtre de Dix Heures', status: null,      url: '#' },
  { date: '2026-09-18', city: 'Bruxelles',  venue: 'Kings of Comedy Club',  status: 'new',     url: '#' },
  { date: '2026-10-02', city: 'Genève',     venue: 'Théâtre du Léman',      status: null,      url: '#' },
  { date: '2026-10-15', city: 'Montréal',   venue: 'Le Bordel',             status: 'new',     url: '#' },
]

// Up to 3 announcement lines shown in the hero
export const MC_ANNOUNCEMENTS = [
  'Nouveau spectacle — Tournée 2026',
  '40 dates entre mai et novembre',
  'Paris complet — nouvelles dates ajoutées',
]

// Ticker content — text/accent pairs, editable here
export const MC_TICKER = [
  { text: '★ Paris · Lyon · Bordeaux · Toulouse · Marseille · Nantes · Lille · Strasbourg · Bruxelles · Genève · Montréal ★', accent: false },
  { text: 'Tournée 2026 — en cours', accent: true },
]

export const MC_SOCIAL = [
  { name: 'Instagram', handle: '@mathis.chrb',        url: '#', icon: 'instagram' },
  { name: 'TikTok',    handle: '@mathischarbonnier',   url: '#', icon: 'tiktok' },
  { name: 'YouTube',   handle: 'Mathis Charbonnier',   url: '#', icon: 'youtube' },
  { name: 'X',         handle: '@mathischrb',          url: '#', icon: 'x' },
]

// format: 'youtube' (16:9), 'short' (9:16), 'instagram' (1:1)
// url: real video URL for hover preview (leave null if not yet set)
export const MC_VIDEOS = [
  { title: 'Entre Deux — Épisode 04',    duration: '8:42', views: '1,2M', tag: 'Podcast',   format: 'youtube',   url: null },
  { title: 'Best of scène — Le Rép.',    duration: '3:15', views: '840k', tag: 'Scène',     format: 'youtube',   url: null },
  { title: 'Les boomers au supermarché', duration: '2:08', views: '2,4M', tag: 'Extrait',   format: 'short',     url: null },
  { title: 'Making-of — Tournée 2026',   duration: '4:51', views: '320k', tag: 'Coulisses', format: 'instagram', url: null },
]

export const MC_PRESS = [
  { media: 'Télérama',       quote: "Une nouvelle voix qui cogne juste, sans tape-à-l'œil." },
  { media: 'Le Monde',       quote: 'Charbonnier impose un style : sec, précis, redoutablement drôle.' },
  { media: 'France Inter',   quote: "La relève du stand-up français a trouvé son nom." },
  { media: 'Inrockuptibles', quote: null },
  { media: 'Konbini',        quote: null },
  { media: 'Radio Nova',     quote: null },
]

export const MC_CONTACTS = {
  booking: [
    { name: 'Yoann de Birague', role: 'Booking — agent principal', email: 'yoann@debirague-associes.fr' },
    { name: 'Claire Mercier',   role: 'Booking — assistante',      email: 'claire@debirague-associes.fr' },
  ],
  press: [
    { name: 'Sandra Vidal', role: 'Attachée de presse', email: 'presse@mathischarbonnier.com' },
  ],
}

export const MC_GALLERY_COUNT = 8

// French postal code → city lookup (top ~60 cities)
export const MC_POSTAL_CITIES = {
  '75001': 'Paris', '75002': 'Paris', '75003': 'Paris', '75004': 'Paris',
  '75005': 'Paris', '75006': 'Paris', '75007': 'Paris', '75008': 'Paris',
  '75009': 'Paris', '75010': 'Paris', '75011': 'Paris', '75012': 'Paris',
  '75013': 'Paris', '75014': 'Paris', '75015': 'Paris', '75016': 'Paris',
  '75017': 'Paris', '75018': 'Paris', '75019': 'Paris', '75020': 'Paris',
  '69001': 'Lyon',       '69002': 'Lyon',       '69003': 'Lyon',       '69006': 'Lyon',
  '13001': 'Marseille',  '13002': 'Marseille',  '13008': 'Marseille',
  '31000': 'Toulouse',   '31100': 'Toulouse',   '31200': 'Toulouse',   '31300': 'Toulouse',
  '33000': 'Bordeaux',   '33100': 'Bordeaux',   '33200': 'Bordeaux',   '33300': 'Bordeaux',
  '59000': 'Lille',      '59100': 'Roubaix',    '59200': 'Tourcoing',  '59300': 'Valenciennes',
  '67000': 'Strasbourg', '67100': 'Strasbourg', '67200': 'Strasbourg',
  '44000': 'Nantes',     '44100': 'Nantes',     '44200': 'Nantes',     '44300': 'Nantes',
  '06000': 'Nice',       '06100': 'Nice',       '06200': 'Nice',
  '35000': 'Rennes',     '35200': 'Rennes',     '35700': 'Rennes',
  '76000': 'Rouen',      '76100': 'Rouen',
  '34000': 'Montpellier','34080': 'Montpellier',
  '57000': 'Metz',       '54000': 'Nancy',
  '63000': 'Clermont-Ferrand', '63100': 'Clermont-Ferrand',
  '38000': 'Grenoble',   '38100': 'Grenoble',
  '21000': 'Dijon',      '51100': 'Reims',
  '29000': 'Quimper',    '29200': 'Brest',
  '37000': 'Tours',      '45000': 'Orléans',
  '87000': 'Limoges',    '86000': 'Poitiers',
  '42000': 'Saint-Étienne', '01000': 'Bourg-en-Bresse',
  '74000': 'Annecy',     '73000': 'Chambéry',
  '64000': 'Pau',        '64100': 'Bayonne',
  '40000': 'Mont-de-Marsan', '47000': 'Agen',
  '66000': 'Perpignan',  '11000': 'Carcassonne',
  '30000': 'Nîmes',      '84000': 'Avignon',
  '83000': 'Toulon',     '13100': 'Aix-en-Provence',
}
