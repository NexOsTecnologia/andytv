// src/utils/cuevanaParser.ts

export const getCuevanaPlayerUrl = async (episodeUrl: string): Promise<string | null> => {
  try {
    // 1. Obtener la URL del player desde la página del episodio
    const proxyUrl = `https://cors-anywhere.herokuapp.com/${episodeUrl}`;
    const response = await fetch(proxyUrl);
    const html = await response.text();
    
    const jsonMatch = html.match(/<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/s);
    if (!jsonMatch?.[1]) return null;
    
    const data = JSON.parse(jsonMatch[1]);
    const playerUrl = data?.props?.pageProps?.episode?.videos?.english?.[0]?.result;
    if (!playerUrl) return null;

    console.log('🎬 URL del player obtenida:', playerUrl);

    // 2. Obtener la página del player para extraer el video real
    const playerResponse = await fetch(`https://cors-anywhere.herokuapp.com/${playerUrl}`);
    const playerHtml = await playerResponse.text();
    
    // Buscar el archivo de video (.m3u8 o .mp4)
    // Método 1: Buscar en scripts
    const m3u8Match = playerHtml.match(/file:\s*"([^"]+\.m3u8[^"]*)"/);
    if (m3u8Match) {
      console.log('🎬 Video M3U8 encontrado:', m3u8Match[1]);
      return m3u8Match[1];
    }
    
    // Método 2: Buscar en iframes o sources
    const mp4Match = playerHtml.match(/src:\s*"([^"]+\.mp4[^"]*)"/);
    if (mp4Match) {
      console.log('🎬 Video MP4 encontrado:', mp4Match[1]);
      return mp4Match[1];
    }
    
    // Método 3: Buscar en el HTML general
    const sourceMatch = playerHtml.match(/<source[^>]+src="([^"]+\.(?:m3u8|mp4)[^"]*)"/);
    if (sourceMatch) {
      console.log('🎬 Source encontrado:', sourceMatch[1]);
      return sourceMatch[1];
    }
    
    // Si no encontramos el video directo, devolvemos el player.php
    // (se abrirá en iframe, pero con menos publicidad)
    console.log('⚠️ No se encontró video directo, usando player.php');
    return playerUrl;
    
  } catch (error) {
    console.error('Error obteniendo video:', error);
    return null;
  }
};