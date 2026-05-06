import React, { useState } from 'react';
import { EpisodeBrowser } from './EpisodeBrowser';
import { LAW_AND_ORDER_EPISODES } from '../data/lawAndOrderEpisodes';
import { getCuevanaPlayerUrl } from '../utils/cuevanaParser';
import './DKISSCatalog.css';

interface DKISSCatalogProps {
  onPlayVideo: (url: string, title: string) => void;
  onClose?: () => void;
}

// Listas de reproducción DKISS
const DKISS_PLAYLISTS = [
  {
    id: 'silencio_mortal',
    title: 'Silencio mortal',
    description: 'Casos de asesinatos y misterios sin resolver',
    videoCount: 36,
    type: 'true-crime',
    searchQuery: 'Silencio mortal dkiss'
  },
  {
    id: 'asesinos_serie',
    title: 'Asesinos en serie',
    description: 'Los psicópatas más peligrosos de la historia',
    videoCount: 103,
    type: 'true-crime',
    searchQuery: 'Asesinos en serie dkiss'
  },
  {
    id: 'kilos_mortales',
    title: 'Kilos mortales',
    description: 'Historias extremas de pérdida de peso',
    videoCount: 8,
    type: 'salud',
    searchQuery: 'Kilos mortales dkiss'
  },
  {
    id: 'hermanas_300kg',
    title: 'Las hermanas de 300kg',
    description: 'La lucha contra la obesidad mórbida',
    videoCount: 60,
    type: 'salud',
    searchQuery: 'Las hermanas de 300kg dkiss'
  },
  {
    id: 'con_quien_me_case',
    title: '¿Pero con quién me he casado?',
    description: 'Secretos oscuros revelados después de la boda',
    videoCount: 34,
    type: 'entretenimiento',
    searchQuery: '¿Pero con quién me he casado? dkiss'
  },
  {
    id: 'pueblos_malditos',
    title: 'Pueblos malditos',
    description: 'Lugares con maldiciones y fenómenos paranormales',
    videoCount: 7,
    type: 'misterio',
    searchQuery: 'Pueblos malditos dkiss'
  },
  {
    id: 'diagnosticame',
    title: 'diagnostícame',
    description: 'Enfermedades raras y diagnósticos sorprendentes',
    videoCount: 10,
    type: 'salud',
    searchQuery: 'diagnostícame dkiss'
  },
  {
    id: 'naked_attraction',
    title: 'Naked Attraction',
    description: 'El polémico dating show',
    videoCount: 4,
    type: 'entretenimiento',
    searchQuery: 'Naked Attraction dkiss'
  },
  {
    id: 'sexo_urgencias',
    title: 'El sexo me llevó a urgencias',
    description: 'Accidentes sexuales increíbles',
    videoCount: 15,
    type: 'entretenimiento',
    searchQuery: 'El sexo me llevó a urgencias dkiss'
  },
  {
    id: 'familia_tonelada',
    title: 'Mi familia pesa una tonelada',
    description: 'Familias luchando contra la obesidad',
    videoCount: 3,
    type: 'salud',
    searchQuery: 'Mi familia pesa una tonelada dkiss'
  }
];

// Tipo para la serie seleccionada
type SelectedSerie = {
  id: string;
  title: string;
  type: 'dkiss' | 'lawAndOrder';
};

