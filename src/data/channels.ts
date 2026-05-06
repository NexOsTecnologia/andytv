import { Channel } from '../types';
import { CUSTOM_CHANNELS } from './customChannels';


// ========== CANALES DE ARGENTINA (VERIFICADOS) ========== se agrego inyeccion de embebed para c5n
export const ARGENTINA_CHANNELS: Channel[] = [
  {
    id: '247_canal_noticias',
    name: '24/7 Canal de Noticias',
    group: '🇦🇷 Argentina',
    url: 'https://panel.host-live.com:19360/cn247tv/cn247tv.m3u8',
    type: 'hls'
  },
  {
    id: 'a24',
    name: 'A24',
    group: '🇦🇷 Argentina',
    url: 'https://g5.vxral-slo.transport.edge-access.net/a12/ngrp:a24-100056_all/playlist.m3u8?sense=true',
    type: 'hls'
  },
  {
    id: 'america_tv',
    name: 'América TV',
    group: '🇦🇷 Argentina',
    url: 'https://prepublish.f.qaotic.net/a07/americahls-100056/playlist_720p.m3u8',
    type: 'hls'
  },
  {
    id: 'argentinisima',
    name: 'Argentinísima Satelital',
    group: '🇦🇷 Argentina',
    url: 'https://stream1.sersat.com/hls/argentinisima.m3u8',
    type: 'hls'
  },
  {
    id: 'atv_argentina',
    name: 'ATV Argentina',
    group: '🇦🇷 Argentina',
    url: 'https://tv.streaming.com.bo/atvargentina/index.m3u8',
    type: 'hls'
  },
 {
  id: 'c5n_hls',
  name: 'C5N (Alternativo)',
  group: '🇦🇷 Noticias',
  url: 'https://www.youtube.com/embed/VWhQ6xspnSc?autoplay=1&mute=0&rel=0',
  type: 'iframe'
  // Nota: No necesita autoplay=1 en la URL si lo manejas con playerVars
},
  {
    id: 'canal26_hd',
    name: 'Canal 26 HD',
    group: '🇦🇷 Argentina',
    url: 'https://stream-gtlc.telecentro.net.ar/hls/canal26hls/main.m3u8',
    type: 'hls'
  },
  {
    id: 'canal26',
    name: 'Canal 26',
    group: '🇦🇷 Argentina',
    url: 'https://stream-gtlc.telecentro.net.ar/hls/canal26hls/0/playlist.m3u8',
    type: 'hls'
  },
  {
    id: 'ciudad_magazine',
    name: 'Ciudad Magazine',
    group: '🇦🇷 Argentina',
    url: 'https://live-01-07-ciudad.vodgc.net/live-01-07-ciudad.vodgc.net/index.m3u8',
    type: 'hls'
  },
  {
    id: 'el_trece',
    name: 'El Trece',
    group: '🇦🇷 Argentina',
    url: 'https://live-01-02-eltrece.vodgc.net/eltrecetv/index.m3u8',
    type: 'hls'
  },
  {
    id: 'el_trece_ref',
    name: 'El Trece (Alternativo)',
    group: '🇦🇷 Argentina',
    url: 'https://livetrx01.vodgc.net/eltrecetv/index.m3u8',
    type: 'hls'
  },
  {
    id: 'garage_tv',
    name: 'Garage TV',
    group: '🇦🇷 Argentina',
    url: 'https://stream1.sersat.com/hls/garagetv.m3u8',
    type: 'hls'
  },
  {
    id: 'magic_kids',
    name: 'Magic Kids',
    group: '🇦🇷 Argentina',
    url: 'https://magicstream.ddns.net/magicstream/stream.m3u8',
    type: 'hls'
  },
  {
    id: 'metro_tv',
    name: 'Metro TV',
    group: '🇦🇷 Argentina',
    url: 'https://streamtv12.ddns.net:5443/LiveApp/streams/193945633734205616732920.m3u8',
    type: 'hls'
  },
  {
    id: 'net_tv_us',
    name: 'NET TV US',
    group: '🇦🇷 Argentina',
    url: 'https://unlimited1-us.dps.live/nettv/nettv.smil/playlist.m3u8',
    type: 'hls'
  },
  {
    id: 'net_tv_cl',
    name: 'NET TV CL',
    group: '🇦🇷 Argentina',
    url: 'https://unlimited6-cl.dps.live/nettv/nettv.smil/playlist.m3u8',
    type: 'hls'
  },
  {
    id: 'rtn_neuquen',
    name: 'RTN Neuquén',
    group: '🇦🇷 Argentina',
    url: 'https://media.neuquen.gov.ar/rtn/television/media.m3u8',
    type: 'hls'
  },
  {
    id: 'telefe',
    name: 'Telefe',
    group: '🇦🇷 Argentina',
    url: 'http://190.104.226.30/Live/870787012c00961adaf9b2304d704b57/telefe_720.m3u8',
    type: 'hls'
  },
  {
    id: 'telemax',
    name: 'Telemax',
    group: '🇦🇷 Argentina',
    url: 'https://stream-gtlc.telecentro.net.ar/hls/telemaxhls/main.m3u8',
    type: 'hls'
  },
  {
    id: 'tn',
    name: 'TN',
    group: '🇦🇷 Argentina',
    url: 'http://190.104.226.30/Live/870787012c00961adaf9b2304d704b57/tn_720.m3u8',
    type: 'hls'
  },
  {
    id: 'tv_publica',
    name: 'TV Pública',
    group: '🇦🇷 Argentina',
    url: 'https://ola1.com.ar/tvp/index.m3u8',
    type: 'hls'
  },
  {
    id: 'tyc_sports',
    name: 'TyC Sports',
    group: '⚽ Deportes',
    url: 'https://live-04-11-tyc24.vodgc.net/tyc24/index_tyc24_1080.m3u8',
    type: 'hls'
  },

{
  id: 'canal9_iframe',
  name: 'Canal 9 (El Nueve)',
  group: '🇦🇷 Argentina',
  url: 'https://www.youtube.com/embed/V6RlyFXQu6I?autoplay=1&mute=0&rel=0',
  type: 'iframe'
}

];

