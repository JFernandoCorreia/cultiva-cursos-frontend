import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "", matricula: "", setor: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(credentials.email)) {
      setErrorMessage(t("E-mail inválido"));
      return false;
    }
    if (!/^[0-9]*$/.test(credentials.matricula)) {
      setErrorMessage(t("Matricula inválida"));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validateForm()) return;

    try {
      const response = await axios.post("/api/login", credentials);
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      if (error.response?.status === 401) {
        setErrorMessage(t("wrongPassword"));
      } else if (error.response?.status === 404) {
        setErrorMessage(t("Usuário não encontrado"));
      } else {
        setErrorMessage(t("Erro de Login"));
      }
    }
  };

  const handleChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleExternalLogin = (url) => window.open(url, "_blank");

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: "url('/images/flores.png')" }}
    >
      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-recifeBlue p-8 rounded-lg shadow-lg space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-center text-recifeWhite">{t("Login")}</h2>

        <label htmlFor="email" className="block text-recifeWhite font-medium">
          {t("E-mail")}
        </label>
        <input
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          placeholder={t("E-mail Placeholder")}
          className="p-3 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-recifeBlue"
        />

        <label htmlFor="password" className="block text-recifeWhite font-medium">
          {t("Password")}
        </label>
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder={t("Password Placeholder")}
          className="p-3 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-recifeBlue"
        />

        <label htmlFor="matricula" className="block text-recifeWhite font-medium">
          {t("Matricula")}
        </label>
        <input
          type="text"
          name="matricula"
          value={credentials.matricula}
          onChange={handleChange}
          placeholder={t("Matricula Placeholder")}
          className="p-3 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-recifeBlue"
        />

        <motion.button
          type="submit"
          className="w-full bg-recifeGold text-recifeBlue px-6 py-3 rounded-lg shadow-md hover:bg-recifeWhite hover:text-recifeBlue transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {t("Login")}
        </motion.button>

        {errorMessage && <p className="text-center text-red-500">{errorMessage}</p>}

        {/* 🔹 Botões de login externo */}
        <div className="text-center mt-6">
          <p className="text-lg font-bold text-recifeBlue mb-2">{t("Login com:")}</p>
          <motion.button
            onClick={() => handleExternalLogin("https://conectarecife.recife.pe.gov.br/")}
            className="bg-recifeGold text-recifeBlue px-4 py-2 m-2 rounded-lg hover:bg-recifeWhite hover:text-recifeBlue transition duration-300"
            whileHover={{ scale: 1.05 }}
          >
            Conecta Recife
          </motion.button>
          <motion.button
            onClick={() =>
              handleExternalLogin("https://sso.acesso.gov.br/login?client_id=portal-logado.estaleiro.serpro.gov.br&authorization_id=1928af70229")
            }
            className="bg-recifeGold text-recifeBlue px-4 py-2 m-2 rounded-lg hover:bg-recifeWhite hover:text-recifeBlue transition duration-300"
            whileHover={{ scale: 1.05 }}
          >
            Gov.br
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
};

export default LoginPage;
