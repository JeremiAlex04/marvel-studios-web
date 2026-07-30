import React from 'react';
import { Search, Shield, Swords, Sparkles, X, Heart } from 'lucide-react';

export default function Navbar({ 
  searchQuery, 
  setSearchQuery, 
  compareList, 
  openCompareModal,
  favoritesCount,
  showOnlyFavorites,
  setShowOnlyFavorites 
}) {
  return (
    <header className="sticky top-0 z-40 bg-marvel-dark/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand Marvel */}
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => { setSearchQuery(''); setShowOnlyFavorites(false); }}>
            <div className="bg-marvel-red text-white font-marvel text-3xl px-3 py-1 tracking-wider uppercase shadow-glow-red transform group-hover:scale-105 transition-transform duration-200 border border-red-500/50">
              MARVEL
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-marvel text-xl tracking-widest text-slate-100 uppercase leading-none">
                DATABASE
              </span>
              <span className="text-[10px] text-marvel-gold font-bold tracking-widest uppercase flex items-center gap-1">
                <Sparkles className="w-3 h-3 animate-pulse text-marvel-gold" /> HQ HEROES & POWERS
              </span>
            </div>
          </div>

          {/* Buscador en tiempo real */}
          <div className="flex-1 max-w-md mx-4 sm:mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4 text-marvel-red" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar héroe, poder o alter ego (ej. Stark, Araña)..."
                className="w-full pl-10 pr-10 py-2.5 bg-marvel-panel/80 text-sm text-slate-100 placeholder-slate-400 rounded-full border border-slate-700/80 focus:outline-none focus:border-marvel-red focus:ring-1 focus:ring-marvel-red transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Acciones Rápidas (Favoritos y Comparador VS) */}
          <div className="flex items-center space-x-3">
            
            {/* Botón Filtro Favoritos */}
            <button
              onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all border ${
                showOnlyFavorites 
                  ? 'bg-red-600/20 text-red-400 border-red-500 shadow-glow-red' 
                  : 'bg-marvel-panel/60 text-slate-300 border-slate-700/60 hover:border-slate-500'
              }`}
              title="Filtrar por mis héroes favoritos"
            >
              <Heart className={`w-4 h-4 ${showOnlyFavorites ? 'fill-red-500 text-red-500' : 'text-slate-400'}`} />
              <span className="hidden md:inline">Favoritos</span>
              {favoritesCount > 0 && (
                <span className="ml-1 bg-marvel-red text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Botón Modo Comparar (VS) */}
            <button
              onClick={openCompareModal}
              disabled={compareList.length === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border ${
                compareList.length > 0
                  ? 'bg-gradient-to-r from-amber-500 to-marvel-red text-white border-marvel-gold shadow-glow-gold hover:opacity-90 animate-bounce-short cursor-pointer'
                  : 'bg-slate-800/40 text-slate-500 border-slate-800 cursor-not-allowed'
              }`}
            >
              <Swords className={`w-4 h-4 ${compareList.length > 0 ? 'text-white' : 'text-slate-600'}`} />
              <span>VS Battle</span>
              <span className={`ml-1 text-[11px] px-2 py-0.5 rounded-md font-extrabold ${
                compareList.length > 0 ? 'bg-black/40 text-marvel-gold' : 'bg-slate-900 text-slate-600'
              }`}>
                {compareList.length}/2
              </span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
}
