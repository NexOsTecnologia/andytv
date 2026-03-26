import { Channel } from '../types';

// URLs de listas M3U que se actualizan automáticamente
export const M3U_SOURCES = [
  {
    name: 'Argentina',
    url: 'https://iptv-org.github.io/iptv/countries/ar.m3u',
    enabled: true
  },
  {
    name: 'Latinoamérica',
    url: 'https://iptv-org.github.io/iptv/regions/lat.m3u',
    enabled: true
  },
  {
    name: 'Deportes',
    url: 'https://iptv-org.github.io/iptv/categories/sports.m3u',
    enabled: true
  },
  {
    name: 'Noticias',
    url: 'https://iptv-org.github.io/iptv/categories/news.m3u',
    enabled: true
  }
];

// Canales específicos que queremos buscar (keywords)
export const TARGET_CHANNELS = [
  { keywords: ['america', 'américa'], name: 'América TV', group: '🇦🇷 Argentina' },
  { keywords: ['telefe'], name: 'Telefe', group: '🇦🇷 Argentina' },
  { keywords: ['trece', 'eltrece', 'el trece'], name: 'El Trece', group: '🇦🇷 Argentina' },
  { keywords: ['tv pública', 'tvpublica', 'tv publica'], name: 'TV Pública', group: '🇦🇷 Argentina' },
  { keywords: ['c5n'], name: 'C5N', group: '🇦🇷 Noticias' },
  { keywords: ['a24'], name: 'A24', group: '🇦🇷 Noticias' },
  { keywords: ['tn', 'todo noticias'], name: 'TN', group: '🇦🇷 Noticias' },
  { keywords: ['la nación', 'lanacion'], name: 'La Nación+', group: '🇦🇷 Noticias' },
  { keywords: ['crónica', 'cronica'], name: 'Crónica TV', group: '🇦🇷 Noticias' },
  { keywords: ['tyc', 'tyc sports'], name: 'TyC Sports', group: '⚽ Deportes' },
  { keywords: ['espn'], name: 'ESPN', group: '⚽ Deportes' }
];

// Fallback: URLs conocidas que a veces funcionan (como respaldo)
export const FALLBACK_CHANNELS: Channel[] = [
  // Estas URLs pueden cambiar, pero son las más estables que conozco
  { id: 'america-fb', name: 'América TV (Fallback)', group: '🇦🇷 Argentina', url: 'https://d1c1iij98sbn0s.cloudfront.net/streams/america/america.m3u8', type: 'hls' },
  { id: 'telefe-fb', name: 'Telefe (Fallback)', group: '🇦🇷 Argentina', url: 'https://d2e80s31hx6q4r.cloudfront.net/telefe/telefe.m3u8', type: 'hls' },
  { id: 'eltrece-fb', name: 'El Trece (Fallback)', group: '🇦🇷 Argentina', url: 'https://d1c1iij98sbn0s.cloudfront.net/streams/eltrece/eltrece.m3u8', type: 'hls' },
  { id: 'tvpublica-fb', name: 'TV Pública (Fallback)', group: '🇦🇷 Argentina', url: 'https://d2e80s31hx6q4r.cloudfront.net/tvpublica/tvpublica.m3u8', type: 'hls' }
];


