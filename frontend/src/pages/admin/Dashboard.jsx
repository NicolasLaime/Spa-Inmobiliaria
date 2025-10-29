import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";

// Componentes CRUD
import CreateProperty from "./properties/CreateProperty";
import DeleteProperty from "./properties/DeleteProperty";
import MessagesList from "./contact/MessageList";
import ListProperties from "./properties/ListProperties";

const Dashboard = () => {
  const { checkAuth, logout } = useAuthStore();
  const [currentView, setCurrentView] = useState("create");
  const navigate = useNavigate();

  useEffect(() => {
    const verifySession = async () => {
      const isAuth = await checkAuth();
      if (!isAuth) {
        navigate("/login");
      }
    };
    verifySession();
  }, []);

  const renderContent = () => {
    switch (currentView) {
      case "list":
        return <ListProperties />;
      case "create":
        return <CreateProperty onCreated={() => setCurrentView("delete")} />;
      case "delete":
        return <DeleteProperty />;
      case "messages":
        return <MessagesList />;
      default:
        return <CreateProperty onCreated={() => setCurrentView("delete")} />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-64 bg-white p-4 rounded shadow mb-4 md:mb-0">
        <h2 className="text-lg font-bold mb-4">Menú</h2>


        <button className={`block w-full text-left px-4 py-2 mb-2 rounded ${currentView === "list" ? "bg-green-500 text-white" : "hover:bg-green-200"
          }`} onClick={() => setCurrentView("list")}>
          🏠 Ver Propiedades
        </button>


        <button
          className={`block w-full text-left px-4 py-2 mb-2 rounded ${currentView === "create" ? "bg-blue-500 text-white" : "hover:bg-blue-200"
            }`}
          onClick={() => setCurrentView("create")}
        >
          ➕ Crear Propiedad Nueva
        </button>




        <button
          className={`block w-full text-left px-4 py-2 mb-2 rounded ${currentView === "delete" ? "bg-red-500 text-white" : "hover:bg-red-200"
            }`}
          onClick={() => setCurrentView("delete")}
        >
          🗑️ Borrar Propiedad
        </button>



        <button
          className={`block w-full text-left px-4 py-2 mb-2 rounded ${currentView === "messages" ? "bg-purple-500 text-white" : "hover:bg-purple-200"
            }`}
          onClick={() => setCurrentView("messages")}
        >
          💬 Mensajes
        </button>


        <button
          onClick={logout}
          className="mt-4 w-full text-left px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600"
        >
          🚪 Cerrar Sesión
        </button>



      </div>

      <div className="flex-1 p-4">{renderContent()}</div>
    </div >
  );
};

export default Dashboard;
