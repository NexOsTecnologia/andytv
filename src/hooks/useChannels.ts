import { useState, useEffect } from 'react';
import { Channel } from '../types';
import { ALL_CHANNELS } from '../data/channels';

export function useChannels() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('🔍 Cargando canales...');
    
    // Simular una pequeña carga
    setTimeout(() => {
      if (ALL_CHANNELS && ALL_CHANNELS.length > 0) {
        console.log(`✅ Cargados ${ALL_CHANNELS.length} canales`);
        
        // Ordenar canales por grupo
        const sortedChannels = [...ALL_CHANNELS].sort((a, b) => {
          if (a.group < b.group) return -1;
          if (a.group > b.group) return 1;
          return a.name.localeCompare(b.name);
        });
        
        setChannels(sortedChannels);
        setError(null);
      } else {
        console.error('❌ No hay canales disponibles');
        setError('No se encontraron canales');
      }
      setIsLoading(false);
    }, 500);
  }, []);

  return { channels, isLoading, error };
}