// ========== CANALES INTERNACIONALES ==========
export const INTERNATIONAL_CHANNELS: Channel[] = [
  {
    id: 'space_tv',
    name: 'Space TV',
    group: '🌎 Internacionales',
    url: 'https://raw.githubusercontent.com/UzunMuhalefet/streams/main/myvideo-az/space-tv.m3u8',
    type: 'hls'
  },
  {
    id: 'go_usa_tv',
    name: 'Go USA TV',
    group: '🌎 Internacionales',
    url: 'https://brandusa-gousa-1-be.samsung.wurl.tv/playlist.m3u8',
    type: 'hls'
  },
  {
    id: 'just_for_laughs',
    name: 'Just For Laughs Gags',
    group: '🌎 Internacionales',
    url: 'https://distributionsjustepourrire-justforlaughsgags-1-be.samsung.wurl.tv/playlist.m3u8',
    type: 'hls'
  },
  {
    id: 'mojitv',
    name: 'Mojitv',
    group: '🌎 Internacionales',
    url: 'https://odmedia-mojitv-1-be.samsung.wurl.tv/playlist.m3u8',
    type: 'hls'
  },
  {
    id: 'strongman',
    name: 'Strongman Champions League',
    group: '🌎 Internacionales',
    url: 'https://rightsboosterltd-scl-1-be.samsung.wurl.tv/playlist.m3u8',
    type: 'hls'
  },
  {
    id: 'plex_tv',
    name: 'PLEX TV',
    group: '🌎 Internacionales',
    url: 'http://connectiktv.ddns.net:5000/plextv/@plextv/playlist.m3u8',
    type: 'hls'
  }
];




