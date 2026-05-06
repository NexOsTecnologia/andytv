import React, { useState, useEffect } from 'react';
import { ChannelList } from './components/ChannelList';
import { VideoPlayer } from './components/VideoPlayer';
import { SeriesHub } from './components/SeriesHub';
import { useChannels } from './hooks/useChannels';
import { Channel } from './types';
import './App.css';

type TabType = 'tv' | 'series';

function App() {
  const { channels, isLoading, error: loadError } = useChannels();
  const [currentChannel, setCurrentChannel] = useState<Channel | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<TabType>('tv');

  // Cargar favoritos guardados
  useEffect(() => {
    const saved = localStorage.getItem('andytv_favorites');
    if (saved) {
      try {
        setFavorites(new Set(JSON.parse(saved)));
      } catch (e) {
        console.error('Error loading favorites:', e);
      }
    }
  }, []);

  // Guardar favoritos
  useEffect(() => {
    localStorage.setItem('andytv_favorites', JSON.stringify([...favorites]));
  }, [favorites]);

  const handleSelectChannel = (channel: Channel) => {
    setCurrentChannel(channel);
  };

  const handleToggleFavorite = (channelId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(channelId)) {
        newFavorites.delete(channelId);
      } else {
        newFavorites.add(channelId);
      }
      return newFavorites;
    });
  };

  const handleVideoError = (error: Error) => {
    console.error('Video error:', error);
  };

  // Manejar cambio de canal desde el VideoPlayer (para series_hub y series)
  const handleChannelChange = (newChannel: Channel) => {
    setCurrentChannel(newChannel);
    // Cambiar automáticamente a la pestaña de TV para ver la reproducción
    if (activeTab !== 'tv') {
      setActiveTab('tv');
    }
  };

  // Mostrar loading mientras carga
  if (isLoading) {
    return (
      <div className="app loading-screen">
        <div className="spinner"></div>
        <p>Cargando canales... ({channels.length} encontrados)</p>
      </div>
    );
  }

  // Mostrar error si no hay canales
  if (channels.length === 0 && !loadError) {
    return (
      <div className="app loading-screen">
        <div className="error-icon">⚠️</div>
        <p>No se encontraron canales</p>
        <small>Verifica tu conexión a internet</small>
      </div>
    );
  }

  console.log(`🎬 App cargada con ${channels.length} canales`);

  return (
    <div className="app">
      <header className="app-header">
        <h1>📺 AndyTV</h1>
        <p>{channels.length} canales · Series · Contenido bajo demanda</p>
        
        <div className="tab-buttons">
          <button
            className={`tab-btn ${activeTab === 'tv' ? 'active' : ''}`}
            onClick={() => setActiveTab('tv')}
          >
            📺 Canales TV ({channels.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'series' ? 'active' : ''}`}
            onClick={() => setActiveTab('series')}
          >
            🎬 Series y Programas
          </button>
        </div>
      </header>

      <div className="app-main">
        {activeTab === 'tv' ? (
          <>
            <aside className="sidebar">
              <ChannelList
                channels={channels}
                currentChannel={currentChannel}
                onSelectChannel={handleSelectChannel}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            </aside>
            <main className="player-area">
              <VideoPlayer 
                channel={currentChannel} 
                onError={handleVideoError}
                onChannelChange={handleChannelChange}
              />
              <div className="current-channel-info">
                <span className="label">🎬 Reproduciendo:</span>
                <span className="name">
                  {currentChannel ? currentChannel.name : 'Seleccioná un canal o serie'}
                </span>
              </div>
            </main>
          </>
        ) : (
          <main className="series-area">
            <SeriesHub 
              onPlayChannel={(newChannel) => {
                // Cuando se selecciona una serie/capítulo, cambiar a la pestaña TV
                setCurrentChannel(newChannel);
                setActiveTab('tv');
              }}
              onClose={() => {
                // Opcional: volver a la pestaña de TV
                setActiveTab('tv');
              }}
            />
          </main>
        )}
      </div>

      <footer className="app-footer">
        <p>
          {activeTab === 'tv' 
            ? `📡 ${channels.length} canales disponibles · Hacé clic en cualquier canal para reproducir`
            : '🎬 Explorá series, programas y canales bajo demanda · Hacé clic en cualquier contenido para reproducirlo'}
        </p>
      </footer>
    </div>
  );
}

export default App;