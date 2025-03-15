// Valida se um CPF é válido
export const validarCPF = (cpf) => {
  cpf = cpf.replace(/\D/g, ""); // Remove caracteres não numéricos

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false; // Bloqueia CPFs com números repetidos

  const calcularDigito = (slice) => {
    const soma = slice
      .split("")
      .map((num, idx) => parseInt(num) * (slice.length + 1 - idx))
      .reduce((acc, val) => acc + val, 0);

    const resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
  };

  const digito1 = calcularDigito(cpf.slice(0, 9));
  const digito2 = calcularDigito(cpf.slice(0, 10));

  return digito1 === parseInt(cpf.charAt(9)) && digito2 === parseInt(cpf.charAt(10));
};

// Formata um CPF no padrão XXX.XXX.XXX-XX
export const formatarCPF = (cpf) => {
  return cpf
    .replace(/\D/g, "") // Remove caracteres não numéricos
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d{2})$/, ".$1-$2");
};
