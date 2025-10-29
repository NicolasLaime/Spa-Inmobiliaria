import { useNavigate } from "react-router-dom";

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              ← Volver al Home
            </button>

            <h1 className="text-2xl font-semibold text-gray-900">
              Panel de Administración
            </h1>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
