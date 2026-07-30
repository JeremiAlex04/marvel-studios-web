import React from 'react';
import logoImg from '../img/logo.png';

export default function FooterHeroVerse({ onNavigate }) {
  return (
    <footer className="bg-[#101010]/95 backdrop-blur-xl border-t border-[#202020] py-2.5 sm:py-3 text-[#9E9E9E] text-xs shadow-2xl">
      <div className="max-w-5xl mx-auto px-4 flex flex-row items-center justify-between gap-4">
        
        {/* Logo de Marvel Studios ultra estilizado y compacto */}
        <div 
          className="flex items-center cursor-pointer group" 
          onClick={() => onNavigate('inicio')}
        >
          <img
            src={logoImg}
            alt="Marvel Studios Logo"
            className="h-6 sm:h-8 w-auto object-contain max-w-[140px] sm:max-w-[180px] transition-transform duration-300 group-hover:scale-105 filter drop-shadow-md"
          />
        </div>

        {/* Copyright estilizado en 1 sola línea */}
        <div className="text-[11px] font-montserrat font-medium text-[#9E9E9E]">
          <span>© {new Date().getFullYear()} Marvel Studios. Todos los derechos reservados.</span>
        </div>

      </div>
    </footer>
  );
}
