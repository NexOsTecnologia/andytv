import { Channel } from '../types';

// Canales personalizados (verificados manualmente)
export const CUSTOM_CHANNELS: Channel[] = [
  // 🇦🇷 Argentina
  { id: 'cn247tv', name: '24/7 Canal de Noticias', group: '🇦🇷 Argentina', url: 'https://panel.host-live.com:19360/cn247tv/cn247tv.m3u8', type: 'hls' },
  { id: 'a24', name: 'A24 (720p)', group: '🇦🇷 Argentina', url: 'https://g5.vxral-slo.transport.edge-access.net/a12/ngrp:a24-100056_all/playlist.m3u8?sense=true', type: 'hls' },
  { id: 'americatv', name: 'America TV (720p)', group: '🇦🇷 Argentina', url: 'https://prepublish.f.qaotic.net/a07/americahls-100056/playlist_720p.m3u8', type: 'hls' },
  { id: 'argentinisima', name: 'Argentinísima Satelital (540p)', group: '🇦🇷 Argentina', url: 'https://stream1.sersat.com/hls/argentinisima.m3u8', type: 'hls' },
  { id: 'atvargentina', name: 'ATV Argentina', group: '🇦🇷 Argentina', url: 'https://tv.streaming.com.bo/atvargentina/index.m3u8', type: 'hls' },
  { id: 'bayrestv', name: 'Bayres TV (720p)', group: '🇦🇷 Argentina', url: 'https://streaming01.mikrolive.tv/bayrestv/live/playlist.m3u8', type: 'hls' },
  { id: 'canal26_hd', name: 'Canal 26 (1080p)', group: '🇦🇷 Argentina', url: 'https://stream-gtlc.telecentro.net.ar/hls/canal26hls/main.m3u8', type: 'hls' },
  { id: 'canal26', name: 'Canal 26', group: '🇦🇷 Argentina', url: 'https://stream-gtlc.telecentro.net.ar/hls/canal26hls/0/playlist.m3u8', type: 'hls' },
 // { id: 'canal9_elnueve', name: 'Canal 9 (El Nueve) - En Vivo', group: '🇦🇷 Argentina', url: 'https://www.youtube.com/live/V6RlyFXQu6I', type: 'youtube' },
  { id: 'ciudadmagazine', name: 'Ciudad Magazine (1080p) [Geo-blocked]', group: '🇦🇷 Argentina', url: 'https://live-01-07-ciudad.vodgc.net/live-01-07-ciudad.vodgc.net/index.m3u8', type: 'hls' },
  { id: 'eltrece', name: 'El Trece (1080p)', group: '🇦🇷 Argentina', url: 'https://live-01-02-eltrece.vodgc.net/eltrecetv/index.m3u8', type: 'hls' },
  { id: 'eltrece_alt', name: 'El Trece (1080p) [Referrer]', group: '🇦🇷 Argentina', url: 'https://livetrx01.vodgc.net/eltrecetv/index.m3u8', type: 'hls' },
  { id: 'garagetv', name: 'Garage TV Latin America', group: '🇦🇷 Argentina', url: 'https://stream1.sersat.com/hls/garagetv.m3u8', type: 'hls' },
  { id: 'magickids', name: 'Magic Kids (486p)', group: '🇦🇷 Argentina', url: 'https://magicstream.ddns.net/magicstream/stream.m3u8', type: 'hls' },
  { id: 'metrotv', name: 'Metro TV (720p)', group: '🇦🇷 Argentina', url: 'https://streamtv12.ddns.net:5443/LiveApp/streams/193945633734205616732920.m3u8', type: 'hls' },
  { id: 'nettv_us', name: 'NET TV (720p)', group: '🇦🇷 Argentina', url: 'https://unlimited1-us.dps.live/nettv/nettv.smil/playlist.m3u8', type: 'hls' },
  { id: 'nettv_cl', name: 'NET TV (720p) CL', group: '🇦🇷 Argentina', url: 'https://unlimited6-cl.dps.live/nettv/nettv.smil/playlist.m3u8', type: 'hls' },
  { id: 'rtn', name: 'RTN (Neuquén) (720p) [Not 24/7]', group: '🇦🇷 Argentina', url: 'https://media.neuquen.gov.ar/rtn/television/media.m3u8', type: 'hls' },
  { id: 'telefe_geoblocked', name: 'Telefe (720p) [Geo-blocked]', group: '🇦🇷 Argentina', url: 'https://telefe.com/Api/Videos/GetSourceUrl/694564/0/HLS?.m3u8', type: 'hls' },
  { id: 'telefe', name: 'Telefe (720p)', group: '🇦🇷 Argentina', url: 'http://190.104.226.30/Live/870787012c00961adaf9b2304d704b57/telefe_720.m3u8', type: 'hls' },
  { id: 'telefe_internacional', name: 'Telefe Internacional (1080p)', group: '🇦🇷 Argentina', url: 'http://187.190.55.136:5501/udp/225.1.1.240:5240', type: 'udp' },
  { id: 'telemax', name: 'Telemax', group: '🇦🇷 Argentina', url: 'https://stream-gtlc.telecentro.net.ar/hls/telemaxhls/main.m3u8', type: 'hls' },
  { id: 'tn', name: 'TN', group: '🇦🇷 Argentina', url: 'http://190.104.226.30/Live/870787012c00961adaf9b2304d704b57/tn_720.m3u8', type: 'hls' },
  { id: 'tvpublica', name: 'TV Publica (576p)', group: '🇦🇷 Argentina', url: 'https://ola1.com.ar/tvp/index.m3u8', type: 'hls' },
//  { id: 'tycsports', name: 'TyC Sports (1080p) [Geo-blocked]', group: '🇦🇷 Argentina', url: 'https://live-04-11-tyc24.vodgc.net/tyc24/index_tyc24_1080.m3u8', type: 'hls' },
  { id: 'tycsports_libre', name: 'TyC Sports Libre', group: '🇦🇷 Argentina', url: 'https://la14hd.com/vivo/canal.php?stream=tycsports', type: 'webpage' },


  
  // 🌎 Internacionales
  { id: 'spacetv_az', name: 'Space TV', group: '🌎 Internacionales', url: 'https://raw.githubusercontent.com/UzunMuhalefet/streams/main/myvideo-az/space-tv.m3u8', type: 'hls' },
  { id: 'gousatv', name: 'Go USA TV (720p)', group: '🌎 Internacionales', url: 'https://brandusa-gousa-1-be.samsung.wurl.tv/playlist.m3u8', type: 'hls' },
  { id: 'justforlaughs_us', name: 'Just For Laughs Gags (720p)', group: '🌎 Internacionales', url: 'https://distributionsjustepourrire-justforlaughsgags-1-be.samsung.wurl.tv/playlist.m3u8', type: 'hls' },
  { id: 'mojitv', name: 'Mojitv', group: '🌎 Internacionales', url: 'https://odmedia-mojitv-1-be.samsung.wurl.tv/playlist.m3u8', type: 'hls' },
  { id: 'strongman', name: 'Strongman Champions League (720p)', group: '🌎 Internacionales', url: 'https://rightsboosterltd-scl-1-be.samsung.wurl.tv/playlist.m3u8', type: 'hls' },
  { id: 'plextv', name: 'PLEX TV', group: '🌎 Internacionales', url: 'http://connectiktv.ddns.net:5000/plextv/@plextv/playlist.m3u8', type: 'hls' },
  { id: 'comedycentral_de', name: 'Comedy Central HD (1080p) [Geo-Blocked]', group: '🌎 Internacionales', url: 'https://viamotionhsi.netplus.ch/live/eds/comedycentral/browser-HLS8/comedycentral.m3u8', type: 'hls' },
  { id: 'paramountchannel', name: 'Paramount Channel (1080p) [Geo-Blocked]', group: '🌎 Internacionales', url: 'https://viamotionhsi.netplus.ch/live/eds/paramount/browser-HLS8/paramount.m3u8', type: 'hls' },
  
  // 📺 Pluto TV Canales Destacados
  { id: 'cbsnews247', name: 'CBS News 24/7 (720p)', group: '📺 Pluto TV', url: 'https://jmp2.uk/plu-6350fdd266e9ea0007bedec5.m3u8', type: 'hls' },
  { id: 'southpark', name: 'South Park', group: '📺 Pluto TV', url: 'https://jmp2.uk/plu-62bdb1c5e25122000798ac79.m3u8', type: 'hls' },
  { id: 'spongebob', name: 'SpongeBob SquarePants (720p)', group: '📺 Pluto TV', url: 'https://jmp2.uk/plu-63f87d057533d80008ab9549.m3u8', type: 'hls' },
  { id: 'pluto_horror', name: 'Pluto TV Horror', group: '📺 Pluto TV', url: 'https://jmp2.uk/plu-62ea3f8a38acc80007072d26.m3u8', type: 'hls' },
  { id: 'pluto_action', name: 'Pluto TV Action Movies', group: '📺 Pluto TV', url: 'https://jmp2.uk/plu-62ea3c2e4823db00072788ed.m3u8', type: 'hls' },
  { id: 'pluto_comedy', name: 'Pluto TV Comedy', group: '📺 Pluto TV', url: 'https://jmp2.uk/plu-62e92178946c8000079a3160.m3u8', type: 'hls' },
  
  // 🎮 Anime y Niños
  { id: 'xtremacartoons', name: 'Xtrema Cartoons', group: '🎮 Anime y Niños', url: 'https://stmv6.voxtvhd.com.br/xtremacartoons/xtremacartoons/playlist.m3u8', type: 'hls' },
  { id: 'naruto', name: 'Naruto', group: '🎮 Anime y Niños', url: 'https://jmp2.uk/plu-5ee92e72fb286e0007285fec.m3u8', type: 'hls' },
  { id: 'onepiece', name: 'One Piece', group: '🎮 Anime y Niños', url: 'https://jmp2.uk/plu-5ff4b9ccf938f8000779eb99.m3u8', type: 'hls' },
  
  // ⚽ Deportes
  { id: 'fifaplus', name: 'FIFA+ (720p)', group: '⚽ Deportes', url: 'https://jmp2.uk/plu-660c29b5aec9680008f5b4a4.m3u8', type: 'hls' },
  { id: 'ufc', name: 'UFC (720p)', group: '⚽ Deportes', url: 'https://jmp2.uk/plu-66ed3eb27358ce000830df49.m3u8', type: 'hls' },
  { id: 'willowsports', name: 'Willow Sports (720p)', group: '⚽ Deportes', url: 'https://jmp2.uk/plu-6972546cc62833833a187f50.m3u8', type: 'hls' },
  
  // 🎥 Películas y Series Clásicas
  { id: 'xtremacineclasico', name: 'Xtrema Cine Clasico', group: '🎥 Películas', url: 'https://stmv6.voxtvhd.com.br/cineclasico/cineclasico/playlist.m3u8', type: 'hls' },
  { id: 'xtrematerror', name: 'Xtrema Terror', group: '🎥 Películas', url: 'https://stmv6.voxtvhd.com.br/cineterror/cineterror/playlist.m3u8', type: 'hls' },

  // ========== 🆕 NUEVOS CANALES EN ESPAÑOL ==========

  // DKISS - Series bajo demanda
  {
    id: 'dkiss_catalog',
    name: 'DKISS - Series y Programas',
    group: '📺 Series Bajo Demanda',
    url: 'dkiss_catalog',
    type: 'dkiss'
  },

  // 🎬 Alternativas Legales (VOD)
  {
    id: 'tubi_espanol',
    name: 'Tubi TV - Cine y Series Gratis (Español)',
    group: '🎬 Streaming Legal',
    url: 'https://tubitv.com/browse/language/spanish',
    type: 'webpage'
  },
  {
    id: 'vix_espanol',
    name: 'Vix - Contenido Gratis en Español',
    group: '🎬 Streaming Legal',
    url: 'https://vix.com/es-es/video',
    type: 'webpage'
  },
  {
    id: 'canela_tv',
    name: 'Canela TV - Series y Novelas Latinas',
    group: '🎬 Streaming Legal',
    url: 'https://www.canela.tv',
    type: 'webpage'
  },
  {
    id: 'plutotv_espanol',
    name: 'Pluto TV - Canales en Español',
    group: '🎬 Streaming Legal',
    url: 'https://pluto.tv/es/live-tv',
    type: 'webpage'
  },
  {
    id: 'plex_tv_es',
    name: 'Plex - Películas Gratis en Español',
    group: '🎬 Streaming Legal',
    url: 'https://watch.plex.tv/es/live-tv',
    type: 'webpage'
  },

  // 📺 Canales Infantiles Oficiales en YouTube
  {
    id: 'disney_channel_espana',
    name: 'Disney Channel España (En Vivo)',
    group: '🎮 Anime y Niños',
    url: 'https://www.youtube.com/watch?v=DVkIfQwg8f8',
    type: 'youtube'
  },
  {
    id: 'cartoon_network_la',
    name: 'Cartoon Network Latinoamérica',
    group: '🎮 Anime y Niños',
    url: 'https://www.youtube.com/channel/UCQySZQ6rrgJXRuonMwIIGMA/live',
    type: 'youtube'
  },
  {
    id: 'disney_junior_la',
    name: 'Disney Junior Latinoamérica',
    group: '🎮 Anime y Niños',
    url: 'https://www.youtube.com/@disneyjuniorla',
    type: 'youtube'
  },
  {
    id: 'discovery_kids_la',
    name: 'Discovery Kids Latinoamérica',
    group: '🎮 Anime y Niños',
    url: 'https://www.youtube.com/@DiscoveryKidsLA',
    type: 'youtube'
  },
  {
    id: 'nick_jr_la',
    name: 'Nick Jr. Latinoamérica',
    group: '🎮 Anime y Niños',
    url: 'https://www.youtube.com/@nickjrla',
    type: 'youtube'
  },
  // En customChannels.ts, agregar:
  {
    id: 'ley_y_orden_27',
    name: '📺 La Ley y el Orden: UVE (Temp 27)',
    group: '📺 Series Bajo Demanda',
    url: '/leyorden27.m3u8',  // 👈 Ruta relativa desde public/
    type: 'hls'
  }
];  

// Listas M3U alternativas completas
export const CUSTOM_M3U_SOURCES = [
  { name: '📺 Canales de Latinoamérica (IPTV-Org)', url: 'https://iptv-org.github.io/iptv/countries/latin_america.m3u', enabled: true },
  { name: '⚽ Deportes Global (IPTV-Org)', url: 'https://iptv-org.github.io/iptv/categories/sports.m3u', enabled: true },
  { name: '🎬 Películas (IPTV-Org)', url: 'https://iptv-org.github.io/iptv/categories/movies.m3u', enabled: true },
  { name: 'Mi Lista Argentina', url: 'https://mis-listas.com/argentina.m3u', enabled: true },
  { name: 'Backup Deportes', url: 'https://backup.com/deportes.m3u', enabled: true }
];