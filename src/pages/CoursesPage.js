/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import CourseCard from '../components/CourseCard';
import { useTranslation } from 'react-i18next';
import Spinner from '../components/Spinner';
import { motion } from 'framer-motion';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/courses');
        setCourses(response.data);
      } catch (error) {
        console.error(t('Erro Buscando Curso'), error);
        setError(t('Erro Buscando Curso'));
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [t]);

  // 🔹 Lista fixa de cursos sobre Agricultura Urbana e Agroecologia
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
      image: `/images/compostagem.jpg`,
    },
    {
      id: 'curso4',
      title: 'Agroecologia e Sustentabilidade',
      description: 'Aprenda sobre práticas agroecológicas para produção de alimentos sem impacto ambiental.',
      image: `/images/agroecologia.jpg`,
    },
    {
      id: 'curso5',
      title: 'Controle Natural de Pragas',
      description: 'Métodos orgânicos para proteger sua horta contra pragas sem o uso de produtos químicos.',
      image: `/images/controle.jpg`,
    },
    {
      id: 'curso6',
      title: 'Irrigação Sustentável para Hortas',
      description: 'Técnicas eficientes de irrigação para economizar água e manter sua horta saudável.',
      image: `/images/irrigacao.jpg`,
    },
  ];

  return (
    <>
    <div 
      className="min-h-screen flex flex-col items-center justify-center px-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/backimage4.jpg)` }}
    >
      <div className=" bg-opacity-90 p-8 rounded-lg shadow-lg max-w-6xl w-full text-center">
        <h1 className="text-3xl font-bold mt-4 text-recifeBlue" aria-live="polite">
          {t('Cursos Disponíveis')}
        </h1>
        {loading && <Spinner />}
        {error && <p className="text-center text-red-500" role="alert">{error}</p>}

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* 🔹 Renderiza os cursos da API se existirem */}
          {!loading && !error && courses.length > 0 && (
            courses.map((course) => (
              <motion.div 
                key={course.id} 
                initial={{ y: 20, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                transition={{ duration: 0.3 }}
              >
                <CourseCard course={course} />
              </motion.div>
            ))
          )}

          {/* 🔹 Renderiza a lista fixa de cursos */}
          {fixedCourses.map((course) => (
            <motion.div 
              key={course.id} 
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ duration: 0.3 }}
            >
              <CourseCard 
                course={{
                  ...course,
                  title: <h2 className="text-2xl font-bold text-recifeGold">{course.title}</h2>,
                  description: <p className="text-lg text-recifeBlue font-semibold">{course.description}</p>,
                }} 
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>

    <footer className="w-full bg-recifeBlue text-recifeWhite text-center p-4 mt-18 bottom-0">
        <p>&copy; 2025 Prefeitura do Recife</p>
        <div className="flex justify-center space-x-4 mt-4">
          {[ 
            { href: "https://www.facebook.com/prefeituradorecife", src: "Facebook_logo.png", alt: "Facebook" },
            { href: "https://x.com/prefrecife", src: "x.png", alt: "X" },
            { href: "https://www.instagram.com/prefeiturarecife/", src: "instagram.jpeg", alt: "Instagram" },
            { href: "https://www.youtube.com/channel/UCxMRq-Mv3UimnqOl6aRrM6Q", src: "youtube.png", alt: "YouTube" },
            { href: "https://www.flickr.com/photos/prefeituradorecife/", src: "flickr.png", alt: "Flickr" },
          ].map(({ href, src, alt }) => (
            <a key={alt} href={href} target="_blank" rel="noopener noreferrer">
              <img src={`${process.env.PUBLIC_URL}/images/${src}`} alt={alt} className="w-6 h-6" />
            </a>
          ))}
        </div>
      </footer>
    </>
  );
};

export default CoursesPage;
