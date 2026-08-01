// Base de datos de héroes del MCU — HeroVerse
export const TEAMS = [
  { id: 'todos',      label: 'Todos',          icon: 'Shield' },
  { id: 'avengers',   label: 'Avengers',        icon: 'Zap' },
  { id: 'guardianes', label: 'Guardianes',       icon: 'Flame' },
  { id: 'villanos',   label: 'Villanos',         icon: 'Skull' },
  { id: 'otros',      label: 'Otros Héroes',     icon: 'Dna' },
];

export const HEROES_DATA = [
  {
    id: 1,
    name: 'Spider-Man',
    alias: 'Peter Parker',
    team: 'otros',
    teamLabel: 'Otros Héroes',
    description: 'Estudiante de Queens picado por una araña radioactiva. Mentor: Tony Stark. Posee sentido de arácnido, fuerza sobrehumana y telarañas artificiales. El mejor amigo de tu vecindario.',
    quote: '"With great power comes great responsibility."',
    firstAppearance: 'Captain America: Civil War (2016)',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Tom_Holland_2018.jpg/440px-Tom_Holland_2018.jpg',
    avatarFallback: 'https://i.imgur.com/bYeS18C.png',
    titleImage: '/img/spiderman/logo_spiderman.png',
    bgVideo: 'https://www.youtube.com/watch?v=mVnAWfF5BNI',
    stats: { intelligence: 75, strength: 70, speed: 75, durability: 60, energy: 40, combat: 80 },
    powers: ['Sentido de Arácnido', 'Fuerza & Agilidad Sobrehumana', 'Telarañas Artificiales', 'Adherencia a Superficies', 'Traje de Nanotecnología', 'Instinto de Campo'],
    color: '#DC2626',
  },
];
