import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, Heart, Swords, Quote, Sparkles, Shield, Film } from 'lucide-react';

const STAT_CONFIG = [
  { key: 'intelligence', label: 'Inteligencia',       color: 'from-blue-500 to-cyan-400',    icon: '🧠' },
  { key: 'strength',     label: 'Fuerza Física',       color: 'from-red-600 to-orange-500',   icon: '💪' },
  { key: 'speed',        label: 'Velocidad',           color: 'from-emerald-500 to-teal-400', icon: '⚡' },
  { key: 'durability',   label: 'Durabilidad',         color: 'from-purple-500 to-pink-400',  icon: '🛡️' },
  { key: 'energy',       label: 'Proyección de Energía', color: 'from-amber-400 to-yellow-300', icon: '✨' },
  { key: 'combat',       label: 'Habilidad de Combate', color: 'from-rose-600 to-red-400',    icon: '⚔️' },
];

export default function HeroDetailModal({ hero, onClose, isFavorite, onToggleFavorite, isComparing, onToggleCompare }) {
  const [barsReady, setBarsReady] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    // Anima las barras al abrir el modal
    const timer = setTimeout(() => setBarsReady(true), 200);
    return () => { clearTimeout(timer); setBarsReady(false); setImgError(false); };
  }, [hero]);

  if (!hero) return null;

  const totalPower = Math.round(
    Object.values(hero.stats).reduce((a, b) => a + b, 0) / 6
  );

  const imgSrc = imgError ? hero.avatarFallback : hero.avatar;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-lg flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.96 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-4xl bg-[#111111] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl my-4 text-slate-100 max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >

        {/* Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2.5 bg-black/60 hover:bg-marvel-red text-slate-300 hover:text-white rounded-full backdrop-blur-md border border-slate-700 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Banner Header con imagen */}
        <div className="relative h-72 sm:h-80 w-full overflow-hidden">
          <img
            src={imgSrc}
            alt={hero.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-top brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent" />

          {/* Identificación en el banner */}
          <div className="absolute bottom-6 left-6 right-16 z-10">
            <span className="text-[10px] font-black tracking-widest uppercase text-marvel-gold mb-1 block">
              {hero.alias}
            </span>
            <h2 className="font-montserrat font-black text-4xl sm:text-5xl uppercase text-white leading-tight drop-shadow-2xl">
              {hero.name}
            </h2>
            <span className="text-xs text-slate-400 font-semibold mt-1 block">
              {hero.teamLabel} · Primera Aparición: {hero.firstAppearance}
            </span>
          </div>

          {/* Power Index badge */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-2 bg-black/70 backdrop-blur-md rounded-xl border border-slate-700">
            <Zap className="w-4 h-4 text-marvel-gold" />
            <span className="font-black text-white text-sm">{totalPower}</span>
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wide">PODER</span>
          </div>
        </div>

        {/* Cuerpo del modal */}
        <div className="p-6 sm:p-8 space-y-8">

          {/* Acciones rápidas */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => onToggleFavorite(hero.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider border transition-all ${
                isFavorite
                  ? 'bg-red-600/20 text-red-400 border-red-500/50 shadow-[0_0_12px_rgba(220,38,38,0.3)]'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-red-500/40 hover:text-red-400'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-400' : ''}`} />
              {isFavorite ? 'En Favoritos' : 'Añadir Favorito'}
            </button>
            <button
              onClick={() => onToggleCompare(hero)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider border transition-all ${
                isComparing
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/50 shadow-[0_0_12px_rgba(251,191,36,0.3)]'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-amber-500/40 hover:text-amber-400'
              }`}
            >
              <Swords className="w-4 h-4" />
              {isComparing ? 'Comparando...' : 'Comparar VS'}
            </button>
          </div>

          {/* Descripción */}
          <div>
            <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-2 flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-marvel-red" /> Origen & Historia
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">{hero.description}</p>
          </div>

          {/* Quote cinemática */}
          {hero.quote && (
            <div className="relative px-6 py-5 bg-gradient-to-br from-slate-900 to-[#0D0D0D] rounded-2xl border border-slate-800/80 overflow-hidden">
              <div className="absolute top-3 left-4 text-marvel-red/20 text-8xl font-serif leading-none select-none">"</div>
              <Quote className="w-5 h-5 text-marvel-red mb-3 relative z-10" />
              <p className="text-slate-200 text-base italic font-medium leading-relaxed relative z-10">
                {hero.quote}
              </p>
            </div>
          )}

          {/* Stats con barras animadas */}
          <div>
            <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-marvel-red" /> Estadísticas de Combate
            </h3>
            <div className="space-y-3.5">
              {STAT_CONFIG.map(({ key, label, color, icon }) => (
                <div key={key}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                      <span className="text-sm">{icon}</span> {label}
                    </span>
                    <span className="text-xs font-black text-slate-200">{hero.stats[key] ?? 0}/100</span>
                  </div>
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${color}`}
                      initial={{ width: 0 }}
                      animate={{ width: barsReady ? `${hero.stats[key] ?? 0}%` : 0 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Poderes */}
          {hero.powers && hero.powers.length > 0 && (
            <div>
              <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-3 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-marvel-red" /> Poderes & Habilidades
              </h3>
              <div className="flex flex-wrap gap-2">
                {hero.powers.map((power, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + idx * 0.04, duration: 0.3 }}
                    className="px-3 py-1.5 bg-marvel-red/10 border border-marvel-red/25 text-marvel-red text-[11px] font-bold rounded-lg uppercase tracking-wide"
                  >
                    {power}
                  </motion.span>
                ))}
              </div>
            </div>
          )}

          {/* Primera Aparición */}
          <div className="flex items-center gap-3 py-4 border-t border-slate-800/60">
            <Film className="w-4 h-4 text-slate-600" />
            <span className="text-xs text-slate-500">Primera Aparición:</span>
            <span className="text-xs font-bold text-slate-300">{hero.firstAppearance}</span>
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
}
