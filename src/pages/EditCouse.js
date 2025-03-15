import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [curso, setCurso] = useState({ nome: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurso = async () => {
      try {
        const response = await axios.get(`/api/cursos/${id}`);
        setCurso(response.data);
      } catch (error) {
        setError("Erro ao carregar curso. Tente novamente.");
        console.error("Erro ao buscar curso:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCurso();
  }, [id]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.put(`/api/cursos/${id}`, curso);
      navigate("/cursos");
    } catch (error) {
      setError("Erro ao salvar alterações. Tente novamente.");
      console.error("Erro ao salvar curso:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mt-4 text-center">Editar Curso</h1>
      {loading ? (
        <p className="text-center">Carregando...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <motion.div 
          className="max-w-lg mx-auto mt-6 p-6 bg-white shadow-md rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <label className="block mb-2 text-gray-700">Nome do Curso</label>
          <input
            type="text"
            value={curso.nome}
            onChange={(e) => setCurso({ ...curso, nome: e.target.value })}
            className="w-full p-2 border rounded-lg"
          />
          <div className="flex justify-between mt-4">
            <button 
              onClick={() => navigate("/cursos")}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
            >
              Cancelar
            </button>
            <button 
              onClick={handleSave}
              disabled={saving}
              className={`px-4 py-2 rounded-lg transition ${
                saving ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {saving ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default EditCourse;
