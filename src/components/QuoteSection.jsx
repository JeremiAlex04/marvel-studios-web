import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Sparkles } from 'lucide-react';

export default function QuoteSection() {
  return (
    <section className="py-24 bg-slate-950 border-t border-b border-slate-900 relative overflow-hidden">
      
      {/* Subtle glowing halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-heroverse-red/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-6">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex p-4 rounded-full bg-slate-900 border border-slate-800 text-heroverse-red shadow-glow-red"
        >
          <Quote className="w-8 h-8" />
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-hero text-3xl sm:text-5xl lg:text-6xl text-slate-100 uppercase tracking-wide leading-tight italic"
        >
          "Un héroe no se define por sus poderes, sino por las decisiones que toma cuando nadie lo observa."
        </motion.blockquote>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-heroverse-gold flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" /> Códice Fundamental HeroVerse
        </motion.div>

      </div>

    </section>
  );
}
