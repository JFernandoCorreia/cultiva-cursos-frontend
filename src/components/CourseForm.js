/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import apiWithAuth from '../services/api';

const CourseForm = () => {
    const [courseData, setCourseData] = useState({
        title: '',
        description: '',
        capacity: '',
        location: '',
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!courseData.title || !courseData.description || !courseData.capacity || !courseData.location) {
            setMessage({ type: 'error', text: 'Todos os campos são obrigatórios!' });
            return;
        }

        setLoading(true);
        try {
            const response = await apiWithAuth.post('/courses', courseData);
            setMessage({ type: 'success', text: 'Curso criado com sucesso!' });
            setCourseData({ title: '', description: '', capacity: '', location: '' });
        } catch (error) {
            setMessage({ type: 'error', text: 'Erro ao criar o curso. Tente novamente.' });
        }
        setLoading(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseData({ ...courseData, [name]: value });
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto"
        >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Criar Curso</h2>

            {message.text && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`p-2 text-center rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                >
                    {message.text}
                </motion.p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="title"
                    value={courseData.title}
                    onChange={handleChange}
                    placeholder="Título"
                    className="w-full p-2 border rounded"
                />
                <textarea
                    name="description"
                    value={courseData.description}
                    onChange={handleChange}
                    placeholder="Descrição"
                    className="w-full p-2 border rounded"
                />
                <input
                    type="number"
                    name="capacity"
                    value={courseData.capacity}
                    onChange={handleChange}
                    placeholder="Capacidade"
                    className="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    name="location"
                    value={courseData.location}
                    onChange={handleChange}
                    placeholder="Localização"
                    className="w-full p-2 border rounded"
                />

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded w-full transition-all duration-300 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
                >
                    {loading ? 'Criando...' : 'Criar Curso'}
                </motion.button>
            </form>
        </motion.div>
    );
};

export default CourseForm;