// ========== PLUTO TV CANALES (TODOS LOS QUE FUNCIONAN) ==========
export const PLUTO_CHANNELS: Channel[] = [
  { id: 'pluto_48hours', name: '48 Hours', group: '📺 Pluto TV', url: 'https://jmp2.uk/plu-62e925bc68d18a00077bb990.m3u8', type: 'hls' },
  { id: 'pluto_aftershock', name: 'Aftershock', group: '📺 Pluto TV', url: 'https://jmp2.uk/plu-63e36b374e83e70008987c58.m3u8', type: 'hls' },
  { id: 'pluto_afv', name: "America's Funniest Home Videos", group: '📺 Pluto TV', url: 'https://jmp2.uk/plu-69172f1699758a0f03459c5b.m3u8', type: 'hls' },
  { id: 'pluto_antm', name: "America's Next Top Model", group: '📺 Pluto TV', url: 'https://jmp2.uk/plu-68679fc6bb46d0bdd38ac9a4.m3u8', type: 'hls' },
  { id: 'pluto_arthur', name: 'Arthur', group: '📺 Pluto TV', url: 'https://jmp2.uk/plu-6482f27c17f5e10008c10ff0.m3u8', type: 'hls' },
  { id: 'pluto_awsn', name: 'AWSN', group: '📺 Pluto TV', url: 'https://jmp2.uk/plu-66fd394e9269330008413302.m3u8', type: 'hls' },
  { id: 'pluto_axmen', name: 'Ax Men', group: '📺 Pluto TV', url: 'https://jmp2.uk/plu-6540fe4bbdf3cf0008aa2cdd.m3u8', type: 'hls' },
  { id: 'pluto_barrescue', name: 'Bar Rescue', group: '📺 Pluto TV', url: 'https://jmp2.uk/plu-655f2ee6c0fc88000877d26c.m3u8', type: 'hls' },
  { id: 'pluto_baywatch', name: 'Baywatch', group: '📺 Pluto TV', url: 'https://jmp2.uk/plu-62bdae69a47b6c00076af298.m3u8', type: 'hls' },
  { id: 'pluto_beyond', name: 'Beyond History', group: '📺 Pluto TV', url: 'https://jmp2.uk/plu-62fb9844db5a4a0007ebc2a3.m3u8', type: 'hls' },
  { id: 'pluto_bonanza', name: 'Bonanza', group: '📺 Pluto TV', url: 'https://jmp2.uk/plu-696e647b07ea70192d49f6a5.m3u8', type: 'hls' },
  { id: 'pluto_cbcnews', name: 'CBC News', group: '📺 Pluto TV', url: 'https://jmp2.uk/plu-6536725167bd1a00084481bc.m3u8', type: 'hls' },
  { id: 'pluto_cbsnews', name: 'CBS News 24/7', group: '📺 Pluto TV', url: 'https://jmp2.uk/plu-6350fdd266e9ea0007bedec5.m3u8', type: 'hls' },
  { id: 'pluto_cheaters', name: 'Cheaters', group: '📺 Pluto TV', url: 'https://jmp2.uk/plu-6582f7d612d5ee00089a663d.m3u8', type: 'hls' },
  { id: 'pluto_cheers', name: 'Cheers', group: '📺 Pluto TV', url: 'https://jmp2.uk/plu-62bdb7f0db2eb30007376d4d.m3u8', type: 'hls' },
  { id: 'pluto_comedycentral', name: 'Comedy Central', group: '📺 Pluto TV', url: 'https://jmp2.uk/plu-64f8a408bd341e000818fcda.m3u8', type: 'hls' },
  { id: 'pluto_crime', name: 'Crime & Justice', group: '📺 Pluto TV', url: 'https://jmp2.uk/plu-6601948129adfd0008a1c0ba.m3u8', type: 'hls' },
  { id: 'pluto_csi', name: 'CSI', group: '📺 Pluto TV', url: 'https://jmp2.uk/plu-62e9224f41d5e100076db2b6.m3u8', type: 'hls' },
  { id: 'pluto_declassified', name: 'Declassified', group: '📺 Pluto TV', url: 'https://jmp2.uk/plu-62bdaf9cf1bdc500073a8bcb.m3u8', type: 'hls' },
  { id: 'pluto_dog', name: 'Dog The Bounty Hunter', group: '📺 Pluto TV', url: 'https://jmp2.uk/plu-6540fee72cf13100085d5a18.m3u8', type: 'hls' },
  { id: 'pluto_fifa', name: 'FIFA+', group: '⚽ Deportes', url: 'https://jmp2.uk/plu-660c29b5aec9680008f5b4a4.m3u8', type: 'hls' },
  { id: 'pluto_forensic', name: 'Forensic Files', group: '📺 Pluto TV', url: 'https://jmp2.uk/plu-62e92392a3e6270007f562e8.m3u8', type: 'hls' },
  { id: 'pluto_frasier', name: 'Frasier', group: '📺 Pluto TV', url: 'https://jmp2.uk/plu-62f4f90e39183b000769f12b.m3u8', type: 'hls' },
  { id: 'pluto_gameshow', name: 'Game Show Central', group: '📺 Pluto TV', url: 'https://jmp2.uk/plu-62e90e8cb05d2b0007f10a61.m3u8', type: 'hls' },
  { id: 'pluto_hellskitchen', name: "Gordon Ramsay's Hell's Kitchen", group: '📺 Pluto TV', url: 'https://jmp2.uk/plu-62ea45010d0611000839868c.m3u8', type: 'hls' },
  { id: 'pluto_homeful', name: 'Homeful', group: '📺 Pluto TV', url: 'https://jmp2.uk/plu-62e92967cd663f0007e604fd.m3u8', type: 'hls' },
  { id: 'pluto_ironchef', name: 'Iron Chef', group: '📺 Pluto TV', url: 'https://jmp2.uk/plu-6582f8dadfed030008e5a93d.m3u8', type: 'hls' },
  { id: 'pluto_kingofqueens', name: 'King of Queens', group: '📺 Pluto TV', url: 'https://jmp2.uk/plu-62f4f414c2ba130007f8b24e.m3u8', type: 'hls' },
  { id: 'pluto_missionimpossible', name: 'Mission Impossible', group: '📺 Pluto TV', url: 'https://jmp2.uk/plu-62ea43aa0c43540007f2db96.m3u8', type: 'hls' },
  { id: 'pluto_modernmarvels', name: 'Modern Marvels', group: '📺 Pluto TV', url: 'https://jmp2.uk/plu-6540ff2d770cf1000866b90a.m3u8', type: 'hls' },
  { id: 'pluto_monsterjam', name: 'Monster Jam', group: '⚽ Deportes', url: 'https://jmp2.uk/plu-65bcc9c8d77d450008b34c6b.m3u8', type: 'hls' },
  { id: 'pluto_ncis', name: 'NCIS', group: '📺 Pluto TV', url: 'https://jmp2.uk/plu-62f4f5de1c100100075665ef.m3u8', type: 'hls' },
  { id: 'pluto_nickjr', name: 'Nick Jr.', group: '🎮 Anime y Niños', url: 'https://jmp2.uk/plu-62bdb75c3afd1200079146a6.m3u8', type: 'hls' },
  { id: 'pluto_pokemon', name: 'Pokémon', group: '🎮 Anime y Niños', url: 'https://jmp2.uk/plu-66ebf4a88131f10008b74739.m3u8', type: 'hls' },
  { id: 'pluto_southpark', name: 'South Park', group: '📺 Pluto TV', url: 'https://jmp2.uk/plu-62bdb1c5e25122000798ac79.m3u8', type: 'hls' },
  { id: 'pluto_spongebob', name: 'SpongeBob SquarePants', group: '🎮 Anime y Niños', url: 'https://jmp2.uk/plu-63f87d057533d80008ab9549.m3u8', type: 'hls' },
  { id: 'pluto_startrek', name: 'Star Trek: The Next Generation', group: '📺 Pluto TV', url: 'https://jmp2.uk/plu-66601d838ce3110008a9d7bf.m3u8', type: 'hls' },
  { id: 'pluto_ufc', name: 'UFC', group: '⚽ Deportes', url: 'https://jmp2.uk/plu-66ed3eb27358ce000830df49.m3u8', type: 'hls' },
  { id: 'pluto_unsolved', name: 'Unsolved Mysteries', group: '📺 Pluto TV', url: 'https://jmp2.uk/plu-62e924f2be69bc0007b7d53d.m3u8', type: 'hls' },
  { id: 'pluto_walker', name: 'Walker Texas Ranger', group: '📺 Pluto TV', url: 'https://jmp2.uk/plu-635659445b4c4700076d2ad1.m3u8', type: 'hls' },
  { id: 'pluto_willow', name: 'Willow Sports', group: '⚽ Deportes', url: 'https://jmp2.uk/plu-6972546cc62833833a187f50.m3u8', type: 'hls' },
  { id: 'pluto_xfiles', name: 'The X-Files', group: '📺 Pluto TV', url: 'https://jmp2.uk/plu-691b023a7613e09a8b209539.m3u8', type: 'hls' },
  { id: 'pluto_yomtv', name: 'Yo! MTV', group: '📺 Pluto TV', url: 'https://jmp2.uk/plu-654102ed770cf1000866c307.m3u8', type: 'hls' }
];

