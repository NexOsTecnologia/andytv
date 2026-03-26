// ========== MÚLTIPLES FUENTES DE LISTAS M3U ==========
const SOURCES = [
    {
        name: 'Argentina IPTV',
        url: 'https://iptv-org.github.io/iptv/countries/ar.m3u',
        enabled: true
    },
    {
        name: 'Canales Argentina (YouTube)',
        url: 'https://abskmj.github.io/iptv-youtube-live/spanish.m3u8',
        enabled: true
    },
    {
        name: 'Deportes',
        url: 'https://iptv-org.github.io/iptv/categories/sports.m3u',
        enabled: true
    },
    {
        name: 'Películas (IPTV-org)',
        url: 'https://iptv-org.github.io/iptv/categories/movies.m3u',
        enabled: true
    },
    {
        name: 'Series (IPTV-org)',
        url: 'https://iptv-org.github.io/iptv/categories/series.m3u',
        enabled: true
    },
    {
        name: 'Entretenimiento',
        url: 'https://iptv-org.github.io/iptv/categories/entertainment.m3u',
        enabled: true
    },
    {
        name: 'Pluto TV (gratis)',
        url: 'https://raw.githubusercontent.com/Free-TV/IPTV/master/playlist.m3u8',
        enabled: true
    },
    {
        name: 'Todos TV (gratis)',
        url: 'https://iptv-org.github.io/iptv/index.m3u',
        enabled: true
    },
    {
        name: 'Plex Movies (gratis)',
        url: 'https://i.mjh.nz/Plex/movies.m3u8',
        enabled: true
    },
    {
        name: 'Plex TV Series (gratis)',
        url: 'https://i.mjh.nz/Plex/tv.m3u8',
        enabled: true
    },
    {
        name: 'Plex Latino',
        url: 'https://i.mjh.nz/Plex/latino.m3u8',
        enabled: true
    },
    {
        name: 'Samsung TV Plus (gratis)',
        url: 'https://raw.githubusercontent.com/iptv-org/iptv/master/stream/samsungtvplus_us.m3u',
        enabled: true
    },
    {
        name: 'Canales de Películas (gratis)',
        url: 'https://raw.githubusercontent.com/iptv-org/iptv/master/stream/movies.m3u',
        enabled: true
    },
    
    // ... fuentes existentes
    {
        name: 'Pluto TV (Free-TV)',
        url: 'https://raw.githubusercontent.com/Free-TV/IPTV/master/playlist.m3u8',
        enabled: true
    }
];
];

// Canales personalizados (solo los de YouTube que funcionan)
const CUSTOM_CHANNELS = [
    {
        name: 'C5N',
        logo: 'https://i.imgur.com/0jK7kqj.png',
        group: 'Argentina Noticias',
        url: 'https://ythls-v3.onrender.com/video/HFAW-7pMibc.m3u8'
    },
    {
        name: 'A24',
        logo: 'https://i.imgur.com/4Lc7qY8.png',
        group: 'Argentina Noticias',
        url: 'https://ythls-v3.onrender.com/video/SmvmdBNK-SM.m3u8'
    },
    {
        name: 'TN (AR12)',
        logo: 'https://i.imgur.com/JxTlGfK.png',
        group: 'Argentina Noticias',
        url: 'https://ythls-v3.onrender.com/video/ZNqtZkYqk_Y.m3u8'
    },
    {
        name: 'La Nación+',
        logo: 'https://i.imgur.com/1wQdRjL.png',
        group: 'Argentina Noticias',
        url: 'https://ythls-v3.onrender.com/video/dQeS5qQw7wI.m3u8'
    },
    {
        name: 'TyC Sports (muestra)',
        logo: 'https://i.imgur.com/ZlKqQYq.png',
        group: 'Deportes',
        url: 'https://ythls-v3.onrender.com/video/PuYbQlCq0Bc.m3u8'
    }
];

// Elementos del DOM
const channelListElement = document.getElementById('channelList');
const videoPlayer = document.getElementById('videoPlayer');
const currentChannelName = document.querySelector('#currentChannel .name');
const statusElement = document.getElementById('status');
const noChannelMessage = document.getElementById('noChannelMessage');
const searchInput = document.getElementById('searchInput');
const clearSearchBtn = document.getElementById('clearSearch');
const loadingOverlay = document.getElementById('loadingOverlay');

