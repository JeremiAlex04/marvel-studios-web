import React, { useState, useRef, useEffect } from 'react';

const TEAM_COLORS = {
  avengers:   { border: 'border-red-500/50',   glow: 'shadow-[0_0_35px_rgba(220,38,38,0.25)]' },
  guardianes: { border: 'border-orange-500/50', glow: 'shadow-[0_0_35px_rgba(249,115,22,0.25)]' },
  villanos:   { border: 'border-purple-600/50', glow: 'shadow-[0_0_35px_rgba(124,58,237,0.25)]' },
  otros:      { border: 'border-red-600/60',    glow: 'shadow-[0_0_35px_rgba(220,38,38,0.25)]' },
};

function getYouTubeId(url) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export default function HeroCard({ hero, onSelectHero }) {
  const [imgError, setImgError] = useState(false);
  const [hoverImgError, setHoverImgError] = useState(false);
  const [titleImgError, setTitleImgError] = useState(false);
  const videoRef = useRef(null);

  const colors = TEAM_COLORS[hero.team] || TEAM_COLORS.otros;

  const youtubeId = getYouTubeId(hero.bgVideo);
  const isYouTube = Boolean(youtubeId);
  const hasVideo = Boolean(hero.bgVideo);
  const hasHoverImage = Boolean(hero.hoverAvatar);

  const imgSrc = imgError ? hero.avatarFallback : hero.avatar;
  const hoverImgSrc = hoverImgError ? hero.avatarFallback : hero.hoverAvatar;
  const titleImgSrc = titleImgError ? null : hero.titleImage;

  useEffect(() => {
    const video = videoRef.current;
    if (video && hasVideo && !isYouTube) {
      video.muted = true;
      video.play().catch(() => {});
    }
  }, [hasVideo, isYouTube]);

  // Si tiene imágenes de hover (1.png y 2.png), renderizamos la imagen limpia sin contenedor oscuro alrededor
  if (hasHoverImage) {
    return (
      <div
        onClick={() => onSelectHero(hero)}
        className="group flex flex-col items-center max-w-[240px] sm:max-w-[280px] mx-auto cursor-pointer select-none transition-all duration-500 hover:-translate-y-2"
      >
        {/* Marco de la Imagen (1.png a 2.png con idénticas dimensiones sin saltos) */}
        <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden">
          {/* Imagen 1 (Por Defecto) */}
          <img
            src={imgSrc}
            alt={`${hero.name} 1`}
            onError={() => setImgError(true)}
            className="absolute inset-0 w-full h-full object-contain object-center transition-opacity duration-700 ease-in-out opacity-100 group-hover:opacity-0 z-0"
          />
          {/* Imagen 2 (Al Apuntar / Hover) */}
          <img
            src={hoverImgSrc}
            alt={`${hero.name} 2`}
            onError={() => setHoverImgError(true)}
            className="absolute inset-0 w-full h-full object-contain object-center transition-opacity duration-700 ease-in-out opacity-0 group-hover:opacity-100 z-10"
          />
        </div>

        {/* Debajo de la Imagen: Actor y cambio dinámico Alias -> Nombre */}
        <div className="mt-3 text-center space-y-1 w-full">
          <span className="text-[11px] font-black uppercase tracking-widest text-marvel-gold block">
            {hero.actor || 'Tobey Maguire'}
          </span>
          <div className="font-montserrat font-black text-sm sm:text-base uppercase tracking-wide leading-snug">
            {/* Texto por defecto: Alias (ej. Peter Parker) */}
            <span className="block text-slate-200 group-hover:hidden transition-all duration-300">
              {hero.alias || 'Peter Parker'}
            </span>
            {/* Texto al hacer hover: Nombre (ej. Spider-Man) */}
            <span className="hidden group-hover:block text-marvel-red transition-all duration-300">
              {hero.name || 'Spider-Man'}
            </span>
          </div>

          {/* Botón Circular con el ícono de icon_spiderman */}
          <div className="pt-2 flex justify-center">
            <button
              onClick={(e) => { e.stopPropagation(); onSelectHero(hero); }}
              className="w-11 h-11 rounded-full bg-red-600/20 hover:bg-marvel-red border border-red-500/40 hover:border-red-500 flex items-center justify-center p-2 transition-all duration-300 shadow-[0_0_15px_rgba(230,36,41,0.3)] hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md"
              title="Ver detalles de Spider-Man"
            >
              <img
                src="/img/icon_spiderman.png"
                alt="Spider-Man Icon"
                className="w-full h-full object-contain filter drop-shadow"
              />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => onSelectHero(hero)}
      className={`group relative h-64 sm:h-72 w-full rounded-3xl overflow-hidden border ${colors.border} hover:border-marvel-red transition-all duration-500 ${colors.glow} hover:shadow-2xl hover:-translate-y-2 flex items-center justify-center cursor-pointer bg-[#121212] select-none`}
    >
      {/* Video de Fondo si no hay imágenes de hover */}
      {hasVideo ? (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          {isYouTube ? (
            <div className="relative w-full h-full pointer-events-none overflow-hidden select-none">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeId}&playsinline=1&enablejsapi=1&autohide=1&disablekb=1&modestbranding=1&fs=0&rel=0&iv_load_policy=3&origin=${encodeURIComponent(window.location.origin)}`}
                className="absolute top-1/2 left-1/2 w-[300%] h-[300%] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none border-0 opacity-[0.62] group-hover:opacity-[0.87] transition-opacity duration-500"
                allow="autoplay; encrypted-media"
                title={`${hero.name} Background Video`}
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
              className="w-full h-full min-w-full min-h-full object-cover pointer-events-none opacity-[0.62] group-hover:opacity-[0.87] transition-opacity duration-500"
            >
              <source src={hero.bgVideo} type="video/mp4" />
            </video>
          )}
          <div className="absolute inset-0 z-0 bg-transparent pointer-events-auto" />
        </div>
      ) : (
        /* Imagen estática de respaldo */
        <img
          src={imgSrc}
          alt={hero.name}
          onError={() => setImgError(true)}
          className="absolute inset-0 w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700 ease-out z-0"
        />
      )}

      {/* Capas Cinemáticas de Fondo */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/90 via-black/20 to-black/50 opacity-[0.78] group-hover:opacity-[0.58] transition-opacity duration-500 pointer-events-none z-1" />

      {/* LOGO DE SPIDER-MAN EN CIMA Y CENTRADO EN EL CONTENEDOR RECTANGULAR */}
      {titleImgSrc && (
        <div className="absolute inset-0 z-10 flex items-center justify-center p-4 text-center pointer-events-none">
          <img
            src={titleImgSrc}
            alt={`${hero.name} Logo Central`}
            onError={() => setTitleImgError(true)}
            className="max-h-36 sm:max-h-44 max-w-[92%] object-contain filter drop-shadow-[0_10px_35px_rgba(0,0,0,0.95)] transform group-hover:scale-110 transition-transform duration-500 ease-out"
          />
        </div>
      )}
    </div>
  );
}
