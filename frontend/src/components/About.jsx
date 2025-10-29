import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <section
      id="about"
      className="flex flex-col items-center justify-center container mx-auto p-14 md:px-20 lg:px-32 w-full overflow-hidden"
    >
      <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center">
        Sobre <span className="underline underline-offset-4 decoration-2 text-blue-600 font-semibold">Nosotros</span>
      </h2>
      <p className="text-gray-500 text-center max-w-md mb-12">
        Apasionados por las propiedades, dedicados a hacer realidad la visión de nuestros clientes.
      </p>

      <div className="flex flex-col md:flex-row items-center md:items-start md:gap-16 w-full">
        <img
          src={assets.departamentos}
          alt="Brand"
          className="w-full sm:w-1/2 max-w-lg rounded-lg shadow-lg"
        />

        <div className="flex flex-col items-center md:items-start mt-50 text-gray-700 max-w-lg ">
          <div className="grid grid-cols-2 gap-8 w-full mb-10">
            <div className="text-center md:text-left">
              <p className="text-5xl font-bold text-gray-800">+10</p>
              <p className="text-lg text-gray-600 mt-1">Proyectos completados</p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-5xl font-bold text-gray-800">+20</p>
              <p className="text-lg text-gray-600 mt-1">Años de experiencia</p>
            </div>
          </div>

          <p className="mb-8">
            Nos dedicamos a conectar personas con sus propiedades ideales, ofreciendo un servicio transparente,
            personalizado y confiable. Cada proyecto es tratado con profesionalismo y pasión por los detalles.
          </p>

          <button className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-8 py-3 rounded-lg font-medium">
            Leer más
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
