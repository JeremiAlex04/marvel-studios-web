import React, { useState, useEffect } from 'react';
import { Sparkles, Shield, Swords, Zap, ChevronRight, RefreshCw } from 'lucide-react';

export default function HeroBanner({ heroes, onSelectHero, onToggleCompare, isComparing }) {
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const featuredHero = heroes[featuredIndex] || heroes[0];

  // Auto-rotate featured hero every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % heroes.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [heroes.length]);

  if (!featuredHero) return null;

  return (
    <div className="relative overflow-hidden mb-10 rounded-2xl border border-slate-800 shadow-2xl bg-marvel-panel">
      
      {/* Background Glow Effect */}
      <div 
        className="absolute inset-0 opacity-25 mix-blend-screen bg-cover bg-center transition-all duration-700 blur-sm scale-105"
        style={{ backgroundImage: `url(${featuredHero.avatar})` }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-r from-marvel-dark via-marvel-dark/90 to-transparent z-10" />

      {/* Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 py-10 md:py-14 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        {/* Text Details */}
        <div className="md:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-marvel-red/20 border border-marvel-red/40 text-marvel-red text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" /> Héroe Destacado del Día
          </div>

          <h1 className="font-marvel text-5xl sm:text-6xl lg:text-7xl uppercase tracking-wider text-white drop-shadow-md">
            {featuredHero.name}
          </h1>

          <p className="text-marvel-gold font-medium text-lg italic">
            "{featuredHero.quote}"
          </p>

          <p className="text-slate-300 text-sm md:text-base line-clamp-3 leading-relaxed max-w-2xl">
            {featuredHero.description}
          </p>

          {/* Quick Power Stats Overview */}
          <div className="grid grid-cols-3 gap-3 max-w-md pt-2">
            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <span className="text-xs text-slate-400 block font-semibold">Fuerza</span>
              <div className="flex items-center gap-2">
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-red-500 h-full rounded-full" style={{ width: `${featuredHero.stats.strength}%` }} />
                </div>
                <span className="text-xs font-bold text-slate-200">{featuredHero.stats.strength}</span>
              </div>
            </div>
            
            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <span className="text-xs text-slate-400 block font-semibold">Inteligencia</span>
              <div className="flex items-center gap-2">
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: `${featuredHero.stats.intelligence}%` }} />
                </div>
                <span className="text-xs font-bold text-slate-200">{featuredHero.stats.intelligence}</span>
              </div>
            </div>

            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <span className="text-xs text-slate-400 block font-semibold">Energía</span>
              <div className="flex items-center gap-2">
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: `${featuredHero.stats.energy}%` }} />
                </div>
                <span className="text-xs font-bold text-slate-200">{featuredHero.stats.energy}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => onSelectHero(featuredHero)}
              className="px-6 py-3 bg-marvel-red hover:bg-red-600 text-white font-bold rounded-xl shadow-glow-red flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
            >
              <span>Ficha Completa</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onToggleCompare(featuredHero)}
              className={`px-5 py-3 rounded-xl font-bold border transition-all flex items-center gap-2 ${
                isComparing(featuredHero.id)
                  ? 'bg-amber-500/20 text-marvel-gold border-marvel-gold shadow-glow-gold'
                  : 'bg-slate-800/80 text-slate-200 border-slate-700 hover:border-slate-500'
              }`}
            >
              <Swords className="w-4 h-4" />
              <span>{isComparing(featuredHero.id) ? 'En Comparación' : '+ Comparar VS'}</span>
            </button>

            <button
              onClick={() => setFeaturedIndex((prev) => (prev + 1) % heroes.length)}
              className="p-3 bg-slate-800/60 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700/80 transition-colors"
              title="Cambiar Héroe Destacado"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Featured Hero Portrait */}
        <div className="md:col-span-5 flex justify-center items-center">
          <div className="relative group cursor-pointer" onClick={() => onSelectHero(featuredHero)}>
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-marvel-red via-marvel-gold to-cyan-500 opacity-60 blur-lg group-hover:opacity-100 transition duration-500" />
            <div className="relative rounded-2xl overflow-hidden border-2 border-slate-700/80 w-64 h-80 sm:w-72 sm:h-96 shadow-2xl">
              <img
                src={featuredHero.avatar}
                alt={featuredHero.name}
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex items-end p-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-marvel-gold block">
                    {featuredHero.alias}
                  </span>
                  <span className="text-white font-marvel text-2xl tracking-wide">
                    {featuredHero.name}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