// ========== PLUTO TV CANALES EN ESPAÑOL ==========
export const PLUTO_ESPANOL_CHANNELS: Channel[] = [
  { id: 'pluto_cine_adrenalina', name: 'Cine Adrenalina', group: '🎬 Películas', url: 'https://jmp2.uk/plu-5d8d164d92e97a5e107638d2.m3u8', type: 'hls' },
  { id: 'pluto_cine_clasico', name: 'Cine Clásico', group: '🎬 Películas', url: 'https://jmp2.uk/plu-64b9671cdac71b0008f371df.m3u8', type: 'hls' },
  { id: 'pluto_cine_comedia', name: 'Cine Comedia', group: '🎬 Películas', url: 'https://jmp2.uk/plu-5f513564e4622a0007c578c0.m3u8', type: 'hls' },
  { id: 'pluto_cine_premiere', name: 'Cine Premiere', group: '🎬 Películas', url: 'https://jmp2.uk/plu-5cf968040ab7d8f181e6a68b.m3u8', type: 'hls' },
  { id: 'pluto_cine_terror', name: 'Cine Terror', group: '🎬 Películas', url: 'https://jmp2.uk/plu-5d8d180092e97a5e107638d3.m3u8', type: 'hls' },
  { id: 'pluto_comedycentral_es', name: 'Comedy Central en Español', group: '📺 Pluto TV', url: 'https://jmp2.uk/plu-5cf96dad1652631e36d43320.m3u8', type: 'hls' },
  { id: 'pluto_elreino', name: 'El Reino Infantil', group: '🎮 Anime y Niños', url: 'https://jmp2.uk/plu-66fedd65d7de140008dccd66.m3u8', type: 'hls' },
  { id: 'pluto_mtves', name: 'MTV en Español', group: '📺 Pluto TV', url: 'https://jmp2.uk/plu-5cf96d351652631e36d4331f.m3u8', type: 'hls' },
  { id: 'pluto_nick_es', name: 'Nickelodeon en Español', group: '🎮 Anime y Niños', url: 'https://jmp2.uk/plu-5d8d08395f39465da6fb3ec4.m3u8', type: 'hls' },
  { id: 'pluto_novelas', name: 'Pluto TV Novelas', group: '📺 Pluto TV', url: 'https://jmp2.uk/plu-5cf96c0222df39f1a338d163.m3u8', type: 'hls' },
  { id: 'pluto_series', name: 'Pluto TV Series', group: '📺 Canales de Series', url: 'https://jmp2.uk/plu-5dcde1317578340009b751d0.m3u8', type: 'hls' },
  { id: 'pluto_terror', name: 'Pluto TV Terror', group: '🎬 Películas', url: 'https://jmp2.uk/plu-5c6dc88fcd232425a6e0f06e.m3u8', type: 'hls' },
  { id: 'pluto_walkingdead_es', name: 'The Walking Dead en Español', group: '📺 Pluto TV', url: 'https://jmp2.uk/plu-5e82bb378601b80007b4bd78.m3u8', type: 'hls' }
];

