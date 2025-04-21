import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { FaBars, FaUserPlus, FaBookOpen, FaInfoCircle, FaVolumeUp, FaVolumeMute, FaAccessibleIcon} from "react-icons/fa";
import Sidebar from "../components/SideBar";
import Navbar from "../components/Navbar";
import { motion } from 'framer-motion';

// Componente Error Boundary para capturar erros
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div className="error-fallback p-4 bg-red-100 text-red-800">Algo deu errado. Por favor, recarregue a página.</div>;
    }

    return this.props.children; 
  }
}

const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(1);
  const [isTextToSpeech, setIsTextToSpeech] = useState(false);
  const [currentSpeech, setCurrentSpeech] = useState(null);
  const [vlibrasError, setVlibrasError] = useState(null);
  const accessibilityMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accessibilityMenuRef.current && 
          !accessibilityMenuRef.current.contains(event.target)) {
        setAccessibilityOpen(false);
        if (isTextToSpeech) {
          readText("Menu de acessibilidade fechado");
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isTextToSpeech]); // Add this closing bracket and dependency array for the useEffect

  // Efeito para aplicar alto contraste em todo o documento
  useEffect(() => {
    if (isHighContrast) {
      document.body.classList.add('high-contrast');
      document.querySelectorAll('button, a, input, select, textarea').forEach(el => {
        el.classList.add('high-contrast-element');
      });
    } else {
      document.body.classList.remove('high-contrast');
      document.querySelectorAll('button, a, input, select, textarea').forEach(el => {
        el.classList.remove('high-contrast-element');
      });
    }
  }, [isHighContrast]);

  // Efeito para tamanho da fonte
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}rem`;
  }, [fontSize]);

  // Função para leitura de texto
  const readText = (text) => {
    if (isTextToSpeech && 'speechSynthesis' in window) {
      if (currentSpeech) {
        window.speechSynthesis.cancel();
      }
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 1.0; // Velocidade da fala
      window.speechSynthesis.speak(utterance);
      setCurrentSpeech(utterance);
    }
  };

  // VLibras
  useEffect(() => {
    let script;
    
    const loadVLibras = () => {
      try {
        if (document.getElementById('vlibras-script')) return;

        script = document.createElement("script");
        script.id = 'vlibras-script';
        script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
        script.async = true;
        
        script.onload = () => {
          try {
            if (window.VLibras && typeof window.VLibras.Widget === 'function') {
              new window.VLibras.Widget("https://vlibras.gov.br/app");
            } else {
              throw new Error("VLibras não está disponível ou incompleto");
            }
          } catch (e) {
            console.error("Erro ao inicializar VLibras:", e);
            setVlibrasError("Falha ao carregar recursos de acessibilidade");
          }
        };
        
        script.onerror = () => {
          setVlibrasError("Falha ao carregar o VLibras");
        };
        
        document.body.appendChild(script);
      } catch (e) {
        console.error("Erro no carregamento do VLibras:", e);
        setVlibrasError(e.message);
      }
    };

    // Carregar apenas se não houver erro anterior
    if (!vlibrasError) {
      loadVLibras();
    }

    return () => {
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
      // Limpar o widget do VLibras se existir
      if (window.VLibras && window.VLibras.Widget && window.VLibras.Widget.destroy) {
        window.VLibras.Widget.destroy();
      }
    };
  }, [vlibrasError]);

  const fixedCourses = [
    {
      id: 'curso1',
      title: 'Introdução à Agricultura Urbana',
      description: 'Aprenda os conceitos básicos e a importância da agricultura urbana para cidades sustentáveis.',
      image: `${process.env.PUBLIC_URL}/images/agricultura.jpg`,
    },
    {
      id: 'curso2',
      title: 'Cultivo de Hortas Urbanas',
      description: 'Curso prático sobre o cultivo de hortaliças em pequenos espaços, como quintais e varandas.',
      image: `${process.env.PUBLIC_URL}/images/hortas.webp`,
    },
    {
      id: 'curso3',
      title: 'Técnicas de Compostagem',
      description: 'Descubra como transformar resíduos orgânicos em adubo natural para fortalecer sua horta.',
      image: `${process.env.PUBLIC_URL}/images/compostagem.jpg`,
    },
    {
      id: 'curso4',
      title: 'Agroecologia e Sustentabilidade',
      description: 'Aprenda sobre práticas agroecológicas para produção de alimentos sem impacto ambiental.',
      image: `${process.env.PUBLIC_URL}/images/agroecologia.jpg`,
    },
    {
      id: 'curso5',
      title: 'Controle Natural de Pragas',
      description: 'Métodos orgânicos para proteger sua horta contra pragas sem o uso de produtos químicos.',
      image: `${process.env.PUBLIC_URL}/images/controle.jpg`,
    },
    {
      id: 'curso6',
      title: 'Irrigação Sustentável para Hortas',
      description: 'Técnicas eficientes de irrigação para economizar água e manter sua horta saudável.',
      image: `${process.env.PUBLIC_URL}/images/irrigacao.jpg`,
    },
  ];

  const { t } = useTranslation();

  const carouselImages = [
    {
      src: `${process.env.PUBLIC_URL}/images/logo-seau.png`,
      text: "Transforme sua cidade com hortas urbanas",
      alt: "Logo SEAU",
    },
    {
      src: `${process.env.PUBLIC_URL}/images/backimage4.jpg`,
      text: "Educação ambiental para todos",
      alt: "Educação ambiental",
    },
    {
      src: `${process.env.PUBLIC_URL}/images/backimage.png`,
      text: "Aprenda a cultivar com sustentabilidade",
      alt: "Cultivo sustentável",
    },
  ];

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselImages.length);
    }, 5000); // Muda a cada 5s
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  useEffect(() => {
    document.documentElement.style.setProperty('font-size', `${fontSize}em`);
    if (isHighContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [fontSize, isHighContrast]);

  return (
    <ErrorBoundary>
      <div className={`relative flex flex-col min-h-screen ${isHighContrast ? 'high-contrast' : ''}`}>

        <Navbar setIsSidebarOpen={setIsSidebarOpen} />
        <Sidebar isSidebarOpen={isSidebarOpen} />

        {/* Menu de Acessibilidade */}
        <div className="fixed bottom-4 right-4 z-50" ref={accessibilityMenuRef}>
          <button
            aria-label={accessibilityOpen ? "Fechar menu de acessibilidade" : "Abrir menu de acessibilidade"}
            className={`p-3 rounded-full shadow-md focus:outline-none focus-visible ${
              isHighContrast 
                ? 'bg-yellow-500 text-black' 
                : 'bg-recifeBlue text-white'
            }`}
            onClick={() => {
              const newState = !accessibilityOpen;
              setAccessibilityOpen(newState);
              if (isTextToSpeech) {
                readText(newState ? "Menu de acessibilidade aberto" : "Menu de acessibilidade fechado");
              }
            }}
            onFocus={() => readText(accessibilityOpen ? "Fechar menu de acessibilidade" : "Abrir menu de acessibilidade")}
          >
            <FaAccessibleIcon aria-hidden="true" />
          </button>
          
          {accessibilityOpen && (
            <div className="mt-2 p-4 bg-recifeWhite rounded-lg shadow-lg w-64 flex flex-col space-y-3 text-left"
                  role= "menu"
                  aria-orientation="vertical"
            >
              <h3 className="text-lg font-bold text-recifeBlue">Acessibilidade</h3>
              
              <button
                onClick={() => {
                  setFontSize(prev => Math.min(prev + 0.1, 1.5));
                  readText("Aumentando tamanho da fonte");
                }}
                className="text-recifeBlue underline text-left focus-visible"
                role="menuitem"
              >
                Aumentar Fonte (+)
              </button>
              
              <button
                onClick={() => {
                  setFontSize(prev => Math.max(prev - 0.1, 0.8));
                  readText("Diminuindo tamanho da fonte");
                }}
                className="text-recifeBlue underline text-left"
                role="menuitem"
              >
                Diminuir Fonte (-)
              </button>
              
              <button
                onClick={() => {
                  setIsHighContrast(prev => !prev);
                  readText(isHighContrast ? "Desativando alto contraste" : "Ativando alto contraste");
                }}
                className="text-recifeBlue underline text-left focus-visible"
                role="menuitem"
              >
                {isHighContrast ? "Desativar Contraste" : "Ativar Alto Contraste"}
              </button>
              
              <button
                onClick={() => {
                  setIsTextToSpeech(prev => !prev);
                  readText(isTextToSpeech ? "Desativando leitor de tela" : "Ativando leitor de tela");
                }}
                className="flex items-center text-recifeBlue underline text-left focus-visible"
                role="menuitem"
              >
                {isTextToSpeech ? <FaVolumeMute className="mr-2" aria-hidden="true" /> : <FaVolumeUp className="mr-2" 
                aria-hidden="true" />}
                {isTextToSpeech ? "Desativar Leitor" : "Ativar Leitor"}
              </button>
            </div>
          )}
        </div>

        {/* Cabeçalho fixo no topo */}
        <header className="bg-recifeWhite fixed top-0 left-0 w-full z-50 shadow-lg p-4">
          <div className="container mx-auto flex justify-between items-center">
            <img
              src={`${process.env.PUBLIC_URL}/images/logo-seau.png`}
              alt={t("Logo SEAU")}
              className="w-40 h-auto"
              loading="lazy"
            />

            <div className="w-full flex justify-center mb-0 sm:mb-3">
              <h1 
                href="/" 
                className="text-recifeBlue font-bold text-2xl md:text-4xl sm:text-3xl text-center mt-auto 
              break-words"
                onMouseOver={() => readText("Flor da Cidade")}
          >
                Flor da Cidade
              </h1>

              {/* Botão de menu para dispositivos móveis */}
              <button
                aria-label="Abrir menu de navegação"
                className="md:hidden text-recifeBlue text-2xl focus:outline-none ml-auto focus-visible"
                onClick={() => setIsSidebarOpen(prev => !prev)}
                onFocus={() => readText("Abrindo menu de navegação")}
                >
                <FaBars />
              </button>
            </div>
          </div>
        </header>

        {/* Carrossel de Banner */}
        <div id="inicio" className="relative w-full flex justify-center mt-24 pl-0 md:pl-48">
          <div className="relative w-full max-w-7xl aspect-[16/9] sm:h-[300px] overflow-hidden rounded-xl shadow-lg">
            {carouselImages.map((img, index) => (
              <div
                key={index}
                className={`absolute w-full h-full transition-opacity duration-1000 ${index === current ? 
                  'opacity-100 z-10' : 'opacity-0 z-0'}`}
              >
                <img
                  src={img.src}
                  alt={`Slide ${index}`}
                  className="w-full h-full"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-end justify-left text-white z-10 px-4 pb-6 text-center">
                  <h2 className="text-2xl md:text-4xl sm:text-3x1 font-bold bg-black/50 px-4 py-2 rounded-md break-words">
                    {img.text}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Corpo do site com seções empilhadas */}
        <main className="mt-2 flex flex-col items-center pl-0 md:pl-48">
          <div className="relative w-full max-w-4xl p-12 rounded-lg">

            <section className="w-full py-16 text-center transition-all duration-500 ease-in-out ">
            <h1 
              aria-labelledby="sobre-heading"
              className="text-recifeBlue text-2xl sm:text-3xl md:text-4x1 break-words font-bold"
              onMouseOver={() => readText("Bem-vindo ao Flor da Cidade")}
            >
              {t("Bem-vindo ao Flor Cidade")}</h1>
            <p 
              className="text-recifeBlue text-base md:text-x1 leading-relaxed mt-4 sm:text-lg"
              onMouseOver={() => readText("O Flor da Cidade é uma plataforma dedicada à disseminação do conhecimento sobre agroecologia, cultivo de hortas urbanas e práticas sustentáveis. Nossa missão é capacitar pessoas interessadas em transformar seus espaços e comunidades por meio da agricultura urbana e ecológica, promovendo um futuro mais verde e equilibrado.")}
            >
              {t("O Flor da Cidade é uma plataforma dedicada à disseminação do conhecimento sobre agroecologia, cultivo de hortas urbanas e práticas sustentáveis. Nossa missão é capacitar pessoas interessadas em transformar seus espaços e comunidades por meio da agricultura urbana e ecológica, promovendo um futuro mais verde e equilibrado.")}
              </p>
            </section>

            {/* Seções empilhadas (cadastros, cursos, sobre, etc.) */}
            {/* Carrossel de Cursos */}
            <section id="cadastro" className="w-full py-16 text-center transition-all duration-500 ease-in-out">
            <motion.section
              id="cadastro"
              className="w-full py-16 text-center px-4 md:px-10"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 
                className="text-recifeBlue text-2xl sm:text-3xl md:text-4x1 break-words font-bold"
                onMouseOver={() => readText("Cadastre-se para Acesso aos Cursos")}
              >
                {t("Cadastre-se para Acesso aos Cursos")}
              </h2>
              <p 
                className="text-recifeBlue text-base md:text-x1 leading-relaxed mt-4 sm:text-lg"
                onMouseOver={() => readText("Cadastre-se para acessar nossos cursos gratuitos sobre agroecologia e práticas sustentáveis.")}
                >
                  {t("Cadastre-se para acessar nossos cursos gratuitos sobre agroecologia e práticas sustentáveis.")}
                </p>

              <div className="relative mt-6 overflow-hidden w-full px-4 md:px-0">
                <Carousel
                  responsive={responsive}
                  ssr={true}
                  infinite={true}
                  autoPlay={true}
                  keyBoardControl={true}
                  showDots={false}
                  arrows={true}
                  containerClass="carousel-container mt-10"
                  itemClass="carousel-item-padding-40-px"
                >
                  {fixedCourses.map((course) => (
                    <div key={course.id} className="px-4 transition-transform transform hover:scale-105 duration-300">
                      <div className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden">
                        <img 
                        src={course.image} 
                        alt={course.title} 
                        loading="lazy" 
                        className="w-full h-48 object-cover"/>
                        <div className="p-6 text-left">
                        <h3 className="text-recifeBlue text-xl font-bold">{course.title}</h3>
                        <p className="text-recifeBlue text-sm mt-2">{course.description}</p>
                        <a
                          href="https://docs.google.com/forms/d/e/1FAIpQLScZPZSdcs93zuuznApwh7Wn0Bn
                          TqV1_ti3XWI4SnriSz9QulQ/closedform"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Formulário de Cadastro no Google Forms"
                          className="mt-2 inline-flex items-center gap-2 bg-recifeBlue text-white px-6 py-3 rounded-lg 
                          shadow-md hover:bg-recifeGold hover:text-recifeBlue transition duration-300"
                          onMouseOver={() => readText("Cadastre-se Agora")}
                        >
                          <FaBookOpen />
                          {t("Cadastre-se Agora")}
                        </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </Carousel>
              </div>
            </motion.section>
          </section>

            <section id="mapas" className="w-full py-16 text-center transition-all duration-500 ease-in-out">
              <h2 
                className="text-recifeBlue text-2xl sm:text-3xl md:text-4x1 break-words font-bold"
                onMouseOver={() => readText("Hortas")}
                >
                  {t("Hortas")}
                  </h2>
                <p 
                  className="text-recifeBlue text-base md:text-x1 leading-relaxed mt-4 sm:text-lg"
                  onMouseOver={() => readText("Encontre as hortas comunitárias mais próximas e conheça os espaços onde você pode plantar e colher alimentos saudáveis.")}
                >
                  {t("Encontre as hortas comunitárias mais próximas e conheça os espaços onde você pode plantar e colher alimentos saudáveis.")}
                </p>

              {/* Mapa do Google embutido */}
              <div className="w-full h-[500px] mt-6 rounded-xl overflow-hidden shadow-md">
                <iframe
                  title="Mapa de Hortas Comunitárias"
                  src="https://www.google.com/maps/d/u/1/embed?mid=1cDZ5X6M7JC5lcpK6myGh7Y_fpWc-T9A&ehbc=2E312F"
                  width="100%"
                  height="100%"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="border-0 w-full h-full"
                ></iframe>
              </div>

              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScZPZSdcs93zuuznApwh7Wn0BnTqV1_ti3XWI4SnriSz9QulQ/closedform"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Formulário de Cadastro no Google Forms"
                className="mt-6 inline-flex items-center gap-2 bg-recifeBlue text-white px-6 py-3 rounded-lg shadow-md hover:bg-recifeGold hover:text-recifeBlue transition duration-300"
                onMouseOver={() => readText("Cadastre-se Agora")}
              >
                <FaUserPlus />
                {t("Cadastre-se Agora")}
              </a>
            </section>

            <section 
              id="sobre" 
              className="w-full py-16 text-center transition-all duration-500 ease-in-out">
              <h2 
                className="text-recifeBlue text-2xl sm:text-3xl md:text-4x1 break-words font-bold"
                onFocus={() =>readText("Sobre o Projeto")}
                onMouseOver={() => readText("Sobre o Projeto")}
                >
                  {t("Sobre o Projeto")}
                </h2>
              <p 
                className="text-recifeBlue text-base md:text-x1 leading-relaxed mt-4 sm:text-lg"
                onFocus={() => readText("Conheça nossa missão de promover práticas agroecológicas e sustentáveis por meio da educação e capacitação.")}
                onMouseOver={() => readText("Conheça nossa missão de promover práticas agroecológicas e sustentáveis por meio da educação e capacitação.")}
              >
                {t("Conheça nossa missão de promover práticas agroecológicas e sustentáveis por meio da educação e capacitação.")}
              </p>
              <Link to="/sobre" 
                    className="mt-6 inline-flex items-center gap-2 bg-recifeBlue text-white px-6 py-3 rounded-lg shadow-md hover:bg-recifeGold hover:text-recifeBlue transition duration-300"
                    onFocus={() => readText("Conhecer Mais")}
                    onMouseOver={() => readText("Conhecer Mais")}>
                    
                <FaInfoCircle />
                {t("Conhecer Mais")}
              </Link>
            </section>

            <section id="faqs" className="w-full py-16 text-center bg-gray-100">
              <h2 
                className="text-recifeBlue text-2xl sm:text-3xl md:text-4x1 break-words font-bold"
                onMouseOver={() => readText("Perguntas Frequentes")}
                >
                  {t("Perguntas Frequentes")}
                  </h2>
              <div className="max-w-4xl mx-auto text-left space-y-6">
                <details className="bg-white p-4 rounded-lg shadow-md cursor-pointer">
                  <summary 
                    className="font-semibold text-recifeBlue"
                    onMouseOver={() => readText("Preciso pagar para acessar os cursos?")}
                    >
                      {t("Preciso pagar para acessar os cursos?")}
                    </summary>
                  <p 
                    className="mt-2 text-gray-700"
                    onMouseOver={() => readText("Não! Todos os nossos cursos são gratuitos e abertos para a população.")}
                    >
                      {t("Não! Todos os nossos cursos são gratuitos e abertos para a população.")}
                    </p>
                </details>
                <details className="bg-white p-4 rounded-lg shadow-md cursor-pointer">
                  <summary 
                    className="font-semibold text-recifeBlue"
                    onMouseOver={() => readText("Os cursos têm certificado?")}
                    >
                      {t("Os cursos têm certificado?")}
                      </summary>
                  <p className="mt-2 text-gray-700">{t("Sim, ao concluir cada curso você poderá emitir um certificado digital.")}</p>
                </details>
                <details className="bg-white p-4 rounded-lg shadow-md cursor-pointer">
                  <summary 
                    className="font-semibold text-recifeBlue"
                    onMouseOver={() => readText("Posso acessar pelo celular?")}
                    >
                      {t("Posso acessar pelo celular?")}
                    </summary>
                  <p 
                    className="mt-2 text-gray-700"
                    onMouseOver={() => readText("Claro! A plataforma foi otimizada para todos os dispositivos.")}
                    >
                      {t("Claro! A plataforma foi otimizada para todos os dispositivos.")}
                    </p>
                </details>
              </div>
            </section>

          </div>
        </main>

        {/* Rodapé atualizado */}
        <footer className="bg-recifeWhite text-recifeBlue p-6 text-center font-bold mt-auto">
          <p>&copy; 2025 {t("Prefeitura do Recife")}</p>
          <div className="flex justify-center space-x-4 mt-4">
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
                aria-label={`Visitar nosso ${alt}`}
                className="focus-visible"
                >
                <img 
                  src={`${process.env.PUBLIC_URL}/images/${src}`} 
                  alt={alt} 
                  className="w-6 h-6"
                  loading="lazy"
                  />
              </a>
            ))}
          </div>
        </footer>

        {/* Widget VLibras */ }
        {!vlibrasError && (
          <div vw="true" className="enabled">
            <div vw-access-button="true" className="active"></div>
            <div vw-plugin-wrapper="true">
              <div className="vw-plugin-top-wrapper"></div>
            </div>
          </div>
        )}
        
        {vlibrasError && (
          <div className="fixed bottom-20 left-4 bg-yellow-100 text-yellow-800 p-2 rounded text-sm">
            Aviso: {vlibrasError}
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default HomePage;
