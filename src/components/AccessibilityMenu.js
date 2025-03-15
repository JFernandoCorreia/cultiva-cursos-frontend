import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion'; // Importação do Framer Motion
import { FaPlus, FaMinus, FaAdjust, FaSun, FaMoon, FaLightbulb } from 'react-icons/fa';
import { ThemeContext } from '../context/ThemeContext';

const AccessibilityMenu = () => {
  const { isDarkMode, toggleDarkMode, isHighContrast, toggleHighContrast } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [brightness, setBrightness] = useState(1);

  React.useEffect(() => {
    document.body.style.fontSize = `${fontSize}px`;
    document.body.style.filter = `brightness(${brightness})`;
  }, [fontSize, brightness]);

  return (
    <div className="relative">
      {/* Botão para abrir/fechar menu */}
      <button
        className="text-recifeWhite font-bold text-xl"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Abrir menu de acessibilidade"
      >
        Acessibilidade
      </button>

      {/* Menu Animado */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -10 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10 ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        <ul className="py-1 text-gray-700">
          <li className="px-4 py-2 hover:bg-gray-200 flex items-center">
            <button onClick={() => setFontSize((prev) => Math.min(prev + 2, 24))} aria-label="Aumentar Fonte">
              <FaPlus className="mr-2" /> Aumentar Fonte
            </button>
          </li>
          <li className="px-4 py-2 hover:bg-gray-200 flex items-center">
            <button onClick={() => setFontSize((prev) => Math.max(prev - 2, 12))} aria-label="Diminuir Fonte">
              <FaMinus className="mr-2" /> Diminuir Fonte
            </button>
          </li>
          <li className="px-4 py-2 hover:bg-gray-200 flex items-center">
            <button onClick={toggleHighContrast} aria-label="Ativar/Desativar Alto Contraste">
              <FaAdjust className="mr-2" /> {isHighContrast ? 'Desativar Alto Contraste' : 'Ativar Alto Contraste'}
            </button>
          </li>
          <li className="px-4 py-2 hover:bg-gray-200 flex items-center">
            <button onClick={toggleDarkMode} aria-label="Ativar/Desativar Modo Escuro">
              {isDarkMode ? <FaSun className="mr-2" /> : <FaMoon className="mr-2" />} {isDarkMode ? 'Modo Claro' : 'Modo Escuro'}
            </button>
          </li>
          <li className="px-4 py-2 hover:bg-gray-200 flex items-center">
            <button onClick={() => setBrightness((prev) => Math.min(prev + 0.1, 2))} aria-label="Aumentar Brilho">
              <FaLightbulb className="mr-2" /> Aumentar Brilho
            </button>
          </li>
          <li className="px-4 py-2 hover:bg-gray-200 flex items-center">
            <button onClick={() => setBrightness((prev) => Math.max(prev - 0.1, 0.5))} aria-label="Diminuir Brilho">
              <FaLightbulb className="mr-2" /> Diminuir Brilho
            </button>
          </li>
        </ul>
      </motion.div>
    </div>
  );
};

export default AccessibilityMenu;
