import React, { useState, useMemo } from 'react';
import { Channel } from '../types';
import './ChannelList.css';

interface ChannelListProps {
  channels: Channel[];
  currentChannel: Channel | null;
  onSelectChannel: (channel: Channel) => void;
  favorites: Set<string>;
  onToggleFavorite: (channelId: string) => void;
}

export const ChannelList: React.FC<ChannelListProps> = ({
  channels,
  currentChannel,
  onSelectChannel,
  favorites,
  onToggleFavorite
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'favorites'>('all');

  const filteredChannels = useMemo(() => {
    let result = channels;
    
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(ch => 
        ch.name.toLowerCase().includes(term) || 
        ch.group.toLowerCase().includes(term)
      );
    }
    
    if (filter === 'favorites') {
      result = result.filter(ch => favorites.has(ch.id));
    }
    
    return result;
  }, [channels, searchTerm, filter, favorites]);

  const groupedChannels = useMemo(() => {
    const groups: { [key: string]: Channel[] } = {};
    filteredChannels.forEach(channel => {
      if (!groups[channel.group]) groups[channel.group] = [];
      groups[channel.group].push(channel);
    });
    return groups;
  }, [filteredChannels]);

  return (
    <div className="channel-list">
      <div className="channel-list-header">
        <input
          type="text"
          className="search-input"
          placeholder="🔍 Buscar canal..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="filter-buttons">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            📺 Todos ({channels.length})
          </button>
          <button 
            className={`filter-btn ${filter === 'favorites' ? 'active' : ''}`}
            onClick={() => setFilter('favorites')}
          >
            ⭐ Favoritos ({favorites.size})
          </button>
        </div>
      </div>
      
      <div className="channel-list-content">
        {Object.entries(groupedChannels).map(([groupName, groupChannels]) => (
          <div key={groupName}>
            <div className="channel-group">{groupName}</div>
            {groupChannels.map(channel => (
              <div
                key={channel.id}
                className={`channel-item ${currentChannel?.id === channel.id ? 'active' : ''}`}
                onClick={() => onSelectChannel(channel)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectChannel(channel);
                  }
                }}
              >
                <div className="channel-logo">
                  {channel.name.charAt(0).toUpperCase()}
                </div>
                <div className="channel-info">
                  <div className="channel-name">{channel.name}</div>
                  <div className="channel-group-name">{channel.group}</div>
                </div>
                <button
                  className={`favorite-btn ${favorites.has(channel.id) ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(channel.id);
                  }}
                >
                  {favorites.has(channel.id) ? '★' : '☆'}
                </button>
              </div>
            ))}
          </div>
        ))}
        {filteredChannels.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            No se encontraron canales
          </div>
        )}
      </div>
    </div>
  );
};