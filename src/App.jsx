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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-heroverse-dark text-slate-100 selection:bg-heroverse-blue selection:text-white flex flex-col justify-between relative">
      
      {/* Header con Logo Centrado */}
      <Header
        favoritesCount={favorites.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onNavigate={handleNavigate}
      />

      {/* Área Principal a Ancho Completo (Ubicada exactamente debajo del Header) */}
      <main className="flex-1 w-full relative pt-24 sm:pt-28">
        <HomeHero onExploreUniverses={() => handleNavigate('universos')} />
      </main>

      {/* Footer */}
      <FooterHeroVerse onNavigate={handleNavigate} />

    </div>
  );
}
