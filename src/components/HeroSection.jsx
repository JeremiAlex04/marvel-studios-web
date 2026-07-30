import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Compass, Shield, ArrowRight, Zap, Flame, Award } from 'lucide-react';

export default function HeroSection({ onExploreHeroes, onExploreUniverses }) {
  return (
    <section id="inicio" className="relative min-h-[88vh] w-full flex items-center justify-center pt-28 pb-20 overflow-hidden bg-radial-hero bg-hero-grid">
      
      {/* Dynamic Animated Rays & Heroic Energy Aura */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-heroverse-blue/20 rounded-full filter blur-[140px] animate-pulse-slow" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-heroverse-red/20 rounded-full filter blur-[140px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-heroverse-gold/10 rounded-full filter blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-8">

        {/* Heroic Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-2"
        >
          <h1 className="font-hero text-6xl sm:text-8xl lg:text-9xl uppercase tracking-wider text-white leading-[0.88] drop-shadow-2xl">
            SANTUARIO DE <span className="text-gradient-blue font-extrabold">HÉROES</span>
          </h1>
          <p className="font-hero text-2xl sm:text-3xl text-heroverse-gold tracking-widest uppercase opacity-95">
            HONOR • PODER • JUSTICIA
          </p>
        </motion.div>

        {/* Heroic Subtitle */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-slate-300 text-base sm:text-xl max-w-2xl mx-auto font-medium leading-relaxed"
        >
          Bienvenido a la fortaleza donde convergen las leyendas más imponentes, universos míticos y hazañas inquebrantables.
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-5 pt-4"
        >
          <button
            onClick={onExploreHeroes}
            className="px-9 py-4 bg-gradient-to-r from-heroverse-blue via-blue-600 to-blue-800 hover:from-blue-600 hover:to-blue-900 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-2xl shadow-glow-blue transition-all transform hover:-translate-y-1 flex items-center gap-3 border border-blue-400/40"
          >
            <Shield className="w-5 h-5 text-heroverse-gold" />
            <span>Explorar Leyendas</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onExploreUniverses}
            className="px-9 py-4 bg-slate-900/90 hover:bg-slate-800 text-slate-100 font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-2xl border-2 border-slate-700 hover:border-heroverse-gold transition-all transform hover:-translate-y-1 flex items-center gap-3 backdrop-blur-md shadow-lg"
          >
            <Compass className="w-5 h-5 text-heroverse-red" />
            <span>Ver Universos</span>
          </button>
        </motion.div>

        {/* Heroic Features Bar */}
        <div className="pt-8 flex items-center justify-center gap-8 text-xs text-slate-400 font-extrabold uppercase tracking-widest border-t border-slate-800/80 max-w-xl mx-auto">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-heroverse-red" />
            <span>Poder Máximo</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-heroverse-blue" />
            <span>Defensores</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-heroverse-gold" />
            <span>Multiverso</span>
          </div>
        </div>

      </div>

    </section>
  );
}
