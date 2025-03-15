import axios from 'axios';

/**
 * Função para buscar endereço via API do ViaCEP.
 * @param {string} cep - CEP no formato "12345678" ou "12345-678".
 * @returns {Promise<Object|null>} - Retorna os dados do endereço ou null em caso de erro.
 */
const buscarCEP = async (cep) => {
  const cepFormatado = cep.replace(/\D/g, ''); // Remove caracteres não numéricos

  // 🔹 Valida se o CEP tem exatamente 8 dígitos
  if (!/^\d{8}$/.test(cepFormatado)) {
    console.warn("CEP inválido. Deve conter exatamente 8 dígitos numéricos.");
    return null;
  }

  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cepFormatado}/json/`);

    if (response.data.erro) {
      console.warn("CEP não encontrado.");
      return null;
    }

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar CEP:", error);
    return null;
  }
};

export default buscarCEP;
