import React, { useState, useEffect } from 'react';
import { SERIES_CATALOG, EPISODES, Serie, Episode } from '../data/seriesData';
import './SeriesBrowser.css';

interface SeriesBrowserProps {
  onPlayVideo: (url: string, title: string) => void;
  onClose?: () => void;
}

// Función para buscar videos en YouTube por canal y término
const searchYouTubeVideos = async (channelId: string, searchTerm: string): Promise<any[]> => {
  // Nota: En producción, deberías usar tu propia API key
  // Esta es una función de ejemplo que muestra cómo estructurarlo
  try {
    // Opción 1: Usar RSS feed del canal (no requiere API key)
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    const response = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl)}`);
    const xmlText = await response.text();
    
    // Parsear XML - simplificado, en producción usa un parser
    const videoMatches = xmlText.matchAll(/<entry>[\s\S]*?<title>([^<]+)<\/title>[\s\S]*?<videoId>([^<]+)<\/videoId>[\s\S]*?<\/entry>/g);
    const videos = [];
    for (const match of videoMatches) {
      videos.push({
        title: match[1],
        videoId: match[2],
        url: `https://www.youtube.com/watch?v=${match[2]}`
      });
    }
    return videos;
  } catch (error) {
    console.error('Error buscando videos:', error);
    return [];
  }
};

export const SeriesBrowser: React.FC<SeriesBrowserProps> = ({ onPlayVideo, onClose }) => {
  const [selectedSerie, setSelectedSerie] = useState<Serie | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'series' | 'search'>('series');

  // Cargar episodios cuando se selecciona una serie
  useEffect(() => {
    if (!selectedSerie) return;
    
    setIsLoading(true);
    // Filtrar episodios locales primero
    const localEpisodes = EPISODES.filter(ep => ep.serieId === selectedSerie.id);
    setEpisodes(localEpisodes);
    
    // Opcional: Buscar en YouTube (requiere API key o proxy)
    const fetchYouTubeEpisodes = async () => {
      const videos = await searchYouTubeVideos(selectedSerie.channel, selectedSerie.title);
      console.log('Videos encontrados:', videos);
      // Aquí podrías convertir los videos a episodios y agregarlos
    };
    
    fetchYouTubeEpisodes();
    setIsLoading(false);
  }, [selectedSerie]);

  // Buscar en todo YouTube
  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setIsLoading(true);
    try {
      // Usar la API de NoEmbed (gratuita, sin clave)
      const response = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/results?search_query=${encodeURIComponent(searchTerm + ' dkiss')}`);
      // Nota: Esto es simplificado, la respuesta real necesita parseo
      console.log('Búsqueda realizada:', searchTerm);
      
      // Por ahora, abrimos directamente una búsqueda en YouTube
      const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchTerm + ' programa completo')}`;
      onPlayVideo(searchUrl, `Búsqueda: ${searchTerm}`);
    } catch (error) {
      console.error('Error en búsqueda:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="series-browser">
      <div className="series-browser-header">
        <h2>📺 Series y Programas</h2>
        {onClose && (
          <button className="close-btn" onClick={onClose}>✖</button>
        )}
      </div>

      {/* Tabs */}
      <div className="browser-tabs">
        <button 
          className={`tab-btn ${activeTab === 'series' ? 'active' : ''}`}
          onClick={() => setActiveTab('series')}
        >
          📚 Series
        </button>
        <button 
          className={`tab-btn ${activeTab === 'search' ? 'active' : ''}`}
          onClick={() => setActiveTab('search')}
        >
          🔍 Buscar Capítulos
        </button>
      </div>

      {activeTab === 'series' && (
        <>
          {/* Lista de series */}
          {!selectedSerie ? (
            <div className="series-grid">
              {SERIES_CATALOG.map(serie => (
                <div 
                  key={serie.id}
                  className="serie-card"
                  onClick={() => setSelectedSerie(serie)}
                >
                  <div className="serie-thumbnail">
                    <span className="serie-icon">
                      {serie.type === 'cocina' && '🍳'}
                      {serie.type === 'truecrime' && '🔪'}
                      {serie.type === 'entretenimiento' && '📺'}
                    </span>
                  </div>
                  <div className="serie-info">
                    <h3>{serie.title}</h3>
                    <p>{serie.description}</p>
                    <button className="view-episodes-btn">Ver capítulos →</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Lista de capítulos de la serie seleccionada
            <div className="episodes-view">
              <button className="back-btn" onClick={() => setSelectedSerie(null)}>
                ← Volver a series
              </button>
              
              <h3>{selectedSerie.title}</h3>
              
              {isLoading ? (
                <div className="loading-spinner">Cargando capítulos...</div>
              ) : episodes.length === 0 ? (
                <div className="no-episodes">
                  <p>No hay capítulos guardados aún.</p>
                  <p>Podés buscarlos manualmente en la pestaña "Buscar Capítulos".</p>
                </div>
              ) : (
                <div className="episodes-list">
                  {episodes.map(episode => (
                    <div key={episode.id} className="episode-item">
                      <div className="episode-thumbnail">
                        <span>🎬</span>
                      </div>
                      <div className="episode-details">
                        <h4>{episode.title}</h4>
                        <div className="episode-meta">
                          <span>⏱️ {episode.duration}</span>
                          <span>📅 {new Date(episode.publishedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <button 
                        className="play-episode-btn"
                        onClick={() => onPlayVideo(episode.youtubeUrl, episode.title)}
                      >
                        ▶ Reproducir
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}

      {activeTab === 'search' && (
        <div className="search-view">
          <div className="search-bar">
            <input
              type="text"
              placeholder="🔍 Buscar programa o capítulo (ej: 'MasterChef', 'Crimen real')..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? 'Buscando...' : 'Buscar'}
            </button>
          </div>

          <div className="search-tips">
            <h4>💡 Sugerencias de búsqueda:</h4>
            <div className="suggestions">
              <button onClick={() => setSearchTerm('programas de cocina completos')}>🍳 Programas de cocina</button>
              <button onClick={() => setSearchTerm('true crime casos reales')}>🔪 True Crime</button>
              <button onClick={() => setSearchTerm('reality shows completos')}>📺 Reality shows</button>
              <button onClick={() => setSearchTerm('testimonios impactantes')}>💬 Testimonios</button>
            </div>
          </div>

          <div className="youtube-channel-info">
            <h4>📺 Canal oficial de DKISS en YouTube</h4>
            <a 
              href="https://www.youtube.com/channel/UCYyaquuf8GnQupjx2FW_n3Q" 
              target="_blank" 
              rel="noopener noreferrer"
              className="channel-link"
            >
              Visitar canal oficial →
            </a>
            <p className="channel-note">
              Todos los programas completos se publican en este canal. 
              Usá el buscador arriba para encontrar capítulos específicos.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};