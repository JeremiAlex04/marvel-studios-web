import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { SPIDERMAN_VERSIONS_DATA } from '../data/spidermanVersions';
import HeroCard from './HeroCard';
import HeroDetailModal from './HeroDetailModal';

const PRESENTATION_VIDEO_SRC = "https://www.youtube.com/watch?v=mVnAWfF5BNI";
const PRESENTATION_LOGO_SRC = "/img/spiderman/logo_spiderman.png";

function getYouTubeId(url) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export default function SpiderVersePage({ onBack }) {
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const videoRef = useRef(null);

  const youtubeId = getYouTubeId(PRESENTATION_VIDEO_SRC);
  const isYouTube = Boolean(youtubeId);

  const handleToggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video && !isYouTube) {
      video.muted = true;
      video.play().catch(() => {});
    }
  }, [isYouTube]);

  return (
    <div className="relative w-full h-full overflow-y-auto overflow-x-hidden bg-[#0D0D0D]" style={{ scrollbarGutter: 'stable' }}>
      
      {/* Fondo Cinemático de Partículas de Spider-Verse */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-red-600/10 rounded-full filter blur-[160px]" />
        <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-blue-600/10 rounded-full filter blur-[140px]" />
        <div className="absolute inset-0 bg-hero-grid opacity-15" />
      </div>

      {/* Contenido Principal */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-24 sm:pt-28 lg:pt-32 pb-24">

        {/* Botón Volver */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-[#141414] hover:bg-marvel-red text-slate-200 hover:text-white rounded-2xl text-xs font-black uppercase tracking-wider border border-slate-800 hover:border-marvel-red transition-all cursor-pointer shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a Héroes</span>
          </button>
        </motion.div>

        {/* Header Banner de Presentación: Mismo Video de Fondo y Logo de Spider-Man Centrado */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-3xl overflow-hidden border border-red-600/40 bg-[#121212] shadow-[0_0_60px_rgba(220,38,38,0.25)] mb-10 flex flex-col items-center justify-center p-8 sm:p-14 text-center min-h-[260px] sm:min-h-[320px]"
        >
          {/* VIDEO DE FONDO DE PRESENTACIÓN (100% Cobertura Visual) */}
          <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
            {isYouTube ? (
              <div className="relative w-full h-full pointer-events-none overflow-hidden select-none">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeId}&playsinline=1&enablejsapi=1&autohide=1&disablekb=1&modestbranding=1&fs=0&rel=0&iv_load_policy=3&origin=${encodeURIComponent(window.location.origin)}`}
                  className="absolute top-1/2 left-1/2 w-[300%] h-[300%] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none border-0 opacity-[0.65]"
                  allow="autoplay; encrypted-media"
                  title="Spider-Verse Presentation Video"
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
                style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
                className="w-full h-full min-w-full min-h-full object-cover pointer-events-none opacity-[0.65]"
              >
                <source src={PRESENTATION_VIDEO_SRC} type="video/mp4" />
              </video>
            )}
            <div className="absolute inset-0 z-0 bg-transparent pointer-events-auto" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/60 to-[#121212]/30 pointer-events-none z-0" />
          </div>

          {/* LOGO DE SPIDER-MAN EN CIMA Y CENTRADO COMO PRESENTACIÓN */}
          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center pointer-events-none">
            <img
              src={PRESENTATION_LOGO_SRC}
              alt="Spider-Man Multiverse Presentation Logo"
              className="max-h-48 sm:max-h-60 max-w-[95%] object-contain filter drop-shadow-[0_10px_40px_rgba(0,0,0,0.95)]"
            />
          </div>
        </motion.div>

        {/* Título de la Sección de Versiones */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-montserrat font-black text-2xl sm:text-3xl uppercase tracking-wide text-white">
            VERSIONES DEL <span className="text-marvel-red">MULTIVERSO</span>
          </h2>
          <span className="text-xs font-bold text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
            {SPIDERMAN_VERSIONS_DATA.length} Variantes
          </span>
        </div>

        {/* Grid de Versiones de Spider-Man */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {SPIDERMAN_VERSIONS_DATA.map((hero) => (
            <motion.div
              key={hero.id}
              variants={{
                hidden: { opacity: 0, y: 28, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              <HeroCard
                hero={hero}
                onSelectHero={setSelectedVersion}
              />
            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* Modal de Detalle de la Versión Seleccionada */}
      <AnimatePresence>
        {selectedVersion && (
          <HeroDetailModal
            hero={selectedVersion}
            onClose={() => setSelectedVersion(null)}
            isFavorite={favorites.includes(selectedVersion.id)}
            onToggleFavorite={handleToggleFavorite}
            isComparing={false}
            onToggleCompare={() => {}}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
