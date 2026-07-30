import React from 'react';
import { X, Swords, Crown, Zap, Shield, Sparkles, Check, RefreshCw } from 'lucide-react';

export default function PowerCompareModal({ 
  compareList, 
  onClose, 
  onRemoveHero, 
  allHeroes, 
  onAddHeroToCompare 
}) {
  const hero1 = compareList[0];
  const hero2 = compareList[1];

  const STATS_KEYS = [
    { key: 'intelligence', label: 'Inteligencia' },
    { key: 'strength', label: 'Fuerza Física' },
    { key: 'speed', label: 'Velocidad' },
    { key: 'durability', label: 'Durabilidad' },
    { key: 'energy', label: 'Energía' },
    { key: 'combat', label: 'Combate' },
  ];

  const getPowerIndex = (hero) => {
    if (!hero) return 0;
    return Math.round(
      Object.values(hero.stats).reduce((a, b) => a + b, 0) / 6
    );
  };

  const pwr1 = getPowerIndex(hero1);
  const pwr2 = getPowerIndex(hero2);

  let winnerText = '¡EMPATE TÁCTICO!';
  if (pwr1 > pwr2 && hero1) winnerText = `¡${hero1.name.toUpperCase()} DOMINA LA BATALLA!`;
  if (pwr2 > pwr1 && hero2) winnerText = `¡${hero2.name.toUpperCase()} DOMINA LA BATALLA!`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      
      <div 
        className="relative w-full max-w-5xl bg-marvel-panel rounded-3xl overflow-hidden border border-slate-700 shadow-2xl my-6 text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-slate-950 p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-marvel-red/20 text-marvel-red rounded-xl border border-marvel-red/40">
              <Swords className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="font-marvel text-3xl uppercase tracking-wider text-white">
                Battle Simulator — Comparador VS
              </h2>
              <p className="text-xs text-slate-400">
                Enfrentamiento directo de atributos y capacidad táctica en combate.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 bg-slate-900 hover:bg-marvel-red text-slate-400 hover:text-white rounded-full border border-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Winner Announcement Banner */}
        {hero1 && hero2 && (
          <div className="bg-gradient-to-r from-amber-600/20 via-marvel-red/30 to-amber-600/20 p-3 text-center border-b border-amber-500/30">
            <span className="text-xs font-black uppercase tracking-widest text-marvel-gold flex items-center justify-center gap-2">
              <Crown className="w-4 h-4 text-marvel-gold" /> {winnerText}
            </span>
          </div>
        )}

        {/* Body Content */}
        <div className="p-6 space-y-8 max-h-[70vh] overflow-y-auto">
          
          {/* Side by side Fighter Cards */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Fighter 1 */}
            <div className="md:col-span-5 bg-slate-900/80 p-5 rounded-2xl border border-slate-800 relative">
              {hero1 ? (
                <div className="space-y-4 text-center">
                  <button
                    onClick={() => onRemoveHero(hero1.id)}
                    className="absolute top-3 right-3 text-xs bg-red-950 text-red-400 hover:bg-red-900 p-1.5 rounded-lg border border-red-800"
                    title="Remover luchador"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <img
                    src={hero1.avatar}
                    alt={hero1.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-marvel-red shadow-glow-red"
                  />
                  <div>
                    <span className="text-xs text-marvel-gold font-bold uppercase">{hero1.alias}</span>
                    <h3 className="font-marvel text-3xl uppercase text-white">{hero1.name}</h3>
                  </div>
                  <div className="inline-block px-3 py-1 bg-slate-950 rounded-full border border-slate-800 text-xs font-black">
                    PWR INDEX: <span className="text-marvel-gold">{pwr1}</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-sm text-slate-400 mb-3">Selecciona el primer héroe</p>
                  <select
                    onChange={(e) => {
                      const selected = allHeroes.find((h) => h.id === e.target.value);
                      if (selected) onAddHeroToCompare(selected);
                    }}
                    className="bg-slate-950 text-slate-200 text-xs p-2.5 rounded-xl border border-slate-700 w-full"
                  >
                    <option value="">-- Seleccionar Héroe 1 --</option>
                    {allHeroes.map((h) => (
                      <option key={h.id} value={h.id}>{h.name} ({h.alias})</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* VS Badge Center */}
            <div className="md:col-span-2 text-center py-2">
              <div className="w-16 h-16 rounded-full bg-marvel-red text-white font-marvel text-3xl flex items-center justify-center mx-auto shadow-glow-red border-2 border-amber-400">
                VS
              </div>
            </div>

            {/* Fighter 2 */}
            <div className="md:col-span-5 bg-slate-900/80 p-5 rounded-2xl border border-slate-800 relative">
              {hero2 ? (
                <div className="space-y-4 text-center">
                  <button
                    onClick={() => onRemoveHero(hero2.id)}
                    className="absolute top-3 right-3 text-xs bg-red-950 text-red-400 hover:bg-red-900 p-1.5 rounded-lg border border-red-800"
                    title="Remover luchador"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <img
                    src={hero2.avatar}
                    alt={hero2.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-cyan-500 shadow-glow-cyan"
                  />
                  <div>
                    <span className="text-xs text-marvel-cyan font-bold uppercase">{hero2.alias}</span>
                    <h3 className="font-marvel text-3xl uppercase text-white">{hero2.name}</h3>
                  </div>
                  <div className="inline-block px-3 py-1 bg-slate-950 rounded-full border border-slate-800 text-xs font-black">
                    PWR INDEX: <span className="text-marvel-cyan">{pwr2}</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-sm text-slate-400 mb-3">Selecciona el segundo héroe</p>
                  <select
                    onChange={(e) => {
                      const selected = allHeroes.find((h) => h.id === e.target.value);
                      if (selected) onAddHeroToCompare(selected);
                    }}
                    className="bg-slate-950 text-slate-200 text-xs p-2.5 rounded-xl border border-slate-700 w-full"
                  >
                    <option value="">-- Seleccionar Héroe 2 --</option>
                    {allHeroes
                      .filter((h) => !hero1 || h.id !== hero1.id)
                      .map((h) => (
                        <option key={h.id} value={h.id}>{h.name} ({h.alias})</option>
                      ))}
                  </select>
                </div>
              )}
            </div>

          </div>

          {/* Stats Breakdown Comparison Matrix */}
          {hero1 && hero2 && (
            <div className="space-y-4 bg-slate-950/60 p-6 rounded-2xl border border-slate-800">
              <h4 className="font-marvel text-2xl uppercase tracking-wide text-white text-center mb-4">
                Desglose Cara a Cara
              </h4>

              {STATS_KEYS.map(({ key, label }) => {
                const val1 = hero1.stats[key];
                const val2 = hero2.stats[key];
                const isWinner1 = val1 > val2;
                const isWinner2 = val2 > val1;

                return (
                  <div key={key} className="space-y-1">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className={`w-12 text-right ${isWinner1 ? 'text-marvel-gold font-extrabold' : 'text-slate-400'}`}>
                        {val1} {isWinner1 && '👑'}
                      </span>
                      <span className="text-slate-300 uppercase tracking-wider">{label}</span>
                      <span className={`w-12 text-left ${isWinner2 ? 'text-marvel-cyan font-extrabold' : 'text-slate-400'}`}>
                        {isWinner2 && '👑'} {val2}
                      </span>
                    </div>

                    <div className="flex gap-2 items-center">
                      {/* Left Bar (Fighter 1) */}
                      <div className="w-1/2 bg-slate-900 h-2.5 rounded-full overflow-hidden flex justify-end">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            isWinner1 ? 'bg-gradient-to-l from-amber-500 to-red-600' : 'bg-slate-700'
                          }`}
                          style={{ width: `${val1}%` }}
                        />
                      </div>

                      {/* Right Bar (Fighter 2) */}
                      <div className="w-1/2 bg-slate-900 h-2.5 rounded-full overflow-hidden flex justify-start">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            isWinner2 ? 'bg-gradient-to-r from-cyan-500 to-blue-600' : 'bg-slate-700'
                          }`}
                          style={{ width: `${val2}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-marvel-red hover:bg-red-600 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all"
          >
            Cerrar Simulador
          </button>
        </div>

      </div>

    </div>
  );
}
