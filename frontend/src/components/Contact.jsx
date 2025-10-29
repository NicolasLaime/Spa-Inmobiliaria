import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Contact = () => {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Cargando...");
    const formData = new FormData(event.target);
    formData.append("access_key", "ce1026d8-44b1-4daf-8d07-eeb5888287a6");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Mensaje enviado exitosamente");
        event.target.reset();
        setResult("");
      } else {
        toast.error(data.message || "Error al enviar el mensaje");
        setResult("");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error de conexión");
      setResult("");
    }
  };

  return (
    <section id="contact" className="text-center py-20 lg:px-32 w-full overflow-hidden">
      <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center">
        Contacto <span className="underline underline-offset-4 decoration-2 text-blue-600 font-semibold">con nosotros</span>
      </h2>
      <p className="text-center text-gray-600 mb-12 max-w-md mx-auto">
        Listo para dar el siguiente paso? Construyamos juntos tu propiedad ideal.
      </p>

      <form onSubmit={onSubmit} className="max-w-2xl mx-auto text-gray-700 space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 text-left">
            <label className="block mb-1 font-medium">Tu nombre</label>
            <input
              name="Name"
              type="text"
              placeholder="Tu nombre"
              required
              className="w-full border border-gray-300 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          <div className="flex-1 text-left">
            <label className="block mb-1 font-medium">Tu Email</label>
            <input
              name="Email"
              type="email"
              placeholder="Tu email"
              required
              className="w-full border border-gray-300 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>
        </div>

        <div className="text-left">
          <label className="block mb-1 font-medium">Mensaje</label>
          <textarea
            name="Message"
            placeholder="Escribí tu mensaje..."
            required
            className="w-full border border-gray-300 rounded-xl py-3 px-4 h-48 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white py-3 px-12 rounded-xl font-medium transition-all duration-300"
        >
          {result ? result : "Enviar mensaje"}
        </button>
      </form>
    </section>
  );
};

export default Contact;
