import React from 'react';
import HeroCard from './HeroCard';
import { SearchX, Sparkles } from 'lucide-react';

export default function HeroGrid({ 
  heroes, 
  onSelectHero, 
  favorites, 
  onToggleFavorite, 
  compareList, 
  onToggleCompare 
}) {
  if (heroes.length === 0) {
    return (
      <div className="text-center py-16 bg-marvel-panel/40 rounded-2xl border border-slate-800/80 my-8 px-4">
        <SearchX className="w-16 h-16 text-marvel-red mx-auto mb-4 animate-bounce" />
        <h3 className="font-marvel text-3xl uppercase tracking-wider text-white mb-2">
          No se encontraron superhéroes
        </h3>
        <p className="text-slate-400 text-sm max-w-md mx-auto">
          Intenta ajustar los términos de búsqueda o cambiar de categoría de equipo para descubrir más personajes del universo Marvel.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-6">
      {heroes.map((hero) => (
        <HeroCard
          key={hero.id}
          hero={hero}
          onSelectHero={onSelectHero}
          isFavorite={favorites.includes(hero.id)}
          onToggleFavorite={onToggleFavorite}
          isComparing={compareList.some((h) => h.id === hero.id)}
          onToggleCompare={onToggleCompare}
        />
      ))}
    </div>
  );
}
