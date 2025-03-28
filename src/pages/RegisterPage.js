/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState } from 'react';
import api from '../services/api';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validarCPF } from '../utils/Validators';

const RegisterPage = () => {
  const [cpf, setCpf] = useState("");
  const [cpfErro, setCpfErro] = useState("");
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    cpf: '',
    cep: '',
    address: '',
    neighborhood: '',
    city: '',
    state: '',
    phone: '',
    matricula: '',
    setor: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleCPFChange = (e) => {
    let formattedCpf = e.target.value.replace(/\D/g, '');

    if (formattedCpf.length <= 11) {
      formattedCpf = formattedCpf
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
  
    setUserData({ ...userData, cpf: formattedCpf });
  
    if (!validarCPF(formattedCpf)) {
      setCpfErro("CPF inválido.");
    } else {
      setCpfErro("");
    }
  };

  const handleCepChange = async (event) => {
    const cep = event.target.value.replace(/\D/g, '');
    setUserData({ ...userData, cep: cep });

    if (cep.length === 8) {
      try {
        const response = await api.get(`https://viacep.com.br/ws/${cep}/json/`);
        const data = response.data;

        if (!data.erro) {
          setUserData({
            ...userData,
            cep: cep,
            address: data.logradouro,
            neighborhood: data.bairro,
            city: data.localidade,
            state: data.uf
          });
        } else {
          toast.error("CEP inválido");
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      }
    }
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  
    const isEmailValid = emailRegex.test(userData.email);
    const isCpfValid = cpfRegex.test(userData.cpf);
  
    if (!isEmailValid) {
      setErrorMessage('E-mail inválido.');
      return false;
    }
    if (!isCpfValid) {
      setErrorMessage('CPF inválido. Deve estar no formato XXX.XXX.XXX-XX.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!validateForm()) return;

    // Envio do formulário
    try {
      const response = await api.post('/api/users/register', userData);
      setSuccessMessage('Cadastro realizado com sucesso!');
      toast.success('Cadastro realizado com sucesso!');
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      setErrorMessage('Erro ao cadastrar. Por favor, tente novamente.');
      toast.error('Erro ao cadastrar. Por favor, tente novamente.');
    }
  };

  // Função para abrir o Conecta Recife
  const handleConectaRecifeClick = () => {
    window.open('https://conectarecife.recife.pe.gov.br/', '_blank');
  };

  // Função para abrir o Gov.br
  const handleGovBrClick = () => {
    window.open('https://sso.acesso.gov.br/login?client_id=portal-logado.estaleiro.serpro.gov.br&authorization_id=1928af70229', '_blank');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center px-4" style={{ backgroundImage: "url('/images/backimage4.jpg')" }}>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-recifeWhite p-8 rounded-lg shadow-lg space-y-4 z-10">
      <label htmlFor="name" className="block mb-2 text-recifeBlue text-xl font-semibold">
        Nome Completo <span className="text-red-500">*</span>
      </label>
      <input type="text" name="name" value={userData.name} onChange={handleChange} placeholder="Nome Completo" className="block w-full p-2 border rounded text-black" required />

      <label htmlFor="email" className="block mb-2 text-recifeBlue text-xl font-semibold">
        E-mail <span className="text-red-500">*</span>
      </label>
      <input type="email" name="email" value={userData.email} onChange={handleChange} placeholder="Email" className="block w-full p-2 border rounded text-black" required />

      <label htmlFor="cpf" className="block mb-2 text-recifeBlue text-xl font-semibold">
        CPF <span className="text-red-500">*</span>
      </label>
      <input type="text" name="cpf" value={userData.cpf} onChange={handleCPFChange} placeholder="CPF" className="block w-full p-2 border rounded text-black" required /> {cpfErro && <span style={{ color: "red" }}>{cpfErro}</span>}

      <label htmlFor="cep" className="block mb-2 text-recifeBlue text-xl font-semibold">
        CEP <span className="text-red-500">*</span>
      </label>
      <input type="text" name="cep" value={userData.cep} onChange={handleCepChange} placeholder="CEP" className="block w-full p-2 border rounded text-black" required />

      <label htmlFor="address" className="block mb-2 text-recifeBlue text-xl font-semibold">
        Logradouro <span className="text-red-500">*</span>
      </label>
      <input type="text" name="address" value={userData.address} onChange={handleChange} placeholder="Endereço" className="block w-full p-2 border rounded text-black" required />

      <label htmlFor="neighborhood" className="block mb-2 text-recifeBlue text-xl font-semibold">
        Bairro <span className="text-red-500">*</span>
      </label>
      <input type="text" name="neighborhood" value={userData.neighborhood} onChange={handleChange} placeholder="Bairro" className="block w-full p-2 border rounded text-black" required />

      <label htmlFor="city" className="block mb-2 text-recifeBlue text-xl font-semibold">
        Cidade <span className="text-red-500">*</span>
      </label>
      <input type="text" name="city" value={userData.city} onChange={handleChange} placeholder="Cidade" className="block w-full p-2 border rounded text-black" required />

      <label htmlFor="state" className="block mb-2 text-recifeBlue text-xl font-semibold">
        Estado <span className="text-red-500">*</span>
      </label>
      <select name="state" value={userData.state} onChange={handleChange} className="block w-full p-2 border rounded text-recifeBlue" required>
        <option value="">Selecione um estado</option>
        {['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'].map((estado) => (
          <option key={estado} value={estado}>{estado}</option>
        ))}
      </select>

      <label htmlFor="phone" className="block mb-2 text-recifeBlue text-xl font-semibold">
        Telefone <span className="text-red-500">*</span>
      </label>
      <input type="text" name="phone" value={userData.phone} onChange={handleChange} placeholder="Telefone" className="block w-full p-2 border rounded text-black" required />

      <label htmlFor="matricula" className="block mb-2 text-recifeBlue text-xl font-semibold">
        Matrícula
      </label>
      <input type="text" name="matricula" value={userData.matricula} onChange={handleChange} placeholder="Matrícula" className="block w-full p-2 border rounded text-black" />

      <label htmlFor="setor" className="block mb-2 text-recifeBlue text-xl font-semibold">
        Setor
      </label>
      <input type="text" name="setor" value={userData.setor} onChange={handleChange} placeholder="Setor" className="block w-full p-2 border rounded text-black" />

      <label htmlFor="password" className="block mb-2 text-recifeBlue text-xl font-semibold">
        Senha <span className="text-red-500">*</span>
      </label>
      <input type="password" name="password" value={userData.password} onChange={handleChange} placeholder="Senha" className="block w-full p-2 border rounded text-black" required />

        <button type="submit" className="bg-recifeBlue text-recifeWhite px-4 py-2 m-0 rounded-lg hover:bg-recifeGold hover:text-recifeBlue w-full">Cadastrar</button>

        {/* Botões para login externo centralizados */}
        <div className="text-center mt-6">
          <p className=" text-2xl font-bold text-recifeBlue mb-2">Cadastrar com:</p>
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button onClick={handleConectaRecifeClick} className="bg-recifeBlue text-recifeWhite px-4 py-2 m-2 rounded-lg hover:bg-recifeGold hover:text-recifeBlue">Conecta Recife</button>
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button onClick={handleGovBrClick} className="bg-recifeBlue text-recifeWhite px-4 py-2 m-2 rounded-lg hover:bg-recifeGold hover:text-recifeBlue">Gov.br</button>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default RegisterPage;
