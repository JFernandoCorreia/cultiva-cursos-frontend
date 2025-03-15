// src/context/ThemeContext.js
import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem("darkMode")) || false;
  });

  const [isHighContrast, setIsHighContrast] = useState(() => {
    return JSON.parse(localStorage.getItem("highContrast")) || false;
  });

  // Alternar Modo Escuro
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", JSON.stringify(newMode));
      return newMode;
    });
  };

  // Alternar Alto Contraste
  const toggleHighContrast = () => {
    setIsHighContrast((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("highContrast", JSON.stringify(newMode));
      return newMode;
    });
  };

  // Aplicar classes de tema ao <body>
  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
    document.body.classList.toggle('high-contrast', isHighContrast);
  }, [isDarkMode, isHighContrast]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, isHighContrast, toggleHighContrast }}>
      <div aria-live="polite">{children}</div>
    </ThemeContext.Provider>
  );
};
