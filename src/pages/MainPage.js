import React from 'react';
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const MainPage = () => {
  const { t } = useTranslation();

  const APPS = [
    {
      id: "Cursos",
      title: t("Cursos"),
      description: t("Participe dos cursos oferecidos pelo programa Cultiva Cursos."),
      image: "/images/backimage4.jpg",
      link: "/home",
    },
    {
      id: "Feiras",
      title: t("Feiras"),
      description: t("Explore as Feiras de produtos locais promovidas pela comunidade."),
      image: "/images/backimage3.jpg",
      link: process.env.REACT_APP_API_URL || "http://localhost:3001/",
    },
    {
      id: "Hortas",
      title: t("Hortas"),
      description: t("Conheça o projeto Hortas, que promove o cultivo sustentável nas comunidades."),
      image: "/images/backimage.png",
      link: process.env.REACT_APP_API_URL || "http://localhost:3002/",
    },
  ];

  return (
    <div className="relative h-screen flex flex-col">
       <header className="bg-recifeBlue bg-opacity-100 p-4 sm:p-4 shadow-lg">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 items-center text-center sm:text-left">
          
          {/* 🔹 Logo Prefeitura (Esquerda) */}
          <div className="flex justify-center sm:justify-start mb-2 sm:mb-0">
            <img
              src={`${process.env.PUBLIC_URL}/images/logo-seau.png`}
              alt={t("recifePrefeitura")}
              className="w-30 sm:w-56 flex-shrink-0"
              loading="lazy"
            />
          </div>

          {/* 🔹 Texto "Flor da Cidade" (Centralizado) */}
          <div className="flex justify-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-recifeWhite">
              {t("Flor da Cidade")}
            </h1>
          </div>

          {/* 🔹 Espaço para alinhamento correto em telas maiores */}
          <div className="hidden sm:block"></div>

        </div>
      </header>

      <main
        className="flex-grow bg-white bg-opacity-80 p-4 sm:p-8 rounded-lg shadow-lg"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/flores.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h2 className="text-4xl font-bold text-center text-recifeBlue mb-4">
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

      <footer className="bg-recifeBlue bg-opacity-100 p-2 sm:p-4 shadow-lg relative mt-auto w-full">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center sm:justify-between text-center sm:text-left">
          
          {/* 🔹 Texto e Logo da Prefeitura */}
          <div className="flex items-center justify-center space-x-4 mx-auto">
            <p className="text-recifeWhite text-sm sm:text-base md:text-lg">
              &copy; 2025 Prefeitura do Recife
            </p>
            <img 
              src={`${process.env.PUBLIC_URL}/images/transferir7.png`} 
              alt="Prefeitura do Recife" 
              className="w-12 sm:w-16 h-auto"
            />
          </div>

          {/* 🔹 Redes Sociais */}
          <div className="flex items-center space-x-2 md:space-x-2">
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
                  className="w-5 sm:w-5 h-5 sm:h-5"
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
