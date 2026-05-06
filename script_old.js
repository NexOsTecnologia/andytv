// URL de la lista M3U de Argentina
const M3U_URL = 'https://iptv-org.github.io/iptv/countries/ar.m3u';

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
let channels = [];
let allChannels = [];
let currentFilter = 'all';
let currentSearchTerm = '';
let favorites = new Set();
let hls = null;
let currentStreamUrl = '';
let currentStreamFormat = '';

// Proxy CORS gratuito
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

// ========== FUNCIONES DE STREAM ==========
function detectStreamFormat(url) {
    if (!url) return 'unknown';
    const lowerUrl = url.toLowerCase();
    if (lowerUrl.endsWith('.m3u8') || lowerUrl.includes('.m3u8?')) return 'hls';
    if (lowerUrl.endsWith('.mp4') || lowerUrl.includes('.mp4?')) return 'mp4';
    if (lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be')) return 'youtube';
    if (lowerUrl.includes('twitch.tv')) return 'twitch';
    return 'direct';
}

// Verificar si una URL necesita proxy
function needsProxy(url) {
    const blockedDomains = ['qaotic.net', 'america', 'prepublish', 'f.qaotic'];
    return blockedDomains.some(domain => url.toLowerCase().includes(domain));
}

// Función principal de reproducción CORREGIDA
function playStream(originalUrl) {
    return new Promise((resolve, reject) => {
        // Determinar si usar proxy
        const useProxy = needsProxy(originalUrl);
        const finalUrl = useProxy ? CORS_PROXY + originalUrl : originalUrl;
        
        if (useProxy) {
            console.log('🔄 Usando proxy CORS para:', originalUrl);
        }
        
        // Detener reproducción anterior
        if (hls) {
            hls.destroy();
            hls = null;
        }
        
        videoPlayer.pause();
        videoPlayer.removeAttribute('src');
        videoPlayer.load();
        
        const format = detectStreamFormat(originalUrl);
        currentStreamUrl = originalUrl;
        currentStreamFormat = format;
        
        console.log(`📺 Reproduciendo: ${originalUrl} (formato: ${format})${useProxy ? ' [via proxy]' : ''}`);
        
        // Badge de formato
        let badge = document.querySelector('.stream-format-badge');
        if (!badge) {
            badge = document.createElement('div');
            badge.className = 'stream-format-badge';
            document.querySelector('.player-container').appendChild(badge);
        }
        badge.textContent = format.toUpperCase() + (useProxy ? ' 🔄' : '');
        
        // Reproducción según formato
        if (format === 'hls' && Hls.isSupported()) {
            // Usar HLS.js
            hls = new Hls({
                enableWorker: true,
                lowLatencyMode: true,
                maxBufferLength: 30,
                maxMaxBufferLength: 60
            });
            
            // Configurar xhr para que los segmentos también usen proxy si es necesario
            if (useProxy) {
                hls.on(Hls.Events.XHR_SETUP, (event, xhrSetup) => {
                    xhrSetup.xhr.setRequestHeader('Origin', window.location.origin);
                });
            }
            
            hls.loadSource(finalUrl);
            hls.attachMedia(videoPlayer);
            
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                console.log('✅ Manifest HLS cargado');
                videoPlayer.play()
                    .then(() => resolve(true))
                    .catch(reject);
            });
            
            hls.on(Hls.Events.ERROR, (event, data) => {
                console.error('❌ Error HLS:', data);
                if (data.fatal) {
                    reject(new Error(`Error HLS: ${data.type}`));
                }
            });
            
        } else if (format === 'hls' && !Hls.isSupported()) {
            // Safari (HLS nativo)
            videoPlayer.src = finalUrl;
            videoPlayer.load();
            videoPlayer.play()
                .then(() => resolve(true))
                .catch(reject);
                
        } else {
            // MP4 o stream directo
            videoPlayer.src = finalUrl;
            videoPlayer.load();
            videoPlayer.play()
                .then(() => resolve(true))
                .catch(reject);
        }
    });
}

