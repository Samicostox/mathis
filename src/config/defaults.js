// Full default site configuration.
// This is the single source of truth used as a fallback whenever the
// database is empty/unreachable, and as the starting point in the admin.
// Everything here is editable from /admin once the backend is live.

export const DEFAULT_CONFIG = {
  hero: {
    image: '/780425_8.jpg',
    imagePosition: 'center 20%',
    firstName: 'Mathis',
    lastName: 'Charbonnier',
    announcements: [
      'Nouveau spectacle — Tournée 2026',
      '40 dates entre mai et novembre',
      'Paris complet — nouvelles dates ajoutées',
    ],
    ctaPrimary: { label: 'Les prochaines dates', href: '#dates' },
    ctaSecondary: { label: 'Mes vidéos', href: '#videos' },
  },

  ticker: [
    { text: '★ Paris · Lyon · Bordeaux · Toulouse · Marseille · Nantes · Lille · Strasbourg · Bruxelles · Genève · Montréal ★', accent: false },
    { text: 'Tournée 2026 — en cours', accent: true },
  ],

  dates: [
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
  ],

  show: {
    title: 'Le Spectacle',
    subtitle: 'Premier seul-en-scène',
    description:
      "Un texte écrit sur trois ans. Une heure sans filet sur ce qui nous arrive — à nous, maintenant. Pas de morale, pas de leçon. Juste une salle dans le noir et quelqu'un qui essaie de faire rire avec ce qui fait mal.",
    cta: 'Réserver',
    ctaUrl: '#dates',
    image: null,
  },

  videos: [
    { title: 'Entre Deux — Épisode 04',    duration: '8:42', views: '1,2M', tag: 'Podcast',   format: 'youtube',   url: null, poster: null },
    { title: 'Best of scène — Le Rép.',    duration: '3:15', views: '840k', tag: 'Scène',     format: 'youtube',   url: null, poster: null },
    { title: 'Les boomers au supermarché', duration: '2:08', views: '2,4M', tag: 'Extrait',   format: 'short',     url: null, poster: null },
    { title: 'Making-of — Tournée 2026',   duration: '4:51', views: '320k', tag: 'Coulisses', format: 'instagram', url: null, poster: null },
  ],

  socials: [
    { name: 'Instagram', handle: '@mathis.chrb',      url: '#', icon: 'instagram' },
    { name: 'TikTok',    handle: '@mathischarbonnier', url: '#', icon: 'tiktok' },
    { name: 'YouTube',   handle: 'Mathis Charbonnier', url: '#', icon: 'youtube' },
    { name: 'X',         handle: '@mathischrb',        url: '#', icon: 'x' },
  ],

  newsletter: {
    kicker: 'Je te contacte uniquement quand il y a du neuf !',
  },

  press: [
    { media: 'Télérama',       quote: "Une nouvelle voix qui cogne juste, sans tape-à-l'œil." },
    { media: 'Le Monde',       quote: 'Charbonnier impose un style : sec, précis, redoutablement drôle.' },
    { media: 'France Inter',   quote: 'La relève du stand-up français a trouvé son nom.' },
    { media: 'Inrockuptibles', quote: null },
    { media: 'Konbini',        quote: null },
    { media: 'Radio Nova',     quote: null },
  ],

  bio: {
    paragraphs: [
      "J'ai commencé le stand-up et la vidéo en 2023. Trois ans plus tard, vous êtes de plus en plus à me suivre sur scène et à regarder ce que je fais en ligne.",
      'Assez pour que je puisse quitter mon travail et devenir humoriste à temps plein. Sincèrement, merci.',
      "Je travaille sur un premier spectacle. Il n'a pas d'autre prétention que de faire rire — mais j'espère que vous y trouverez un peu plus.",
    ],
  },

  // Gallery: list of image URLs. When empty, the site shows `count` placeholders.
  gallery: {
    count: 8,
    images: [],
  },

  contacts: {
    booking: [
      { name: 'Yoann de Birague', role: 'Booking — agent principal', email: 'yoann@debirague-associes.fr' },
      { name: 'Claire Mercier',   role: 'Booking — assistante',      email: 'claire@debirague-associes.fr' },
    ],
    press: [
      { name: 'Sandra Vidal', role: 'Attachée de presse', email: 'presse@mathischarbonnier.com' },
    ],
  },
}

// Shallow merge per top-level section so a partial saved config still
// inherits any newly-added default sections.
export function mergeConfig(saved) {
  if (!saved || typeof saved !== 'object') return DEFAULT_CONFIG
  const out = { ...DEFAULT_CONFIG }
  for (const key of Object.keys(DEFAULT_CONFIG)) {
    if (saved[key] === undefined || saved[key] === null) continue
    if (Array.isArray(DEFAULT_CONFIG[key])) {
      out[key] = Array.isArray(saved[key]) ? saved[key] : DEFAULT_CONFIG[key]
    } else if (typeof DEFAULT_CONFIG[key] === 'object') {
      out[key] = { ...DEFAULT_CONFIG[key], ...saved[key] }
    } else {
      out[key] = saved[key]
    }
  }
  return out
}
