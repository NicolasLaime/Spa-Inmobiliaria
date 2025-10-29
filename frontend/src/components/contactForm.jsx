import { useState } from "react";
import { useSendMessage } from "../hooks/useContact";

const ContactForm = ({ propertyId }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const mutation = useSendMessage();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await mutation.mutateAsync({ ...formData, propertyId });
      alert("✅ Tu mensaje fue enviado correctamente.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      alert("❌ Ocurrió un error al enviar el mensaje.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-lg shadow mt-4">
      <h3 className="text-lg font-semibold text-blue-700">¿Te interesa esta propiedad?</h3>

      <input
        type="text"
        name="name"
        placeholder="Tu nombre"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-200"
      />

      <input
        type="email"
        name="email"
        placeholder="Tu correo"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-200"
      />

      <textarea
        name="message"
        placeholder="Tu mensaje"
        value={formData.message}
        onChange={handleChange}
        required
        className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-200"
        rows={4}
      ></textarea>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        {mutation.isPending ? "Enviando..." : "Enviar mensaje"}
      </button>
    </form>
  );
};

export default ContactForm;
