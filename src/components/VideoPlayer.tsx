import React, { useState, useRef, useEffect } from 'react';
import Hls from 'hls.js';
import { Channel } from '../types';
import './VideoPlayer.css';
import { DKISSCatalog } from './DKISSCatalog';

interface VideoPlayerProps {
  channel: Channel | null;
  onError?: (error: Error) => void;
  onChannelChange?: (channel: Channel) => void;
}

// Función para parsear un archivo M3U y extraer los episodios (fuera del componente)
const parseM3UEpisodes = async (m3uUrl: string): Promise<{ name: string; url: string }[]> => {
  try {
    const response = await fetch(m3uUrl);
    const content = await response.text();
    const lines = content.split('\n');
    const episodes: { name: string; url: string }[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('#EXTINF:')) {
        const nameMatch = line.match(/, (.+)$/);
        const name = nameMatch ? nameMatch[1] : `Episodio ${episodes.length + 1}`;
        const urlLine = lines[i + 1]?.trim();
        if (urlLine && (urlLine.startsWith('http') || urlLine.startsWith('https'))) {
          episodes.push({ name, url: urlLine });
        }
      }
    }
    return episodes;
  } catch (error) {
    console.error('Error parsing M3U:', error);
    return [];
  }
};

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ channel, onError, onChannelChange }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const [isDKISSCatalog, setIsDKISSCatalog] = useState(false);
  const [isM3USerie, setIsM3USerie] = useState(false);
  const [episodesList, setEpisodesList] = useState<{ name: string; url: string }[]>([]);

  console.log('🎬 VideoPlayer:', channel?.name, 'Tipo:', channel?.type);

  const isCuevanaUrl = (url: string): boolean => {
    return url.includes('cuevana') || 
           url.includes('player.cuevana3.eu') ||
           url.includes('cuevana3.nu') ||
           url.includes('wv3.cuevana3.eu');
  };

  // Función para iniciar reproducción HLS normal
  const startHLSPlayback = (url: string) => {
    const video = videoRef.current;
    if (!video) return;

    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    video.pause();
    video.removeAttribute('src');
    video.load();

    const playVideo = () => {
      video.play()
        .then(() => setIsLoading(false))
        .catch((err) => {
          console.error('Error:', err);
          setError('Error al reproducir');
          onError?.(err);
          setIsLoading(false);
        });
    };

    if (Hls.isSupported()) {
      const hls = new Hls({ debug: false });
      hls.loadSource(url);
      hls.attachMedia(video);
      hlsRef.current = hls;
      hls.on(Hls.Events.MANIFEST_PARSED, () => playVideo());
      hls.on(Hls.Events.ERROR, () => {
        setError('Error al cargar');
        setIsLoading(false);
      });
    } else {
      video.src = url;
      playVideo();
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    
    setIsLoading(true);
    setError(null);
    setIsDKISSCatalog(false);
    setIsM3USerie(false);
    setEpisodesList([]);
    setEmbedUrl(null);
    
    if (!channel?.url) {
      setIsLoading(false);
      return;
    }

    // DKISS Catalog
    if (channel.type === 'dkiss') {
      setIsDKISSCatalog(true);
      setIsLoading(false);
      return;
    }

    // Detectar si es una lista M3U que contiene episodios (serie)
    if (channel.type === 'hls' && channel.url.includes('.m3u8') && channel.url.includes('ley_y_orden')) {
      parseM3UEpisodes(channel.url).then(episodes => {
        if (episodes.length > 0) {
          setEpisodesList(episodes);
          setIsM3USerie(true);
          setIsLoading(false);
        } else {
          startHLSPlayback(channel.url);
        }
      });
      return;
    }

    // Cualquier URL de YouTube
    if (channel.url.includes('youtube.com') || channel.url.includes('youtu.be') || channel.type === 'youtube') {
      let finalUrl = channel.url;
      if (finalUrl.includes('watch?v=')) {
        const videoId = finalUrl.match(/watch\?v=([^&]+)/)?.[1];
        if (videoId) {
          finalUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
        }
      }
      if (!finalUrl.includes('autoplay=') && finalUrl.includes('embed')) {
        finalUrl = finalUrl + '&autoplay=1';
      }
      setEmbedUrl(finalUrl);
      setIsLoading(false);
      return;
    }

    // Iframe directo
    if (channel.type === 'iframe') {
      let finalUrl = channel.url;
      if (!finalUrl.includes('autoplay=')) {
        const separator = finalUrl.includes('?') ? '&' : '?';
        finalUrl = `${finalUrl}${separator}autoplay=1`;
      }
      setEmbedUrl(finalUrl);
      setIsLoading(false);
      return;
    }

    // Webpage
    if (channel.type === 'webpage') {
      setEmbedUrl(channel.url);
      setIsLoading(false);
      return;
    }

    // URL de Cuevana
    if (isCuevanaUrl(channel.url)) {
      let finalUrl = channel.url;
      if (!finalUrl.includes('autoplay=')) {
        const separator = finalUrl.includes('?') ? '&' : '?';
        finalUrl = `${finalUrl}${separator}autoplay=1`;
      }
      setEmbedUrl(finalUrl);
      setIsLoading(false);
      return;
    }

    // HLS normal
    startHLSPlayback(channel.url);

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [channel, onError]);

  if (!channel) {
    return (
      <div className="video-player-container">
        <div className="no-channel">
          <div className="no-channel-icon">📺</div>
          <p>Seleccioná un canal</p>
        </div>
      </div>
    );
  }

  // DKISS Catalog
  if (isDKISSCatalog || channel.type === 'dkiss') {
    return (
      <DKISSCatalog 
        onPlayVideo={(url, title) => {
          onChannelChange?.({
            id: `play_${Date.now()}`,
            name: title,
            group: 'Reproducción',
            url: url,
            type: 'youtube'
          });
        }}
        onClose={() => {}}
      />
    );
  }

  // Selector de episodios (M3U como serie)
  if (isM3USerie && episodesList.length > 0) {
    return (
      <div className="episodes-selector">
        <div className="episodes-header">
          <h2>📺 {channel.name}</h2>
          <p>Seleccioná un episodio para reproducir</p>
        </div>
        <div className="episodes-grid">
          {episodesList.map((ep, idx) => (
            <div key={idx} className="episode-card">
              <div className="episode-number">Episodio {idx + 1}</div>
              <div className="episode-title">{ep.name}</div>
              <button 
                className="play-episode-btn"
                onClick={() => {
                  setEmbedUrl(ep.url);
                  setIsM3USerie(false);
                  setEpisodesList([]);
                  setIsLoading(false);
                }}
              >
                ▶ Ver episodio
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Iframe con sandbox mejorado
  if (embedUrl) {
    const isCuevana = isCuevanaUrl(embedUrl);
    const sandboxConfig = isCuevana 
      ? "allow-same-origin allow-scripts allow-forms allow-modals allow-popups-to-escape-sandbox"
      : "allow-same-origin allow-scripts allow-popups allow-forms allow-modals";
    
    const extraProps = isCuevana ? {
      sandbox: sandboxConfig,
      referrerPolicy: "no-referrer" as const,
      loading: "eager" as const
    } : {
      sandbox: sandboxConfig
    };

    return (
      <div className="video-player-container">
        <iframe
          ref={iframeRef}
          src={embedUrl}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            position: 'absolute',
            top: 0,
            left: 0
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          allowFullScreen
          title={channel.name}
          {...extraProps}
        />
        {isLoading && (
          <div className="loading-overlay">
            <div className="spinner"></div>
            <span>Cargando...</span>
          </div>
        )}
      </div>
    );
  }

  // Video HLS
  return (
    <div className="video-player-container">
      <video ref={videoRef} className="video-element" controls autoPlay playsInline />
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <span>Cargando {channel.name}...</span>
        </div>
      )}
      {error && (
        <div className="error-overlay">
          <div className="error-icon">⚠️</div>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};