export const DKISSCatalog: React.FC<DKISSCatalogProps> = ({ onPlayVideo, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedSerie, setSelectedSerie] = useState<SelectedSerie | null>(null);
  const [loadingEpisode, setLoadingEpisode] = useState<number | null>(null);

  const categories = [
    { id: 'all', name: 'Todos', icon: '📺' },
    { id: 'true-crime', name: 'True Crime', icon: '🔪' },
    { id: 'salud', name: 'Salud', icon: '⚕️' },
    { id: 'entretenimiento', name: 'Entretenimiento', icon: '🎭' },
    { id: 'misterio', name: 'Misterio', icon: '👻' }
  ];

  const filteredPlaylists = DKISS_PLAYLISTS.filter(playlist => {
    const matchesCategory = activeCategory === 'all' || playlist.type === activeCategory;
    const matchesSearch = playlist.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          playlist.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Reproducir episodio de La Ley y el Orden
  const playLawAndOrderEpisode = async (episode: typeof LAW_AND_ORDER_EPISODES[0]) => {
    setLoadingEpisode(episode.episode);
    onPlayVideo(episode.url, `${episode.title} (Cargando...)`);
    
    const playerUrl = await getCuevanaPlayerUrl(episode.url);
    
    if (playerUrl) {
      onPlayVideo(playerUrl, `🎬 ${episode.title}`);
    } else {
      onPlayVideo(episode.url, `${episode.title} (Abrir en Cuevana)`);
    }
    
    setLoadingEpisode(null);
  };

  // Renderizar lista de episodios de La Ley y el Orden
  if (selectedSerie?.type === 'lawAndOrder') {
    return (
      <div className="episodes-container">
        <div className="episodes-header">
          <button 
            className="back-btn" 
            onClick={() => setSelectedSerie(null)}
          >
            ← Volver a series
          </button>
          <h2>{selectedSerie.title}</h2>
          <p className="episodes-subtitle">Temporada 27 - 17 episodios disponibles</p>
        </div>
        
        <div className="episodes-grid">
          {LAW_AND_ORDER_EPISODES.map(episode => (
            <div key={episode.episode} className="episode-card">
              <div className="episode-number">Episodio {episode.episode}</div>
              <div className="episode-title">{episode.title}</div>
              <button 
                className="play-episode-btn"
                onClick={() => playLawAndOrderEpisode(episode)}
                disabled={loadingEpisode === episode.episode}
              >
                {loadingEpisode === episode.episode ? (
                  <span className="loading-spinner-small"></span>
                ) : (
                  '▶ Reproducir'
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Renderizar EpisodeBrowser para series DKISS
  if (selectedSerie?.type === 'dkiss') {
    const playlist = DKISS_PLAYLISTS.find(p => p.id === selectedSerie.id);
    if (playlist) {
      return (
        <EpisodeBrowser
          serieTitle={playlist.title}
          searchQuery={playlist.searchQuery!}
          onPlayVideo={onPlayVideo}
          onBack={() => setSelectedSerie(null)}
        />
      );
    }
  }

  // Lista principal de series
  return (
    <div className="dkiss-catalog">
      <div className="catalog-header">
        <h2>📺 Series y Programas</h2>
        {onClose && (
          <button className="close-btn" onClick={onClose}>✖</button>
        )}
        <p className="header-note">
          📌 Seleccioná una serie para ver sus capítulos
        </p>
      </div>

      <div className="catalog-search">
        <input
          type="text"
          placeholder="🔍 Buscar serie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="catalog-categories">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`category-btn ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      <div className="playlists-grid">
        {/* Series DKISS */}
        {filteredPlaylists.map(playlist => (
          <div key={playlist.id} className="playlist-card">
            <div className="playlist-thumbnail">
              <span className="playlist-icon">
                {playlist.type === 'true-crime' && '🔪'}
                {playlist.type === 'salud' && '⚕️'}
                {playlist.type === 'entretenimiento' && '🎭'}
                {playlist.type === 'misterio' && '👻'}
              </span>
              <span className="video-count">{playlist.videoCount} videos</span>
            </div>
            <div className="playlist-info">
              <h3>{playlist.title}</h3>
              <p>{playlist.description}</p>
              <button 
                className="view-btn"
                onClick={() => setSelectedSerie({ id: playlist.id, title: playlist.title, type: 'dkiss' })}
              >
                🔍 Ver capítulos
              </button>
            </div>
          </div>
        ))}

        {/* Serie La Ley y el Orden - Tarjeta especial */}
        <div className="playlist-card law-order-card">
          <div className="playlist-thumbnail law-order-thumb">
            <span className="playlist-icon">⚖️</span>
            <span className="video-count">17 episodios (Temp 27)</span>
          </div>
          <div className="playlist-info">
            <h3>🎬 La Ley y el Orden: UVE</h3>
            <p>Temporada 27 completa - 17 episodios. Reproducción directa sin publicidad.</p>
            <button 
              className="view-btn law-order-btn"
              onClick={() => setSelectedSerie({ id: 'law_and_order', title: 'La Ley y el Orden: UVE', type: 'lawAndOrder' })}
            >
              📋 Ver episodios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};