// ========== CANALES XTREMA ==========
export const XTREMA_CHANNELS: Channel[] = [
  {
    id: 'xtrema_cartoons',
    name: 'Xtrema Cartoons',
    group: '🎮 Anime y Niños',
    url: 'https://stmv6.voxtvhd.com.br/xtremacartoons/xtremacartoons/playlist.m3u8',
    type: 'hls'
  },
  {
    id: 'xtrema_cine_clasico',
    name: 'Xtrema Cine Clásico',
    group: '🎬 Películas',
    url: 'https://stmv6.voxtvhd.com.br/cineclasico/cineclasico/playlist.m3u8',
    type: 'hls'
  },
  {
    id: 'xtrema_terror',
    name: 'Xtrema Terror',
    group: '🎬 Películas',
    url: 'https://stmv6.voxtvhd.com.br/cineterror/cineterror/playlist.m3u8',
    type: 'hls'
  }
];

// ========== CANALES DE STREAMING ADICIONALES ==========
export const STREAMING_CHANNELS: Channel[] = [
  { id: 'hi_life', name: 'hi Life!', group: '🌎 Internacionales', url: 'https://d35j504z0x2vu2.cloudfront.net/v1/master/0bc8e8376bd8417a1b6761138aa41c26c7309312/hi-life/distro-cgtn-hilife.m3u8?ads.vf=aYrb1m_ot7a', type: 'hls' },
  { id: 'hi_vida', name: 'hi Vida!', group: '🌎 Internacionales', url: 'https://d35j504z0x2vu2.cloudfront.net/v1/master/0bc8e8376bd8417a1b6761138aa41c26c7309312/hi-vida/distro-cgtn-hivida.m3u8?ads.vf=Pe0Z6YyAyya', type: 'hls' },
  { id: 'history_film', name: 'History Film Channel', group: '📺 Pluto TV', url: 'https://d3s7x6kmqcnb6b.cloudfront.net/d/distro001a/0NPOY54L3YURIZHAY396/hls3/now,-1m/m.m3u8?ads.vf=qEyxmCFMVta', type: 'hls' },
  { id: 'hollywood_classic', name: 'Hollywood Classic Movies', group: '🎬 Películas', url: 'https://d3s7x6kmqcnb6b.cloudfront.net/d/distro001a/91CAL7N2DJN9J22UJVE1/hls3/now,-1m/m.m3u8?ads.vf=6J4oygHpO6S', type: 'hls' },
  { id: 'playing_for_change', name: 'Playing for Change', group: '🎵 Música', url: 'https://streams2.sofast.tv/vglive-sk-860453/index.m3u8', type: 'hls' },
  { id: 'powertube_tv', name: 'Powertube TV', group: '🌎 Internacionales', url: 'https://streams2.sofast.tv/powertube_live/master.m3u8', type: 'hls' },
  { id: 'scifi_world', name: 'Sci-Fi World', group: '📺 Pluto TV', url: 'https://streams2.sofast.tv/v1/master/611d79b11b77e2f571934fd80ca1413453772ac7/a985e052-6868-4365-ac45-52afe9008b25/manifest.m3u8', type: 'hls' },
  { id: 'space_series', name: 'Space Series', group: '📺 Pluto TV', url: 'https://streams2.sofast.tv/v1/master/611d79b11b77e2f571934fd80ca1413453772ac7/18d329ef-d478-413c-b68f-c123494ac434/manifest.m3u8', type: 'hls' },
  { id: 'horror_tv', name: 'Horror TV', group: '🎬 Películas', url: 'https://streams2.sofast.tv/v1/master/611d79b11b77e2f571934fd80ca1413453772ac7/93dc292b-cbcf-4988-ab97-94feced4c14b/manifest.m3u8', type: 'hls' },
  { id: 'kung_fu_plus', name: 'Kung Fu+', group: '🎬 Películas', url: 'https://streams2.sofast.tv/v1/master/611d79b11b77e2f571934fd80ca1413453772ac7/06862a07-6a92-4b4d-abc3-5fea131713b5/manifest.m3u8', type: 'hls' },
  { id: 'sport_fishing', name: 'Sport Fishing TV', group: '⚽ Deportes', url: 'https://streams2.sofast.tv/v1/master/611d79b11b77e2f571934fd80ca1413453772ac7/eea68b79-bfe2-451e-a227-d637a5b9548a/manifest.m3u8', type: 'hls' }
];

