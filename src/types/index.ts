// Tipos para los canales
export interface Channel {
  id: string;
  name: string;
  group: string;
  url: string;
  type: 'hls' | 'dash';
  logo?: string;
  isFavorite?: boolean;
}

export interface ChannelGroup {
  name: string;
  channels: Channel[];
}