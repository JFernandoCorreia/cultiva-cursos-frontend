import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = ({ setIsSidebarOpen }) => {
  const location = useLocation();

  // Definição das páginas que devem exibir a Navbar
  const showNavbar = ['/login', '/register', '/course', '/sobre'].includes(location.pathname);

  return (
    showNavbar && (
      <nav className="bg-recifeWhite text-recifeBlue p-4 shadow-lg fixed top-0 w-full z-50 flex justify-between items-center sm:justify-end sm:px-8">
        {/* Logo opcional */}
        <div className="text-lg font-bold sm:hidden">
          Flor da Cidade
        </div>

        {/* Botão menu hamburguer para telas menores */}
        <button
          className="md:hidden bg-recifeBlue text-recifeWhite text-2xl focus:outline-none ml-auto"
          onClick={() => setIsSidebarOpen(prev => !prev)}

        >
        <FaTimes /> : <FaBars />
        </button>
      </nav>
    )
  );
};

export default Navbar;
