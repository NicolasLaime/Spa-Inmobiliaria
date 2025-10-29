import { useEffect, useState } from "react";
import { useSearchProperties } from "../hooks/useProperties";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Proyects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(1);
  const [filter, setFilter] = useState("TODOS");

  const navigate = useNavigate();

  const { data, isLoading, error } = useSearchProperties({
    type: filter === "TODOS" ? undefined : filter,
    page: 0,
    size: 50,
  });

  const projectsData = data?.content || [];

  useEffect(() => {
    const updateCardsToShow = () => {
      if (window.innerWidth >= 1280) setCardsToShow(4); // xl
      else if (window.innerWidth >= 1024) setCardsToShow(3); // lg
      else if (window.innerWidth >= 768) setCardsToShow(2); // md
      else setCardsToShow(1); // sm
    };
    updateCardsToShow();
    window.addEventListener("resize", updateCardsToShow);
    return () => window.removeEventListener("resize", updateCardsToShow);
  }, []);

  const nextProject = () => {
    if (projectsData.length === 0) return;
    setCurrentIndex((prev) =>
      prev + cardsToShow >= projectsData.length ? 0 : prev + cardsToShow
    );
  };

  const prevProject = () => {
    if (projectsData.length === 0) return;
    setCurrentIndex((prev) =>
      prev - cardsToShow < 0
        ? Math.max(projectsData.length - cardsToShow, 0)
        : prev - cardsToShow
    );
  };

  const handlePropertyClick = (id) => {
    navigate(`/properties/${id}`);
  };

  if (isLoading)
    return <p className="text-center mt-8">Cargando proyectos...</p>;

  if (error)
    return (
      <p className="text-center mt-8 text-red-500">
        Error al cargar proyectos
      </p>
    );

  return (
    <div
      className="container mx-auto py-4 pt-20 px-4 sm:px-6 md:px-20 lg:px-32 my-20 w-full overflow-hidden"
      id="projects"
    >
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-center">
        Proyectos{" "}
        <span className="underline underline-offset-4 decoration-1 font-semibold text-blue-600">
          Completados
        </span>
      </h1>
      <p className="text-center text-gray-500 mb-8 max-w-xs sm:max-w-md md:max-w-lg mx-auto">
        Construyendo legados, explora nuestro portfolio
      </p>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {["TODOS", "VENTA", "ALQUILER", "NEGOCIO"].map((tipo) => (
          <button
            key={tipo}
            onClick={() => {
              setFilter(tipo);
              setCurrentIndex(0);
            }}
            className={`px-4 py-2 rounded-full border transition ${
              filter === tipo
                ? "bg-gray-800 text-white border-gray-800"
                : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200"
            }`}
          >
            {tipo}
          </button>
        ))}
      </div>

      {projectsData.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          No hay propiedades que coincidan con los filtros.
        </p>
      )}

      {projectsData.length > 0 && (
        <div className="flex justify-end items-center mb-8">
          <button
            onClick={prevProject}
            className="p-3 bg-gray-200 rounded mr-2 sm:p-4"
            aria-label="previous projects"
          >
            <img src={assets.left_arrow} alt="Previous" className="w-4 sm:w-5" />
          </button>
          <button
            onClick={nextProject}
            className="p-3 bg-gray-200 rounded sm:p-4"
            aria-label="next projects"
          >
            <img src={assets.right_arrow} alt="Next" className="w-4 sm:w-5" />
          </button>
        </div>
      )}

      {projectsData.length > 0 && (
        <div className="overflow-hidden">
          <div
            style={{
              transform: `translateX(-${(currentIndex * 100) / cardsToShow}%)`,
            }}
            className="flex gap-4 sm:gap-6 lg:gap-8 transition-transform duration-500 ease-in-out"
          >
            {projectsData.map((project, index) => (
              <div
                key={index}
                className="relative flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 cursor-pointer"
                onClick={() =>
                  handlePropertyClick(project.id || project._id)
                }
              >
                <img
                  src={
                    project.imageUrls && project.imageUrls.length > 0
                      ? project.imageUrls[0]
                      : "/placeholder.jpg"
                  }
                  alt={project.title}
                  className="w-full h-64 sm:h-72 md:h-64 lg:h-64 object-cover rounded-md hover:opacity-90 transition"
                />
                <div className="absolute left-0 right-0 bottom-0 flex justify-center">
                  <div className="inline-block bg-white w-3/4 px-4 py-2 shadow-md">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                      {project.title}
                    </h2>
                    <p className="text-gray-500 text-sm sm:text-base">
                      ${project.price} <span className="px-1">|</span>{" "}
                      {project.city}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Proyects;
