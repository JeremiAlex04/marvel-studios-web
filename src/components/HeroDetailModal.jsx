import React from 'react';
import { X, Zap, Shield, BookOpen, MapPin, Award, Heart, Swords, Quote, Sparkles, CheckCircle2 } from 'lucide-react';

export default function HeroDetailModal({ 
  hero, 
  onClose, 
  isFavorite, 
  onToggleFavorite, 
  isComparing, 
  onToggleCompare 
}) {
  if (!hero) return null;

  const STAT_CONFIG = [
    { key: 'intelligence', label: 'Inteligencia', color: 'from-blue-600 to-cyan-400' },
    { key: 'strength', label: 'Fuerza Biológica / Física', color: 'from-red-600 to-amber-500' },
    { key: 'speed', label: 'Velocidad y Agilidad', color: 'from-emerald-500 to-teal-400' },
    { key: 'durability', label: 'Resistencia y Durabilidad', color: 'from-purple-600 to-pink-500' },
    { key: 'energy', label: 'Proyección de Energía', color: 'from-amber-500 to-yellow-300' },
    { key: 'combat', label: 'Habilidad de Combate', color: 'from-rose-600 to-red-400' },
  ];

  const totalPower = Math.round(
    Object.values(hero.stats).reduce((a, b) => a + b, 0) / 6
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      
      {/* Container Card */}
      <div 
        className="relative w-full max-w-4xl bg-marvel-panel rounded-3xl overflow-hidden border border-slate-700 shadow-2xl my-8 text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2.5 bg-black/60 hover:bg-marvel-red text-slate-300 hover:text-white rounded-full backdrop-blur-md border border-slate-700 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Banner */}
        <div className="relative h-72 sm:h-80 w-full overflow-hidden">
          <img
            src={hero.avatar}
            alt={hero.name}
            className="w-full h-full object-cover object-top filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-marvel-panel via-marvel-panel/50 to-transparent" />

          {/* Header Title Info */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="px-3 py-1 bg-marvel-red text-white text-xs font-black uppercase tracking-widest rounded-md inline-block mb-2 shadow-glow-red">
                {hero.team}
              </span>
              <h2 className="font-marvel text-4xl sm:text-6xl uppercase tracking-wider text-white drop-shadow-md">
                {hero.name}
              </h2>
              <p className="text-marvel-gold font-semibold text-sm sm:text-base">
                {hero.alias} — <span className="text-slate-300 font-normal">{hero.realName}</span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onToggleFavorite(hero.id)}
                className={`p-3 rounded-xl border font-bold flex items-center gap-2 text-xs uppercase transition-all ${
                  isFavorite 
                    ? 'bg-red-600/30 text-red-400 border-red-500 shadow-glow-red' 
                    : 'bg-black/60 text-slate-300 border-slate-700 hover:border-slate-500'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                <span className="hidden sm:inline">{isFavorite ? 'Favorito' : 'Guardar'}</span>
              </button>

              <button
                onClick={() => onToggleCompare(hero)}
                className={`p-3 rounded-xl border font-bold flex items-center gap-2 text-xs uppercase transition-all ${
                  isComparing 
                    ? 'bg-amber-500/20 text-marvel-gold border-marvel-gold shadow-glow-gold' 
                    : 'bg-black/60 text-slate-300 border-slate-700 hover:border-slate-500'
                }`}
              >
                <Swords className="w-4 h-4" />
                <span className="hidden sm:inline">{isComparing ? 'En VS' : '+ Comparar'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[60vh] overflow-y-auto">
          
          {/* Quote Block */}
          {hero.quote && (
            <div className="bg-slate-900/80 border-l-4 border-marvel-red p-4 rounded-r-2xl italic text-slate-200 flex items-start gap-3">
              <Quote className="w-6 h-6 text-marvel-red shrink-0" />
              <p className="text-sm sm:text-base font-medium">"{hero.quote}"</p>
            </div>
          )}

          {/* Grid Layout: Biography & Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Origin & Stats */}
            <div className="lg:col-span-7 space-y-6">
              
              <div>
                <h3 className="font-marvel text-2xl uppercase tracking-wide text-white mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-marvel-gold" /> Estadísticas de Poder
                </h3>
                
                <div className="space-y-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                  {STAT_CONFIG.map(({ key, label, color }) => (
                    <div key={key} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-300">{label}</span>
                        <span className="text-marvel-gold font-bold">{hero.stats[key]} / 100</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div 
                          className={`bg-gradient-to-r ${color} h-full rounded-full transition-all duration-700`}
                          style={{ width: `${hero.stats[key]}%` }}
                        />
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-400">Índice Global de Poder:</span>
                    <span className="text-marvel-red text-base font-black px-2.5 py-0.5 bg-red-950 rounded-lg border border-red-800/60">
                      {totalPower} / 100
                    </span>
                  </div>
                </div>
              </div>

              {/* Bio & Origin Meta */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-marvel-red shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-400 font-semibold block uppercase">Origen</span>
                    <span className="text-sm font-bold text-slate-200">{hero.origin}</span>
                  </div>
                </div>

                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-marvel-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-400 font-semibold block uppercase">Primera Aparición</span>
                    <span className="text-sm font-bold text-slate-200">{hero.firstAppearance}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Powers & Featured Comics */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Powers List */}
              <div>
                <h3 className="font-marvel text-2xl uppercase tracking-wide text-white mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-marvel-cyan" /> Poderes y Habilidades
                </h3>
                <ul className="space-y-2">
                  {hero.powers.map((power, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300 bg-slate-900/40 p-2.5 rounded-xl border border-slate-800/60">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{power}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Featured Comics */}
              <div>
                <h3 className="font-marvel text-2xl uppercase tracking-wide text-white mb-3 flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-400" /> Cómics Clave
                </h3>
                <div className="flex flex-wrap gap-2">
                  {hero.featuredComics.map((comic, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-950/60 text-purple-200 border border-purple-800/40"
                    >
                      {comic}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-marvel-red hover:bg-red-600 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all"
          >
            Cerrar Ficha
          </button>
        </div>

      </div>

    </div>
  );
}
