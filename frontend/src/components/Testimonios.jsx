import React from 'react';
import { assets, testimonialsData } from '../assets/assets';

const Testimonios = () => {
  return (
    <section id="testimonios" className="container mx-auto py-16 lg:px-32 w-full overflow-hidden">
      <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center">
        Testimonios <span className="underline underline-offset-4 decoration-2 text-blue-600 font-semibold">de clientes</span>
      </h2>
      <p className="text-center text-gray-600 mb-12 max-w-md mx-auto">
        Historias reales de quienes confiaron en nosotros para encontrar su propiedad ideal.
      </p>

      <div className="flex flex-wrap justify-center gap-8">
        {testimonialsData.map((testimonial, index) => (
          <div
            key={index}
            className="max-w-xs bg-white rounded-2xl shadow-lg p-8 text-center transition-transform transform hover:-translate-y-3 hover:shadow-2xl duration-300"
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-blue-500 object-cover"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-1">{testimonial.name}</h3>
            <p className="text-sm text-gray-500 mb-3">{testimonial.title}</p>

            <div className="flex justify-center gap-1 text-yellow-400 mb-4">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <img key={i} src={assets.star_icon} alt="star" className="w-5 h-5" />
              ))}
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">{testimonial.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonios;
