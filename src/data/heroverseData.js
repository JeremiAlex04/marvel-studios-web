// Base de datos limpia sin datos precargados ni imágenes de demostración
export const UNIVERSES_DATA = [];

export const FEATURED_HEROES = [];

export const FEATURES_DATA = [
  {
    id: 1,
    title: 'Biografías Completas',
    description: 'Espacio para gestionar orígenes e identidades secretas.',
    icon: 'UserCheck',
    color: 'text-blue-500',
    bgGlow: 'shadow-glow-blue'
  },
  {
    id: 2,
    title: 'Poderes y Habilidades',
    description: 'Métricas de fuerza, velocidad e inteligencia.',
    icon: 'Zap',
    color: 'text-amber-400',
    bgGlow: 'shadow-glow-gold'
  },
  {
    id: 3,
    title: 'Aliados y Enemigos',
    description: 'Redes de conexiones y equipos.',
    icon: 'ShieldAlert',
    color: 'text-red-500',
    bgGlow: 'shadow-glow-red'
  },
  {
    id: 4,
    title: 'Cómics & Medios',
    description: 'Sagas y adaptaciones cinematográficas.',
    icon: 'Film',
    color: 'text-purple-400',
    bgGlow: 'shadow-glow-blue'
  }
];

export const STATS_DATA = [
  { id: 1, label: 'Personajes Registrados', count: 0, prefix: '' },
  { id: 2, label: 'Universos Explorables', count: 0, prefix: '' },
  { id: 3, label: 'Historias & Cómics', count: 0, prefix: '' },
  { id: 4, label: 'Habilidades Únicas', count: 0, prefix: '' },
];