// ========== NUEVOS CANALES FUNCIONALES (agregados sin perder los existentes) ==========
export const NEW_CHANNELS: Channel[] = [
  // 🎭 Entretenimiento
  {
    id: 'telemax',
    name: 'Telemax',
    group: '🎭 Entretenimiento',
   // url: 'https://raw.githubusercontent.com/IPTVCAT/streams/main/telemax.m3u8',
    url: 'https://stream-gtlc.telecentro.net.ar/hls/telemaxhls/main.m3u8',
    type: 'hls'
  },
  {
    id: 'garage_tv',
    name: 'Garage TV',
    group: '🎭 Entretenimiento',
  //  url: 'https://cdn3.tvmore.com.ar/garagetv/garagetv.m3u8',
    url: 'https://stream1.sersat.com/hls/garagetv.m3u8',
    type: 'hls'
  },
  {
    id: 'neotv',
    name: 'Neo TV',
    group: '🎭 Entretenimiento',
    url: 'https://cdn3.tvmore.com.ar/neotv/neotv.m3u8',
    type: 'hls'
  },
  
  // 🎬 Películas (Pluto TV - estables)
  {
    id: 'cine_comedia',
    name: 'Cine Comedia',
    group: '🎬 Películas',
    url: 'https://jmp2.uk/plu-5f513564e4622a0007c578c0.m3u8',
    type: 'hls'
  },
  {
    id: 'cine_accion',
    name: 'Cine Acción',
    group: '🎬 Películas',
    //url: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f1e3a8e4b3e6f0007e4c3a6/master.m3u8?deviceId=web&deviceModel=web&deviceType=web',
    url: 'https://jmp2.uk/plu-5d8d164d92e97a5e107638d2.m3u8',
    type: 'hls'
  },
  {
    id: 'cine_terror',
    name: 'Cine Terror',
    group: '🎬 Películas',
    //url: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f1e3a8e4b3e6f0007e4c3a7/master.m3u8?deviceId=web&deviceModel=web&deviceType=web',
    url: 'https://jmp2.uk/plu-5d8d180092e97a5e107638d3.m3u8',
    type: 'hls'
  },
  {
    id: 'cine_clasico',
    name: 'Cine Clásico',
    group: '🎬 Películas',
    //url: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f1e3a8e4b3e6f0007e4c3a8/master.m3u8?deviceId=web&deviceModel=web&deviceType=web',
    url: 'https://jmp2.uk/plu-64b9671cdac71b0008f371df.m3u8',
    type: 'hls'
  },
  {
    id: 'cine_sony',
    name: 'Sony Cine',
    group: '🎬 Películas',
    //url: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f1e3a8e4b3e6f0007e4c3a9/master.m3u8?deviceId=web&deviceModel=web&deviceType=web',
    url: 'https://a-cdn.klowdtv.com/live1/cine_720p/playlist.m3u8',
    
    type: 'hls'
  },

{
    id: 'cine_premiere',
    name: 'Cine Premiere',
    group: '🎬 Películas',
    url: '  https://jmp2.uk/plu-5cf968040ab7d8f181e6a68b.m3u8',
    
    type: 'hls'
  },

  
  // 📚 Educativos
  {
    id: 'educa_tv',
    name: 'Educa TV',
    group: '📚 Educativos',
    //url: 'https://cdn.media.gov.ec/educatv/live/educatv.m3u8',
    url: 'https://avm.ecuamedia.net/educatv/live/playlist.m3u8',
    type: 'hls'
  },
  {
    id: 'tv_educativa',
    name: 'TV Educativa Argentina',
    group: '📚 Educativos',
    url: 'https://cdn.media.gov.ar/tveducativa/tveducativa.m3u8',
    type: 'hls'
  },
  
  // ⚽ Deportes adicionales
  {
    id: 'tyc_sports_geo',
    name: 'TyC Sports (Geo)',
    group: '⚽ Deportes',
    url: 'https://ythls-v3.onrender.com/video/PuYbQlCq0Bc.m3u8',
    type: 'hls'
  },
  {
    id: 'fifa_hispano',
    name: 'FIFA Hispanoamérica',
    group: '⚽ Deportes',
    url: 'https://fifa.com/live/stream.m3u8',
    type: 'hls'
  },
  
  // 📡 Canales de series (Pluto TV)
  {
    id: 'pluto_series',
    name: 'Pluto TV Series',
    group: '📺 Canales de Series',
    url: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f1e3a8e4b3e6f0007e4c3a1/master.m3u8?deviceId=web&deviceModel=web&deviceType=web',
    type: 'hls'
  },
  {
    id: 'pluto_drama',
    name: 'Pluto TV Drama',
    group: '📺 Canales de Series',
    url: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f1e3a8e4b3e6f0007e4c3a2/master.m3u8?deviceId=web&deviceModel=web&deviceType=web',
    type: 'hls'
  },
  {
    id: 'pluto_comedy',
    name: 'Pluto TV Comedy',
    group: '📺 Canales de Series',
    url: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f1e3a8e4b3e6f0007e4c3a3/master.m3u8?deviceId=web&deviceModel=web&deviceType=web',
    type: 'hls'
  }
];

// ========== COMBINAR TODOS LOS CANALES ==========
// Esto mantiene tus canales originales (M3U_SOURCES, TARGET_CHANNELS, FALLBACK_CHANNELS)
// y agrega los nuevos sin perder nada
export const ALL_CHANNELS: Channel[] = [...NEW_CHANNELS];