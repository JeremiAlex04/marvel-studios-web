import React from 'react';
import { Heart, Swords, Eye, Zap, Shield, Flame, Star } from 'lucide-react';

export default function HeroCard({ 
  hero, 
  onSelectHero, 
  onToggleFavorite, 
  isFavorite,
  onToggleCompare, 
  isComparing 
}) {
  // Compute average overall power index
  const totalPower = Math.round(
    (hero.stats.intelligence + 
     hero.stats.strength + 
     hero.stats.speed + 
     hero.stats.durability + 
     hero.stats.energy + 
     hero.stats.combat) / 6
  );

  return (
    <div className="group relative bg-marvel-card hover:bg-marvel-cardHover rounded-2xl overflow-hidden border border-slate-800 hover:border-slate-600 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1.5 flex flex-col">
      
      {/* Visual Header Image Container */}
      <div className="relative h-72 w-full overflow-hidden cursor-pointer" onClick={() => onSelectHero(hero)}>
        
        {/* Hero Portrait */}
        <img
          src={hero.avatar}
          alt={hero.name}
          className="w-full h-full object-cover object-top transform group-hover:scale-110 transition-transform duration-700 ease-out"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-marvel-card via-marvel-card/30 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />

        {/* Team Badge Top Left */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-widest bg-black/70 text-marvel-gold backdrop-blur-md border border-amber-500/30">
            {hero.team}
          </span>
        </div>

        {/* Favorite Icon Top Right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(hero.id);
          }}
          className={`absolute top-3 right-3 z-10 p-2.5 rounded-full backdrop-blur-md transition-all ${
            isFavorite 
              ? 'bg-red-600/30 text-red-500 border border-red-500 shadow-glow-red' 
              : 'bg-black/50 text-slate-300 border border-slate-700/60 hover:text-red-400'
          }`}
          title={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500' : ''}`} />
        </button>

        {/* Power Score Badge Bottom Right */}
        <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-slate-700">
          <Zap className="w-3.5 h-3.5 text-marvel-gold animate-pulse" />
          <span className="text-xs font-black text-white">{totalPower}</span>
          <span className="text-[9px] text-slate-400 font-bold uppercase">PWR</span>
        </div>

      </div>

      {/* Hero Information */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div>
          <span className="text-xs font-bold text-marvel-gold tracking-widest uppercase block mb-1">
            {hero.alias}
          </span>
          <h3 
            className="font-marvel text-3xl uppercase tracking-wide text-slate-100 group-hover:text-marvel-red transition-colors cursor-pointer"
            onClick={() => onSelectHero(hero)}
          >
            {hero.name}
          </h3>
          <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
            {hero.description}
          </p>
        </div>

        {/* Power Bars Mini Overview */}
        <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
          <div className="flex justify-between items-center text-[11px] font-semibold text-slate-400">
            <span>Fuerza</span>
            <span className="text-slate-200">{hero.stats.strength}/100</span>
          </div>
          <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-red-600 to-amber-500 h-full rounded-full transition-all duration-500" 
              style={{ width: `${hero.stats.strength}%` }} 
            />
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 pt-2">
          
          <button
            onClick={() => onSelectHero(hero)}
            className="flex-1 py-2.5 px-3 bg-slate-800 hover:bg-marvel-red text-slate-200 hover:text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Detalles</span>
          </button>

          <button
            onClick={() => onToggleCompare(hero)}
            className={`p-2.5 rounded-xl border text-xs font-bold uppercase transition-all flex items-center justify-center ${
              isComparing 
                ? 'bg-amber-500/20 text-marvel-gold border-marvel-gold shadow-glow-gold' 
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
            }`}
            title="Añadir a comparador VS"
          >
            <Swords className="w-4 h-4" />
          </button>

        </div>

      </div>

    </div>
  );
}
