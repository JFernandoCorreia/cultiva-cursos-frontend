import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const CourseList = () => {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCursos();
  }, []);

  const fetchCursos = async () => {
    try {
      const response = await axios.get("/api/cursos");
      setCursos(response.data);
    } catch (error) {
      setError("Erro ao carregar os cursos. Tente novamente.");
      console.error("Erro ao buscar cursos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/cursos/${id}`);
      setCursos((prevCursos) => prevCursos.filter((curso) => curso.id !== id));
    } catch (error) {
      console.error("Erro ao excluir curso:", error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mt-4 text-center">Lista de Cursos</h1>

      {loading && <p className="text-center">Carregando...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {cursos.length > 0 ? (
          cursos.map((curso) => (
            <motion.div 
              key={curso.id} 
              className="bg-white shadow-md rounded-lg p-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold">{curso.nome}</h3>
              <div className="mt-4 flex justify-between">
                <button 
                  onClick={() => navigate(`/editar-curso/${curso.id}`)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  Editar
                </button>
                <button 
                  onClick={() => handleDelete(curso.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Excluir
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          !loading && !error && <p className="text-center text-gray-500">Nenhum curso disponível.</p>
        )}
      </motion.div>
    </div>
  );
};

export default CourseList;