// Almacenar canales y estado
let allChannels = [];
let currentFilter = 'all';
let currentSearchTerm = '';
let favorites = new Set();
let hls = null;

// Proxy CORS gratuito (funciona mejor que el anterior)
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

// ========== FUNCIONES DE FAVORITOS ==========
function loadFavorites() {
    const saved = localStorage.getItem('andytv_favorites');
    if (saved) {
        try {
            const favArray = JSON.parse(saved);
            favorites = new Set(favArray);
        } catch (e) {
            console.error('Error cargando favoritos:', e);
        }
    }
}

function saveFavorites() {
    const favArray = Array.from(favorites);
    localStorage.setItem('andytv_favorites', JSON.stringify(favArray));
}

function toggleFavorite(globalIndex, event) {
    event.stopPropagation();
    if (favorites.has(globalIndex)) {
        favorites.delete(globalIndex);
    } else {
        favorites.add(globalIndex);
    }
    saveFavorites();
    renderFilteredChannels();
}

// ========== FUNCIONES DE STREAM (MEJORADAS) ==========
function detectStreamFormat(url) {
    if (!url) return 'unknown';
    const lowerUrl = url.toLowerCase();
    if (lowerUrl.endsWith('.m3u8') || lowerUrl.includes('.m3u8?')) return 'hls';
    if (lowerUrl.endsWith('.mp4') || lowerUrl.includes('.mp4?')) return 'mp4';
    return 'direct';
}

// IMPORTANTE: Incluir dominios problemáticos de Argentina
function needsProxy(url) {
    const blockedDomains = [
        'qaotic.net', 
        'prepublish', 
        'f.qaotic',
        'america',
        'telefe',
        'cdn.com'
    ];
    return blockedDomains.some(domain => url.toLowerCase().includes(domain));
}

function playStream(originalUrl) {
    return new Promise((resolve, reject) => {
        const useProxy = needsProxy(originalUrl);
        const finalUrl = useProxy ? CORS_PROXY + originalUrl : originalUrl;
        
        if (useProxy) console.log('🔄 Usando proxy CORS para:', originalUrl);
        
        if (hls) {
            hls.destroy();
            hls = null;
        }
        
        videoPlayer.pause();
        videoPlayer.removeAttribute('src');
        videoPlayer.load();
        
        const format = detectStreamFormat(originalUrl);
        console.log(`📺 Reproduciendo: ${originalUrl} (formato: ${format})`);
        
        let badge = document.querySelector('.stream-format-badge');
        if (!badge) {
            badge = document.createElement('div');
            badge.className = 'stream-format-badge';
            const playerContainer = document.querySelector('.player-container');
            if (playerContainer) playerContainer.appendChild(badge);
        }
        if (badge) badge.textContent = format.toUpperCase() + (useProxy ? ' 🔄' : '');
        
        if (format === 'hls' && Hls && Hls.isSupported()) {
            hls = new Hls({
                enableWorker: true,
                lowLatencyMode: true,
                maxBufferLength: 30,
                maxMaxBufferLength: 60
            });
            
            hls.loadSource(finalUrl);
            hls.attachMedia(videoPlayer);
            
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                videoPlayer.play().then(() => resolve(true)).catch(reject);
            });
            
            hls.on(Hls.Events.ERROR, (event, data) => {
                console.error('HLS Error:', data);
                if (data.fatal) reject(new Error(`Error HLS: ${data.type}`));
            });
        } else if (format === 'hls' && (!Hls || !Hls.isSupported())) {
            // Safari con HLS nativo
            videoPlayer.src = finalUrl;
            videoPlayer.load();
            videoPlayer.play().then(() => resolve(true)).catch(reject);
        } else {
            videoPlayer.src = finalUrl;
            videoPlayer.load();
            videoPlayer.play().then(() => resolve(true)).catch(reject);
        }
    });
}

