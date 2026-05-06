// src/data/seriesData.ts

export interface Serie {
  id: string;
  title: string;
  channel: string; // Canal de YouTube ID o handle
  thumbnail: string;
  description: string;
  type: 'cocina' | 'truecrime' | 'entretenimiento';
}

export interface Episode {
  id: string;
  serieId: string;
  title: string;
  youtubeUrl: string;
  duration: string;
  thumbnail: string;
  publishedAt: string;
}

// Series disponibles en DKISS y otros canales
export const SERIES_CATALOG: Serie[] = [
  {
    id: 'dkiss_cocina',
    title: 'Cocina DKISS',
    channel: 'UCYyaquuf8GnQupjx2FW_n3Q', // Canal de YouTube DKISS
    thumbnail: 'https://img.youtube.com/vi/default/mqdefault.jpg',
    description: 'Los mejores programas de cocina, recetas y trucos culinarios',
    type: 'cocina'
  },
  {
    id: 'dkiss_true_crime',
    title: 'True Crime DKISS',
    channel: 'UCYyaquuf8GnQupjx2FW_n3Q',
    thumbnail: 'https://img.youtube.com/vi/default/mqdefault.jpg',
    description: 'Casos reales de crímenes, misterios y sucesos impactantes',
    type: 'truecrime'
  },
  {
    id: 'dkiss_entretenimiento',
    title: 'Entretenimiento DKISS',
    channel: 'UCYyaquuf8GnQupjx2FW_n3Q',
    thumbnail: 'https://img.youtube.com/vi/default/mqdefault.jpg',
    description: 'Realities, testimonios y programas de actualidad',
    type: 'entretenimiento'
  }
];

// Capítulos predefinidos (ejemplo - estos se pueden actualizar dinámicamente)
export const EPISODES: Episode[] = [
  // Cocina
  {
    id: '1',
    serieId: 'dkiss_cocina',
    title: 'Recetas fáciles para principiantes',
    youtubeUrl: 'https://www.youtube.com/watch?v=ejemplo1',
    duration: '15:30',
    thumbnail: '',
    publishedAt: '2024-01-15'
  },
  {
    id: '2',
    serieId: 'dkiss_cocina',
    title: 'Postres caseros en 10 minutos',
    youtubeUrl: 'https://www.youtube.com/watch?v=ejemplo2',
    duration: '12:45',
    thumbnail: '',
    publishedAt: '2024-01-22'
  },
  // True Crime
  {
    id: '3',
    serieId: 'dkiss_true_crime',
    title: 'El caso del asesino de la ciberoscuridad',
    youtubeUrl: 'https://www.youtube.com/watch?v=sf_j-TZDas8',
    duration: '45:00',
    thumbnail: '',
    publishedAt: '2024-01-10'
  }
];