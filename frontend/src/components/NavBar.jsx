import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { user, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    document.body.style.overflow = showMenu ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showMenu]);

  return (
    <div className="absolute top-0 left-0 w-full z-50"> {/* <- z-50 para estar arriba de todo */}
      <div className="container mx-auto flex justify-between items-center py-4 px-6 md:px-20 lg:px-32 bg-transparent relative z-50">
        <img src={assets.logo} alt="logo" />

        <ul className="hidden md:flex gap-7 text-white">
          <a href="#header" className="hover:text-gray-400">Home</a>
          <a href="#about" className="hover:text-gray-400">Sobre nosotros</a>
          <a href="#projects" className="hover:text-gray-400">Proyectos</a>
          <a href="#testimonios" className="hover:text-gray-400">Testimonios</a>
        </ul>

        {user && (
          <Link
            to="/admin"
            className="hidden md:inline-block bg-white text-black font-semibold py-2 px-4 rounded-full hover:bg-gray-200 transition"
          >
            Ir al Dashboard
          </Link>
        )}

        <img
          onClick={() => setShowMenu(true)}
          src={assets.menu_icon}
          alt="menu"
          className="md:hidden w-7 cursor-pointer"
        />
      </div>

      {/* MENU MOBILE FULLSCREEN */}
      {showMenu && (
        <div className="fixed inset-0 z-50 bg-black/80 flex flex-col">
          <div className="flex justify-end p-6 cursor-pointer">
            <img
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              className="w-6"
              alt="close menu"
            />
          </div>

          <ul className="flex flex-col items-center gap-4 mt-10 text-white text-lg font-medium">
            <a onClick={() => setShowMenu(false)} href="#header" className="px-4 py-2 rounded-full">Home</a>
            <a onClick={() => setShowMenu(false)} href="#about" className="px-4 py-2 rounded-full">Sobre Nosotros</a>
            <a onClick={() => setShowMenu(false)} href="#projects" className="px-4 py-2 rounded-full">Proyectos</a>
            <a onClick={() => setShowMenu(false)} href="#testimonios" className="px-4 py-2 rounded-full">Testimonios</a>

            {user && (
              <Link
                to="/admin"
                onClick={() => setShowMenu(false)}
                className="mt-5 bg-white text-black py-2 px-6 rounded-full hover:bg-gray-200 transition"
              >
                Ir al Dashboard
              </Link>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavBar;
