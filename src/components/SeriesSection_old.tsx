import React, { useState } from 'react';

interface Serie {
  id: string;
  title: string;
  genre: string;
  year: string;
  description: string;
  source: 'youtube' | 'plex' | 'pluto';
  url: string;
  isPlaylist?: boolean;
}

const RECOMMENDED_SERIES: Serie[] = [
  {
    id: '1',
    title: 'The Office (Capítulos completos)',
    genre: 'Comedia',
    year: '2005',
    description: 'Serie documental sobre la vida en una oficina.',
    source: 'youtube',
    url: 'https://www.youtube.com/playlist?list=PLK5HARgNfgj8yJ7YxXxXxXxXxXxXxXxX',
    isPlaylist: true
  },
  {
    id: '2',
    title: 'Friends (Mejores momentos)',
    genre: 'Comedia',
    year: '1994',
    description: 'Seis amigos navegan la vida en Nueva York.',
    source: 'youtube',
    url: 'https://www.youtube.com/watch?v=xyz123',
    isPlaylist: false
  },
  {
    id: '3',
    title: 'Star Trek: The Next Generation',
    genre: 'Ciencia ficción',
    year: '1987',
    description: 'Las aventuras de la nave estelar USS Enterprise-D.',
    source: 'plex',
    url: 'https://watch.plex.tv/show/star-trek-the-next-generation',
    isPlaylist: false
  }
];

interface SeriesSectionProps {
  onPlaySerie?: (url: string, title: string, isPlaylist: boolean) => void;
}

export const SeriesSection: React.FC<SeriesSectionProps> = ({ onPlaySerie }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [selectedSource, setSelectedSource] = useState<'all' | 'youtube' | 'plex' | 'pluto'>('all');

  const filteredSeries = RECOMMENDED_SERIES.filter(serie => {
    const matchesSearch = serie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          serie.genre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSource = selectedSource === 'all' || serie.source === selectedSource;
    return matchesSearch && matchesSource;
  });

  const extractYouTubeId = (url: string): { id: string; isPlaylist: boolean } | null => {
    const videoMatch = url.match(/(?:youtube\.com\/watch\?v=)([^&]+)|(?:youtu\.be\/)([^?]+)/);
    if (videoMatch) {
      return { id: videoMatch[1] || videoMatch[2], isPlaylist: false };
    }
    const playlistMatch = url.match(/[&?]list=([^&]+)/);
    if (playlistMatch) {
      return { id: playlistMatch[1], isPlaylist: true };
    }
    return null;
  };

  const handleCustomUrl = () => {
    if (!customUrl.trim()) return;
    if (onPlaySerie) {
      const isYouTube = customUrl.includes('youtube.com') || customUrl.includes('youtu.be');
      onPlaySerie(customUrl, 'URL personalizada', isYouTube);
      setCustomUrl('');
    }
  };

  return (
    <div style={{
      background: '#111',
      borderRadius: '16px',
      padding: '24px',
      minHeight: '500px'
    }}>
      <h2 style={{
        fontSize: '1.8rem',
        background: 'linear-gradient(135deg, #ff3366, #ff6b6b)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textAlign: 'center',
        marginBottom: '8px'
      }}>
        🎬 Series y Contenido
      </h2>
      <p style={{ textAlign: 'center', color: '#888', marginBottom: '24px' }}>
        Buscá series en YouTube o pegá tu enlace favorito
      </p>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="🔍 Buscar series por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: '30px',
            border: 'none',
            background: '#1e1e1e',
            color: '#fff',
            fontSize: '14px',
            outline: 'none'
          }}
        />
      </div>

      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="🔗 Pegá URL de YouTube, Plex o Pluto TV"
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleCustomUrl()}
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '30px',
              border: 'none',
              background: '#1e1e1e',
              color: '#fff',
              fontSize: '14px',
              outline: 'none'
            }}
          />
          <button
            onClick={handleCustomUrl}
            style={{
              padding: '12px 24px',
              borderRadius: '30px',
              border: 'none',
              background: '#ff3366',
              color: '#fff',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Reproducir
          </button>
        </div>
        <p style={{ fontSize: '11px', color: '#666', marginTop: '8px' }}>
          💡 Ejemplos: URL de YouTube, enlace de Plex, o cualquier stream directo
        </p>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <button
          onClick={() => setSelectedSource('all')}
          style={{
            padding: '8px 16px',
            borderRadius: '30px',
            border: 'none',
            background: selectedSource === 'all' ? '#ff3366' : '#1e1e1e',
            color: '#fff',
            cursor: 'pointer'
          }}
        >
          📺 Todos ({RECOMMENDED_SERIES.length})
        </button>
        <button
          onClick={() => setSelectedSource('youtube')}
          style={{
            padding: '8px 16px',
            borderRadius: '30px',
            border: 'none',
            background: selectedSource === 'youtube' ? '#ff3366' : '#1e1e1e',
            color: '#fff',
            cursor: 'pointer'
          }}
        >
          🎬 YouTube ({RECOMMENDED_SERIES.filter(s => s.source === 'youtube').length})
        </button>
        <button
          onClick={() => setSelectedSource('plex')}
          style={{
            padding: '8px 16px',
            borderRadius: '30px',
            border: 'none',
            background: selectedSource === 'plex' ? '#ff3366' : '#1e1e1e',
            color: '#fff',
            cursor: 'pointer'
          }}
        >
          🎬 Plex ({RECOMMENDED_SERIES.filter(s => s.source === 'plex').length})
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}>
        {filteredSeries.map(serie => (
          <div
            key={serie.id}
            style={{
              background: '#1a1a1a',
              borderRadius: '12px',
              overflow: 'hidden',
              transition: 'transform 0.2s',
              cursor: 'pointer'
            }}
            onClick={() => {
              if (onPlaySerie) {
                onPlaySerie(serie.url, serie.title, serie.isPlaylist || false);
              }
            }}
          >
            <div style={{
              height: '140px',
              background: serie.source === 'youtube' 
                ? 'linear-gradient(135deg, #ff0000, #cc0000)' 
                : 'linear-gradient(135deg, #ff3366, #ff6b6b)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px'
            }}>
              {serie.source === 'youtube' ? '🎬' : '📺'}
            </div>
            <div style={{ padding: '16px' }}>
              <h3 style={{ color: '#fff', fontSize: '1rem', marginBottom: '8px' }}>
                {serie.title}
              </h3>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '8px', fontSize: '12px', color: '#888' }}>
                <span>{serie.year}</span>
                <span>{serie.genre}</span>
              </div>
              <p style={{ color: '#aaa', fontSize: '12px', lineHeight: '1.4' }}>
                {serie.description}
              </p>
              <button
                style={{
                  marginTop: '12px',
                  width: '100%',
                  padding: '8px',
                  borderRadius: '30px',
                  border: 'none',
                  background: serie.source === 'youtube' ? '#ff0000' : '#ff3366',
                  color: '#fff',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                ▶ Reproducir
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredSeries.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px', color: '#666' }}>
          <span style={{ fontSize: '48px' }}>📺</span>
          <p>No se encontraron series</p>
        </div>
      )}
    </div>
  );
};