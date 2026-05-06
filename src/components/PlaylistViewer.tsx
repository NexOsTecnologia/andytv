import React, { useState } from 'react';
import './PlaylistViewer.css';

interface PlaylistViewerProps {
  playlistTitle: string;
  videos: Array<{ title: string; videoId: string; duration?: string }>;
  onPlayVideo: (url: string, title: string) => void;
  onClose: () => void;
}

export const PlaylistViewer: React.FC<PlaylistViewerProps> = ({ 
  playlistTitle, 
  videos, 
  onPlayVideo, 
  onClose 
}) => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const playVideo = (videoId: string, title: string) => {
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    onPlayVideo(embedUrl, `${playlistTitle} - ${title}`);
    setSelectedVideo(videoId);
  };

  return (
    <div className="playlist-viewer">
      <div className="playlist-viewer-header">
        <button className="back-btn" onClick={onClose}>← Volver</button>
        <h2>{playlistTitle}</h2>
      </div>

      <div className="playlist-content">
        {/* Reproductor cuando hay un video seleccionado */}
        {selectedVideo && (
          <div className="video-preview">
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0`}
              className="preview-iframe"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Reproductor"
            />
          </div>
        )}

        {/* Lista de videos disponibles */}
        <div className="videos-list">
          <h3>📋 Capítulos disponibles ({videos.length})</h3>
          <div className="videos-grid">
            {videos.map((video, index) => (
              <div 
                key={video.videoId} 
                className={`video-item ${selectedVideo === video.videoId ? 'active' : ''}`}
                onClick={() => playVideo(video.videoId, video.title)}
              >
                <div className="video-thumbnail">
                  <img 
                    src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`} 
                    alt={video.title}
                    loading="lazy"
                  />
                  <span className="play-overlay">▶</span>
                </div>
                <div className="video-info">
                  <span className="video-number">#{index + 1}</span>
                  <span className="video-title">{video.title}</span>
                  {video.duration && <span className="video-duration">⏱️ {video.duration}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
