import React, { useState } from 'react';
import Header from './components/Header';
import HomeHero from './components/HomeHero';
import HeroesPage from './components/HeroesPage';
import SpiderVersePage from './components/SpiderVersePage';
import FooterHeroVerse from './components/FooterHeroVerse';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [currentView, setCurrentView] = useState('inicio');

  const handleNavigate = (sectionId) => {
    setCurrentView(sectionId);
  };

  // Vista de las Versiones del Multiverso de Spider-Man
  if (currentView === 'spiderman-versions') {
    return (
      <div className="w-screen h-screen bg-[#0D0D0D] text-slate-100 selection:bg-marvel-red selection:text-white flex flex-col select-none overflow-hidden">
        <Header
          favoritesCount={favorites.length}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onNavigate={handleNavigate}
          currentView="heroes"
        />
        <main className="flex-1 w-full relative overflow-hidden">
          <SpiderVersePage onBack={() => handleNavigate('heroes')} />
        </main>
      </div>
    );
  }

  // Vista de Héroes independiente
  if (currentView === 'heroes') {
    return (
      <div className="w-screen h-screen bg-[#0D0D0D] text-slate-100 selection:bg-marvel-red selection:text-white flex flex-col select-none overflow-hidden">
        <Header
          favoritesCount={favorites.length}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onNavigate={handleNavigate}
          currentView={currentView}
        />
        <main className="flex-1 w-full relative overflow-hidden">
          <HeroesPage onNavigate={handleNavigate} />
        </main>
      </div>
    );
  }

  // Vista de Inicio 100% original e intacta
  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-heroverse-dark text-slate-100 selection:bg-heroverse-blue selection:text-white flex flex-col justify-between select-none">
      
      {/* Header con Logo Centrado */}
      <Header
        favoritesCount={favorites.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onNavigate={handleNavigate}
        currentView={currentView}
      />

      {/* Área Principal en Pantalla Completa sin Scroll (100vh Fijo) */}
      <main className="flex-1 w-full relative overflow-hidden flex items-center justify-center pt-28 sm:pt-32">
        <HomeHero onExploreUniverses={() => handleNavigate('heroes')} />
      </main>

      {/* Footer Estilizado Fijo en el Borde Inferior (Visible sin necesidad de Scroll) */}
      <FooterHeroVerse onNavigate={handleNavigate} />

    </div>
  );
}
