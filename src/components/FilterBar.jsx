import React from 'react';
import { TEAMS } from '../data/heroes';
import { Shield, Zap, Dna, Flame, Skull, ArrowUpDown, Filter } from 'lucide-react';

const ICON_MAP = {
  Shield: Shield,
  Zap: Zap,
  Dna: Dna,
  Flame: Flame,
  Skull: Skull
};

export default function FilterBar({ 
  activeTeam, 
  setActiveTeam, 
  sortBy, 
  setSortBy, 
  totalResults 
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-marvel-panel/60 p-4 rounded-2xl border border-slate-800/80 backdrop-blur-sm">
      
      {/* Selector de Categorías / Equipos */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
        {TEAMS.map((team) => {
          const IconComponent = ICON_MAP[team.icon] || Shield;
          const isActive = activeTeam === team.id;

          return (
            <button
              key={team.id}
              onClick={() => setActiveTeam(team.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border ${
                isActive
                  ? 'bg-marvel-red text-white border-red-500 shadow-glow-red'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <IconComponent className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-marvel-red'}`} />
              <span>{team.label}</span>
            </button>
          );
        })}
      </div>

      {/* Ordenamiento y Contador */}
      <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 border-slate-800 pt-3 md:pt-0">
        
        <div className="text-xs text-slate-400 font-medium">
          <span className="text-marvel-gold font-bold">{totalResults}</span> Héroes
        </div>

        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-900 text-slate-200 text-xs font-semibold px-3 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-marvel-red"
          >
            <option value="default">Orden predeterminado</option>
            <option value="name">Nombre (A-Z)</option>
            <option value="strength">Mayor Fuerza</option>
            <option value="intelligence">Mayor Inteligencia</option>
            <option value="combat">Mayor Habilidad de Combate</option>
          </select>
        </div>

      </div>

    </div>
  );
}
