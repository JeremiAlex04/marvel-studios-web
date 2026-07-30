import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, ArrowRight, Volume2, VolumeX } from 'lucide-react';
import introVideo from '../video/intro_marvel.mp4';

export default function HomeHero({ onExploreUniverses }) {
  const [isMuted, setIsMuted] = useState(true);
  const [showInitialTitle, setShowInitialTitle] = useState(true);
  const [showExploreBtn, setShowExploreBtn] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().catch((err) => {
        console.warn('Autoplay prevented:', err);
      });
    }
  }, []);

  // Sincronización continua con el tiempo del video en cada bucle
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const time = videoRef.current.currentTime;
      
      // Título inicial visible desde 0:00 hasta el segundo 0:05
      if (time >= 0 && time < 5) {
        setShowInitialTitle(true);
      } else {
        setShowInitialTitle(false);
      }

      // Botón "Explorar el universo" visible a partir del segundo 8 hasta el final del bucle
      if (time >= 8) {
        setShowExploreBtn(true);
      } else {
        setShowExploreBtn(false);
      }
    }
  };

  const toggleSound = () => {
    if (videoRef.current) {
      const nextMuteState = !isMuted;
      videoRef.current.muted = nextMuteState;
      setIsMuted(nextMuteState);
      if (videoRef.current.paused) {
        videoRef.current.play();
      }
    }
  };

  return (
    <section className="relative w-full min-h-[82vh] flex flex-col items-center justify-center text-center py-16 px-4 overflow-hidden group">
      
      {/* Video de Fondo HD en Bucle */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
          className="w-full h-full object-cover transition-opacity duration-700 ease-in-out"
        >
          <source src={introVideo} type="video/mp4" />
          <source src="/video/intro_marvel.mp4" type="video/mp4" />
        </video>

        {/* Capa de degradado cinematográfico ligero */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-[#101010]/35 to-black/10 opacity-100" />
        <div className="absolute inset-0 bg-radial-hero opacity-20" />
      </div>

      {/* Botón de Control de Audio (Esquina Superior Derecha) */}
      <div className="absolute top-6 right-6 z-30 flex items-center gap-2">
        <button
          onClick={toggleSound}
          className="px-3 py-2 bg-[#101010]/80 hover:bg-marvel-red text-white text-xs font-montserrat font-bold uppercase tracking-wider rounded-none border border-white/20 backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer shadow-lg"
          title={isMuted ? "Activar Sonido Intro" : "Silenciar Audio"}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-marvel-gold" />}
          <span className="hidden sm:inline">{isMuted ? "Audio Off" : "Audio On"}</span>
        </button>
      </div>

      {/* Título Inicial: Visible únicamente de 0:00 a 0:05 de cada bucle con transición suave */}
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <AnimatePresence>
          {showInitialTitle && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="font-montserrat font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-tight drop-shadow-2xl text-center">
                Explora la cronología completa del <span className="text-marvel-red font-black border-b-4 border-marvel-red inline-block pb-1">universo cinematográfico.</span>
              </h1>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Botón "Explorar el Universo": Aparece en la esquina inferior derecha a los 8s de cada bucle */}
      <div className="absolute bottom-8 right-6 sm:bottom-10 sm:right-10 z-20">
        <AnimatePresence>
          {showExploreBtn && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                onClick={onExploreUniverses}
                className="px-8 py-4 bg-marvel-red hover:bg-marvel-redHover text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-none transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 border-0 shadow-glow-red cursor-pointer"
              >
                <Compass className="w-5 h-5 text-white" />
                <span>Explorar el Universo</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </section>
  );
}