// ========== FUNCIONES DE PARSING M3U (MEJORADA) ==========
async function parseM3U(content, sourceName) {
    const lines = content.split('\n');
    const channelsArray = [];
    let currentChannel = {};
    
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        
        if (line.startsWith('#EXTINF')) {
            // Extraer nombre (todo después de la última coma)
            const lastCommaIndex = line.lastIndexOf(',');
            const name = lastCommaIndex !== -1 ? line.substring(lastCommaIndex + 1).trim() : 'Canal sin nombre';
            
            // Extraer logo
            const logoMatch = line.match(/tvg-logo="([^"]*)"/);
            const logo = logoMatch ? logoMatch[1] : null;
            
            // Extraer grupo
            const groupMatch = line.match(/group-title="([^"]*)"/);
            let group = groupMatch ? groupMatch[1] : sourceName;
            
            // Limpiar nombres de grupos para mejor organización
            if (group.includes('AR')) group = '🇦🇷 Argentina';
            if (group.includes('Sports') || group.includes('Deportes')) group = '⚽ Deportes';
            if (group.includes('Movies') || group.includes('Películas')) group = '🎬 Películas';
            if (group.includes('Series') || group.includes('TV Shows')) group = '📺 Series';
            
            currentChannel = { name, logo, group, url: '', source: sourceName };
        } 
        else if (line.startsWith('http') && currentChannel.name) {
            currentChannel.url = line;
            if (currentChannel.url && currentChannel.name !== 'Canal sin nombre') {
                channelsArray.push({ ...currentChannel });
            }
            currentChannel = {};
        }
    }
    
    return channelsArray;
}

// ========== CARGAR TODAS LAS FUENTES ==========
async function loadAllChannels() {
    allChannels = [];
    
    // 1. Agregar canales personalizados de YouTube
    CUSTOM_CHANNELS.forEach(channel => {
        allChannels.push({ ...channel, source: 'Personalizados' });
    });
    
    // 2. Cargar cada fuente M3U
    for (const source of SOURCES) {
        if (!source.enabled) continue;
        
        try {
            statusElement.textContent = `📡 Cargando ${source.name}...`;
            const response = await fetch(source.url);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const m3uContent = await response.text();
            const channelsFromSource = await parseM3U(m3uContent, source.name);
            
            // Agregar canales sin duplicados por URL
            channelsFromSource.forEach(ch => {
                // Verificar si ya existe un canal con la misma URL
                const exists = allChannels.some(existing => existing.url === ch.url);
                if (!exists) {
                    allChannels.push(ch);
                }
            });
            
            console.log(`✅ ${source.name}: ${channelsFromSource.length} canales agregados`);
        } catch (error) {
            console.error(`❌ Error cargando ${source.name}:`, error.message);
        }
    }
    
    statusElement.textContent = `✅ ${allChannels.length} canales cargados correctamente`;
    statusElement.style.color = '#4caf50';
    renderFilteredChannels();
}

