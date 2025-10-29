import { useState } from 'react';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return toast.error("Ingresa un email válido");
    toast.success("¡Suscripción exitosa!");
    setEmail('');
  };

  return (
    <footer className="pt-10 px-4 md:px-20 lg:px-32 bg-gray-900 text-gray-300 w-full overflow-hidden" id="footer">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
        {/* Logo y descripción */}
        <div className="md:w-1/3">
          <img src={assets.logo_dark} alt="Logo" className="mb-4 w-40 md:w-48" />
          <p className="text-gray-400">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem dolore, veritatis dolores suscipit, quod maiores ratione totam laborum alias nostrum illum minus quos earum libero repudiandae, et odio unde quo.
          </p>
        </div>

        {/* Navegación */}
        <div className="md:w-1/4">
          <h3 className="text-white text-lg font-bold mb-4">Empresa</h3>
          <ul className="flex flex-col gap-2">
            <li><a href="#Header" className="hover:text-gray-400 transition-colors">Home</a></li>
            <li><a href="#about" className="hover:text-gray-400 transition-colors">Sobre nosotros</a></li>
            <li><a href="#Proyectos" className="hover:text-gray-400 transition-colors">Proyectos</a></li>
            <li><a href="#testimonios" className="hover:text-gray-400 transition-colors">Testimonios</a></li>
          </ul>
        </div>

        {/* Suscripción */}
        <div className="md:w-1/3">
          <h3 className="text-white text-lg font-bold mb-4">Recibe nuestras novedades</h3>
          <p className="text-gray-400 mb-4">Suscríbete con tu email para recibir noticias y actualizaciones.</p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tu email"
              className="w-full px-4 py-2 rounded-md border border-gray-700 bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-500 transition-colors"
            >
              Suscribirse
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
