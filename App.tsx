
import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { ComicCreator } from './components/ComicCreator';
import { LanguageCode } from './translations';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'landing' | 'app'>('landing');
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en');
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Initialize theme
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleStartApp = () => {
    setCurrentPage('app');
    window.scrollTo(0, 0);
  };

  const handleBackToHome = () => {
    setCurrentPage('landing');
    window.scrollTo(0, 0);
  };

  return (
    <>
      {currentPage === 'landing' ? (
        <LandingPage 
          onStartApp={handleStartApp} 
          currentLanguage={currentLanguage}
          setCurrentLanguage={setCurrentLanguage}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
        />
      ) : (
        <ComicCreator 
          onBack={handleBackToHome} 
          currentLanguage={currentLanguage}
          setCurrentLanguage={setCurrentLanguage}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
        />
      )}
    </>
  );
};

export default App;
