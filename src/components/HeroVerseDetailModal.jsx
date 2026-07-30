import React from 'react';
import { X, Zap, Shield, Sparkles, Heart, Film, Users, CheckCircle2 } from 'lucide-react';

export default function HeroVerseDetailModal({ 
  hero, 
  onClose, 
  isFavorite, 
  onToggleFavorite 
}) {
  if (!hero) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div 
        className="relative w-full max-w-4xl bg-heroverse-darker rounded-3xl overflow-hidden border border-slate-700 shadow-2xl my-8 text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2.5 bg-black/60 hover:bg-heroverse-red text-slate-300 hover:text-white rounded-full backdrop-blur-md border border-slate-700 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Header */}
        <div className="relative h-72 sm:h-80 w-full overflow-hidden">
          <img
            src={hero.avatar}
            alt={hero.name}
            className="w-full h-full object-cover object-top filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-heroverse-darker via-heroverse-darker/60 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="px-3 py-1 bg-heroverse-blue text-white text-xs font-black uppercase tracking-widest rounded-md inline-block mb-2 shadow-glow-blue">
                {hero.universe}
              </span>
              <h2 className="font-hero text-5xl sm:text-6xl uppercase tracking-wider text-white drop-shadow-md">
                {hero.name}
              </h2>
              <p className="text-heroverse-gold font-bold text-sm sm:text-base">
                {hero.alias}
              </p>
            </div>

            <button
              onClick={() => onToggleFavorite(hero.id)}
              className={`p-3 rounded-xl border font-bold flex items-center gap-2 text-xs uppercase transition-all ${
                isFavorite 
                  ? 'bg-heroverse-red/30 text-heroverse-red border-heroverse-red shadow-glow-red' 
                  : 'bg-black/60 text-slate-300 border-slate-700 hover:border-slate-500'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-heroverse-red' : ''}`} />
              <span>{isFavorite ? 'Favorito' : 'Añadir a Favoritos'}</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[60vh] overflow-y-auto">
          
          {/* Bio */}
          <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
            <h3 className="font-hero text-2xl uppercase text-white mb-2 flex items-center gap-2">
              <Shield className="w-5 h-5 text-heroverse-blue" /> Biografía Oficial
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {hero.bio}
            </p>
          </div>

          {/* Stats & Powers */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Stats */}
            <div className="lg:col-span-6 space-y-4">
              <h3 className="font-hero text-2xl uppercase text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-heroverse-gold" /> Desglose de Poderes
              </h3>
              
              <div className="space-y-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                {Object.entries(hero.stats).map(([stat, val]) => (
                  <div key={stat} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold uppercase">
                      <span className="text-slate-400">{stat}</span>
                      <span className="text-heroverse-gold">{val} / 100</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-heroverse-blue to-heroverse-gold h-full rounded-full transition-all duration-500"
                        style={{ width: `${val}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Powers & Media */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Powers */}
              <div>
                <h3 className="font-hero text-2xl uppercase text-white mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-heroverse-blue" /> Habilidades Especiales
                </h3>
                <ul className="space-y-2">
                  {hero.powers.map((power, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-slate-300 bg-slate-900/40 p-2.5 rounded-xl border border-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{power}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Allies & Enemies */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-800">
                  <span className="text-xs font-bold uppercase text-heroverse-blue block mb-1">Aliados</span>
                  <p className="text-xs text-slate-300">{hero.allies.join(', ')}</p>
                </div>

                <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-800">
                  <span className="text-xs font-bold uppercase text-heroverse-red block mb-1">Enemigos</span>
                  <p className="text-xs text-slate-300">{hero.enemies.join(', ')}</p>
                </div>
              </div>

              {/* Media */}
              <div>
                <h3 className="font-hero text-2xl uppercase text-white mb-2 flex items-center gap-2">
                  <Film className="w-5 h-5 text-purple-400" /> Cómics & Medios
                </h3>
                <div className="flex flex-wrap gap-2">
                  {hero.media.map((m, idx) => (
                    <span key={idx} className="px-3 py-1 bg-purple-950/60 border border-purple-800/40 text-purple-200 text-xs font-semibold rounded-lg">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-heroverse-blue hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-glow-blue transition-all"
          >
            Cerrar Ficha
          </button>
        </div>

      </div>
    </div>
  );
}
