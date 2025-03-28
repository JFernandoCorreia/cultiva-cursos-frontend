import React from 'react';

const SobrePage = () => (
  <div 
    className="container mx-auto p-8 text-recifeBlue text-center bg-cover bg-center min-h-screen" 
    style={{ backgroundImage: "url('/images/backimage4.jpg')" }}
  >
    {/* Caixa branca para melhorar a legibilidade do texto */}
    <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold mb-6">Sobre o Cultiva Cursos</h2>

      <p className="text-lg leading-relaxed max-w-3xl mx-auto">
        O <strong>Cultiva Cursos</strong> é uma plataforma dedicada à disseminação do conhecimento sobre <strong>agroecologia, cultivo de hortas urbanas e práticas sustentáveis</strong>.  
        Nossa missão é capacitar pessoas interessadas em transformar seus espaços e comunidades por meio da agricultura urbana e ecológica, promovendo um futuro mais verde e equilibrado.
      </p>

      <p className="text-lg leading-relaxed max-w-3xl mx-auto mt-4">
        Oferecemos uma variedade de cursos, desde a <strong>introdução à agroecologia</strong> até técnicas avançadas de cultivo e manejo sustentável.  
        Nossos conteúdos são elaborados por especialistas da área e são acessíveis para diferentes públicos, desde iniciantes até profissionais do setor agrícola e ambiental.
      </p>

      <p className="text-lg leading-relaxed max-w-3xl mx-auto mt-4">
        O Cultiva Cursos também busca fortalecer a <strong>agricultura familiar e comunitária</strong>, incentivando a autonomia alimentar e a preservação dos recursos naturais.  
        Acreditamos que compartilhar conhecimento sobre o plantio de alimentos saudáveis e sustentáveis pode impactar positivamente as cidades, melhorando a qualidade de vida e a segurança alimentar da população.
      </p>

      <h3 className="text-2xl font-semibold mt-6">Nossos Parceiros</h3>
      <p className="text-lg leading-relaxed max-w-3xl mx-auto mt-2">
        Contamos com o apoio de diversas instituições, como a <strong>Prefeitura do Recife</strong>, universidades, ONGs ambientais e cooperativas agrícolas, que contribuem para a criação de conteúdos atualizados e relevantes.  
        Além disso, professores, pesquisadores e profissionais do setor ajudam a desenvolver materiais didáticos ricos em conhecimento técnico e prático.
      </p>

      <p className="text-lg font-bold mt-6 text-recifeBlue">
        🌱💡 Inscreva-se agora e aprenda a cultivar um futuro mais sustentável! 🌿✨  
      </p>
    </div>
  </div>
);

export default SobrePage;
