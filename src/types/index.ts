export interface Channel {
  id: string;
  name: string;
  group: string;
  url: string;
 type: 'hls' | 'dash' | 'udp' | 'youtube' | 'iframe' ;
   logo?: string;
  userAgent?: string;
  referrer?: string;
  fallbackUrls?: string[];
}

export interface ChannelGroup {
  name: string;
  channels: Channel[];
}
