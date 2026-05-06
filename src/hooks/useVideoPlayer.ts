import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

interface UseVideoPlayerProps {
  url: string;
  type: 'hls' | 'dash' | 'iframe' | 'youtube';
  onError?: (error: Error) => void;
  onPlaying?: () => void;
}

export const useVideoPlayer = ({ url, type, onError, onPlaying }: UseVideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hlsRef = useRef<Hls | null>(null);

  // Para YouTube, convertir URL de watch a embed si es necesario
  const getYouTubeEmbedUrl = (inputUrl: string): string => {
    // Si ya es embed, asegurar parámetros
    if (inputUrl.includes('/embed/')) {
      const hasAutoplay = inputUrl.includes('autoplay=');
      return hasAutoplay ? inputUrl : `${inputUrl}?autoplay=1&mute=0&rel=0`;
    }
    
    // Convertir URL de watch a embed
    const videoId = inputUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?]+)/)?.[1];
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&rel=0`;
    }
    
    return inputUrl;
  };

  // Para iframe normal (no YouTube)
  const getIframeUrl = (inputUrl: string): string => {
    // Asegurar autoplay si no está presente
    if (!inputUrl.includes('autoplay=')) {
      const separator = inputUrl.includes('?') ? '&' : '?';
      return `${inputUrl}${separator}autoplay=1`;
    }
    return inputUrl;
  };

  useEffect(() => {
    // Si es iframe o youtube, no usamos video element
    if (type === 'iframe' || type === 'youtube') {
      setIsLoading(false);
      setError(null);
      onPlaying?.();
      return;
    }

    const video = videoRef.current;
    if (!video || !url) return;

    setIsLoading(true);
    setError(null);

    // Limpiar reproductores anteriores
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    video.pause();
    video.removeAttribute('src');
    video.load();

    const playVideo = () => {
      video.play()
        .then(() => {
          setIsLoading(false);
          onPlaying?.();
        })
        .catch((err) => {
          console.error('Error al reproducir:', err);
          setError('Error al reproducir');
          onError?.(err);
          setIsLoading(false);
        });
    };

    // Reproducción según tipo
    if (type === 'hls' && Hls.isSupported()) {
      const hls = new Hls({
        debug: false,
        enableWorker: true,
        lowLatencyMode: true,
        maxBufferLength: 30
      });
      
      hls.loadSource(url);
      hls.attachMedia(video);
      hlsRef.current = hls;

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        playVideo();
      });

      hls.on(Hls.Events.ERROR, (_, data) => {
        console.error('HLS Error:', data);
        if (data.fatal) {
          setError('Error de red');
          onError?.(new Error(data.type));
          setIsLoading(false);
        }
      });
    } 
    else {
      // Fallback directo (MP4, etc.)
      video.src = url;
      playVideo();
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [url, type, onError, onPlaying]);

  const isIframe = type === 'iframe' || type === 'youtube';
  
  // Obtener URL correcta para iframe
  const iframeUrl = isIframe 
    ? (type === 'youtube' ? getYouTubeEmbedUrl(url) : getIframeUrl(url))
    : '';

  return { 
    videoRef, 
    iframeRef,
    iframeUrl,
    isLoading, 
    error, 
    isIframe 
  };
};
