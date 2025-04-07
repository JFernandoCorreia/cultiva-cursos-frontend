import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const fixedCourses = [
    {
      id: 1,
      title: "Cultivo de Hortas Urbanas",
      description: "Curso prático sobre o cultivo de hortaliças em pequenos espaços, como quintais e varandas.",
      image: `${process.env.PUBLIC_URL}/images/hortas.webp`,
    },
    {
      id: 2,
      title: "Agroecologia e Sustentabilidade",
      description: "Aprenda sobre práticas agroecológicas para produção de alimentos sem impacto ambiental.",
      image: `${process.env.PUBLIC_URL}/images/agroecologia2.jpg`,
    },
    {
      id: 3,
      title: "Irrigação Sustentável para Hortas",
      description: "Técnicas eficientes de irrigação para economizar água e manter sua horta saudável.",
      image: `${process.env.PUBLIC_URL}/images/irrigacao.jpg`,
    },
  ];
  const { t } = useTranslation();

  return (
    <div className="relative flex flex-col min-h-screen">
      {/* Cabeçalho fixo no topo */}
      <header className="bg-recifeBlue fixed top-0 left-0 w-full z-50 shadow-lg p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <img
            src={`${process.env.PUBLIC_URL}/images/logo-seau.png`}
            alt={t("Prefeitura do Recife")}
            className="w-40 h-auto"
            loading="lazy"
          />

          <div className="w-full flex justify-center mb-0 sm:mb-3">
            <a
              href={process.env.REACT_APP_API_URL || 'http://localhost:3000/'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-recifeWhite font-bold text-2xl sm:text-4xl hover:underline text-center mt-auto"
            >
              Flor da Cidade
            </a>
          </div>
          
          {/* Navegação simplificada */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/login" className="text-recifeWhite hover:underline">{t("Acesso")}</Link>
            <Link to="/register" className="text-recifeWhite hover:underline">{t("Cadastro")}</Link>
            <Link to="/course" className="text-recifeWhite hover:underline">{t("Cursos")}</Link>
            <Link to="/sobre" className="text-recifeWhite hover:underline">{t("Sobre")}</Link>
          </nav>
        </div>
      </header>

      {/* Corpo do site com seções empilhadas */}
      <main className="mt-16 flex flex-col items-center">
        <div className="relative w-full max-w-4xl bg-white p-12 rounded-lg shadow-lg space-y-6 z-10">

          <section className="w-full py-16 text-center">
          <h1 className="text-recifeGold text-4xl sm:text-5xl font-bold">{t("Bem-vindo ao Cultiva Cursos")}</h1>
          <p className="text-recifeBlue font-bold mt-4 text-lg">{t("O Cultiva Cursos é uma plataforma dedicada à disseminação do conhecimento sobre agroecologia, cultivo de hortas urbanas e práticas sustentáveis. Nossa missão é capacitar pessoas interessadas em transformar seus espaços e comunidades por meio da agricultura urbana e ecológica, promovendo um futuro mais verde e equilibrado.")}</p>
          </section>

          {/* Seções empilhadas (cadastros, cursos, sobre, etc.) */}
          <section className="w-full py-16 text-center">
            <h2 className="text-3xl font-bold text-recifeGold">{t("Cadastre-se para Acesso aos Cursos")}</h2>
            <p className="text-recifeBlue font-bold mt-4 text-lg">{t("Cadastre-se para acessar nossos cursos gratuitos sobre agroecologia e práticas sustentáveis.")}</p>
            <Link to="/register" className="mt-6 inline-block bg-recifeBlue text-white px-6 py-3 rounded-lg shadow-md hover:bg-recifeGold hover:text-recifeBlue transition duration-300">
              {t("Cadastre-se Agora")}
            </Link>
          </section>

          <section className="w-full py-16 text-center">
            <h2 className="text-3xl font-bold text-recifeGold">{t("Nossos Cursos")}</h2>
            <p className="text-recifeBlue font-bold mt-4 text-lg">{t("Cursos gratuitos de agroecologia e práticas sustentáveis para todos os níveis.")}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {fixedCourses.map((course) => (
                <div key={course.id} className="bg-white p-4 rounded-lg shadow-lg">
                  <img src={course.image} alt={course.title} className="w-full h-40 object-cover rounded-lg"/>
                  <h3 className="text-recifeGold text-xl font-bold mt-2">{course.title}</h3>
                  <p className="text-recifeBlue font-semibold text-sm mt-2">{course.description}</p>
                  <Link to="/course" className="mt-6 inline-block bg-recifeBlue text-recifeWhite px-6 py-3 rounded-lg shadow-md  hover:bg-recifeGold hover:text-recifeBlue transition duration-300">
                    {t("Ver Cursos")}
                  </Link>
                </div>
              ))}
            </div>
          </section>

          <section className="w-full py-16 text-center">
            <h2 className="text-3xl font-bold text-recifeGold">{t("Sobre o Projeto")}</h2>
            <p className="text-recifeBlue font-bold mt-4 text-lg">{t("Conheça nossa missão de promover práticas agroecológicas e sustentáveis por meio da educação e capacitação.")}</p>
            <Link to="/sobre" className="mt-6 inline-block bg-recifeBlue text-white px-6 py-3 rounded-lg shadow-md  hover:bg-recifeGold hover:text-recifeBlue transition duration-300">
              {t("Conhecer Mais")}
            </Link>
          </section>
        </div>
      </main>

      {/* Rodapé atualizado */}
      <footer className="bg-recifeBlue text-recifeWhite p-6 text-center mt-auto">
        <p>&copy; 2025 {t("Prefeitura do Recife")}</p>
        <div className="flex justify-center space-x-4 mt-4">
          {[ 
            { href: "https://www.facebook.com/prefeituradorecife", src: "Facebook_logo.png", alt: "Facebook" },
            { href: "https://x.com/prefrecife", src: "x.png", alt: "X" },
            { href: "https://www.instagram.com/prefeiturarecife/", src: "instagram.jpeg", alt: "Instagram" },
            { href: "https://www.youtube.com/channel/UCxMRq-Mv3UimnqOl6aRrM6Q", src: "youtube.png", alt: "YouTube" },
            { href: "https://www.flickr.com/photos/prefeituradorecife/", src: "flickr.png", alt: "Flickr" },
          ].map(({ href, src, alt }) => (
            <a key={alt} href={href} target="_blank" rel="noopener noreferrer">
              <img src={`${process.env.PUBLIC_URL}/images/${src}`} alt={alt} className="w-6 h-6"/>
            </a>
          ))}
        </div>
      </footer>

    </div>
  );
};

export default HomePage;
