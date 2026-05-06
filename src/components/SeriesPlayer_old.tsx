import React, { useState, useRef } from 'react';
import './SeriesPlayer.css';

// Función para extraer ID de YouTube de cualquier URL
const getYouTubeId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([^&]+)/,
    /(?:youtu\.be\/)([^?]+)/,
    /(?:youtube\.com\/embed\/)([^/]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

interface SeriesPlayerProps {
  onClose?: () => void;
}

export const SeriesPlayer: React.FC<SeriesPlayerProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Series recomendadas (enlaces directos de YouTube)
  const recommendedSeries = [
    { name: 'Star Trek: The Next Generation', url: 'https://www.youtube.com/playlist?list=PLVtLpz2vL7vZ8QqXxVxVxVxVxVxVxVxV' },
    { name: 'The Twilight Zone', url: 'https://www.youtube.com/playlist?list=PLVtLpz2vL7vZ8QqXxVxVxVxVxVxVxVxV' },
    { name: 'Documentales', url: 'https://www.youtube.com/playlist?list=PLVtLpz2vL7vZ8QqXxVxVxVxVxVxVxVxV' }
  ];

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Buscar en YouTube (usando API pública sin clave)
      const response = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/results?search_query=${encodeURIComponent(searchTerm + ' full episode')}`);
      // Esto es simplificado - idealmente usarías la API de YouTube
      
      // Por ahora, abrir en iframe con búsqueda
      setCurrentVideo(`https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(searchTerm + ' serie completa')}`);
    } catch (err) {
      setError('Error al buscar');
    } finally {
      setIsLoading(false);
    }
  };

  const playYouTubeUrl = (url: string) => {
    const videoId = getYouTubeId(url);
    if (videoId) {
      setCurrentVideo(`https://www.youtube.com/embed/${videoId}?autoplay=1`);
    } else {
      // Si es playlist o búsqueda
      setCurrentVideo(url);
    }
  };

  return (
    <div className="series-player">
      <div className="series-player-header">
        <h3>🎬 Buscar Series</h3>
        {onClose && (
          <button className="close-btn" onClick={onClose}>✖</button>
        )}
      </div>

      {/* Buscador */}
      <div className="search-section">
        <input
          type="text"
          placeholder="🔍 Buscar serie (ej: Friends, The Office, Game of Thrones)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-btn" disabled={isLoading}>
          {isLoading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {/* Reproductor */}
      {currentVideo ? (
        <div className="video-container">
          <iframe
            ref={iframeRef}
            src={currentVideo}
            title="Series Player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="video-iframe"
          />
        </div>
      ) : (
        <div className="placeholder-message">
          <div className="placeholder-icon">🎬</div>
          <p>Buscá una serie para comenzar a ver</p>
          <small>Ejemplos: The Office, Friends, Breaking Bad, Game of Thrones</small>
        </div>
      )}

      {/* Series recomendadas */}
      <div className="recommended-section">
        <h4>📺 Canales de Series en Vivo</h4>
        <div className="recommended-list">
          {SERIES_CHANNELS.map(channel => (
            <button
              key={channel.id}
              className="recommended-item"
              onClick={() => {
                // Para canales HLS, necesitarías usar el reproductor HLS
                // Por ahora abrimos en nueva pestaña
                window.open(channel.url, '_blank');
              }}
            >
              <span className="rec-icon">📡</span>
              <span className="rec-name">{channel.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Canales de series HLS
const SERIES_CHANNELS = [
  { id: '1', name: 'Pluto TV Series', url: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f1e3a8e4b3e6f0007e4c3a1/master.m3u8' },
  { id: '2', name: 'Pluto TV Drama', url: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f1e3a8e4b3e6f0007e4c3a2/master.m3u8' },
  { id: '3', name: 'Pluto TV Comedy', url: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f1e3a8e4b3e6f0007e4c3a3/master.m3u8' }
];