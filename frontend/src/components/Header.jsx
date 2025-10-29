import NavBar from "./NavBar";

const Header = () => {
  return (
    <header
      id="header"
      className="relative min-h-screen flex flex-col justify-between bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/house5.jpg')" }}
    >
      {/* Capa oscura sobre la imagen */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* NavBar */}
      <NavBar />

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-gray-100 px-6 py-20 md:px-20 mt-20">
        <h1 className="text-4xl sm:text-6xl md:text-[82px] font-semibold max-w-3xl leading-tight">
          Tu propiedad ideal con la <br className="hidden sm:block" /> asesoría que merecés
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl">
          Compra, venta y alquiler con total confianza. Nos ocupamos de cada detalle.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mt-12">
          <a
            href="#proyectos"
            className="border border-white px-8 py-3 rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
          >
            Ver Proyectos
          </a>
          <a
            href="#contacto"
            className="bg-gradient-to-r from-blue-500 to-blue-700 border border-transparent px-8 py-3 rounded-lg hover:opacity-90 transition-all duration-300"
          >
            Contacto
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
