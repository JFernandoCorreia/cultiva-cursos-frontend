import React from "react";
import { Link } from "react-router-dom";
import AccessibilityMenu from "../components/AccessibilityMenu";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div className="relative h-screen flex flex-col">
      {/* 🔹 Header */}
      <header className="bg-recifeBlue bg-opacity-100 p-4 shadow-lg">
        <div className="container mx-auto flex flex-wrap justify-between items-center">
          <div className="w-full sm:w-1/3 text-center sm:text-left mb-4 sm:mb-auto">
            <img
              src={`${process.env.PUBLIC_URL}/images/logo-seau.png`}
              alt={t("prefeituraRecife")}
              className="logo-seau"
            />
          </div>

          <div className="w-full sm:w-1/3 flex justify-center mb-4 sm:mb-0">
            <Link
              to="/"
              className="text-recifeWhite font-bold text-2xl sm:text-4xl hover:underline"
            >
              {t("Flor da Cidade")}
            </Link>
          </div>

          <div className="w-full sm:w-1/3 flex justify-center sm:justify-end">
            <AccessibilityMenu />
          </div>
        </div>
      </header>

      {/* 🔹 Main Content */}
      <main
        className="flex-grow flex flex-col items-center justify-center bg-white bg-opacity-80 p-4 sm:p-8 rounded-lg shadow-lg mb-20"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/flores.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1
          className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8 text-recifeWhite"
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
        </motion.div>
      </main>

      {/* 🔹 Footer */}
      <footer className="bg-recifeBlue bg-opacity-100 p-4 shadow-lg fixed bottom-0 w-full">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center justify-center space-x-1 mx-auto">
            <p className="text-recifeWhite text-base md:text-lg">
              &copy; 2024 {t("prefeituraRecife")}
            </p>
            <img
              src={`${process.env.PUBLIC_URL}/images/transferir7.png`}
              alt="Prefeitura do Recife"
              className="w-16 h-auto"
            />
          </div>

          {/* 🔹 Redes Sociais */}
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
                  className="w-5 h-5"
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
