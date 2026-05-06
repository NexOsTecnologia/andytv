import React, { useState } from 'react';
import './EpisodeBrowser.css';

interface EpisodeBrowserProps {
  serieTitle: string;
  searchQuery: string;
  onPlayVideo: (url: string, title: string) => void;
  onBack: () => void;
}

// Lista de URLs de videos predefinidos para "La Ley y el Orden" (ejemplo)
const PREDEFINED_VIDEOS = [
  { title: "Temporada 1 - Capítulo 1", videoId: "dQw4w9WgXcQ" },
  { title: "Temporada 1 - Capítulo 2", videoId: "dQw4w9WgXcQ" },
  // Agrega más IDs reales si los encuentras
];

export const EpisodeBrowser: React.FC<EpisodeBrowserProps> = ({ 
  serieTitle, 
  searchQuery, 
  onPlayVideo, 
  onBack 
}) => {
  const [showManualSearch, setShowManualSearch] = useState(false);

  // Si el iframe falla, mostramos opción manual
  const handleIframeError = () => {
    setShowManualSearch(true);
  };

  // Reproducir video específico
  const playSpecificVideo = (videoId: string, title: string) => {
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    onPlayVideo(embedUrl, title);
  };

  // Búsqueda manual
  const handleManualSearch = () => {
    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;
    window.open(searchUrl, '_blank');
  };

  return (
    <div className="episode-browser">
      <div className="episode-browser-header">
        <button className="back-btn" onClick={onBack}>
          ← Volver a series
        </button>
        <h2>📺 {serieTitle}</h2>
      </div>
      
      {!showManualSearch ? (
        <>
          <div className="episode-iframe-container">
            <iframe
              src={`https://www.youtube.com/embed?listType=search&search_query=${encodeURIComponent(searchQuery)}`}
              className="episode-iframe"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              title={`${serieTitle} - Capítulos`}
              onError={handleIframeError}
            />
          </div>
          <div className="episode-info-footer">
            <div className="info-message">
              <span className="info-icon">💡</span>
              <span>Si no ves la lista, usá la búsqueda manual</span>
            </div>
            <button 
              className="search-inline-btn"
              onClick={() => setShowManualSearch(true)}
            >
              🔍 Buscar capítulos manualmente
            </button>
          </div>
        </>
      ) : (
        <div className="manual-search-container">
          <h3>Búsqueda manual de capítulos</h3>
          <p>Serie: <strong>{serieTitle}</strong></p>
          <p>Podés buscar en YouTube: <strong>{searchQuery}</strong></p>
          
          <div className="search-buttons">
            <button 
              className="search-btn-youtube"
              onClick={handleManualSearch}
            >
              🔍 Buscar en YouTube
            </button>
          </div>
          
          <div className="info-note-manual">
            <p>💡 Una vez en YouTube, podés copiar la URL del video y volver a la app para pegarla en el buscador principal.</p>
          </div>
        </div>
      )}
    </div>
  );
};