// ========== FILTRADO Y RENDERIZADO ==========
function getFilteredChannels() {
    let result = [...allChannels];
    
    if (currentSearchTerm.trim() !== '') {
        const term = currentSearchTerm.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        result = result.filter(channel => {
            const name = channel.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            const group = (channel.group || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            return name.includes(term) || group.includes(term);
        });
    }
    
    if (currentFilter === 'favorites') {
        result = result.filter(channel => {
            const idx = allChannels.findIndex(c => c.name === channel.name && c.url === channel.url);
            return favorites.has(idx);
        });
    }
    
    return result;
}

function renderFilteredChannels() {
    const filteredChannels = getFilteredChannels();
    
    if (filteredChannels.length === 0) {
        channelListElement.innerHTML = `<div class="no-results">📺 No se encontraron canales<br>${currentFilter === 'favorites' ? 'Agregá algunos a favoritos' : 'Probá con otra búsqueda'}</div>`;
        return;
    }
    
    const groups = {};
    filteredChannels.forEach(channel => {
        const group = channel.group || 'General';
        if (!groups[group]) groups[group] = [];
        groups[group].push(channel);
    });
    
    // Ordenar grupos
    const sortedGroups = Object.keys(groups).sort((a, b) => {
        if (a.includes('Argentina')) return -1;
        if (b.includes('Argentina')) return 1;
        return a.localeCompare(b);
    });
    
    let html = `
        <div class="filter-bar">
            <button class="filter-btn ${currentFilter === 'all' ? 'active' : ''}" data-filter="all">📺 Todos (${allChannels.length})</button>
            <button class="filter-btn ${currentFilter === 'favorites' ? 'active' : ''}" data-filter="favorites">⭐ Favoritos (${favorites.size})</button>
        </div>
    `;
    
    for (const groupName of sortedGroups) {
        const groupChannels = groups[groupName];
        html += `<div class="channel-group-header" style="padding: 0.5rem 1rem; background: #1a1a1a; font-size: 0.75rem; color: #ffaa33; font-weight: bold;">${escapeHtml(groupName)}</div>`;
        
        groupChannels.forEach(channel => {
            const originalIndex = allChannels.findIndex(c => c.name === channel.name && c.url === channel.url);
            const isFavorite = favorites.has(originalIndex);
            const firstLetter = channel.name.charAt(0).toUpperCase();
            
            html += `
                <div class="channel-item" data-original-index="${originalIndex}">
                    <div class="channel-logo">
                        ${channel.logo ? `<img src="${channel.logo}" alt="${channel.name}" onerror="this.style.display='none'; this.parentElement.innerHTML='<span>${firstLetter}</span>'">` : `<span>${firstLetter}</span>`}
                    </div>
                    <div class="channel-info">
                        <div class="channel-name">${escapeHtml(channel.name)}</div>
                        <div class="channel-group">${escapeHtml(channel.group)}</div>
                    </div>
                    <div class="favorite-star ${isFavorite ? 'active' : ''}" data-index="${originalIndex}">
                        ${isFavorite ? '★' : '☆'}
                    </div>
                </div>
            `;
        });
    }
    
    channelListElement.innerHTML = html;
    
    document.querySelectorAll('.channel-item').forEach(item => {
        const originalIndex = parseInt(item.dataset.originalIndex);
        
        item.addEventListener('click', (e) => {
            if (e.target.classList.contains('favorite-star')) return;
            playChannel(originalIndex);
            document.querySelectorAll('.channel-item').forEach(el => el.classList.remove('active'));
            item.classList.add('active');
        });
        
        const star = item.querySelector('.favorite-star');
        if (star) {
            star.addEventListener('click', (e) => {
                const idx = parseInt(star.dataset.index);
                toggleFavorite(idx, e);
            });
        }
    });
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentFilter = btn.dataset.filter;
            renderFilteredChannels();
        });
    });
}

// ========== REPRODUCIR CANAL ==========
async function playChannel(globalIndex) {
    const channel = allChannels[globalIndex];
    if (!channel || !channel.url) {
        statusElement.textContent = '❌ El canal no tiene URL válida';
        statusElement.style.color = '#ff6666';
        return;
    }
    
    if (loadingOverlay) loadingOverlay.style.display = 'flex';
    if (noChannelMessage) noChannelMessage.style.display = 'none';
    
    currentChannelName.textContent = channel.name;
    document.title = `🎸 Reproduciendo: ${channel.name} - AndyTV`;
    statusElement.textContent = `🔄 Cargando stream: ${channel.name}...`;
    statusElement.style.color = '#ffaa33';
    
    try {
        await playStream(channel.url);
        statusElement.textContent = `✅ Reproduciendo: ${channel.name}`;
        statusElement.style.color = '#4caf50';
    } catch (error) {
        console.error('Error reproduciendo:', error);
        statusElement.textContent = `❌ Error: No se pudo reproducir ${channel.name}`;
        statusElement.style.color = '#ff6666';
    } finally {
        if (loadingOverlay) loadingOverlay.style.display = 'none';
    }
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function handleSearch() {
    currentSearchTerm = searchInput.value;
    clearSearchBtn.style.display = currentSearchTerm ? 'block' : 'none';
    renderFilteredChannels();
}

function clearSearch() {
    searchInput.value = '';
    handleSearch();
    searchInput.focus();
}

searchInput.addEventListener('input', handleSearch);
clearSearchBtn.addEventListener('click', clearSearch);

videoPlayer.addEventListener('error', (e) => {
    console.error('Error de video:', videoPlayer.error);
    if (videoPlayer.error) {
        statusElement.textContent = `❌ Error: ${videoPlayer.error.message || 'No se pudo reproducir el stream'}`;
        statusElement.style.color = '#ff6666';
    }
    if (loadingOverlay) loadingOverlay.style.display = 'none';
});

// ========== INICIALIZAR ==========
loadFavorites();
loadAllChannels();

console.log('🎬 AndyTV iniciado - Con canales de Argentina, YouTube, Plex y más');