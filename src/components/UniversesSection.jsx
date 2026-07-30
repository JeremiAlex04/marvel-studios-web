import React from 'react';
import { motion } from 'framer-motion';
import { UNIVERSES_DATA } from '../data/heroverseData';
import { ArrowRight, Compass, Layers, Shield, Sparkles } from 'lucide-react';

export default function UniversesSection({ onSelectUniverse }) {
  return (
    <section id="universos" className="py-24 bg-heroverse-darker relative overflow-hidden border-t border-slate-800/80">
      
      {/* Glow Effects */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-heroverse-blue/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-heroverse-red/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Encabezado Heroico */}
        <div className="text-center space-y-3 mb-14">
          <h2 className="font-hero text-5xl sm:text-6xl uppercase tracking-wider text-white">
            Explora los <span className="text-gradient-blue font-extrabold">Universos Heroicos</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto font-medium">
            Dimensión por dimensión, conoce los bastiones de justicia y los campos de batalla más imponentes.
          </p>
        </div>

        {/* Estado Vacío o Tarjetas Heroicas */}
        {UNIVERSES_DATA.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/60 rounded-3xl border-2 border-slate-800 max-w-2xl mx-auto p-10 space-y-4 shadow-2xl backdrop-blur-md">
            <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-700 flex items-center justify-center mx-auto text-heroverse-gold shadow-glow-gold">
              <Shield className="w-8 h-8" />
            </div>
            <h3 className="font-hero text-3xl uppercase text-white tracking-wide">
              No hay universos registrados aún
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              El portal multiversal está limpio y preparado para integrar nuevas dimensiones heroicas.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {UNIVERSES_DATA.map((universe, idx) => (
              <motion.div
                key={universe.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-heroverse-card p-6 rounded-3xl border-2 border-slate-800 hover:border-heroverse-blue transition-all"
              >
                <h3 className="font-hero text-2xl uppercase text-white">{universe.name}</h3>
                <p className="text-xs text-slate-300 mt-2">{universe.description}</p>
              </motion.div>
            ))}
          </div>
        )}

      </div>

    </section>
  );
}
