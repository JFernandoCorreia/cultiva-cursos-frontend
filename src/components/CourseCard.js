import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300"
    >
      <h2 className="text-xl font-bold text-gray-800">{course.title}</h2>
      <p className="text-gray-600">{course.description}</p>
      <p className="text-sm text-gray-500">📅 {new Date(course.date).toLocaleDateString()}</p>
      <p className="text-sm text-gray-500">📍 {course.location}</p>

      {/* Botão "Inscrever-se" que redireciona para /register */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/register')}
        className="bg-green-600 text-white px-4 py-2 mt-4 rounded-lg w-full transition-all duration-300 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
        aria-label={`Inscrever-se no curso ${course.title}`}
      >
        Inscrever-se
      </motion.button>
    </motion.div>
  );
};

export default CourseCard;
