import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaHome, FaMap, FaUserPlus, FaInfoCircle, FaQuestionCircle } from "react-icons/fa";

const Sidebar = ({ isSidebarOpen }) => {
  const { t } = useTranslation();

  return (
    <aside
      className={`fixed top-0 left-0 h-full w-48 bg-recifeWhite text-recifeBlue shadow-lg z-50 flex-col pt-24 px-4 space-y-6 transition-transform duration-300 transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:flex`}
    >
      <Link to="/home" className="flex items-center gap-2 hover:text-recifeGold"
        onClick={() => { const element = document.getElementById('inicio');
          element?.scrollIntoView({ behavior: 'smooth' });
        }}>
        <FaHome /> {t("Início")}
      </Link>
      <button
        className="flex items-center gap-2 hover:text-recifeGold"
        onClick={() => {
          const element = document.getElementById('cadastro');
          element?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <FaUserPlus /> {t("Cadastro")}
      </button>
      <button
        className="flex items-center gap-2 hover:text-recifeGold"
        onClick={() => {
          const element = document.getElementById('mapas');
          element?.scrollIntoView({ behavior: 'smooth' });
        }}
        >
          <FaMap /> {t("Mapa")}
        </button>
        <button
          className="flex items-center gap-2 hover:text-recifeGold"
          onClick={() => {
            const element = document.getElementById('sobre');
            element?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <FaInfoCircle /> {t("Sobre")}
        </button>
        <button
          className="flex items-center gap-2 hover:text-recifeGold"
          onClick={() => {
            const element = document.getElementById('faqs');
            element?.scrollIntoView({ behavior: 'smooth' });
          }}
          >
          <FaQuestionCircle /> {t("FAQ's")}
          </button> 
    </aside>
  );
};

export default Sidebar;
