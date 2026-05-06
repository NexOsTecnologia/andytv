import React, { useState } from 'react';
import { DKISSCatalog } from './DKISSCatalog';
import './SeriesHub.css';

interface SeriesHubProps {
  onPlayChannel: (channel: Channel) => void;
  onClose?: () => void;
}

// Necesitas importar Channel
import { Channel } from '../types';

type HubTab = 'dkiss' | 'pluto_series' | 'youtube_search';

export const SeriesHub: React.FC<SeriesHubProps> = ({ onPlayChannel, onClose }) => {
  const [activeTab, setActiveTab] = useState<HubTab>('dkiss');
  const [searchTerm, setSearchTerm] = useState('');

  // Canales de Pluto TV para series
  const plutoSeriesChannels: Channel[] = [
    {
      id: 'pluto_series_1',
      name: 'Pluto TV - Series',
      group: '📺 Canales de Series',
      url: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f1e3a8e4b3e6f0007e4c3a1/master.m3u8?deviceId=web&deviceModel=web&deviceType=web&deviceMake=web&deviceDNT=0',
      type: 'hls'
    },
    {
      id: 'pluto_series_2',
      name: 'Pluto TV - Drama',
      group: '📺 Canales de Series',
      url: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f1e3a8e4b3e6f0007e4c3a2/master.m3u8?deviceId=web&deviceModel=web&deviceType=web&deviceMake=web&deviceDNT=0',
      type: 'hls'
    },
    {
      id: 'pluto_series_3',
      name: 'Pluto TV - Comedy',
      group: '📺 Canales de Series',
      url: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f1e3a8e4b3e6f0007e4c3a3/master.m3u8?deviceId=web&deviceModel=web&deviceType=web&deviceMake=web&deviceDNT=0',
      type: 'hls'
    },
    {
      id: 'pluto_series_4',
      name: 'Pluto TV - Sci-Fi',
      group: '📺 Canales de Series',
      url: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f1e3a8e4b3e6f0007e4c3a4/master.m3u8?deviceId=web&deviceModel=web&deviceType=web&deviceMake=web&deviceDNT=0',
      type: 'hls'
    }
  ];

  const handleYouTubeSearch = () => {
    if (!searchTerm.trim()) return;
    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchTerm + ' serie completa')}`;
    onPlayChannel({
      id: `search_${Date.now()}`,
      name: `Búsqueda: ${searchTerm}`,
      group: 'Búsqueda',
      url: searchUrl,
      type: 'webpage'
    });
  };

  return (
    <div className="series-hub">
      <div className="series-hub-header">
        <h2>🎬 Centro de Series y Programas</h2>
        {onClose && (
          <button className="close-btn" onClick={onClose}>✖</button>
        )}
      </div>

      <div className="hub-tabs">
        <button 
          className={`tab ${activeTab === 'dkiss' ? 'active' : ''}`}
          onClick={() => setActiveTab('dkiss')}
        >
          📺 DKISS (Bajo Demanda)
        </button>
        <button 
          className={`tab ${activeTab === 'pluto_series' ? 'active' : ''}`}
          onClick={() => setActiveTab('pluto_series')}
        >
          📡 Canales de Series (24/7)
        </button>
        <button 
          className={`tab ${activeTab === 'youtube_search' ? 'active' : ''}`}
          onClick={() => setActiveTab('youtube_search')}
        >
          🔍 Buscar en YouTube
        </button>
      </div>

      {activeTab === 'dkiss' && (
        <DKISSCatalog 
          onPlayVideo={(url, title) => {
            onPlayChannel({
              id: `dkiss_${Date.now()}`,
              name: title,
              group: 'DKISS',
              url: url,
              type: 'youtube'
            });
          }}
        />
      )}

      {activeTab === 'pluto_series' && (
        <div className="pluto-series-view">
          <div className="channels-grid">
            {plutoSeriesChannels.map(channel => (
              <div 
                key={channel.id}
                className="channel-card"
                onClick={() => onPlayChannel(channel)}
              >
                <div className="channel-icon">📡</div>
                <div className="channel-info">
                  <h3>{channel.name}</h3>
                  <p>Transmisión 24/7 • HLS</p>
                  <button className="play-btn">▶ Ver canal</button>
                </div>
              </div>
            ))}
          </div>
          <div className="info-note">
            💡 Estos canales transmiten series las 24 horas del día, 7 días a la semana.
          </div>
        </div>
      )}

      {activeTab === 'youtube_search' && (
        <div className="youtube-search-view">
          <div className="search-bar">
            <input
              type="text"
              placeholder="🔍 Buscar serie, programa o capítulo (ej: 'Friends', 'The Office', 'MasterChef')..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleYouTubeSearch()}
              autoFocus
            />
            <button onClick={handleYouTubeSearch}>Buscar</button>
          </div>

          <div className="search-suggestions">
            <p>💡 Sugerencias:</p>
            <div className="suggestion-buttons">
              <button onClick={() => setSearchTerm('The Office episodios completos')}>The Office</button>
              <button onClick={() => setSearchTerm('Friends capítulos completos')}>Friends</button>
              <button onClick={() => setSearchTerm('Breaking Bad temporada completa')}>Breaking Bad</button>
              <button onClick={() => setSearchTerm('MasterChef programa completo')}>MasterChef</button>
              <button onClick={() => setSearchTerm('true crime casos reales')}>True Crime</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};