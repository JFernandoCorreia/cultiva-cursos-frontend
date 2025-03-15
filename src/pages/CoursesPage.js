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

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mt-4 text-center" aria-live="polite">
        {t('Cursos Disponíveis')}
      </h1>
      {loading && <Spinner />}
      {error && <p className="text-center text-recifeBlue" role="alert">{error}</p>}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {!loading && !error && courses.length > 0 ? (
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
        ) : (
          !loading && !error && <p className="text-center text-gray-500">{t('noCoursesAvailable')}</p>
        )}
      </motion.div>
    </div>
  );
};

export default CoursesPage;
