import React, { useEffect, useState } from 'react';
import api from '../services/api';
import CourseCard from '../components/CourseCard';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await api.get('/courses');
      setCourses(response.data);
    };
    fetchCourses();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mt-4 text-center">Cursos Disponíveis</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
