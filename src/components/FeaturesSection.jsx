import React from 'react';
import { motion } from 'framer-motion';
import { FEATURES_DATA } from '../data/heroverseData';
import { UserCheck, Zap, ShieldAlert, Film, Sparkles } from 'lucide-react';

const ICON_MAP = {
  UserCheck: UserCheck,
  Zap: Zap,
  ShieldAlert: ShieldAlert,
  Film: Film
};

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-heroverse-darker relative overflow-hidden border-t border-b border-slate-800/80">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-heroverse-blue/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-heroverse-red/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-heroverse-gold text-xs font-black uppercase tracking-widest">
            <Sparkles className="w-4 h-4" /> Centro de Conocimiento
          </div>
          <h2 className="font-hero text-5xl sm:text-6xl uppercase tracking-wider text-white">
            ¿Qué <span className="text-gradient-blue">encontrarás?</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Explora una plataforma estructurada con la información más precisa sobre los personajes y los arcos argumentales más impactantes.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES_DATA.map((feature, idx) => {
            const IconComp = ICON_MAP[feature.icon] || Zap;

            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={{ y: -8 }}
                className="bg-heroverse-card p-8 rounded-3xl border border-slate-800 hover:border-slate-600 transition-all duration-300 shadow-xl space-y-5 text-center flex flex-col items-center group"
              >
                
                {/* Glowing Icon Container */}
                <div className={`w-16 h-16 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center ${feature.bgGlow} group-hover:scale-110 transition-transform duration-300`}>
                  <IconComp className={`w-8 h-8 ${feature.color}`} />
                </div>

                <h3 className="font-hero text-2xl uppercase tracking-wide text-white group-hover:text-heroverse-gold transition-colors">
                  {feature.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {feature.description}
                </p>

              </motion.div>
            );
          })}
        </div>

      </div>

    </section>
  );
}