// ========== CANALES DE YOUTUBE EN VIVO (FUNCIONALES) ==========
export const YOUTUBE_LIVE_CHANNELS: Channel[] = [
  {
    id: 'c5n_youtube',
    name: 'C5N',
    group: '🇦🇷 Noticias',
    url: 'https://www.youtube.com/watch?v=SF06Qy1Ct6Y',
    type: 'youtube'
  },
  {
    id: 'a24_youtube',
    name: 'A24',
    group: '🇦🇷 Noticias',
    url: 'https://www.youtube.com/watch?v=SmvmdBNK-SM',
    type: 'youtube'
  },
  {
    id: 'tn_youtube',
    name: 'TN',
    group: '🇦🇷 Noticias',
    url: 'https://www.youtube.com/watch?v=ZNqtZkYqk_Y',
    type: 'youtube'
  },
  {
    id: 'cronica_youtube',
    name: 'Crónica TV',
    group: '🇦🇷 Noticias',
    url: 'https://www.youtube.com/watch?v=AV8yH4B7e0c',
    type: 'youtube'
  },
  {
    id: 'tyc_youtube',
    name: 'TyC Sports',
    group: '⚽ Deportes',
    url: 'https://www.youtube.com/watch?v=PuYbQlCq0Bc',
    type: 'youtube'
  },
  {
    id: 'la_nacion_youtube',
    name: 'La Nación+',
    group: '🇦🇷 Noticias',
    url: 'https://www.youtube.com/watch?v=dQeS5qQw7wI',
    type: 'youtube'
  },
  {
    id: 'telefe_youtube',
    name: 'Telefe',
    group: '🇦🇷 Argentina',
    url: 'https://www.youtube.com/watch?v=O6QpYq1q1q1',
    type: 'youtube'
  },
  {
    id: 'eltrece_youtube',
    name: 'El Trece',
    group: '🇦🇷 Argentina',
    url: 'https://www.youtube.com/watch?v=xyz123',
    type: 'youtube'
  }
  /*
  ,
 // 🆕 AGREGAR CANAL 9 AQUÍ
  {
    id: 'canal9_elnueve',
    name: 'Canal 9 (El Nueve)',
    group: '🇦🇷 Argentina',
    url: 'https://www.youtube.com/live/V6RlyFXQu6I',
    type: 'youtube'
  }*/

];


// ========== ACTUALIZAR ALL_CHANNELS ==========
export const ALL_CHANNELS: Channel[] = [
  ...ARGENTINA_CHANNELS,
  ...INTERNATIONAL_CHANNELS,
  ...PLUTO_CHANNELS,
  ...PLUTO_ESPANOL_CHANNELS,
  ...XTREMA_CHANNELS,
  ...STREAMING_CHANNELS,
  ...YOUTUBE_LIVE_CHANNELS,
  ...CUSTOM_CHANNELS,  // 👈 AGREGAR LOS CANALES PERSONALIZADOS
];

console.log(`📺 Archivo channels.ts: ${ALL_CHANNELS.length} canales configurados`);

export default ALL_CHANNELS;

