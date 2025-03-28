import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div className="relative h-screen flex flex-col">
      <header className="bg-recifeBlue bg-opacity-100 p-4 sm:p-4 shadow-lg">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 items-center text-center sm:text-left">

          <div className="flex justify-center sm:justify-start mb-2 sm:mb-0">
            <img
              src={`${process.env.PUBLIC_URL}/images/logo-seau.png`}
              alt={t("prefeituraRecife")}
              className="w-30 sm:w-56 flex-shrink-0"
              loading="lazy"
            />
          </div>

            <div className="w-full flex justify-center mb-4 sm:mb-0">
            <Link
              to="/"
              className="text-recifeWhite font-bold text-3xl sm:text-4xl hover:underline"
            >
              {t("Flor da Cidade")}
            </Link>
          </div>
        </div>
      </header>

      <main className="relative h-screen w-screen flex items-center justify-center">
        {/* Overlay Escuro sobre a imagem de fundo */}
        <div
          className="absolute inset-0 w-full h-full bg-black opacity-50"
        ></div>

        {/* Imagem de fundo */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/backimage4.jpg)` }}
        ></div>

        {/* Conteúdo da página */}
        <div className="relative z-10 flex flex-col items-center space-y-6"> {/* Container com flex-col */}
          <h1
            className="text-4xl sm:text-5xl font-bold mb-4 sm:mb-8 text-recifeBlue"
            aria-live="polite"
          >
            {t("Bem-vindo ao Cultiva Cursos")}
          </h1>

          <motion.div
            className="space-y-4 w-full sm:w-3/4 max-w-md text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/login"
              className="bg-recifeBlue text-recifeWhite px-4 sm:px-6 py-3 rounded-lg shadow-xl hover:bg-recifeGold hover:text-recifeBlue transition duration-300 block"
            >
              {t("Acesso Para Todos")}
            </Link>
            <Link
              to="/register"
              className="bg-recifeBlue text-recifeWhite px-4 sm:px-6 py-3 rounded-lg shadow-xl hover:bg-recifeGold hover:text-recifeBlue transition duration-300 block"
            >
              {t("Cadastro Para Interessados")}
            </Link>
            <Link
              to="/course"
              className="bg-recifeBlue text-recifeWhite px-4 sm:px-6 py-3 rounded-lg shadow-xl hover:bg-recifeGold hover:text-recifeBlue transition duration-300 block"
            >
              {t("Página de Cursos")}
            </Link>
            <Link
              to="/sobre"
              className="bg-recifeBlue text-recifeWhite px-4 sm:px-6 py-3 rounded-lg shadow-xl hover:bg-recifeGold hover:text-recifeBlue transition duration-300 block"
            >
              {t("Sobre o Projeto Cultiva Cursos")}
            </Link>
          </motion.div>
        </div>
      </main>


      <footer className="bg-recifeBlue bg-opacity-100 p-2 sm:p-4 shadow-lg relative mt-auto w-full">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center sm:justify-between text-center sm:text-left">
          
          <div className="flex items-center justify-center space-x-4 mx-auto">
            <p className="text-recifeWhite text-sm sm:text-base md:text-lg">
              &copy; 2025 {t("Prefeitura do Recife")}
            </p>
            <img
              src={`${process.env.PUBLIC_URL}/images/transferir7.png`}
              alt="Prefeitura do Recife"
              className="w-12 sm:w-16 h-auto"
            />
          </div>

          <div className="flex items-center space-x-2 md:space-x-2">
            {[
              { href: "https://www.facebook.com/prefeituradorecife", src: "Facebook_logo.png", alt: "Facebook" },
              { href: "https://x.com/prefrecife", src: "x.png", alt: "X" },
              { href: "https://www.instagram.com/prefeiturarecife/", src: "instagram.jpeg", alt: "Instagram" },
              { href: "https://www.youtube.com/channel/UCxMRq-Mv3UimnqOl6aRrM6Q", src: "youtube.png", alt: "YouTube" },
              { href: "https://www.flickr.com/photos/prefeituradorecife/", src: "flickr.png", alt: "Flickr" },
            ].map(({ href, src, alt }) => (
              <a
                key={alt}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={alt}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/images/${src}`}
                  alt={alt}
                  className="w-5 sm:w-5 h-5 sm:h-5"
                />
              </a>
            ))}
          </div>

        </div>
      </footer>
    </div>
  );
};

export default HomePage;
