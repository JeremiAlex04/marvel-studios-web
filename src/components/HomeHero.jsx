import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, ArrowRight, Volume2, VolumeX } from 'lucide-react';

// Extractor automático de ID de YouTube
function getYouTubeId(url) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

// Acepta URLs de YouTube ("https://www.youtube.com/watch?v=lEmIYhVCGvg") o archivos MP4 ("/video/intro_marvel.mp4")
const VIDEO_SRC = "https://www.youtube.com/watch?v=lEmIYhVCGvg";

export default function HomeHero({ onExploreUniverses }) {
  const [isMuted, setIsMuted] = useState(true);
  const [showInitialTitle, setShowInitialTitle] = useState(true);
  const [showExploreBtn, setShowExploreBtn] = useState(false);
  const videoRef = useRef(null);
  const iframeRef = useRef(null);
  const ytPlayerRef = useRef(null);

  const youtubeId = getYouTubeId(VIDEO_SRC);
  const isYouTube = Boolean(youtubeId);

  useEffect(() => {
    const video = videoRef.current;
    if (video && !isYouTube) {
      video.muted = isMuted;
      video.play().catch(() => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play();
        }
      });
    }

    if (isYouTube) {
      const loadYTAPI = () => {
        if (window.YT && window.YT.Player) {
          try {
            ytPlayerRef.current = new window.YT.Player('yt-bg-player', {
              events: {
                onReady: (event) => {
                  event.target.playVideo();
                  event.target.mute();
                }
              }
            });
          } catch (e) {
            console.warn('YT Player init:', e);
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

      // Función de ciclo continuo para reiniciar la secuencia en cada repetición del bucle (cada 16s)
      const startLoopSequence = () => {
        setShowInitialTitle(true);
        setShowExploreBtn(false);

        const t1 = setTimeout(() => setShowInitialTitle(false), 7000);
        const t2 = setTimeout(() => setShowExploreBtn(true), 8000);

        return () => {
          clearTimeout(t1);
          clearTimeout(t2);
        };
      };

      let cleanupTimers = startLoopSequence();
      const loopInterval = setInterval(() => {
        if (cleanupTimers) cleanupTimers();
        cleanupTimers = startLoopSequence();
      }, 16000);

      return () => {
        if (cleanupTimers) cleanupTimers();
        clearInterval(loopInterval);
      };
    }
  }, [isYouTube, youtubeId]);

  // Sincronización por tiempo exacto para video MP4 en cada repetición de bucle
  const handleTimeUpdate = () => {
    if (videoRef.current && !isYouTube) {
      const time = videoRef.current.currentTime;
      
      // Título inicial visible desde 0:00 hasta el segundo 0:07 de cada bucle
      if (time >= 0 && time < 7) {
        setShowInitialTitle(true);
      } else {
        setShowInitialTitle(false);
      }

      // Botón "Explorar el universo" visible a partir del segundo 8 hasta el final de cada bucle
      if (time >= 8) {
        setShowExploreBtn(true);
      } else {
        setShowExploreBtn(false);
      }
    }
  };

  const toggleSound = () => {
    const nextMuteState = !isMuted;
    setIsMuted(nextMuteState);

    if (isYouTube) {
      if (ytPlayerRef.current && typeof ytPlayerRef.current.unMute === 'function') {
        if (!nextMuteState) {
          ytPlayerRef.current.unMute();
          ytPlayerRef.current.setVolume(100);
        } else {
          ytPlayerRef.current.mute();
        }
      } else if (iframeRef.current && iframeRef.current.contentWindow) {
        const win = iframeRef.current.contentWindow;
        const command = nextMuteState ? 'mute' : 'unmute';
        win.postMessage(JSON.stringify({ event: 'command', func: command, args: [] }), '*');
        if (!nextMuteState) {
          win.postMessage(JSON.stringify({ event: 'command', func: 'setVolume', args: [100] }), '*');
        }
      }
    } else if (videoRef.current) {
      videoRef.current.muted = nextMuteState;
      if (videoRef.current.paused) {
        videoRef.current.play();
      }
    }
  };

  return (
    <section className="relative w-full h-full flex flex-col items-center justify-center text-center overflow-hidden group">
      
      {/* Fondo de Video HD (Soporte Híbrido: YouTube API & MP4 HTML5) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        {isYouTube ? (
          <div className="relative w-full h-full pointer-events-none overflow-hidden select-none">
            <iframe
              id="yt-bg-player"
              ref={iframeRef}
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeId}&playsinline=1&enablejsapi=1&autohide=1&disablekb=1&modestbranding=1&fs=0&rel=0&iv_load_policy=3&origin=${encodeURIComponent(window.location.origin)}`}
              className="absolute top-1/2 left-1/2 w-[120%] h-[120%] -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none border-0"
              allow="autoplay; encrypted-media"
              title="Marvel Intro Background"
            />
          </div>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            preload="auto"
            onTimeUpdate={handleTimeUpdate}
            style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
            className="w-full h-full object-cover transition-opacity duration-700 ease-in-out pointer-events-none"
          >
            <source src={VIDEO_SRC} type="video/mp4" />
            <source src="/video/intro_marvel.mp4" type="video/mp4" />
          </video>
        )}

        {/* Escudo de Protección Transparente para evitar controles emergentes */}
        <div className="absolute inset-0 z-0 bg-transparent pointer-events-auto" />

        {/* Capa de degradado cinematográfico ligero */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-[#101010]/35 to-black/10 opacity-100 pointer-events-none z-0" />
        <div className="absolute inset-0 bg-radial-hero opacity-20 pointer-events-none z-0" />
      </div>

      {/* Botón de Control de Audio Interactivo (Esquina Superior Derecha) */}
      <div className="absolute top-6 right-6 z-30 flex items-center gap-2">
        <button
          onClick={toggleSound}
          className="px-3 py-2 bg-[#101010]/80 hover:bg-marvel-red text-white text-xs font-montserrat font-bold uppercase tracking-wider rounded-none border border-white/20 backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer shadow-lg active:scale-95 z-30"
          title={isMuted ? "Activar Sonido Intro" : "Silenciar Audio"}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-marvel-gold" />}
          <span className="hidden sm:inline">{isMuted ? "Audio Off" : "Audio On"}</span>
        </button>
      </div>

      {/* Título Inicial: Visible únicamente de 0:00 a 0:07 de cada bucle con transición suave */}
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
