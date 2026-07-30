import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Shield, UserX, Flame, Zap } from 'lucide-react';

export default function FeaturedHeroesSection({ 
  heroes = [], 
  onSelectHero, 
  favorites = [], 
  onToggleFavorite 
}) {
  return (
    <section id="heroes" className="py-24 bg-heroverse-dark relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Título Heroico */}
        <div className="text-center space-y-3 mb-14">
          <h2 className="font-hero text-5xl sm:text-6xl uppercase tracking-wider text-white">
            Héroes <span className="text-gradient-gold font-extrabold">Destacados</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto font-medium">
            Los guardianes más poderosos listos para responder al llamado de la justicia.
          </p>
        </div>

        {/* Estado Vacío Heroico */}
        {heroes.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/60 rounded-3xl border-2 border-slate-800 max-w-2xl mx-auto p-10 space-y-4 shadow-2xl backdrop-blur-md">
            <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-700 flex items-center justify-center mx-auto text-heroverse-red shadow-glow-red">
              <Zap className="w-8 h-8" />
            </div>
            <h3 className="font-hero text-3xl uppercase text-white tracking-wide">
              No hay superhéroes registrados aún
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              El salón de los héroes está despejado para añadir nuevas fichas técnicas y habilidades.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {heroes.map((hero) => (
              <div key={hero.id} className="bg-heroverse-card p-4 rounded-2xl border-2 border-slate-800">
                <h3 className="font-hero text-xl text-white">{hero.name}</h3>
              </div>
            ))}
          </div>
        )}

      </div>

    </section>
  );
}