// ========== FUNCIONES DE PARSING M3U ==========
async function parseM3U(content) {
    const lines = content.split('\n');
    const channelsArray = [];
    let currentChannel = {};
    
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        
        if (line.startsWith('#EXTINF')) {
            const match = line.match(/,([^,]+)$/);
            const name = match ? match[1].trim() : 'Canal sin nombre';
            const logoMatch = line.match(/tvg-logo="([^"]*)"/);
            const logo = logoMatch ? logoMatch[1] : null;
            const groupMatch = line.match(/group-title="([^"]*)"/);
            const group = groupMatch ? groupMatch[1] : 'General';
            
            currentChannel = { name, logo, group, url: '' };
        } 
        else if (line.startsWith('http') && currentChannel.name) {
            currentChannel.url = line;
            if (currentChannel.url) {
                channelsArray.push({ ...currentChannel });
            }
            currentChannel = {};
        }
    }
    
    return channelsArray;
}

// ========== CARGA DE CANALES ==========
async function loadChannels() {
    try {
        statusElement.textContent = '📡 Descargando lista de canales...';
        statusElement.style.color = '#ffaa33';
        
        const response = await fetch(M3U_URL);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const m3uContent = await response.text();
        statusElement.textContent = '⚙️ Procesando lista de canales...';
        
        allChannels = await parseM3U(m3uContent);
        
        if (allChannels.length === 0) throw new Error('No se encontraron canales');
        
        statusElement.textContent = `✅ ${allChannels.length} canales cargados correctamente`;
        statusElement.style.color = '#4caf50';
        
        renderFilteredChannels();
        
    } catch (error) {
        console.error('Error:', error);
        statusElement.textContent = `❌ Error: ${error.message}`;
        statusElement.style.color = '#ff6666';
        channelListElement.innerHTML = `<div class="loading">Error al cargar canales. Verifica tu conexión.</div>`;
    }
}

// ========== FILTRADO Y RENDERIZADO ==========
function getFilteredChannels() {
    let result = [...allChannels];
    
    if (currentSearchTerm.trim() !== '') {
        const term = currentSearchTerm.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        result = result.filter(channel => {
            const name = channel.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            const group = channel.group.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
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
    
    let html = `
        <div class="filter-bar">
            <button class="filter-btn ${currentFilter === 'all' ? 'active' : ''}" data-filter="all">📺 Todos (${allChannels.length})</button>
            <button class="filter-btn ${currentFilter === 'favorites' ? 'active' : ''}" data-filter="favorites">⭐ Favoritos (${favorites.size})</button>
        </div>
    `;
    
    for (const [groupName, groupChannels] of Object.entries(groups)) {
        html += `<div class="channel-group-header" style="padding: 0.5rem 1rem; background: #1a1a1a; font-size: 0.75rem; color: #ffaa33; font-weight: bold;">${escapeHtml(groupName)}</div>`;
        
        groupChannels.forEach(channel => {
            const originalIndex = allChannels.findIndex(c => c.name === channel.name && c.url === channel.url);
            const isFavorite = favorites.has(originalIndex);
            const firstLetter = channel.name.charAt(0).toUpperCase();
            const needsProxyFlag = needsProxy(channel.url);
            
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
    
    // Event listeners
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
    document.title = `🎸 Reproduciendo: ${channel.name} - AndyTV IPTV`;
    statusElement.textContent = `🔄 Cargando stream: ${channel.name}...`;
    statusElement.style.color = '#ffaa33';
    
    try {
        await playStream(channel.url);
        statusElement.textContent = `✅ Reproduciendo: ${channel.name}`;
        statusElement.style.color = '#4caf50';
    } catch (error) {
        console.error('Error reproduciendo:', error);
        statusElement.textContent = `❌ No se pudo reproducir ${channel.name}. El formato puede no ser compatible.`;
        statusElement.style.color = '#ff6666';
        
        // Fallback: intentar sin proxy
        if (needsProxy(channel.url)) {
            try {
                console.log('🔄 Intentando sin proxy como fallback...');
                await playStreamDirect(channel.url);
                statusElement.textContent = `✅ Reproduciendo (modo directo): ${channel.name}`;
            } catch (fallbackError) {
                console.error('Fallback también falló:', fallbackError);
            }
        }
    } finally {
        if (loadingOverlay) loadingOverlay.style.display = 'none';
    }
}

// Fallback sin proxy
function playStreamDirect(url) {
    return new Promise((resolve, reject) => {
        videoPlayer.src = url;
        videoPlayer.load();
        videoPlayer.play()
            .then(() => resolve(true))
            .catch(reject);
    });
}

// ========== UTILIDADES ==========
function escapeHtml(text) {
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

// ========== EVENT LISTENERS ==========
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
loadChannels();

console.log('🎬 AndyTV IPTV iniciado - Con soporte para streams bloqueados vía proxy');