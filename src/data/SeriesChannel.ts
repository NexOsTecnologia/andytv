import { Channel } from '../types';

// Canales de series gratuitos (formato HLS)
export const SERIES_CHANNELS: Channel[] = [
  {
    id: 'series_1',
    name: 'Pluto TV - Series',
    group: '📺 Canales de Series',
    url: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f1e3a8e4b3e6f0007e4c3a1/master.m3u8?deviceId=web&deviceModel=web&deviceType=web&deviceMake=web&deviceDNT=0&advertisingId=&deviceVersion=web&appVersion=web&appName=web&device_lat=0&device_lon=0&embedPartner=web&embedPartner=web',
    type: 'hls'
  },
  {
    id: 'series_2',
    name: 'Pluto TV - Drama',
    group: '📺 Canales de Series',
    url: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f1e3a8e4b3e6f0007e4c3a2/master.m3u8?deviceId=web&deviceModel=web&deviceType=web&deviceMake=web&deviceDNT=0',
    type: 'hls'
  },
  {
    id: 'series_3',
    name: 'Pluto TV - Comedy',
    group: '📺 Canales de Series',
    url: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f1e3a8e4b3e6f0007e4c3a3/master.m3u8?deviceId=web&deviceModel=web&deviceType=web&deviceMake=web&deviceDNT=0',
    type: 'hls'
  },
  {
    id: 'series_4',
    name: 'Pluto TV - Sci-Fi',
    group: '📺 Canales de Series',
    url: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f1e3a8e4b3e6f0007e4c3a4/master.m3u8?deviceId=web&deviceModel=web&deviceType=web&deviceMake=web&deviceDNT=0',
    type: 'hls'
  },
  {
    id: 'series_5',
    name: 'Plex - Movies & TV',
    group: '📺 Canales de Series',
    url: 'https://plex.tv/api/live?path=/live/playlist.m3u8&X-Plex-Token=',
    type: 'hls'
  }
];