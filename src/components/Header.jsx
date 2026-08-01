import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Heart, Menu, X } from 'lucide-react';

export default function Header({ 
  favoritesCount, 
  searchQuery, 
  setSearchQuery,
  onNavigate,
  currentView = 'inicio'
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out bg-[#101010] py-3.5 border-b border-[#202020] shadow-2xl shadow-black/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Izquierda: Logo Marvel Studios Ubicado a la Izquierda con animación suave */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center justify-start"
        >
          <div 
            onClick={() => onNavigate('inicio')}
            className="cursor-pointer group flex items-center justify-start py-1"
          >
            <img
              src="/img/logo.png"
              alt="Marvel Studios Logo"
              className="h-10 sm:h-14 lg:h-16 w-auto object-contain max-w-[200px] sm:max-w-[300px] lg:max-w-[360px] transition-transform duration-300 group-hover:scale-105 filter drop-shadow-2xl"
            />
          </div>
        </motion.div>

        {/* Centro / Derecha: Navegación y Buscador con entrada gradual */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center space-x-6"
        >
          
          {/* Navegación de Escritorio */}
          <nav className="hidden lg:flex items-center space-x-1">
            <div className="bg-[#1F1F1F]/90 p-1 rounded-none border border-white/10 backdrop-blur-md flex items-center space-x-1">
              {[{ id: 'inicio', label: 'Inicio' }, { id: 'heroes', label: 'Héroes' }, { id: 'universos', label: 'Universos' }].map(nav => (
                <button
                  key={nav.id}
                  onClick={() => onNavigate(nav.id)}
                  className={`px-4 py-2 text-xs font-montserrat font-bold uppercase tracking-wider rounded-none transition-all cursor-pointer ${
                    currentView === nav.id
                      ? 'bg-marvel-red text-white'
                      : 'text-white hover:text-marvel-red hover:bg-[#2A2A2A]'
                  }`}
                >
                  {nav.label}
                </button>
              ))}
              <button 
                onClick={() => onNavigate('favoritos')} 
                className={`px-4 py-2 text-xs font-montserrat font-bold uppercase tracking-wider rounded-none transition-all flex items-center gap-2 cursor-pointer ${
                  currentView === 'favoritos' ? 'bg-marvel-red text-white' : 'text-white hover:text-marvel-red hover:bg-[#2A2A2A]'
                }`}
              >
                <span>Favoritos</span>
                {favoritesCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-none text-[10px] bg-white text-marvel-red font-black">
                    {favoritesCount}
                  </span>
                )}
              </button>
            </div>
          </nav>

          {/* Buscador Cinematográfico */}
          <div className="flex items-center">
            <div className="relative">
              {searchOpen ? (
                <div className="flex items-center bg-[#1F1F1F] border border-marvel-red rounded-none px-3 py-2 shadow-glow-red">
                  <Search className="w-4 h-4 text-marvel-red mr-2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar en el multiverso..."
                    className="bg-transparent text-xs text-white placeholder-[#9E9E9E] focus:outline-none w-32 sm:w-48 font-sans"
                    autoFocus
                  />
                  <button onClick={() => setSearchOpen(false)} className="text-[#9E9E9E] hover:text-white ml-2">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2.5 bg-[#1F1F1F] hover:bg-marvel-red text-white rounded-none border border-white/10 hover:border-marvel-red transition-all cursor-pointer"
                  title="Buscar en Marvel Studios"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Botón Menú Móvil */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 bg-[#1F1F1F] text-white rounded-none border border-white/10 hover:border-marvel-red transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </motion.div>

      </div>

      {/* Menú Desplegable Móvil */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#101010]/98 backdrop-blur-2xl border-b border-[#202020] p-6 space-y-4 shadow-2xl animate-fade-in mt-2">
          <nav className="flex flex-col space-y-3 font-montserrat">
            <button 
              onClick={() => { onNavigate('inicio'); setMobileMenuOpen(false); }}
              className="text-left py-2.5 font-bold text-xs uppercase tracking-wider text-white hover:text-marvel-red border-b border-[#1F1F1F]"
            >
              Inicio
            </button>
            <button 
              onClick={() => { onNavigate('heroes'); setMobileMenuOpen(false); }}
              className="text-left py-2.5 font-bold text-xs uppercase tracking-wider text-white hover:text-marvel-red border-b border-[#1F1F1F]"
            >
              Héroes
            </button>
            <button 
              onClick={() => { onNavigate('universos'); setMobileMenuOpen(false); }}
              className="text-left py-2.5 font-bold text-xs uppercase tracking-wider text-white hover:text-marvel-red border-b border-[#1F1F1F]"
            >
              Universos
            </button>
            <button 
              onClick={() => { onNavigate('favoritos'); setMobileMenuOpen(false); }}
              className="text-left py-2.5 font-bold text-xs uppercase tracking-wider text-white hover:text-marvel-red border-b border-[#1F1F1F] flex justify-between items-center"
            >
              <span>Favoritos</span>
              {favoritesCount > 0 && (
                <span className="px-2 py-0.5 bg-marvel-red text-white text-[10px] rounded-none font-black">
                  {favoritesCount}
                </span>
              )}
            </button>
          </nav>
        </div>
      )}
    </motion.header>
  );
}
