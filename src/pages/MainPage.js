import React from 'react';
import AccessibilityMenu from '../components/AccessibilityMenu';
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const MainPage = () => {
  const { t } = useTranslation();

  const APPS = [
    {
      id: "Hortas",
      title: t("Hortas"),
      description: t("Conheça o projeto Hortas, que promove o cultivo sustentável nas comunidades."),
      image: "/images/hortas.jpeg",
      link: process.env.REACT_APP_API_URL || "http://localhost:3001/",
    },
    {
      id: "Feiras",
      title: t("Feiras"),
      description: t("Explore as Feiras de produtos locais promovidas pela comunidade."),
      image: "/images/feiras2.jpg",
      link: process.env.REACT_APP_API_URL || "http://localhost:3002/",
    },
    {
      id: "Cursos",
      title: t("Cursos"),
      description: t("Participe dos cursos oferecidos pelo programa Cultiva Cursos."),
      image: "/images/cursos2.webp",
      link: "/home",
    },
  ];

  return (
    <div className="relative h-screen flex flex-col">
      {/* Cabeçalho */}
      <header className="bg-recifeBlue bg-opacity-100 p-4 shadow-lg">
        <div className="container mx-auto flex flex-wrap justify-between items-center">
          <img
            src={`${process.env.PUBLIC_URL}/images/logo-seau.png`}
            alt={t("recifePrefeitura")}
            className="w-32 sm:w-48"
            loading="lazy"
          />

          <h1 className="text-3xl font-bold text-center text-recifeWhite">
            {t("Flor da Cidade")}
          </h1>

          <AccessibilityMenu />
        </div>
      </header>

      {/* Corpo principal */}
      <main
        className="flex-grow bg-white bg-opacity-80 p-4 sm:p-8 rounded-lg shadow-lg"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/flores.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h2 className="text-2xl font-bold text-center text-recifeBlue mb-4">
          Bem vindo ao Projeto Flor da Cidade
        </h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {APPS.map((app) => (
            <motion.div
              key={app.id}
              className="text-center bg-recifeBlue p-4 rounded-lg shadow-lg transition hover:shadow-xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={app.image}
                alt={app.title}
                className="w-full h-40 object-cover rounded"
                loading="lazy"
              />
              <p className="text-lg mt-2 text-recifeWhite">{app.description}</p>
              <a
                href={app.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-2 px-6 py-3 bg-recifeGold text-recifeBlue rounded-lg shadow-md hover:bg-recifeWhite hover:text-recifeBlue transition duration-300"
              >
                {t("Acessar")} {app.title}
              </a>
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* Rodapé */}
      <footer className="bg-recifeBlue bg-opacity-100 p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center justify-center space-x-1 mx-auto">
            <p className="text-recifeWhite text-base md:text-lg">
              &copy; 2024 Prefeitura do Recife
            </p>

            <img src={`${process.env.PUBLIC_URL}/images/transferir7.png`} alt="Prefeitura do Recife" className="w-16 h-auto" />
          </div>

          {/* Redes Sociais */}
          <div className="flex space-x-3">
            {[
              { url: "https://www.facebook.com/prefeituradorecife", img: "Facebook_logo.png", alt: "Facebook" },
              { url: "https://x.com/prefrecife", img: "x.png", alt: "X" },
              { url: "https://www.instagram.com/prefeiturarecife/", img: "instagram.jpeg", alt: "Instagram" },
              { url: "https://www.youtube.com/channel/UCxMRq-Mv3UimnqOl6aRrM6Q", img: "youtube.png", alt: "YouTube" },
              { url: "https://www.flickr.com/photos/prefeituradorecife/", img: "flickr.png", alt: "Flickr" },
            ].map((social, index) => (
              <a key={index} href={social.url} target="_blank" rel="noopener noreferrer">
                <img
                  src={`${process.env.PUBLIC_URL}/images/${social.img}`}
                  alt={social.alt}
                  className="w-6 h-6"
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;
