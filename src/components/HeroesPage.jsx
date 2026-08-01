import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Swords, X, Shield, Sparkles } from 'lucide-react';
import { HEROES_DATA } from '../data/heroes';
import FilterBar from './FilterBar';
import HeroGrid from './HeroGrid';
import HeroDetailModal from './HeroDetailModal';
import PowerCompareModal from './PowerCompareModal';

const HEROES_BANNER_VIDEO_SRC = "https://www.youtube.com/watch?v=4XaKrbwtNu0";

// Extractor automático de ID de YouTube
function getYouTubeId(url) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export default function HeroesPage({ onNavigate }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTeam, setActiveTeam] = useState('todos');
  const [sortBy, setSortBy] = useState('default');
  const [selectedHero, setSelectedHero] = useState(null);

  const handleHeroSelect = (hero) => {
    if (hero.id === 1 || hero.name === 'Spider-Man') {
      if (onNavigate) onNavigate('spiderman-versions');
    } else {
      setSelectedHero(hero);
    }
  };
  const [favorites, setFavorites] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [showCompare, setShowCompare] = useState(false);

  const videoRef = useRef(null);
  const iframeRef = useRef(null);
  const ytPlayerRef = useRef(null);

  const youtubeId = getYouTubeId(HEROES_BANNER_VIDEO_SRC);
  const isYouTube = Boolean(youtubeId);
  const hasVideo = Boolean(HEROES_BANNER_VIDEO_SRC.trim());

  useEffect(() => {
    let ytCheckInterval = null;

    const video = videoRef.current;
    if (video && hasVideo && !isYouTube) {
      video.muted = true;
      video.currentTime = 3;
      video.play().catch(() => {});
    }

    if (isYouTube && hasVideo) {
      const loadYTAPI = () => {
        if (window.YT && window.YT.Player) {
          try {
            ytPlayerRef.current = new window.YT.Player('yt-bg-player-heroes', {
              events: {
                onReady: (event) => {
                  event.target.mute();
                  event.target.seekTo(3);
                  event.target.playVideo();
                },
                onStateChange: (event) => {
                  if (event.data === window.YT.PlayerState.ENDED || event.data === window.YT.PlayerState.PAUSED) {
                    event.target.seekTo(3);
                    event.target.playVideo();
                  }
                }
              }
            });
          } catch (e) {
            console.warn('YT Player init in HeroesPage:', e);
          }
        }
      };

      if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
        window.onYouTubeIframeAPIReady = loadYTAPI;
      } else {
        loadYTAPI();
      }

      // Sincronización en tiempo real a 250ms para mantener el bucle exacto de 3s a 30s
      ytCheckInterval = setInterval(() => {
        if (ytPlayerRef.current && typeof ytPlayerRef.current.getCurrentTime === 'function') {
          const time = ytPlayerRef.current.getCurrentTime();
          if (time >= 30 || time < 2.5) {
            ytPlayerRef.current.seekTo(3);
            ytPlayerRef.current.playVideo();
          }
        }
      }, 250);
    }

    return () => {
      if (ytCheckInterval) clearInterval(ytCheckInterval);
    };
  }, [hasVideo, isYouTube, youtubeId]);

  // Bucle de 3s a 30s para archivo MP4 local
  const handleMp4TimeUpdate = () => {
    if (videoRef.current && !isYouTube) {
      const time = videoRef.current.currentTime;
      if (time >= 30 || time < 2.5) {
        videoRef.current.currentTime = 3;
      }
    }
  };

  // Filtrado y ordenamiento de héroes
  const filteredHeroes = useMemo(() => {
    let result = [...HEROES_DATA];

    if (activeTeam !== 'todos') {
      result = result.filter(h => h.team === activeTeam);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        h =>
          h.name.toLowerCase().includes(q) ||
          h.alias.toLowerCase().includes(q) ||
          h.description.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'strength') {
      result.sort((a, b) => b.stats.strength - a.stats.strength);
    } else if (sortBy === 'intelligence') {
      result.sort((a, b) => b.stats.intelligence - a.stats.intelligence);
    } else if (sortBy === 'combat') {
      result.sort((a, b) => b.stats.combat - a.stats.combat);
    }

    return result;
  }, [searchQuery, activeTeam, sortBy]);

  const handleToggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const handleToggleCompare = (hero) => {
    setCompareList(prev => {
      if (prev.some(h => h.id === hero.id)) {
        return prev.filter(h => h.id !== hero.id);
      }
      if (prev.length >= 2) return prev;
      const next = [...prev, hero];
      if (next.length === 2) setShowCompare(true);
      return next;
    });
  };

  const handleCloseCompare = () => {
    setShowCompare(false);
    setCompareList([]);
  };

  return (
    <div className="relative w-full h-full overflow-y-auto overflow-x-hidden bg-[#0D0D0D]" style={{ scrollbarGutter: 'stable' }}>
      
      {/* Fondo Dinámico de Partículas de la Página */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-marvel-red/5 rounded-full filter blur-[160px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full filter blur-[140px]" />
      </div>

      {/* Contenido Principal */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-24 sm:pt-28 lg:pt-32 pb-24">

        {/* Banner del Título: Estilo Cinemático con opción de video visual silencioso (3s a 30s en bucle) */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-3xl overflow-hidden border border-slate-800/90 bg-[#121212] shadow-[0_0_50px_rgba(230,36,41,0.12)] mb-8 flex flex-col items-center justify-center p-8 sm:p-12 text-center min-h-[220px] sm:min-h-[260px]"
        >
          {/* Si se proporciona un video, se renderiza 100% silencioso y en bucle del segundo 3 al 30 */}
          {hasVideo ? (
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
              {isYouTube ? (
                <div className="relative w-full h-full pointer-events-none overflow-hidden select-none">
                  <iframe
                    id="yt-bg-player-heroes"
                    ref={iframeRef}
                    src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&loop=1&start=3&end=30&playlist=${youtubeId}&playsinline=1&enablejsapi=1&autohide=1&disablekb=1&modestbranding=1&fs=0&rel=0&iv_load_policy=3&origin=${encodeURIComponent(window.location.origin)}`}
                    className="absolute top-1/2 left-1/2 w-[300%] h-[300%] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none border-0 opacity-50"
                    allow="autoplay; encrypted-media"
                    title="Heroes Banner Visual Background"
                  />
                </div>
              ) : (
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  onTimeUpdate={handleMp4TimeUpdate}
                  style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
                  className="w-full h-full min-w-full min-h-full object-cover pointer-events-none opacity-50"
                >
                  <source src={HEROES_BANNER_VIDEO_SRC} type="video/mp4" />
                </video>
              )}
              <div className="absolute inset-0 z-0 bg-transparent pointer-events-auto" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/60 to-[#121212]/40 pointer-events-none z-0" />
            </div>
          ) : (
            /* Luces Neón y Malla Ciberpunk (Fondo por defecto si no hay video cargado) */
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-gradient-to-r from-marvel-red/20 via-amber-500/15 to-blue-600/20 rounded-full filter blur-[80px] animate-pulse" />
              <div className="absolute inset-0 bg-hero-grid opacity-20" />
              <div className="absolute inset-0 bg-radial-hero opacity-40" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-[#121212]/80" />
            </div>
          )}

          {/* Contenido dentro del Banner */}
          <div className="relative z-10 max-w-3xl mx-auto space-y-3">
            <h1 className="font-montserrat font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-white leading-tight drop-shadow-2xl">
              SANTUARIO DE{' '}
              <span className="text-marvel-red border-b-4 border-marvel-red inline-block pb-1">HÉROES</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-medium drop-shadow-md">
              Explora la colección de superhéroes del Universo Cinematográfico de Marvel.
            </p>
          </div>
        </motion.div>

        {/* Barra de Búsqueda */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative mb-5"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre, alias o descripción..."
            className="w-full pl-12 pr-12 py-4 bg-[#141414]/90 border border-slate-800 focus:border-marvel-red rounded-2xl text-slate-100 placeholder-slate-500 text-sm font-medium focus:outline-none transition-colors backdrop-blur-md shadow-xl"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </motion.div>

        {/* FilterBar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <FilterBar
            activeTeam={activeTeam}
            setActiveTeam={setActiveTeam}
            sortBy={sortBy}
            setSortBy={setSortBy}
            totalResults={filteredHeroes.length}
          />
        </motion.div>

        {/* Comparador Flotante */}
        <AnimatePresence>
          {compareList.length === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mb-6 flex items-center justify-between gap-4 px-5 py-4 bg-amber-500/10 border border-amber-500/40 rounded-2xl backdrop-blur-md"
            >
              <div className="flex items-center gap-3 text-amber-400 text-sm font-bold">
                <Swords className="w-5 h-5 animate-pulse" />
                <span>
                  <span className="text-white font-black">{compareList[0].name}</span> añadido al comparador. Selecciona un segundo héroe con el ícono{' '}
                  <Swords className="w-3.5 h-3.5 inline" />.
                </span>
              </div>
              <button
                onClick={() => setCompareList([])}
                className="text-slate-400 hover:text-white transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid de Héroes */}
        <HeroGrid
          heroes={filteredHeroes}
          onSelectHero={handleHeroSelect}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          compareList={compareList}
          onToggleCompare={handleToggleCompare}
        />

      </div>

      {/* Modal de Detalle del Héroe */}
      <AnimatePresence>
        {selectedHero && (
          <HeroDetailModal
            hero={selectedHero}
            onClose={() => setSelectedHero(null)}
            isFavorite={favorites.includes(selectedHero.id)}
            onToggleFavorite={handleToggleFavorite}
            isComparing={compareList.some(h => h.id === selectedHero.id)}
            onToggleCompare={handleToggleCompare}
          />
        )}
      </AnimatePresence>

      {/* Modal de Comparación de Poderes */}
      <AnimatePresence>
        {showCompare && compareList.length === 2 && (
          <PowerCompareModal
            compareList={compareList}
            onClose={handleCloseCompare}
            onRemoveHero={(id) => setCompareList(prev => prev.filter(h => h.id !== id))}
            allHeroes={HEROES_DATA}
            onAddHeroToCompare={handleToggleCompare}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
