import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroCard from './HeroCard';
import { SearchX } from 'lucide-react';

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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-20 bg-[#111]/60 rounded-3xl border border-slate-800/80 my-8 px-4"
      >
        <SearchX className="w-16 h-16 text-marvel-red mx-auto mb-4 animate-bounce" />
        <h3 className="font-montserrat font-black text-2xl uppercase tracking-wider text-white mb-2">
          No se encontraron héroes
        </h3>
        <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
          Intenta ajustar los términos de búsqueda o cambia la categoría de equipo para descubrir más personajes del Universo Marvel.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-6"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.06 } },
      }}
    >
      <AnimatePresence>
        {heroes.map((hero) => (
          <motion.div
            key={hero.id}
            layout
            variants={{
              hidden: { opacity: 0, y: 28, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
            }}
            exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.2 } }}
          >
            <HeroCard
              hero={hero}
              onSelectHero={onSelectHero}
              isFavorite={favorites.includes(hero.id)}
              onToggleFavorite={onToggleFavorite}
              isComparing={compareList.some((h) => h.id === hero.id)}
              onToggleCompare={onToggleCompare}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
