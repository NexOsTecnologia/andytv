import { useState, useEffect } from 'react';
import { Channel } from '../types';
import { M3U_SOURCES, TARGET_CHANNELS, FALLBACK_CHANNELS, NEW_CHANNELS } from '../data/channels';

// Función para parsear M3U
function parseM3U(content: string, sourceName: string): Channel[] {
  const lines = content.split('\n');
  const channels: Channel[] = [];
  let currentChannel: Partial<Channel> = {};
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line.startsWith('#EXTINF')) {
      const lastComma = line.lastIndexOf(',');
      const name = lastComma !== -1 ? line.substring(lastComma + 1).trim() : '';
      const logoMatch = line.match(/tvg-logo=["']([^"']+)["']/);
      const groupMatch = line.match(/group-title=["']([^"']+)["']/);
      
      currentChannel = {
        name,
        logo: logoMatch ? logoMatch[1] : undefined,
        group: groupMatch ? groupMatch[1] : sourceName,
        type: 'hls'
      };
    } 
    else if (line.startsWith('http') && currentChannel.name) {
      currentChannel.url = line;
      if (currentChannel.name && currentChannel.name !== 'Sin nombre') {
        channels.push({
          id: `${sourceName}_${i}`,
          name: currentChannel.name,
          group: currentChannel.group || sourceName,
          url: currentChannel.url,
          type: 'hls',
          logo: currentChannel.logo
        } as Channel);
      }
      currentChannel = {};
    }
  }
  
  return channels;
}

// Función para cargar una lista M3U
async function loadM3U(url: string, sourceName: string): Promise<Channel[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const content = await response.text();
    return parseM3U(content, sourceName);
  } catch (error) {
    console.warn(`Error loading ${sourceName}:`, error);
    return [];
  }
}

// Hook principal
export function useChannels() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAllChannels = async () => {
      setIsLoading(true);
      setError(null);
      
      const allLoadedChannels: Channel[] = [];
      const foundChannels = new Set<string>();
      
      // 1. Cargar desde fuentes M3U (tus canales originales)
      for (const source of M3U_SOURCES.filter(s => s.enabled)) {
        const loaded = await loadM3U(source.url, source.name);
        
        for (const target of TARGET_CHANNELS) {
          const matched = loaded.find(ch => 
            target.keywords.some(keyword => 
              ch.name.toLowerCase().includes(keyword.toLowerCase())
            )
          );
          
          if (matched && !foundChannels.has(target.name)) {
            foundChannels.add(target.name);
            allLoadedChannels.push({
              ...matched,
              id: target.name.toLowerCase().replace(/[^a-z0-9]/g, '_'),
              name: target.name,
              group: target.group,
              type: 'hls'
            });
            console.log(`✅ Encontrado: ${target.name} - ${matched.url}`);
          }
        }
      }
      
      // 2. Usar fallbacks si algún canal no se encontró
      for (const fallback of FALLBACK_CHANNELS) {
        const exists = allLoadedChannels.some(ch => ch.name === fallback.name.replace(' (Fallback)', ''));
        if (!exists) {
          allLoadedChannels.push(fallback);
          console.log(`📡 Usando fallback: ${fallback.name}`);
        }
      }
      
      // 3. AGREGAR LOS NUEVOS CANALES FUNCIONALES (sin perder los existentes)
      for (const newChannel of NEW_CHANNELS) {
        const exists = allLoadedChannels.some(ch => ch.name === newChannel.name);
        if (!exists) {
          allLoadedChannels.push(newChannel);
          console.log(`✨ Nuevo canal agregado: ${newChannel.name}`);
        }
      }
      
      // 4. Si no hay canales, mostrar mensaje
      if (allLoadedChannels.length === 0) {
        setError('No se encontraron canales activos. Verifica tu conexión.');
      }
      
      setChannels(allLoadedChannels);
      setIsLoading(false);
    };
    
    loadAllChannels();
  }, []);

  return { channels, isLoading, error };
}