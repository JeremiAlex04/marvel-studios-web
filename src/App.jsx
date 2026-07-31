import React, { useState } from 'react';
import Header from './components/Header';
import HomeHero from './components/HomeHero';
import FooterHeroVerse from './components/FooterHeroVerse';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [currentView, setCurrentView] = useState('inicio');

  const handleNavigate = (sectionId) => {
    setCurrentView(sectionId);
  };

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-heroverse-dark text-slate-100 selection:bg-heroverse-blue selection:text-white flex flex-col justify-between select-none">
      
      {/* Header con Logo Centrado */}
      <Header
        favoritesCount={favorites.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onNavigate={handleNavigate}
      />

      {/* Área Principal en Pantalla Completa sin Scroll (100vh Fijo) */}
      <main className="flex-1 w-full relative overflow-hidden flex items-center justify-center pt-20">
        <HomeHero onExploreUniverses={() => handleNavigate('universos')} />
      </main>

      {/* Footer Estilizado Fijo en el Borde Inferior (Visible sin necesidad de Scroll) */}
      <FooterHeroVerse onNavigate={handleNavigate} />

    </div>
  );
}
