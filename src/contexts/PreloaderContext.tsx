"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type PreloaderContextType = {
  isReady: boolean;
  hasVisited: boolean;
  completePreloader: () => void;
};

const PreloaderContext = createContext<PreloaderContextType>({ 
  isReady: true, 
  hasVisited: true,
  completePreloader: () => {} 
});

export function PreloaderProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [hasVisited, setHasVisited] = useState(false);

  useEffect(() => {
    // Check session storage
    const visited = sessionStorage.getItem('dsz_visited') === 'true';
    setHasVisited(visited);
    
    // Fallback in case something gets stuck
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  const completePreloader = () => {
    setIsReady(true);
    sessionStorage.setItem('dsz_visited', 'true');
  };

  return (
    <PreloaderContext.Provider value={{ isReady, hasVisited, completePreloader }}>
      {children}
    </PreloaderContext.Provider>
  );
}

export function usePreloader() {
  return useContext(PreloaderContext);
}
